-- ============================================================================
-- USANG SEJAK TAHAP 11 — JANGAN DIJALANKAN LAGI.
-- Tabel sesi_onair sudah dihapus. Sesi chat dibuka dari panel /admin/chat.
-- ============================================================================
-- UJI TAHAP 5 — MODE LIVE YOUTUBE (M-19)
-- Jalankan seluruh isi berkas ini setelah sesi uji biasa ditutup.
-- Untuk menutup sesi ini, jalankan berkas supabase-qna-tutup.sql.
-- ============================================================================

INSERT INTO acara_mendatang (judul, tanggal, jam_mulai, kanal, status)
VALUES ('Uji Webinar YouTube', CURRENT_DATE, '00:00', 'youtube', 'terbit');

INSERT INTO sesi_onair (nama_program, acara_id, jam_mulai, jam_selesai, status)
VALUES (
  'Uji Webinar YouTube',
  (SELECT id FROM acara_mendatang WHERE judul = 'Uji Webinar YouTube' LIMIT 1),
  '00:00',
  '23:59',
  'terbuka'
);
