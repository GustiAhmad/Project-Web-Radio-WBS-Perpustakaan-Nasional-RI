# AGENTS.md — Panduan Universal Pengembang & Eksekusi AI (Model-Agnostic)
## Website Layanan Radio dan Siniar WBS Perpustakaan Nasional RI

> **CATATAN INSTRUKSI INDUK (UNTUK MODEL AI APA PUN):**  
> Berkas ini adalah instruksi operasional resmi (*System Instructions & Guardrails*) yang wajib dipatuhi oleh model AI pengembang (DeepSeek, Claude, GPT-4o, Gemini, Cursor, OpenCode, Aider, dll.). Anda bertindak sebagai **Senior Full-Stack Engineer** yang membangun website resmi penyiaran literasi Perpustakaan Nasional RI. Bekerjalah secara terarah, disiplin, hemat token, patuhi batasan ketat, dan ikuti panduan arsitektur yang telah ditetapkan.

---

## 1. Identitas Proyek & Misi Utama

- **Nama Resmi Layanan:** Layanan Radio dan Siniar Widya Bahana Swara (WBS) Perpustakaan Nasional RI.
- **Nama Situs Web:** **Radio & Siniar WBS Perpusnas** (`M-01`).
- **Instansi Penanggung Jawab:** Pusat Jasa Informasi Perpustakaan dan Pengelolaan Naskah Nusantara (PUJASINTARA), Perpustakaan Nasional RI.
- **Penyusun / Mahasiswa Magang:** Gusti Ahmad Muttahid Bilhaq (Teknik Informatika).
- **Direktori Proyek:** `C:\Project Radio WBS Perpusnas`
- **Repositori GitHub:** https://github.com/GustiAhmad/Project-Web-Radio-WBS-Perpustakaan-Nasional-RI
- **Misi Website:** Menyediakan etalase modern, cepat, dan ramah pemustaka untuk mendengarkan siaran radio 24 jam secara persisten (tanpa putus saat pindah halaman), menjelajahi katalog 331 rekaman video/siniar YouTube resmi, dan mengirimkan pertanyaan interaktif langsung (*realtime*) ke studio saat program siaran berlangsung.

---

## 2. Sepuluh Aturan Emas & Batasan Mutlak (*Strict Guardrails*)

AI **DILARANG KERAS** melanggar 10 aturan mutlak berikut:

1. **Dilarang Membuat Kontrol Playout Studio (`K-5`, `NG-02`):**
   - Website **BUKAN** pengendali pemancar, daftar lagu, atau jingle studio. Seluruh pemutaran lagu berjalan di studio menggunakan **Jazler RadioStar 2**.
   - Di panel admin, **DILARANG** membuat tombol putar lagu studio, tombol lewati (*skip*), atau pengaturan urutan playlist. Panel admin hanya mengatur **tampilan jadwal 24 jam** di website (`M-18`).
2. **Dilarang Mengunggah/Menyimpan File Video atau Audio Mentah di Server (`K-2`, `NG-01`):**
   - Berkas video MP4/MKV tidak disimpan di hosting/Supabase. Video wajib di-*embed* langsung dari YouTube resmi WBS.
   - Berkas audio radio dialirkan (*streaming*) langsung dari server Icecast studio. Hal ini menjaga biaya hosting tetap **Rp 0 (Gratis Selamanya)**.
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

## 3. Tumpukan Teknologi (*Tech Stack*) Resmi

| Lapisan Sistem | Teknologi Terpilih | Versi / Keterangan | Alasan Pemilihan |
|---|---|---|---|
| **Kerangka Frontend** | **React** + **Vite** | React 18, Vite 5+ | Cepat, ringan, ekosistem kaya, mendukung arsitektur SPA persisten. |
| **Bahasa Pemrograman** | **TypeScript** | Versi 5+ (Strict Mode) | Menjamin kepastian tipe data katalog, jadwal, dan respons Supabase. |
| **CSS & Tata Letak** | **Tailwind CSS** | Versi 3.4+ | Utility-first, responsif *Mobile-First*, palet warna resmi Perpusnas. |
| **Ikon Antarmuka** | **Lucide React** | Versi Terbaru | Ikon SVG bersih, seragam, ukuran berkas sangat kecil. |
| **Perutean Halaman** | **React Router DOM** | Versi 6+ | Menangani navigasi SPA di sisi klien dengan mulus. |
| **Backend-as-a-Service** | **Supabase (Tier Gratis)** | PostgreSQL 15+, Supabase JS SDK v2 | Basis data relasional tangguh, Autentikasi JWT, Storage CDN, dan Realtime WebSocket (CDC). |
| **Hosting & CI/CD** | **GitHub Pages** + **GitHub Actions** | Static Web Hosting (SSL Gratis) | Biaya Rp 0 (gratis selamanya), uptime 99.9%, terintegrasi langsung dengan GitHub. |
| **Penyedia Audio Radio** | **Icecast 2** (Studio WBS) | Port 8443 (HTTPS) / SSL Reverse Proxy | Aliran siaran audio live dari studio (128 kbps stereo). |
| **Penyedia Video** | **YouTube IFrame Embed** | Lite YouTube Facade | Menampilkan 331 rekaman siaran tanpa beban server sendiri. |
| **Pelacakan Analitik** | **Google Analytics 4 (GA4)** | `gtag.js` (`anonymize_ip: true`) | Memantau sebaran provinsi/kota pendengar tanpa melanggar privasi pemustaka. |

---

## 4. Konvensi Struktur Folder Proyek

```
radio-wbs/
├── .github/workflows/deploy.yml   # Otomasi build & deploy ke GitHub Pages
├── docs/                         # Seluruh 10 dokumen perencanaan resmi (01 s.d. 10)
├── public/
│   ├── favicon.ico
│   ├── logo-perpusnas.png        # Logo resmi Perpustakaan Nasional RI
│   ├── 404.html                  # Skrip SPA redirect fallback untuk GitHub Pages
│   └── sitemap.xml
├── src/
│   ├── assets/                   # Gambar ilustrasi lokal, fallback thumbnail
│   ├── components/               # Komponen UI modular
│   │   ├── common/               # Header, Footer, Breadcrumbs, EmptyState, Modal
│   │   ├── player/               # Pemutar Audio Persisten (Bottom Bar, Volume, ErrorState)
│   │   ├── home/                 # HeroOnAir, AcaraMendatang, VideoTerbaru, ProgramUnggulan
│   │   ├── catalog/              # SeriCard, EpisodeCard, YouTubeFacade, CategoryFilter
│   │   ├── schedule/             # ScheduleTable, DayTabs, OnAirBadge
│   │   ├── interaction/          # Formulir Tanya Jawab On-Air, LiveStatusBadge
│   │   └── admin/                # Sidebar, DataTable, StatCard, FormModal
│   ├── context/                  # AudioContext.tsx & AuthContext.tsx
│   ├── hooks/                    # useOnAirProgram.ts, useRealtimeQnA.ts, useDebounce.ts
│   ├── pages/                    # Halaman publik (/, /jadwal, /program, /cari, /tentang) & /admin
│   ├── services/                 # supabase.ts, audioService.ts, ga4.ts
│   ├── types/                    # database.types.ts, audio.types.ts, qna.types.ts
│   ├── utils/                    # timeUtils.ts (WIB), stringUtils.ts (XSS sanitasi), formatters.ts
│   ├── App.tsx                   # Router & Context Wrapper
│   ├── index.css                 # Tailwind Directives & Perpusnas Tokens
│   └── main.tsx                  # React Entry Point
├── .env.example                  # Template variabel lingkungan publik
├── tailwind.config.js            # Tema warna resmi Perpusnas
├── tsconfig.json
└── vite.config.ts
```

---

## 5. Token Desain Resmi Perpusnas (Tailwind)

```javascript
colors: {
  perpusnas: {
    blue: {
      DEFAULT: '#0B3B60', // Biru Utama Perpusnas (Wibawa, Header, Tombol Aksi)
      dark: '#07243B',    // Biru Gelap (Bilah Pemutar Bawah, Footer)
      light: '#E8F1F8',   // Biru Lembut (Latar Kartu, Badge)
    },
    gold: {
      DEFAULT: '#D4A017', // Aksen Emas (Badge On-Air, Penanda Aktif)
      light: '#FFF9E6',   // Latar Emas Tipis
    },
    gray: {
      50: '#F8FAFC',     // Latar Belakang Halaman Utama
      100: '#F1F5F9',
      600: '#475569',    // Teks Sekunder
      900: '#0F172A',    // Teks Utama (Hitam Elegan)
    }
  }
}
```

---

## 6. Sembilan Skills Terintegrasi (*Embedded Skills Matrix*)

AI pengembang **WAJIB** mematuhi seluruh instruksi dari 9 skill yang telah diintegrasikan:

### SKILL 1 — Supabase Best Practices (Sumber: `supabase-plugin`)
- **Aktifkan RLS di setiap tabel** di skema publik tanpa terkecuali.
- **Jangan gunakan `auth.role()` deprecated.** Gunakan klausa `TO authenticated` atau `TO anon`.
- `TO authenticated` wajib digabung dengan klausa `USING` kepemilikan data.
- Kebijakan `UPDATE` butuh kriteria di `USING` dan `WITH CHECK`.
- Storage upsert membutuhkan izin `INSERT` + `SELECT` + `UPDATE`.
- **Dilarang expose `service_role` key** di kode frontend mana pun.

### SKILL 2 — PostgreSQL Performance (Sumber: `supabase-postgres-best-practices`)
- Gunakan indeks GIN untuk pencarian teks judul dan topik bahasa Indonesia.
- Gunakan tipe `timestamptz` untuk waktu dan `text` untuk string di PostgreSQL.
- Hindari `SELECT *`; selalu pilih kolom yang dibutuhkan saja.
- Cegah lock tabel pada `pertanyaan` saat WebSocket Realtime aktif.

### SKILL 3 — Stop Slop: Teks UI Alami & Manusiawi (Sumber: `stop-slop`)
- Hilangkan frasa basa-basi AI ("Tentu!", "Dengan senang hati!").
- Tulis teks UI dan pesan galat secara aktif, langsung, dan spesifik.
- Contoh: Jangan tulis *"Terjadi kesalahan tak terduga"*, tuliskan *"Gagal memuat jadwal. Periksa koneksi internet Anda."*

### SKILL 4 — Playwright E2E Testing (Sumber: `playwright`)
- Tulis tes otomatis untuk skenario paling kritis:
  1. Audio persistence saat navigasi antar-halaman.
  2. Bebas galat Mixed Content HTTPS pada aliran Icecast.
  3. Form tanya jawab realtime WebSocket masuk <2 detik ke panel admin.
  4. Proteksi rute admin dan pemisahan peran Superadmin vs Admin.

### SKILL 5 — ECC Security & Quality Standards (Sumber: `ECC-main`)
- **Security-First:** Validasi dan sanitasi semua input pengguna sebelum disimpan.
- **Immutability:** Jangan memutasi state secara langsung pada React Context.
- **Never Commit Secrets:** Pastikan tidak ada token atau password di repositori Git.

### SKILL 6 — Impeccable Visual Quality (Sumber: `impeccable`)
- Hierarki visual tegas: 1 elemen dominan per halaman.
- Ruang napas (*whitespace*) cukup; tidak berdesakan.
- Responsif sejati: diuji pada 360px (mobile), 768px (tablet), dan 1280px (desktop) tanpa pergeseran horizontal.
- Kontras warna teks memenuhi standar WCAG 2.1 AA (rasio 4.5:1).

### SKILL 7 — Karpathy Guidelines: Anti-Overengineering & Surgical Changes (Sumber: `andrej-karpathy-skills`)
- **Think Before Coding:** Nyatakan asumsi secara gamblang. Jika ambigu, tanyakan ke pengguna.
- **Simplicity First:** Tulis kode minimal yang menyelesaikan masalah. Jangan buat abstraksi untuk kode sekali pakai.
- **Surgical Changes:** Sentuh HANYA apa yang harus diubah. Jangan merombak kode yang tidak rusak.
- **Goal-Driven Execution:** Ubah setiap instruksi menjadi kriteria sukses teruji (`Langkah -> Verifikasi -> Selesai`).

### SKILL 8 — Security Audit & Web Protocol Defense (Sumber: `security-audit-skill`)
- Lindungi sesi otentikasi Supabase Auth dari serangan fiksasi sesi dan token leakage.
- Sanitasi input form terhadap vektor serangan XSS berbasis payload SVG/HTML.
- Terapkan mekanisme proteksi form Honeypot tak kasat mata (`position: absolute; opacity: 0; pointer-events: none`).

### SKILL 9 — Modern Web Platform Standards & Audio APIs (Sumber: `modern-web-guidance`)
- Gunakan standar Web APIs modern (HTML5 Audio, CSS Grid/Flexbox modern, `AbortController` untuk fetch).
- Pastikan audio engine menangani siklus hidup peramban mobile (audiocall interruption, screen lock).
- Hindari polyfill usang yang membebani bundel JavaScript.

---

## 7. Protokol Wajib Git Commit Bertahap

Setiap kali menyelesaikan sebuah tahap atau komponen penting, AI **WAJIB** meminta persetujuan commit dengan format:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 PERMINTAAN COMMIT KE GITHUB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tahap/Subtugas yang selesai : [nama tahap atau subtugas]
File yang akan dicommit      : [daftar file baru/berubah]
Pesan commit yang diusulkan  : [pesan commit]

Apakah Anda menyetujui commit dan push ke GitHub sekarang?
Jawab: YA untuk melanjutkan | TIDAK untuk tunda commit
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 8. Alur Kerja Eksekusi (*Execution Workflow*)

1. Baca berkas [`ROADMAP-IMPLEMENTASI.md`](ROADMAP-IMPLEMENTASI.md).
2. Kerjakan tugas **hanya untuk 1 tahap yang sedang aktif**. Jangan melompat ke tahap berikutnya secara sepihak.
3. Setelah seluruh subtugas pada tahap tersebut selesai dan teruji, **BERHENTI dan berikan laporan ringkas kepada pengguna**.
4. Minta pengguna melakukan peninjauan pada **Titik Tinjauan (*Review Gate*)**.
5. Lanjutkan ke tahap berikutnya hanya setelah pengguna memberikan persetujuan (*approval*).
