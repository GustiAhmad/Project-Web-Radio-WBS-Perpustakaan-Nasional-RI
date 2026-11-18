# ROADMAP-IMPLEMENTASI.md — Lembar Kerja Bertahap & Titik Tinjauan (Review Gates)
## Website Layanan Radio dan Siniar WBS Perpustakaan Nasional RI

> **ATURAN KERJA CLAUDE & PENGEMBANG:**
> 1. Kerjakan tugas secara berurutan mulai dari **Tahap 1**.
> 2. Centang setiap tugas yang telah selesai dari `[ ]` menjadi `[x]`.
> 3. Pada setiap **TITIK TINJAUAN (REVIEW GATE)**, pengembang/AI **WAJIB BERHENTI**, merangkum apa yang telah selesai, dan memberikan instruksi verifikasi kepada pengguna.
> 4. Jangan melanjutkan ke tahap berikutnya sebelum pengguna memberikan konfirmasi persetujuan (*approval*).

---

## Ringkasan Progres Keseluruhan

- [x] **Tahap 1:** Fondasi Proyek, Konfigurasi Lingkungan & Tata Letak Dasar *(Selesai)*
- [ ] **Tahap 2:** Setup Basis Data Supabase, Keamanan RLS & Migrasi Data Katalog *(Belum Dimulai)*
- [ ] **Tahap 3:** Mesin Pemutar Audio Persisten & Penanda Waktu On-Air 24 Jam *(Belum Dimulai)*
- [ ] **Tahap 4:** Halaman Publik Pemustaka (Beranda, Jadwal, Katalog, Episode & Halaman Statis) *(Belum Dimulai)*
- [ ] **Tahap 5:** Fitur Interaksi Tanya Jawab On-Air Seketika (Realtime WebSocket) *(Belum Dimulai)*
- [ ] **Tahap 6:** Antarmuka Panel Pengelola (Dasbor Admin & Superadmin) *(Belum Dimulai)*
- [ ] **Tahap 7:** Optimasi Performa, Integrasi Analitik & Deployment GitHub Pages *(Belum Dimulai)*

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

- [ ] **2.1 Konfigurasi Klien Supabase di Frontend**
  - Buat berkas `src/services/supabase.ts` untuk menginisialisasi `@supabase/supabase-js`.
  - Buat berkas definisi tipe TypeScript `src/types/database.types.ts` berdasarkan skema tabel Dokumen `07`.
- [ ] **2.2 Penyiapan Berkas Eksekusi SQL Supabase**
  - Sediakan berkas `supabase-schema.sql` siap pakai yang mencakup:
    - 9 tabel utama (`pengguna`, `seri`, `episode`, `jadwal_tetap`, `acara_mendatang`, `sesi_onair`, `pertanyaan`, `halaman_statis`, `pengaturan_situs`).
    - Aturan keamanan *Row Level Security* (RLS) lengkap (hanya Superadmin/Admin yang bisa memodifikasi; publik hanya membaca konten berstatus tayang).
    - Indeks pencarian teks bahasa Indonesia (GIN index).
- [ ] **2.3 Eksekusi Skrip Migrasi Data Katalog (Python)**
  - Siapkan skrip migrasi `scripts/migrate_catalog.py` (dari Dokumen `08`).
  - Rekonsiliasi 337 baris publik dari `metadata_youtube.csv` menjadi tepat **331 video unik** (249 pada 21 seri resmi + 82 pada keranjang *"Lainnya"*).
  - Impor 72 baris jadwal tetap penyiaran 24 jam ke tabel `jadwal_tetap`.
- [ ] **2.4 Pembuatan Akun Superadmin & Admin Awal**
  - Panduan pendaftaran akun admin pertama melalui dasbor Supabase Auth.

---

> 🛑 **TITIK TINJAUAN 2 (REVIEW GATE 2)**
> - **Kriteria Lolos:**
>   1. Tabel di Supabase terisi lengkap (21 seri, 331 episode video, 72 baris jadwal siaran 24 jam).
>   2. Kebijakan RLS teruji aktif (akses tanpa login hanya bisa membaca baris `status = 'tayang'`).
>   3. Frontend berhasil melakukan uji coba kueri data seri dari Supabase dan menampilkannya di konsol peramban.
> - **Aksi Pengembang:** Berhenti dan minta persetujuan pengguna untuk lanjut ke Tahap 3.

---

### TAHAP 3: Mesin Pemutar Audio Persisten & Penanda Waktu On-Air

- [ ] **3.1 Global Audio State Engine (`AudioContext.tsx`)**
  - Bangun `AudioContext` yang mengelola objek tunggal `new Audio()` di luar siklus perutean halaman.
  - State: `isPlaying`, `isBuffering`, `isOffline`, `volume`, `currentProgram`, `error`.
  - Mekanisme sambung ulang otomatis (*auto-reconnect*) hingga 3 kali jika sinyal studio goyang.
- [ ] **3.2 Komponen Bilah Pemutar Bawah Persisten (`PersistentPlayer.tsx`)**
  - Tombol putar/jeda dengan indikator memuat (*loading spinner*).
  - Pengatur volume audio (slider + tombol bisu/unmute).
  - Teks informasi program: menampilkan nama program yang sedang mengudara dan program berikutnya.
  - Penanganan status siaran gangguan / offline santun (`FR-07`).
- [ ] **3.3 Kustom Hook Deteksi Program On-Air (`useOnAirProgram.ts`)**
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

- [ ] **4.1 Halaman Beranda (`HomePage.tsx`)**
  - Hero siaran utama: kartu interaktif dengan badge *Live On-Air*, jam siaran, nama penyiar, dan tombol putar besar.
  - Blok Acara Mendatang: daftar ringkas acara talkshow/live YouTube tanpa tombol buntu (`FR-28`).
  - Blok 4 Episode Video Terbaru: menampilkan kartu video teranyar berstatus Tayang (`FR-29`).
  - Blok Program Unggulan: menampilkan maksimal 6 seri pilihan (`FR-30`).
- [ ] **4.2 Halaman Jadwal Siaran 24 Jam (`SchedulePage.tsx`)**
  - Bilah tab hari: Senin s.d. Minggu (`FR-04`).
  - Tabel jadwal 24 jam dengan penyorotan warna emas pada blok jam yang sedang aktif saat ini.
- [ ] **4.3 Halaman Jelajah Seri Program (`ProgramListPage.tsx`)**
  - Saringan kategori topik instan di sisi klien.
  - Kisi 21 kartu seri program resmi + 1 kartu keranjang *"Lainnya"* (`FR-09`, `FR-13`).
- [ ] **4.4 Halaman Detail Seri (`SeriesDetailPage.tsx`) & Keranjang Lainnya**
  - Deskripsi lengkap program dan gambar sampul rasio 16:9.
  - Daftar episode berurutan dengan nomor episode baku dan tombol *"Muat Lebih Banyak"*.
- [ ] **4.5 Halaman Detail Episode & Pemutar Video (`EpisodeDetailPage.tsx`)**
  - Komponen *Lite YouTube Facade*: gambar poster WebP ringan dengan tombol putar tiruan.
  - Aturan mutlak: **TIDAK ADA AUTOPLAY** saat halaman dibuka (`FR-11`).
  - Panel metadata lengkap: narasumber, moderator, tanggal tayang, durasi, topik, dan tombol salin tautan.
  - Penanganan santun bila video YouTube dihapus/privat (*broken link fallback*, `FR-12`).
- [ ] **4.6 Pencarian Global & Halaman Statis**
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

- [ ] **5.1 Formulir Tanya Jawab Pengunjung di Beranda (`QnAForm.tsx`)**
  - Kolom nama (wajib diisi), kotak centang opsi *"Kirim sebagai Anonim"* (`M-06`).
  - Kolom teks pertanyaan pemustaka.
  - Kolom tersembunyi *Honeypot* untuk menangkal bot spam internet (`FR-25`, `DR-08`).
  - Pembatasan frekuensi pengiriman lokal (*rate limiting* 1 pertanyaan per 30 detik).
  - Status formulir: terkunci otomatis dengan pesan santun saat sesi belum dibuka oleh petugas.
- [ ] **5.2 Adaptasi Label saat Siaran Khusus Live YouTube (`M-19`)**
  - Formulir otomatis mengubah teks tombol dan judul saat admin memilih jenis acara webinar YouTube.
- [ ] **5.3 Integrasi Supabase Realtime (CDC WebSocket)**
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

- [ ] **6.1 Autentikasi Pengelola & Proteksi Rute (`AuthContext.tsx`)**
  - Halaman login admin `/admin/masuk` dengan Supabase Auth (surel & kata sandi).
  - Proteksi rute privat: pengunjung publik yang belum login otomatis dialihkan ke halaman masuk.
  - Pemisahan wewenang peran: Superadmin vs Admin biasa (`M-15`, `DR-06`).
- [ ] **6.2 Modul Tanya Jawab On-Air Studio (`/admin/tanya-jawab`)**
  - Tombol Buka Sesi Baru (pilih program siaran atau acara khusus YouTube) dan Tutup Sesi.
  - Tabel pertanyaan seketika: pertanyaan baru dari pendengar langsung muncul otomatis (<2 detik) tanpa refresh.
  - Tombol aksi penyiar: Tandai Dibaca, Sorot (*Pin*), Sembunyikan, dan Hapus Pertanyaan.
  - Tombol unduh laporan riwayat tanya jawab ke berkas CSV (`FR-24`).
- [ ] **6.3 Modul Kelola Jadwal Siaran 24 Jam (`/admin/jadwal`)**
  - Formulir sunting nama penyiar dan jam tayang tabel jadwal tetap (ingat: **TIDAK ADA tombol playout/ganti lagu studio**).
- [ ] **6.4 Modul Kelola Katalog Video (`/admin/episode` & `/admin/seri`)**
  - Formulir penambahan episode baru kilat (target alur selesai ≤5 menit).
  - Pilihan status konten: Draf, Tayang, atau Internal.
  - Pengaturan penomoran episode otomatis per seri.
- [ ] **6.5 Modul Acara Mendatang & Halaman Statis**
  - Tambah/sunting/hapus acara talkshow atau webinar mendatang.
  - Editor teks sederhana untuk menyunting halaman Tentang dan Kontak.
- [ ] **6.6 Menu Khusus Superadmin (`/admin/pengaturan`)**
  - Pengaturan URL aliran Icecast HTTPS dan pesan gangguan siaran.
  - Pengaturan ID Pengukuran Google Analytics 4 (GA4).
  - Tombol unduh berkas cadangan data sistem (*Manual JSON Backup*, `FR-48`).

---

> 🛑 **TITIK TINJAUAN 6 (REVIEW GATE 6)**
> - **Kriteria Lolos:**
>   1. Login sebagai Admin dan Superadmin berjalan aman; pembatasan hak akses berfungsi presisi.
>   2. Simulasi siaran: Admin membuka sesi tanya jawab, pertanyaan dari pengunjung di HP langsung masuk ke layar panel studio secara seketika (*realtime*).
>   3. Menambah 1 episode baru berhasil tampil di halaman depan dalam waktu <5 menit.
>   4. 10 Skenario Pengujian UAT Mandiri Pustakawan dari Dokumen `09` teruji LULUS.
> - **Aksi Pengembang:** Berhenti dan minta persetujuan pengguna untuk lanjut ke Tahap 7.

---

### TAHAP 7: Optimasi Performa, Integrasi Analitik & Deployment GitHub Pages

- [ ] **7.1 Audit Kualitas & Kinerja Google Lighthouse**
  - Jalankan audit Chrome Lighthouse: pastikan skor Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO ≥90.
  - Kompresi aset gambar dan verifikasi *Core Web Vitals* (LCP < 2.5s, CLS < 0.1).
- [ ] **7.2 Integrasi Google Analytics 4 (GA4) Ramah Privasi**
  - Pasang helper `ga4.ts` dengan pelacakan event kunci (`radio_play`, `submit_pertanyaan`).
  - Verifikasi parameter `anonymize_ip: true` aktif untuk melindungi privasi pemustaka.
- [ ] **7.3 Konfigurasi Deployment GitHub Pages SPA**
  - Buat berkas `public/404.html` dengan skrip pengalihan SPA (*Single Page App redirect*) agar tidak ada galat 404 saat pengguna me-refresh halaman rute dalam.
  - Buat berkas alur kerja GitHub Actions `.github/workflows/deploy.yml` untuk build dan deploy otomatis ke branch `gh-pages`.
- [ ] **7.4 Verifikasi Produksi & Tanda Tangan Berita Acara UAT**
  - Uji coba akhir pada domain GitHub Pages resmi dengan protokol HTTPS aktif.
  - Penyelesaian Berita Acara Serah Terima Sistem (Dokumen `09` Bagian 9).

---

> 🏁 **TITIK AKHIR: PELUNCURAN RESMI (GO-LIVE)**
> Website Radio & Siniar WBS Perpusnas resmi mengudara ke publik dengan biaya operasional Rp 0 (gratis selamanya) dan diserahkan kepada pustakawan pengelola layanan.
