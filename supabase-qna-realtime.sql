-- ============================================================================
-- MIGRASI TAHAP 5 — REALTIME TANYA JAWAB
-- Jalankan di Supabase SQL Editor setelah supabase-schema.sql.
-- Aman dijalankan ulang.
-- ============================================================================

-- 1. Aktifkan CDC Realtime untuk tabel sesi dan pertanyaan.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'sesi_onair'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.sesi_onair;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'pertanyaan'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.pertanyaan;
  END IF;
END $$;

-- 2. Publik perlu melihat sesi hari ini yang sudah ditutup supaya kartu form
--    langsung berubah status tanpa refresh. Kolom internal tetap tidak dipilih
--    oleh frontend.
DROP POLICY IF EXISTS "Publik dapat melihat hanya sesi terbuka" ON sesi_onair;
DROP POLICY IF EXISTS "Publik dapat melihat sesi hari ini dan sesi terbuka" ON sesi_onair;
CREATE POLICY "Publik dapat melihat sesi hari ini dan sesi terbuka"
ON sesi_onair FOR SELECT TO anon
USING (status = 'terbuka' OR tanggal = CURRENT_DATE);
