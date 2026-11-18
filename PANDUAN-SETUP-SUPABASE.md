# Panduan Setup Supabase — Radio & Siniar WBS Perpusnas

Panduan ini dipakai untuk Tahap 2. Seluruh berkas SQL sudah disiapkan di folder proyek. Anda hanya perlu menjalankannya di Supabase SQL Editor dan mengisi kredensial di berkas `.env`.

## 1. Buat proyek Supabase

1. Buka https://supabase.com dan masuk dengan akun GitHub.
2. Klik **New project**, isi nama proyek `radio-wbs-perpusnas`.
3. Pilih region **Southeast Asia (Singapore)** agar latensi dari Indonesia rendah.
4. Buat kata sandi basis data yang kuat, lalu simpan di tempat aman.
5. Tunggu hingga status proyek menjadi **Active**.

Tier gratis mencukupi. Tidak perlu kartu kredit untuk skala katalog ini.

## 2. Jalankan skema utama

1. Di dasbor Supabase, buka **SQL Editor**.
2. Klik **New query**.
3. Salih seluruh isi berkas `supabase-schema.sql` ke editor.
4. Klik **Run**.
5. Periksa hasil: tidak boleh ada pesan galat merah.

Skrip ini idempoten, jadi aman dijalankan ulang. Skrip membuat 9 tabel, 9 pengaktifan RLS, 26 kebijakan akses, indeks GIN bahasa Indonesia, 22 baris seri, 72 baris jadwal, 6 pengaturan situs, dan 3 halaman statis.

## 3. Impor katalog 331 video

1. Masih di **SQL Editor**, klik **New query**.
2. Salih seluruh isi berkas `supabase-catalog-insert.sql` ke editor.
3. Klik **Run**.
4. Periksa hasil: tidak boleh ada pesan galat merah.

Berkas ini berisi tepat 331 baris episode: 249 episode pada 21 seri resmi dan 82 video pada keranjang "Lainnya". Sumber datanya adalah `metadata_youtube.csv` yang sudah direkonsiliasi. Skrip memakai `ON CONFLICT`, jadi aman dijalankan ulang.

Jika ingin menghasilkan ulang berkas SQL dari data mentah, jalankan:

```bash
python scripts/migrate_catalog.py
```

## 4. Isi kredensial frontend

1. Di dasbor Supabase, klik tombol **Connect** di kanan atas halaman proyek, lalu salin **Project URL** (bentuknya `https://xxxx.supabase.co`). URL ini bisa juga ditebak dari **Project ID** di **Project Settings → General**: `https://<project-id>.supabase.co`. Ini bukan API key.
2. Buka tab **API Keys**, lalu salin nilai **Publishable key** yang diawali `sb_publishable_`.
3. Di folder proyek, salin `.env.example` menjadi `.env`.
4. Isi dua baris berikut:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_...
```

Jangan pernah menyalin **Secret key** (`sb_secret_...`) ke berkas `.env`, kode frontend, atau repositori Git. Kunci itu setara `service_role`: bisa melewati RLS dan mengakses seluruh data. Karena Vite menyertakan variabel `VITE_` ke dalam bundle JavaScript, kunci tersebut akan terbaca publik. Nilai `eyJhbGci...` di `.env.example` hanyalah contoh format anon key lama; format `sb_publishable_` yang lebih baru didukung oleh SDK yang terpasang.

## 5. Verifikasi isi basis data

Jalankan kueri berikut di **SQL Editor**:

```sql
SELECT
  (SELECT count(*) FROM seri) AS seri,
  (SELECT count(*) FROM episode) AS episode,
  (SELECT count(*) FROM episode WHERE seri_id IN (SELECT id FROM seri WHERE jenis = 'resmi')) AS episode_resmi,
  (SELECT count(*) FROM episode WHERE seri_id IN (SELECT id FROM seri WHERE slug = 'lainnya')) AS lainnya,
  (SELECT count(*) FROM jadwal_tetap) AS jadwal,
  (SELECT count(*) FROM pengaturan_situs) AS pengaturan,
  (SELECT count(*) FROM halaman_statis) AS halaman;
```

Angka yang diharapkan: `seri = 22`, `episode = 331`, `episode_resmi = 249`, `lainnya = 82`, `jadwal = 72`, `pengaturan = 6`, `halaman = 3`.

Untuk memeriksa RLS, jalankan:

```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

Kolom `rowsecurity` harus `true` untuk kesembilan tabel.

## 5b. Aktifkan Realtime tanya jawab (Tahap 5)

1. Di **SQL Editor**, klik **New query**.
2. Salih seluruh isi berkas `supabase-qna-realtime.sql` ke editor, lalu klik **Run**.
3. Salih seluruh isi berkas `supabase-qna-uji.sql` hanya saat menguji formulir di beranda, lalu klik **Run**.
4. Untuk menutup sesi, jalankan seluruh isi berkas `supabase-qna-tutup.sql`. Berkas ini menutup semua sesi dengan awalan `Uji`.
5. Untuk menguji label live YouTube, jalankan seluruh isi berkas `supabase-qna-live.sql`, lalu tutup kembali dengan `supabase-qna-tutup.sql`.

Berkas `supabase-qna-realtime.sql` menambahkan `sesi_onair` dan `pertanyaan` ke publication `supabase_realtime`, serta mengizinkan publik melihat sesi hari ini yang sudah ditutup. Tanpa itu, kartu formulir tidak menerima kabar penutupan sesi tanpa refresh. Frontend tidak pernah meminta kolom `catatan_internal`, `dibuka_oleh`, atau `ditutup_oleh`.

## 6. Buat akun pengelola pertama

1. Buka **Authentication** lalu **Users** di dasbor Supabase.
2. Klik **Add user**, lalu **Create new user**.
3. Masukkan email dan kata sandi resmi pengelola.
4. Centang **Auto Confirm User** agar akun langsung aktif.
5. Setelah akun dibuat, salin **UID** akun tersebut.
6. Kembali ke **SQL Editor** dan jalankan kueri berikut, ganti UID dan identitas sesuai data sebenarnya:

```sql
INSERT INTO pengguna (auth_user_id, email, nama_lengkap, peran)
VALUES (
  'UID-DARI-AUTH-USERS',
  'nama@perpusnas.go.id',
  'Nama Lengkap',
  'superadmin'
);
```

Tambahkan akun kedua dengan peran `admin` untuk operasional harian. Proyek ini hanya mengenal dua peran: `superadmin` dan `admin`. Tidak ada peran tambahan.

## 7. Uji dari frontend

1. Jalankan `start-server.bat` atau `npm run dev`.
2. Buka http://localhost:5173.
3. Tekan **F12** untuk membuka Developer Tools, lalu pilih tab **Console**.
4. Cari pesan `[WBS] Supabase terhubung. Contoh seri:` beserta tiga seri pertama.
5. Jika muncul `[WBS] Gagal terhubung ke Supabase`, periksa kembali URL dan anon key di `.env`, lalu restart server.

## Catatan keamanan

- Publik hanya bisa membaca episode berstatus `tayang`, jadwal dan acara berstatus `terbit`, serta sesi On-Air hari ini atau yang sedang `terbuka` tanpa kolom internal.
- Publik tidak bisa membaca pertanyaan pendengar. Pertanyaan hanya bisa dikirim saat sesi terbuka.
- Hanya `superadmin` yang bisa mengubah pengaturan situs dan mengelola akun.
- Semua kredensial berada di `.env` dan tidak masuk ke repositori Git.
