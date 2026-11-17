# Rancangan Halaman Pengunjung
## Website Radio & Siniar WBS Perpusnas

| Keterangan | Isi |
|---|---|
| **Nomor Dokumen** | 04 |
| **Nama Dokumen** | Rancangan Halaman Pengunjung |
| **Nama Situs** | Radio & Siniar WBS Perpusnas |
| **Versi** | 1.1 — Final |
| **Tanggal** | 17 November 2026 |
| **Status** | Final — menjadi acuan pembangunan halaman pengunjung dan uji terima; diselaraskan dengan hasil audit dan arsitektur GitHub Pages |
| **Penyusun** | Gusti Ahmad Muttahid Bilhaq |
| **Pembaca Utama** | Pustakawan pengelola Layanan Radio dan Siniar WBS |
| **Acuan** | Dokumen `01` versi 2.2, dokumen `02` versi 1.1, dan dokumen `03` versi 1.2 |
| **Sifat Dokumen** | Final; perubahan tata letak, alur, atau teks antarmuka dicatat pada riwayat revisi |

---

## 0. Cara Membaca Dokumen Ini

Dokumen ini menjelaskan **apa yang dilihat dan dialami pengunjung** di website Radio & Siniar WBS Perpusnas. Isinya adalah susunan halaman, perilaku komponen, teks yang muncul, serta keadaan kosong dan galat. Dokumen ini tidak membahas cara mengisi panel; urusan itu ada pada dokumen `03`.

Tiga hal yang perlu dipahami lebih dahulu:

1. **Wireframe di dokumen ini adalah sketsa teks, bukan gambar final.** Kotak dan garis menunjukkan urutan serta kelompok isi, bukan ukuran pasti. Bentuk visual final mengikuti persetujuan identitas Perpusnas (`D-2`).
2. **Angka yang dipakai adalah angka tampil.** Website menampilkan **331 video unik** dalam **21 seri resmi** dan keranjang **“Lainnya” berisi 82 video**. Angka 337 baris adalah catatan migrasi dan tidak pernah ditampilkan sebagai jumlah episode.
3. **Semua jam adalah WIB.** Tidak ada konversi zona waktu di halaman pengunjung. Hari siaran berjalan dari pukul **06.00 sampai 05.59** keesokan hari, sehingga pukul 00.00–05.59 masih termasuk siklus hari sebelumnya.

| Bagian | Isi Singkat |
|---|---|
| 1 | Ringkasan halaman dan prinsip pengalaman pengunjung |
| 2 | Dasar, pengunjung, perjalanan, dan batas yang dipegang |
| 3 | Sistem desain dan layout global |
| 4 | Blueprint Beranda |
| 5 | Halaman Jadwal Siaran |
| 6 | Halaman Program & Siniar |
| 7 | Halaman Detail Seri |
| 8 | Halaman Detail Episode |
| 9 | Halaman Hasil Pencarian |
| 10 | Halaman Tentang WBS |
| 11 | Halaman Kontak |
| 12 | Halaman Kebijakan Privasi |
| 13 | Halaman 404 serta keadaan kosong, memuat, dan galat |
| 14 | Komponen Tanya Jawab dan Acara Mendatang |
| 15 | Aksesibilitas |
| 16 | Performa |
| 17 | SEO dan berbagi |
| 18 | GA4 dan pengukuran |
| 19 | Rencana uji terima halaman pengunjung |
| 20 | Penutup |

---

## 1. Ringkasan dan Prinsip Pengalaman Pengunjung

### 1.1 Apa yang diatur dokumen ini

Website memiliki **sepuluh halaman** dan **dua komponen lintas halaman**. Tidak ada halaman tambahan di luar daftar ini; fitur yang belum disepakati tidak boleh muncul sebagai halaman tersembunyi.

| No | Halaman atau Komponen | Alamat | Peran |
|---|---|---|---|
| 1 | **Beranda** | `/` | Menunjukkan siaran yang sedang berlangsung, memberi jalan masuk ke katalog, dan menampilkan acara terdekat |
| 2 | **Jadwal Siaran** | `/jadwal` | Menyajikan jadwal 24 jam untuk Hari Kerja, Sabtu, dan Minggu |
| 3 | **Program & Siniar** | `/program` | Menampilkan 21 seri dan pintu masuk “Lainnya” dengan saringan kategori |
| 4 | **Detail Seri** | `/program/{nama-seri}` | Menjelaskan satu seri dan mendaftar seluruh episodenya |
| 5 | **Detail Episode** | `/program/{nama-seri}/{judul-episode}` | Menampilkan pemutar YouTube, metadata, dan tautan asli |
| 6 | **Hasil Pencarian** | `/cari?q=...` | Mencari seri dan episode berdasarkan kata kunci |
| 7 | **Tentang WBS** | `/tentang` | Menjelaskan profil, visi, sejarah singkat, dan tim layanan |
| 8 | **Kontak** | `/kontak` | Menyediakan alamat, surel, telepon, jam layanan, dan kanal resmi |
| 9 | **Kebijakan Privasi** | `/kebijakan-privasi` | Menjelaskan data pertanyaan, arsip, dan analitik kunjungan |
| 10 | **Halaman Tidak Ditemukan** | `/404` | Menjaga pengunjung tetap bisa memutar radio saat tautan salah |
| — | **Komponen Tanya Jawab** | Muncul di beranda dan Jadwal | Formulir pertanyaan saat sesi On-Air dibuka |
| — | **Komponen Acara Mendatang** | Blok di beranda | Maksimal tiga acara terdekat, bukan kalender penuh |

Halaman **Radio** terpisah tidak ada. Fungsi radio menyatu di beranda dan di **pemutar persisten** yang melekat di semua halaman.

### 1.2 Dua belas prinsip pengalaman pengunjung

| No | Prinsip | Arti dalam tampilan |
|---|---|---|
| 1 | **Siaran lebih dulu** | Blok paling atas beranda selalu menjawab “apa yang sedang mengudara sekarang” dan menyediakan tombol putar |
| 2 | **Audio tidak boleh terputus** | Berpindah halaman, membuka detail episode, atau mencari tidak menghentikan siaran radio |
| 3 | **Satu tujuan utama per layar** | Setiap halaman punya satu pesan pokok; tidak ada banner promosi yang menutupinya |
| 4 | **Navigasi dangkal** | Lima menu utama; semua halaman publik tercapai maksimal dua klik dari beranda |
| 5 | **Jujur pada data** | Status siaran dihitung dari jam dan jadwal, bukan diklaim dari studio; jumlah episode mengikuti video unik |
| 6 | **Tanpa gangguan** | Tidak ada carousel otomatis, pop-up, parallax, atau audio yang berbunyi sendiri |
| 7 | **Ponsel lebih dulu** | Tombol penting berada dalam jangkauan ibu jari; pemutar tidak menutupi isi |
| 8 | **Selalu ada jalan kembali** | Setiap halaman detail memuat remah navigasi dan tautan kembali ke seri |
| 9 | **WIB di semua tempat** | Jam jadwal, acara, dan durasi selalu berlabel WIB atau ditulis sebagai durasi |
| 10 | **Aksesibel sejak awal** | Kontras, fokus papan tunas, teks alternatif, dan label formulir bukan tambahan di akhir |
| 11 | **Ringan di jaringan kantor** | Halaman inti tampil dalam waktu wajar; pemutar YouTube baru dimuat setelah ditekan |
| 12 | **Tidak ada jebakan** | Tidak ada pendaftaran, login pengunjung, penghitung mundur palsu, atau permintaan data yang tidak perlu |

### 1.3 Yang bukan bagian dokumen ini

- **Panel pengelola** dan seluruh isian admin — dibahas pada dokumen `03`.
- **Playout studio** dan pemutaran lagu — wewenang penyiar melalui Jazler RadioStar 2 (`K-5`).
- **Naskah final** visi, misi, sejarah, dan profil tim — disiapkan pustakawan melalui halaman statis.
- **Logo, warna institusi, dan tipografi final** — menunggu persetujuan identitas visual (`D-2`).
- **Domain, akun hosting, dan alamat Icecast** — menunggu `D-3`, `D-4`, `D-8`, dan `D-10`.
- **Transkrip episode, terjemahan Inggris, mode gelap, komentar, suka, dan login pengunjung** — tidak dibangun pada tahap ini (`M-12`, `M-13`, `NG-6`, `NG-8`).
- **Kalender acara penuh** — acara hanya berupa daftar ringkas (`M-10`).

### 1.4 Istilah halaman dan komponen

| Istilah | Arti |
|---|---|
| **Halaman** | Alamat tersendiri yang dapat dibuka, dibagikan, dan diindeks mesin pencari |
| **Komponen** | Bagian yang muncul di dalam halaman, misalnya formulir Tanya Jawab atau kartu Acara Mendatang |
| **Blok** | Satu kelompok isi di dalam halaman, misalnya “Episode Terbaru” |
| **Keadaan kosong** | Tampilan saat data belum ada atau saringan tidak menghasilkan apa pun |
| **Keadaan galat** | Tampilan saat data gagal dimuat atau sumber luar tidak tersedia |
| **Pemutar persisten** | Pemutar radio di bagian bawah layar yang tetap ada saat pengunjung berpindah halaman |

---

## 2. Dasar, Pengunjung, dan Perjalanan

### 2.1 Kebutuhan yang menjadi dasar halaman

| Kebutuhan | Yang diwujudkan di halaman pengunjung |
|---|---|
| `PR-01`, `PR-44` | Pemutar radio melekat di semua halaman dan tidak terputus saat berpindah |
| `PR-02`, `PR-06` | Penanda “Sedang Mengudara” dan hero beranda yang dihitung dari jadwal |
| `PR-03`, `PR-04` | Halaman Jadwal 24 jam, tab hari, penanda “Sekarang”, dan program berikutnya |
| `PR-05` | Formulir pertanyaan yang hanya muncul saat sesi dibuka dan program berlangsung |
| `PR-07`, `PR-09`, `PR-45` | Halaman Program & Siniar, detail seri, dan enam seri unggulan di beranda |
| `PR-08` | Halaman detail episode dengan pemutar YouTube dan metadata |
| `PR-10` | Pencarian judul episode, nama seri, narasumber, dan topik |
| `PR-12` | Beranda yang menyatukan status siaran, pemutar, jadwal, dan katalog pilihan |
| `PR-13`, `PR-14`, `PR-15` | Halaman Tentang WBS, Kontak, dan Kebijakan Privasi |
| `PR-16` | Tombol berbagi WhatsApp dan salin tautan |
| `PR-32`, `PR-34`, `PR-38` | Tampilan responsif, aksesibilitas dasar, dan dukungan peramban umum |
| `PR-33`, `PR-39` | Waktu muat wajar dan pemutar radio yang tabah saat koneksi buruk |
| `PR-48` | Semua halaman publik tercapai maksimal dua klik dari beranda |
| `PR-49` | GA4 untuk statistik kunjungan dan sebaran wilayah dengan IP teranonimasi |

### 2.2 Empat kelompok pengunjung

| Kelompok | Yang dicari | Halaman pertama | Ukuran berhasil |
|---|---|---|---|
| **Pendengar baru** | Apa itu WBS, apa yang sedang diputar, bagaimana mendengarkan | Beranda | Menekan putar dalam dua klik |
| **Pendengar setia** | Jadwal program favorit dan program berikutnya | Beranda atau Jadwal | Menemukan jam program tanpa mencari manual |
| **Peneliti dan pustakawan** | Episode lama berdasarkan seri, topik, atau narasumber | Program & Siniar atau Pencarian | Membuka detail episode dan tautan YouTube |
| **Peserta acara** | Jadwal acara khusus dan cara mengirim pertanyaan | Beranda | Membuka acara atau mengirim pertanyaan saat sesi terbuka |

### 2.3 Perjalanan utama

| Alur | Langkah pengunjung | Halaman yang dipakai | Hasil yang diharapkan |
|---|---|---|---|
| **A-1 Mendengarkan radio** | Buka beranda → lihat status → tekan Dengarkan | Beranda, semua halaman | Audio berjalan dan pemutar terlihat |
| **A-2 Melihat jadwal** | Buka Jadwal → pilih tab hari → temukan program | Jadwal | Program aktif dan berikutnya jelas |
| **A-3 Mengajukan pertanyaan** | Lihat formulir → isi nama dan pertanyaan → kirim | Beranda atau Jadwal | Konfirmasi diterima; pertanyaan masuk panel |
| **A-6 Mencari episode lama** | Buka pencarian → ketik kata kunci → buka episode | Pencarian, Detail Episode | Episode ditemukan dan dapat diputar di YouTube |
| **A-7 Berpindah tanpa memutus audio** | Putar radio → buka halaman lain | Semua halaman | Audio tetap berjalan; nama program tetap terlihat |

### 2.4 Fakta yang tidak boleh dilanggar

| Hal | Aturan tampilan |
|---|---|
| **Jumlah episode** | Tampilkan **331 video unik**. Jangan pernah menulis “337 episode”. |
| **Jumlah seri** | **21 seri resmi** ditambah satu kartu **“Lainnya”** berisi 82 video. |
| **Status konten** | Hanya episode berstatus **Tayang** yang terlihat. Draf dan Arsip Internal tidak pernah muncul. |
| **Status siaran** | Dihitung dari jam dan jadwal terbit. Website tidak mengklaim mengetahui isi playout studio. |
| **Siklus hari** | Hari siaran berganti pukul 06.00, bukan pukul 00.00. |
| **Pertanyaan** | Hanya dapat dikirim saat sesi terbuka dan berada di dalam jam program. Pertanyaan tidak pernah tampil di halaman publik. |
| **Acara mendatang** | Maksimal tiga acara terdekat; blok disembunyikan bila tidak ada acara. |
| **Pemutar** | Radio tidak berbunyi otomatis. Video YouTube tidak berputar otomatis. |
| **Bahasa** | Seluruh antarmuka berbahasa Indonesia; nama seri mengikuti ejaan resmi dokumen `02`. |
| **Identitas** | Logo dan warna final menunggu `D-2`; sebelum itu dipakai netral sementara, bukan aset UT Radio. |
| **Analitik** | GA4 baru aktif setelah Kebijakan Privasi terbit dan `D-7` tersedia. |

### 2.5 Konteks perangkat dan jaringan

| Konteks | Asumsi rancangan |
|---|---|
| **Ponsel** | Layar 360–430 px menjadi prioritas; satu kolom; tombol utama minimal 44 × 44 px |
| **Tablet** | 640–1023 px; dua kolom kartu; header belum tentu menampung lima menu sejajar |
| **Desktop** | 1024 px ke atas; maksimal 1200 px konten; lima menu sejajar |
| **Jaringan kantor** | Halaman inti harus tetap terbaca saat gambar lambat; pemutar radio dimuat terpisah |
| **Peramban** | Chrome, Edge, Firefox, dan Safari versi umum; tanpa kebutuhan peramban khusus |
| **Pembaca layar** | Struktur judul, label formulir, dan teks alternatif harus bermakna tanpa melihat layar |
| **Pengguna papan tunas** | Seluruh fungsi dapat dicapai tanpa tetikus; fokus selalu terlihat |

---

## 3. Sistem Desain dan Layout Global

### 3.1 Grid dan titik henti

| Ukuran layar | Kolom | Lebar konten | Jarak antarkolom | Margin tepi |
|---|---|---|---|---|
| **Ponsel** (< 640 px) | 4 | 100% | 16 px | 16 px |
| **Tablet** (640–1023 px) | 8 | 100% | 24 px | 24 px |
| **Desktop** (≥ 1024 px) | 12 | maksimal 1200 px | 32 px | 32 px |
| **Layar lebar** (≥ 1440 px) | 12 | maksimal 1280 px | 32 px | otomatis |

Konten teks panjang, seperti Kebijakan Privasi dan deskripsi episode, dibatasi **65–75 karakter per baris** agar nyaman dibaca. Tabel jadwal boleh memakai lebar penuh karena isinya baris demi baris.

### 3.2 Unsur visual

| Unsur | Aturan |
|---|---|
| **Warna** | Latar netral terang; satu warna aksen untuk tombol utama dan penanda siaran; warna final menunggu `D-2` |
| **Kontras** | Teks biasa minimal 4,5:1; teks besar minimal 3:1; status tidak boleh dibedakan hanya oleh warna |
| **Tipografi** | Satu keluarga huruf yang mudah dibaca; ukuran isi minimal 16 px; judul halaman 32–40 px di desktop dan 28 px di ponsel |
| **Gambar** | Rasio 16:9 seragam; sudut membulat 8–12 px; tanpa bingkai berlebihan |
| **Ikon** | Ukuran 20 atau 24 px; selalu disertai teks pada tombol penting |
| **Jarak** | Kelipatan 4 px; jarak antarbagian 32–48 px di ponsel dan 48–64 px di desktop |
| **Bayangan** | Tipis dan hanya untuk pemutar, menu yang terbuka, serta kartu yang dapat ditekan |
| **Gerak** | 150–200 milidetik; tidak ada gerak yang berulang tanpa henti |

### 3.3 Header

Header adalah satu-satunya navigasi utama. Isinya tidak berubah antarhalaman, kecuali penanda halaman aktif.

**Desktop (≥ 1024 px):**

```
[Logo WBS]   Beranda   Jadwal Siaran   Program & Siniar   Tentang WBS   Kontak      [Cari]   [Dengarkan]
────────────────────────────────────────────────────────────────────────────────────────────────────
```

**Ponsel (< 1024 px):**

```
[Logo WBS]                                                        [Cari]   [Menu]
────────────────────────────────────────────────────────────────────────────────
```

Aturan header:

| Hal | Aturan |
|---|---|
| **Tinggi** | 64 px di desktop, 56 px di ponsel |
| **Melekat** | Header tetap terlihat saat menggulir, tetapi tidak menutupi pemutar di bawah |
| **Menu aktif** | Ditandai garis bawah dan ketebalan huruf, bukan warna saja |
| **Tombol Dengarkan** | Berubah menjadi **Jeda** saat radio berbunyi; tetap terlihat di header dan pemutar |
| **Pencarian** | Ikon membuka kolom pencarian di tempat; menekan Esc menutupnya; Enter membuka `/cari` |
| **Menu ponsel** | Laci dari samping berisi lima menu, tautan Kebijakan Privasi, dan tombol Dengarkan |
| **Tanpa login** | Tidak ada tombol masuk, akun, atau favorit bagi pengunjung |

### 3.4 Footer

Footer memakai empat kolom di desktop dan satu kolom bertumpuk di ponsel.

| Kolom | Isi | Aturan |
|---|---|---|
| **Tentang** | Ringkasan satu paragraf WBS, tautan Tentang WBS dan Kebijakan Privasi | Teks ringkas, bukan sejarah panjang |
| **Jelajahi** | Beranda, Jadwal Siaran, Program & Siniar, Pencarian | Semua tautan internal |
| **Kontak** | Alamat Perpusnas, surel, telepon, jam layanan | Diambil dari Pengaturan Situs agar sama dengan halaman Kontak |
| **Ikuti** | Instagram, Facebook, X, YouTube, WhatsApp | Hanya kanal aktif yang tampil (`M-11`, `PR-41`) |

Baris paling bawah memuat: `© 2026 Perpustakaan Nasional RI — Layanan Radio & Siniar Widya Bahana Swara`, tautan ke situs utama Perpusnas, dan tanggal pembaruan terakhir Kebijakan Privasi.

Footer tidak boleh memuat formulir, peta interaktif, atau tautan yang belum aktif.

### 3.5 Pemutar radio persisten

Pemutar adalah komponen yang paling sering dilihat pengunjung. Ia harus sederhana, dapat dijangkau, dan tidak menutupi isi.

**Desktop:**

```
[Logo]  Sedang Mengudara: Indonesia Pagi Ini        [Jeda]   [Volume ─────]   [Program berikutnya: 10.00]
────────────────────────────────────────────────────────────────────────────────────────────────────
```

**Ponsel:**

```
[Logo]  Indonesia Pagi Ini · 08.00–10.00     [Jeda]   [Volume]
        Berikutnya: Pesona Nusantara · 10.00
────────────────────────────────────────────────────────────────────────────────────────────────────
```

| Keadaan | Yang terlihat | Tindakan yang tersedia |
|---|---|---|
| **Belum diputar** | Nama program aktif dan tombol **Dengarkan** | Tekan untuk memulai |
| **Memuat** | Tulisan “Menyambungkan siaran…” dan tombol batal | Tunggu atau batalkan |
| **Berbunyi** | Nama program, jam, tombol **Jeda**, pengatur volume | Jeda, ubah volume, bisukan |
| **Dijeda** | Tulisan “Siaran dijeda” dan tombol **Lanjutkan** | Lanjutkan atau tutup |
| **Gangguan** | Pesan dari Pengaturan Situs, misalnya “Siaran sedang gangguan. Coba lagi.” | Tombol **Coba lagi** |
| **Di luar jadwal** | Nama program terakhir dan keterangan “Siaran belum/tidak aktif” | Coba lagi; lihat jadwal |

Aturan pemutar:

- Pemutar **tidak** muncul sebagai jendela mengambang di tengah layar; ia melekat di bawah.
- Pemutar tidak menutupi footer karena footer diberi ruang bawah setinggi pemutar.
- Volume tidak memaksa pengunjung mengatur ulang setiap halaman; nilai terakhir diingat selama tab terbuka.
- Pada ponsel, pemutar boleh diringkas menjadi satu baris saat pengunjung menggulir ke bawah, tetapi tombol jeda tetap terlihat.
- Jika radio belum diputar, pemutar tetap menampilkan program aktif agar pengunjung tahu apa yang sedang mengudara.
- Pemutar tidak menampilkan iklan, donasi, atau ajakan berlangganan.
- Pemutar memberi pengumuman kepada pembaca layar saat status berubah, misalnya “Siaran dimulai” atau “Siaran terputus”.
- Pemutar tetap ada di halaman `404` dan halaman Kebijakan Privasi.
- Aliran audio Icecast wajib berprotokol HTTPS (atau disalurkan via reverse proxy SSL) agar dapat diputar dengan andal pada situs yang di-hosting di GitHub Pages tanpa terblokir oleh kebijakan *mixed content* peramban modern.

### 3.6 Kerangka halaman dan remah navigasi

Setiap halaman memakai urutan yang sama:

1. **Header**
2. **Remah navigasi** (kecuali Beranda)
3. **Judul halaman**
4. **Isi halaman**
5. **Footer**
6. **Pemutar persisten**

Remah navigasi memakai format:

| Halaman | Remah |
|---|---|
| Jadwal | `Beranda / Jadwal Siaran` |
| Program | `Beranda / Program & Siniar` |
| Detail Seri | `Beranda / Program & Siniar / Nama Seri` |
| Detail Episode | `Beranda / Program & Siniar / Nama Seri / Judul Episode` |
| Pencarian | `Beranda / Pencarian` |
| Tentang | `Beranda / Tentang WBS` |
| Kontak | `Beranda / Kontak` |
| Kebijakan Privasi | `Beranda / Kebijakan Privasi` |

Judul halaman pada tab peramban mengikuti pola:

| Halaman | Judul tab |
|---|---|
| Beranda | `Radio & Siniar WBS Perpusnas` |
| Jadwal | `Jadwal Siaran — Radio & Siniar WBS Perpusnas` |
| Program | `Program & Siniar — Radio & Siniar WBS Perpusnas` |
| Detail Seri | `Nama Seri — Radio & Siniar WBS Perpusnas` |
| Detail Episode | `Judul Episode — Nama Seri — Radio & Siniar WBS Perpusnas` |
| Pencarian | `Hasil Pencarian — Radio & Siniar WBS Perpusnas` |
| Tentang | `Tentang WBS — Radio & Siniar WBS Perpusnas` |
| Kontak | `Kontak — Radio & Siniar WBS Perpusnas` |
| Kebijakan Privasi | `Kebijakan Privasi — Radio & Siniar WBS Perpusnas` |
| 404 | `Halaman Tidak Ditemukan — Radio & Siniar WBS Perpusnas` |

### 3.7 Komponen dasar

| Komponen | Dipakai untuk | Aturan |
|---|---|---|
| **Tombol utama** | Dengarkan, Kirim pertanyaan, Coba lagi | Satu tombol utama per blok; teks berupa kata kerja |
| **Tombol kedua** | Lihat jadwal, Baca selengkapnya, Salin tautan | Garis tepi atau latar netral; tidak bersaing dengan tombol utama |
| **Kartu seri** | Program & Siniar, beranda | Gambar 16:9, nama seri, satu kalimat, jumlah episode, label kategori |
| **Kartu episode** | Episode terbaru, daftar seri, hasil pencarian | Gambar 16:9, judul, nama seri, tanggal, durasi |
| **Kartu acara** | Acara Mendatang | Judul, tanggal, jam WIB, kanal, tautan |
| **Chip kategori** | Saringan program | Satu pilihan aktif; tombol “Semua” selalu ada |
| **Tab** | Jadwal, urutan episode | Tab aktif terlihat jelas; dapat dioperasikan dengan papan tunas |
| **Kolom pencarian** | Header dan Program & Siniar | Label tidak hanya placeholder; tombol hapus tersedia |
| **Formulir** | Tanya Jawab | Label di atas kolom; pesan galat di bawah kolom yang bermasalah |
| **Pita pemberitahuan** | Pratinjau, gangguan siaran, sesi berakhir | Tidak menutup konten; dapat ditutup bila bukan informasi penting |
| **Keadaan kosong** | Daftar tanpa isi | Satu kalimat penjelas dan satu tindakan lanjutan |
| **Kerangka muat** | Daftar episode, kartu program | Bentuk menyerupai kartu akhir; tidak berkedip cepat |

### 3.8 Gerak dan interaksi

- Perubahan warna tombol dan tautan memakai transisi singkat, tidak lebih dari 200 milidetik.
- Tidak ada animasi masuk yang menunda pembacaan isi.
- Pengguna yang memilih **kurangi gerak** pada perangkatnya tidak melihat animasi selain perubahan status yang perlu.
- Menu ponsel dapat ditutup dengan tombol Esc, tombol tutup, atau klik di luar area.
- Setiap tindakan yang mengubah data, seperti mengirim pertanyaan, memberi umpan balik yang jelas dan tidak hanya mengubah warna tombol.

### 3.9 Nada penulisan antarmuka

| Gunakan | Hindari |
|---|---|
| “Sedang Mengudara” | “On Air”, “Live”, “Now Playing” |
| “Dengarkan” | “Play”, “Streaming” |
| “Tonton di YouTube” | “Buka video”, “Klik di sini” |
| “Belum ada episode” | “Data tidak ditemukan (error 204)” |
| “Siaran sedang gangguan. Coba lagi.” | “Koneksi gagal: ECONNREFUSED” |
| “Cari episode atau nama seri” | “Masukkan kata kunci pencarian Anda” |
| “Pertanyaan Anda sudah diterima.” | “Sukses! Data tersimpan.” |

Nama seri ditulis persis seperti dokumen `02`, termasuk yang berhuruf kapital semua. Nama program radio ditulis penuh; **Ruang Literasi** tidak disingkat.

---

## 4. Blueprint Beranda

### 4.1 Tujuan beranda

Beranda menjawab tiga pertanyaan dalam urutan ini:

1. **Apa yang sedang mengudara sekarang?**
2. **Apa yang bisa saya dengarkan atau tonton?**
3. **Apa yang akan datang?**

Beranda bukan halaman promosi. Tidak ada carousel, video latar, atau pop-up pembuka.

### 4.2 Wireframe desktop

```
[HEADER]
Logo WBS  |  Beranda  |  Jadwal Siaran  |  Program & Siniar  |  Tentang WBS  |  Kontak   [Cari]  [Dengarkan]
──────────────────────────────────────────────────────────────────────────────────────────────────────────
[HERO SIARAN — statis]
● SEDANG MENGUDARA
Indonesia Pagi Ini
08.00–10.00 WIB · Hari Kerja
Satu kalimat deskripsi program.
[ Dengarkan Sekarang ]   [ Lihat Jadwal Hari Ini ]
Berikutnya: Pesona Nusantara — 10.00 WIB
──────────────────────────────────────────────────────────────────────────────────────────────────────────
[PINTASAN CEPAT]
[ Jadwal Hari Ini ]   [ Program & Siniar ]   [ Tentang WBS ]
──────────────────────────────────────────────────────────────────────────────────────────────────────────
[KARTU TANYA JAWAB — hanya bila sesi terbuka]
Punya pertanyaan untuk penyiar?   [ Isi pertanyaan ]
──────────────────────────────────────────────────────────────────────────────────────────────────────────
[EPISODE TERBARU]                                                        [Lihat semua episode →]
[Kartu 1]   [Kartu 2]   [Kartu 3]   [Kartu 4]
──────────────────────────────────────────────────────────────────────────────────────────────────────────
[JELAJAHI PROGRAM]                                                       [Semua program →]
[Semua] [Layanan] [Naskah] [Literasi] [Sejarah]
[Kartu Seri]   [Kartu Seri]   [Kartu Seri]
──────────────────────────────────────────────────────────────────────────────────────────────────────────
[JADWAL HARI INI]                                                        [Jadwal 24 jam →]
06.00  Opening
07.00  ...
08.00  Indonesia Pagi Ini                         ◀ SEKARANG
09.00  Indonesia Pagi Ini
10.00  Pesona Nusantara
──────────────────────────────────────────────────────────────────────────────────────────────────────────
[ACARA MENDATANG]
[Kartu Acara]   [Kartu Acara]   [Kartu Acara]
──────────────────────────────────────────────────────────────────────────────────────────────────────────
[TENTANG WBS]
[Foto studio]   Radio & Siniar Widya Bahana Swara ...
                [Baca selengkapnya →]
──────────────────────────────────────────────────────────────────────────────────────────────────────────
[FOOTER — 4 kolom + baris hak cipta]
──────────────────────────────────────────────────────────────────────────────────────────────────────────
[PEMUTAR PERSISTEN]
```

### 4.3 Wireframe ponsel

```
[HEADER: Logo]                                            [Cari] [Menu]
──────────────────────────────────────────────────────────────────────
[HERO]
● SEDANG MENGUDARA
Indonesia Pagi Ini
08.00–10.00 WIB · Hari Kerja
[ Dengarkan Sekarang ]
[ Lihat Jadwal Hari Ini ]
Berikutnya: Pesona Nusantara — 10.00 WIB
──────────────────────────────────────────────────────────────────────
[PINTASAN]
[ Jadwal Hari Ini ]  [ Program & Siniar ]
──────────────────────────────────────────────────────────────────────
[KARTU TANYA JAWAB — bila sesi terbuka]
──────────────────────────────────────────────────────────────────────
[EPISODE TERBARU]
[Kartu 1]
[Kartu 2]
[Kartu 3]
[Kartu 4]
──────────────────────────────────────────────────────────────────────
[JELAJAHI PROGRAM]
[Chip: Semua] [Layanan] [Naskah] [Literasi] [Sejarah]
[Kartu Seri]
[Kartu Seri]
[Kartu Seri]
──────────────────────────────────────────────────────────────────────
[JADWAL HARI INI]
08.00  Indonesia Pagi Ini   ◀ SEKARANG
09.00  Indonesia Pagi Ini
10.00  Pesona Nusantara
11.00  ...
[ Lihat jadwal 24 jam ]
──────────────────────────────────────────────────────────────────────
[ACARA MENDATANG]
[Kartu Acara]
──────────────────────────────────────────────────────────────────────────────────────────────────────
[TENTANG WBS]
──────────────────────────────────────────────────────────────────────
[FOOTER]
──────────────────────────────────────────────────────────────────────
[PEMUTAR PERSISTEN]
```

### 4.4 Aturan setiap blok

| Blok | Isi | Aturan tampilan | Sumber data |
|---|---|---|---|
| **Header** | Logo, lima menu, pencarian, Dengarkan | Sama di semua halaman; menu aktif ditandai | Pengaturan Situs |
| **Hero siaran** | Status, nama program, jam, deskripsi, dua tombol, program berikutnya | Tanpa gambar latar berat; status dihitung dari jadwal; tinggi tidak lebih dari satu layar ponsel | Jadwal terbit |
| **Pintasan** | Tiga tautan utama | Tetap sepanjang tahun; tidak berubah mengikuti kampanye | Tetap |
| **Tanya Jawab** | Kartu ajakan atau formulir | Hanya muncul saat sesi terbuka dan di dalam jam program; tidak mendorong hero ke bawah pada keadaan tertutup | Sesi On-Air |
| **Episode terbaru** | Empat episode Tayang terbaru | Kurang dari empat: tampilkan yang ada; tidak ada kartu kosong; urut tanggal terbaru | Episode Tayang |
| **Jelajahi program** | Maksimal enam seri unggulan dan chip kategori | Bila belum ada seri unggulan, pakai urutan dokumen `02`; “Semua program” selalu tampil | Seri |
| **Jadwal hari ini** | Lima baris di sekitar jam sekarang | Ikut siklus 06.00–05.59; baris aktif ditandai teks “Sekarang” | Jadwal terbit |
| **Acara mendatang** | Maksimal tiga acara terdekat | Blok hilang seluruhnya bila tidak ada acara; bukan kalender | Acara Terbit |
| **Tentang WBS** | Satu paragraf, satu gambar, satu tautan | Teks ringkas; gambar memiliki teks alternatif | Halaman statis |
| **Footer** | Empat kolom dan hak cipta | Tautan mati tidak ditampilkan | Pengaturan Situs |
| **Pemutar** | Status radio dan kontrol | Selalu ada; tidak menutupi footer | Jadwal dan aliran audio |

### 4.5 Keadaan hero siaran

| Keadaan | Kapan terjadi | Teks dan tampilan | Tindakan |
|---|---|---|---|
| **Mengudara** | Jam sekarang berada di dalam slot jadwal | Nama program, jam, deskripsi, tombol Dengarkan | Putar radio |
| **Akan mulai** | Kurang dari 15 menit sebelum slot berikutnya | “Segera: Nama Program — 10.00 WIB” | Lihat jadwal |
| **Di luar jadwal** | Tidak ada slot yang cocok karena jadwal belum terbit | “Jadwal siaran belum tersedia.” | Lihat jadwal |
| **Siaran terganggu** | Aliran audio gagal disambungkan | “Siaran sedang gangguan. Coba lagi.” | Coba lagi |
| **Jadwal gagal dimuat** | Data jadwal tidak dapat diambil | “Jadwal belum dapat dimuat.” | Muat ulang |

Hero tidak boleh menampilkan nama program yang salah hanya agar terlihat aktif. Bila jadwal belum terbit, kejujuran tampilan lebih penting daripada kesan “selalu mengudara”.

### 4.6 Episode terbaru

- Menampilkan **empat episode berstatus Tayang** dengan tanggal terbaru.
- Satu video hanya muncul satu kali, meskipun data sumber memiliki baris ganda.
- Kartu memuat gambar 16:9, judul baku, nama seri, tanggal, dan durasi.
- Bila episode belum memiliki gambar sendiri, dipakai gambar YouTube; bila gambar gagal dimuat, tampil latar netral dengan inisial seri.
- Bila hanya ada satu atau dua episode, blok tetap tampil dengan jumlah tersebut.
- Bila belum ada episode Tayang sama sekali, blok diganti keadaan kosong: “Episode pertama akan segera hadir.” dengan tautan ke Program & Siniar.
- Tautan “Lihat semua episode” menuju `/program`, bukan halaman arsip terpisah.

### 4.7 Jelajahi program

- Menampilkan maksimal **enam kartu seri**.
- Urutan mengikuti penanda unggulan dari panel; bila kurang dari enam, sisanya diisi seri lain sesuai urutan dokumen `02`.
- Chip kategori menyaring kartu di tempat, tanpa memuat ulang halaman.
- Chip **Semua** selalu menjadi pilihan awal.
- Kartu “Lainnya” tidak ditampilkan di beranda agar enam slot dipakai seri yang lebih jelas; pintu masuknya ada di `/program`.
- Bila kategori yang dipilih tidak memiliki seri, tampil keadaan kosong kecil: “Belum ada seri pada kategori ini.”
- Tautan “Semua program” selalu terlihat di kanan judul blok.

### 4.8 Jadwal hari ini

- Menampilkan **lima baris** yang berpusat pada jam sekarang: dua baris sebelumnya, baris aktif, dan dua baris berikutnya.
- Bila jam sekarang berada di awal atau akhir siklus, jumlah baris tetap lima dengan mengambil baris yang tersedia.
- Baris aktif diberi latar berbeda, ikon, dan teks **“Sekarang”**; warna saja tidak cukup.
- Setiap baris memuat jam mulai, nama program, dan keterangan singkat bila ada.
- Tautan “Jadwal 24 jam” menuju `/jadwal` dengan tab hari yang sesuai.
- Bila jadwal belum terbit, blok menampilkan “Jadwal belum tersedia.” dan tautan ke halaman Jadwal.

### 4.9 Acara mendatang di beranda

Aturan lengkap ada pada Bagian 14. Ringkasnya:

- Maksimal **tiga acara** terdekat yang berstatus Terbit dan belum lewat.
- Setiap kartu memuat judul, tanggal, jam WIB, kanal, dan tautan.
- Blok disembunyikan seluruhnya bila tidak ada acara.
- Acara yang sudah lewat tidak ditampilkan sebagai arsip publik.
- Tidak ada tampilan kalender bulanan atau tombol “Tambahkan ke kalender” pada tahap ini.

### 4.10 Tentang WBS

- Menampilkan satu gambar studio atau kegiatan, satu paragraf 60–120 kata, dan tautan “Baca selengkapnya”.
- Teks diambil dari halaman statis Tentang WBS; beranda tidak menyimpan teks terpisah.
- Bila gambar belum tersedia, dipakai latar netral tanpa memuat gambar stok yang tidak resmi.
- Blok ini tidak boleh memuat visi dan misi lengkap; itu tugas halaman Tentang.

### 4.11 Kartu Tanya Jawab di beranda

Kartu hanya muncul bila **sesi terbuka** dan **waktu sekarang berada di dalam jam program**. Posisinya setelah pintasan, sebelum Episode Terbaru, agar terlihat tanpa menutupi siaran.

| Keadaan | Tampilan |
|---|---|
| **Sesi belum dibuka** | Kartu tidak muncul; tidak ada ruang kosong |
| **Sesi terbuka, program belum mulai** | “Sesi tanya jawab dibuka saat program berlangsung.” |
| **Sesi terbuka dan program berlangsung** | Formulir nama dan pertanyaan dengan tombol Kirim |
| **Sesi berakhir** | “Sesi tanya jawab untuk program ini telah berakhir.” |
| **Di luar program interaktif atau acara khusus** | Kartu tidak muncul (`M-19`) |

Bila sesi dibuka untuk **Acara Khusus / Siaran Langsung YouTube** (`M-19`), judul kartu menyesuaikan menjadi *"Punya pertanyaan untuk narasumber [Nama Acara]?"* disertai nama acara dan tautan cepat menuju siaran YouTube terkait.

Aturan validasi, teks galat, dan perilaku setelah pengiriman ada pada Bagian 14.

### 4.12 Memuat dan kegagalan di beranda

- Teks hero dan tautan utama dirender lebih dahulu; gambar dimuat menyusul.
- Jadwal dan episode terbaru boleh memakai kerangka muat, tetapi tidak boleh menggeser hero setelah tampil.
- Bila satu blok gagal dimuat, blok lain tetap tampil. Contoh: Acara Mendatang gagal, Episode Terbaru tetap terlihat.
- Kegagalan tidak menampilkan kode teknis. Pesan memakai bahasa Indonesia dan menyediakan satu tindakan, misalnya “Muat ulang”.
- Pemutar radio tetap dicoba secara terpisah; kegagalan katalog tidak boleh mematikan pemutar.

---

## 5. Halaman Jadwal Siaran (`/jadwal`)

### 5.1 Tujuan

Halaman ini menjawab “program apa yang mengudara pada jam tertentu” untuk tiga jenis hari. Ia menampilkan **jadwal 24 jam**, bukan daftar acara insidental. Acara khusus tetap berada di blok Acara Mendatang.

### 5.2 Wireframe desktop

```
[HEADER]
Beranda / Jadwal Siaran
──────────────────────────────────────────────────────────────────────────────────────────
Jadwal Siaran
Jadwal 24 jam Radio WBS. Semua waktu dalam WIB.
[ Hari Kerja ]   [ Sabtu ]   [ Minggu ]                         [ Ke program sekarang ]
──────────────────────────────────────────────────────────────────────────────────────────
JAM       PROGRAM                         KETERANGAN                         STATUS
06.00     Opening                         Pembuka siklus harian
07.00     ...
08.00     Indonesia Pagi Ini              Program interaktif                 ◀ SEKARANG
09.00     Indonesia Pagi Ini              Program interaktif
10.00     Pesona Nusantara                Program interaktif
...
05.00     Tausiyah + Lagu Religi          Penutup siklus
──────────────────────────────────────────────────────────────────────────────────────────
[Keterangan: Program bertanda interaktif membuka sesi tanya jawab saat siaran.]
[FOOTER]
[PEMUTAR PERSISTEN]
```

### 5.3 Wireframe ponsel

```
[HEADER]
Beranda / Jadwal Siaran
──────────────────────────────────────────
Jadwal Siaran
Semua waktu WIB.
[ Hari Kerja ] [ Sabtu ] [ Minggu ]
[ Ke program sekarang ]
──────────────────────────────────────────
06.00  Opening
07.00  ...
08.00  Indonesia Pagi Ini        ◀ SEKARANG
       Program interaktif
       [ Lihat pertanyaan ]
09.00  Indonesia Pagi Ini
10.00  Pesona Nusantara
...
──────────────────────────────────────────
[FOOTER]
[PEMUTAR PERSISTEN]
```

### 5.4 Aturan hari siaran

Satu siklus siaran berjalan **06.00–05.59** keesokan hari. Karena itu, pukul 00.00–05.59 masih memakai jadwal hari sebelumnya.

| Waktu sekarang | Siklus yang dipakai | Tab awal |
|---|---|---|
| Senin 06.00 – Jumat 05.59 | Hari Kerja | Hari Kerja |
| Jumat 06.00 – Sabtu 05.59 | Hari Kerja | Hari Kerja |
| Sabtu 06.00 – Minggu 05.59 | Sabtu | Sabtu |
| Minggu 06.00 – Senin 05.59 | Minggu | Minggu |
| Selasa 02.00 (contoh) | Hari Kerja hari Senin | Hari Kerja |

Tab yang dipilih pengunjung tidak boleh berubah sendiri saat halaman dibuka ulang, kecuali pengunjung belum memilih apa pun. Pilihan tab disimpan pada alamat halaman, misalnya `/jadwal?hari=sabtu`, agar tautan dapat dibagikan.

### 5.5 Susunan tabel

| Kolom | Isi | Aturan |
|---|---|---|
| **Jam** | Mulai–selesai, format 24 jam | Selalu berlabel WIB di atas tabel; tidak memakai AM/PM |
| **Program** | Nama payung program | Nama penuh; **Ruang Literasi** tidak disingkat |
| **Keterangan** | Deskripsi satu baris | Maksimal 160 karakter; boleh kosong |
| **Status** | “Sekarang” pada baris aktif | Teks dan ikon, bukan warna saja |

Aturan baris:

- Tabel memuat **24 baris** yang menutup siklus tanpa celah dan tanpa tumpang tindih.
- Baris yang sedang berlangsung ditandai **“Sekarang”** dan tidak boleh lebih dari satu.
- Bila dua baris bertumpang tindih karena kesalahan data, halaman menampilkan pemberitahuan halus dan memilih baris dengan jam mulai terbaru; pengelola perlu memperbaiki jadwal.
- Baris program interaktif diberi label kecil **“Tanya jawab”**.
- Baris tidak dapat diklik untuk memulai audio secara otomatis. Tombol Dengarkan tetap menjadi tindakan yang jelas.

### 5.6 Penanda “Sekarang” dan navigasi waktu

- Saat halaman dibuka, tabel mulai dari pukul 06.00 agar siklus terbaca dari awal.
- Tombol **“Ke program sekarang”** menggulir ke baris aktif dan memberi fokus pada baris tersebut.
- Halaman **tidak** menggulir sendiri saat dibuka, karena pengunjung mungkin ingin melihat program pagi lebih dahulu.
- Baris aktif diperbarui setiap menit tanpa memuat ulang halaman.
- Bila program berganti saat pengunjung membaca, penanda berpindah dan pembaca layar menerima pengumuman halus, bukan suara yang mengganggu.
- Di ponsel, tombol “Ke program sekarang” melekat di bawah tab agar mudah dijangkau.

### 5.7 Membuka keterangan program

Menekan satu baris membuka panel keterangan di bawahnya, bukan halaman baru.

| Isi panel | Aturan |
|---|---|
| Nama program dan jam | Sama dengan baris |
| Deskripsi | Dari jadwal; bila kosong, panel hanya menampilkan jam dan status |
| Label interaktif | “Program ini membuka sesi tanya jawab saat siaran.” |
| Tombol | **Dengarkan** dan, bila sesi terbuka, **Kirim pertanyaan** |
| Tautan | Tidak ada tautan ke halaman program radio terpisah |

Hanya satu panel yang terbuka pada satu waktu. Menekan baris lain menutup panel sebelumnya. Tombol tutup dan Esc menutup panel.

### 5.8 Formulir Tanya Jawab di halaman Jadwal

Formulir memakai komponen yang sama dengan beranda (Bagian 14). Perbedaannya:

- Formulir hanya muncul di panel program yang **sedang berlangsung**, bukan di semua program interaktif hari itu.
- Bila pengunjung membuka program yang belum mulai, tampil keterangan “Sesi tanya jawab dibuka saat program berlangsung.”
- Bila program sudah lewat, tampil “Sesi tanya jawab untuk program ini telah berakhir.”
- Formulir tidak muncul pada program noninteraktif.

### 5.9 Keadaan kosong dan galat

| Keadaan | Tampilan | Tindakan |
|---|---|---|
| Jadwal belum pernah diterbitkan | “Jadwal siaran belum tersedia.” | Tautan ke Beranda dan Program & Siniar |
| Jadwal gagal dimuat | “Jadwal belum dapat dimuat.” | Tombol **Muat ulang** |
| Tab hari tidak memiliki data | “Belum ada jadwal untuk hari ini.” | Tetap tampilkan tab lain |
| Data jadwal tidak lengkap | Pita kecil “Sebagian jadwal belum lengkap.” | Tetap tampilkan baris yang ada |
| Pemutar gagal | Pesan pemutar di bawah layar | Tombol **Coba lagi** |

### 5.10 Aksesibilitas halaman Jadwal

- Tabel memakai penanda baris dan kolom yang benar, bukan kumpulan kotak tanpa hubungan.
- Baris aktif memakai penanda “Sekarang” yang terbaca pembaca layar, bukan hanya latar berwarna.
- Tab dapat dioperasikan dengan panah kiri/kanan, Home, dan End.
- Panel keterangan dapat dibuka dan ditutup dengan papan tunas; fokus kembali ke baris asal setelah ditutup.
- Tombol “Ke program sekarang” memiliki label yang jelas, bukan hanya ikon panah.
- Teks jadwal tidak mengecil di bawah 14 px pada ponsel.

---

## 6. Halaman Program & Siniar (`/program`)

### 6.1 Tujuan

Menjadi pintu masuk seluruh katalog: **21 seri resmi** dan **“Lainnya”**, dengan saringan empat kategori topik. Halaman ini tidak menampilkan 331 episode sekaligus; episode dibuka melalui seri atau pencarian.

### 6.2 Wireframe desktop

```
[HEADER]
Beranda / Program & Siniar
──────────────────────────────────────────────────────────────────────────────────────────
Program & Siniar
Jelajahi seluruh seri dan episode Radio WBS.
[ Cari judul episode atau nama seri... ]
[ Semua ]  [ Layanan Perpustakaan ]  [ Naskah Nusantara ]  [ Literasi ]  [ Sejarah ]
──────────────────────────────────────────────────────────────────────────────────────────
Menampilkan 21 seri · 331 episode
[Kartu Seri]   [Kartu Seri]   [Kartu Seri]
[Kartu Seri]   [Kartu Seri]   [Kartu Seri]
[Kartu Seri]   [Kartu Seri]   [Kartu Seri]
...
[Kartu Lainnya]
                                         [ Muat lebih banyak ]
──────────────────────────────────────────────────────────────────────────────────────────
[FOOTER]
[PEMUTAR PERSISTEN]
```

### 6.3 Wireframe ponsel

```
[HEADER]
Beranda / Program & Siniar
──────────────────────────────────────────
Program & Siniar
Jelajahi seluruh seri dan episode Radio WBS.
[ Cari judul episode atau nama seri... ]
[Semua] [Layanan] [Naskah] [Literasi] [Sejarah]
──────────────────────────────────────────
21 seri · 331 episode
[Kartu Seri]
[Kartu Seri]
[Kartu Seri]
...
[ Muat lebih banyak ]
──────────────────────────────────────────
[FOOTER]
[PEMUTAR PERSISTEN]
```

### 6.4 Saringan kategori

| Pilihan | Yang tampil | Catatan |
|---|---|---|
| **Semua** | 21 seri dan kartu “Lainnya” | Pilihan awal |
| **Layanan Perpustakaan & Profesi Pustakawan** | 10 seri | Tanpa kartu “Lainnya” |
| **Naskah Nusantara & Warisan Budaya** | 6 seri | Tanpa kartu “Lainnya” |
| **Literasi, Minat Baca & Keluarga** | 3 seri | Tanpa kartu “Lainnya” |
| **Sejarah, Kebudayaan & Diskusi Publik** | 2 seri | Tanpa kartu “Lainnya” |

Aturan:

- Hanya kategori yang memiliki seri yang ditampilkan.
- Kartu **“Lainnya”** hanya muncul pada pilihan **Semua**, karena isinya lintas kategori. Videonya tetap dapat ditemukan melalui pencarian dan daftar `/program/lainnya`.
- Saringan tidak memuat ulang halaman; jumlah hasil diperbarui dan diumumkan kepada pembaca layar.
- Pilihan saringan disimpan pada alamat, misalnya `/program?kategori=naskah`, agar dapat dibagikan.
- Menekan kategori yang sama sekali lagi mengembalikan pilihan ke **Semua**.
- Tidak ada saringan tahun, durasi, atau narasumber pada tahap ini; pencarian menangani kebutuhan tersebut.

### 6.5 Kartu seri

| Unsur | Aturan |
|---|---|
| **Gambar** | 16:9; gambar seri; bila kosong, gambar episode terbaru; bila keduanya kosong, latar netral dengan inisial seri |
| **Nama seri** | Maksimal dua baris; nama persis dokumen `02` |
| **Deskripsi** | Satu kalimat, maksimal dua baris di kartu |
| **Jumlah episode** | “N episode”, memakai jumlah video unik yang Tayang |
| **Label kategori** | Nama pendek kategori, misalnya “Naskah” |
| **Tanda interaktif** | Tidak ditampilkan pada kartu seri; katalog video bukan program radio |
| **Seluruh kartu dapat ditekan** | Menuju detail seri; tautan tidak hanya pada judul |

Kartu tidak menampilkan nomor episode, tanggal episode terbaru, atau nama narasumber agar tetap ringkas.

### 6.6 Pencarian di halaman Program

Kolom pencarian pada `/program` mencari dua hal sekaligus:

1. **Nama dan deskripsi seri** — kartu seri disaring.
2. **Judul episode, narasumber, dan topik** — maksimal tiga episode yang cocok ditampilkan di bawah kartu seri, dengan tautan “Lihat semua hasil di Pencarian”.

| Keadaan | Tampilan |
|---|---|
| Kolom kosong | Semua seri sesuai kategori |
| 1 karakter | Belum mencari; tampilkan petunjuk “Ketik minimal 2 karakter.” |
| 2 karakter atau lebih | Saring seri dan tampilkan maksimal tiga episode yang cocok |
| Tidak ada hasil | Keadaan kosong dengan saran kata kunci dan tombol hapus |
| Pencarian dihapus | Kembali ke daftar seri tanpa memuat ulang halaman |

Pencarian menunggu **300 milidetik** setelah pengunjung berhenti mengetik agar tidak membebani halaman. Kata kunci tidak mengubah kategori yang sedang aktif; bila hasil kosong, pengunjung dapat menghapus saringan kategori.

### 6.7 Urutan dan pemuatan kartu

- Urutan awal mengikuti dokumen `02`: kategori, lalu jumlah episode terbanyak.
- Tombol naik/turun tidak ditampilkan di halaman publik; urutan diatur pengelola.
- Kartu dimuat **sembilan per halaman** di desktop dan **enam** di ponsel.
- Tombol **Muat lebih banyak** menambah kartu tanpa memuat ulang halaman.
- Jumlah yang sudah tampil diumumkan, misalnya “Menampilkan 9 dari 21 seri”.
- Bila pengunjung membuka detail seri lalu menekan kembali, posisi gulir dan kartu yang sudah dimuat dipertahankan.
- Tidak ada nomor halaman yang membuat pengunjung kehilangan konteks.

### 6.8 Kartu “Lainnya”

Kartu ini berbeda dari seri resmi dan harus terlihat sebagai keranjang, bukan program.

| Unsur | Isi |
|---|---|
| **Nama** | “Lainnya” |
| **Label** | “Keranjang” |
| **Deskripsi** | “Video lepas yang tidak termasuk seri.” |
| **Jumlah** | “82 video” |
| **Gambar** | Kolase netral atau gambar bawaan; bukan foto acara tertentu |
| **Posisi** | Paling akhir setelah 21 seri |
| **Tujuan** | `/program/lainnya` |

Kartu “Lainnya” tidak diberi nomor episode dan tidak menampilkan kategori tunggal.

### 6.9 Keadaan kosong dan galat

| Keadaan | Tampilan | Tindakan |
|---|---|---|
| Belum ada seri Tayang | “Belum ada program yang dapat ditampilkan.” | Tautan ke Beranda |
| Kategori tanpa seri | “Belum ada seri pada kategori ini.” | Tombol **Lihat semua** |
| Pencarian tanpa hasil | “Tidak ada hasil untuk ‘kata kunci’.” | Saran memperpendek kata kunci; tombol hapus |
| Gambar kartu gagal | Latar netral dengan inisial seri | Tidak ada ikon gambar rusak |
| Daftar gagal dimuat | “Program belum dapat dimuat.” | Tombol **Muat ulang** |

### 6.10 Aksesibilitas dan SEO halaman Program

- Setiap kartu merupakan satu tautan yang dapat difokuskan, bukan beberapa tautan kecil yang membingungkan.
- Gambar memiliki teks alternatif dari nama seri, bukan “gambar”.
- Saringan memakai tombol yang menyatakan keadaan aktif, bukan tautan tanpa penjelasan.
- Jumlah hasil diumumkan melalui area pemberitahuan halus.
- Judul halaman dan deskripsi meta menyebut “Program & Siniar Radio WBS Perpusnas”.
- Halaman `/program` dapat diindeks; hasil saringan tidak perlu diindeks sebagai halaman terpisah.

---

## 7. Halaman Detail Seri (`/program/{nama-seri}`)

### 7.1 Tujuan

Menjelaskan satu seri dan menyediakan daftar seluruh episodenya. Halaman ini adalah rumah setiap episode; tidak ada episode yang hanya dapat dibuka dari pencarian.

### 7.2 Wireframe desktop

```
[HEADER]
Beranda / Program & Siniar / Nama Seri
──────────────────────────────────────────────────────────────────────────────────────────
[Gambar seri 16:9]        NAMA SERI
                          Kategori · 24 episode
                          Penjelasan 2–3 kalimat tentang seri.
                          [ Bagikan seri ]  [ Salin tautan ]
──────────────────────────────────────────────────────────────────────────────────────────
Daftar Episode                                      Urutkan: [ Terbaru ▾ ]
[Kartu Episode]  E-24  Judul · tanggal · durasi
[Kartu Episode]  E-23  Judul · tanggal · durasi
[Kartu Episode]  E-22  Judul · tanggal · durasi
...
                                                     [ Muat lebih banyak ]
──────────────────────────────────────────────────────────────────────────────────────────
[FOOTER]
[PEMUTAR PERSISTEN]
```

### 7.3 Wireframe ponsel

```
[HEADER]
Beranda / Program & Siniar / Nama Seri
──────────────────────────────────────────
[Gambar seri 16:9]
NAMA SERI
Kategori · 24 episode
Penjelasan 2–3 kalimat.
[ Bagikan ]
──────────────────────────────────────────
Daftar Episode
Urutkan: [ Terbaru ▾ ]
[Kartu Episode] E-24
Judul
tanggal · durasi
[Kartu Episode] E-23
...
[ Muat lebih banyak ]
──────────────────────────────────────────
[FOOTER]
[PEMUTAR PERSISTEN]
```

### 7.4 Bagian atas seri

| Unsur | Aturan |
|---|---|
| **Gambar** | 16:9; teks alternatif wajib; bila kosong, gambar bawaan |
| **Nama seri** | Satu-satunya judul utama halaman; tidak mengulang nama seri di setiap kartu episode |
| **Kategori** | Nama lengkap kategori, bukan kode A/B/C/D |
| **Jumlah episode** | Jumlah video unik Tayang, misalnya “24 episode” |
| **Deskripsi** | 2–3 kalimat dari panel; bukan ringkasan otomatis |
| **Berbagi** | WhatsApp dan salin tautan; tanpa pelacakan pribadi |
| **Tanpa tombol putar radio** | Radio tetap di pemutar bawah; halaman ini bukan program radio |

Untuk seri **Lainnya**, bagian atas memakai label “Keranjang”, penjelasan “Video lepas yang tidak termasuk seri”, dan jumlah “82 video”. Tidak ada nomor episode.

### 7.5 Daftar episode

| Unsur kartu | Aturan |
|---|---|
| **Nomor** | “E-01” sampai “E-N”, dihitung otomatis per seri; kosong untuk Lainnya |
| **Judul** | Judul baku; maksimal dua baris di ponsel |
| **Tanggal** | Format “14 Oktober 2026” |
| **Durasi** | Format “1 j 42 m”; video di bawah satu menit memakai detik |
| **Gambar** | 16:9 kecil; boleh sama dengan gambar seri bila episode tidak punya gambar |
| **Tautan** | Seluruh kartu menuju detail episode |

Aturan daftar:

- Hanya episode **Tayang** yang muncul.
- Satu video hanya muncul satu kali; baris ganda pada data sumber tidak ditampilkan sebagai episode kembar.
- Urutan awal **Terbaru**; pilihan lain **Terlama**.
- Nomor mengikuti urutan tanggal, bukan nomor pada judul asli.
- Bila tanggal dua episode sama, urutan memakai judul alfabetis.
- Daftar dimuat **12 episode** per kali; tombol **Muat lebih banyak** menambah tanpa memuat ulang.
- Jumlah yang sudah tampil diumumkan, misalnya “Menampilkan 12 dari 24 episode”.
- Episode tanpa narasumber tidak menampilkan baris kosong “Narasumber: —”; metadata yang belum ada disembunyikan.

### 7.6 Aturan penomoran yang terlihat pengunjung

| Keadaan | Yang tampil |
|---|---|
| Seri resmi, episode Tayang | “E-01”, “E-02”, dan seterusnya |
| Seri resmi, episode Draf | Tidak tampil di publik; nomor belum final |
| Seri dengan satu episode | “E-01” |
| Lainnya | Tanpa nomor; hanya tanggal dan durasi |
| Episode dipindahkan antar-seri | Nomor dihitung ulang pada seri baru; tautan lama tetap menuju episode yang sama bila alamatnya tidak berubah |

Nomor episode bukan bagian dari alamat halaman. Alamat episode memakai judul, sehingga perubahan nomor tidak memutus tautan.

### 7.7 Keadaan kosong dan tidak ditemukan

| Keadaan | Tampilan | Tindakan |
|---|---|---|
| Seri tidak ada | Halaman 404 dengan pesan “Program tidak ditemukan.” | Tautan ke Program & Siniar |
| Seri ada tetapi belum ada episode Tayang | Tidak dapat diakses publik; pengunjung melihat 404 | Tautan ke Program & Siniar |
| Daftar episode gagal dimuat | “Daftar episode belum dapat dimuat.” | Tombol **Muat ulang** |
| Gambar seri gagal | Latar netral dengan inisial seri | Tidak ada gambar rusak |

Seri yang belum memiliki episode Tayang tetap terlihat di panel dengan penanda “Belum tampil”, tetapi tidak boleh muncul di sitemap atau daftar publik.

### 7.8 Aksesibilitas dan SEO detail seri

- Judul halaman memakai satu `<h1>`; nama seri tidak diulang sebagai judul pada setiap kartu.
- Daftar episode memakai struktur daftar, bukan tabel tanpa header.
- Tombol urutan memberi label “Urutkan episode” dan menyatakan pilihan aktif.
- Teks alternatif gambar menjelaskan seri, bukan mengulang nama file.
- Judul tab: `Nama Seri — Radio & Siniar WBS Perpusnas`.
- Deskripsi meta memakai 1–2 kalimat pertama dari deskripsi seri.
- Halaman menyertakan remah navigasi terstruktur agar mesin pencari memahami letaknya.
- Alamat halaman stabil dan tidak berubah setelah episode terbit (`DR-05`).

---

## 8. Halaman Detail Episode (`/program/{nama-seri}/{judul-episode}`)

### 8.1 Tujuan

Menampilkan satu episode secara lengkap: pemutar YouTube, metadata, penjelasan, dan tautan ke sumber asli. Halaman ini harus tetap berguna walaupun pemutar gagal.

### 8.2 Wireframe desktop

```
[HEADER]
Beranda / Program & Siniar / Nama Seri / Judul Episode
──────────────────────────────────────────────────────────────────────────────────────────
Judul Episode
Nama Seri · E-12 · 14 Oktober 2026 · 1 jam 42 menit
──────────────────────────────────────────────────────────────────────────────────────────
[PEMUTAR YOUTUBE 16:9]                    TENTANG EPISODE
                                          Narasumber: ...
                                          Moderator: ...
                                          Topik: ...
                                          [ Tonton di YouTube ]
                                          [ Bagikan ]  [ Salin tautan ]
──────────────────────────────────────────────────────────────────────────────────────────
DESKRIPSI EPISODE
Ringkasan isi episode dalam 2–4 paragraf pendek.
──────────────────────────────────────────────────────────────────────────────────────────
[FOOTER]
[PEMUTAR PERSISTEN]
```

### 8.3 Wireframe ponsel

```
[HEADER]
Beranda / Program & Siniar / Nama Seri / Judul
──────────────────────────────────────────
Judul Episode
Nama Seri · E-12
14 Oktober 2026 · 1 j 42 m
──────────────────────────────────────────
[PEMUTAR YOUTUBE 16:9]
[ Tonton di YouTube ]
──────────────────────────────────────────
TENTANG EPISODE
Narasumber: ...
Moderator: ...
Topik: ...
[ Bagikan ] [ Salin tautan ]
──────────────────────────────────────────
DESKRIPSI EPISODE
...
──────────────────────────────────────────
[FOOTER]
[PEMUTAR PERSISTEN]
```

### 8.4 Judul dan metadata utama

| Unsur | Aturan |
|---|---|
| **Judul episode** | Judul baku, tanpa emoji, tanpa nama seri di awal, tanpa nomor dari judul asli |
| **Nama seri** | Tautan kembali ke detail seri |
| **Nomor episode** | “E-12”; disembunyikan untuk Lainnya |
| **Tanggal** | Tanggal tayang di YouTube, format panjang Indonesia |
| **Durasi** | Durasi video, bukan durasi siaran radio |
| **Topik** | Maksimal lima kata kunci; ditampilkan sebagai chip yang dapat dicari |

Baris metadata dibaca sebagai satu kalimat oleh pembaca layar, bukan lima potongan tanpa hubungan.

### 8.5 Pemutar video

Pemutar memakai sematan YouTube resmi; website tidak menyimpan berkas video.

| Keadaan | Tampilan | Tindakan |
|---|---|---|
| **Belum diputar** | Gambar pratinjau 16:9 dan tombol putar besar | Menekan gambar memuat pemutar |
| **Memuat** | Kerangka pemutar dan tulisan “Memuat video…” | Tunggu |
| **Berbunyi** | Pemutar YouTube dengan kontrol bawaan | Putar, jeda, volume, layar penuh |
| **Video tidak tersedia** | Pesan “Video ini tidak dapat diputar di sini.” | Tautan **Tonton di YouTube** |
| **Jaringan lambat** | Pratinjau tetap tampil; pemutar tidak menghalangi metadata | Coba lagi |

Aturan:

- Video **tidak** berputar otomatis.
- Pemutar baru dimuat setelah pengunjung menekan tombol, sehingga halaman tetap ringan.
- Sematan memakai mode privasi YouTube yang tidak menyimpan cookie sebelum video diputar, bila tersedia.
- Kontrol pemutar tidak ditutupi tombol berbagi atau pita pemberitahuan.
- Pada ponsel, pemutar tetap 16:9 dan tidak dipaksa layar penuh otomatis.
- Jika video dihapus dari YouTube, metadata dan penjelasan tetap tampil; halaman tidak menjadi kosong.
- Radio persisten tetap berbunyi saat video YouTube diputar? **Tidak.** Saat video dimulai, radio dijeda otomatis dan muncul pemberitahuan “Radio dijeda karena video diputar.” Pengunjung dapat melanjutkan radio setelah video selesai.

### 8.6 Panel “Tentang Episode”

| Baris | Aturan |
|---|---|
| **Narasumber** | Nama lengkap; beberapa nama dipisah titik koma; bila “Belum tercatat”, baris disembunyikan |
| **Moderator** | Sama seperti narasumber |
| **Topik** | Chip; menekan chip membuka pencarian topik tersebut |
| **Tanggal dan durasi** | Sudah tampil di bawah judul; tidak diulang di panel |
| **Tautan YouTube** | Selalu tersedia, termasuk saat pemutar gagal |
| **Berbagi** | WhatsApp dan salin tautan; tanpa pelacakan pribadi |

Panel tidak menampilkan jumlah tayangan, jumlah suka, komentar, atau rekomendasi algoritmik YouTube.

### 8.7 Deskripsi episode

- Diambil dari isian “Ringkasan episode” di panel.
- Ditampilkan dalam 2–4 paragraf pendek, maksimal sekitar 1.500 karakter.
- Bila deskripsi kosong, seluruh bagian disembunyikan; tidak ada teks “Belum ada deskripsi”.
- Tautan di dalam deskripsi dibuka di tab baru dan diberi penanda keluar.
- Deskripsi tidak boleh memuat HTML, skrip, atau kode sematan.
- Teks promosi panjang dari YouTube tidak disalin otomatis.

### 8.8 Episode terkait

Fitur ini berprioritas **N** dan **tidak dibangun pada tahap ini**. Tempatnya tidak dicadangkan, sehingga halaman tidak menampilkan blok kosong. Bila diaktifkan pada tahap lanjutan, isinya maksimal tiga episode dari seri yang sama dan tidak boleh mengulang episode yang sedang dibuka.

### 8.9 Berbagi episode

| Tindakan | Perilaku |
|---|---|
| **Bagikan** | Membuka pilihan berbagi perangkat bila tersedia; bila tidak, menampilkan WhatsApp dan salin tautan |
| **Salin tautan** | Menyalin alamat halaman; muncul konfirmasi “Tautan disalin.” |
| **WhatsApp** | Membuka WhatsApp dengan judul episode dan tautan |
| **Tanpa pelacakan** | Tidak ada piksel pelacak atau parameter pelacakan pribadi pada tautan yang dibagikan |

Tautan yang dibagikan selalu menuju halaman episode, bukan langsung ke YouTube, agar penerima melihat konteks seri dan metadata.

### 8.10 Keadaan galat dan aksesibilitas

| Keadaan | Pesan | Tindakan |
|---|---|---|
| Episode tidak ada | “Episode tidak ditemukan.” | Kembali ke seri atau Program & Siniar |
| Episode sudah Arsip Internal | Halaman 404; tidak membocorkan alasan internal | Kembali ke seri |
| Video gagal dimuat | “Video ini tidak dapat diputar di sini.” | Tonton di YouTube |
| Tautan YouTube rusak | Pesan yang sama; metadata tetap tampil | Laporkan melalui Kontak |
| Deskripsi kosong | Bagian disembunyikan | — |
| Gambar gagal | Latar netral dengan judul episode | — |

- Pemutar YouTube memiliki judul yang dapat dibaca pembaca layar.
- Tombol putar kustom memiliki label “Putar video: Judul Episode”.
- Fokus berpindah ke pemutar setelah dimuat, lalu dapat dilanjutkan dengan Tab.
- Transkrip belum tersedia pada tahap ini (`M-13`); halaman tidak menjanjikan transkrip.
- Warna chip topik memiliki kontras yang cukup dan tidak hanya mengandalkan warna.

### 8.11 SEO dan data terstruktur

- Judul tab: `Judul Episode — Nama Seri — Radio & Siniar WBS Perpusnas`.
- Deskripsi meta memakai 1–2 kalimat pertama deskripsi episode.
- Halaman menyertakan data terstruktur episode video: judul, gambar pratinjau, tanggal tayang, durasi, dan alamat sematan.
- Remah navigasi ditandai sebagai data terstruktur.
- Halaman episode masuk sitemap; halaman pratinjau dan episode Arsip Internal tidak.
- Tautan kanonik menunjuk alamat episode sendiri, bukan halaman seri.
- Tanggal tayang yang ditampilkan sama dengan tanggal pada data katalog, bukan tanggal unggah ulang.

---

## 9. Halaman Hasil Pencarian (`/cari?q=...`)

### 9.1 Titik masuk pencarian

| Titik masuk | Perilaku |
|---|---|
| **Ikon Cari di header** | Membuka kolom pencarian di tempat; Enter membuka `/cari?q=...` |
| **Kolom di Program & Siniar** | Menyaring seri dan menampilkan maksimal tiga episode; tautan ke hasil lengkap |
| **Tautan Pencarian di footer** | Membuka halaman pencarian dengan kolom kosong |
| **Chip topik di detail episode** | Membuka pencarian dengan topik tersebut |
| **Tautan “Lihat semua hasil”** | Membuka hasil lengkap untuk kata kunci yang sedang dipakai |

Tidak ada pintasan papan tunas khusus yang perlu dihafal pengunjung.

### 9.2 Wireframe

```
[HEADER]
Beranda / Pencarian
──────────────────────────────────────────────────────────────────────────────────────────
Pencarian
[ Cari judul episode, nama seri, narasumber, atau topik... ]   [ Cari ]
──────────────────────────────────────────────────────────────────────────────────────────
Hasil untuk “naskah” · 12 hasil
──────────────────────────────────────────────────────────────────────────────────────────
SERI
[Kartu Seri]   [Kartu Seri]
──────────────────────────────────────────────────────────────────────────────────────────
EPISODE
[Kartu Episode]  Judul · Nama Seri · tanggal · durasi
[Kartu Episode]  ...
[Kartu Episode]  ...
                                         [ Muat lebih banyak ]
──────────────────────────────────────────────────────────────────────────────────────────
[FOOTER]
[PEMUTAR PERSISTEN]
```

### 9.3 Aturan kata kunci

| Hal | Aturan |
|---|---|
| **Panjang minimal** | 2 karakter setelah spasi tepi dibuang |
| **Huruf besar/kecil** | Tidak dibedakan |
| **Ejaan** | Pencocokan sederhana; tidak menjanjikan koreksi salah ketik |
| **Bidang yang dicari** | Judul episode, nama seri, narasumber, moderator, dan topik |
| **Tidak dicari** | Judul asli YouTube yang masih mengandung emoji, isi deskripsi panjang, nama file |
| **Kata umum** | Kata seperti “dan”, “di”, “yang” diabaikan bila terlalu banyak hasil |
| **Beberapa kata** | Dianggap satu frasa; urutan kata tidak harus sama persis bila hasil terlalu sedikit |
| **Batas hasil** | Maksimal 20 episode per halaman; seri maksimal 5 kartu |

Pencarian tidak boleh mengembalikan episode Draf atau Arsip Internal, meskipun kata kuncinya cocok.

### 9.4 Susunan hasil

Hasil dibagi menjadi dua kelompok:

1. **Seri** — maksimal lima kartu seri yang namanya cocok.
2. **Episode** — kartu episode yang judul, narasumber, moderator, atau topiknya cocok.

| Unsur | Aturan |
|---|---|
| **Ringkasan** | “Hasil untuk ‘kata kunci’ · N hasil” |
| **Urutan episode** | Relevansi judul lebih dahulu, lalu tanggal terbaru |
| **Maksimal kartu** | 20 episode per halaman |
| **Muat lebih banyak** | Menambah hasil tanpa memuat ulang |
| **Tidak ada hasil** | Pesan dan saran, bukan halaman kosong |
| **Kata kunci kosong** | Menampilkan petunjuk pencarian dan seri populer, bukan hasil acak |

Kata kunci yang cocok tidak perlu disorot dengan warna latar yang mengganggu; cukup tebal pada judul bila mudah diterapkan.

### 9.5 Keadaan kosong

| Keadaan | Tampilan | Tindakan |
|---|---|---|
| Kata kunci kurang dari 2 karakter | “Ketik minimal 2 karakter.” | Kolom tetap fokus |
| Tidak ada hasil | “Tidak ada hasil untuk ‘kata kunci’.” | Saran: periksa ejaan, pakai kata yang lebih pendek, jelajahi Program & Siniar |
| Pencarian gagal | “Pencarian belum dapat dilakukan.” | Tombol **Coba lagi** |
| Hasil hanya seri | Tampilkan kartu seri dan keterangan “Belum ada episode yang cocok.” | Tautan ke seri |
| Hasil hanya episode | Tampilkan episode tanpa kelompok seri | — |

Saran kata kunci diambil dari nama kategori dan nama seri, bukan dari riwayat pencarian pribadi.

### 9.6 Alamat dan riwayat

- Kata kunci disimpan pada alamat `/cari?q=...` agar hasil dapat dibagikan dan dimuat ulang.
- Menekan tombol kembali mengembalikan kata kunci dan posisi gulir sebelumnya.
- Kata kunci tidak disimpan di peramban setelah tab ditutup.
- Halaman hasil pencarian memakai `noindex` agar tidak muncul sebagai halaman tanpa konteks di mesin pencari.
- Kata kunci tidak dikirim ke GA4 sebagai parameter yang dapat memuat data pribadi; yang dicatat hanya peristiwa pencarian tanpa isi kata kunci.

### 9.7 Aksesibilitas dan performa

- Kolom pencarian memiliki label yang terlihat, bukan hanya placeholder.
- Jumlah hasil diumumkan melalui area pemberitahuan halus setelah pencarian selesai.
- Setiap kartu hasil dapat difokuskan dan memiliki teks tautan yang bermakna.
- Pencarian menunggu 300 milidetik setelah pengetikan berhenti.
- Hasil dimuat bertahap; halaman tidak menunggu seluruh 331 episode diperiksa di peramban.
- Bila jaringan lambat, kerangka hasil tampil dan kolom tetap dapat dipakai.

---

## 10. Halaman Tentang WBS (`/tentang`)

### 10.1 Tujuan

Menjelaskan siapa yang mengelola layanan, apa yang ditawarkan, dan mengapa layanan ini penting. Halaman ini memberi kredibilitas lembaga, bukan menjadi brosur panjang.

### 10.2 Wireframe

```
[HEADER]
Beranda / Tentang WBS
──────────────────────────────────────────────────────────────────────────────────────────
Tentang WBS
Radio & Siniar Widya Bahana Swara
──────────────────────────────────────────────────────────────────────────────────────────
[Gambar utama 16:9]
Profil singkat layanan (2–3 paragraf)
──────────────────────────────────────────────────────────────────────────────────────────
Visi
[satu paragraf]
Misi
[daftar 3–5 butir]
──────────────────────────────────────────────────────────────────────────────────────────
Sejarah Singkat
[2–3 paragraf atau garis waktu ringkas]
──────────────────────────────────────────────────────────────────────────────────────────
Tim Layanan
[Foto]  Nama  · Peran
[Foto]  Nama  · Peran
──────────────────────────────────────────────────────────────────────────────────────────
Kanal Resmi
[Instagram] [YouTube] [WhatsApp]
──────────────────────────────────────────────────────────────────────────────────────────
[FOOTER]
[PEMUTAR PERSISTEN]
```

### 10.3 Blok dan aturan

| Blok | Isi | Aturan |
|---|---|---|
| **Pembuka** | Judul, satu kalimat pengantar, gambar utama | Gambar wajib memiliki teks alternatif; bila kosong, blok tetap tampil tanpa gambar |
| **Profil** | 2–3 paragraf tentang layanan | Ditulis pustakawan; bukan salinan utuh halaman Perpusnas |
| **Visi** | Satu paragraf | Tidak diubah menjadi slogan pemasaran |
| **Misi** | 3–5 butir | Daftar bernomor atau berbutir, bukan paragraf padat |
| **Sejarah** | 2–3 paragraf atau garis waktu | Tahun penting boleh ditonjolkan; tanpa klaim yang belum terverifikasi |
| **Tim** | Foto, nama, peran | Hanya orang yang menyetujui namanya ditampilkan; tanpa data pribadi seperti nomor telepon |
| **Kanal resmi** | Tautan media sosial aktif | Hanya kanal resmi (`PR-41`); tautan dibuka di tab baru |
| **Ajakan** | “Dengarkan radio” atau “Jelajahi program” | Satu ajakan saja, tidak bersaing dengan isi |

### 10.4 Keadaan kosong dan galat

| Keadaan | Tampilan |
|---|---|
| Halaman belum diterbitkan | Tidak dapat diakses publik; 404 |
| Gambar utama gagal | Blok teks tetap tampil tanpa ruang gambar kosong |
| Foto tim gagal | Inisial nama dalam lingkaran netral |
| Kanal sosial belum diisi | Bagian kanal resmi disembunyikan |
| Isi gagal dimuat | “Halaman ini belum dapat dimuat.” dengan tombol **Muat ulang** |

### 10.5 Aksesibilitas dan SEO

- Struktur judul berurutan: satu `<h1>`, lalu `<h2>` untuk Visi, Misi, Sejarah, Tim.
- Foto tim memakai teks alternatif “Nama, Peran”.
- Halaman dapat diindeks dan masuk sitemap.
- Judul tab: `Tentang WBS — Radio & Siniar WBS Perpusnas`.
- Deskripsi meta memakai ringkasan 40–200 karakter dari panel.

---

## 11. Halaman Kontak (`/kontak`)

### 11.1 Tujuan

Memberi jalan komunikasi resmi di luar pertanyaan On-Air. Halaman ini **bukan** kanal pertanyaan siaran dan tidak memiliki formulir pertanyaan.

### 11.2 Wireframe

```
[HEADER]
Beranda / Kontak
──────────────────────────────────────────────────────────────────────────────────────────
Kontak
Hubungi Layanan Radio & Siniar WBS Perpusnas.
──────────────────────────────────────────────────────────────────────────────────────────
ALAMAT
Perpustakaan Nasional RI
[alamat lengkap]
[ Lihat di peta ]

SUREL
[alamat surel resmi]

TELEPON
[nomor telepon]

JAM LAYANAN
[hari dan jam, WIB]
──────────────────────────────────────────────────────────────────────────────────────────
KANAL PENGADUAN
[tautan resmi Perpusnas]
──────────────────────────────────────────────────────────────────────────────────────────
IKUTI KAMI
[Instagram] [Facebook] [X] [YouTube] [WhatsApp]
──────────────────────────────────────────────────────────────────────────────────────────
[FOOTER]
[PEMUTAR PERSISTEN]
```

### 11.3 Aturan isi

| Unsur | Aturan |
|---|---|
| **Alamat** | Diambil dari Pengaturan Situs; sama persis dengan footer |
| **Surel** | Tautan `mailto:` yang dapat ditekan di ponsel |
| **Telepon** | Tautan `tel:`; format mudah dibaca |
| **Jam layanan** | Menyebut WIB; tidak menjanjikan layanan 24 jam selain siaran |
| **Peta** | Tautan ke peta resmi, bukan sematan peta interaktif yang berat |
| **Kanal pengaduan** | Hanya alamat resmi Perpusnas |
| **Media sosial** | Hanya kanal aktif; yang kosong tidak ditampilkan |
| **Tanpa formulir** | Tidak ada kolom pesan umum pada tahap ini |

### 11.4 Mengapa tidak ada formulir kontak

Pertanyaan pendengar memiliki alur khusus yang hanya terbuka saat siaran interaktif. Menambahkan formulir umum akan mencampur dua jenis pesan, memperbesar risiko spam, dan membingungkan pengunjung tentang ke mana pesan mereka pergi. Untuk keperluan umum, pengunjung diarahkan ke surel, telepon, atau kanal pengaduan resmi.

### 11.5 Keadaan kosong dan aksesibilitas

- Bila satu data kontak belum diisi, baris tersebut disembunyikan; tidak ada tulisan “-” atau “belum tersedia”.
- Bila semua data kontak kosong, halaman menampilkan “Informasi kontak belum tersedia.” dan tautan ke situs utama Perpusnas.
- Alamat surel ditulis sebagai teks yang dapat dibaca, bukan gambar.
- Tautan telepon dan surel memiliki label yang jelas bagi pembaca layar.
- Tautan peta dan kanal pengaduan dibuka di tab baru dengan penanda “terbuka di tab baru”.
- Kontras teks pada latar netral memenuhi 4,5:1.

---

## 12. Halaman Kebijakan Privasi (`/kebijakan-privasi`)

### 12.1 Tujuan

Menjelaskan data apa yang dikumpulkan, mengapa, berapa lama, dan bagaimana pengunjung dapat meminta penghapusan. Halaman ini wajib terbit sebelum formulir pertanyaan dan GA4 diaktifkan.

### 12.2 Isi wajib

| Bagian | Yang dijelaskan |
|---|---|
| **Data yang dikumpulkan** | Nama (boleh samaran atau “Anonim”) dan isi pertanyaan; data kunjungan agregat dari GA4 |
| **Tujuan** | Pertanyaan dibacakan saat siaran dan disimpan sebagai arsip; GA4 untuk statistik kunjungan dan sebaran wilayah |
| **Dasar penggunaan** | Persetujuan pengunjung saat mengirim pertanyaan dan kepentingan layanan publik |
| **Penyimpanan** | Data pertanyaan disimpan di panel sampai dihapus; tidak ada penghapusan otomatis |
| **Penghapusan** | Admin atau Superadmin dapat menghapus pertanyaan kapan saja; pengunjung dapat meminta melalui Kontak |
| **Tidak ditampilkan publik** | Pertanyaan tidak pernah muncul di halaman publik |
| **Data yang tidak diambil** | Alamat IP, lokasi, surel, atau nomor telepon pengirim pertanyaan |
| **Analitik** | GA4 dengan IP teranonimasi; tidak untuk iklan; tidak menampilkan data tingkat pengunjung |
| **Cookie** | Penjelasan cookie yang dipakai analitik dan pemutar YouTube |
| **Kontak** | Surel atau kanal pengaduan resmi untuk pertanyaan privasi |
| **Tanggal berlaku** | Tanggal versi kebijakan terakhir |

### 12.3 Susunan halaman

```
[HEADER]
Beranda / Kebijakan Privasi
──────────────────────────────────────────────────────────────────────────────────────────
Kebijakan Privasi
Terakhir diperbarui: 17 November 2026
──────────────────────────────────────────────────────────────────────────────────────────
[ Daftar isi singkat dengan tautan ke bagian ]
──────────────────────────────────────────────────────────────────────────────────────────
1. Data yang kami kumpulkan
2. Mengapa data dikumpulkan
3. Berapa lama data disimpan
4. Siapa yang dapat melihat data
5. Analitik dan cookie
6. Hak Anda
7. Hubungi kami
──────────────────────────────────────────────────────────────────────────────────────────
[FOOTER]
[PEMUTAR PERSISTEN]
```

### 12.4 Aturan tampilan

- Lebar baris 65–75 karakter; ukuran teks minimal 16 px.
- Daftar isi membantu pengunjung menuju bagian tertentu tanpa menggulir panjang.
- Istilah teknis dijelaskan di tempat pertama kali muncul, misalnya “IP teranonimasi”.
- Tidak ada teks hukum yang menyembunyikan praktik sebenarnya; isi harus cocok dengan dokumen `03` Bagian 10.2.
- Tanggal “terakhir diperbarui” berubah setiap kali isi disetujui.
- Halaman dapat dicetak dengan baik; menu dan pemutar tidak ikut tercetak.
- Tautan keluar dibuka di tab baru dan diberi penanda.

### 12.5 Analitik dan cookie

| Hal | Aturan |
|---|---|
| **GA4** | Baru aktif setelah halaman ini terbit dan `D-7` tersedia |
| **IP** | Teranonimasi; tidak disimpan mentah di basis data aplikasi |
| **Cookie iklan** | Tidak dipakai |
| **Cookie YouTube** | Baru muncul setelah video diputar; dijelaskan di kebijakan |
| **Pilihan pengunjung** | Bila kebijakan mensyaratkan persetujuan, tampilkan pilihan sederhana; jangan memaksa tanpa penjelasan |
| **Penolakan** | Pengunjung yang menolak analitik tetap dapat memakai seluruh halaman dan pemutar radio |

### 12.6 Aksesibilitas dan SEO

- Halaman dapat diakses dari footer di semua halaman.
- Halaman masuk sitemap dan dapat diindeks.
- Judul tab: `Kebijakan Privasi — Radio & Siniar WBS Perpusnas`.
- Daftar isi memakai tautan dalam halaman yang dapat difokuskan.
- Halaman tidak boleh berstatus Draf saat peluncuran (`03` Bagian 5.9).

---

## 13. Halaman 404 serta Keadaan Kosong, Memuat, dan Galat

### 13.1 Halaman 404

Halaman 404 tetap menampilkan pemutar radio agar siaran tidak terputus saat tautan salah.

```
[HEADER]
──────────────────────────────────────────────────────────────────────────────────────────
Halaman tidak ditemukan
Tautan yang Anda buka mungkin sudah berubah atau tidak pernah ada.
[ Kembali ke Beranda ]   [ Jelajahi Program & Siniar ]   [ Lihat Jadwal ]
──────────────────────────────────────────────────────────────────────────────────────────
[FOOTER]
[PEMUTAR PERSISTEN]
```

Aturan:

- Nada pesan tenang, tidak menyalahkan pengunjung.
- Tidak menampilkan kode teknis, jejak galat, atau alamat internal.
- Tiga tautan pemulihan selalu tersedia.
- Pemutar tetap berfungsi.
- Halaman 404 tidak diindeks mesin pencari.
- Bila pengunjung mencapai 404 karena episode dihapus, jangan menjelaskan alasan internal; cukup arahkan ke seri atau katalog.

### 13.2 Perbedaan jenis ketidaktersediaan

| Keadaan | Yang dilihat pengunjung | Status yang tepat |
|---|---|---|
| Alamat tidak pernah ada | Halaman 404 umum | 404 |
| Episode atau seri tidak ditemukan | 404 dengan pesan “Episode/Program tidak ditemukan.” | 404 |
| Episode berstatus Arsip Internal | 404; alasan internal tidak dibocorkan | 404 |
| Halaman statis belum terbit | 404 | 404 |
| Konten pernah ada dan dialihkan | Halaman tujuan baru | Pengalihan permanen |

Website tidak menampilkan halaman “konten ini disembunyikan” karena dapat membocorkan proses internal panel.

### 13.3 Keadaan kosong di seluruh halaman

| Halaman | Keadaan | Teks | Tindakan |
|---|---|---|---|
| Beranda | Belum ada episode Tayang | “Episode pertama akan segera hadir.” | Program & Siniar |
| Beranda | Tidak ada acara mendatang | Blok disembunyikan | — |
| Beranda | Jadwal belum tersedia | “Jadwal siaran belum tersedia.” | Jadwal |
| Jadwal | Tab tanpa data | “Belum ada jadwal untuk hari ini.” | Tab lain |
| Program | Kategori tanpa seri | “Belum ada seri pada kategori ini.” | Lihat semua |
| Program | Pencarian tanpa hasil | “Tidak ada hasil untuk ‘...’.” | Hapus kata kunci |
| Detail Seri | Belum ada episode Tayang | Tidak diakses publik; 404 | Program & Siniar |
| Detail Episode | Deskripsi kosong | Bagian disembunyikan | — |
| Pencarian | Kata kunci kosong | Petunjuk pencarian dan seri populer | Pilih seri |
| Pencarian | Tidak ada hasil | Saran kata kunci | Program & Siniar |
| Tentang | Kanal sosial kosong | Bagian disembunyikan | — |
| Kontak | Data kontak kosong | “Informasi kontak belum tersedia.” | Situs Perpusnas |
| Tanya Jawab | Sesi tertutup | “Sesi tanya jawab untuk program ini telah berakhir.” | Lihat jadwal |
| Acara | Tidak ada acara | Blok disembunyikan | — |

### 13.4 Keadaan memuat

| Komponen | Tampilan memuat | Batas kewajaran |
|---|---|---|
| Hero beranda | Teks status ringkas, bukan kotak kosong besar | Teks tampil lebih dahulu |
| Kartu seri dan episode | Kerangka kartu dengan ukuran akhir | Tidak berkedip cepat |
| Jadwal | Kerangka baris | Tabel tampil setelah data siap |
| Pencarian | Kerangka hasil setelah 300 milidetik | Kolom tetap dapat dipakai |
| Pemutar radio | “Menyambungkan siaran…” | Tombol batal tersedia |
| Pemutar YouTube | Pratinjau dan tulisan “Memuat video…” | Metadata tetap tampil |

Kerangka muat tidak boleh dipakai lebih dari beberapa detik tanpa penjelasan. Bila data tidak kunjung datang, tampilkan keadaan galat dengan tombol **Coba lagi**.

### 13.5 Keadaan galat

| Sumber galat | Pesan pengunjung | Tindakan |
|---|---|---|
| Jaringan terputus | “Sambungan terputus. Periksa jaringan Anda.” | Coba lagi |
| Jadwal gagal dimuat | “Jadwal belum dapat dimuat.” | Muat ulang |
| Katalog gagal dimuat | “Program belum dapat dimuat.” | Muat ulang |
| Pencarian gagal | “Pencarian belum dapat dilakukan.” | Coba lagi |
| Aliran radio gagal | “Siaran sedang gangguan. Coba lagi.” | Coba lagi |
| Video YouTube gagal | “Video ini tidak dapat diputar di sini.” | Tonton di YouTube |
| Gambar gagal | Latar netral atau inisial | — |
| Halaman statis gagal | “Halaman ini belum dapat dimuat.” | Muat ulang |

Aturan pesan galat:

- Sebut apa yang gagal dan apa yang dapat dilakukan, bukan kode kesalahan.
- Jangan menyalahkan pengunjung.
- Jangan menampilkan alamat server, nama tabel, atau jejak teknis.
- Bila satu bagian gagal, bagian lain tetap tampil.
- Pemutar radio tetap dicoba walaupun katalog gagal.

### 13.6 Nada dan panjang pesan

| Jenis pesan | Panjang maksimal | Contoh |
|---|---|---|
| Keadaan kosong | 120 karakter | “Belum ada episode pada seri ini.” |
| Galat | 160 karakter | “Jadwal belum dapat dimuat. Coba muat ulang.” |
| Konfirmasi | 100 karakter | “Pertanyaan Anda sudah diterima. Terima kasih.” |
| Bantuan | 200 karakter | “Ketik minimal 2 karakter untuk mulai mencari.” |

Pesan tidak memakai tanda seru berlebihan, huruf kapital semua, atau istilah internal seperti “API”, “server”, “payload”, atau “timeout”.

---

## 14. Komponen Tanya Jawab dan Acara Mendatang

### 14.1 Anatomi komponen Tanya Jawab

```
[KARTU TANYA JAWAB]
Punya pertanyaan untuk penyiar?
Indonesia Pagi Ini · 08.00–10.00 WIB
Sesi dibuka sampai 10.15 WIB.

Nama
[ Isi nama atau tulis “Anonim” ]

Pertanyaan
[ Tulis pertanyaan Anda... ]
0/500

[ Kirim Pertanyaan ]

Pertanyaan tidak ditampilkan di halaman publik.
Dengan mengirim, Anda menyetujui Kebijakan Privasi.
```

| Unsur | Aturan |
|---|---|
| **Judul** | “Punya pertanyaan untuk penyiar?” (atau “Punya pertanyaan untuk narasumber [Nama Acara]?” saat sesi dibuka untuk Acara Khusus/Live YouTube) |
| **Nama program** | Nama program aktif dan jamnya |
| **Sisa waktu** | Hanya tampil bila sesi akan berakhir; tidak memakai hitung mundur yang berkedip |
| **Nama** | Wajib; 2–60 karakter; boleh “Anonim” atau nama samaran |
| **Pertanyaan** | Wajib; 10–500 karakter; teks biasa; tanpa tautan |
| **Penghitung** | Menampilkan jumlah karakter; berubah warna mendekati batas, tetap disertai teks |
| **Tombol kirim** | Aktif hanya bila nama dan pertanyaan memenuhi syarat |
| **Catatan privasi** | Satu kalimat dan tautan ke Kebijakan Privasi |
| **Tanpa unggahan** | Tidak ada lampiran, foto, atau tautan |

### 14.2 Keadaan komponen

| Keadaan | Kapan | Tampilan | Tindakan |
|---|---|---|---|
| **Belum dibuka** | Sesi belum dibuat atau belum dibuka | Kartu tidak muncul | — |
| **Menunggu jam** | Sesi dibuka, program belum mulai | “Sesi tanya jawab dibuka saat program berlangsung.” | Lihat jadwal |
| **Terbuka** | Sesi Terbuka dan berada dalam jam program atau masa tenggang 15 menit | Formulir lengkap | Kirim pertanyaan |
| **Mengirim** | Setelah tombol ditekan | Tombol “Mengirim…” dan kolom tidak dapat diubah | Tunggu |
| **Terkirim** | Server menerima pertanyaan | “Pertanyaan Anda sudah diterima. Terima kasih.” | Tutup atau lihat jadwal |
| **Gagal** | Jaringan atau server gagal | “Pertanyaan belum terkirim. Coba lagi.” Isian tetap ada | Coba lagi |
| **Terlalu cepat** | Lebih dari tiga kiriman dalam 10 menit | “Terlalu banyak pertanyaan dalam waktu singkat. Coba lagi beberapa menit lagi.” | Tunggu |
| **Ditutup** | Sesi tertutup atau masa tenggang lewat | “Sesi tanya jawab untuk program ini telah berakhir.” | Lihat jadwal |
| **Di luar jam** | Program belum mulai atau sudah lewat | “Sesi tanya jawab dibuka saat program berlangsung.” | Lihat jadwal |
| **Program noninteraktif** | Program tidak bertanda interaktif | Kartu tidak muncul | — |

Keadaan **terkirim** tidak menampilkan isi pertanyaan kembali, karena pertanyaan tidak dipublikasikan. Pengunjung hanya menerima konfirmasi.

### 14.3 Teks baku komponen

| Keadaan | Teks |
|---|---|
| Judul | “Punya pertanyaan untuk penyiar?” (atau “Punya pertanyaan untuk narasumber [Nama Acara]?” saat sesi dibuka untuk Acara Khusus/Live YouTube) |
| Bantuan nama | “Isi nama atau tulis ‘Anonim’.” |
| Bantuan pertanyaan | “Tulis pertanyaan dengan jelas, 10–500 karakter.” |
| Sebelum dibuka | “Sesi tanya jawab dibuka saat program berlangsung.” |
| Terbuka | “Sesi dibuka sampai [jam] WIB.” |
| Terkirim | “Pertanyaan Anda sudah diterima. Terima kasih.” |
| Gagal | “Pertanyaan belum terkirim. Coba lagi.” |
| Terlalu cepat | “Terlalu banyak pertanyaan dalam waktu singkat. Coba lagi beberapa menit lagi.” |
| Ditutup | “Sesi tanya jawab untuk program ini telah berakhir.” |
| Privasi | “Pertanyaan tidak ditampilkan di halaman publik.” |

Teks tidak menyebut “moderasi”, “antrean”, atau “panel” karena istilah itu milik pengelola, bukan pengunjung.

### 14.4 Validasi dan pesan galat

| Isian | Syarat | Pesan bila salah |
|---|---|---|
| **Nama** | Tidak kosong | “Isi nama atau tulis Anonim.” |
| **Nama** | 2–60 karakter | “Nama maksimal 60 karakter.” |
| **Pertanyaan** | Tidak kosong | “Tuliskan pertanyaan Anda.” |
| **Pertanyaan** | Minimal 10 karakter | “Pertanyaan terlalu pendek. Tuliskan dengan jelas.” |
| **Pertanyaan** | Maksimal 500 karakter | “Pertanyaan maksimal 500 karakter.” |
| **Pertanyaan** | Tanpa tautan | “Pertanyaan tidak boleh memuat tautan.” |
| **Sesi** | Masih terbuka | “Sesi tanya jawab untuk program ini telah berakhir.” |
| **Jam** | Di dalam program atau masa tenggang | “Sesi tanya jawab dibuka saat program berlangsung.” |
| **Batas kirim** | Maksimal tiga per 10 menit | “Terlalu banyak pertanyaan dalam waktu singkat.” |

Pesan galat tampil di bawah kolom yang bermasalah dan diumumkan pembaca layar. Fokus berpindah ke kolom pertama yang salah, bukan ke atas halaman.

### 14.5 Setelah pertanyaan dikirim

1. Tombol berubah menjadi “Mengirim…”; kolom dikunci sementara.
2. Bila berhasil, formulir diganti konfirmasi dan tautan ke jadwal.
3. Bila gagal, isian dipertahankan agar pengunjung tidak mengetik ulang.
4. Pertanyaan langsung masuk panel pengelola; tidak ada pra-moderasi (`M-07`).
5. Pertanyaan tidak pernah ditampilkan di halaman publik (`M-07`).
6. Pengunjung tidak menerima surel atau notifikasi; tidak ada kolom surel.

### 14.6 Batas pengiriman dan spam

| Aturan | Tampilan |
|---|---|
| Maksimal tiga pertanyaan per 10 menit per sesi per peramban | Pesan “Terlalu banyak pertanyaan…” |
| Satu kolom jebakan yang tidak terlihat | Tidak terlihat pengunjung; diisi bot, kiriman ditolak |
| Tanpa CAPTCHA gambar | Tidak membebani pengunjung |
| Tanpa penyimpanan IP | Tidak ada data lokasi pengirim |
| Sesi tertutup menolak kiriman | Pesan sesi berakhir |

Bila pengunjung mengetik panjang lalu sesi menutup, isian tidak hilang. Setelah sesi berakhir, tombol kirim diganti keterangan dan isian tetap terlihat sampai halaman ditutup, tetapi tidak dapat dikirim.

### 14.7 Privasi komponen

- Hanya nama dan pertanyaan yang disimpan.
- Tidak ada surel, telepon, IP, atau lokasi pengirim.
- Nama boleh “Anonim”.
- Pertanyaan dapat dihapus pengelola kapan saja.
- Catatan privasi selalu terlihat sebelum tombol kirim, bukan disembunyikan di tautan kecil.
- Komponen tidak memakai cookie iklan atau pelacakan pihak ketiga.

### 14.8 Aksesibilitas komponen Tanya Jawab

- Setiap kolom memiliki label yang terlihat, bukan hanya placeholder.
- Pesan galat terhubung ke kolom melalui penanda yang dibaca pembaca layar.
- Penghitung karakter tidak mengumumkan setiap ketikan; hanya saat mendekati batas.
- Konfirmasi berhasil diumumkan melalui area pemberitahuan halus dan tetap terlihat di layar.
- Tombol kirim memiliki label “Kirim pertanyaan”, bukan hanya ikon.
- Formulir dapat diselesaikan dengan papan tunas tanpa jebakan fokus.
- Warna tombol Nonaktif tetap memiliki kontras teks yang cukup.

### 14.9 Anatomi komponen Acara Mendatang

```
[ACARA MENDATANG]
[Kartu Acara]
[Gambar 16:9]
Judul Acara
14 November 2026 · 09.00 WIB
YouTube
[ Lihat acara ]
```

| Unsur | Aturan |
|---|---|
| **Judul** | Maksimal dua baris |
| **Tanggal** | Format panjang Indonesia |
| **Jam** | Jam mulai; jam selesai ditampilkan bila tersedia |
| **Kanal** | YouTube, Instagram, Zoom, atau Tatap Muka, disertai ikon dan teks |
| **Deskripsi** | Maksimal dua baris di kartu |
| **Gambar** | 16:9; bila kosong, latar netral dengan judul |
| **Tombol** | “Lihat acara” menuju tautan acara |
| **Tautan luar** | Dibuka di tab baru dengan penanda |

### 14.10 Aturan Acara Mendatang

| Hal | Aturan |
|---|---|
| **Jumlah** | Maksimal tiga acara terdekat di beranda |
| **Status** | Hanya acara Terbit |
| **Waktu** | Hanya acara yang belum lewat |
| **Urutan** | Tanggal terdekat lebih dahulu |
| **Tanpa acara** | Blok disembunyikan seluruhnya |
| **Acara hari ini** | Dianggap selesai bila jam selesai sudah lewat; bila jam selesai kosong, tampil sampai akhir hari |
| **Kalender** | Tidak ada tampilan bulanan, pengulangan, atau undangan kalender |
| **Kanal daring** | Wajib memiliki tautan |
| **Kanal tatap muka** | Boleh tanpa tautan; alamat tempat ditulis di deskripsi |
| **Perubahan** | Perubahan dari panel terlihat pada pemuatan halaman berikutnya, paling lambat satu menit |
| **Acara lewat** | Hilang dari publik, tetap tersimpan di panel |

### 14.11 Keadaan kosong dan galat Acara Mendatang

| Keadaan | Tampilan |
|---|---|
| Tidak ada acara | Blok hilang; tidak ada ruang kosong |
| Gambar acara gagal | Latar netral dengan judul acara |
| Tautan acara tidak valid | Tombol disembunyikan; kartu tetap menampilkan informasi |
| Acara gagal dimuat | Blok hilang; bagian lain beranda tetap tampil |
| Acara sudah lewat saat halaman terbuka | Kartu hilang pada pembaruan berikutnya; tidak ada hitung mundur |

### 14.12 Aksesibilitas komponen Acara

- Kanal tidak hanya diwakili ikon; selalu ada teks “YouTube”, “Zoom”, dan seterusnya.
- Tanggal dan jam ditulis lengkap, tidak disingkat menjadi “14/11”.
- Kartu acara merupakan satu tautan yang dapat difokuskan.
- Tautan luar menyebut “terbuka di tab baru”.
- Gambar memiliki teks alternatif yang menjelaskan acara.
- Tidak ada animasi berkedip untuk menandai acara “segera”.

---

## 15. Aksesibilitas

### 15.1 Standar yang dituju

Halaman pengunjung dirancang mengikuti **WCAG 2.2 tingkat AA** pada bagian yang dapat dikendalikan website. Sematan YouTube dan kualitas transkrip berada di luar kendali penuh website, tetapi keterbatasannya harus dijelaskan kepada pengunjung.

| Prinsip | Yang dijamin |
|---|---|
| **Dapat dilihat** | Kontras cukup, teks dapat diperbesar, gambar memiliki teks alternatif, status tidak hanya warna |
| **Dapat dioperasikan** | Seluruh fungsi dapat dipakai dengan papan tunas, fokus terlihat, target sentuh cukup besar |
| **Dapat dipahami** | Bahasa sederhana, label jelas, galat menjelaskan cara memperbaiki |
| **Dapat diandalkan** | Struktur judul dan penanda halaman konsisten di semua halaman |

### 15.2 Kontras dan warna

| Unsur | Ketentuan |
|---|---|
| Teks biasa | Minimal 4,5:1 terhadap latar |
| Teks besar (≥ 24 px atau ≥ 19 px tebal) | Minimal 3:1 |
| Ikon dan garis fokus | Minimal 3:1 |
| Status siaran | Selalu disertai teks “Sedang Mengudara” atau “Sekarang” |
| Tautan dalam paragraf | Dibedakan dengan garis bawah, bukan hanya warna |
| Tombol nonaktif | Tetap terbaca, meskipun tidak dapat ditekan |

### 15.3 Papan tunas dan fokus

- Tautan **“Lewati ke konten utama”** muncul saat halaman pertama kali difokuskan.
- Urutan fokus mengikuti urutan baca: header → isi → footer → pemutar.
- Fokus selalu terlihat dengan garis tebal yang kontras.
- Tidak ada jebakan fokus pada menu, formulir, atau pemutar.
- Menu ponsel dan panel jadwal dapat ditutup dengan Esc.
- Tombol yang hanya berupa ikon memiliki label yang dibaca pembaca layar.
- Target sentuh minimal **44 × 44 px**; jarak antartombol cukup agar tidak salah tekan.

### 15.4 Struktur dan bahasa

- Setiap halaman memiliki satu judul utama.
- Bagian memakai urutan judul yang benar, tanpa melompati tingkat.
- Halaman memakai penanda `lang="id"`.
- Tabel jadwal memakai header kolom dan baris yang benar.
- Formulir memakai label yang terlihat, bukan hanya placeholder.
- Pesan galat menyebut nama kolom dan cara memperbaikinya.
- Singkatan dijelaskan pada kemunculan pertama, misalnya “WIB (Waktu Indonesia Barat)”.

### 15.5 Komponen yang perlu perhatian khusus

| Komponen | Ketentuan aksesibilitas |
|---|---|
| **Pemutar radio** | Tombol memiliki label “Putar siaran”/“Jeda siaran”; status diumumkan; volume dapat dioperasikan dengan papan tunas |
| **Tab jadwal** | Panah kiri/kanan, Home, dan End; tab aktif diumumkan |
| **Baris jadwal** | Dapat dibuka dengan Enter atau Spasi; status “Sekarang” terbaca |
| **Saringan kategori** | Menyatakan keadaan aktif, bukan hanya warna |
| **Pemutar YouTube** | Judul video terbaca; tombol putar kustom memiliki label; fokus berpindah setelah dimuat |
| **Formulir Tanya Jawab** | Label, pesan galat, penghitung karakter, dan konfirmasi terbaca |
| **Pemutar persisten** | Tidak menutupi isi saat layar diperbesar 200%; tetap dapat dijangkau |
| **Gambar** | Teks alternatif menjelaskan isi, bukan nama berkas |

### 15.6 Pengujian aksesibilitas

| Pengujian | Cara | Kriteria lulus |
|---|---|---|
| **Papan tunas** | Jelajahi seluruh halaman tanpa tetikus | Semua fungsi tercapai; fokus terlihat |
| **Pembaca layar** | Uji dengan NVDA atau pembaca layar bawaan | Judul, tombol, formulir, dan status terbaca wajar |
| **Perbesaran** | Perbesar 200% dan 400% | Tidak ada teks terpotong; pemutar tidak menutupi tombol |
| **Kontras** | Ukur warna teks dan latar | Memenuhi 4,5:1 atau 3:1 sesuai ukuran |
| **Kurangi gerak** | Aktifkan pengaturan perangkat | Tidak ada animasi yang mengganggu |
| **Formulir** | Kirim dengan isian salah | Fokus pindah ke kolom bermasalah; pesan terbaca |
| **Video** | Putar dengan papan tunas | Kontrol dapat dicapai; tidak ada jebakan fokus |

### 15.7 Keterbatasan yang diakui

- Transkrip episode belum tersedia pada tahap ini (`M-13`).
- Kualitas takarir YouTube bergantung pada kanal YouTube WBS.
- Siaran radio adalah audio langsung; tidak ada teks alternatif untuk isi siaran.
- Peta lokasi hanya berupa tautan, bukan peta interaktif yang dapat dibaca pembaca layar.
- Bila identitas visual final (`D-2`) menetapkan warna yang tidak lolos kontras, warna tersebut tidak dipakai untuk teks penting.

---

## 16. Performa

### 16.1 Target

| Ukuran | Target | Alat ukur |
|---|---|---|
| **LCP** (elemen terbesar tampil) | ≤ 2,5 detik pada 4G | Lighthouse dan data lapangan |
| **INP** (respons terhadap interaksi) | ≤ 200 milidetik | Data lapangan |
| **CLS** (pergeseran tata letak) | ≤ 0,1 | Lighthouse dan data lapangan |
| **Halaman inti tampil** | ≤ 3 detik pada jaringan kantor (`IK-6`) | Uji coba langsung |
| **Ukuran halaman awal** | Idealnya ≤ 1 MB tanpa video | Alat ukur jaringan peramban |
| **Jumlah permintaan awal** | Seramping mungkin; gambar dimuat bertahap | Alat ukur jaringan peramban |

### 16.2 Urutan pemuatan

1. Teks header, hero, dan tautan utama.
2. Jadwal hari ini dan episode terbaru.
3. Gambar kartu dan gambar seri.
4. Pemutar radio, setelah tombol ditekan atau setelah isi utama tampil.
5. Pemutar YouTube, hanya setelah pengunjung menekan pratinjau.

Konten utama tidak boleh menunggu pemutar radio atau YouTube. Bila pemutar lambat, pengunjung tetap dapat membaca jadwal dan katalog.

### 16.3 Aturan gambar

| Hal | Aturan |
|---|---|
| **Rasio** | 16:9 untuk semua gambar seri, episode, dan acara |
| **Format** | WebP atau format modern lain; JPEG/PNG sebagai cadangan |
| **Ukuran unggah** | Maksimal 2 MB di panel, tetapi disajikan dalam ukuran layar yang sesuai |
| **Ukuran tampil** | Beberapa varian lebar agar ponsel tidak mengunduh gambar desktop |
| **Pemuatan** | Gambar di bawah layar dimuat saat mendekati area terlihat |
| **Ruang** | Rasio gambar dicadangkan agar tata letak tidak bergeser |
| **Gagal muat** | Latar netral atau inisial; tidak ada ikon gambar rusak |

### 16.4 Pemutar dan sematan

- Radio memakai pemutar audio ringan, bukan video latar atau pustaka pemutar berat.
- Pemutar radio dimuat terpisah agar kegagalan audio tidak menghalangi halaman.
- YouTube baru dimuat setelah pengunjung menekan pratinjau.
- Pratinjau video memakai gambar 16:9, bukan iframe kosong yang langsung memuat banyak skrip.
- Bila pemutar gagal, halaman tidak memuat ulang seluruh isi.

### 16.5 Simpanan sementara dan pembaruan

- Halaman statis dan aset visual boleh disimpan sementara dalam waktu lama.
- Jadwal dan katalog boleh disimpan sementara, tetapi harus diperbarui paling lambat satu menit setelah perubahan diterbitkan.
- Halaman pencarian tidak disimpan sementara dalam waktu lama karena hasil bergantung kata kunci.
- Setelah pengelola menerbitkan perubahan, pengunjung melihat versi baru pada pemuatan halaman berikutnya.

### 16.6 Pengukuran dan pemantauan

| Waktu | Yang diukur | Penanggung jawab |
|---|---|---|
| Sebelum peluncuran | Lighthouse untuk Beranda, Jadwal, Program, Detail Episode | Pengembang dan pustakawan |
| Setiap bulan | LCP, INP, CLS, halaman terberat | Pengembang |
| Setiap ada seri besar baru | Jumlah gambar dan waktu muat halaman Program | Pengembang |
| Setelah perubahan pemutar | Uji radio dan video di ponsel | Pengembang dan Admin |

Bila salah satu target tidak tercapai, perbaikan diutamakan pada gambar, urutan pemuatan, dan sematan, bukan dengan mengurangi isi penting.

---

## 17. SEO dan Berbagi

### 17.1 Judul dan deskripsi halaman

| Halaman | Judul tab | Deskripsi meta |
|---|---|---|
| Beranda | `Radio & Siniar WBS Perpusnas` | Radio 24 jam dan katalog siniar Widya Bahana Swara Perpusnas |
| Jadwal | `Jadwal Siaran — Radio & Siniar WBS Perpusnas` | Jadwal 24 jam Hari Kerja, Sabtu, dan Minggu dalam WIB |
| Program | `Program & Siniar — Radio & Siniar WBS Perpusnas` | 21 seri dan 331 episode Radio WBS |
| Detail Seri | `Nama Seri — Radio & Siniar WBS Perpusnas` | Deskripsi seri dan daftar episode |
| Detail Episode | `Judul Episode — Nama Seri — Radio & Siniar WBS Perpusnas` | Ringkasan episode, tanggal, durasi, narasumber |
| Pencarian | `Hasil Pencarian — Radio & Siniar WBS Perpusnas` | Tidak diindeks |
| Tentang | `Tentang WBS — Radio & Siniar WBS Perpusnas` | Profil layanan Radio & Siniar WBS |
| Kontak | `Kontak — Radio & Siniar WBS Perpusnas` | Alamat, surel, telepon, dan jam layanan |
| Kebijakan Privasi | `Kebijakan Privasi — Radio & Siniar WBS Perpusnas` | Data pertanyaan, arsip, dan analitik |
| 404 | `Halaman Tidak Ditemukan — Radio & Siniar WBS Perpusnas` | Tidak diindeks |

### 17.2 Aturan alamat

- Huruf kecil, angka, dan tanda hubung; tanpa spasi dan tanpa tanda baca lain.
- Alamat seri dan episode dibuat sekali dan tidak berubah setelah terbit (`DR-05`).
- Alamat tidak memuat nomor episode, sehingga perubahan nomor tidak memutus tautan.
- Alamat pencarian memakai parameter `q`; halaman hasil tidak diindeks.
- Alamat pratinjau tidak diindeks dan tidak dibagikan ke publik.
- Bila alamat berubah karena keputusan luar biasa, alamat lama dialihkan permanen ke alamat baru.

### 17.3 Data terstruktur

| Halaman | Data terstruktur |
|---|---|
| Semua halaman | Organisasi (Perpustakaan Nasional RI) dan situs web |
| Detail Seri | Daftar episode dan remah navigasi |
| Detail Episode | Video: judul, gambar, tanggal tayang, durasi, alamat sematan |
| Tentang dan Kontak | Organisasi dan informasi kontak resmi |
| Semua halaman dalam | Remah navigasi |

Data terstruktur tidak boleh memuat metadata yang tidak tampil di halaman atau klaim yang belum benar.

### 17.4 Sitemap dan arahan mesin pencari

| Hal | Aturan |
|---|---|
| **Sitemap** | Memuat Beranda, Jadwal, Program, Tentang, Kontak, Kebijakan Privasi, 21 halaman seri, dan 331 halaman episode Tayang |
| **Tidak masuk sitemap** | Pencarian, 404, pratinjau, halaman Draf, episode Arsip Internal |
| **Berkas arahan** | Mengizinkan halaman publik; melarang pencarian, pratinjau, dan panel |
| **Pembaruan sitemap** | Otomatis saat seri atau episode baru terbit |
| **Tautan rusak** | Episode yang hilang dari YouTube tetap memiliki halaman; bukan tautan mati |

### 17.5 Berbagi ke media sosial

| Unsur | Aturan |
|---|---|
| **Gambar bawaan** | 16:9, minimal 1200 × 675 px, dari Pengaturan Situs |
| **Judul berbagi** | Judul halaman yang sedang dibuka |
| **Deskripsi berbagi** | Ringkasan halaman, bukan teks promosi panjang |
| **WhatsApp** | Judul + tautan halaman |
| **Salin tautan** | Menyalin alamat kanonik |
| **Tanpa pelacakan** | Tidak ada parameter pelacakan pribadi pada tautan yang dibagikan |
| **Tanpa tombol berlebih** | Cukup WhatsApp, salin tautan, dan berbagi perangkat bila tersedia |

### 17.6 Konten yang tidak diindeks

- Halaman hasil pencarian.
- Halaman 404.
- Pratinjau pengelola.
- Episode Draf dan Arsip Internal.
- Halaman seri yang belum memiliki episode Tayang.
- Alamat dengan parameter saringan yang tidak menghasilkan halaman baru.

---

## 18. GA4 dan Pengukuran

### 18.1 Prinsip

- GA4 dipakai untuk mengetahui **jumlah kunjungan, halaman yang dibuka, penggunaan pemutar, dan sebaran wilayah** secara agregat.
- Tidak ada data pribadi yang dikirim: tanpa nama, pertanyaan, surel, nomor telepon, atau alamat IP mentah.
- Kata kunci pencarian tidak dikirim sebagai parameter yang dapat memuat data pribadi.
- Analitik tidak dipakai untuk iklan, pembuatan profil pengunjung, atau penjualan data.
- GA4 baru aktif setelah Kebijakan Privasi terbit (`PR-15`, `PR-49`, `D-7`).

### 18.2 Peristiwa yang dicatat

| Peristiwa | Kapan | Parameter yang boleh | Parameter yang dilarang |
|---|---|---|---|
| `page_view` | Halaman dibuka | halaman, judul, jenis halaman | nama, pertanyaan, surel |
| `play_radio` | Radio mulai berbunyi | halaman asal | lokasi, IP |
| `pause_radio` | Radio dijeda | halaman asal | — |
| `play_episode` | Video YouTube dimulai | nama seri, judul episode | nama narasumber pribadi |
| `search` | Pencarian dijalankan | jumlah hasil, jenis halaman | isi kata kunci |
| `filter_category` | Chip kategori ditekan | nama kategori | — |
| `open_question_form` | Formulir Tanya Jawab terlihat | nama program | nama pengirim |
| `submit_question` | Pertanyaan berhasil dikirim | nama program | isi pertanyaan, nama |
| `click_youtube` | Tautan YouTube ditekan | nama seri, judul episode | — |
| `share` | Tombol bagikan dipakai | jenis halaman, metode | — |
| `view_event` | Kartu acara terlihat | judul acara | — |
| `click_event` | Tautan acara ditekan | judul acara, kanal | — |

### 18.3 Laporan yang dipakai

| Laporan | Isi | Pengguna |
|---|---|---|
| **Ringkasan kunjungan** | Jumlah pengunjung, halaman populer, perangkat | Superadmin |
| **Penggunaan radio** | Jumlah tekan putar dan jeda per halaman | Superadmin |
| **Katalog** | Seri dan episode paling banyak dibuka | Superadmin |
| **Pencarian** | Jumlah pencarian dan hasil kosong, tanpa kata kunci | Superadmin |
| **Wilayah** | Sebaran kota/provinsi/negara secara agregat | Superadmin |
| **Pertanyaan** | Jumlah formulir dibuka dan pertanyaan terkirim | Superadmin dan Admin |

Laporan tidak menampilkan data tingkat pengunjung dan tidak dapat dipakai untuk mengidentifikasi seseorang.

### 18.4 Persetujuan dan pengaturan

- Bila Kebijakan Privasi mensyaratkan persetujuan, tampilkan pilihan sederhana yang menjelaskan analitik dan cara menolak.
- Menolak analitik tidak mengurangi fungsi radio, katalog, atau pencarian.
- Jangan memuat GA4 sebelum pengunjung memberi persetujuan bila persetujuan diwajibkan.
- Jangan memakai cookie iklan atau pelacakan lintas situs.
- Masa simpan data analitik mengikuti pengaturan GA4, maksimal 14 bulan.

### 18.5 Pemeriksaan sebelum aktif

| Pemeriksaan | Kriteria |
|---|---|
| Kebijakan Privasi | Sudah terbit dan menyebut GA4 |
| ID GA4 | Format benar dan milik Perpusnas |
| Data pribadi | Tidak ada nama, pertanyaan, surel, atau telepon yang terkirim |
| Kata kunci | Tidak dikirim sebagai parameter |
| Panel | Tidak ikut tercatat sebagai kunjungan publik |
| Uji | Mode pratinjau GA4 menunjukkan peristiwa yang benar |

---

## 19. Rencana Uji Terima Halaman Pengunjung

### 19.1 Cara pengujian

- Diuji pada **ponsel 360 px**, tablet, dan desktop 1280 px.
- Diuji pada Chrome, Edge, Firefox, dan Safari versi umum.
- Diuji dengan papan tunas dan pembaca layar NVDA.
- Diuji dengan jaringan normal dan jaringan lambat.
- Setiap butir dinyatakan lulus bila hasilnya sesuai dan tidak ada galat yang menghalangi.

### 19.2 Butir uji

| No | Yang diuji | Hasil yang diharapkan | Rujukan |
|---|---|---|---|
| **U-01** | Buka beranda pada jam program | Nama program yang mengudara dan jam tampil benar | `PR-02`, `PR-06` |
| **U-02** | Tekan Dengarkan dari beranda | Radio berbunyi maksimal dua klik | `PR-01`, `IK-3` |
| **U-03** | Pindah ke Jadwal, Program, Episode, Tentang, Kontak | Audio tetap berjalan; nama program tetap terlihat | `PR-44`, `A-7` |
| **U-04** | Putuskan aliran audio saat radio berbunyi | Pesan “Siaran sedang gangguan” dan tombol Coba lagi tampil | `PR-39`, `R-10` |
| **U-05** | Buka halaman tanpa menekan putar | Tidak ada audio yang berbunyi otomatis | `PR-01` |
| **U-06** | Lihat hero beranda | Program berikutnya dan jam mulai tampil | `PR-04` |
| **U-07** | Periksa Episode Terbaru | Maksimal empat episode Tayang; satu video satu kartu | `PR-19`, `DR-01` |
| **U-08** | Uji chip kategori di beranda | Maksimal enam kartu tersaring; “Semua program” tetap ada | `PR-45` |
| **U-09** | Lihat Jadwal Hari Ini di beranda | Lima baris di sekitar jam sekarang; satu baris “Sekarang” | `PR-03` |
| **U-10** | Buka Jadwal dan ganti ketiga tab | Tabel 24 jam tampil; siklus 06.00–05.59 tanpa celah | `PR-03` |
| **U-11** | Tunggu pergantian jam/program | Penanda “Sekarang” berpindah dengan benar | `PR-02`, `IK-2` |
| **U-12** | Buka satu baris jadwal | Panel keterangan, tombol Dengarkan, dan label interaktif tampil | `PR-03` |
| **U-13** | Simulasikan jadwal gagal dimuat | Pesan jelas dan tombol Muat ulang tampil | `PR-33` |
| **U-14** | Buka Program & Siniar | 21 seri dan kartu “Lainnya” tampil; total 331 episode | `PR-07` |
| **U-15** | Pilih setiap kategori | Jumlah seri sesuai (10/6/3/2); “Lainnya” hanya di Semua | `PR-07` |
| **U-16** | Cari nama seri dan judul episode di halaman Program | Seri tersaring dan maksimal tiga episode cocok tampil | `PR-10` |
| **U-17** | Buka detail seri | Jumlah episode unik dan nomor E-01 dan seterusnya benar | `PR-09`, `PR-29` |
| **U-18** | Buka DP on Podcast dan Diskusi Naskah Nusantara | DP menampilkan 1 episode; Diskusi Naskah 25 episode | `DR-01` |
| **U-19** | Tekan Muat lebih banyak lalu buka detail dan kembali | Kartu bertambah; posisi gulir dipertahankan | `PR-07` |
| **U-20** | Buka detail episode | Metadata lengkap; video baru dimuat setelah pratinjau ditekan | `PR-08`, `PR-40` |
| **U-21** | Simulasikan video tidak tersedia | Metadata tetap tampil; tautan Tonton di YouTube tersedia | `R-1`, `PR-40` |
| **U-22** | Putar video saat radio berbunyi | Radio dijeda otomatis dan dapat dilanjutkan | `PR-44` |
| **U-23** | Tekan Bagikan dan Salin tautan | Tautan halaman episode tersalin; konfirmasi tampil | `PR-16` |
| **U-24** | Cari judul, seri, narasumber, dan topik di `/cari` | Hasil yang relevan tampil; hanya episode Tayang | `PR-10` |
| **U-25** | Cari kata yang tidak ada | Pesan, saran, dan tautan Program & Siniar tampil | `PR-10` |
| **U-26** | Buka Tentang dan Kontak | Isi statis tampil; data kontak sama dengan footer; tidak ada formulir kontak | `PR-13`, `PR-14` |
| **U-27** | Periksa Kebijakan Privasi dan GA4 | Kebijakan terbit; GA4 tidak aktif sebelum kebijakan terbit | `PR-15`, `PR-49` |
| **U-28** | Buka alamat yang tidak ada | Halaman 404 dengan tiga tautan pemulihan dan pemutar tetap ada | `PR-44` |
| **U-29** | Buka formulir saat sesi tertutup, di luar jam, dan terbuka | Formulir hanya tampil pada keadaan yang benar; validasi berjalan | `PR-05`, `M-19` |
| **U-30** | Kirim pertanyaan yang sah | Konfirmasi tampil; pertanyaan tidak muncul di halaman publik | `M-07`, `M-08` |
| **U-31** | Periksa Acara Mendatang | Maksimal tiga acara terdekat; blok hilang bila kosong | `M-10` |
| **U-32** | Uji papan tunas, kontras, 200% zoom, dan LCP | Semua fungsi tercapai; target performa dan aksesibilitas terpenuhi | `PR-32`, `PR-34`, `PR-33` |

### 19.3 Kriteria lulus

- **Wajib:** seluruh butir `U-01` sampai `U-32` lulus tanpa galat yang menghalangi.
- **Tidak menghalangi:** salah ejaan kecil atau jarak yang kurang rapi boleh diperbaiki setelah peluncuran, asalkan tidak mengubah makna.
- **Tidak lulus:** tautan mati, audio terputus saat pindah halaman, formulir muncul di luar sesi, atau data pribadi tampil di publik.

### 19.4 Bukti pengujian

Setiap butir dicatat pada tabel uji dengan: tanggal, perangkat, peramban, hasil, tangkapan layar bila perlu, dan nama penguji. Dokumen bukti disimpan bersama dokumen serah terima.

---

## 20. Penutup

Dokumen ini menetapkan tampilan dan perilaku seluruh halaman pengunjung: sepuluh halaman, pemutar persisten, komponen Tanya Jawab, komponen Acara Mendatang, keadaan kosong dan galat, aksesibilitas, performa, SEO, serta pengukuran GA4. Rancangan ini menjaga tiga hal:

1. **Siaran selalu menjadi fokus.** Pengunjung tahu apa yang mengudara dan dapat memutar radio tanpa kehilangan halaman.
2. **Katalog jujur dan konsisten.** Website menampilkan 331 video unik dalam 21 seri dan 82 video “Lainnya”; angka 337 tidak pernah tampil sebagai jumlah episode.
3. **Pengunjung tidak tersesat.** Lima menu, remah navigasi, pencarian, dan halaman 404 yang tetap menyiarkan radio memberi jalan kembali.

**Yang masih menunggu di luar dokumen ini:**

| Hal | Rujukan | Akibat bila belum ada |
|---|---|---|
| Alamat aliran Icecast | `D-8`, `D-10` | Pemutar radio belum dapat diaktifkan |
| Domain dan akun hosting | `D-3`, `D-4` | Situs belum dapat diluncurkan |
| Persetujuan identitas visual | `D-2` | Logo dan warna final belum dapat dipasang |
| Kebijakan privasi resmi | `D-7` | Formulir pertanyaan dan GA4 belum boleh diaktifkan |
| Penetapan akun pengelola | `D-5` | Pengisian data dan UAT panel belum dapat dijalankan |

**Langkah berikutnya.** Setelah dokumen ini disepakati, halaman pengunjung dibangun mengikuti blueprint pada Bagian 4–14, data 331 episode dimasukkan melalui panel, lalu UAT halaman pengunjung dijalankan bersama UAT panel. Setelah lulus, situs diuji pada domain terpisah dan disiapkan untuk peluncuran.

---

## Riwayat Revisi

| Versi | Tanggal | Perubahan | Penyusun |
|---|---|---|---|
| 1.0 | 17 November 2026 | Versi final awal: prinsip pengalaman pengunjung, layout global, pemutar persisten, sepuluh halaman, komponen Tanya Jawab dan Acara Mendatang, keadaan kosong dan galat, aksesibilitas, performa, SEO, GA4, dan 32 butir uji terima | Gusti Ahmad Muttahid Bilhaq |
| 1.1 | 17 November 2026 | Penyelarasan hasil audit: (1) Penghapusan tautan buntu `[Lihat semua →]` pada blok Acara Mendatang di wireframe beranda dan komponen; (2) Penambahan aturan adaptasi label Tanya Jawab untuk Acara Khusus / Siaran Langsung YouTube (`M-19`); (3) Penegasan aliran audio Icecast HTTPS pada pemutar persisten untuk situs GitHub Pages; (4) Pembaruan acuan dokumen ke `01` versi 2.2 dan `03` versi 1.2 | Gusti Ahmad Muttahid Bilhaq |
