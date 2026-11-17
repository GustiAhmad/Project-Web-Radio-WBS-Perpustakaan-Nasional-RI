# CLAUDE.md — Panduan Utama Pengembang & Eksekusi AI (Claude)
## Website Layanan Radio dan Siniar WBS Perpustakaan Nasional RI

> **CATATAN UNTUK CLAUDE:** Berkas ini adalah instruksi operasional induk (*primary operating instructions*) yang wajib dibaca dan dipatuhi setiap kali memulai sesi koding. Anda bertindak sebagai **Senior Full-Stack Engineer** yang membangun website resmi penyiaran literasi Perpustakaan Nasional RI. Bekerjalah secara terarah, hemat token, patuhi batasan ketat, dan ikuti panduan arsitektur yang telah ditetapkan.

---

## 1. Ringkasan Proyek & Misi Utama

- **Nama Resmi Layanan:** Layanan Radio dan Siniar Widya Bahana Swara (WBS) Perpustakaan Nasional RI.
- **Nama Situs Web:** **Radio & Siniar WBS Perpusnas** (`M-01`).
- **Instansi Penanggung Jawab:** Pusat Jasa Informasi Perpustakaan dan Pengelolaan Naskah Nusantara (PUJASINTARA), Perpustakaan Nasional RI.
- **Penyusun Awal / Mahasiswa Magang:** Gusti Ahmad Muttahid Bilhaq (Teknik Informatika).
- **Misi Website:** Menyediakan etalase modern, cepat, dan ramah pemustaka untuk mendengarkan siaran radio 24 jam secara persisten (tanpa putus saat pindah halaman), menjelajahi katalog 331 rekaman video/siniar YouTube resmi, dan mengirimkan pertanyaan interaktif langsung (*realtime*) ke studio saat program siaran berlangsung.

---

## 2. Aturan Emas & Batasan Mutlak (*Strict Guardrails / Non-Negotiables*)

Claude **DILARANG KERAS** melanggar 10 aturan mutlak berikut:

1. **Dilarang Membuat Kontrol Playout Studio (`K-5`, `NG-02`):**
   - Website **BUKAN** pengendali pemancar, daftar lagu, atau jingle studio. Seluruh pemutaran lagu berjalan di studio menggunakan **Jazler RadioStar 2**.
   - Di panel admin, **DILARANG** membuat tombol putar lagu studio, tombol lewati (*skip*), atau pengaturan urutan playlist. Panel admin hanya mengatur **tampilan jadwal 24 jam** di website (`M-18`).
2. **Dilarang Mengunggah/Menyimpan File Video atau Audio Mentah di Server (`K-2`, `NG-01`):**
   - Berkas video MP4/MKV tidak disimpan di hosting/Supabase. Video wajib di-*embed* langsung dari YouTube resmi WBS.
   - Berkas audio radio dialirkan (*streaming*) langsung dari server Icecast studio. Hal ini menjaga biaya hosting tetap **Rp 0 (Gratis)**.
3. **Wajib Protokol HTTPS pada Aliran Icecast (`PR-01`, `R-10`, `DR-04`):**
   - Website di-host di GitHub Pages yang mewajibkan HTTPS. Panggilan audio HTTP biasa akan diblokir oleh kebijakan keamanan *Mixed Content* peramban.
   - Aliran audio wajib menggunakan port SSL resmi studio (Port 8443) atau reverse proxy SSL Nginx/Cloudflare (Port 443).
4. **Pembakuan Istilah — Dilarang Menyingkat "Ruang Literasi" (`DR-01`):**
   - Program unggulan WBS bernama resmi **"Ruang Literasi"**. **DILARANG KERAS** memunculkan singkatan informal seperti `"Ruli"` di kode, antarmuka, basis data, maupun komentar.
5. **Hanya 2 Peran Akun Pengelola (`M-15`, `DR-06`):**
   - Struktur peran dibakukan hanya 2: **`superadmin`** (akses penuh seluruh modul, kelola akun, pengaturan URL Icecast & token GA4) dan **`admin`** (operasional harian: kurasi video, buka sesi tanya jawab, sunting jadwal).
   - Jangan membuat peran tambahan seperti *"Penyiar"*, *"Pustakawan Peninjau"*, atau *"Pimpinan"* sebagai akun login terpisah.
6. **Katalog Pasti 331 Video Unik (`M-03`, `M-04`, `DR-02`):**
   - Dari 507 data mentah YouTube, hanya 337 baris publik yang diproses. Setelah 6 baris duplikat rekonsiliasi dibersihkan, katalog menghasilkan tepat **331 video unik**:
     - **249 episode** terbagi ke dalam **21 seri resmi**.
     - **82 video lepasan** ditampung dalam keranjang khusus **"Lainnya"** (`FR-13`). Video keranjang ini **tidak memiliki nomor episode**.
7. **Pemutar Audio Persisten Lintas Halaman (`FR-01`, `DR-03`):**
   - Elemen audio HTML5 diletakkan di luar siklus perutean halaman (*outside React Router Outlet* / Global Audio Context). Audio siaran radio **TIDAK BOLEH mati atau mengulang (*re-buffering*)** saat pengunjung mengeklik menu apa pun di website.
8. **Lite YouTube Facade & Tanpa Autoplay (`FR-11`, `DR-05`):**
   - Di halaman detail episode, video YouTube **DILARANG diputar otomatis (*NO autoplay*)** agar suaranya tidak menabrak siaran audio radio yang sedang aktif didengarkan pemustaka.
   - Gunakan pola *Lite YouTube Facade* (tampilkan poster gambar WebP ringan dahulu; iframe YouTube asli baru disuntikkan saat pengunjung mengeklik tombol putar).
9. **Formulir Tanya Jawab Terkelola & Anti-Spam (`K-3`, `FR-25`, `DR-08`):**
   - Dilarang membuat chatbox liar tanpa batas. Formulir tanya jawab hanya tampil/aktif saat sesi dibuka oleh petugas.
   - Kolom nama wajib diisi, namun sediakan opsi centang *"Kirim sebagai Anonim"* (`M-06`).
   - Wajib menyertakan *Honeypot field* (kolom rahasia anti-bot) dan pembatasan pengiriman (*rate limit* 1 pertanyaan per 30 detik per perangkat).
10. **Kepatuhan Desain Sederhana Pola UT Radio (`K-6`, `NG-10`):**
    - Desain berfokus pada kecepatan dan keterbacaan: 5 menu navigasi utama (Beranda, Jadwal, Program, Tentang, Kontak).
    - **Dilarang memasang:** Spanduk banner carousel otomatis yang berputar sendiri, animasi parallax berat, jendela pop-up iklan, dan mode gelap (*dark mode*) agar identitas visual resmi Perpusnas tetap konsisten.

---

## 3. Rencana Tumpukan Teknologi (*Tech Stack*)

| Lapisan Sistem | Teknologi Terpilih | Versi / Keterangan | Alasan Pemilihan |
|---|---|---|---|
| **Kerangka Frontend** | **React** + **Vite** | React 18, Vite 5+ | Cepat, ringan, ekosistem kaya, mendukung arsitektur SPA persisten. |
| **Bahasa Pemrograman** | **TypeScript** | Versi 5+ (Strict Mode) | Menjamin kepastian tipe data katalog, jadwal, dan respons Supabase. |
| **CSS & Tata Letak** | **Tailwind CSS** | Versi 3.4+ | Utility-first, responsif *Mobile-First*, mudah dikustomisasi palet warna Perpusnas. |
| **Ikon Antarmuka** | **Lucide React** | Versi Terbaru | Ikon SVG bersih, seragam, ukuran berkas sangat kecil. |
| **Perutean Halaman** | **React Router DOM** | Versi 6+ | Menangani navigasi SPA di sisi klien dengan mulus. |
| **Backend-as-a-Service** | **Supabase (Tier Gratis)** | PostgreSQL 15+, Supabase JS SDK v2 | Basis data relasional tangguh, Autentikasi JWT, Storage CDN, dan Realtime WebSocket (CDC). |
| **Hosting & CI/CD** | **GitHub Pages** + **GitHub Actions** | Static Web Hosting (SSL Gratis) | Biaya Rp 0 (gratis selamanya), uptime 99.9%, terintegrasi langsung dengan repositori kode. |
| **Penyedia Audio Radio** | **Icecast 2** (Studio WBS) | Port 8443 (HTTPS) / SSL Reverse Proxy | Aliran siaran audio live dari studio (128 kbps stereo). |
| **Penyedia Video** | **YouTube IFrame Embed** | Lite YouTube Facade | Menampilkan 331 rekaman siaran tanpa beban server sendiri. |
| **Pelacakan Analitik** | **Google Analytics 4 (GA4)** | `gtag.js` (`anonymize_ip: true`) | Memantau sebaran provinsi/kota pendengar tanpa melanggar privasi pemustaka. |

---

## 4. Konvensi Struktur Folder Proyek

Claude harus mengikuti struktur direktori standar berikut:

```
radio-wbs/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Otomasi build & deploy ke GitHub Pages
├── docs/                         # Seluruh 10 dokumen perencanaan resmi (01 s.d. 10)
├── public/
│   ├── favicon.ico
│   ├── logo-perpusnas.png        # Logo resmi Perpustakaan Nasional RI
│   ├── 404.html                  # Skrip SPA redirect fallback untuk GitHub Pages
│   └── sitemap.xml
├── src/
│   ├── assets/                   # Gambar ilustrasi lokal, fallback thumbnail
│   ├── components/               # Komponen UI modular
│   │   ├── common/               # Komponen umum: Header, Footer, Breadcrumbs, EmptyState, Modal
│   │   ├── player/               # Pemutar Audio Persisten (Bottom Bar, Volume, ErrorState)
│   │   ├── home/                 # Komponen khusus Beranda: HeroOnAir, AcaraMendatang, VideoTerbaru
│   │   ├── catalog/              # Komponen Katalog: SeriCard, EpisodeCard, YouTubeFacade, CategoryFilter
│   │   ├── schedule/             # Komponen Jadwal: ScheduleTable, DayTabs, OnAirBadge
│   │   ├── interaction/          # Formulir Tanya Jawab On-Air, LiveStatusBadge
│   │   └── admin/                # Komponen panel admin: Sidebar, DataTable, StatCard, FormModal
│   ├── context/                  # State manajemen global
│   │   ├── AudioContext.tsx      # Global persistent audio player context & engine
│   │   └── AuthContext.tsx       # Supabase Auth session & user role state (Superadmin/Admin)
│   ├── hooks/                    # Kustom React Hooks
│   │   ├── useOnAirProgram.ts    # Deteksi program on-air & program berikutnya (siklus 24 jam WIB)
│   │   ├── useRealtimeQnA.ts     # Supabase Realtime WebSocket subscription untuk pertanyaan
│   │   └── useDebounce.ts        # Pencarian kata kunci debounce
│   ├── pages/                    # Halaman rute publik & admin
│   │   ├── HomePage.tsx          # Beranda (/)
│   │   ├── SchedulePage.tsx      # Jadwal Siaran 24 Jam (/jadwal)
│   │   ├── ProgramListPage.tsx   # Daftar Seri Program (/program)
│   │   ├── SeriesDetailPage.tsx  # Detail Seri & Daftar Episode (/program/:slug)
│   │   ├── EpisodeDetailPage.tsx # Detail Episode & Video Facade (/program/:seriSlug/:episodeSlug)
│   │   ├── SearchPage.tsx        # Hasil Pencarian Global (/cari)
│   │   ├── StaticPage.tsx        # Tentang (/tentang), Kontak (/kontak), Kebijakan Privasi
│   │   ├── NotFoundPage.tsx      # Halaman 404 Kustom
│   │   └── admin/                # Halaman Panel Pengelola
│   │       ├── AdminLoginPage.tsx      # Masuk Admin (/admin/masuk)
│   │       ├── AdminDashboardPage.tsx  # Dasbor Ringkasan Operasional (/admin)
│   │       ├── AdminQnAPage.tsx        # Sesi Tanya Jawab On-Air Studio (/admin/tanya-jawab)
│   │       ├── AdminSchedulePage.tsx   # Kelola Jadwal Siaran 24 Jam (/admin/jadwal)
│   │       ├── AdminEpisodesPage.tsx   # Kelola Episode Video (/admin/episode)
│   │       ├── AdminSeriesPage.tsx     # Kelola Seri Program (/admin/seri)
│   │       ├── AdminEventsPage.tsx     # Kelola Acara Mendatang (/admin/acara)
│   │       ├── AdminPagesPage.tsx      # Sunting Halaman Statis (/admin/halaman)
│   │       └── AdminSettingsPage.tsx   # Pengaturan Sistem Khusus Superadmin (/admin/pengaturan)
│   ├── services/                 # Komunikasi data eksternal
│   │   ├── supabase.ts           # Inisialisasi Supabase Client
│   │   ├── audioService.ts       # HTML5 Audio Player Singleton controller
│   │   └── ga4.ts                # Helper pelacakan event GA4
│   ├── types/                    # Definisi TypeScript Interfaces & Enums
│   │   ├── database.types.ts     # Tipe data tabel Supabase (sesuai Dokumen 07)
│   │   ├── audio.types.ts        # Tipe state audio player
│   │   └── qna.types.ts          # Tipe sesi & pertanyaan tanya jawab
│   ├── utils/                    # Utilitas pembantu
│   │   ├── timeUtils.ts          # Konversi zona waktu WIB, kalkulasi siklus 06.00-05.59
│   │   ├── stringUtils.ts        # Slugify, sanitasi teks anti-XSS
│   │   └── formatters.ts         # Format tanggal Indonesia (misal: "17 November 2026")
│   ├── App.tsx                   # Pengatur rute utama (React Router) & pembungkus Context
│   ├── index.css                 # Import Tailwind directives & token warna Perpusnas
│   └── main.tsx                  # Titik masuk utama React
├── .env.example                  # Template variabel lingkungan publik
├── index.html                    # Kerangka HTML utama dengan meta SEO
├── package.json
├── tailwind.config.js            # Tema palet warna resmi Perpusnas
├── tsconfig.json
└── vite.config.ts
```

---

## 5. Standar Palet Warna & Token Desain (Perpusnas Identity)

Gunakan variabel warna berikut pada `tailwind.config.js` untuk memastikan identitas visual resmi Perpustakaan Nasional RI terjaga:

```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        perpusnas: {
          blue: {
            DEFAULT: '#0B3B60', // Biru Utama Perpusnas (Wibawa, Formal, Header, Tombol Aksi)
            dark: '#07243B',    // Biru Gelap (Bilah Pemutar Bawah, Footer)
            light: '#E8F1F8',   // Biru Lembut (Latar Belakang Kartu, Badge)
          },
          gold: {
            DEFAULT: '#D4A017', // Aksen Emas/Kuning (Badge On-Air, Penanda Aktif)
            light: '#FFF9E6',   // Latar Emas Tipis
          },
          gray: {
            50: '#F8FAFC',     // Latar Belakang Halaman Utama
            100: '#F1F5F9',
            600: '#475569',    // Teks Sekunder
            900: '#0F172A',    // Teks Utama (Hitam Elegan)
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
```

---

## 6. Perintah Standar Pengembangan (*Commands*)

```bash
# 1. Pemasangan dependensi
npm install

# 2. Menjalankan server pengembangan lokal (port 5173)
npm run dev

# 3. Memeriksa tipe data TypeScript tanpa build
npm run type-check

# 4. Melakukan kompilasi produksi (hasil di folder dist/)
npm run build

# 5. Menjalankan pratinjau hasil build produksi secara lokal
npm run preview
```

---

## 7. Referensi Cepat ke Dokumen Perencanaan (`/docs`)

Bila Claude membutuhkan detail spesifikasi, buka berkas dokumen yang bersangkutan:
- **Butir Fungsional Spesifik (`FR-01` s.d. `FR-53`):** Buka [`docs/05-kebutuhan-fungsional-dan-prioritas.md`](file:///C:/Project%20Radio%20WBS%20Perpusnas/docs/05-kebutuhan-fungsional-dan-prioritas.md).
- **Arsitektur Jamstack, HTTPS Icecast & WebSockets:** Buka [`docs/06-arsitektur-dan-kebutuhan-teknis.md`](file:///C:/Project%20Radio%20WBS%20Perpusnas/docs/06-arsitektur-dan-kebutuhan-teknis.md).
- **Skema DDL 9 Tabel, Indeks & SQL RLS:** Buka [`docs/07-model-data-dan-kamus-data.md`](file:///C:/Project%20Radio%20WBS%20Perpusnas/docs/07-model-data-dan-kamus-data.md).
- **Skrip Python Migrasi Data YouTube:** Buka [`docs/08-rencana-migrasi-dan-operasional.md`](file:///C:/Project%20Radio%20WBS%20Perpusnas/docs/08-rencana-migrasi-dan-operasional.md).
- **Skenario Pengujian UAT Pustakawan:** Buka [`docs/09-rencana-pengujian-dan-evaluasi.md`](file:///C:/Project%20Radio%20WBS%20Perpusnas/docs/09-rencana-pengujian-dan-evaluasi.md).
- **Glosarium Istilah & Log Keputusan (`K`, `M`, `DR`):** Buka [`docs/10-glosarium-dan-log-keputusan.md`](file:///C:/Project%20Radio%20WBS%20Perpusnas/docs/10-glosarium-dan-log-keputusan.md).

---

## 8. Panduan Eksekusi Tugas Bertahap (*Review Gate Workflow*)

1. Claude harus membaca berkas [`ROADMAP-IMPLEMENTASI.md`](file:///C:/Project%20Radio%20WBS%20Perpusnas/ROADMAP-IMPLEMENTASI.md).
2. Kerjakan subtugas **hanya untuk 1 tahap yang sedang aktif**. Jangan melompat ke tahap berikutnya secara sepihak.
3. Setelah seluruh subtugas pada tahap tersebut selesai dan teruji, **BERHENTI dan berikan laporan ringkas kepada pengguna (*User*)**. Minta pengguna melakukan peninjauan pada **Titik Tinjauan (*Review Gate*)**.
4. Lanjutkan ke tahap berikutnya hanya setelah pengguna memberikan persetujuan (*approval*).
