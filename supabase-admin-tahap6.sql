-- ============================================================================
-- MIGRASI TAHAP 6 — PENYESUAIAN KOLOM PANEL ADMIN
-- Jalankan di Supabase SQL Editor setelah supabase-schema.sql.
-- Aman dijalankan ulang.
-- ============================================================================

-- UAT dokumen 09 meminta penyiar dapat disunting dari panel jadwal.
-- Kolom ini nullable agar 72 baris jadwal lama tetap berlaku.
ALTER TABLE jadwal_tetap ADD COLUMN IF NOT EXISTS nama_penyiar VARCHAR(150);

-- Catatan Tahap 11: kolom `disorot` pada tabel `pertanyaan` lama dihapus bersama
-- tabel tersebut. Moderasi chat memakai kolom `status` pada `chat_pesan`.

COMMENT ON COLUMN jadwal_tetap.nama_penyiar IS 'Nama penyiar bertugas, disunting dari panel admin jadwal.';
