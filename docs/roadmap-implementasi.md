# roadmap-implementasi.md — Lembar Kerja Bertahap & Titik Tinjauan (Review Gates)
## Website Layanan Radio dan Siniar WBS Perpustakaan Nasional RI

> **ATURAN KERJA CLAUDE & PENGEMBANG:**
> 1. Kerjakan tugas secara berurutan mulai dari **Tahap 1**.
> 2. Centang setiap tugas yang telah selesai dari `[ ]` menjadi `[x]`.
> 3. Pada setiap **TITIK TINJAUAN (REVIEW GATE)**, pengembang/AI **WAJIB BERHENTI**, merangkum apa yang telah selesai, dan memberikan instruksi verifikasi kepada pengguna.
> 4. Jangan melanjutkan ke tahap berikutnya sebelum pengguna memberikan konfirmasi persetujuan (*approval*).

---

## Ringkasan Progres Keseluruhan

- [x] **Tahap 1:** Fondasi Proyek, Konfigurasi Lingkungan & Tata Letak Dasar *(Selesai)*
- [x] **Tahap 2:** Setup Basis Data Supabase, Keamanan RLS & Migrasi Data Katalog *(Selesai)*
- [x] **Tahap 3:** Mesin Pemutar Audio Persisten & Penanda Waktu On-Air 24 Jam *(Selesai)*
- [x] **Tahap 4:** Halaman Publik Pemustaka (Beranda, Jadwal, Katalog, Episode & Halaman Statis) *(Selesai)*
- [x] **Tahap 5:** Fitur Interaksi Tanya Jawab On-Air Seketika (Realtime WebSocket) *(Selesai)*
- [x] **Tahap 6:** Antarmuka Panel Pengelola (Dasbor Admin & Superadmin) *(Selesai, Review Gate 6 lolos)*
- [x] **Tahap 7:** Optimasi Performa, Integrasi Analitik & Deployment GitHub Pages *(Selesai, Review Gate 7 lolos)*
- [x] **Tahap 8:** Identitas Pengelola, Poster & Detail Acara, Gambar Seri, On-Air Personalities, dan Manajemen Akun *(Selesai, Review Gate 8 lolos)*
- [x] **Tahap 9:** Perbaikan Hasil UAT Review Gate 8 *(Selesai, Review Gate 9 lolos)*
- [x] **Tahap 10:** Notifikasi Error, Alur Kelola Episode, Penanda Data Kosong, Identitas Admin, dan Analitik GA4 *(Selesai, Review Gate 10 lolos — commit `c9b6391`)*
- [x] **Tahap 11:** Chat Live Terkelola, Inisiasi Sesi Manual, dan Moderasi Pesan *(Selesai, Review Gate 11 lolos — commit `fc3295a`)*
- [ ] **Tahap 12:** Artikel & Berita — Editor Kaya, Draf & Pratinjau, Kategori, Sampul, dan Halaman Publik *(Menunggu uji ulang perbaikan toolbar & input editor)*

---

## Rincian Tugas per Tahap & Titik Tinjauan

### TAHAP 1: Fondasi Proyek, Konfigurasi Lingkungan & Tata Letak Dasar

- [x] **1.1 Inisialisasi Vite + React + TypeScript**
  - Jalankan `npm create vite@latest . -- --template react-ts` (atau inisialisasi package.json sesuai struktur standar).
  - Pasang dependensi inti: `react-router-dom@7.18.5`, `lucide-react`, `@supabase/supabase-js`.
- [x] **1.2 Konfigurasi Tailwind CSS & Identitas Perpusnas**
  - Pasang `tailwindcss`, `postcss`, `autoprefixer`.
  - Konfigurasi token warna resmi Perpusnas (`perpusnas-blue`, `perpusnas-gold`, dll.) di `tailwind.config.js`.
  - Pasang font Inter / font sans-serif standar pemerintah di `index.html`.
- [x] **1.3 Pembuatan Struktur Direktori & Variabel Lingkungan**
  - Buat struktur folder sesuai panduan di `CLAUDE.md` (`src/components`, `src/hooks`, `src/pages`, `src/services`, dll.).
  - Buat berkas `.env.example` dan `.env` lokal.
- [x] **1.4 Kerangka Tata Letak Utama (Root Layout)**
  - Bangun komponen `Header` (logo Perpusnas, 5 menu navigasi utama, bilah cari cepat).
  - Bangun wadah pemutar audio persisten kosongan (*Placeholder Bottom Bar*) di tingkat root.
  - Bangun komponen `Footer` (tautan media sosial resmi, alamat studio WBS, copyright).
  - Konfigurasi `BrowserRouter` di `App.tsx` dengan rute dasar (`/`, `/jadwal`, `/program`, `/tentang`, `/kontak`, `/cari`).

---

> 🛑 **TITIK TINJAUAN 1 (REVIEW GATE 1)**
> - **Kriteria Lolos:** 
>   1. Perintah `npm run dev` berjalan tanpa galat pada peramban (`http://localhost:5173`).
>   2. Tata letak responsif: Navigasi 5 menu dan footer tampil rapi di ukuran layar desktop dan ponsel (menu hamburger berfungsi).
>   3. Tampilan visual selaras dengan palet warna resmi Perpusnas (biru wibawa `#0B3B60` dan aksen emas `#D4A017`).
> - **Aksi Pengembang:** Berhenti dan minta persetujuan pengguna untuk lanjut ke Tahap 2.

---

### TAHAP 2: Setup Basis Data Supabase, Keamanan RLS & Migrasi Data

- [x] **2.1 Konfigurasi Klien Supabase di Frontend**
  - Buat berkas `src/services/supabase.ts` untuk menginisialisasi `@supabase/supabase-js`.
  - Buat berkas definisi tipe TypeScript `src/types/database.types.ts` berdasarkan skema tabel Dokumen `07`.
- [x] **2.2 Penyiapan Berkas Eksekusi SQL Supabase**
  - Sediakan berkas `supabase/schema.sql` siap pakai yang mencakup:
    - 9 tabel utama (`pengguna`, `seri`, `episode`, `jadwal_tetap`, `acara_mendatang`, `sesi_onair`, `pertanyaan`, `halaman_statis`, `pengaturan_situs`).
    - Aturan keamanan *Row Level Security* (RLS) lengkap (hanya Superadmin/Admin yang bisa memodifikasi; publik hanya membaca konten berstatus tayang).
    - Indeks pencarian teks bahasa Indonesia (GIN index).
- [x] **2.3 Eksekusi Skrip Migrasi Data Katalog (Python)**
  - Siapkan skrip migrasi `scripts/migrate_catalog.py` (dari Dokumen `08`).
  - Rekonsiliasi 337 baris publik dari `metadata_youtube.csv` menjadi tepat **331 video unik** (249 pada 21 seri resmi + 82 pada keranjang *"Lainnya"*).
  - Impor 72 baris jadwal tetap penyiaran 24 jam ke tabel `jadwal_tetap`.
- [x] **2.4 Pembuatan Akun Superadmin & Admin Awal**
  - Panduan pendaftaran akun admin pertama melalui dasbor Supabase Auth tersedia di `panduan-setup-supabase.md`.

---

> 🛑 **TITIK TINJAUAN 2 (REVIEW GATE 2)**
> - **Kriteria Lolos:**
>   1. Tabel di Supabase terisi lengkap (21 seri, 331 episode video, 72 baris jadwal siaran 24 jam).
>   2. Kebijakan RLS teruji aktif (akses tanpa login hanya bisa membaca baris `status = 'tayang'`).
>   3. Frontend berhasil melakukan uji coba kueri data seri dari Supabase dan menampilkannya di konsol peramban.
> - **Aksi Pengembang:** Berhenti dan minta persetujuan pengguna untuk lanjut ke Tahap 3.

---

### TAHAP 3: Mesin Pemutar Audio Persisten & Penanda Waktu On-Air

- [x] **3.1 Global Audio State Engine (`AudioContext.tsx`)**
  - Bangun `AudioContext` yang mengelola objek tunggal `new Audio()` di luar siklus perutean halaman.
  - State: `isPlaying`, `isBuffering`, `isOffline`, `volume`, `currentProgram`, `error`.
  - Mekanisme sambung ulang otomatis (*auto-reconnect*) hingga 3 kali jika sinyal studio goyang.
- [x] **3.2 Komponen Bilah Pemutar Bawah Persisten (`PersistentPlayer.tsx`)**
  - Tombol putar/jeda dengan indikator memuat (*loading spinner*).
  - Pengatur volume audio (slider + tombol bisu/unmute).
  - Teks informasi program: menampilkan nama program yang sedang mengudara dan program berikutnya.
  - Penanganan status siaran gangguan / offline santun (`FR-07`).
- [x] **3.3 Kustom Hook Deteksi Program On-Air (`useOnAirProgram.ts`)**
  - Kalkulasi waktu nyata zona WIB (UTC+7).
  - Penanganan siklus hari siaran 24 jam (06.00 WIB s.d. 05.59 WIB keesokan harinya).
  - Penentuan jenis hari: Hari Kerja (Senin–Jumat), Sabtu, atau Minggu.
  - Pengembalian data program aktif dan program berikutnya dari tabel jadwal.

---

> 🛑 **TITIK TINJAUAN 3 (REVIEW GATE 3)**
> - **Kriteria Lolos:**
>   1. Pengguna menekan tombol putar di bilah bawah: audio siaran radio terdengar jernih (menggunakan URL Icecast HTTPS).
>   2. Pengguna berpindah menu rute (`/`, `/jadwal`, `/tentang`): audio siaran radio **TIDAK TERPUTUS** sama sekali.
>   3. Teks program yang sedang mengudara pada bilah pemutar cocok dengan jam WIB dan tabel jadwal siaran hari itu.
> - **Aksi Pengembang:** Berhenti dan minta persetujuan pengguna untuk lanjut ke Tahap 4.

---

### TAHAP 4: Halaman Publik Pemustaka (Katalog & Informasi)

- [x] **4.1 Halaman Beranda (`HomePage.tsx`)**
  - Hero siaran utama: kartu interaktif dengan badge *Live On-Air*, jam siaran, nama penyiar, dan tombol putar besar.
  - Blok Acara Mendatang: daftar ringkas acara talkshow/live YouTube tanpa tombol buntu (`FR-28`).
  - Blok 4 Episode Video Terbaru: menampilkan kartu video teranyar berstatus Tayang (`FR-29`).
  - Blok Program Unggulan: menampilkan maksimal 6 seri pilihan (`FR-30`).
- [x] **4.2 Halaman Jadwal Siaran 24 Jam (`SchedulePage.tsx`)**
  - Bilah tab hari: Senin s.d. Minggu (`FR-04`).
  - Tabel jadwal 24 jam dengan penyorotan warna emas pada blok jam yang sedang aktif saat ini.
- [x] **4.3 Halaman Jelajah Seri Program (`ProgramListPage.tsx`)**
  - Saringan kategori topik instan di sisi klien.
  - Kisi 21 kartu seri program resmi + 1 kartu keranjang *"Lainnya"* (`FR-09`, `FR-13`).
- [x] **4.4 Halaman Detail Seri (`SeriesDetailPage.tsx`) & Keranjang Lainnya**
  - Deskripsi lengkap program dan gambar sampul rasio 16:9.
  - Daftar episode berurutan dengan nomor episode baku dan tombol *"Muat Lebih Banyak"*.
- [x] **4.5 Halaman Detail Episode & Pemutar Video (`EpisodeDetailPage.tsx`)**
  - Komponen *Lite YouTube Facade*: gambar poster WebP ringan dengan tombol putar tiruan.
  - Aturan mutlak: **TIDAK ADA AUTOPLAY** saat halaman dibuka (`FR-11`).
  - Panel metadata lengkap: narasumber, moderator, tanggal tayang, durasi, topik, dan tombol salin tautan.
  - Penanganan santun bila video YouTube dihapus/privat (*broken link fallback*, `FR-12`).
- [x] **4.6 Pencarian Global & Halaman Statis**
  - Halaman hasil pencarian terpilah (`SearchPage.tsx` pada rute `/cari`).
  - Halaman Tentang WBS (`/tentang`), Kontak & WhatsApp (`/kontak`), Kebijakan Privasi (`/kebijakan-privasi`), dan Halaman 404 Kustom Ramah.

---

> 🛑 **TITIK TINJAUAN 4 (REVIEW GATE 4)**
> - **Kriteria Lolos:**
>   1. Seluruh 21 seri program dan 331 video dapat dijelajahi dengan lancar tanpa ada tautan buntu.
>   2. Membuka detail episode tidak mematikan audio siaran radio; pemutar video YouTube tidak bersuara sendiri sebelum diklik.
>   3. Pencarian kata kunci (misal: *"naskah"*) menampilkan hasil seri dan episode secara presisi.
>   4. Tampilan responsif sempurna di perangkat seluler (tanpa pergeseran horizontal).
> - **Aksi Pengembang:** Berhenti dan minta persetujuan pengguna untuk lanjut ke Tahap 5.

---

### TAHAP 5: Fitur Interaksi Tanya Jawab On-Air (Realtime)

- [x] **5.1 Formulir Tanya Jawab Pengunjung di Beranda (`QnAForm.tsx`)**
  - Kolom nama (wajib diisi), kotak centang opsi *"Kirim sebagai Anonim"* (`M-06`).
  - Kolom teks pertanyaan pemustaka.
  - Kolom tersembunyi *Honeypot* untuk menangkal bot spam internet (`FR-25`, `DR-08`).
  - Pembatasan frekuensi pengiriman lokal (*rate limiting* 1 pertanyaan per 30 detik).
  - Status formulir: terkunci otomatis dengan pesan santun saat sesi belum dibuka oleh petugas.
- [x] **5.2 Adaptasi Label saat Siaran Khusus Live YouTube (`M-19`)**
  - Formulir otomatis mengubah teks tombol dan judul saat admin memilih jenis acara webinar YouTube.
- [x] **5.3 Integrasi Supabase Realtime (CDC WebSocket)**
  - Komponen hook `useRealtimeQnA.ts` yang berlangganan langsung ke pembaruan tabel `sesi_onair` dan `pertanyaan`.
  - Notifikasi umpan balik sukses hijau saat pertanyaan berhasil terkirim ke studio.

---

> 🛑 **TITIK TINJAUAN 5 (REVIEW GATE 5)**
> - **Kriteria Lolos:**
>   1. Pengguna membuka Beranda dari ponsel: mengisi formulir dan mengirim pertanyaan.
>   2. Pesan sukses muncul; form terkunci sementara selama 30 detik untuk mencegah spam.
>   3. Jika sesi ditutup oleh admin, kartu formulir langsung menampilkan status *"Sesi Belum Dibuka"* tanpa perlu me-refresh browser pemustaka.
> - **Aksi Pengembang:** Berhenti dan minta persetujuan pengguna untuk lanjut ke Tahap 6.

---

### TAHAP 6: Antarmuka Panel Pengelola (Admin & Dasbor Studio)

- [x] **6.1 Autentikasi Pengelola & Proteksi Rute (`AuthContext.tsx`)**
  - Halaman login admin `/admin/masuk` dengan Supabase Auth (surel & kata sandi).
  - Proteksi rute privat: pengunjung publik yang belum login otomatis dialihkan ke halaman masuk.
  - Pemisahan wewenang peran: Superadmin vs Admin biasa (`M-15`, `DR-06`).
- [x] **6.2 Modul Tanya Jawab On-Air Studio (`/admin/tanya-jawab`)**
  - Tombol Buka Sesi Baru (pilih program siaran atau acara khusus YouTube) dan Tutup Sesi.
  - Tabel pertanyaan seketika: pertanyaan baru dari pendengar langsung muncul otomatis (<2 detik) tanpa refresh.
  - Tombol aksi penyiar: Tandai Dibaca, Sorot (*Pin*), Sembunyikan, dan Hapus Pertanyaan.
  - Tombol unduh laporan riwayat tanya jawab ke berkas CSV (`FR-24`).
- [x] **6.3 Modul Kelola Jadwal Siaran 24 Jam (`/admin/jadwal`)**
  - Formulir sunting nama penyiar dan jam tayang tabel jadwal tetap (ingat: **TIDAK ADA tombol playout/ganti lagu studio**).
- [x] **6.4 Modul Kelola Katalog Video (`/admin/episode` & `/admin/seri`)**
  - Formulir penambahan episode baru kilat (target alur selesai ≤5 menit).
  - Pilihan status konten: Draf, Tayang, atau Internal.
  - Pengaturan penomoran episode otomatis per seri.
- [x] **6.5 Modul Acara Mendatang & Halaman Statis**
  - Tambah/sunting/hapus acara talkshow atau webinar mendatang.
  - Editor teks sederhana untuk menyunting halaman Tentang dan Kontak.
- [x] **6.6 Menu Khusus Superadmin (`/admin/pengaturan`)**
  - Pengaturan URL aliran Icecast HTTPS dan pesan gangguan siaran.
  - Pengaturan ID Pengukuran Google Analytics 4 (GA4).
  - Tombol unduh berkas cadangan data sistem (*Manual JSON Backup*, `FR-48`).
- [x] **6.7 Menu Laporan Error Internal (`/admin/laporan-error`)**
  - Pelapor: Admin dan Superadmin. Tidak ada peran baru.
  - Formulir judul, deskripsi error, langkah reproduksi, URL halaman, perangkat, tingkat keparahan, dan screenshot opsional.
  - Screenshot disimpan di bucket Supabase Storage privat `laporan-error`, PNG/JPEG/WebP maksimal 2 MB. Tidak ada audio/video mentah yang diunggah.
  - Daftar laporan masuk ke panel Superadmin; Admin hanya melihat laporannya sendiri. Superadmin mengubah status, menulis catatan internal, melihat screenshot, dan menghapus laporan.
  - Lencana laporan baru muncul seketika lewat Supabase Realtime tanpa refresh.
  - Notifikasi surel dikirim Supabase Edge Function memakai Resend ke alamat Superadmin aktif di tabel `pengguna`. API keyResend hanya disimpan sebagai Supabase secret, tidak pernah di frontend.

- [x] **6.8 Penyempurnaan Sesi Tanya Jawab (Review Gate 6)**
   - Dropdown sumber sesi hanya memuat program `interaktif = true` untuk hari WIB berjalan, sehingga "Opening" 06.00 yang ganda tidak muncul lagi.
   - Urutan dropdown mendahulukan **Indonesia Pagi Ini**, **Pesona Nusantara**, dan **Ruang Literasi**.
   - Kolom **Tanya Jawab** di `Jadwal Siaran` menampilkan penanda dan dapat dicentang saat menyunting; program tanpa penanda menolak pembukaan sesi.
   - Penanda yang sama tampil di halaman jadwal publik.
   - Petugas mengisi target durasi menit saat membuka sesi; jam selesai dihitung dari jam mulai ditambah durasi, sehingga acara lebih dari satu jam tidak terpotong.
   - Penanda awal program unggulan kini menjadi bagian dari data awal `supabase/schema.sql` (tidak lagi memakai skrip SQL terpisah).

---

> 🛑 **TITIK TINJAUAN 6 (REVIEW GATE 6)**
> - **Kriteria Lolos:**
>   1. Login sebagai Admin dan Superadmin berjalan aman; pembatasan hak akses berfungsi presisi.
>   2. Simulasi siaran: Admin membuka sesi tanya jawab, pertanyaan dari pengunjung di HP langsung masuk ke layar panel studio secara seketika (*realtime*).
>   3. Menambah 1 episode baru berhasil tampil di halaman depan dalam waktu <5 menit.
>   4. Admin mengirim laporan error tanpa screenshot; laporan muncul di panel Superadmin lewat Realtime dalam waktu <2 detik.
>   5. Admin mengirim laporan kedua dengan screenshot PNG/JPEG/WebP; Superadmin dapat membuka berkasnya lewat tautan bertanda tangan.
>   6. Notifikasi surel Resend sampai ke alamat Superadmin aktif setelah webhook diaktifkan.
>   7. 10 Skenario Pengujian UAT Mandiri Pustakawan dari Dokumen `09` teruji LULUS.
> - **Aksi Pengembang:** Berhenti dan minta persetujuan pengguna untuk lanjut ke Tahap 7.

---

### TAHAP 7: Optimasi Performa, Integrasi Analitik & Deployment GitHub Pages

- [x] **7.1 Audit Kualitas & Kinerja Google Lighthouse**
  - Jalankan audit Chrome Lighthouse: pastikan skor Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO ≥90.
  - Kompresi aset gambar dan verifikasi *Core Web Vitals* (LCP < 2.5s, CLS < 0.1).
  - Hasil audit lokal build produksi: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1,43 s, CLS 0,00, TBT 0 ms.
- [x] **7.2 Integrasi Google Analytics 4 (GA4) Ramah Privasi**
  - Pasang helper `ga4.ts` dengan pelacakan event kunci (`radio_play`, `submit_pertanyaan`).
  - Verifikasi parameter `anonymize_ip: true` aktif untuk melindungi privasi pemustaka.
- [x] **7.3 Konfigurasi Deployment GitHub Pages SPA**
  - Buat berkas `public/404.html` dengan skrip pengalihan SPA (*Single Page App redirect*) agar tidak ada galat 404 saat pengguna me-refresh halaman rute dalam.
  - Buat berkas alur kerja GitHub Actions `.github/workflows/deploy.yml` untuk build dan deploy otomatis lewat GitHub Pages Actions (environment `github-pages`).
- [x] **7.4 Verifikasi Produksi & Tanda Tangan Berita Acara UAT**
  - Panduan uji produksi tersedia di `panduan-deploy.md`; lembar pengesahan ada di `docs/09-rencana-pengujian-dan-evaluasi.md` Bagian 9.
  - Deploy produksi hijau di `https://radio-perpusnas.github.io/`; refresh deep link `/jadwal` terbukti status 200.
  - Berita acara UAT final diisi bersama pustakawan setelah Review Gate 8.

---

### TAHAP 8: Identitas Pengelola, Poster & Detail Acara, Gambar Seri, On-Air Personalities, dan Manajemen Akun

- [x] **8.1 Skema Basis Data & Storage**
  - Tambah kolom `pengguna.nama_pengguna` dan `pengguna.foto_url`, backfill dua akun existing, indeks unik case-insensitive.
  - Tabel baru `penyiar` (nama, slug, foto, bio, urutan, aktif) dengan RLS publik untuk data aktif dan RLS penuh untuk staf.
  - RPC `cari_email_pengguna(text)` SECURITY DEFINER untuk resolusi nama pengguna saat login.
  - Bucket Storage publik `aset-wbs` untuk poster acara, sampul seri, foto penyiar, dan foto profil, dengan kebijakan unggah hanya untuk staf aktif.
- [x] **8.2 Login Nama Pengguna atau Surel & Tombol Masuk Publik**
  - Form login menerima dua bentuk identitas; Supabase tetap memakai surel di balik layar.
  - Tombol **Masuk** dipasang di header desktop dan menu seluler.
- [x] **8.3 Poster Acara & Halaman Detail**
  - Pilih poster dari panel admin saat menambah/menyunting acara; placeholder dipakai bila kosong.
  - Rute `/acara/:id` menampilkan poster, tanggal, jam, kanal, deskripsi, dan tautan kanal.
- [x] **8.4 Gambar Seri & On-Air Personalities**
  - Unggah sampul dan teks alternatif seri dari panel admin.
  - Halaman beranda menampilkan kartu On-Air Personalities dengan foto placeholder; klik kartu memfilter jadwal lewat `?penyiar=slug`.
  - Panel admin `Kelola Penyiar` untuk menambah, menyunting, menyembunyikan, dan menghapus profil.
- [x] **8.5 Pengelolaan Akun Pengelola**
  - Edge Function `kelola-pengguna` dengan `verify_jwt = true`, service role hanya di server, dan pengecekan peran pemanggil.
  - Admin dapat mengubah nama pengguna dan foto profil sendiri, serta menambah rekan berperan Admin; Superadmin dapat menambah Superadmin, mengaktifkan/menonaktifkan akun, serta mengangkat peran.
  - Kata sandi sementara hanya ditampilkan sekali di panel setelah akun dibuat.
- [x] **8.6 Review Gate 8**
  - Uji manual beranda, detail acara, unggah gambar, filter jadwal penyiar, login dua identitas, dan manajemen akun dinyatakan lolos oleh pengguna.
  - Catatan perbaikan dari uji ini ditindaklanjuti pada tahap lanjutan setelah rencana disetujui.

---

### TAHAP 9: Perbaikan Hasil UAT Review Gate 8

- [x] **9.1 Tampilan Gambar Utuh & Aturan Unggah Seragam**
  - Seluruh gambar (poster acara, sampul seri, foto penyiar, foto profil, pratinjau admin) memakai `object-contain` agar tidak terpotong.
  - Satu aturan unggah untuk semua fitur: JPG/PNG, maksimal 2 MB. Teks syarat tampil di semua kolom unggah, termasuk screenshot laporan error.
  - Bucket `aset-wbs` dan `laporan-error` diselaraskan ke 2 MB dan hanya `image/jpeg`, `image/png` lewat `supabase/migrations/005-tahap9.sql`.
  - Validasi berkas dipindah sebelum penulisan ke basis data di form Acara, Seri, dan Penyiar.
- [x] **9.2 Halaman Video Terbaru Khusus**
  - Rute `/video-terbaru` menampilkan seluruh episode tayang terurut terbaru sampai terlama, 12 video per halaman dengan pagination nomor lewat `?halaman=`.
  - Tautan "Jelajahi semua" di beranda diarahkan ke `/video-terbaru`, bukan lagi ke `/program`.
- [x] **9.3 Narasumber Jamak & Konversi Acara ke Episode**
  - Form Kelola Episode dan Acara Mendatang menerima beberapa narasumber dalam satu episode, disimpan di kolom teks `narasumber` dengan pemisah `; `.
  - Form Acara Mendatang ditambah seri, topik, moderator, dan narasumber jamak; durasi dihitung otomatis dari jam mulai dan selesai.
  - Detail acara publik menampilkan moderator, narasumber, dan topik.
  - Setelah acara selesai, admin memilih "Ambil dari acara yang sudah selesai" di form episode; data terisi otomatis, admin hanya menambah tautan YouTube.
- [x] **9.4 Penyederhanaan Jadwal & Akun**
  - Filter "Jadwal Penyiar" (`?penyiar=`) dan tautan "Lihat jadwal" dihapus; jadwal selalu menampilkan seluruh program.
  - "Profil Saya" jadi menu tersendiri di `/admin/profil`, terpisah dari Kelola Pengguna.
  - Kolom kata sandi memakai komponen `KolomSandi` dengan tombol mata tampil/sembunyi di login, profil, buat akun, dan ubah sandi.
  - Setelah login, admin selalu diarahkan ke `/admin`.
  - Akun baru memakai kata sandi yang diisi Superadmin, bukan kata sandi sementara; Superadmin dapat mengubah kata sandi akun Admin lewat aksi `ubah_kata_sandi` di Edge Function. Peran tetap dua: `superadmin` dan `admin`.
- [x] **9.5 Verifikasi Teknis**
  - `supabase db query --remote --file supabase/migrations/005-tahap9.sql --yes` berhasil; kedua bucket terverifikasi 2 MB dan JPG/PNG.
  - Edge Function `kelola-pengguna` di-deploy ulang dengan aksi `ubah_kata_sandi`.
  - `npm run type-check` dan `npm run build` lolos tanpa galat.
- [x] **9.6 Review Gate 9**
  - Panduan uji bernomor disajikan pada percakapan Review Gate 9 dan dinyatakan `LOLOS` oleh pengguna; commit `4fac915` sudah di-push.

---

### TAHAP 10: Notifikasi Error, Alur Kelola Episode, Penanda Data Kosong, Identitas Admin, dan Analitik GA4

- [x] **10.1 Notifikasi Error Global**
  - `NotifikasiProvider` + `ToastNotifikasi` menampilkan pesan galat, sukses, dan info di semua halaman.
  - Pesan galat otomatis menggulir layar ke atas; hook `useNotifikasiGalat` dipasang di seluruh halaman panel pengelola.
- [x] **10.2 Alur Kelola Episode yang Terpisah**
  - `/admin/episode` menampilkan episode tayang sebagai halaman awal, dengan filter status dan pencarian.
  - Tombol **Tambah Episode** di kanan atas menuju `/admin/episode/baru`; tiap baris memiliki tombol **Edit** dan **Hapus**.
  - `/admin/episode/baru` dan `/admin/episode/:id/edit` memakai form yang sama; Admin dan Superadmin dapat mengubah judul, narasumber, moderator, topik, durasi, tautan, dan status.
- [x] **10.3 Penanda Data Kosong**
  - Daftar episode menandai narasumber dan moderator yang kosong.
  - Daftar seri menandai seri yang belum memiliki gambar sampul.
- [x] **10.4 Identitas Panel Pengelola**
  - Logo kotak "WBS" di sidebar admin diganti logo resmi Perpustakaan Nasional RI.
- [x] **10.5 Dokumen Pendukung**
  - `docs/11-panduan-youtube-data-api.md` berisi panduan API key tanpa implementasi (catatan ditunda).
  - `docs/12-rencana-analitik-ga4.md` berisi daftar event, dimensi, laporan, dan aturan privasi.
- [x] **10.6 Wiring Analitik GA4**
  - `ga4.ts` dilengkapi pengaman rute `/admin/*` dan helper `lacakKlikMenu`.
  - Event dipasang: `menu_click`, `masuk_click`, `radio_pause`, `radio_error`, `radio_persisten`, `video_facade_click`, `episode_view`, `series_view`, `acara_view`, `cari`, `video_halaman`, dan `qna_sesi_dibuka`.
  - Keputusan Review Gate 10: kode siap, aktivasi GA4 ditunda sampai website live untuk publik. Tanpa ID Pengukuran tidak ada event yang dikirim.
- [x] **10.7 Verifikasi Teknis**
  - `npm run type-check` dan `npm run build` lolos tanpa galat.
- [x] **10.8 Review Gate 10**
  - Panduan uji bernomor disajikan pada percakapan Review Gate 10 dan dinyatakan `LOLOS` oleh pengguna; commit `c9b6391` sudah di-push.
  - Putaran 1 — episode tayang tidak bisa dihapus karena RLS `DELETE` hanya mengizinkan superadmin menghapus draf. Tombol diubah menjadi **Arsipkan** (UPDATE ke `arsip_internal`), dan `ambilEpisode()` ikut memfilter `status = 'tayang'`.
  - Putaran 1 — Kelola Seri belum memiliki tambah/hapus seri. Ditambahkan tombol **Tambah Seri** dan **Hapus Seri**; saat seri dihapus, video dipindahkan ke **Lainnya** dengan `nomor_episode = null` dan notifikasi menyebut jumlah video yang dipindahkan.
  - Putaran 1 — semua kolom form seri kini punya judul terlihat di atas kolom: nama, deskripsi, gambar, teks alternatif, kategori, urutan, dan penanda unggulan.
  - Putaran 1 — `docs/12-rencana-analitik-ga4.md` dilengkapi panduan GA4 DebugView dan uji responsif 360 px / 1280 px.
  - Putaran 2 — tombol **Tambah Seri** mengarah ke halaman baru `/admin/seri/baru`, mengikuti pola `/admin/episode/baru`. Daftar dan sunting tetap di `/admin/seri`.
  - Putaran 2 — validasi, unggah gambar, dan penulisan seri dipindah ke `src/services/seri.ts`; form bersama dipakai halaman daftar dan halaman tambah.
  - Putaran 2 — GA4 tidak diuji pada Tahap 10; aktivasi dan DebugView dilakukan setelah situs live.

---

### TAHAP 11: Chat Live Terkelola, Inisiasi Sesi Manual, dan Moderasi Pesan

- [x] **11.1 Skema & Migrasi Chat**
  - Tabel lama `sesi_onair` dan `pertanyaan` dihapus beserta datanya; tidak ada migrasi data lama.
  - Tabel baru `sesi_chat` dan `chat_pesan` dengan enum `status_sesi_chat` dan `status_chat_pesan`.
  - `supabase/migrations/006-tahap11-chat.sql` untuk migrasi; `supabase/schema.sql` diperbarui untuk fresh install.
  - RLS: publik hanya melihat sesi terbuka dan pesan `terlihat`; staf penuh; hapus riwayat sesi hanya `superadmin`.
  - Realtime CDC diaktifkan pada kedua tabel; indeks `idx_chat_pesan_sesi_waktu`, `idx_chat_pesan_sesi_status`, dan `idx_sesi_chat_status`.
- [x] **11.2 Tipe, Service, dan Hook Chat**
  - `database.types.ts` memakai `SesiChat` dan `ChatPesan`; `chat.types.ts` menggantikan `qna.types.ts`.
  - `src/services/chat.ts` menangani sesi, pesan, moderasi, dan pendukung CSV.
  - `useSesiChatAktif.ts` mendeteksi sesi terbuka untuk tombol chat; `useRealtimeChat.ts` memuat pesan realtime.
- [x] **11.3 Pengalaman Publik**
  - `QnAForm.tsx` dihapus dari beranda; tombol "Sampaikan Pertanyaan" di `HeroOnAir` dihapus.
  - `ChatModal.tsx` membuka chat di atas pemutar, menampilkan pesan sendiri dan pesan publik lain secara realtime.
  - Honeypot, jeda 1 pesan per 30 detik per perangkat, dan opsi "Kirim sebagai Anonim" dipertahankan.
  - `PersistentPlayer.tsx` menampilkan tombol chat **hanya saat ada sesi terbuka**; ikon hilang saat sesi ditutup.
- [x] **11.4 Panel Pengelola**
  - `AdminQnAPage.tsx` digantikan `AdminChatPage.tsx` di rute `/admin/chat` dengan menu "Inisiasi Sesi Chat".
  - Form pembukaan hanya nama sesi; sistem mencatat waktu buka, akun pembuka, waktu tutup, dan akun penutup.
  - Admin dan Superadmin sama-sama membuka, menutup, menyembunyikan/menampilkan, menghapus pesan, dan mengunduh CSV.
  - Hanya Superadmin yang menghapus riwayat sesi; CSV menyertakan pesan tersembunyi dengan kolom status.
  - Kolom "Pesan Chat Berlangsung" di `/admin/chat` hanya untuk sesi aktif. Tombol "Lihat Pesan" pada riwayat mengarah ke halaman tersendiri `/admin/chat/riwayat/:id` berisi arsip pesan bersifat tetap dan tombol Unduh CSV; tidak memakai ulang area chat live.
  - `src/utils/formatChat.ts` menyatukan format waktu, label status, dan format CSV antara sesi aktif dan arsip.
  - Dasbor, menu admin, dan daftar cadangan diperbarui ke tabel chat.
- [x] **11.5 Dokumen Pendukung**
  - `AGENTS.md`, `CLAUDE.md`, dan `panduan-setup-supabase.md` diselaraskan dengan terminologi Chat live dan menu Berita ke-6.
  - `docs/12-rencana-analitik-ga4.md` memakai `chat_sesi_dibuka`, `chat_sesi_ditutup`, `chat_dibuka`, dan `chat_pesan_kirim`; aktivasi GA4 tetap ditunda sampai go-live.
- [x] **11.6 Verifikasi Teknis**
  - `npm run type-check` dan `npm run build` lolos tanpa galat (termasuk setelah penambahan halaman riwayat tersendiri).
- [x] **11.7 Review Gate 11**
  - Panduan uji bernomor disajikan pada percakapan Review Gate 11 dan dinyatakan `LOLOS` oleh pengguna setelah uji ulang halaman riwayat chat.
  - Uji meliputi: buka/tutup sesi, ikon muncul/hilang, realtime <2 detik di modal dan panel, sembunyi/hapus pesan, CSV, izin hapus riwayat Superadmin, audio persisten, serta lebar 360 px dan 1280 px.
  - 404 pada `/admin/chat/riwayat/:id` ternyata berasal dari cache transform Vite, bukan rute; diatasi dengan menyentuh ulang `src/App.tsx`.
  - Commit dan push dilakukan setelah persetujuan pengguna: `fc3295a`.

---

### TAHAP 12: Artikel & Berita — Editor Kaya, Draf & Pratinjau, Kategori, Sampul, dan Halaman Publik

- [x] **12.1 Ruang Lingkup**
  - Dokumen 01–10 tidak memuat spesifikasi artikel/berita. Ruang lingkup ditetapkan dari empat keputusan pengguna: 3 kategori tetap, Admin + Superadmin kelola penuh, sampul plus tampil di beranda, dan status draf dengan pratinjau.
  - Kategori tetap: `berita`, `artikel`, `pengumuman`. Status memakai enum `status_publikasi` (`draf`/`terbit`).
  - Tiga artikel terbaru tampil di beranda; artikel draf tidak pernah tampil ke publik.
- [x] **12.2 Skema & Migrasi**
  - `supabase/migrations/007-tahap12-artikel.sql` membuat enum `kategori_artikel`, tabel `artikel`, indeks `idx_artikel_terbit` dan `idx_artikel_kategori`, indeks GIN FTS bahasa Indonesia, serta RLS.
  - Publik hanya membaca artikel terbit yang waktunya sudah tiba; Admin dan Superadmin membaca, menambah, menyunting, dan menghapus semua artikel.
  - `supabase/schema.sql` diperbarui untuk instalasi baru. Sampul memakai bucket publik `aset-wbs` folder `artikel/`; tidak ada audio/video mentah yang disimpan.
- [x] **12.3 Tipe, Sanitasi, dan Service**
  - `database.types.ts` menambah `Artikel`, `KategoriArtikel`, `StatusPublikasi`, dan tabel `artikel`.
  - `sanitasiHtml.ts` membatasi tag HTML dan memaksa tautan `noopener noreferrer nofollow`; `formatArtikel.ts` menyeragamkan label kategori dan tanggal WIB.
  - `services/artikel.ts` menangani daftar publik, detail slug, daftar admin, validasi, slug unik, unggah/hapus sampul, status terbit, dan penghapusan. `services/aset.ts` diperluas dengan folder `artikel`, `jalurGambar`, dan `hapusGambar`.
- [x] **12.4 Antarmuka Publik**
  - `/berita` menampilkan filter 4 tab, 6 kartu per halaman, pagination yang mempertahankan kategori, `Breadcrumbs`, `Pemuatan`, dan `Kosong`.
  - `/berita/:slug` menampilkan judul, kategori, penulis, tanggal, sampul, dan isi HTML yang sudah disanitasi; `artikel_view` dikirim sekali per artikel.
  - `ArtikelTerbaru` menampilkan 3 artikel terbit terbaru di beranda dan tidak merender blok saat belum ada artikel.
  - Menu **Berita** menjadi menu ke-6 di Header dan Tautan Cepat Footer dengan `menu_click` yang konsisten.
  - `ArtikelTampil` memakai gaya `.isi-artikel`: paragraf renggang dan rata kanan-kiri, H2/H3 menonjol, tautan biru, gambar di tengah dengan keterangan, kutipan, tabel, dan garis horizontal.
  - Blok ajakan "Ingin tahu apa yang mengudara hari ini?" dihapus dari beranda sesuai catatan Review Gate 12.
- [x] **12.5 Panel Pengelola**
  - Menu "Artikel & Berita" tersedia untuk Admin dan Superadmin di `AdminLayout`.
  - `/admin/artikel` menyaring Draf/Terbit, menerbitkan atau menarik artikel, dan menghapus dengan konfirmasi.
  - `/admin/artikel/baru` dan `/admin/artikel/:id/edit` memakai editor Tiptap lengkap: Paragraf/H2/H3, Tebal, Miring, Garis bawah, Coret, empat pilihan alignment, daftar poin/bernomor, Kutipan, Sisipkan tautan, Sisipkan gambar dengan keterangan, Sisipkan tabel dengan tambah baris/kolom, Garis horizontal, Urungkan, dan Ulangi; tiga aksi simpan: Draf, Pratinjau, dan Terbitkan.
  - Toolbar editor melekat (`sticky top-16`) tepat di bawah header admin, sehingga format teks tetap bisa diklik tanpa menggulir ke atas.
  - Tombol tabel membuka pemilih ukuran 8 × 8; tabel baru disisipkan setelah pengguna memilih jumlah kolom dan baris.
  - Input alamat tautan tampil sebagai kolom di bawah toolbar, bukan kotak notifikasi browser; tersedia Terapkan, Hapus, dan Batal.
  - Gambar artikel memakai node `gambarBerketerangan` dengan NodeView: kolom keterangan langsung tersedia di bawah gambar di editor dan tersimpan sebagai `figcaption` yang tampil di tengah pada halaman publik.
  - `/admin/artikel/pratinjau/:id` menampilkan artikel persis seperti tampilan publik beserta status draf/terbit dan tautan ke situs bila sudah terbit.
  - `AdminPengaturanPage` memasukkan tabel `artikel` ke unduhan cadangan.
- [x] **12.6 Analitik & Dokumen**
  - `docs/12-rencana-analitik-ga4.md` menambah `artikel_filter`, `artikel_halaman`, dan `artikel_view`; `menu_click` kini mencakup Berita.
  - `panduan-setup-supabase.md` memuat langkah migrasi Tahap 12 dan jumlah tabel terbaru.
- [x] **12.7 Verifikasi Teknis**
  - `npm run type-check` dan `npm run build` lolos tanpa galat setelah perbaikan editor dan gaya artikel.
- [x] **12.8 Review Gate 12**
  - Review Gate 12 dinyatakan `LOLOS` oleh pengguna setelah uji awal dan dua kali uji ulang terfokus. Perbaikan editor dan tampilan artikel sudah diverifikasi; commit dan push menunggu persetujuan pengguna.
  - Uji awal meliputi: migrasi SQL, draf tidak tampil publik, pratinjau, terbitkan, filter kategori, pagination, 3 artikel di beranda, sanitasi HTML, peran Admin/Superadmin, serta lebar 360 px dan 1280 px.
  - Uji ulang pertama meliputi: toolbar editor lengkap, spasi dan alignment paragraf, H2/H3, tautan biru, gambar tengah berketerangan, kutipan, tabel, garis horizontal, dan hilangnya blok ajakan jadwal di beranda.
  - Uji ulang kedua meliputi: toolbar melekat saat gulir, pemilih ukuran tabel, kolom keterangan gambar di bawah gambar, dan kolom alamat tautan di bawah toolbar.

---

> 🏁 **TITIK AKHIR: PELUNCURAN RESMI (GO-LIVE)**
> Website Radio & Siniar WBS Perpusnas resmi mengudara ke publik dengan biaya operasional Rp 0 (gratis selamanya) dan diserahkan kepada pustakawan pengelola layanan.
