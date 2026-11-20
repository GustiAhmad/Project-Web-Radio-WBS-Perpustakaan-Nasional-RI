-- =============================================================================
-- TAHAP 11 — INISIASI SESI CHAT LIVE
-- Jalankan di Supabase SQL Editor pada database yang sudah memakai supabase-schema.sql.
-- Skrip ini membersihkan data Tanya Jawab lama dan menggantinya dengan Chat Live.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. HENTIKAN REALTIME TABEL LAMA, LALU HAPUS (DATA LAMA TIDAK DIMIGRASIKAN)
-- -----------------------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'pertanyaan'
  ) THEN
    ALTER PUBLICATION supabase_realtime DROP TABLE public.pertanyaan;
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'sesi_onair'
  ) THEN
    ALTER PUBLICATION supabase_realtime DROP TABLE public.sesi_onair;
  END IF;
END $$;

DROP TABLE IF EXISTS public.pertanyaan CASCADE;
DROP TABLE IF EXISTS public.sesi_onair CASCADE;

-- -----------------------------------------------------------------------------
-- 2. ENUM BARU
-- -----------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE status_sesi_chat AS ENUM ('terbuka', 'tertutup');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE status_chat_pesan AS ENUM ('terlihat', 'disembunyikan');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DROP TYPE IF EXISTS status_pertanyaan;
DROP TYPE IF EXISTS status_sesi;

-- -----------------------------------------------------------------------------
-- 3. TABEL SESI CHAT
-- Nama sesi adalah satu-satunya input saat membuka. Audit dibuka/ditutup dicatat sistem.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sesi_chat (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama_sesi VARCHAR(150) NOT NULL,
    status status_sesi_chat NOT NULL DEFAULT 'terbuka',
    dibuka_oleh_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    dibuka_oleh VARCHAR(150) NOT NULL,
    dibuka_pada TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ditutup_oleh_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    ditutup_oleh VARCHAR(150),
    ditutup_pada TIMESTAMPTZ,
    CONSTRAINT ck_nama_sesi CHECK (char_length(btrim(nama_sesi)) BETWEEN 3 AND 150),
    CONSTRAINT ck_sesi_tutup_lengkap CHECK (
        status = 'terbuka' OR (ditutup_pada IS NOT NULL AND ditutup_oleh IS NOT NULL)
    )
);

-- -----------------------------------------------------------------------------
-- 4. TABEL PESAN CHAT
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.chat_pesan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sesi_id UUID NOT NULL REFERENCES public.sesi_chat(id) ON DELETE CASCADE,
    nama VARCHAR(100) NOT NULL DEFAULT 'Anonim',
    isi TEXT NOT NULL,
    status status_chat_pesan NOT NULL DEFAULT 'terlihat',
    disembunyikan_oleh VARCHAR(150),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT ck_isi_chat CHECK (char_length(btrim(isi)) BETWEEN 2 AND 500),
    CONSTRAINT ck_nama_chat CHECK (char_length(btrim(nama)) BETWEEN 2 AND 100)
);

DROP TRIGGER IF EXISTS set_timestamp_chat_pesan ON public.chat_pesan;
CREATE TRIGGER set_timestamp_chat_pesan
BEFORE UPDATE ON public.chat_pesan
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

CREATE INDEX IF NOT EXISTS idx_chat_pesan_sesi_waktu ON public.chat_pesan(sesi_id, created_at);
CREATE INDEX IF NOT EXISTS idx_chat_pesan_sesi_status ON public.chat_pesan(sesi_id, status);
CREATE INDEX IF NOT EXISTS idx_sesi_chat_status ON public.sesi_chat(status, dibuka_pada DESC);

-- -----------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY
-- Publik: baca sesi terbuka, baca pesan terlihat pada sesi terbuka, dan kirim pesan.
-- Staf: penuh untuk sesi dan pesan. Hapus riwayat sesi hanya Superadmin.
-- -----------------------------------------------------------------------------
ALTER TABLE public.sesi_chat ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_pesan ENABLE ROW LEVEL SECURITY;

-- Sesi: publik
DROP POLICY IF EXISTS "Publik melihat sesi chat yang terbuka" ON public.sesi_chat;
CREATE POLICY "Publik melihat sesi chat yang terbuka"
ON public.sesi_chat FOR SELECT TO anon
USING (status = 'terbuka');

-- Sesi: staf
DROP POLICY IF EXISTS "Staf melihat semua sesi chat" ON public.sesi_chat;
CREATE POLICY "Staf melihat semua sesi chat"
ON public.sesi_chat FOR SELECT TO authenticated
USING (auth_is_staf());

DROP POLICY IF EXISTS "Staf membuka sesi chat" ON public.sesi_chat;
CREATE POLICY "Staf membuka sesi chat"
ON public.sesi_chat FOR INSERT TO authenticated
WITH CHECK (auth_is_staf());

DROP POLICY IF EXISTS "Staf menutup sesi chat" ON public.sesi_chat;
CREATE POLICY "Staf menutup sesi chat"
ON public.sesi_chat FOR UPDATE TO authenticated
USING (auth_is_staf())
WITH CHECK (auth_is_staf());

DROP POLICY IF EXISTS "Superadmin menghapus riwayat sesi chat" ON public.sesi_chat;
CREATE POLICY "Superadmin menghapus riwayat sesi chat"
ON public.sesi_chat FOR DELETE TO authenticated
USING (auth_is_superadmin());

-- Pesan: kirim hanya ke sesi terbuka; status pesan baru selalu terlihat.
DROP POLICY IF EXISTS "Publik mengirim pesan ke sesi chat terbuka" ON public.chat_pesan;
CREATE POLICY "Publik mengirim pesan ke sesi chat terbuka"
ON public.chat_pesan FOR INSERT TO anon
WITH CHECK (
    status = 'terlihat'
    AND EXISTS (
        SELECT 1 FROM public.sesi_chat
        WHERE sesi_chat.id = chat_pesan.sesi_id
          AND sesi_chat.status = 'terbuka'
    )
);

DROP POLICY IF EXISTS "Staf mengirim pesan ke sesi chat terbuka" ON public.chat_pesan;
CREATE POLICY "Staf mengirim pesan ke sesi chat terbuka"
ON public.chat_pesan FOR INSERT TO authenticated
WITH CHECK (
    auth_is_staf()
    AND status = 'terlihat'
    AND EXISTS (
        SELECT 1 FROM public.sesi_chat
        WHERE sesi_chat.id = chat_pesan.sesi_id
          AND sesi_chat.status = 'terbuka'
    )
);

-- Pesan: publik hanya melihat pesan terlihat pada sesi yang masih terbuka.
DROP POLICY IF EXISTS "Publik melihat pesan terlihat pada sesi terbuka" ON public.chat_pesan;
CREATE POLICY "Publik melihat pesan terlihat pada sesi terbuka"
ON public.chat_pesan FOR SELECT TO anon
USING (
    status = 'terlihat'
    AND EXISTS (
        SELECT 1 FROM public.sesi_chat
        WHERE sesi_chat.id = chat_pesan.sesi_id
          AND sesi_chat.status = 'terbuka'
    )
);

DROP POLICY IF EXISTS "Staf melihat semua pesan chat" ON public.chat_pesan;
CREATE POLICY "Staf melihat semua pesan chat"
ON public.chat_pesan FOR SELECT TO authenticated
USING (auth_is_staf());

DROP POLICY IF EXISTS "Staf menyembunyikan atau menampilkan pesan chat" ON public.chat_pesan;
CREATE POLICY "Staf menyembunyikan atau menampilkan pesan chat"
ON public.chat_pesan FOR UPDATE TO authenticated
USING (auth_is_staf())
WITH CHECK (auth_is_staf());

DROP POLICY IF EXISTS "Staf menghapus pesan chat" ON public.chat_pesan;
CREATE POLICY "Staf menghapus pesan chat"
ON public.chat_pesan FOR DELETE TO authenticated
USING (auth_is_staf());

-- -----------------------------------------------------------------------------
-- 6. REALTIME CDC — SESI DAN PESAN CHAT
-- -----------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'sesi_chat'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.sesi_chat;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'chat_pesan'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_pesan;
  END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 7. RINGKASAN
-- Tabel aktif: sesi_chat, chat_pesan.
-- Tabel lama sesi_onair dan pertanyaan sudah dihapus beserta datanya.
-- Ikon chat di pemutar radio muncul otomatis hanya bila ada sesi berstatus terbuka.
-- -----------------------------------------------------------------------------
