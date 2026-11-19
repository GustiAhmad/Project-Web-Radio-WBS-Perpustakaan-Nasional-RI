# Panduan Deployment GitHub Pages — Radio & Siniar WBS Perpusnas

Panduan ini dipakai untuk menyiapkan peluncuran produksi Tahap 7, Tahap 8, dan Tahap 9. Biaya hosting tetap Rp 0 karena GitHub Pages dan Supabase tier gratis.

## 1. Aktifkan GitHub Pages

1. Buka repositori di GitHub, masuk ke **Settings → Pages**.
2. Pada **Build and deployment → Source**, pilih **GitHub Actions**.
3. Pastikan branching utama adalah `main`. Alur kerja `.github/workflows/deploy.yml` akan jalan otomatis setiap ada push ke `main`.

## 2. Isi Repository Secrets

Buka **Settings → Secrets and variables → Actions → New repository secret**, lalu tambahkan:

| Nama secret | Nilai |
|---|---|
| `VITE_SUPABASE_URL` | URL proyek Supabase, diawali `https://` |
| `VITE_SUPABASE_ANON_KEY` | **Publishable/anon key**, bukan secret key |
| `VITE_GA_MEASUREMENT_ID` | ID GA4 berformat `G-XXXXXXXXXX`; boleh dikosongkan |
| `VITE_ICECAST_STREAM_URL` | Aliran Icecast HTTPS, port 8443 atau proxy 443 |

Jangan pernah memasukkan `sb_secret_`, service role key, atau API key Resend ke repository secret maupun berkas `.env`. Kunci Resend hanya ada di Supabase Secrets.

## 3. Base Path

Secara default, produksi memakai base path:

```
/Project-Web-Radio-WBS-Perpustakaan-Nasional-RI/
```

Nilai ini ada di `vite.config.ts`, `public/404.html`, `public/sitemap.xml`, dan `robots.txt`. Bila memakai domain kustom, isi `VITE_BASE_PATH=/` sebagai repository secret/variable dan perbarui konstanta `BASE` di `public/404.html` serta URL di `sitemap.xml` dan `robots.txt`.

## 4. Cara Kerja Deep Link

`public/404.html` menangkap rute yang diminta GitHub Pages, lalu mengarahkan kembali ke `index.html?p=/rute`. Skrip di `index.html` membaca parameter `p`, mengembalikan alamat bersih memakai `history.replaceState`, lalu React Router merender halaman yang diminta. Hasilnya, refresh di `/jadwal` atau `/program/nama-seri` tidak menampilkan 404.

## 5. Google Analytics 4

Ada dua jalur pengisian ID GA4:

1. **Env build**: isi `VITE_GA_MEASUREMENT_ID` di repository secret.
2. **Panel admin**: Superadmin membuka `/admin/pengaturan`, mengisi ID Pengukuran, lalu mengaktifkan analitik.

Jika keduanya ada, nilai env yang dipakai lebih dulu. Semua konfigurasi memakai `anonymize_ip: true`. Event yang dikirim: `page_view`, `radio_play`, dan `submit_pertanyaan`.

## 6. Uji Produksi

1. Buka alamat GitHub Pages hasil deploy dengan HTTPS.
2. Klik putar pada bilah radio, lalu pindah ke menu **Jadwal**, **Program**, dan **Tentang**. Audio harus tetap menyala.
3. Refresh halaman `/jadwal` dan `/program/nama-seri`. Keduanya harus tampil, bukan 404.
4. Buka `/admin/masuk`, lalu periksa proteksi peran Admin dan Superadmin.
5. Buka `https://<domain>/sitemap.xml` dan `https://<domain>/robots.txt`. Keduanya harus terbaca.
6. Periksa tab Network: skrip `gtag.js` termuat hanya bila ID GA4 diisi, dengan anonimisasi IP aktif.
7. Jalankan Lighthouse pada halaman Beranda. Target: Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO ≥90.

Audit lokal terhadap build produksi sudah menghasilkan **Performance 100, Accessibility 100, Best Practices 100, SEO 100**, dengan LCP 1,43 detik, CLS 0,00, dan TBT 0 ms. Ulangi pengukuran pada alamat produksi setelah deploy karena jaringan dan CDN nyata tetap berpengaruh.

## 7. Penyiapan Backend Tahap 8

Jalankan sekali pada proyek Supabase produksi lewat Supabase CLI yang sudah terhubung:

```
supabase db query --remote --file supabase-tahap8.sql --yes
supabase functions deploy kelola-pengguna --yes
```

Hasilnya: kolom `nama_pengguna` dan `foto_url`, tabel `penyiar`, RPC `cari_email_pengguna`, bucket publik `aset-wbs`, dan Edge Function `kelola-pengguna` dengan `verify_jwt = true`. Service role key hanya dipakai di dalam Edge Function; jangan pernah ditulis ke `.env` atau repository secret GitHub.

Nama pengguna awal dua akun existing di-backfill dari bagian lokal alamat surel. Pengelola bisa mengubah nama pengguna, foto profil, dan kata sandi sendiri lewat menu **Profil Saya** di `/admin/profil`.

## 8. Penyiapan Backend Tahap 9

Jalankan sekali pada proyek Supabase produksi:

```
supabase db query --remote --file supabase-tahap9.sql --yes
supabase functions deploy kelola-pengguna --yes
```

`supabase-tahap9.sql` menambah kolom `moderator`, `narasumber`, `topik`, `seri_id`, dan `durasi_detik` pada `acara_mendatang`, lalu menyelaraskan bucket `aset-wbs` dan `laporan-error` ke batas 2 MB dengan MIME hanya `image/jpeg` dan `image/png`. Edge Function `kelola-pengguna` kini menerima kata sandi buatan Superadmin saat membuat akun dan menyediakan aksi `ubah_kata_sandi`.

Semua fitur unggah gambar memakai aturan yang sama: JPG/PNG, maksimal 2 MB. Teks syarat ini tampil di form Acara, Seri, Penyiar, Profil, dan Screenshot Laporan Error. Validasi berkas berjalan sebelum data ditulis ke basis data.

## 9. Berita Acara UAT

Format lembar pengesahan tersedia di `docs/09-rencana-pengujian-dan-evaluasi.md` Bagian 9. Isi tanggal, nama pustakawan, NIP, dan pilihan hasil pengujian setelah UAT produksi dilakukan bersama pengelola layanan. Jangan mengisi nama atau tanda tangan lebih awal.
