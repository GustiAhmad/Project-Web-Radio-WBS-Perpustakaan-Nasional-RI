-- ============================================================================
-- SKEMA SUPABASE LENGKAP - RADIO & SINIAR WBS PERPUSNAS
-- Sumber: Dokumen 07 (DDL, indeks, RLS, seed data)
-- Cara pakai: jalankan seluruh isi berkas ini di Supabase SQL Editor.
-- Aman dijalankan ulang (idempoten).
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- TIPE ENUMERASI
-- ----------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE peran_pengguna AS ENUM ('superadmin', 'admin');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE kategori_topik AS ENUM (
    'layanan_perpustakaan',
    'naskah_nusantara',
    'literasi_keluarga',
    'sejarah_kebudayaan',
    'semua_kategori'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE jenis_seri AS ENUM ('resmi', 'keranjang');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE status_episode AS ENUM ('draf', 'tayang', 'arsip_internal');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE jenis_hari AS ENUM ('hari_kerja', 'sabtu', 'minggu');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE status_publikasi AS ENUM ('draf', 'terbit');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE status_sesi AS ENUM ('terbuka', 'tertutup');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE status_pertanyaan AS ENUM ('baru', 'dibacakan', 'disembunyikan');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE kanal_acara AS ENUM ('youtube', 'zoom', 'instagram', 'tatap_muka', 'lainnya');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ----------------------------------------------------------------------------
-- FUNGSI PEMICU PEMBARUAN OTOMATIS UPDATED_AT
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ----------------------------------------------------------------------------
-- 1. TABEL PENGGUNA
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pengguna (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    nama_lengkap VARCHAR(150) NOT NULL,
    peran peran_pengguna NOT NULL DEFAULT 'admin',
    status_aktif BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp_pengguna
BEFORE UPDATE ON pengguna
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- ----------------------------------------------------------------------------
-- 2. TABEL SERI
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS seri (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    kategori kategori_topik NOT NULL,
    jenis jenis_seri NOT NULL DEFAULT 'resmi',
    deskripsi TEXT NOT NULL,
    gambar_url TEXT,
    teks_alternatif VARCHAR(255),
    urutan INT NOT NULL DEFAULT 99,
    unggulan BOOLEAN NOT NULL DEFAULT false,
    dibuat_oleh UUID REFERENCES pengguna(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT ck_seri_deskripsi CHECK (char_length(deskripsi) >= 10)
);

CREATE TRIGGER set_timestamp_seri
BEFORE UPDATE ON seri
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- ----------------------------------------------------------------------------
-- 3. TABEL EPISODE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS episode (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seri_id UUID NOT NULL REFERENCES seri(id) ON DELETE RESTRICT,
    judul VARCHAR(255) NOT NULL,
    slug VARCHAR(280) NOT NULL,
    nomor_episode INT,
    tanggal_tayang DATE NOT NULL,
    durasi_detik INT NOT NULL DEFAULT 0,
    narasumber VARCHAR(255) NOT NULL DEFAULT 'Belum tercatat',
    moderator VARCHAR(255) NOT NULL DEFAULT 'Belum tercatat',
    topik VARCHAR(255) NOT NULL,
    kategori_khusus kategori_topik,
    tautan_youtube VARCHAR(255) NOT NULL UNIQUE,
    video_id VARCHAR(20) NOT NULL,
    deskripsi TEXT,
    status status_episode NOT NULL DEFAULT 'tayang',
    dibuat_oleh UUID REFERENCES pengguna(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_seri_slug UNIQUE (seri_id, slug),
    CONSTRAINT ck_episode_durasi CHECK (durasi_detik >= 0)
);

CREATE TRIGGER set_timestamp_episode
BEFORE UPDATE ON episode
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- ----------------------------------------------------------------------------
-- 4. TABEL JADWAL TETAP
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS jadwal_tetap (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    jam_mulai TIME NOT NULL,
    jam_selesai TIME NOT NULL,
    nama_program VARCHAR(150) NOT NULL,
    hari jenis_hari NOT NULL,
    interaktif BOOLEAN NOT NULL DEFAULT false,
    deskripsi TEXT,
    status status_publikasi NOT NULL DEFAULT 'terbit',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT ck_jadwal_jam CHECK (jam_mulai != jam_selesai),
    CONSTRAINT uq_jadwal_hari_jam UNIQUE (hari, jam_mulai)
);

CREATE TRIGGER set_timestamp_jadwal
BEFORE UPDATE ON jadwal_tetap
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- ----------------------------------------------------------------------------
-- 5. TABEL ACARA MENDATANG
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS acara_mendatang (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    judul VARCHAR(200) NOT NULL,
    tanggal DATE NOT NULL,
    jam_mulai TIME NOT NULL,
    jam_selesai TIME,
    kanal kanal_acara NOT NULL DEFAULT 'youtube',
    tautan_acara TEXT,
    gambar_url TEXT,
    deskripsi TEXT,
    status status_publikasi NOT NULL DEFAULT 'terbit',
    buka_sesi BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp_acara
BEFORE UPDATE ON acara_mendatang
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- ----------------------------------------------------------------------------
-- 6. TABEL SESI ON-AIR
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sesi_onair (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
    nama_program VARCHAR(150) NOT NULL,
    jadwal_id UUID REFERENCES jadwal_tetap(id) ON DELETE SET NULL,
    acara_id UUID REFERENCES acara_mendatang(id) ON DELETE SET NULL,
    jam_mulai TIME NOT NULL,
    jam_selesai TIME NOT NULL,
    status status_sesi NOT NULL DEFAULT 'terbuka',
    dibuka_oleh VARCHAR(150),
    ditutup_oleh VARCHAR(150),
    catatan_internal TEXT,
    dibuka_pada TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ditutup_pada TIMESTAMPTZ,
    CONSTRAINT ck_sesi_sumber CHECK (jadwal_id IS NOT NULL OR acara_id IS NOT NULL)
);

-- ----------------------------------------------------------------------------
-- 7. TABEL PERTANYAAN
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pertanyaan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sesi_id UUID NOT NULL REFERENCES sesi_onair(id) ON DELETE CASCADE,
    nama_pengirim VARCHAR(100) NOT NULL DEFAULT 'Anonim',
    isi_pertanyaan TEXT NOT NULL,
    status status_pertanyaan NOT NULL DEFAULT 'baru',
    catatan_petugas TEXT,
    ditandai_oleh VARCHAR(150),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT ck_panjang_pertanyaan CHECK (char_length(isi_pertanyaan) >= 10 AND char_length(isi_pertanyaan) <= 500),
    CONSTRAINT ck_panjang_nama CHECK (char_length(nama_pengirim) >= 2 AND char_length(nama_pengirim) <= 100)
);

CREATE TRIGGER set_timestamp_pertanyaan
BEFORE UPDATE ON pertanyaan
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- ----------------------------------------------------------------------------
-- 8. TABEL HALAMAN STATIS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS halaman_statis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) NOT NULL UNIQUE,
    judul VARCHAR(200) NOT NULL,
    ringkasan TEXT,
    konten_markdown TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp_halaman
BEFORE UPDATE ON halaman_statis
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- ----------------------------------------------------------------------------
-- 9. TABEL PENGATURAN SITUS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pengaturan_situs (
    kunci VARCHAR(100) PRIMARY KEY,
    nilai JSONB NOT NULL,
    deskripsi VARCHAR(255),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp_pengaturan
BEFORE UPDATE ON pengaturan_situs
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();


-- ============================================================================
-- BAGIAN 2: INDEKS, PENCARIAN TEKS, DAN ROW LEVEL SECURITY
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 2.1 INDEKS KUNCI ASING
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_episode_seri_id ON episode(seri_id);
CREATE INDEX IF NOT EXISTS idx_episode_dibuat_oleh ON episode(dibuat_oleh);
CREATE INDEX IF NOT EXISTS idx_seri_dibuat_oleh ON seri(dibuat_oleh);
CREATE INDEX IF NOT EXISTS idx_pertanyaan_sesi_id ON pertanyaan(sesi_id);
CREATE INDEX IF NOT EXISTS idx_sesi_jadwal_id ON sesi_onair(jadwal_id);
CREATE INDEX IF NOT EXISTS idx_sesi_acara_id ON sesi_onair(acara_id);

-- ----------------------------------------------------------------------------
-- 2.2 INDEKS PARTIAL UNTUK KONTEN TAYANG / TERBIT
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_episode_publik_terbaru
ON episode(tanggal_tayang DESC)
WHERE status = 'tayang';

CREATE INDEX IF NOT EXISTS idx_seri_unggulan
ON seri(urutan ASC)
WHERE unggulan = true AND jenis = 'resmi';

CREATE INDEX IF NOT EXISTS idx_acara_terbit
ON acara_mendatang(tanggal ASC, jam_mulai ASC)
WHERE status = 'terbit';

CREATE INDEX IF NOT EXISTS idx_jadwal_terbit
ON jadwal_tetap(hari, jam_mulai ASC)
WHERE status = 'terbit';

-- ----------------------------------------------------------------------------
-- 2.3 INDEKS FULL-TEXT SEARCH (GIN, BAHASA INDONESIA)
-- ----------------------------------------------------------------------------
ALTER TABLE episode ADD COLUMN IF NOT EXISTS search_vector tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('indonesian', coalesce(judul, '')), 'A') ||
  setweight(to_tsvector('indonesian', coalesce(topik, '')), 'B') ||
  setweight(to_tsvector('indonesian', coalesce(narasumber, '')), 'C') ||
  setweight(to_tsvector('indonesian', coalesce(deskripsi, '')), 'D')
) STORED;

CREATE INDEX IF NOT EXISTS idx_episode_fts ON episode USING GIN(search_vector);

ALTER TABLE seri ADD COLUMN IF NOT EXISTS search_vector tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('indonesian', coalesce(nama, '')), 'A') ||
  setweight(to_tsvector('indonesian', coalesce(deskripsi, '')), 'B')
) STORED;

CREATE INDEX IF NOT EXISTS idx_seri_fts ON seri USING GIN(search_vector);

-- ----------------------------------------------------------------------------
-- 2.4 PENGAKTIFAN ROW LEVEL SECURITY PADA SEMUA TABEL
-- ----------------------------------------------------------------------------
ALTER TABLE pengguna ENABLE ROW LEVEL SECURITY;
ALTER TABLE seri ENABLE ROW LEVEL SECURITY;
ALTER TABLE episode ENABLE ROW LEVEL SECURITY;
ALTER TABLE jadwal_tetap ENABLE ROW LEVEL SECURITY;
ALTER TABLE acara_mendatang ENABLE ROW LEVEL SECURITY;
ALTER TABLE sesi_onair ENABLE ROW LEVEL SECURITY;
ALTER TABLE pertanyaan ENABLE ROW LEVEL SECURITY;
ALTER TABLE halaman_statis ENABLE ROW LEVEL SECURITY;
ALTER TABLE pengaturan_situs ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- 2.5 FUNGSI BANTU PENGECEKAN PERAN
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION auth_is_superadmin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM pengguna
    WHERE auth_user_id = auth.uid()
    AND peran = 'superadmin'
    AND status_aktif = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION auth_is_staf()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM pengguna
    WHERE auth_user_id = auth.uid()
    AND status_aktif = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ----------------------------------------------------------------------------
-- 2.6 KEBIJAKAN RLS — PENGGUNA
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Staf dapat melihat profil sendiri" ON pengguna;
CREATE POLICY "Staf dapat melihat profil sendiri"
ON pengguna FOR SELECT TO authenticated
USING (auth_user_id = auth.uid() OR auth_is_superadmin());

DROP POLICY IF EXISTS "Hanya Superadmin yang boleh mengelola akun pengguna" ON pengguna;
CREATE POLICY "Hanya Superadmin yang boleh mengelola akun pengguna"
ON pengguna FOR ALL TO authenticated
USING (auth_is_superadmin())
WITH CHECK (auth_is_superadmin());

-- ----------------------------------------------------------------------------
-- 2.7 KEBIJAKAN RLS — SERI
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Publik dapat membaca seluruh seri" ON seri;
CREATE POLICY "Publik dapat membaca seluruh seri"
ON seri FOR SELECT TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Staf dapat memperbarui data seri" ON seri;
CREATE POLICY "Staf dapat memperbarui data seri"
ON seri FOR UPDATE TO authenticated
USING (auth_is_staf())
WITH CHECK (auth_is_staf());

DROP POLICY IF EXISTS "Hanya Superadmin yang boleh menambah atau menghapus seri" ON seri;
CREATE POLICY "Hanya Superadmin yang boleh menambah atau menghapus seri"
ON seri FOR INSERT TO authenticated
WITH CHECK (auth_is_superadmin());

DROP POLICY IF EXISTS "Hanya Superadmin yang boleh menghapus seri" ON seri;
CREATE POLICY "Hanya Superadmin yang boleh menghapus seri"
ON seri FOR DELETE TO authenticated
USING (auth_is_superadmin());

-- ----------------------------------------------------------------------------
-- 2.8 KEBIJAKAN RLS — EPISODE
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Publik hanya dapat membaca episode berstatus tayang" ON episode;
CREATE POLICY "Publik hanya dapat membaca episode berstatus tayang"
ON episode FOR SELECT TO anon
USING (status = 'tayang');

DROP POLICY IF EXISTS "Staf dapat membaca semua episode termasuk draf dan arsip" ON episode;
CREATE POLICY "Staf dapat membaca semua episode termasuk draf dan arsip"
ON episode FOR SELECT TO authenticated
USING (auth_is_staf());

DROP POLICY IF EXISTS "Staf dapat menambah dan menyunting episode" ON episode;
CREATE POLICY "Staf dapat menambah dan menyunting episode"
ON episode FOR INSERT TO authenticated
WITH CHECK (auth_is_staf());

DROP POLICY IF EXISTS "Staf dapat menyunting episode" ON episode;
CREATE POLICY "Staf dapat menyunting episode"
ON episode FOR UPDATE TO authenticated
USING (auth_is_staf())
WITH CHECK (auth_is_staf());

DROP POLICY IF EXISTS "Hanya Superadmin yang boleh menghapus permanen episode draf" ON episode;
CREATE POLICY "Hanya Superadmin yang boleh menghapus permanen episode draf"
ON episode FOR DELETE TO authenticated
USING (auth_is_superadmin() AND status = 'draf');

-- ----------------------------------------------------------------------------
-- 2.9 KEBIJAKAN RLS — JADWAL TETAP
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Publik dapat membaca jadwal siaran terbit" ON jadwal_tetap;
CREATE POLICY "Publik dapat membaca jadwal siaran terbit"
ON jadwal_tetap FOR SELECT TO anon, authenticated
USING (status = 'terbit');

DROP POLICY IF EXISTS "Staf dapat mengelola jadwal siaran" ON jadwal_tetap;
CREATE POLICY "Staf dapat mengelola jadwal siaran"
ON jadwal_tetap FOR ALL TO authenticated
USING (auth_is_staf())
WITH CHECK (auth_is_staf());

-- ----------------------------------------------------------------------------
-- 2.10 KEBIJAKAN RLS — ACARA MENDATANG
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Publik dapat membaca acara berstatus terbit" ON acara_mendatang;
CREATE POLICY "Publik dapat membaca acara berstatus terbit"
ON acara_mendatang FOR SELECT TO anon
USING (status = 'terbit');

DROP POLICY IF EXISTS "Staf dapat membaca dan mengelola semua pengumuman acara" ON acara_mendatang;
CREATE POLICY "Staf dapat membaca dan mengelola semua pengumuman acara"
ON acara_mendatang FOR ALL TO authenticated
USING (auth_is_staf())
WITH CHECK (auth_is_staf());

-- ----------------------------------------------------------------------------
-- 2.11 KEBIJAKAN RLS — SESI ON-AIR
-- Publik hanya melihat sesi yang sedang terbuka; catatan internal tetap tersembunyi
-- karena tidak ada kolom SELECT publik untuk staf non-login.
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Publik dapat membaca status sesi On-Air aktif" ON sesi_onair;
DROP POLICY IF EXISTS "Publik dapat melihat hanya sesi terbuka" ON sesi_onair;
CREATE POLICY "Publik dapat melihat sesi hari ini dan sesi terbuka"
ON sesi_onair FOR SELECT TO anon
USING (status = 'terbuka' OR tanggal = CURRENT_DATE);

DROP POLICY IF EXISTS "Staf dapat melihat semua sesi On-Air" ON sesi_onair;
CREATE POLICY "Staf dapat melihat semua sesi On-Air"
ON sesi_onair FOR SELECT TO authenticated
USING (auth_is_staf());

DROP POLICY IF EXISTS "Staf (Superadmin & Admin) dapat membuka dan menutup sesi" ON sesi_onair;
CREATE POLICY "Staf (Superadmin & Admin) dapat membuka dan menutup sesi"
ON sesi_onair FOR ALL TO authenticated
USING (auth_is_staf())
WITH CHECK (auth_is_staf());

-- ----------------------------------------------------------------------------
-- 2.12 KEBIJAKAN RLS — PERTANYAAN (PRIVASI PENDENGAR)
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Pengunjung dapat mengirim pertanyaan saat sesi terbuka" ON pertanyaan;
CREATE POLICY "Pengunjung dapat mengirim pertanyaan saat sesi terbuka"
ON pertanyaan FOR INSERT TO anon, authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM sesi_onair
    WHERE sesi_onair.id = pertanyaan.sesi_id
    AND sesi_onair.status = 'terbuka'
  )
);

DROP POLICY IF EXISTS "Hanya staf yang dapat membaca pertanyaan pendengar" ON pertanyaan;
CREATE POLICY "Hanya staf yang dapat membaca pertanyaan pendengar"
ON pertanyaan FOR SELECT TO authenticated
USING (auth_is_staf());

DROP POLICY IF EXISTS "Staf dapat mengurasi dan menandai pertanyaan" ON pertanyaan;
CREATE POLICY "Staf dapat mengurasi dan menandai pertanyaan"
ON pertanyaan FOR UPDATE TO authenticated
USING (auth_is_staf())
WITH CHECK (auth_is_staf());

DROP POLICY IF EXISTS "Staf dapat menghapus pertanyaan atau arsip sesi" ON pertanyaan;
CREATE POLICY "Staf dapat menghapus pertanyaan atau arsip sesi"
ON pertanyaan FOR DELETE TO authenticated
USING (auth_is_staf());

-- ----------------------------------------------------------------------------
-- 2.13 KEBIJAKAN RLS — HALAMAN STATIS
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Publik dapat membaca halaman statis" ON halaman_statis;
CREATE POLICY "Publik dapat membaca halaman statis"
ON halaman_statis FOR SELECT TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Staf dapat memperbarui isi halaman statis" ON halaman_statis;
CREATE POLICY "Staf dapat memperbarui isi halaman statis"
ON halaman_statis FOR UPDATE TO authenticated
USING (auth_is_staf())
WITH CHECK (auth_is_staf());

-- ----------------------------------------------------------------------------
-- 2.14 KEBIJAKAN RLS — PENGATURAN SITUS
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Semua dapat membaca pengaturan umum website" ON pengaturan_situs;
CREATE POLICY "Semua dapat membaca pengaturan umum website"
ON pengaturan_situs FOR SELECT TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Hanya Superadmin yang berwenang mengubah pengaturan situs" ON pengaturan_situs;
CREATE POLICY "Hanya Superadmin yang berwenang mengubah pengaturan situs"
ON pengaturan_situs FOR UPDATE TO authenticated
USING (auth_is_superadmin())
WITH CHECK (auth_is_superadmin());


-- ============================================================================
-- BAGIAN 3A: SEED SERI DAN JADWAL
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 3.1 SEED 21 SERI RESMI + 1 KERANJANG LAINNYA
-- ----------------------------------------------------------------------------
INSERT INTO seri (nama, slug, kategori, jenis, urutan, unggulan, deskripsi) VALUES
('LibTalk', 'libtalk', 'layanan_perpustakaan', 'resmi', 1, true, 'Bincang inspiratif seputar inovasi layanan perpustakaan dan pengembangan kepustakawanan nasional.'),
('SUPER MORNING', 'super-morning', 'layanan_perpustakaan', 'resmi', 2, true, 'Program pagi pembangkit semangat menyajikan obrolan literasi terkini bersama praktisi perpustakaan.'),
('Bimbingan Pemustaka & Literasi Informasi', 'bimbingan-pemustaka-literasi-informasi', 'layanan_perpustakaan', 'resmi', 3, true, 'Panduan praktis pemanfaatan koleksi, pangkalan data ilmiah, dan layanan penelusuran Perpusnas.'),
('Sosialisasi Program & Layanan Perpusnas', 'sosialisasi-program-layanan-perpusnas', 'layanan_perpustakaan', 'resmi', 4, false, 'Diseminasi kebijakan penyerahan karya cetak/karya rekam, ISBN, dan fasilitasi perpustakaan daerah.'),
('LibTalk Reference Series', 'libtalk-reference-series', 'layanan_perpustakaan', 'resmi', 5, false, 'Pembahasan mendalam seputar layanan referensi, kajian bibliografi, dan rujukan naskah nusantara.'),
('Kunjungan Virtual ke Perpusnas', 'kunjungan-virtual-ke-perpusnas', 'layanan_perpustakaan', 'resmi', 6, false, 'Jelajah fasilitas gedung layanan perpustakaan tertinggi di dunia dan museum naskah secara daring.'),
('AP PASTI Menyapa', 'ap-pasti-menyapa', 'layanan_perpustakaan', 'resmi', 7, false, 'Forum silaturahmi dan dialog terbuka penguatan jejaring asosiasi pustakawan di seluruh Indonesia.'),
('SUDUT INSPIRASI', 'sudut-inspirasi', 'layanan_perpustakaan', 'resmi', 8, false, 'Ulasan kisah sukses, inovasi kepustakawanan daerah, dan dedikasi penggerak literasi akar rumput.'),
('DP on Podcast', 'dp-on-podcast', 'layanan_perpustakaan', 'resmi', 9, false, 'Bincang santai dan dialog aktual bersama pimpinan Dewan Pengawas dan Pejabat Perpusnas RI.'),
('Seri Pengantar Teori Ilmu Perpustakaan, Arsip, dan Museum', 'pengantar-teori-ilmu-perpustakaan-arsip-museum', 'layanan_perpustakaan', 'resmi', 10, false, 'Kajian akademik dan pengantar konseptual pengelolaan memori kolektif bangsa dalam GLAM.'),
('Diskusi Naskah Nusantara', 'diskusi-naskah-nusantara', 'naskah_nusantara', 'resmi', 11, true, 'Kajian filologi, kodikologi, dan nilai luhur peradaban bangsa yang termaktub dalam naskah kuno nusantara.'),
('FGD IKON', 'fgd-ikon', 'naskah_nusantara', 'resmi', 12, true, 'Diskusi kelompok terpumpun pelestarian, transliterasi, dan digitalisasi Naskah Kuno Nusantara (IKON).'),
('Penggalian Potensi Naskah Kuno Nusantara', 'penggalian-potensi-naskah-kuno-nusantara', 'naskah_nusantara', 'resmi', 13, false, 'Eksplorasi kearifan lokal nusantara di berbagai pelosok daerah untuk riset dan identitas bangsa.'),
('Kelas Literasi Naskah Nusantara', 'kelas-literasi-naskah-nusantara', 'naskah_nusantara', 'resmi', 14, false, 'Pelatihan pengenalan aksara kuno nusantara, perawatan fisik naskah daluang, dan sastra klasik.'),
('PESONA NUSANTARA', 'pesona-nusantara', 'naskah_nusantara', 'resmi', 15, false, 'Ragam khazanah kebudayaan tradisional, adat istiadat, dan warisan dokumenter adiluhung nusantara.'),
('Naskah Kuno Indonesia Menuju Ingatan Dunia', 'naskah-kuno-indonesia-menuju-ingatan-dunia', 'naskah_nusantara', 'resmi', 16, false, 'Advokasi dan sosialisasi pendaftaran manuskrip nusantara sebagai Warisan Ingatan Dunia (UNESCO MoW).'),
('Kelas Literasi Siniar', 'kelas-literasi-siniar', 'literasi_keluarga', 'resmi', 17, true, 'Edukasi produksi konten audio siniar literasi, teknik siaran suara, dan diseminasi informasi digital.'),
('CERITA BUKI', 'cerita-buki', 'literasi_keluarga', 'resmi', 18, false, 'Mendongeng dan pembacaan cerita anak edukatif nusantara bersama maskot BUKI Perpusnas RI.'),
('NGOPI SENSASI', 'ngopi-sensasi', 'literasi_keluarga', 'resmi', 19, false, 'Ngobrol Pintar Seputar Naskah dan Literasi dengan suasana santai penuh wawasan keluarga.'),
('Diskusi JASMERAH', 'diskusi-jasmerah', 'sejarah_kebudayaan', 'resmi', 20, false, 'Dialog sejarah penelusuran arsip dan naskah tokoh pahlawan pergerakan kemerdekaan Indonesia.'),
('Gelarwicara', 'gelarwicara', 'sejarah_kebudayaan', 'resmi', 21, false, 'Gelar wicara publik bersama tokoh sastrawan, sejarawan, dan akademisi kebudayaan terkemuka.'),
('Lainnya', 'lainnya', 'semua_kategori', 'keranjang', 999, false, 'Dokumentasi kegiatan webinar tunggal, liputan seremonial, dan rekaman kegiatan lepasan WBS.')
ON CONFLICT (slug) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 3.2 SEED 72 BARIS JADWAL TETAP (24 HARI KERJA + SABTU + MINGGU)
-- ----------------------------------------------------------------------------
INSERT INTO jadwal_tetap (jam_mulai, jam_selesai, nama_program, hari, interaktif, deskripsi) VALUES
('06:00:00', '07:00:00', 'Opening', 'hari_kerja', false, 'Pembukaan siaran radio harian, lagu kebangsaan, dan salam pagi pembuka.'),
('07:00:00', '08:00:00', 'Lagu', 'hari_kerja', false, 'Pemutaran lagu-lagu penyemangat pagi nusantara.'),
('08:00:00', '09:00:00', 'Lagu', 'hari_kerja', false, 'Lagu-lagu hits populer Indonesia pengiring aktivitas kerja.'),
('09:00:00', '10:00:00', 'Indonesia Pagi Ini', 'hari_kerja', true, 'Siaran interaktif informasi aktual, warta literasi, dan sapa pendengar nusantara.'),
('10:00:00', '11:00:00', 'Pesona Nusantara', 'hari_kerja', true, 'Kajian khazanah budaya daerah, naskah nusantara, dan dialog interaktif pemustaka.'),
('11:00:00', '12:00:00', 'Pesona Nusantara', 'hari_kerja', true, 'Lanjutan program dialog budaya nusantara dan ulasan kearifan lokal.'),
('12:00:00', '13:00:00', 'Audiobook', 'hari_kerja', false, 'Pembacaan buku audio pilihan koleksi Perpustakaan Nasional RI.'),
('13:00:00', '14:00:00', 'Ruang Literasi', 'hari_kerja', true, 'Diskusi interaktif seputar kepustakawanan, bedah buku, dan isu literasi nasional.'),
('14:00:00', '15:00:00', 'Ruang Literasi', 'hari_kerja', true, 'Lanjutan dialog ruang literasi bersama narasumber tamu dan pustakawan ahli.'),
('15:00:00', '16:00:00', 'Lagu', 'hari_kerja', false, 'Pemutaran lagu pop santai nusantara pengiring sore.'),
('16:00:00', '17:00:00', 'Lagu', 'hari_kerja', false, 'Koleksi lagu favorit pilihan pendengar WBS.'),
('17:00:00', '18:00:00', 'Religi', 'hari_kerja', false, 'Program siraman rohani dan lagu pengantar senja.'),
('18:00:00', '19:00:00', 'Tausiyah', 'hari_kerja', false, 'Kajian keagamaan dan pesan-pesan moral budi pekerti bangsa.'),
('19:00:00', '20:00:00', 'Lagu Bebas', 'hari_kerja', false, 'Musik akustik dan tembang kenangan pengiring istirahat malam.'),
('20:00:00', '21:00:00', 'Audiobook', 'hari_kerja', false, 'Pembacaan sandiwara audio dan karya sastra klasik nusantara.'),
('21:00:00', '22:00:00', 'Audiobook', 'hari_kerja', false, 'Lanjutan pembacaan novel audio dan biografi tokoh pahlawan.'),
('22:00:00', '23:00:00', 'Audiobook', 'hari_kerja', false, 'Audiobook segmen malam kisah inspiratif sejarah bangsa.'),
('23:00:00', '00:00:00', 'Audiobook', 'hari_kerja', false, 'Pembacaan karya naskah hikayat kuno nusantara.'),
('00:00:00', '01:00:00', 'Audiobook', 'hari_kerja', false, 'Audiobook peneman dini hari kisah sastra nusantara.'),
('01:00:00', '02:00:00', 'Audiobook', 'hari_kerja', false, 'Audiobook lanjutan cerita rakyat kepulauan Indonesia.'),
('02:00:00', '03:00:00', 'Audiobook', 'hari_kerja', false, 'Audiobook kajian sejarah dan dokumentasi masa lampau.'),
('03:00:00', '04:00:00', 'Audiobook', 'hari_kerja', false, 'Audiobook pembacaan babad dan serat kuno adiluhung.'),
('04:00:00', '05:00:00', 'Audiobook', 'hari_kerja', false, 'Audiobook segmen subuh sastra kebijaksanaan hidup.'),
('05:00:00', '06:00:00', 'Tausiyah + Lagu Religi', 'hari_kerja', false, 'Renungan pagi, kajian kebaikan, dan lagu religi penutup siklus siaran harian.')
ON CONFLICT (hari, jam_mulai) DO NOTHING;

INSERT INTO jadwal_tetap (jam_mulai, jam_selesai, nama_program, hari, interaktif, deskripsi)
SELECT
    jam_mulai, jam_selesai,
    CASE
        WHEN jam_mulai IN ('10:00:00', '11:00:00') THEN 'Dongeng + Lagu Anak'
        WHEN jam_mulai = '15:00:00' THEN 'Lagu Daerah'
        WHEN jam_mulai >= '20:00:00' OR jam_mulai < '05:00:00' THEN 'Wayang'
        ELSE nama_program
    END,
    'sabtu' AS hari,
    CASE WHEN jam_mulai IN ('09:00:00', '13:00:00', '14:00:00') THEN true ELSE false END,
    CASE
        WHEN jam_mulai IN ('10:00:00', '11:00:00') THEN 'Dongeng anak edukatif dan pemutaran lagu anak-anak nusantara.'
        WHEN jam_mulai = '15:00:00' THEN 'Pemutaran khazanah musik dan tembang lagu daerah dari Sabang sampai Merauke.'
        WHEN jam_mulai >= '20:00:00' OR jam_mulai < '05:00:00' THEN 'Lakon sandiwara audio wayang kulit dan wayang golek klasik semalam suntuk.'
        ELSE deskripsi
    END
FROM jadwal_tetap WHERE hari = 'hari_kerja'
ON CONFLICT (hari, jam_mulai) DO NOTHING;

INSERT INTO jadwal_tetap (jam_mulai, jam_selesai, nama_program, hari, interaktif, deskripsi)
SELECT jam_mulai, jam_selesai, nama_program, 'minggu' AS hari, interaktif, deskripsi
FROM jadwal_tetap WHERE hari = 'sabtu'
ON CONFLICT (hari, jam_mulai) DO NOTHING;


-- ============================================================================
-- BAGIAN 3B: SEED PENGATURAN SITUS DAN HALAMAN STATIS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 3.3 PENGATURAN SITUS BAWAAN
-- Logo, favicon, dan jam layanan diselaraskan dengan revisi Tahap 1.
-- ----------------------------------------------------------------------------
INSERT INTO pengaturan_situs (kunci, nilai, deskripsi) VALUES
('identitas', jsonb_build_object(
  'nama_situs', 'Radio & Siniar WBS Perpusnas',
  'tagline', 'Menyuarakan Literasi, Merawat Peradaban Nusantara',
  'logo_url', '/LOGO-PERPUSNAS.svg',
  'favicon_url', '/LOGO-PERPUSNAS.svg'
), 'Identitas visual dan nama resmi portal layanan'),
('audio_stream', jsonb_build_object(
  'stream_url', 'https://stream-wbs.perpusnas.go.id/live',
  'pesan_gangguan', 'Siaran radio sedang mengalami pemeliharaan teknis. Silakan coba beberapa saat lagi.',
  'auto_reconnect', true
), 'Konfigurasi aliran audio Icecast studio HTTPS'),
('kontak', jsonb_build_object(
  'alamat', 'Gedung Fasilitas Layanan Perpustakaan Nasional RI, Jl. Medan Merdeka Selatan No. 11, Jakarta Pusat 10110',
  'surel', 'wbsradio@perpusnas.go.id',
  'telepon', '(021) 3870070',
  'jam_layanan', 'Setiap hari',
  'tautan_pengaduan', 'https://www.lapor.go.id'
), 'Direktori kontak resmi dan kanal pengaduan SP4N-LAPOR'),
('media_sosial', jsonb_build_object(
  'youtube', 'https://www.youtube.com/@WBSRadioPerpusnas',
  'instagram', 'https://www.instagram.com/perpusnas.go.id',
  'facebook', 'https://www.facebook.com/ayokeperpusnas',
  'x', 'https://twitter.com/perpusnas1',
  'whatsapp', 'https://wa.me/628111977777'
), 'Tautan akun media sosial aktif institusi'),
('analitik', jsonb_build_object(
  'ga_id', 'G-XXXXXXXXXX',
  'aktifkan_analitik', false,
  'anonymize_ip', true
), 'Konfigurasi Google Analytics 4 patuh privasi'),
('operasional', jsonb_build_object(
  'zona_waktu', 'WIB',
  'rate_limit_pertanyaan_menit', 10,
  'max_pertanyaan_per_sesi', 3,
  'masa_tenggang_sesi_menit', 15
), 'Parameter operasional sistem dan pembatasan spam')
ON CONFLICT (kunci) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 3.4 HALAMAN STATIS AWAL
-- ----------------------------------------------------------------------------
INSERT INTO halaman_statis (slug, judul, ringkasan, konten_markdown) VALUES
('tentang', 'Tentang Radio dan Siniar WBS Perpusnas', 'Mengenal Layanan Radio dan Siniar Widya Bahana Swara Perpustakaan Nasional RI.', 'Radio Widya Bahana Swara (WBS) adalah layanan penyiaran resmi Perpustakaan Nasional RI yang dikelola oleh Pusat Jasa Informasi Perpustakaan dan Pengelolaan Naskah Nusantara (PUJASINTARA). WBS mengudara setiap hari menyuarakan kekayaan literasi, kajian naskah kuno nusantara, sejarah bangsa, dan pengembangan profesi pustakawan Indonesia.')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO halaman_statis (slug, judul, ringkasan, konten_markdown) VALUES
('kontak', 'Kontak Layanan WBS', 'Alamat dan kanal pengaduan resmi.', 'Layanan WBS berlokasi di Jl. Medan Merdeka Selatan No. 11, Jakarta Pusat. Hubungi kami melalui surel wbsradio@perpusnas.go.id.')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO halaman_statis (slug, judul, ringkasan, konten_markdown) VALUES
('kebijakan-privasi', 'Kebijakan Privasi Layanan', 'Pelindungan data pribadi pemustaka.', 'Formulir pertanyaan On-Air mengizinkan nama samaran. Kami tidak menyimpan alamat IP mentah di basis data aplikasi. Analitik kunjungan memakai penyamaran IP untuk statistik agregat.')
ON CONFLICT (slug) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 3.5 REALTIME CDC — TANYA JAWAB ON-AIR
-- Diperlukan agar perubahan sesi dan pertanyaan sampai ke browser tanpa refresh.
-- ----------------------------------------------------------------------------
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
