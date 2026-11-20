# Panduan Deployment — Radio & Siniar WBS Perpusnas

Panduan ini dipakai untuk menyiapkan peluncuran produksi V1. Dua target hosting didukung: **Vercel** sebagai utama dan **GitHub Pages** sebagai cadangan. Backend memakai Supabase tier gratis.

Sebelum memilih paket hosting, perhatikan bahwa **Vercel Hobby ditujukan untuk penggunaan personal dan non-kommercial**. Karena ini layanan resmi Perpustakaan Nasional RI, klarifikasi dulu di internal instansi apakah Hobby diperbolehkan atau diperlukan Vercel Pro. GitHub Pages tidak punya batasan tersebut dan tetap sejalan dengan target biaya Rp 0 di dokumen proyek.

## 1. Deploy ke Vercel

1. Buka `https://vercel.com/new`, pilih **Import Git Repository**, lalu hubungkan repositori GitHub proyek ini.
2. Biarkan pengaturan yang terdeteksi otomatis. Bila perlu diisi manual: **Framework Preset** `Vite`, **Build Command** `npm run build`, **Output Directory** `dist`. Ketiganya sudah ditetapkan di `vercel.json`.
3. Beri nama proyek `radio-perpusnas`. URL bawaan menjadi `https://radio-perpusnas.vercel.app` bila nama itu masih tersedia.
4. Pada **Environment Variables**, tambahkan empat nilai berikut:

   | Nama variable | Nilai |
   |---|---|
   | `VITE_SUPABASE_URL` | URL proyek Supabase, diawali `https://` |
   | `VITE_SUPABASE_ANON_KEY` | **Publishable/anon key**, bukan secret key |
   | `VITE_GA_MEASUREMENT_ID` | ID GA4 berformat `G-XXXXXXXXXX`; boleh dikosongkan |
   | `VITE_ICECAST_STREAM_URL` | Aliran Icecast HTTPS, port 8443 atau proxy 443 |

   `VITE_BASE_PATH` tidak perlu diisi. Vercel menetapkan variabel `VERCEL`, sehingga `vite.config.ts` memakai base `/` secara otomatis. Jangan pernah memasukkan service role key atau API key Resend ke sini.
5. Klik **Deploy**. Setiap push ke `main` memicu deploy otomatis.
6. Di Supabase, buka **Authentication → URL Configuration**. Isi **Site URL** dengan alamat Vercel, lalu tambahkan `https://<domain-anda>/**` ke **Redirect URLs**. Tanpa ini, login panel admin gagal.
7. Untuk domain kustom, buka **Project Settings → Domains**, tambahkan `radio.perpusnas.go.id`, lalu pada DNS buat record CNAME `radio` → `cname.vercel-dns.com`. Sertifikat HTTPS otomatis dibuat setelah DNS aktif. Perubahan DNS di domain instansi tetap memerlukan izin IT Perpusnas.
8. Setelah alamat final ditetapkan, perbarui `public/sitemap.xml`, nilai `og:url` di `index.html`, dan tautan demo di `README.md`.

`vercel.json` memuat aturan rewrite `/(.*)` → `/index.html` agar refresh di rute SPA seperti `/jadwal`, `/berita`, dan `/admin/*` tetap dirender React Router. Berbeda dengan GitHub Pages, trik `public/404.html` tidak dipakai di Vercel.

## 2. Aktifkan GitHub Pages

1. Buka repositori di GitHub, masuk ke **Settings → Pages**.
2. Pada **Build and deployment → Source**, pilih **GitHub Actions**.
3. Pastikan branching utama adalah `main`. Alur kerja `.github/workflows/deploy.yml` akan jalan otomatis setiap ada push ke `main`.

## 3. Isi Repository Secrets

Khusus GitHub Pages, buka **Settings → Secrets and variables → Actions → New repository secret**, lalu tambahkan:

| Nama secret | Nilai |
|---|---|
| `VITE_SUPABASE_URL` | URL proyek Supabase, diawali `https://` |
| `VITE_SUPABASE_ANON_KEY` | **Publishable/anon key**, bukan secret key |
| `VITE_GA_MEASUREMENT_ID` | ID GA4 berformat `G-XXXXXXXXXX`; boleh dikosongkan |
| `VITE_ICECAST_STREAM_URL` | Aliran Icecast HTTPS, port 8443 atau proxy 443 |

Jangan pernah memasukkan `sb_secret_`, service role key, atau API key Resend ke repository secret maupun berkas `.env`. Kunci Resend hanya ada di Supabase Secrets.

## 4. Base Path

Secara default, produksi memakai base path:

```
/Project-Web-Radio-WBS-Perpustakaan-Nasional-RI/
```

Nilai default ini ada di `vite.config.ts`, `public/404.html`, `public/sitemap.xml`, dan `robots.txt`, dan hanya berlaku untuk GitHub Pages.

- **Vercel:** variabel `VERCEL` terdeteksi otomatis sehingga base `/` dipakai tanpa pengaturan tambahan. `VITE_BASE_PATH` hanya diperlukan bila ingin menimpa nilai itu.
- **GitHub Pages dengan domain kustom:** isi `VITE_BASE_PATH=/` sebagai repository variable, lalu perbarui konstanta `BASE` di `public/404.html` serta URL di `sitemap.xml` dan `robots.txt`.

## 5. Cara Kerja Deep Link

Khusus GitHub Pages, `public/404.html` menangkap rute yang diminta, lalu mengarahkan kembali ke `index.html?p=/rute`. Skrip di `index.html` membaca parameter `p`, mengembalikan alamat bersih memakai `history.replaceState`, lalu React Router merender halaman yang diminta. Hasilnya, refresh di `/jadwal` atau `/program/nama-seri` tidak menampilkan 404.

## 6. Google Analytics 4

Ada dua jalur pengisian ID GA4:

1. **Env build**: isi `VITE_GA_MEASUREMENT_ID` di repository secret.
2. **Panel admin**: Superadmin membuka `/admin/pengaturan`, mengisi ID Pengukuran, lalu mengaktifkan analitik.

Jika keduanya ada, nilai env yang dipakai lebih dulu. Semua konfigurasi memakai `anonymize_ip: true`. Event yang dikirim: `page_view`, `radio_play`, dan `submit_pertanyaan`.

## 7. Uji Produksi

1. Buka alamat produksi hasil deploy dengan HTTPS (Vercel atau GitHub Pages).
2. Klik putar pada bilah radio, lalu pindah ke menu **Jadwal**, **Program**, dan **Tentang**. Audio harus tetap menyala.
3. Refresh halaman `/jadwal` dan `/program/nama-seri`. Keduanya harus tampil, bukan 404.
4. Buka `/admin/masuk`, lalu periksa proteksi peran Admin dan Superadmin.
5. Buka `https://<domain>/sitemap.xml` dan `https://<domain>/robots.txt`. Keduanya harus terbaca.
6. Periksa tab Network: skrip `gtag.js` termuat hanya bila ID GA4 diisi, dengan anonimisasi IP aktif.
7. Jalankan Lighthouse pada halaman Beranda. Target: Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO ≥90.

Audit lokal terhadap build produksi sudah menghasilkan **Performance 100, Accessibility 100, Best Practices 100, SEO 100**, dengan LCP 1,43 detik, CLS 0,00, dan TBT 0 ms. Ulangi pengukuran pada alamat produksi setelah deploy karena jaringan dan CDN nyata tetap berpengaruh.

## 8. Penyiapan Backend Tahap 8

Jalankan sekali pada proyek Supabase produksi lewat Supabase CLI yang sudah terhubung:

```
supabase db query --remote --file supabase/migrations/004-tahap8.sql --yes
supabase functions deploy kelola-pengguna --yes
```

Hasilnya: kolom `nama_pengguna` dan `foto_url`, tabel `penyiar`, RPC `cari_email_pengguna`, bucket publik `aset-wbs`, dan Edge Function `kelola-pengguna` dengan `verify_jwt = true`. Service role key hanya dipakai di dalam Edge Function; jangan pernah ditulis ke `.env` atau repository secret GitHub.

Nama pengguna awal dua akun existing di-backfill dari bagian lokal alamat surel. Pengelola bisa mengubah nama pengguna, foto profil, dan kata sandi sendiri lewat menu **Profil Saya** di `/admin/profil`.

## 9. Penyiapan Backend Tahap 9

Jalankan sekali pada proyek Supabase produksi:

```
supabase db query --remote --file supabase/migrations/005-tahap9.sql --yes
supabase functions deploy kelola-pengguna --yes
```

`supabase/migrations/005-tahap9.sql` menambah kolom `moderator`, `narasumber`, `topik`, `seri_id`, dan `durasi_detik` pada `acara_mendatang`, lalu menyelaraskan bucket `aset-wbs` dan `laporan-error` ke batas 2 MB dengan MIME hanya `image/jpeg` dan `image/png`. Edge Function `kelola-pengguna` kini menerima kata sandi buatan Superadmin saat membuat akun dan menyediakan aksi `ubah_kata_sandi`.

Semua fitur unggah gambar memakai aturan yang sama: JPG/PNG, maksimal 2 MB. Teks syarat ini tampil di form Acara, Seri, Penyiar, Profil, dan Screenshot Laporan Error. Validasi berkas berjalan sebelum data ditulis ke basis data.

## 10. Berita Acara UAT

Format lembar pengesahan tersedia di `docs/09-rencana-pengujian-dan-evaluasi.md` Bagian 9. Isi tanggal, nama pustakawan, NIP, dan pilihan hasil pengujian setelah UAT produksi dilakukan bersama pengelola layanan. Jangan mengisi nama atau tanda tangan lebih awal.
