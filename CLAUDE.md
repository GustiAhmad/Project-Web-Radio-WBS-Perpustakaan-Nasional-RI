# CLAUDE.md

## Website Layanan Radio dan Siniar WBS Perpustakaan Nasional RI

Berkas ini sengaja dipangkas. **Sumber tunggal instruksi operasional, aturan emas, dan alur kerja ada di [`AGENTS.md`](AGENTS.md).** Baca berkas itu terlebih dahulu sebelum mengerjakan apa pun di repositori ini.

### Ringkasan cepat

- **Layanan:** Radio & Siniar Widya Bahana Swara (WBS) Perpustakaan Nasional RI, di bawah PUJASINTARA.
- **Tumpukan:** React 18 + Vite + TypeScript, Tailwind CSS, Supabase Free Tier, GitHub Pages.
- **Guardrails utama:** tidak ada kontrol playout studio; video di-embed dari YouTube (tanpa file MP4); audio dari Icecast HTTPS; pemutar audio persisten lintas halaman; hanya dua peran (`superadmin`, `admin`); katalog tepat 331 video unik; tidak ada dark mode atau carousel otomatis.
- **Alur kerja:** baca [`docs/roadmap-implementasi.md`](docs/roadmap-implementasi.md), kerjakan satu tahap aktif saja, lalu berhenti di Review Gate untuk tinjauan pengguna sebelum commit.

### Perintah yang sering dipakai

```bash
npm install         # pasang dependensi
npm run dev         # server pengembangan di http://localhost:5173
npm run type-check  # periksa tipe TypeScript
npm run build       # kompilasi produksi ke folder dist/
npm run preview     # pratinjau hasil build
```

### Dokumen terkait

- Panduan setup Supabase: [`docs/panduan-setup-supabase.md`](docs/panduan-setup-supabase.md)
- Panduan deploy: [`docs/panduan-deploy.md`](docs/panduan-deploy.md)
- Indeks dokumen perencanaan 01–12: lihat [`README.md`](README.md)
