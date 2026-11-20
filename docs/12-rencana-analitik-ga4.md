# Rencana Analitik Google Analytics 4

Dokumen ini menjawab permintaan: **analitik apa saja yang bisa dijadikan statistik di website Radio & Siniar WBS Perpusnas**. Event dipasang pada Tahap 10 dan disesuaikan dengan Chat live pada Tahap 11; dokumen ini merangkum rencana, implementasi, dan cara mengujinya.

> **Keputusan Review Gate 10 (dipertahankan pada Tahap 11):** GA4 baru diaktifkan setelah website live untuk publik. Kode sudah siap, tetapi tidak mengirim event apa pun sebelum ID Pengukuran diisi di `/admin/pengaturan` atau `VITE_GA_MEASUREMENT_ID`. Panduan DebugView pada bab 8 dipakai saat go-live, bukan pada uji Tahap 10 maupun Tahap 11.

## 1. Kondisi saat ini

`src/services/ga4.ts` sudah memuat `gtag.js` dengan `anonymize_ip: true` dan `send_page_view: false`. ID GA4 bisa diisi lewat `VITE_GA_MEASUREMENT_ID` atau panel Superadmin di `/admin/pengaturan`.

Event yang **sudah dipasang** (belum terkirim sampai ID Pengukuran diisi):

| Event | Sumber |
|---|---|
| `page_view` | `App.tsx`, dengan parameter `page_path` |
| `radio_play` | `AudioContext.tsx` |
| `chat_dibuka` | `ChatModal.tsx`, dengan parameter `nama_sesi` |
| `chat_pesan_kirim` | `ChatModal.tsx` |
| `chat_sesi_dibuka`, `chat_sesi_ditutup` | `useSesiChatAktif.ts` — dipicu saat tombol chat muncul atau hilang di pemutar |

Setelah Tahap 11, GA4 juga menjawab menu mana yang paling sering diklik, episode dan seri mana yang paling diminati, apakah audio persisten benar-benar dipakai, dan seberapa ramai chat live saat sesi dibuka.

## 2. Prinsip privasi

- `anonymize_ip: true` tetap aktif untuk semua konfigurasi.
- Tidak mengirim nama, alamat surel, isi pesan chat, kata sandi, atau token ke GA4. `nama_sesi` dikirim hanya sebagai label sesi, bukan data pendengar.
- Tidak memakai `user_id`, Google Signals, atau pengenal lintas perangkat.
- Seluruh rute `/admin/*` **tidak** dilacak.
- Kata kunci pencarian dinormalisasi (huruf kecil) dan dipotong 40 karakter. Bila isi berpotensi menjadi data pribadi, yang dikirim cukup jumlah hasilnya.
- Retensi data disarankan **2 bulan** di pengaturan GA4.

## 3. Event yang tersedia

Tabel ini adalah daftar statistik yang tersedia setelah Tahap 12.

| Nama event | Dipicu saat | Parameter | Pertanyaan yang dijawab |
|---|---|---|---|
| `page_view` | Rute publik berubah *(sudah ada)* | `page_path` | Halaman mana yang paling banyak dibuka |
| `menu_click` | Pengunjung mengklik salah satu dari keenam menu: Beranda, Jadwal, Program, Berita, Tentang, atau Kontak | `menu_label`, `menu_tujuan`, `posisi` (`header`/`footer`) | **Menu mana yang paling sering diklik publik** |
| `masuk_click` | Tombol **Masuk** di header diklik | `posisi` | Seberapa sering pengelola mengakses panel dari situs publik |
| `radio_play` | Tombol putar siaran ditekan *(sudah ada)* | `sumber` | Berapa kali siaran dimulai |
| `radio_pause` | Tombol jeda ditekan | — | Berapa kali siaran dijeda |
| `radio_error` | Aliran Icecast gagal dimuat | `alasan` | Seberapa sering audio gagal dan penyebabnya |
| `radio_persisten` | Pengunjung pindah halaman saat audio masih menyala | `halaman_tujuan` | Apakah fitur audio persisten benar-benar dipakai |
| `video_facade_click` | Poster video diklik, sebelum iframe YouTube muncul | `episode_slug`, `video_id` | Video mana yang paling menarik perhatian |
| `episode_view` | Halaman detail episode dibuka | `episode_slug`, `seri_slug`, `nomor_episode` | Episode mana yang paling ditonton |
| `series_view` | Halaman detail seri dibuka | `seri_slug`, `kategori` | Seri dan kategori mana yang paling diminati |
| `acara_view` | Detail acara mendatang dibuka | `acara_id`, `kanal` | Minat terhadap acara dan kanalnya |
| `cari` | Form pencarian dikirim | `jumlah_hasil`, opsional `kata_kunci` | Istilah apa yang dicari pemustaka, dan berapa yang gagal |
| `video_halaman` | Tombol Sebelumnya/Berikutnya di Video Terbaru ditekan | `halaman`, `arah` | Seberapa jauh pengunjung menjelajah katalog 331 video |
| `artikel_filter` | Tab kategori di halaman Berita & Artikel dipilih | `kategori` | Kategori berita, artikel, atau pengumuman mana yang paling diminati |
| `artikel_halaman` | Tombol Sebelumnya/Berikutnya di Berita & Artikel ditekan | `halaman`, `kategori` | Seberapa jauh pengunjung menjelajah daftar tulisan |
| `artikel_view` | Halaman detail artikel/berita dibuka | `artikel_slug`, `kategori` | Tulisan mana yang paling banyak dibaca |
| `chat_sesi_dibuka` | Tombol chat muncul di pemutar karena petugas membuka sesi | — | Berapa sesi chat live yang diadakan |
| `chat_sesi_ditutup` | Tombol chat hilang setelah sesi ditutup | — | Berapa sesi yang berakhir |
| `chat_dibuka` | Pemustaka membuka modal chat | `nama_sesi` | Seberapa sering modal chat dibuka |
| `chat_pesan_kirim` | Pesan chat berhasil dikirim | — | Tingkat partisipasi pemustaka |

Event administratif seperti perubahan jadwal, unggah episode, atau pengelolaan akun **tidak** dikirim ke GA4. Itu urusan log internal, bukan statistik publik.

## 4. Dimensi kustom yang perlu didaftarkan

Di GA4: **Admin → Custom definitions → Create custom dimension**.

| Nama dimensi | Event scope | Diambil dari |
|---|---|---|
| `Menu` | Event | `menu_label` |
| `Posisi Menu` | Event | `posisi` |
| `Seri` | Event | `seri_slug` |
| `Kategori Seri` | Event | `kategori` |
| `Halaman Tujuan` | Event | `halaman_tujuan` |
| `Nama Sesi Chat` | Event | `nama_sesi` |
| `Artikel` | Event | `artikel_slug` |

Parameter `kategori` pada event artikel memakai dimensi `Kategori Seri` yang sudah terdaftar; nama dimensinya tetap dipakai untuk laporan katalog, jadi beri filter event `artikel_*` saat memisahkan kategori artikel. Tanpa pendaftaran dimensi, parameter tetap masuk ke payload tetapi tidak bisa dipakai sebagai grup pada laporan.

## 5. Laporan dan statistik yang bisa dibuat

### 5.1 Menu paling sering diklik

- **Event:** `menu_click`
- **Dimensi:** `Menu`, `Posisi Menu`
- **Metrik:** Event count
- **Hasil:** Peringkat 6 menu utama. Menjawab langsung permintaan Anda. Bisa dibandingkan antara header desktop dan footer.

### 5.2 Katalog paling diminati

- **Event:** `episode_view`, `series_view`, `video_facade_click`
- **Dimensi:** `Episode`, `Seri`, `Kategori Seri`
- **Metrik:** Event count, pengguna aktif
- **Hasil:** Episode Terpopuler, Seri Terpopuler, dan perbandingan kategori topik. Berguna untuk menentukan episode mana yang perlu dipromosikan atau dilengkapi metadata.

### 5.3 Siaran radio

- **Event:** `radio_play`, `radio_pause`, `radio_error`, `radio_persisten`
- **Dimensi:** Jam, hari, `alasan`
- **Metrik:** Event count, *average engagement time*
- **Hasil:** Jam dengar puncak, rasio jeda terhadap putar, jumlah kegagalan stream, dan bukti pemakaian fitur audio persisten.

### 5.4 Sebaran pendengar

- **Sumber:** Demografi bawaan GA4, bukan event buatan
- **Dimensi:** Negara, provinsi/region, kota
- **Hasil:** Peta sebaran pemustaka. Sudah dimungkinkan oleh konfigurasi `anonymize_ip` yang ada sekarang.

### 5.5 Pencarian pemustaka

- **Event:** `cari`
- **Dimensi:** `kata_kunci` (biladiizinkan), `jumlah_hasil`
- **Hasil:** Istilah yang paling sering dicari dan jumlah pencarian tanpa hasil. Menjadi masukan untuk perbaikan taksonomi dan judul seri.

### 5.6 Partisipasi chat live

- **Event:** `chat_sesi_dibuka`, `chat_sesi_ditutup`, `chat_dibuka`, `chat_pesan_kirim`
- **Dimensi:** `Nama Sesi Chat`
- **Metrik:** Rasio pesan per sesi
- **Hasil:** Sesi mana yang paling ramai, berapa pemustaka yang membuka modal, dan apakah pembukaan sesi diikuti pesan.

### 5.7 Kualitas pengalaman

- **Event:** `radio_error`, `video_halaman`, `page_view`
- **Hasil:** Halaman dengan tinggal keluar tertinggi, seberapa dalam pengunjung menjelajah katalog, dan gangguan audio yang muncul.

### 5.8 Artikel & berita paling dibaca

- **Event:** `artikel_filter`, `artikel_halaman`, `artikel_view`
- **Dimensi:** `Artikel`, `Kategori Seri` (dari parameter `kategori` pada event artikel)
- **Metrik:** Event count, pengguna aktif
- **Hasil:** Tulisan dan kategori yang paling banyak dibaca, sekaligus minat terhadap kategori pengumuman.

## 6. Status penerapan

| Langkah | Isi | Status |
|---|---|---|
| 1 | Dokumen ini disetujui | Selesai |
| 2 | Perluas `ga4.ts` dengan pembantu `lacakKlikMenu` dan pengaman rute admin | Selesai di Tahap 10 |
| 3 | Pasang atribut pelacakan pada Header, Footer, dan tombol Masuk | Selesai di Tahap 10 |
| 4 | Pasang event katalog pada `EpisodeCard`, `SeriesDetailPage`, `AcaraDetailPage`, `VideoTerbaruPage` | Selesai di Tahap 10 |
| 5 | Pasang event pada `PersistentPlayer`, `YouTubeFacade`, dan `QnAForm` | Selesai di Tahap 10; `QnAForm` digantikan `ChatModal` dan `useSesiChatAktif` di Tahap 11 |
| 6 | Daftarkan dimensi kustom di GA4, lalu susun laporan 5.1–5.8 | Menunggu ID GA4 aktif; dilakukan di antarmuka GA4 |
| 7 | Pasang event artikel pada `BeritaPage` dan `ArtikelDetailPage` | Selesai di Tahap 12 |

Langkah 2–5 sudah menyertakan kode Tahap 10 dan penyesuaian chat Tahap 11; langkah 7 menambah event artikel Tahap 12. Langkah 6 baru bisa dilakukan setelah ID pengukuran terisi.

## 7. Kriteria selesai

1. Klik keenam menu utama muncul di GA4 DebugView dengan `menu_label` yang benar *(dinilai saat go-live)*.
2. Tidak ada event sama sekali ketika membuka halaman atau aksi di `/admin/*` *(dinilai saat go-live)*.
3. Tidak ada payload yang memuat nama, surel, isi pesan chat, atau token.
4. `anonymize_ip: true` terbukti aktif pada konfigurasi GA4.
5. Laporan "Menu Terpopuler" bisa dibuat dengan dimensi `Menu` dan metrik Event count.
6. `npm run type-check` dan `npm run build` lolos.

## 8. Cara melihat GA4 DebugView (dilaksanakan saat go-live)

DebugView hanya menampilkan event dari perangkat yang mengirim mode debug. Setelah situs live, tambahkan `?ga4_debug=1` pada alamat halaman publik. Panduan ini tidak menjadi bagian uji Tahap 10, Tahap 11, maupun Tahap 12.

1. Saat go-live, pastikan ID GA4 terisi. Buka `/admin/pengaturan` sebagai Superadmin, isi **ID Pengukuran** dengan format `G-XXXXXXXXXX`, aktifkan analitik, lalu simpan. Cara lain: isi `VITE_GA_MEASUREMENT_ID` pada berkas `.env` sebelum build.
2. Buka alamat situs publik yang sudah live di Chrome. Klik menu **Beranda**, **Jadwal**, **Program**, **Berita**, **Tentang**, dan **Kontak** secara bergantian. Klik juga tombol putar radio, lalu buka modal chat bila sesi sedang aktif.
3. Buka tab baru, kunjungi https://analytics.google.com/, lalu pilih properti GA4 yang ID-nya dipakai di langkah 1.
4. Di panel kiri pilih **Admin** (ikon roda gigi), lalu **DebugView**. Pilih stream web yang sesuai bila diminta.
5. Kembali ke tab website, klik menu **Program**. Event `menu_click` dengan `menu_label: "Program"` harus muncul di DebugView, biasanya dalam hitungan detik. Klik event untuk melihat parameternya.
6. Buka alamat situs publik `/admin/episode`, klik beberapa tombol di panel. DebugView **tidak boleh** menampilkan event baru dari rute admin.

Jika DebugView tetap kosong:

- Periksa ID di pengaturan sama persis dengan properti yang dibuka di GA4.
- Tunggu sekitar satu menit, lalu segarkan halaman publik dan klik menu lagi.
- Buka DevTools (F12) → Console. Jika ada galat memuat `googletagmanager.com`, periksa koneksi internet atau pemblokir iklan.
- Sebagai cadangan, pasang ekstensi **Google Analytics Debugger** di Chrome Web Store, aktifkan ikonnya, lalu ulangi langkah 2.

## 9. Cara menguji tampilan responsif

1. Buka `http://localhost:5173/` di Chrome, lalu tekan **F12** untuk membuka DevTools.
2. Tekan **Ctrl+Shift+M** (Windows) untuk membuka bilah perangkat. Pilih **Responsive** pada menu perangkat.
3. Ketik **360** pada kolom lebar dan **800** pada kolom tinggi, lalu tekan Enter. Periksa: menu utama masih terbaca, kartu tidak saling menimpa, bilah pemutar radio tidak menutupi tombol penting, dan tidak ada gulir horizontal.
4. Ubah lebar menjadi **1280** dan tinggi **800**. Periksa: konten terpusat dengan rapi, kartu beranda tersusun dalam beberapa kolom, dan tidak ada ruang kosong berlebih.
5. Ulangi langkah 3 dan 4 pada `/jadwal`, `/program`, `/tentang`, dan `/admin/episode`.
6. Klik tombol putar radio di 360 px, lalu pindah ke halaman lain. Audio harus tetap menyala tanpa memuat ulang.

## 10. Catatan

GA4 baru menampilkan data setelah pengukuran berjalan dan ID GA4 diisi. Bila `VITE_GA_MEASUREMENT_ID` kosong dan panel admin belum mengisi ID, seluruh helper `lacakEvent` diam tanpa galat. Statistik tidak bisa diisi mundur untuk periode sebelum pelacakan dipasang.
