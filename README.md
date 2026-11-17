# Radio & Siniar Widya Bahana Swara (WBS) Perpustakaan Nasional RI

> Repositori resmi perancangan dan pembangunan **Website Layanan Radio dan Siniar WBS Perpustakaan Nasional RI**. Dikelola di bawah naungan **Pusat Jasa Informasi Perpustakaan dan Pengelolaan Naskah Nusantara (PUJASINTARA)**, Perpustakaan Nasional Republik Indonesia.

---

## 📌 Sekilas Proyek

Website ini dibangun untuk memodernisasi layanan penyiaran literasi Perpustakaan Nasional RI melalui konvergensi dua entitas:
1. **Siaran Radio 24 Jam Non-Stop (06.00–05.59 WIB):** Pemutar audio persisten lintas halaman yang terhubung ke aliran Icecast studio (HTTPS) dengan manajemen otomasi penyiaran *Jazler RadioStar 2* di studio.
2. **Katalog Video & Siniar Mandiri (331 Video Unik):** Etalase 21 seri program resmi (seperti *LibTalk*, *Diskusi Naskah Nusantara*, *Ruang Literasi*) dan video lepasan yang di-*embed* langsung dari YouTube resmi WBS dengan teknik optimasi *Lite YouTube Facade*.
3. **Interaktivitas Tanya Jawab On-Air Seketika:** Formulir interaksi pendengar dengan pengiriman instan ke studio via *Supabase Realtime (CDC WebSockets)*, perlindungan *honeypot* anti-spam, dan opsi pengirim anonim.

---

## 🛠️ Tumpukan Teknologi (*Tech Stack*)

Arsitektur Jamstack modern dengan biaya operasional hosting **Rp 0 (Gratis Selamanya)**:

- **Frontend:** React 18 + Vite + TypeScript (Strict Mode)
- **Styling:** Tailwind CSS (Palet Resmi Perpusnas: Biru `#0B3B60` & Emas `#D4A017`)
- **Ikon:** Lucide React
- **Perutean:** React Router DOM v6 (dengan skrip SPA 404 Fallback)
- **Backend-as-a-Service:** Supabase Free Tier (PostgreSQL 15+, Auth JWT, Storage CDN, Realtime CDC)
- **Hosting & CI/CD:** GitHub Pages + GitHub Actions
- **Penyedia Audio:** Icecast 2 Studio (Port 8443 / SSL Reverse Proxy)
- **Penyedia Video:** YouTube IFrame Embed (Tanpa Autoplay)
- **Analitik:** Google Analytics 4 (GA4 dengan IP Anonymization)

---

## 📚 Indeks Dokumentasi Resmi (`/docs`)

Seluruh tahapan proyek didokumentasikan secara lengkap pada folder [`/docs`](docs/):

| No | Dokumen | Keterangan |
|:---:|---|---|
| **01** | [`01-prd.md`](docs/01-prd.md) | **Product Requirements Document (PRD)** — v2.2 Final Disepakati |
| **02** | [`02-peta-konten-dan-taksonomi.md`](docs/02-peta-konten-dan-taksonomi.md) | **Peta Konten & Taksonomi** (21 Seri + Keranjang Lainnya = 331 Video Unik) |
| **03** | [`03-rancangan-data-dan-panel.md`](docs/03-rancangan-data-dan-panel.md) | **Rancangan Data & Panel Admin** (Struktur 2 Peran: Superadmin & Admin) |
| **04** | [`04-rancangan-halaman-pengunjung.md`](docs/04-rancangan-halaman-pengunjung.md) | **Rancangan Halaman Pengunjung** (Adaptasi Kesederhanaan Pola UT Radio) |
| **05** | [`05-kebutuhan-fungsional-dan-prioritas.md`](docs/05-kebutuhan-fungsional-dan-prioritas.md) | **Kebutuhan Fungsional (53 FR)** & Prioritas MoSCoW |
| **06** | [`06-arsitektur-dan-kebutuhan-teknis.md`](docs/06-arsitektur-dan-kebutuhan-teknis.md) | **Arsitektur Jamstack**, Penanganan Icecast HTTPS & CI/CD |
| **07** | [`07-model-data-dan-kamus-data.md`](docs/07-model-data-dan-kamus-data.md) | **Model Data Relasional (ERD)**, DDL 9 Tabel PostgreSQL & SQL RLS |
| **08** | [`08-rencana-migrasi-dan-operasional.md`](docs/08-rencana-migrasi-dan-operasional.md) | **Pipeline Migrasi Data** & 7 Standar Operasional Prosedur (SOP) Pustakawan |
| **09** | [`09-rencana-pengujian-dan-evaluasi.md`](docs/09-rencana-pengujian-dan-evaluasi.md) | **Rencana Pengujian (QA)**, 10 Skenario UAT Mandiri & Berita Acara |
| **10** | [`10-glosarium-dan-log-keputusan.md`](docs/10-glosarium-dan-log-keputusan.md) | **Glosarium Istilah**, Log 34 Keputusan Arsitektur & Panduan Handover |

---

## 🤖 Panduan Pengembang & Agen AI

- **Instruksi Eksekusi Claude / Pengembang:** Baca [`CLAUDE.md`](CLAUDE.md) untuk memahami 10 aturan emas dan batasan mutlak proyek.
- **Papan Kendali & Review Gates:** Pantau progres 7 tahap pembangunan pada [`ROADMAP-IMPLEMENTASI.md`](ROADMAP-IMPLEMENTASI.md).

---

## 💻 Panduan Menjalankan Proyek Lokal

```bash
# 1. Klon repositori
git clone https://github.com/USERNAME/radio-wbs-perpusnas.git
cd radio-wbs-perpusnas

# 2. Pasang dependensi
npm install

# 3. Siapkan variabel lingkungan
cp .env.example .env

# 4. Jalankan server lokal
npm run dev
```

---

## 👤 Tim Proyek

- **Penyusun & Pengembang:** Gusti Ahmad Muttahid Bilhaq (Mahasiswa Magang Teknik Informatika)
- **Instansi:** Pusat Jasa Informasi Perpustakaan dan Pengelolaan Naskah Nusantara (PUJASINTARA)
- **Lembaga:** Perpustakaan Nasional Republik Indonesia
