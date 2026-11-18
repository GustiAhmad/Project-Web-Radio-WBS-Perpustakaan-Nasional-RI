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

## 5c. Migrasi panel admin dan laporan error (Tahap 6)

1. Di **SQL Editor**, klik **New query**.
2. Salih seluruh isi berkas `supabase-admin-tahap6.sql`, lalu klik **Run**. Berkas ini menambah kolom `nama_penyiar` pada `jadwal_tetap` dan `disorot` pada `pertanyaan`.
3. Buat query baru, salih seluruh isi berkas `supabase-laporan-error.sql`, lalu klik **Run**.
4. Buat query baru, salih seluruh isi berkas `supabase-qna-tahap6.sql`, lalu klik **Run**. Berkas ini menandai tiga program unggulan sebagai sesi tanya jawab dan mematikan penanda program lain, termasuk **Opening**.
5. Periksa **Storage**. Harus ada bucket privat bernama `laporan-error` dengan batas 2 MB dan tiga jenis MIME gambar.
6. Periksa kembali `pg_tables`. Sekarang ada 11 tabel dengan `rowsecurity = true`.

Screenshot laporan disimpan di bucket privat. Superadmin membuka gambar lewat tautan bertanda tangan yang hanya berlaku dua menit. Tidak ada audio atau video mentah yang disimpan di server.

Dropdown **Tanya Jawab On-Air** hanya menampilkan program berpenanda `interaktif = true` untuk hari WIB berjalan, dengan **Indonesia Pagi Ini**, **Pesona Nusantara**, dan **Ruang Literasi** di urutan teratas. Program tanpa penanda tidak bisa membuka sesi. Centang penanda ini di menu **Jadwal Siaran** bila diperlukan. Saat membuka sesi, petugas mengisi target durasi dalam menit; jam selesai sesi dihitung dari jam mulai ditambah durasi tersebut, sehingga acara panjang tidak terpotong lebih awal.

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

## 6b. Aktifkan notifikasi surel laporan error (Resend)

Langkah 20 Review Gate 6 dinyatakan lolos setelah kunci Resend, secret, fungsi, webhook, penerima, dan uji kirim semuanya beres. Pengiriman surel tidak dijalankan dari browser. Frontend hanya menyimpan laporan. Edge Function membaca kunci dari Supabase secret, mencari superadmin aktif di tabel `pengguna`, lalu memanggil Resend.

Semua langkah di bawah bisa dilakukan lewat dashboard, tanpa memasang Supabase CLI.

### A. Kunci dan alamat Resend

1. Buka https://resend.com, daftar atau masuk, lalu buka **API Keys** dan klik **Create API Key**.
2. Beri nama `wbs-perpusnas`, pilih akses **Sending access**, lalu salin kunci `re_...`.
3. Untuk uji coba, pakai pengirim `onboarding@resend.dev`. Pengirim bawaan Resend ini hanya boleh mengirim ke alamat surel yang dipakai saat mendaftar. Untuk produksi, verifikasi domain sendiri dan pakai `WBS Perpusnas <noreply@domain-anda>`.
4. Tentukan penerima dengan kueri di SQL Editor:

```sql
SELECT email, nama_lengkap FROM public.pengguna
WHERE peran = 'superadmin' AND status_aktif = true;
```

Alamat yang muncul di situlah yang akan menerima notifikasi.

### B. Pasang secret di Supabase

1. Buka dasbor proyek, pilih **Edge Functions**, lalu tab **Secrets**.
2. Tambahkan tiga secret ini:

| Nama | Nilai |
|---|---|
| `RESEND_API_KEY` | `re_...` dari langkah A |
| `EMAIL_DARI` | `WBS Perpusnas <onboarding@resend.dev>` atau domain terverifikasi |
| `URL_PANEL_ADMIN` | `https://<username>.github.io/<repo>/admin/laporan-error` |

3. Jangan menulis nilai secret ke `.env`, berkas TypeScript, atau repositori. Edge Function mendapat `SUPABASE_URL` dan kredensial internal otomatis dari lingkungan Supabase.

### C. Pasang Edge Function

1. Di **Edge Functions**, klik **Deploy a new function** lalu pilih **Via Editor**.
2. Beri nama persis `kirim-notifikasi-laporan`.
3. Salih seluruh isi berkas `supabase/functions/kirim-notifikasi-laporan/index.ts` ke editor, lalu klik **Deploy function**.
4. Periksa status deploy berhasil. Fungsi aktif di `https://<project-id>.supabase.co/functions/v1/kirim-notifikasi-laporan`.
5. Cara lewat CLI juga didukung dan lebih cocok untuk pembaruan berikutnya:
   ```powershell
   supabase login
   supabase link --project-ref xfybznzzwrpynrizikyd
   $env:RESEND_API_KEY = 're_XXXX'
   $env:EMAIL_DARI = 'WBS Perpusnas <onboarding@resend.dev>'
   $env:URL_PANEL_ADMIN = 'https://<username>.github.io/<repo>/admin/laporan-error'
   .\pasang-resend.ps1
   ```
   Skrip `pasang-resend.ps1` membaca kunci dari variabel lingkungan, menyimpan tiga secret, lalu men-deploy fungsi. Jalankan `supabase link` sekali saja; SHA kata sandi database tidak disimpan di repositori. Berkas `supabase/config.toml` sudah menonaktifkan `verify_jwt` untuk fungsi ini.

Fungsi menolak pemanggil yang tidak dikenali. Webhook database mengirim kunci proyek pada header `apikey` lewat menu **Add secret key** di langkah D. Jika Anda memakai secret kustom, daftarkan `WEBHOOK_SECRET` di tab Secrets dan kirim header `x-webhook-secret` dengan nilai yang sama persis.

### D. Buat Database Webhook

1. Buka **Database > Webhooks**, klik **Create a new webhook**.
2. Isi nama `laporan-error-baru`.
3. Pilih tabel `public.laporan_error` dan centang hanya event **INSERT**.
4. Pada **Type of webhook**, pilih **Supabase Edge Functions**, lalu pilih `kirim-notifikasi-laporan`.
5. Klik **Add secret key** pada bagian **HTTP Headers**.
6. Klik **Create webhook**.

### E. Uji langkah 20

1. Buka `/admin/laporan-error`, kirim satu laporan uji dengan judul `Uji notifikasi Resend` dan deskripsi minimal 20 karakter.
2. Periksa kotak masuk alamat superadmin dari langkah A. Periksa folder Spam bila surel tidak muncul dalam satu menit.
3. Jika tidak masuk, buka **Edge Functions > kirim-notifikasi-laporan > Logs** dan baca alasan galatnya.
4. Buka **Database > Webhooks > laporan-error-baru > Logs** untuk melihat kode status tiap pengiriman.

| Gejala di log | Penyebab | Perbaikan |
|---|---|---|
| `401 Pemanggil webhook tidak dikenali` | Header `apikey` belum ditambahkan | Ulangi langkah D.5 lalu simpan webhook |
| `RESEND_API_KEY belum diatur` | Secret belum terpasang | Ulangi langkah B |
| `Tidak ada penerima superadmin aktif` | Baris superadmin tidak aktif atau belum ada | Jalankan SQL pendaftaran akun di bagian 6 |
| `Resend 403` | Pengirim `onboarding@resend.dev` mengirim ke alamat bukan pemilik akun | Pakai alamat pendaftaran Resend atau verifikasi domain sendiri |
| Webhook tidak muncul di log | Event selain INSERT atau tabel salah | Ulangi langkah D.2 dan D.3 |

Kunci Resend dan service role tidak pernah ditulis di `.env`, kode frontend, atau repositori.

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
