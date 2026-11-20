# Radio & Siniar WBS Perpustakaan Nasional RI

[![Deploy ke GitHub Pages](https://github.com/radio-perpusnas/radio-perpusnas.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/radio-perpusnas/radio-perpusnas.github.io/actions/workflows/deploy.yml)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Free%20Tier-3FCF8E?logo=supabase&logoColor=black)
![Hosting](https://img.shields.io/badge/hosted%20on-GitHub%20Pages-222222?logo=github&logoColor=white)

> Etalase resmi **Layanan Radio dan Siniar Widya Bahana Swara (WBS)** Perpustakaan Nasional RI, di bawah naungan **Pusat Jasa Informasi Perpustakaan dan Pengelolaan Naskah Nusantara (PUJASINTARA)**.

**Demo langsung:** https://radio-perpusnas.github.io/

---

## Sekilas proyek

Website ini memodernisasi layanan penyiaran literasi Perpusnas dengan biaya hosting **Rp 0 (gratis selamanya)**:

- **Siaran radio 24 jam** — pemutar audio persisten lintas halaman, terhubung ke aliran Icecast studio (HTTPS) yang dimanajemen otomatis dengan Jazler RadioStar 2.
- **Katalog 331 video unik** — 249 episode dari 21 seri resmi (LibTalk, Ruang Literasi, Diskusi Naskah Nusantara, dll.) plus 82 video lepasan di keranjang "Lainnya". Video di-*embed* dari YouTube resmi WBS dengan pola *Lite YouTube Facade* dan tanpa autoplay.
- **Jadwal siaran 24 jam** — tampilan jadwal yang dikelola petugas dari panel admin (bukan pengendali pemancar).
- **Chat live terkelola** — sesi dibuka/ditutup manual oleh petugas, real-time via Supabase Realtime, dengan honeypot, rate limit 1 pesan/30 detik, opsi anonim, dan alat moderasi.
- **Berita & artikel** — modul kurasi konten dengan editor kaya, status draf, dan pratinjau sebelum terbit.

Akses pengelola hanya dua peran: **superadmin** (akses penuh) dan **admin** (operasional harian).

---

## Tumpukan teknologi

| Lapisan | Teknologi |
|---|---|
| Frontend | React 18, Vite 5, TypeScript (strict mode) |
| Tata letak | Tailwind CSS 3 (palet resmi Perpusnas: biru `#0B3B60`, emas `#D4A017`) |
| Ikon & rute | Lucide React, React Router DOM |
| Backend | Supabase Free Tier — PostgreSQL 15+, Auth JWT, Storage, Realtime CDC |
| Audio / Video | Icecast 2 studio (HTTPS), YouTube IFrame Embed |
| Analitik | Google Analytics 4 (IP anonim) |
| Hosting & CI/CD | GitHub Pages + GitHub Actions |

---

## Menjalankan proyek lokal

```bash
# 1. Klon repositori
git clone https://github.com/radio-perpusnas/radio-perpusnas.github.io.git
cd radio-perpusnas.github.io

# 2. Pasang dependensi
npm install

# 3. Salin template variabel lingkungan, lalu isi nilainya
cp .env.example .env

# 4. Jalankan server pengembangan (http://localhost:5173)
npm run dev
```

Skrip lain: `npm run type-check`, `npm run build`, `npm run preview`.

Sebelum aplikasi dapat memakai data, jalankan skema dan migrasi SQL di Supabase. Ikuti **[panduan setup Supabase](docs/panduan-setup-supabase.md)** dan **[panduan deploy](docs/panduan-deploy.md)**. Nilai rahasia (Supabase, GA4, URL Icecast) diisi lewat GitHub Actions secrets; lihat `.env.example`.

---

## Struktur repositori

```text
.
├── .github/workflows/deploy.yml   # Build & deploy ke GitHub Pages
├── docs/                          # Dokumen perencanaan, panduan, dan roadmap
├── public/                        # Aset statis (logo SVG, favicon, sitemap, 404 fallback)
├── scripts/                       # Migrasi katalog & helper lokal
│   └── data/metadata_youtube.csv  # Sumber data untuk menghasilkan ulang SQL katalog
├── src/
│   ├── components/                # Komponen UI per fitur
│   ├── context/                   # AudioContext & AuthContext
│   ├── hooks/                     # Hook Realtime, sesi chat, program on-air
│   ├── pages/                     # Halaman publik & admin
│   ├── services/                  # Klien Supabase, audio, GA4
│   ├── types/                     # Definisi tipe database & aplikasi
│   └── utils/                     # Format waktu WIB, sanitasi, formatter
├── supabase/
│   ├── schema.sql                 # Skema lengkap untuk instalasi baru
│   └── migrations/                # Migrasi bertahap (001–007)
├── .env.example                   # Template variabel lingkungan publik
├── AGENTS.md                      # Instruksi operasional & guardrails proyek
├── CLAUDE.md                      # Penunjuk singkat ke AGENTS.md
├── README.md
├── index.html                     # Template HTML, favicon & metadata OG
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── vercel.json                    # Konfigurasi lama, tidak dipakai oleh deploy GitHub Pages
```

---

## Dokumentasi

| No | Dokumen | Keterangan |
|:--:|---|---|
| 01 | [`01-prd.md`](docs/01-prd.md) | Product Requirements Document |
| 02 | [`02-peta-konten-dan-taksonomi.md`](docs/02-peta-konten-dan-taksonomi.md) | Peta konten & taksonomi (21 seri + "Lainnya") |
| 03 | [`03-rancangan-data-dan-panel.md`](docs/03-rancangan-data-dan-panel.md) | Rancangan data & panel admin (2 peran) |
| 04 | [`04-rancangan-halaman-pengunjung.md`](docs/04-rancangan-halaman-pengunjung.md) | Rancangan halaman pengunjung |
| 05 | [`05-kebutuhan-fungsional-dan-prioritas.md`](docs/05-kebutuhan-fungsional-dan-prioritas.md) | Kebutuhan fungsional & prioritas |
| 06 | [`06-arsitektur-dan-kebutuhan-teknis.md`](docs/06-arsitektur-dan-kebutuhan-teknis.md) | Arsitektur Jamstack, HTTPS Icecast, CI/CD |
| 07 | [`07-model-data-dan-kamus-data.md`](docs/07-model-data-dan-kamus-data.md) | Model data relasional & SQL RLS |
| 08 | [`08-rencana-migrasi-dan-operasional.md`](docs/08-rencana-migrasi-dan-operasional.md) | Pipeline migrasi data & SOP |
| 09 | [`09-rencana-pengujian-dan-evaluasi.md`](docs/09-rencana-pengujian-dan-evaluasi.md) | Rencana pengujian & UAT |
| 10 | [`10-glosarium-dan-log-keputusan.md`](docs/10-glosarium-dan-log-keputusan.md) | Glosarium & log keputusan arsitektur |
| 11 | [`11-panduan-youtube-data-api.md`](docs/11-panduan-youtube-data-api.md) | Panduan YouTube Data API |
| 12 | [`12-rencana-analitik-ga4.md`](docs/12-rencana-analitik-ga4.md) | Rencana analitik GA4 |

Panduan operasional: **[setup Supabase](docs/panduan-setup-supabase.md)** · **[deploy](docs/panduan-deploy.md)** · **[roadmap implementasi](docs/roadmap-implementasi.md)**.

Panduan untuk agen/pengembang: **[AGENTS.md](AGENTS.md)** (sumber tunggal aturan dan alur kerja).

---

## Tim proyek

- **Penyusun & pengembang:** Gusti Ahmad Muttahid Bilhaq — Mahasiswa Magang Teknik Informatika
- **Penanggung jawab:** PUJASINTARA, Perpustakaan Nasional Republik Indonesia
