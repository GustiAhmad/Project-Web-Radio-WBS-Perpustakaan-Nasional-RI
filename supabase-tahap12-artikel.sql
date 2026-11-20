-- ============================================================================
-- TAHAP 12 — ARTIKEL & BERITA
-- Jalankan di Supabase SQL Editor. Aman dijalankan ulang (idempoten).
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. ENUM KATEGORI (3 pilihan tetap)
-- ----------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE kategori_artikel AS ENUM ('berita', 'artikel', 'pengumuman');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ----------------------------------------------------------------------------
-- 2. TABEL ARTIKEL
-- status memakai enum status_publikasi yang sudah ada: 'draf' | 'terbit'.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.artikel (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  judul VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  kategori kategori_artikel NOT NULL DEFAULT 'berita',
  ringkasan VARCHAR(300) NOT NULL,
  isi TEXT NOT NULL,
  gambar_path TEXT,
  gambar_url TEXT,
  teks_alternatif VARCHAR(200),
  status status_publikasi NOT NULL DEFAULT 'draf',
  penulis VARCHAR(150) NOT NULL,
  diterbitkan_pada TIMESTAMPTZ,
  dibuat_pada TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  dibuat_oleh VARCHAR(150),
  diubah_pada TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  diubah_oleh VARCHAR(150),
  CONSTRAINT ck_artikel_judul CHECK (char_length(btrim(judul)) BETWEEN 5 AND 200),
  CONSTRAINT ck_artikel_ringkasan CHECK (char_length(btrim(ringkasan)) BETWEEN 20 AND 300),
  CONSTRAINT ck_artikel_isi CHECK (char_length(btrim(isi)) >= 50),
  CONSTRAINT ck_artikel_terbit_lengkap CHECK (
    status = 'draf' OR diterbitkan_pada IS NOT NULL
  )
);

-- Tabel ini memakai kolom audit diubah_pada, bukan updated_at.
-- trigger_set_timestamp() menulis NEW.updated_at, sehingga tidak boleh dipasang
-- di sini. Nilai diubah_pada diisi oleh service artikel pada setiap perubahan.
-- Baris ini juga membersihkan trigger lama bila migrasi pernah dijalankan versi
-- sebelumnya.
DROP TRIGGER IF EXISTS set_timestamp_artikel ON public.artikel;

-- ----------------------------------------------------------------------------
-- 3. INDEKS & PENCARIAN TEKS BAHASA INDONESIA
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_artikel_terbit
  ON public.artikel(diterbitkan_pada DESC)
  WHERE status = 'terbit';

CREATE INDEX IF NOT EXISTS idx_artikel_kategori
  ON public.artikel(kategori, diterbitkan_pada DESC);

ALTER TABLE public.artikel ADD COLUMN IF NOT EXISTS search_vector tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('indonesian', coalesce(judul, '')), 'A') ||
  setweight(to_tsvector('indonesian', coalesce(ringkasan, '')), 'B') ||
  setweight(to_tsvector('indonesian', coalesce(isi, '')), 'D')
) STORED;

CREATE INDEX IF NOT EXISTS idx_artikel_fts ON public.artikel USING GIN(search_vector);

-- ----------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY
-- Publik hanya melihat artikel terbit. Admin dan Superadmin mengelola penuh.
-- ----------------------------------------------------------------------------
ALTER TABLE public.artikel ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Publik dapat membaca artikel terbit" ON public.artikel;
CREATE POLICY "Publik dapat membaca artikel terbit"
ON public.artikel FOR SELECT TO anon, authenticated
USING (status = 'terbit' AND diterbitkan_pada IS NOT NULL AND diterbitkan_pada <= NOW());

DROP POLICY IF EXISTS "Staf dapat membaca semua artikel" ON public.artikel;
CREATE POLICY "Staf dapat membaca semua artikel"
ON public.artikel FOR SELECT TO authenticated
USING (auth_is_staf());

DROP POLICY IF EXISTS "Staf dapat menambah artikel" ON public.artikel;
CREATE POLICY "Staf dapat menambah artikel"
ON public.artikel FOR INSERT TO authenticated
WITH CHECK (auth_is_staf());

DROP POLICY IF EXISTS "Staf dapat menyunting artikel" ON public.artikel;
CREATE POLICY "Staf dapat menyunting artikel"
ON public.artikel FOR UPDATE TO authenticated
USING (auth_is_staf())
WITH CHECK (auth_is_staf());

DROP POLICY IF EXISTS "Staf dapat menghapus artikel" ON public.artikel;
CREATE POLICY "Staf dapat menghapus artikel"
ON public.artikel FOR DELETE TO authenticated
USING (auth_is_staf());

-- ----------------------------------------------------------------------------
-- 5. CATATAN STORAGE
-- Sampul memakai bucket publik "aset-wbs" folder "artikel/".
-- Kebijakan storage.objects untuk bucket ini sudah berlaku untuk semua folder,
-- sehingga tidak perlu kebijakan baru.
-- ----------------------------------------------------------------------------
