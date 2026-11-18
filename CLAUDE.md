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

---

## 9. Skills yang Ditanamkan (*Embedded Skills from C:\Kumpulan Skills*)

Skills berikut dipilih dan ditanamkan langsung dari analisis folder `C:\Kumpulan Skills` oleh Antigravity. Claude **WAJIB** menerapkan seluruh instruksi skill ini selama pengerjaan proyek.

---

### SKILL 1 — Supabase Best Practices (Sumber: `supabase-plugin`)

> **Kapan Aktif:** Setiap kali mengerjakan tugas yang melibatkan Supabase: skema database, Auth, RLS, Realtime, Storage, dan query PostgreSQL.

**Prinsip Inti Supabase yang Wajib Diikuti:**

1. **Supabase berubah cepat — selalu cek changelog sebelum implementasi.** Jangan mengandalkan pengetahuan lama untuk fitur Supabase. Verifikasi selalu.
2. **Aktifkan RLS pada SETIAP tabel** di schema publik tanpa terkecuali. Ini kritis karena tabel di schema publik dapat diakses melalui Data API.
3. **Jangan gunakan `auth.role()` yang sudah deprecated.** Gunakan klausa `TO authenticated` atau `TO anon` langsung pada policy.
4. **`TO authenticated` saja bukan otorisasi — itu hanya autentikasi.** Selalu kombinasikan dengan predikat kepemilikan di `USING`:
   ```sql
   -- BENAR untuk proyek WBS:
   create policy "admin dapat membaca semua" on seri for select
   to authenticated
   using ( (select auth.uid()) in (select id from pengguna where peran in ('admin','superadmin')) );
   ```
5. **Policy UPDATE butuh BOTH `USING` dan `WITH CHECK`** agar tidak ada manipulasi `user_id`.
6. **Views melewati RLS secara default.** Gunakan `WITH (security_invoker = true)` di PostgreSQL 15+.
7. **Fungsi `SECURITY DEFINER` melewati RLS.** Hindari kecuali benar-benar diperlukan; lebih baik gunakan `SECURITY INVOKER`.
8. **Storage upsert butuh INSERT + SELECT + UPDATE.** Hanya INSERT saja akan gagal senyap saat upload ulang.
9. **Jangan pernah expose `service_role` key di frontend.** Hanya gunakan `anon` / `publishable` key di sisi klien React.
10. **Verifikasi setiap implementasi** dengan menjalankan kueri uji setelah perubahan. Implementasi tanpa verifikasi dianggap belum selesai.

**Panduan Khusus untuk Skema 9 Tabel Proyek WBS:**
- Baca `docs/07-model-data-dan-kamus-data.md` sebagai sumber kebenaran DDL dan kebijakan RLS.
- Tabel `pengguna`, `seri`, `episode`, `jadwal_tetap`, `acara_mendatang`, `sesi_onair`, `pertanyaan`, `halaman_statis`, `pengaturan_situs` — semua wajib memiliki RLS aktif.
- Kolom IP address **tidak boleh ada** di tabel mana pun (sesuai `FR-53`, privasi pemustaka).

---

### SKILL 2 — PostgreSQL Performance Best Practices (Sumber: `supabase-postgres-best-practices`)

> **Kapan Aktif:** Saat menulis atau mengubah skema, kueri SQL, indeks, trigger, dan kebijakan RLS.

**Aturan Prioritas Tinggi:**

| Prioritas | Kategori | Aturan Kunci untuk Proyek WBS |
|---|---|---|
| **KRITIS** | Query Performance | Gunakan indeks GIN untuk pencarian teks bahasa Indonesia (sudah didefinisikan di Dok 07). Hindari `SELECT *` — selalu pilih kolom spesifik. |
| **KRITIS** | Keamanan & RLS | Setiap perubahan skema harus melalui audit: jalankan `supabase db advisors` setelah ada perubahan DDL. |
| **TINGGI** | Desain Skema | Gunakan tipe data yang tepat (UUID untuk PK, `timestamptz` untuk semua kolom waktu, `text` bukan `varchar` untuk Postgres). |
| **SEDANG** | Concurrency | Hindari lock pada tabel `pertanyaan` saat Realtime WebSocket aktif; gunakan `INSERT` non-blocking. |

---

### SKILL 3 — Stop Slop: Hindari Pola Penulisan AI (Sumber: `stop-slop`)

> **Kapan Aktif:** Saat menulis teks antarmuka (label tombol, pesan galat, pesan kosong, teks notifikasi, komentar kode), dokumentasi kode, atau memperbarui berkas Markdown.

**7 Aturan Inti yang Wajib Dipatuhi:**

1. **Potong frasa pengisi.** Hindari pembuka seperti "Tentu saja!", "Sangat bagus!", "Baik, saya akan..." dalam komentar kode maupun teks UI.
2. **Gunakan kalimat aktif.** Setiap kalimat perlu subjek manusia yang melakukan sesuatu. Hindari konstruksi pasif.
3. **Spesifik, bukan samar.** Jangan tulis `"Terjadi kesalahan"` — tulis `"Gagal memuat jadwal siaran. Periksa koneksi internet Anda."`.
4. **Variasikan panjang kalimat.** Dua item lebih baik dari tiga. Hindari em-dash (`—`) dalam teks UI.
5. **Percayai pengguna.** Sampaikan fakta secara langsung tanpa pelunakan berlebihan atau penghilir yang tidak perlu.
6. **Potong kutipan bombastis.** Jika teks label tombol terdengar seperti slogan iklan, tulis ulang.
7. **Periksa sebelum menyerahkan:** Ada adverbia? Hapus. Ada suara pasif? Temukan aktornya. Ada kata "setiap/selalu/tidak pernah" yang samar? Ganti dengan spesifik.

**Contoh Penerapan di Proyek WBS:**
```
❌ BURUK: "Pertanyaan Anda berhasil dikirimkan dengan sukses kepada tim studio kami yang berdedikasi!"
✅ BAIK:  "Pertanyaan terkirim ke studio."

❌ BURUK: "Terjadi kesalahan saat memproses permintaan Anda."
✅ BAIK:  "Siaran tidak terhubung. Mencoba sambung ulang..."

❌ BURUK: "Silakan masukkan nama Anda di bawah ini untuk melanjutkan."
✅ BAIK:  "Nama"
```

---

### SKILL 4 — Playwright: Pengujian End-to-End (Sumber: `playwright`)

> **Kapan Aktif:** Pada Tahap 7 (Optimasi & Deployment) atau ketika Claude diminta menulis tes otomatis untuk skenario kritis.

**Skenario UAT yang Wajib Ditulis sebagai Tes Playwright (dari Dok 09):**

1. **Audio Persistence Test:** Putar radio → navigasi ke `/jadwal` → verifikasi audio masih memutar tanpa terputus.
2. **Mixed Content Test:** Verifikasi tidak ada peringatan Mixed Content di konsol saat memutar audio di domain HTTPS.
3. **QnA Realtime Test:** Kirim pertanyaan dari halaman publik → verifikasi muncul di panel admin dalam <2 detik.
4. **Admin Auth Guard Test:** Akses `/admin` tanpa login → verifikasi dialihkan ke `/admin/masuk`.
5. **Role Separation Test:** Login sebagai `admin` biasa → coba akses `/admin/pengaturan` → verifikasi akses ditolak.
6. **YouTube No Autoplay Test:** Buka halaman detail episode → verifikasi video tidak berputar otomatis.
7. **404 Custom Page Test:** Buka URL ngawur → verifikasi halaman 404 kustom muncul dengan audio tetap aktif.

**Perintah Dasar Playwright:**
```bash
npx playwright test                    # Jalankan semua tes
npx playwright test --headed           # Jalankan dengan tampilan browser
npx playwright test tests/audio.spec.ts  # Jalankan tes spesifik
npx playwright show-report             # Tampilkan laporan HTML
```

---

### SKILL 5 — ECC: Praktik Keamanan & Kualitas Kode (Sumber: `ECC-main`)

> **Kapan Aktif:** Sepanjang seluruh tahap pembangunan — terutama sebelum setiap commit Git.

**Prinsip Keamanan yang Wajib Diterapkan:**
1. **Security-First:** Validasi semua input sebelum dimasukkan ke database. Gunakan sanitasi teks untuk mencegah XSS pada konten yang dirender di panel admin.
2. **Immutability:** Selalu buat objek baru, jangan mutasi state yang ada (penting untuk AudioContext dan AuthContext).
3. **Plan Before Execute:** Untuk fitur kompleks (Realtime QnA, Audio Engine), buat rencana implementasi tertulis terlebih dahulu sebelum menulis kode.
4. **Test-Driven mindset:** Tulis kriteria penerimaan (berdasarkan Dok 09) sebelum mengimplementasikan fitur.
5. **Never commit secrets:** `.env`, API keys, dan token Supabase tidak boleh ada dalam kode yang di-commit ke Git.

**Checklist Keamanan Sebelum Setiap Commit:**
- [ ] Tidak ada `console.log` yang menampilkan data sensitif (token, password, surel pengguna)
- [ ] Tidak ada `service_role` key yang ter-embed di kode frontend
- [ ] Input formulir tanya jawab telah disanitasi dari XSS (`<script>`, `onerror=`, dll.)
- [ ] Kolom honeypot anti-spam hadir dan tersembunyi dengan benar (bukan `display:none`, tapi `position: absolute; opacity: 0`)
- [ ] Semua variabel environment menggunakan prefix `VITE_` untuk yang aman diekspos, dan tidak ada rahasia di variabel `VITE_`

---

### SKILL 6 — Impeccable: Kualitas Desain Visual (Sumber: `impeccable`)

> **Kapan Aktif:** Saat membangun atau merevisi komponen UI — terutama Hero Beranda, kartu program, bilah pemutar, dan panel admin.

**Prinsip Desain untuk Proyek WBS:**

1. **Hierarchy yang jelas.** Setiap halaman harus punya satu elemen dominan yang langsung terlihat (Hero = tombol Putar Radio besar; Panel Admin = status sesi tanya jawab).
2. **Konsistensi token warna.** HANYA gunakan token warna Perpusnas yang sudah didefinisikan di `tailwind.config.js`: biru utama `#0B3B60`, aksen emas `#D4A017`. Jangan improvisasi warna baru.
3. **Ruang napas (*whitespace*).** Berikan padding yang cukup antar elemen — tidak boleh terasa sesak atau penuh sesak.
4. **Responsif sejati.** Setiap komponen diuji di 3 breakpoint: mobile 360px, tablet 768px, desktop 1280px. Tidak boleh ada pergeseran horizontal (no horizontal scroll) di mobile.
5. **Tipografi yang terbaca.** Ukuran teks minimum 14px untuk konten; 16px untuk body teks. Kontras warna minimum WCAG 2.1 AA (rasio 4.5:1).
6. **Hindari ornamen berlebihan.** Sesuai `K-6` dan `NG-10`: tidak ada animasi carousel berputar sendiri, tidak ada parallax, tidak ada pop-up. Efek transisi: hanya `transition-colors` dan `transition-opacity` yang halus (150ms–200ms).

---

### SKILL 7 — Karpathy Guidelines: Anti-Overengineering & Surgical Changes (Sumber: `andrej-karpathy-skills`)

> **Kapan Aktif:** Sepanjang seluruh siklus pengembangan saat merancang, menulis, meninjau, atau merefaktor kode React, TypeScript, Tailwind, dan SQL.

**4 Pilar Karpathy yang Wajib Diterapkan:**

1. **Think Before Coding (Jangan Berasumsi & Jangan Sembunyikan Kebingungan):**
   - Nyatakan asumsi secara eksplisit sebelum menulis kode. Jika ada keraguan atau ambiguitas, **tanyakan kepada pengguna**.
   - Jika ada lebih dari satu opsi implementasi, paparkan opsinya ke pengguna — jangan memilih secara diam-diam.
   - Jika ada pendekatan yang lebih sederhana, katakan terus terang. Dorong solusi paling simpel.
   - Jika ada yang membingungkan dalam spesifikasi, **berhenti** dan tanyakan bagian mana yang membingungkan.

2. **Simplicity First (Anti-Overengineering & Kode Minimalis):**
   - Tulis kode **minimal** yang menyelesaikan masalah. Jangan buat kode spekulatif.
   - Dilarang menambahkan fitur di luar apa yang diminta pada tahap yang sedang aktif.
   - Dilarang membuat lapisan abstraksi (helper, wrapper, generic type) untuk kode yang hanya dipakai sekali.
   - Dilarang menambahkan "fleksibilitas" atau "konfigurabilitas" yang tidak diminta.
   - Dilarang membuat penanganan galat (*error handling*) untuk skenario mustahil.
   - Jika Anda menulis 200 baris kode padahal bisa diselesaikan dalam 50 baris, **tulis ulang menjadi 50 baris**.

3. **Surgical Changes (Perubahan Presisi Bedah):**
   - **Sentuh HANYA apa yang harus diubah.** Jangan "mempercantik" kode, komentar, atau format di file sekitar yang tidak terkait.
   - Jangan merefaktor kode yang tidak rusak (*don't refactor what isn't broken*).
   - Samakan gaya penulisan dengan kode yang sudah ada, meskipun Anda lebih suka gaya lain.
   - Jika melihat ada kode usang (*dead code*) yang tidak terkait, sebutkan kepada pengguna — jangan dihapus sendiri.
   - Bersihkan impor, variabel, atau fungsi yang menjadi yatim (*orphan*) akibat perubahan kode Anda sendiri.
   - **Uji Kepatuhan:** Setiap baris perubahan di *git diff* harus bisa dilacak langsung ke instruksi pengguna.

4. **Goal-Driven Execution (Berorientasi Target Terverifikasi):**
   - Ubah setiap tugas menjadi target yang terverifikasi sebelum mendeklarasikan selesai:
     - *"Tambah validasi"* $\rightarrow$ Uji input invalid, pastikan ditolak sesuai kriteria.
     - *"Perbaiki bug audio"* $\rightarrow$ Rekonstruksi bug, perbaiki, verifikasi audio normal di rute lain.
   - Untuk tugas multitahap, tetapkan alur verifikasi: `Langkah -> Verifikasi -> Selesai`.

---

### SKILL 8 — Security Audit & Web Protocol Defense (Sumber: `security-audit-skill`)

> **Kapan Aktif:** Saat membangun autentikasi admin, formulir publik tanya jawab, dan konfigurasi API eksternal.

1. **Perlindungan Batas Akses (BOLA/IDOR):** Pastikan kueri Supabase tidak dapat dimanipulasi untuk mengakses data antar-pengguna secara tidak sah.
2. **Sanitasi Vektor XSS:** Input teks pertanyaan dan nama pendengar harus disanitasi secara ketat sebelum dirender ke DOM panel admin penyiar.
3. **Form Defense:** Honeypot anti-spam wajib disembunyikan menggunakan CSS modern (`position: absolute; opacity: 0; pointer-events: none`).

---

### SKILL 9 — Modern Web Platform Standards & Audio APIs (Sumber: `modern-web-guidance`)

> **Kapan Aktif:** Saat mengimplementasikan pemutar audio, tata letak CSS, dan interaksi peramban.

1. **Modern Audio Lifecycle:** Tangani interupsi audio di peramban ponsel (seperti panggilan telepon masuk atau kunci layar) menggunakan event standar HTML5 Audio.
2. **Native Web Capabilities:** Gunakan kapabilitas native browser modern (CSS Grid, Flexbox, `AbortController`) alih-alih memasang pustaka atau polyfill eksternal yang membebani bundel.
3. **Efisiensi Daya:** Pastikan audio engine melepaskan resource saat tidak digunakan untuk menghemat daya baterai perangkat pemustaka.

---

## 10. Protokol Wajib Commit Git Setiap Tahap (*Mandatory Git Commit Protocol*)

> ⚠️ **ATURAN KRITIS — WAJIB DIPATUHI TANPA PENGECUALIAN**

Setiap kali sebuah tahap atau subtugas yang signifikan selesai dikerjakan, Claude **WAJIB** melakukan hal berikut **sebelum mengakhiri sesi atau berpindah ke subtugas berikutnya:**

### 10.1 Kapan Claude Harus Meminta Commit?

Claude **WAJIB mengajukan permintaan commit kepada pengguna** pada momen-momen berikut:

| Momen | Contoh Situasi |
|---|---|
| **Setelah setiap Titik Tinjauan (*Review Gate*)** | Setelah Tahap 1 selesai dan disetujui pengguna |
| **Setelah komponen besar selesai** | Setelah `AudioContext.tsx` atau `PersistentPlayer.tsx` selesai dibangun |
| **Setelah integrasi fitur kritis** | Setelah koneksi Supabase Realtime terhubung dan teruji |
| **Sebelum mengakhiri sesi kerja** | Di akhir setiap sesi koding, tanpa terkecuali |
| **Setelah perbaikan bug signifikan** | Setelah bug kritis Tingkat 1 atau 2 berhasil diperbaiki |

### 10.2 Cara Claude Meminta Persetujuan Commit

Ketika tiba waktunya commit, Claude **HARUS** menampilkan notifikasi dengan format berikut dan **menunggu jawaban pengguna sebelum mengeksekusi perintah Git apa pun**:

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

### 10.3 Perintah Git yang Akan Dieksekusi (Hanya Setelah Persetujuan)

Setelah pengguna menjawab **"YA"**, Claude mengeksekusi perintah berikut secara berurutan:

```bash
# Pindah ke direktori proyek
cd "C:\Project Radio WBS Perpusnas"

# Tambahkan seluruh perubahan ke staging
git add .

# Buat commit dengan pesan deskriptif
git commit -m "[jenis]: [deskripsi singkat perubahan dalam Bahasa Indonesia]"

# Kirim ke GitHub
git push
```

### 10.4 Konvensi Pesan Commit (*Conventional Commits*)

Gunakan format standar berikut agar riwayat commit di GitHub terbaca rapi dan profesional:

| Awalan (Prefix) | Kapan Digunakan | Contoh Pesan |
|---|---|---|
| `feat(tahap-N):` | Fitur/komponen baru selesai dibangun | `feat(tahap-1): inisialisasi vite react typescript dan konfigurasi tailwind perpusnas` |
| `feat:` | Fitur spesifik selesai | `feat: komponen persistent audio player dengan auto-reconnect 3x` |
| `fix:` | Perbaikan bug | `fix: audio tidak berhenti saat navigasi ke halaman jadwal` |
| `chore:` | Konfigurasi, setup, dependensi | `chore: tambah supabase sdk dan konfigurasi env variables` |
| `docs:` | Perubahan pada dokumentasi saja | `docs: perbarui roadmap centang tahap 1 selesai` |
| `style:` | Perubahan tampilan/CSS tanpa logika | `style: sesuaikan warna badge on-air dengan palet biru perpusnas` |
| `refactor:` | Perbaikan kode tanpa ubah fungsionalitas | `refactor: ekstrak logika kalkulasi waktu wib ke timeUtils.ts` |

### 10.5 Aturan Tambahan yang Tidak Boleh Dilanggar

- **DILARANG** mengeksekusi `git push` tanpa konfirmasi eksplisit dari pengguna terlebih dahulu.
- **DILARANG** melakukan `force push` (`git push --force`) dalam kondisi apa pun.
- **DILARANG** melakukan commit pada berkas yang terdaftar di `.gitignore` (terutama `.env`, `client_secret*.json`, `token*.json`).
- Jika pengguna menjawab **"TIDAK"** atau menunda commit, Claude tetap melanjutkan pekerjaan dan **mengajukan permintaan commit ulang** di akhir subtugas berikutnya atau saat sesi akan ditutup.
