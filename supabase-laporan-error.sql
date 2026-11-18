-- ============================================================================
-- MIGRASI TAHAP 6 — LAPORAN ERROR INTERNAL / TICKETING
-- Jalankan di Supabase SQL Editor setelah supabase-schema.sql dan
-- supabase-admin-tahap6.sql. Aman dijalankan ulang.
-- ============================================================================

-- 1. TIPE ENUMERASI -----------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_laporan') THEN
    CREATE TYPE status_laporan AS ENUM ('baru', 'diproses', 'selesai', 'ditolak');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tingkat_keparahan') THEN
    CREATE TYPE tingkat_keparahan AS ENUM ('rendah', 'sedang', 'tinggi', 'kritis');
  END IF;
END $$;

-- 2. TABEL LAPORAN ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS laporan_error (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    judul VARCHAR(150) NOT NULL,
    deskripsi TEXT NOT NULL,
    langkah_reproduksi TEXT,
    url_halaman TEXT,
    perangkat VARCHAR(200),
    tingkat_keparahan tingkat_keparahan NOT NULL DEFAULT 'sedang',
    status status_laporan NOT NULL DEFAULT 'baru',
    screenshot_path TEXT,
    dilaporkan_oleh UUID REFERENCES pengguna(id) ON DELETE SET NULL,
    nama_pelapor VARCHAR(150) NOT NULL,
    email_pelapor VARCHAR(255) NOT NULL,
    catatan_internal TEXT,
    ditangani_oleh UUID REFERENCES pengguna(id) ON DELETE SET NULL,
    dibuat_pada TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    diproses_pada TIMESTAMPTZ,
    selesai_pada TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_laporan_error_status ON laporan_error(status);
CREATE INDEX IF NOT EXISTS idx_laporan_error_dibuat_pada ON laporan_error(dibuat_pada DESC);
CREATE INDEX IF NOT EXISTS idx_laporan_error_pelapor ON laporan_error(dilaporkan_oleh);

DROP TRIGGER IF EXISTS set_timestamp_laporan_error ON laporan_error;
CREATE TRIGGER set_timestamp_laporan_error
BEFORE UPDATE ON laporan_error
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

ALTER TABLE laporan_error ENABLE ROW LEVEL SECURITY;

-- 3. KEBIJAKAN RLS ------------------------------------------------------------
-- Admin melihat laporannya sendiri. Superadmin melihat seluruh laporan.
DROP POLICY IF EXISTS "Staf melihat laporan sendiri atau semua untuk superadmin" ON laporan_error;
CREATE POLICY "Staf melihat laporan sendiri atau semua untuk superadmin"
ON laporan_error FOR SELECT TO authenticated
USING (
  auth_is_superadmin()
  OR dilaporkan_oleh = (SELECT id FROM pengguna WHERE auth_user_id = auth.uid())
);

DROP POLICY IF EXISTS "Staf dapat mengirim laporan error" ON laporan_error;
CREATE POLICY "Staf dapat mengirim laporan error"
ON laporan_error FOR INSERT TO authenticated
WITH CHECK (
  auth_is_staf()
  AND dilaporkan_oleh = (SELECT id FROM pengguna WHERE auth_user_id = auth.uid())
);

-- Hanya superadmin yang memproses, menutup, atau menghapus laporan.
DROP POLICY IF EXISTS "Hanya superadmin yang mengelola laporan error" ON laporan_error;
CREATE POLICY "Hanya superadmin yang mengelola laporan error"
ON laporan_error FOR UPDATE TO authenticated
USING (auth_is_superadmin())
WITH CHECK (auth_is_superadmin());

DROP POLICY IF EXISTS "Hanya superadmin yang menghapus laporan error" ON laporan_error;
CREATE POLICY "Hanya superadmin yang menghapus laporan error"
ON laporan_error FOR DELETE TO authenticated
USING (auth_is_superadmin());

-- 4. BUCKET STORAGE PRIVAT UNTUK SCREENSHOT -----------------------------------
-- Bukan untuk audio/video mentah. Hanya gambar, maksimal 2 MB.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'laporan-error',
  'laporan-error',
  false,
  2097152,
  ARRAY['image/png', 'image/jpeg', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Staf mengunggah screenshot ke folder sendiri" ON storage.objects;
CREATE POLICY "Staf mengunggah screenshot ke folder sendiri"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'laporan-error'
  AND auth_is_staf()
  AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Pelapor dan superadmin membaca screenshot" ON storage.objects;
CREATE POLICY "Pelapor dan superadmin membaca screenshot"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'laporan-error'
  AND (
    auth_is_superadmin()
    OR (storage.foldername(name))[1] = auth.uid()::text
  )
);

DROP POLICY IF EXISTS "Superadmin menghapus screenshot laporan" ON storage.objects;
CREATE POLICY "Superadmin menghapus screenshot laporan"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'laporan-error' AND auth_is_superadmin());

-- 5. REALTIME -----------------------------------------------------------------
-- Lencana laporan baru di panel superadmin memakai CDC yang sama dengan tanya jawab.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'laporan_error'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.laporan_error;
  END IF;
END $$;
