-- ============================================================================
-- USANG SEJAK TAHAP 11 — JANGAN DIJALANKAN LAGI.
-- Sesi chat ditutup dari panel /admin/chat, bukan lewat skrip ini.
-- ============================================================================
-- UJI TAHAP 5 — TUTUP SESI
-- Jalankan seluruh isi berkas ini di Supabase SQL Editor setelah pertanyaan
-- terkirim. Kartu formulir berubah tanpa perlu menyegarkan browser.
-- ============================================================================

UPDATE sesi_onair
SET status = 'tertutup',
    ditutup_pada = NOW(),
    ditutup_oleh = 'Uji Coba'
WHERE nama_program LIKE 'Uji%'
  AND status = 'terbuka';
