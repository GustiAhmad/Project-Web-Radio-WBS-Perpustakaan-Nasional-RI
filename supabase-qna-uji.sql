-- ============================================================================
-- USANG SEJAK TAHAP 11 — JANGAN DIJALANKAN LAGI.
-- Sesi chat dibuka dari panel /admin/chat, bukan lewat skrip ini.
-- ============================================================================
-- DATA UJI TAHAP 5 — BUKA SESI
-- Jalankan seluruh isi berkas ini di Supabase SQL Editor sebelum menguji
-- formulir di beranda.
-- Untuk menutup sesi, jalankan berkas supabase-qna-tutup.sql.
-- ============================================================================

INSERT INTO sesi_onair (nama_program, jadwal_id, jam_mulai, jam_selesai, status)
VALUES (
  'Uji Coba Tanya Jawab WBS',
  (SELECT id FROM jadwal_tetap ORDER BY jam_mulai LIMIT 1),
  '00:00',
  '23:59',
  'terbuka'
);
