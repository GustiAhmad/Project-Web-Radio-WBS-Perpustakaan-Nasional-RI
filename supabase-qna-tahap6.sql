-- ============================================================================
-- USANG SEJAK TAHAP 11 — JANGAN DIJALANKAN LAGI.
-- Sesi chat tidak lagi terikat jadwal atau penanda interaktif.
-- ============================================================================
-- PENANDA SESI TANYA JAWAB — REVIEW GATE 6
-- ============================================================================
-- Jalankan sekali di Supabase SQL Editor setelah skema utama terpasang.
-- Tujuan: hanya tiga program unggulan yang dapat menginisiasi sesi tanya jawab.
-- Petugas dapat mengubah centang ini kelak lewat menu Jadwal Siaran di panel admin.

UPDATE public.jadwal_tetap
SET interaktif = false
WHERE interaktif = true;

UPDATE public.jadwal_tetap
SET interaktif = true
WHERE nama_program IN ('Indonesia Pagi Ini', 'Pesona Nusantara', 'Ruang Literasi');

-- Verifikasi: tiga program di atas berpenanda true, "Opening" dan sisanya false.
SELECT hari, jam_mulai, nama_program, interaktif
FROM public.jadwal_tetap
WHERE nama_program IN ('Opening', 'Indonesia Pagi Ini', 'Pesona Nusantara', 'Ruang Literasi')
ORDER BY hari, jam_mulai;
