-- ============================================================================
-- MIGRASI TAHAP 6 — PENYESUAIAN KOLOM PANEL ADMIN
-- Jalankan di Supabase SQL Editor setelah supabase-schema.sql.
-- Aman dijalankan ulang.
-- ============================================================================

-- UAT dokumen 09 meminta penyiar dapat disunting dari panel jadwal.
-- Kolom ini nullable agar 72 baris jadwal lama tetap berlaku.
ALTER TABLE jadwal_tetap ADD COLUMN IF NOT EXISTS nama_penyiar VARCHAR(150);

-- Panel studio perlu menyorot pertanyaan yang sedang dibacakan penyiar.
ALTER TABLE pertanyaan ADD COLUMN IF NOT EXISTS disorot BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN jadwal_tetap.nama_penyiar IS 'Nama penyiar bertugas, disunting dari panel admin jadwal.';
COMMENT ON COLUMN pertanyaan.disorot IS 'Penanda pertanyaan yang disorot di layar studio.';
