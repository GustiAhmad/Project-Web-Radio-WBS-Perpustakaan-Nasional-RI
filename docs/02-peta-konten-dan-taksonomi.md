# Peta Konten dan Taksonomi
## Website Radio & Siniar WBS Perpusnas

| Keterangan | Isi |
|---|---|
| **Nomor Dokumen** | 02 |
| **Nama Dokumen** | Peta Konten dan Taksonomi |
| **Nama Situs** | Radio & Siniar WBS Perpusnas |
| **Versi** | 1.2 — Final |
| **Tanggal** | 17 November 2026 |
| **Status** | Final — menjadi acuan penataan katalog video dan penyusunan dokumen lanjutan |
| **Penyusun** | Gusti Ahmad Muttahid Bilhaq |
| **Pembaca Utama** | Pustakawan pengelola Layanan Radio dan Siniar WBS |
| **Acuan** | Dokumen `01` — Product Requirements Document, versi 2.2 |
| **Sumber Data** | Berkas `metadata_youtube.csv` hasil ekstraksi kanal YouTube WBS, 507 baris data |
| **Sifat Dokumen** | Final; perubahan taksonomi hanya melalui kesepakatan baru dan dicatat pada riwayat revisi |

---

## 0. Cara Membaca Dokumen Ini

Dokumen ini adalah **daftar isi resmi** katalog video dan siniar WBS. Di sini ditetapkan: ada seri apa saja, episode apa saja yang masuk ke setiap seri, dan bagaimana sebuah judul ditulis ulang menjadi judul baku. Dokumen ini menjadi pegangan saat mengisi data di panel pengelola, bukan panduan teknis pembuatan website.

Tiga hal yang perlu dipahami lebih dahulu:

1. **Seri** adalah payung besar, misalnya *LibTalk* atau *Diskusi Naskah Nusantara*. **Episode** adalah satu video di bawah payung itu. Satu episode hanya boleh berada di satu seri.
2. **Judul baku** adalah judul yang dipakai di website. Judul ini dibersihkan dari merek seri, nomor episode, emoji, dan tanda pemisah yang berlebihan. Judul asli di YouTube tidak diubah; yang berubah hanya tampilan di website.
3. **Lainnya** bukan seri. Ia adalah keranjang penampung untuk video yang tidak memenuhi syarat menjadi seri. Isinya tetap ditampilkan dan tetap diberi topik.

| Bagian | Isi Singkat |
|---|---|
| 1 | Ringkasan hasil |
| 2 | Dasar dan batas yang dipakai |
| 3 | Cara pengelompokan dilakukan |
| 4 | Empat kategori topik |
| 5 | Daftar seluruh seri |
| 6 | Rincian episode setiap seri |
| 7 | Daftar video pada keranjang “Lainnya” |
| 8 | Aturan penulisan dan penomoran |
| 9 | Peta konten ke halaman website |
| 10 | Catatan kualitas data |
| 11 | Pemeliharaan taksonomi |
| 12 | Penutup dan langkah berikutnya |

---

## 1. Ringkasan Hasil

| Ukuran | Jumlah |
|---|---|
| Baris data publik yang diolah | **337** |
| Video unik di balik baris tersebut | **331** |
| Seri resmi | **21** |
| Keranjang “Lainnya” | 1 keranjang, **82** video |
| Kategori topik | **4** |
| Rentang tayang | **2 Jul 2020 – 10 Nov 2026** |

Seluruh **337 baris** data publik berhasil ditempatkan: **255 baris** masuk ke 21 seri resmi, dan **82 baris** masuk ke keranjang “Lainnya”. Setelah 6 baris ganda digabung, katalog berisi **331 video unik**: **249 episode** pada 21 seri resmi dan **82 video** pada “Lainnya”. Tidak ada video publik yang dibuang.

Sebaran per kategori topik:

| Kategori | Video | Seri di dalamnya |
|---|---|---|
| **Layanan Perpustakaan & Profesi Pustakawan** | 176 | 10 seri + Lainnya |
| **Naskah Nusantara & Warisan Budaya** | 85 | 6 seri + Lainnya |
| **Literasi, Minat Baca & Keluarga** | 53 | 3 seri + Lainnya |
| **Sejarah, Kebudayaan & Diskusi Publik** | 23 | 2 seri + Lainnya |

Tiga temuan yang perlu diketahui pembaca:

- **LibTalk** adalah seri terbesar (41 baris), disusul **SUPER MORNING** (30) dan **Bimbingan Pemustaka & Literasi Informasi** (29).
- **82 video** tidak memenuhi syarat seri sehingga masuk “Lainnya”. Sebagian besar adalah webinar tunggal, rekaman acara khusus, dan liputan kegiatan.
- Terdapat **6 baris data berlebih** yang berasal dari 3 video yang tercatat berulang. Rinciannya pada Bagian 10.

---

## 2. Dasar dan Batas

Dokumen ini menjalankan tiga keputusan yang sudah ditetapkan pada dokumen `01`:

| Keputusan | Isi | Akibat pada dokumen ini |
|---|---|---|
| **M-03** | Pengelompokan seri dilakukan otomatis dari data judul; variasi judul dibakukan; judul yang berdiri sendiri dimasukkan ke “Lainnya” | Seluruh 337 baris dikelompokkan, bukan dipilih manual |
| **M-04** | Hanya **337 baris data publik (331 video unik)** yang diimpor | 160 video privat dan 10 video unlisted tidak masuk dokumen ini |
| **M-05** | Seluruh video publik ditayangkan | Tidak ada video publik yang disembunyikan; yang perlu ditandai hanya duplikat dan durasi sangat pendek |

Batas yang disepakati:

- **Bahasa** seluruh dokumen: Indonesia. Nama seri mengikuti ejaan yang dipakai kanal, termasuk yang berhuruf kapital semua.
- **Jam dan tanggal** memakai Waktu Indonesia Barat (WIB). Tanggal pada dokumen ini adalah tanggal tayang di YouTube.
- **Tidak ada berkas kredensial** (kunci akses, token, atau berkas rahasia) yang dikutip di sini.
- **Durasi** ditulis dalam jam dan menit, dibulatkan ke bawah. Video di bawah satu menit ditulis dalam detik.

Jumlah 337 baris berasal dari 507 baris data mentah: 337 publik, 160 privat, dan 10 unlisted. Angka 337 adalah jumlah **baris**, sedangkan video uniknya 331. Selisih 6 baris dijelaskan pada Bagian 10.

---

## 3. Cara Pengelompokan Dilakukan

### 3.1 Urutan langkah

1. **Membaca judul asli.** Setiap judul diperiksa apa adanya, termasuk emoji, huruf kapital, dan tanda baca.
2. **Mencari merek seri.** Bila judul memuat nama program yang dikenal (misalnya *LibTalk*, *SUPER MORNING*, *FGD IKON*), video langsung masuk seri tersebut.
3. **Membakukan ejaan merek.** Variasi seperti `Libtalk`, `Lib-Talks!`, `LIBTALK`, atau `LibTalks` dianggap satu seri: **LibTalk**.
4. **Memisahkan sub-seri.** Judul yang memuat *LibTalk Reference Series* atau *Kelas Literasi Referensi Libtalk* dipisahkan dari LibTalk umum karena isinya berbeda dan berpenomoran sendiri.
5. **Menguji syarat seri.** Sisa judul dihitung: bila satu nama muncul pada **tiga video atau lebih**, nama itu dijadikan seri. Bila kurang dari tiga tetapi judulnya memakai nama seri dan penomoran yang jelas, tetap dijadikan seri.
6. **Menampung sisanya.** Judul yang tidak memenuhi syarat masuk **“Lainnya”**, lalu diberi topik berdasarkan kata kunci judulnya.

### 3.2 Syarat sebuah kelompok disebut seri

| Syarat | Contoh | Keputusan |
|---|---|---|
| Muncul pada 3 video atau lebih | *PESONA NUSANTARA* (3 video) | Menjadi seri |
| Muncul pada 2 video, tetapi memakai nama dan penomoran seri | *Seri Pengantar Teori Ilmu Perpustakaan, Arsip, dan Museum* (2 bagian) | Menjadi seri |
| Muncul pada 2 video tanpa nama seri yang jelas | *Sharing Session* (2 video) | Masuk “Lainnya” |
| Hanya 1 video | *Ibu Deputi On Podcast* | Masuk “Lainnya” |

### 3.3 Pembakuan judul episode

Judul baku dibuat dengan urutan pembersihan berikut:

| Langkah | Yang dihapus atau dirapikan | Contoh sebelum → sesudah |
|---|---|---|
| 1 | Emoji dan simbol hias | `🔴 LibTalks MENULIS ESAI…` → `MENULIS ESAI…` |
| 2 | Merek seri di awal atau akhir judul | `SUPER MORNING #2 \| Menjajaki Masa Lampau…` → `Menjajaki Masa Lampau…` |
| 3 | Nomor episode dari judul asli | `#04 LibTalk : Pustakawan Tanpa Batas` → `Pustakawan Tanpa Batas` |
| 4 | Tanda pemisah berlebih (`\|`, `:`, `-`) di awal dan akhir | `Diskusi JASMERAH \| Mengenal Dunia Maritim…` → `Mengenal Dunia Maritim…` |
| 5 | Tanggal dalam tanda kurung di akhir judul | `AP PASTI Menyapa #002 (21 Juli 2020)` → `AP PASTI Menyapa #002` |
| 6 | Spasi ganda dan spasi sebelum tanda baca | `Sumber - sumber` → `Sumber-sumber` |

Huruf kapital **tidak diubah**. Judul yang aslinya berhuruf kapital semua tetap demikian, karena pembakuan huruf besar-kecil bukan bagian keputusan `M-03` dan berisiko mengubah nama diri. Perapian huruf besar-kecil dapat dilakukan belakangan sebagai pekerjaan terpisah.

---

## 4. Empat Kategori Topik

Kategori topik adalah lapisan di atas seri. Gunanya untuk menyaring katalog ketika pengunjung belum tahu nama seri. Satu seri hanya punya satu kategori; satu video pada “Lainnya” juga diberi satu kategori.

| Kode | Kategori | Cakupan | Seri | Baris | Video unik |
|---|---|---|---|---|---|
| **A** | **Layanan Perpustakaan & Profesi Pustakawan** | Profesi pustakawan, layanan dan koleksi Perpusnas, literasi informasi, kunjungan, serta sosialisasi program. | 10 | 176 | 173 |
| **B** | **Naskah Nusantara & Warisan Budaya** | Naskah kuno, filologi, konservasi, dan warisan budaya Nusantara. | 6 | 85 | 82 |
| **C** | **Literasi, Minat Baca & Keluarga** | Minat baca, keluarga, sekolah, buku anak, dan komunitas literasi. | 3 | 53 | 53 |
| **D** | **Sejarah, Kebudayaan & Diskusi Publik** | Sejarah, kebudayaan, dan diskusi publik lintas tema. | 2 | 23 | 23 |
| **Total** | | | **21** | **337** | **331** |

Kategori tidak menggantikan seri. Pengunjung yang memilih kategori *Naskah Nusantara & Warisan Budaya* tetap melihat seri di dalamnya, bukan daftar video acak.

---

## 5. Daftar Seluruh Seri

Urutan tabel mengikuti kategori, lalu jumlah episode terbanyak. Nomor pada kolom pertama dipakai sebagai rujukan cepat, misalnya “seri nomor 6”.

| No | Nama Seri | Kategori | Baris | Video unik | Rentang Tayang |
|---|---|---|---|---|---|---|
| 1 | **LibTalk** | Layanan | 41 | 41 | 22 Des 2020 – 20 Nov 2024 |
| 2 | **SUPER MORNING** | Layanan | 30 | 30 | 11 Okt 2023 – 7 Okt 2026 |
| 3 | **Bimbingan Pemustaka & Literasi Informasi** | Layanan | 29 | 29 | 3 Nov 2020 – 24 Feb 2023 |
| 4 | **Sosialisasi Program & Layanan Perpusnas** | Layanan | 15 | 15 | 16 Des 2020 – 8 Agu 2025 |
| 5 | **LibTalk Reference Series** | Layanan | 9 | 9 | 1 Okt 2021 – 16 Sep 2025 |
| 6 | **Kunjungan Virtual ke Perpusnas** | Layanan | 8 | 8 | 11 Nov 2021 – 10 Apr 2023 |
| 7 | **AP PASTI Menyapa** | Layanan | 7 | 7 | 13 Agu 2020 – 9 Okt 2020 |
| 8 | **SUDUT INSPIRASI** | Layanan | 5 | 5 | 11 Feb 2026 – 15 Okt 2026 |
| 9 | **DP on Podcast** | Layanan | 4 | 1 | 30 Agu 2021 – 30 Agu 2021 |
| 10 | **Seri Pengantar Teori Ilmu Perpustakaan, Arsip, dan Museum** | Layanan | 2 | 2 | 11 Feb 2025 – 11 Mar 2025 |
| 11 | **Diskusi Naskah Nusantara** | Naskah | 28 | 25 | 10 Nov 2021 – 13 Jan 2025 |
| 12 | **FGD IKON** | Naskah | 23 | 23 | 28 Mei 2024 – 6 Agu 2024 |
| 13 | **Penggalian Potensi Naskah Kuno Nusantara** | Naskah | 7 | 7 | 29 Apr 2025 – 21 Mei 2026 |
| 14 | **Kelas Literasi Naskah Nusantara** | Naskah | 5 | 5 | 25 Mar 2025 – 9 Des 2025 |
| 15 | **PESONA NUSANTARA** | Naskah | 3 | 3 | 31 Agu 2020 – 1 Sep 2020 |
| 16 | **Naskah Kuno Indonesia Menuju Ingatan Dunia** | Naskah | 2 | 2 | 8 Des 2025 – 8 Des 2025 |
| 17 | **Kelas Literasi Siniar** | Literasi | 17 | 17 | 11 Mar 2025 – 15 Okt 2026 |
| 18 | **CERITA BUKI** | Literasi | 8 | 8 | 22 Jul 2020 – 3 Des 2020 |
| 19 | **NGOPI SENSASI** | Literasi | 4 | 4 | 25 Jan 2024 – 16 Des 2024 |
| 20 | **Diskusi JASMERAH** | Sejarah | 6 | 6 | 31 Agu 2022 – 6 Mar 2024 |
| 21 | **Gelarwicara** | Sejarah | 2 | 2 | 14 Mei 2024 – 15 Mei 2024 |
| 22 | **Lainnya** | Semua kategori | 82 | 82 | 2 Jul 2020 – 10 Nov 2026 |
| **Total** | | | **337** | **331** | |

Kolom **Baris** bila dijumlahkan menghasilkan **337**, sesuai jumlah data publik. Kolom **Video unik** menghasilkan **331**, yaitu jumlah yang ditampilkan website. Selisih 6 baris berasal dari duplikat pada DP on Podcast dan Diskusi Naskah Nusantara (Bagian 10.1).

---

## 6. Rincian Episode Setiap Seri

Kolom **No** adalah nomor episode resmi di website. Nomor ini dihitung ulang secara otomatis berdasarkan urutan tanggal tayang, bukan diambil dari judul asli, sesuai `PR-29`. Pada seri gabungan, kolom yang sama berarti nomor urut tampil.

Tanda **†** menandai baris data yang videonya sama dengan baris sebelumnya. Baris tersebut tetap ditampilkan pada dokumen ini agar jumlahnya tetap 337, tetapi di website cukup tampil satu kali.

### 6.1 LibTalk (41 episode)

*Kategori: Layanan Perpustakaan & Profesi Pustakawan · Jenis: Seri resmi · Alamat halaman: `/program/libtalk`*

Bincang-bincang daring tentang profesi pustakawan, layanan perpustakaan, dan keterampilan literasi informasi. Seri ini paling panjang dan menjadi induk bagi LibTalk Reference Series.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 22 Des 2020 | Cataloging Is Fun! | 2 j 1 m |
| 2 | 18 Mar 2021 | Berbagi Cerita Bagaimana Terhubung dengan Indonesia Onesearch | 1 j 52 m |
| 3 | 29 Apr 2021 | Pustakawan Tanpa Batas | 1 j 36 m |
| 4 | 27 Agu 2021 | MENULIS ESAI: SEBUAH PERJALANAN MENGEJAR IMPIAN | 1 j 53 m |
| 5 | 23 Feb 2022 | Seri Penelusuran Informasi: Sumber-sumber Informasi Bidang Ilmu Kedokteran | 24 d |
| 6 | 23 Feb 2022 | Seri Penelusuran Informasi: Sumber-sumber Informasi Bidang Ilmu Kedokteran | 2 j 10 m |
| 7 | 16 Mar 2022 | Seri Penelusuran Informasi: Sumber-sumber Informasi Ilmu Sosial, Ekonomi, Humaniora | 1 j 53 m |
| 8 | 24 Mar 2022 | Seri Penelusuran Informasi: Sumber-sumber Informasi Ilmu Hukum | 2 j 5 m |
| 9 | 14 Apr 2022 | Seri Penelusuran Informasi: Sumber-sumber Informasi Ilmu Pendidikan | 1 j 55 m |
| 10 | 23 Mei 2022 | Seri Penelusuran Informasi Bidang Ilmu Terapan | 1 m |
| 11 | 24 Mei 2022 | Seri Penelusuran Informasi Bidang Ilmu Terapan | 1 j 44 m |
| 12 | 14 Jul 2022 | Visualisasi Data dengan VOS Viewer | 1 j 39 m |
| 13 | 25 Agu 2022 | Literasi Informasi Generasi Alfa: Dalam Konteks Layanan Referensi | 2 j 23 m |
| 14 | 22 Sep 2022 | Library Of Things | 2 j 31 m |
| 15 | 21 Okt 2022 | Advokasi Perpustakaan | 2 j 30 m |
| 16 | 30 Nov 2022 | Pengembangan Layanan Referensi dan Peran Organisasi Pustakawan | 2 j 15 m |
| 17 | 6 Des 2022 | Literasi Anak Dengan Read Aloud | 2 j 1 m |
| 18 | 16 Mei 2023 | Manajemen Perpustakaan Sekolah | 2 j 22 m |
| 19 | 19 Jun 2023 | Berdaya Dengan Perpustakaan: Berbagi Cerita Dengan Pustakawan Perpustakaan Khusus | 2 j 1 m |
| 20 | 13 Jul 2023 | Sehat Mental di Perpustakaan | 1 j 42 m |
| 21 | 24 Jul 2023 | Layanan Referensi Virtual Perpustakaan Kementerian Agama | 1 j 57 m |
| 22 | 26 Jul 2023 | Menjadi Pustakawan Agile | 2 j 13 m |
| 23 | 9 Agu 2023 | Layanan Referensi Virtual: Pusat Perpustakaan dan Literasi Pertanian | 2 j 10 m |
| 24 | 30 Agu 2023 | Layanan Referensi Virtual: Perpustakaan Badan Pemeriksa Keuangan RI | 2 j 15 m |
| 25 | 6 Sep 2023 | Layanan Referensi Virtual: Perpustakaan Kementerian Kesehatan | 2 j 8 m |
| 26 | 13 Sep 2023 | Layanan Referensi Virtual: Perpustakaan BRIN ( Badan Riset dan Inovasi Nasional ) | 2 j 10 m |
| 27 | 19 Sep 2023 | Desain Media Promosi Perpustakaan | 1 j 37 m |
| 28 | 19 Okt 2023 | Konten Kreatif Animasi sebagai Media Edukasi dan Promosi Perpustakaan | 1 j 53 m |
| 29 | 6 Nov 2023 | ONE PERSON LIBRARIAN: STRATEGI MENGELOLA PERPUSTAKAAN | 2 j 12 m |
| 30 | 13 Mei 2024 | Membudayakan Manfaat Literasi Melalui Bookish Play | 2 j 6 m |
| 31 | 5 Jun 2024 | Library Community Inspirasi Perpustakaan Komunitas di Indonesia | 1 j 19 m |
| 32 | 25 Jun 2024 | Literasi Pasca Pandemi Di Sekolah: Transisi Menuju Perubahan Literasi Digital Yang Masif | 2 j 12 m |
| 33 | 10 Jul 2024 | Inovasi dan Tantangan dalam Pengelolaan Perpustakaan Modern: Pendekatan Ilmu Perpustakaan | 2 j 18 m |
| 34 | 18 Jul 2024 | Transformasi Peran Pustakawan: Menjawab Tantangan Literasi Membaca untuk Mahasiswa | 2 j 34 m |
| 35 | 29 Jul 2024 | Biblioterapi sebagai Solusi Alternatif di Perpustakaan Indonesia | 2 j 13 m |
| 36 | 15 Agu 2024 | Peran Perpustakaan Khusus dalam Manajemen Pengetahuan dan Informasi Perusahaan | 2 j 15 m |
| 37 | 25 Sep 2024 | Hari Kunjung Sebagai Sarana Promosi Perpustakaan | 1 j 18 m |
| 38 | 23 Okt 2024 | Siniar Buku Sebagai Media Pemberdayaan Literasi Di Era Digital | 1 j 53 m |
| 39 | 6 Nov 2024 | Kajian Perpustakaan | 2 j 5 m |
| 40 | 13 Nov 2024 | Peran Perpustakaan Sekolah Dalam Mengembangkan Habitus Gemar Membaca | 2 j 5 m |
| 41 | 20 Nov 2024 | Menuju Otomasi Perpustakaan | 2 j 3 m |

### 6.2 SUPER MORNING (30 episode)

*Kategori: Layanan Perpustakaan & Profesi Pustakawan · Jenis: Seri resmi · Alamat halaman: `/program/super-morning`*

Memperkenalkan layanan koleksi Perpustakaan Nasional satu per satu: monograf, majalah terjilid, koleksi langka, multimedia, foto dan peta, hingga koleksi rujukan.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 11 Okt 2023 | Mengenal Layanan Koleksi dan Pagelaran Budaya Nusantara | 44 m |
| 2 | 13 Okt 2023 | Menjajaki Masa Lampau Bersama Layanan Majalah Terjilid | 44 m |
| 3 | 20 Okt 2023 | Menelusur Ilmu-ilmu baru Bersama Layanan Koleksi Monograf Terbuka | 56 m |
| 4 | 25 Okt 2023 | Menjelajah Dunia bersama Layanan Koleksi Mancanegara | 1 j 1 m |
| 5 | 1 Nov 2023 | Mengikuti Perkembangan Terkini bersama Layanan Koleksi Berkala Mutakhir | 54 m |
| 6 | 8 Nov 2023 | Berselancar di Dunia Maya bersama Layanan Multimedia | 54 m |
| 7 | 15 Nov 2023 | Memandang Memori bersama Layanan Foto, Peta, dan Lukisan | 1 j 2 m |
| 8 | 22 Nov 2023 | Mengutip Sumber Informasi bersama Layanan Rujukan Dan Ilmu Perpustakaan | 54 m |
| 9 | 29 Nov 2023 | Melestarikan Pengetahuan Unik bersama Layanan Buku Langka | 52 m |
| 10 | 6 Des 2023 | Mengantarkan Wawasan bersama Layanan Koleksi Monograf Tertutup | 59 m |
| 11 | 13 Des 2023 | Membuka Pintu Literasi bersama Layanan Bimbingan Pemustaka & Literasi Informasi | 1 j 4 m |
| 12 | 20 Des 2023 | Menumbuhkembangkan Minat Baca bersama Layanan Koleksi Anak | 1 j 36 m |
| 13 | 3 Jan 2024 | Menikmati Karya Rekam bersama Layanan Audiovisual | 1 j 1 m |
| 14 | 10 Jan 2024 | Mempelajari Manuskrip Kuno bersama Layanan Koleksi Naskah Nusantara | 1 j 4 m |
| 15 | 17 Jan 2024 | Menjembatani Keterbatasan bersama Layanan Koleksi Lansia dan Disabilitas | 1 j 15 m |
| 16 | 24 Jan 2024 | Mencari Rujukan dengan Pustakawan bersama Layanan Referensi Virtual | 49 m |
| 17 | 31 Jan 2024 | Publikasi Konten & Interaksi Netizen bersama Layanan Komunitas dan Media Sosial | 1 j 5 m |
| 18 | 7 Feb 2024 | Mengenalkan Perpustakaan bersama Layanan Promosi Pameran di Dalam & Luar Negeri | 1 j 6 m |
| 19 | 21 Feb 2024 | Registrasi Pemustaka bersama Layanan Keanggotaan | 57 m |
| 20 | 28 Feb 2024 | Menapaki Lini Masa bersama Layanan Grha Literasi dan Galeri Kepresidenan | 55 m |
| 21 | 6 Mar 2024 | Berkeliling Ruang-Ruang Edukasi bersama Layanan Kunjungan dan Tur Perpustakaan | 56 m |
| 22 | 13 Mar 2024 | Membalik Lembaran Peristiwa Doeloe bersama Layanan Surat Kabar Langka | 56 m |
| 23 | 20 Mar 2024 | Menghasilkan Produk Informasi bersama Lynn Penelusuran Info & Fasilitas Peneliti | 1 j 8 m |
| 24 | 27 Mar 2024 | Mengemas dan Menyebar Produk Informasi bersama Layanan KUDI | 53 m |
| 25 | 24 Apr 2024 | Berkreasi Lewat Suara bersama Layanan Musik dan Radio Widya Bahana Swara | 1 j 18 m |
| 26 | 8 Mei 2024 | Menyalurkan Aspirasi Pemustaka bersama Layanan Info dan Pengaduan Masyarakat | 40 m |
| 27 | 15 Mei 2024 | Mempelajari Literatur Terbitan Lembaga Dunia bersama Layanan Koleksi PBB | 49 m |
| 28 | 22 Jan 2025 | Gebrakan Baru Untuk Meningkatkan Pelayanan Prima | 45 m |
| 29 | 21 Mei 2026 | Gebrakan Baru Untuk Meningkatkan Pelayanan Prima | 9 m |
| 30 | 7 Okt 2026 | Gebrakan Baru Untuk Meningkatkan Pelayanan Prima | — |

### 6.3 Bimbingan Pemustaka & Literasi Informasi (29 episode)

*Kategori: Layanan Perpustakaan & Profesi Pustakawan · Jenis: Seri gabungan · Alamat halaman: `/program/bimbingan-pemustaka-dan-literasi-informasi`*

Kumpulan rekaman bimbingan pemustaka dan literasi informasi: pelatihan e-resources, iPusnas, Indonesia OneSearch, dan pengenalan koleksi khusus. Disebut seri gabungan karena judul aslinya beragam dan tidak memakai satu merek program.

> Karena ini seri gabungan, nomor pada kolom **No** adalah nomor urut tampil, bukan nomor episode yang pernah diumumkan kanal.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 3 Nov 2020 | Hari 1 Peluncuran dan Bimbingan Pemustaka dan Literasi Informasi - Bimbingan Pemanfaatan E-Resource | 2 j 14 m |
| 2 | 3 Nov 2020 | Hari 2 Bimbingan Pemustaka dan Literasi Informasi - Bimbingan Pemanfaatan iPusnas | 1 j 56 m |
| 3 | 4 Nov 2020 | Hari 3 Bimbingan Pemustaka dan Literasi Informasi - Bimbingan Pemanfaatan Indonesia One Search | 1 j 37 m |
| 4 | 5 Nov 2020 | Hari 4 Bimbingan Pemustaka dan Literasi Informasi - Koleksi Khusus Tanggal 5 November 2020 | 2 j 48 m |
| 5 | 6 Nov 2020 | Hari 5 Bimbingan Pemustaka dan Literasi Informasi - Bimbingan Pemanfaatan Koleksi Naskah Nusantara | 1 j 30 m |
| 6 | 28 Des 2020 | Bimbingan Pemustaka dan Literasi Informasi | 2 j 31 m |
| 7 | 25 Feb 2021 | BP Online - Sosialisasi Pemanfaatan Koleksi Digital Perpustakaan Nasional RI | 2 j 38 m |
| 8 | 19 Mar 2021 | BP Online Mengenal Berbagai Koleksi Surat Kabar Langka Perpusnas RI (Era Pra Kemerdekaan) | 1 j 38 m |
| 9 | 16 Apr 2021 | BIMBINGAN PEMUSTAKA ONLINE KLASIKA: MENGENAL BERBAGAI KOLEKSI LANGKA PERPUSTAKAAN NASIONAL RI MASA | 1 j 54 m |
| 10 | 28 Apr 2021 | Sosialisasi dan Bimbingan Pemanfaatan Koleksi Digital Perpustakaan Nasional RI | 2 j 36 m |
| 11 | 17 Mei 2021 | Bimbingan Pemustaka dan Literasi, Perpusnas RI bekerjasama dengan Universitas Ibnu Khaldun | 2 j 23 m |
| 12 | 17 Jun 2021 | Bersama Universitas Surabaya (UBAYA) | 2 j 37 m |
| 13 | 18 Jun 2021 | Bimbingan Pemustaka Online; Mengenal Berbagai Koleksi Langka Perpustakaan Nasional RI Era Orde Lama | 2 j 38 m |
| 14 | 30 Agu 2021 | Bersama SMAS Kristen Villa Taman Bandara | 56 m |
| 15 | 31 Agu 2021 | Bersama SMAS Kristen Villa Taman Bandara Hari ke-2 | 1 j 0 m |
| 16 | 1 Sep 2021 | Bersama SMAS Kristen Villa Taman Bandara Hari ke-3 | 45 m |
| 17 | 2 Sep 2021 | Bersama SMAS Kristen Villa Taman Bandara Hari ke-4 | 1 j 26 m |
| 18 | 29 Sep 2021 | Perpustakaan Nasional RI dan Universitas Bengkulu_ Bimbingan Pemustaka dan literasi Informasi | 3 j 3 m |
| 19 | 5 Okt 2021 | Sosialisasi Pemanfaatan Koleksi Perpustakaan Nasional RI & Perpustakaan UIN Antasari Banjarmasin | 2 j 38 m |
| 20 | 27 Okt 2021 | Perpustakaan Nasional RI & STAI SADRA | 2 j 39 m |
| 21 | 5 Nov 2021 | Sharing Session Literasi Informasi Perpustakaan \| Perpusnas RI dan Politeknik Negeri Batam | 2 j 31 m |
| 22 | 10 Mar 2022 | BP Online \| Sosialisasi Pemanfaatan Koleksi Digital Perpusnas RI | 2 j 55 m |
| 23 | 23 Mar 2022 | BP Online: Sosialisasi Pemanfaatan Koleksi Digital Perpustakaan Nasional RI | 3 j 3 m |
| 24 | 29 Mar 2022 | BP Online: Sosialisasi Pemanfaatan Koleksi Digital Perpustakaan Nasional RI - UM Jember | 1 j 41 m |
| 25 | 12 Apr 2022 | BP Online #4 Sosialisasi Pemanfaatan Koleksi Digital Perpustakaan Nasional RI - HMPSV UNS | 2 j 46 m |
| 26 | 21 Apr 2022 | Bimbingan Pemustaka \| Sosialisasi Pemanfaatan Koleksi Digital Perpustakaan Nasional RI - UMMAT | 2 j 11 m |
| 27 | 21 Sep 2022 | BP Online Universitas Muhammadiyah Pontianak | 2 j 46 m |
| 28 | 30 Sep 2022 | Sharing Session \| Literasi Informasi Perpustakaan | 2 j 24 m |
| 29 | 24 Feb 2023 | BP Online \| Sosialisasi Pemanfaatan Koleksi Digital Perpusnas RI Bersama Politeknik Negeri Batam | 1 j 45 m |

### 6.4 Sosialisasi Program & Layanan Perpusnas (15 episode)

*Kategori: Layanan Perpustakaan & Profesi Pustakawan · Jenis: Seri gabungan · Alamat halaman: `/program/sosialisasi-program-dan-layanan-perpusnas`*

Rekaman sosialisasi program, kebijakan, dan layanan Perpusnas kepada publik maupun pegawai, termasuk RAKORNAS, integrasi data keanggotaan, dan testimoni proyek perubahan.

> Karena ini seri gabungan, nomor pada kolom **No** adalah nomor urut tampil, bukan nomor episode yang pernah diumumkan kanal.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 16 Des 2020 | Sosialisasi Pengembangan ASN dalam Rangka Peningkatan Pelayanan Publik di Lingkungan Perpusnas | 2 j 28 m |
| 2 | 12 Mar 2021 | SOSIALISASI PEMANFAATAN E-RESOURCES, iPUSNAS & INDONESIA ONE SEARCH | 2 j 17 m |
| 3 | 24 Mar 2021 | RAKORNAS 2021-Konsultasi Virtual Pusat Jasa Informasi Perpustakaan & Pengelolaan Naskah Nusantara#1 | 3 j 56 m |
| 4 | 25 Mar 2021 | RAKORNAS 2021-Konsultasi Virtual Pusat Jasa Informasi Perpustakaan & Pengelolaan Naskah Nusantara#2 | 6 j 8 m |
| 5 | 19 Mei 2021 | Webinar Manfaat Layanan Digital Perpustakaan Nasional: e-Resources, iPusnas, Khastara, dan IOS | 3 j 5 m |
| 6 | 12 Jun 2021 | Sosialisasi Implementasi Kartu Layanan Perpustakaan Berbasis Nomor Induk Kependudukan | 36 m |
| 7 | 21 Jun 2021 | #1 TESTIMONI DUKUNGAN PROYEK PERUBAHAN KARTU ANGGOTA LAYANAN PERPUSTAKAAN BERBASIS NIK | 5 m |
| 8 | 24 Jun 2021 | #2 TESTIMONI DUKUNGAN PROYEK PERUBAHAN KARTU ANGGOTA LAYANAN PERPUSTAKAAN BERBASIS NIK | 3 m |
| 9 | 18 Mei 2022 | Pengelolaan Pengaduan Layanan Perpustakaan Nasional RI | 2 j 7 m |
| 10 | 19 Mei 2022 | Sosialisasi Persiapan IKON dan MoW: Naskah Nusantara Ingatan Bangsa Ingatan Dunia | 3 j 25 m |
| 11 | 20 Mei 2022 | Integrasi Data Keanggotaan Melalui Sakti | 1 j 56 m |
| 12 | 27 Jun 2022 | Zona Integritas Pusat Pendidikan dan Pelatihan Perpustakaan Nasional RI | 3 m |
| 13 | 21 Jul 2022 | Forum Konsultasi Publik Ke 2 | 2 j 35 m |
| 14 | 18 Jun 2025 | Sosialisasi Pendaftaran Naskah Kuno | 3 j 8 m |
| 15 | 8 Agu 2025 | Sosialisasi Penghargaan Nugra Jasa Dharma Pustaloka | 2 j 24 m |

### 6.5 LibTalk Reference Series (9 episode)

*Kategori: Layanan Perpustakaan & Profesi Pustakawan · Jenis: Seri resmi · Alamat halaman: `/program/libtalk-reference-series`*

Cabang LibTalk yang khusus membahas layanan referensi: konsep dasar, praktik di berbagai jenis perpustakaan, dan keterampilan pendukungnya.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 1 Okt 2021 | KONSEP LAYANAN REFERENSI DI INDONESIA | 1 j 50 m |
| 2 | 8 Okt 2021 | Sesi 2: LAYANAN REFERENSI PERPUSTAKAAN SEKOLAH | 2 j 4 m |
| 3 | 15 Okt 2021 | Sesi 3: LAYANAN REFERENSI PERPUSTAKAAN PERGURUAN TINGGI | 2 j 0 m |
| 4 | 29 Okt 2021 | Sesi 5: LAYANAN REFERENSI PERPUSTAKAAN UMUM | 1 j 47 m |
| 5 | 30 Apr 2025 | Membangun Kesadaran Pengguna terhadap Lay. Referensi Perpustakaan | 2 j 10 m |
| 6 | 14 Mei 2025 | Layanan Ref. sebagai Mitra Strategis dalam Penelitian Akademik | 2 j 15 m |
| 7 | 21 Mei 2025 | Layanan Referensi: Panduan Pustakawan & Pemustaka dalam Riset | 2 j 8 m |
| 8 | 28 Mei 2025 | Mengembangkan Literasi Informasi melalui Layanan Referensi | 2 j 17 m |
| 9 | 16 Sep 2025 | KECAKAPAN BERBAHASA & KETERAMPILAN LITERASI DALAM KEPUSTAKAWANAN | 2 j 42 m |

### 6.6 Kunjungan Virtual ke Perpusnas (8 episode)

*Kategori: Layanan Perpustakaan & Profesi Pustakawan · Jenis: Seri gabungan · Alamat halaman: `/program/kunjungan-virtual-ke-perpusnas`*

Rekaman kunjungan virtual sekolah dan komunitas ke Perpustakaan Nasional. Judul episode umumnya berupa nama lembaga pengunjung.

> Karena ini seri gabungan, nomor pada kolom **No** adalah nomor urut tampil, bukan nomor episode yang pernah diumumkan kanal.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 11 Nov 2021 | TD-KB/TK AL AZHAR 5 KEMANDORAN | 2 j 28 m |
| 2 | 12 Nov 2021 | SDS HARAPAN PRESTASI Jakarta Timur | 1 j 7 m |
| 3 | 26 Nov 2021 | Kunjungan Virtual | 45 m |
| 4 | 8 Des 2021 | SD TRI RATNA JAKARTA | 1 j 27 m |
| 5 | 15 Des 2021 | SD SALMAN ALFARISI | 2 j 7 m |
| 6 | 17 Des 2021 | MI RIYADLUS SHIBYAN | 2 j 15 m |
| 7 | 21 Des 2021 | SD BOSOWA BINA INSANI | 1 j 34 m |
| 8 | 10 Apr 2023 | Kunjungan Homeschool For Life (HS4Life) | 37 d |

### 6.7 AP PASTI Menyapa (7 episode)

*Kategori: Layanan Perpustakaan & Profesi Pustakawan · Jenis: Seri resmi · Alamat halaman: `/program/ap-pasti-menyapa`*

Program sapaan yang menghadirkan unit kerja di lingkungan Perpusnas untuk memperkenalkan tugas dan layanannya.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 13 Agu 2020 | 21 Juli 2020 | 52 m |
| 2 | 27 Agu 2020 | 27 Agustus 2020 | 1 j 25 m |
| 3 | 1 Sep 2020 | 1 September 2020 | 54 m |
| 4 | 30 Sep 2020 | Bersama Inspektorat | 1 j 6 m |
| 5 | 30 Sep 2020 | Bersama Pusat Pengembangan Koleksi | 29 m |
| 6 | 30 Sep 2020 | Bersama Pusat Preservasi Bahan Pustaka | 52 m |
| 7 | 9 Okt 2020 | SPESIAL bersama KEPALA PERPUSNAS RI | 49 m |

### 6.8 SUDUT INSPIRASI (5 episode)

*Kategori: Layanan Perpustakaan & Profesi Pustakawan · Jenis: Seri resmi · Alamat halaman: `/program/sudut-inspirasi`*

Cerita dan pengalaman pustakawan serta unit kerja di lingkungan Perpusnas, dari praktik menumbuhkan minat baca hingga pengelolaan deposit koleksi.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 11 Feb 2026 | Yuk, Lihat Pengalaman Seorang Pustama dalam Menumbuhkan Minat Baca Sejak Dini | 47 m |
| 2 | 24 Sep 2026 | Pustakawan Terlibat, Bersinergi, dan Berdampak | 1 j 37 m |
| 3 | 30 Sep 2026 | Sebelum Menutup Buku: Puluhan Tahun Mengabdi, Sebuah Perjalanan Menjadi Pustakawan | 56 m |
| 4 | 1 Okt 2026 | SIGAP Deposit | 45 m |
| 5 | 15 Okt 2026 | Mengenal Pusat Pembinaan Pustakawan (PUSBINAWAN) | 1 j 16 m |

### 6.9 DP on Podcast (4 baris · 1 video)

*Kategori: Layanan Perpustakaan & Profesi Pustakawan · Jenis: Seri resmi · Alamat halaman: `/program/dp-on-podcast`*

Siniar yang membahas program dan kegiatan Duta Perpusnas, termasuk perayaan kemerdekaan RI. Empat baris data merujuk pada satu video yang sama; website menampilkannya satu kali.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 30 Agu 2021 | Duta Perpusnas dan Perayaan Kemerdekaan RI | 1 j 49 m |
| 1 | 30 Agu 2021 | Duta Perpusnas dan Perayaan Kemerdekaan RI † | 1 j 49 m |
| 1 | 30 Agu 2021 | Duta Perpusnas dan Perayaan Kemerdekaan RI † | 1 j 49 m |
| 1 | 30 Agu 2021 | Duta Perpusnas dan Perayaan Kemerdekaan RI † | 1 j 49 m |

### 6.10 Seri Pengantar Teori Ilmu Perpustakaan, Arsip, dan Museum (2 episode)

*Kategori: Layanan Perpustakaan & Profesi Pustakawan · Jenis: Seri resmi · Alamat halaman: `/program/seri-pengantar-teori-ilmu-perpustakaan-arsip-dan-museum`*

Kuliah singkat pengantar teori ilmu perpustakaan, kearsipan, dan permuseuman, disampaikan dalam beberapa bagian.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 11 Feb 2025 | Ilmu Perpustakaan dari Masa ke Masa | 1 j 23 m |
| 2 | 11 Mar 2025 | Perkembangan Studi Dokumentasi Baru | 1 j 52 m |

### 6.11 Diskusi Naskah Nusantara (28 baris · 25 video)

*Kategori: Naskah Nusantara & Warisan Budaya · Jenis: Seri resmi · Alamat halaman: `/program/diskusi-naskah-nusantara`*

Diskusi rutin tentang naskah Nusantara: kajian filologi, kodikologi, dan pemanfaatan naskah untuk pengetahuan. Sebagian judul aslinya memakai awalan FGD atau Seri Diskusi Naskah Nusantara. Tiga baris ganda digabung sehingga website menampilkan 25 video unik.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 10 Nov 2021 | Pengembangan Tata Bahasa Komputasional Untuk Bahasa Jawa Kuno | 1 j 23 m |
| 2 | 26 Jan 2022 | MANUSKRIP, KOMIK, DAN FILM | 1 j 42 m |
| 3 | 10 Feb 2022 | KHAZANAH MANUSKRIP CINA-JAWA DI INDONESIA | 2 j 7 m |
| 4 | 28 Mar 2022 | NYEPI: Dalam Naskah Kuno dan Keagamaan | 2 j 48 m |
| 5 | 20 Apr 2022 | Mengenal Naskah Islam Nusantara: Kontribusi Tarekat Cirebon dari Masa ke Masa | 3 j 33 m |
| 6 | 31 Mei 2022 | Motif Batik & Iluminasi Naskah: Peluang Ekonomi Kreatif Khas Budaya Nusantara | 2 j 43 m |
| 7 | 26 Jan 2023 | Permainan Tradisional dalam Naskah Kuno dan Bacaan Anak Tempo Dulu | 3 j 0 m |
| 8 | 21 Feb 2023 | Tambo Tuanku Imam Bonjol: Naskah Ingatan Bangsa Menuju Ingatan Dunia | 3 j 5 m |
| 9 | 21 Mar 2023 | Naskah Serat Yusuf dalam Tradisi Jawa dan Lombok | 3 j 7 m |
| 10 | 16 Mei 2023 | I La Galigo: Mahakarya Sastra Bugis yang Mendunia | 2 j 53 m |
| 11 | 21 Mei 2023 | Pengembangan Tata Bahasa Komputasional Untuk Bahasa Jawa Kuno | 5 d |
| 11 | 21 Mei 2023 | Pengembangan Tata Bahasa Komputasional Untuk Bahasa Jawa Kuno † | 5 d |
| 12 | 27 Jun 2023 | Kakawin Sutasoma: Pemaknaan Kebhinnekaan dan Aktualisasi Kekinian | 3 j 11 m |
| 13 | 26 Jul 2023 | Mengenang Satu Dasawarsa Meninggalnya I. Kuntara Wiryamartana | 2 j 30 m |
| 14 | 31 Agu 2023 | Naskah Lampung: Khazanah Kesusasteraan Nusantara | 3 j 2 m |
| 15 | 21 Sep 2023 | Syekh Yusuf Al-Makassari: Kebaruan Pemikiran dan Jejaring Intelektualnya | 2 j 39 m |
| 16 | 31 Jan 2024 | Khazanah Naskah Indonesia Timur: Catatan Sejarah Kesultanan Ternate dan Tidore Abad ke- 19 | 3 j 13 m |
| 17 | 26 Mar 2024 | Sosialisasi Program Penerbitan Berbasis Naskah Kuno Nusantara | 2 j 29 m |
| 18 | 27 Mar 2024 | Peran Kabuyutan Ciburuy dalam Pengembangan Ilmu Pengetahuan di Tatar Sunda | 1 j 49 m |
| 19 | 24 Apr 2024 | Membincang Panji: Dari Teks Sastra hingga Jejak Arkeologi | 2 j 47 m |
| 20 | 29 Apr 2024 | Rumah Naskah: Kiprah Generasi Muda Dalam Pelestarian Naskah Nusantara | 2 j 30 m |
| 21 | 8 Mei 2024 | Jejak Sanad Kitab Hadits Hadratussyekh K.H. M. Hasyim Asy'ari | 2 j 22 m |
| 22 | 21 Mei 2024 | Sastra Pesantren dalam Tradisi Pernaskahan dan Tantangannya bagi Santri Generasi Z | 2 j 47 m |
| 23 | 22 Mei 2024 | Mengupas Teks Lontar Kalpabuddha dan Manifestasinya Dalam Kehidupan | 2 j 39 m |
| 24 | 30 Mei 2024 | Surat, Hata, Poda: Merawat Budaya, Menolak Punah | 2 j 43 m |
| 25 | 13 Jan 2025 | Pengembangan Tata Bahasa Komputasional Untuk Bahasa Jawa Kuno | 12 d |
| 25 | 13 Jan 2025 | Pengembangan Tata Bahasa Komputasional Untuk Bahasa Jawa Kuno † | 12 d |
| 25 | 13 Jan 2025 | Pengembangan Tata Bahasa Komputasional Untuk Bahasa Jawa Kuno † | 12 d |

### 6.12 FGD IKON (23 episode)

*Kategori: Naskah Nusantara & Warisan Budaya · Jenis: Seri resmi · Alamat halaman: `/program/fgd-ikon`*

Forum grup diskusi untuk menggali dan mengusulkan naskah kuno sebagai Ingatan Kolektif Nasional (IKON), dari berbagai daerah di Indonesia.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 28 Mei 2024 | Kupas Tuntas Aturan Pergaulan Bujang Gadis & Pernikahan Naskah UU Simbur Cahaya | 2 j 26 m |
| 2 | 10 Jun 2024 | Khazanah Naskah Kuno Banyuwangi sebagai IKON | 2 j 33 m |
| 3 | 11 Jun 2024 | Bo' Sangaji Kai dan Riwayat Panjang Kerajaan/Kesultanan Bima | 3 j 33 m |
| 4 | 14 Jun 2024 | Perempuan dalam Naskah Bo' Sangaji Kai | 2 j 42 m |
| 5 | 21 Jun 2024 | Potensi Naskah Kidung Bhuwana Winasa Sbg IKON Bali: Perspektif Filosofis&Poskolonialis | 3 j 13 m |
| 6 | 24 Jun 2024 | Khazanah Pengobatan Dalam Naskah Kuno Batak | 2 j 57 m |
| 7 | 25 Jun 2024 | Cerita Sri Tanjung Dalam Perspektif Naskah Dan Cerita Rakyat Di Jawa Timur | 2 j 58 m |
| 8 | 26 Jun 2024 | Kapita Naskah Kuno Sulawesi Selatan Potensi IKON | 2 j 25 m |
| 9 | 27 Jun 2024 | Perhoekoeman Dalam Naskah Undang-Undang Simbur Cahaya | 2 j 12 m |
| 10 | 3 Jul 2024 | Lontara Attorilong sebagai Literasi Sejarah dan Budaya Sulawesi Selatan | 3 j 6 m |
| 11 | 9 Jul 2024 | Tambar Ni Hulit: Sebuah Naskah Pengobatan Masyarakat Batak | 3 j 6 m |
| 12 | 10 Jul 2024 | Cerita Sri Tanjung dalam Perspektif Naskah dan Tinggalan Arkeologi di Jawa Timur | 3 j 16 m |
| 13 | 11 Jul 2024 | Seabad Puputan Badung: Perspektif Belanda dan Bali | 2 j 9 m |
| 14 | 16 Jul 2024 | Ragam Ilustrasi dan Iluminasi Manuskrip Sumatera Utara | 2 j 32 m |
| 15 | 17 Jul 2024 | Lontara Attoriolong Bone sebagai Kronik dan Historiografi Sulawesi Selatan | 2 j 55 m |
| 16 | 18 Jul 2024 | Bo' Sangaji Kai dan Tantangan Pewarisan Nilai | 3 j 19 m |
| 17 | 23 Jul 2024 | Pasang Surut Hubungan Bima dan Makassar | 2 j 59 m |
| 18 | 24 Jul 2024 | Makna dan Fungsi Ilustrasi Dalam Naskah Batak | 2 j 36 m |
| 19 | 26 Jul 2024 | Citra Perempuan dan Ruwat dalam Naskah Sri Tanjung | 2 j 27 m |
| 20 | 30 Jul 2024 | MARGA, DUSUN, BERLADANG: Manifestasi Sosial Dalam Naskah Undang-Undang Simbur Cahaya | 2 j 43 m |
| 21 | 31 Jul 2024 | Lontara Attoriolong Bone sebagai Legacy Literasi Sejarah, Budaya, dan Kearifan Lokal | 3 j 34 m |
| 22 | 2 Agu 2024 | Aktualisasi Nilai Kidung Bhuwana Winasa dlm Konteks Kehidupan Lokal,Nasional,& Global | 3 j 7 m |
| 23 | 6 Agu 2024 | Aturan Kaum & Aturan Pajak dalam Naskah UU Simbur Cahaya: Perspektif Sejarah & Hukum | 2 j 42 m |

### 6.13 Penggalian Potensi Naskah Kuno Nusantara (7 episode)

*Kategori: Naskah Nusantara & Warisan Budaya · Jenis: Seri resmi · Alamat halaman: `/program/penggalian-potensi-naskah-kuno-nusantara`*

Kegiatan penggalian potensi naskah kuno di daerah. Setiap episode mewakili satu provinsi atau wilayah, sehingga judul bakunya berupa nama wilayah.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 29 Apr 2025 | Lampung | 6 j 41 m |
| 2 | 8 Mei 2025 | Jawa Timur | 6 j 30 m |
| 3 | 14 Mei 2025 | Jakarta | 3 j 23 m |
| 4 | 2 Okt 2025 | Prov. Kepulauan Riau | 3 j 46 m |
| 5 | 20 Mei 2026 | Provinsi Jawa Tengah | 6 d |
| 6 | 21 Mei 2026 | Provinsi Jawa Tengah | 2 j 42 m |
| 7 | 21 Mei 2026 | Provinsi Jawa Tengah | 5 m |

### 6.14 Kelas Literasi Naskah Nusantara (5 episode)

*Kategori: Naskah Nusantara & Warisan Budaya · Jenis: Seri resmi · Alamat halaman: `/program/kelas-literasi-naskah-nusantara`*

Kelas pengenalan naskah Nusantara untuk pemula: nilai pendidikan dalam naskah, citra perempuan, dan kisah pemulangan kepingan sejarah.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 25 Mar 2025 | Sisi Lain Diponegoro: Sang Pangeran dalam Dua Sudut Pandang | 2 j 41 m |
| 2 | 22 Apr 2025 | Citra Perempuan dalam Naskah Kuno | 2 j 20 m |
| 3 | 21 Mei 2025 | Nilai Pendidikan dan Moral Dalam Naskah Kuno | 2 j 16 m |
| 4 | 17 Jun 2025 | Kembalinya Kepingan Sejarah ke Tanah Air | 1 j 50 m |
| 5 | 9 Des 2025 | Konsertina: Asal-usul dan persebaran naskah-naskah Batak dan Ulu | 2 j 5 m |

### 6.15 PESONA NUSANTARA (3 episode)

*Kategori: Naskah Nusantara & Warisan Budaya · Jenis: Seri resmi · Alamat halaman: `/program/pesona-nusantara`*

Liputan kesejarahan dan budaya daerah, menelusuri jejak peristiwa penting di berbagai wilayah Nusantara.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 31 Agu 2020 | KEDIRI: Napak Tilas Rute Gerilya Jenderal Soedirman | 28 m |
| 2 | 1 Sep 2020 | Cirebon: Merdeka 15 Agustus 1945, Sebelum Indonesia Merdeka? | 35 m |
| 3 | 1 Sep 2020 | KARO: Cerita Nasionalisme dari Tanah Karo | 32 m |

### 6.16 Naskah Kuno Indonesia Menuju Ingatan Dunia (2 episode)

*Kategori: Naskah Nusantara & Warisan Budaya · Jenis: Seri resmi · Alamat halaman: `/program/naskah-kuno-indonesia-menuju-ingatan-dunia`*

Seri pendek yang membahas naskah Indonesia yang diusulkan menjadi bagian Memory of the World (Ingatan Dunia).

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 8 Des 2025 | Kakawin Sutasoma | 2 j 12 m |
| 2 | 8 Des 2025 | Karya-karya Syekh Yusuf Makassar | 2 j 30 m |

### 6.17 Kelas Literasi Siniar (17 episode)

*Kategori: Literasi, Minat Baca & Keluarga · Jenis: Seri resmi · Alamat halaman: `/program/kelas-literasi-siniar`*

Siniar kelas literasi untuk keluarga, pendidik, dan komunitas: kebiasaan membaca anak, mendongeng, ilustrasi buku, dan keterampilan digital.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 11 Mar 2025 | Membangun Kebiasaan Membaca pada Anak melalui Kegiatan Mendongeng | 1 j 22 m |
| 2 | 18 Mar 2025 | Trik Memulai Bisnis dari Nol Hingga Ekspor | 1 j 34 m |
| 3 | 23 Apr 2025 | Yuk, Bercerita Lewat Ilustrasi Buku Anak | 1 j 21 m |
| 4 | 15 Mei 2025 | Melirik Keseruan di Komunitas Buku | 1 j 29 m |
| 5 | 22 Mei 2025 | Peran Penting Guru & Pustakawan dalam Menghidupkan Perpustakaan Sekolah | 1 j 25 m |
| 6 | 24 Jun 2025 | Braille dan Audiobook Sebagai Jendela Dunia Teman Netra | 1 j 40 m |
| 7 | 18 Jul 2025 | Kiprah Pustakawan Dari Masa Ke Masa | 1 j 38 m |
| 8 | 29 Jul 2025 | Kesiapan Mental Anak untuk Menghadapi MPLS | 1 j 47 m |
| 9 | 13 Agu 2025 | Keseimbangan dalam Era AI, Inovasi atau Ancaman? | 1 j 7 m |
| 10 | 23 Sep 2025 | Menyambut Era Digital, Kenapa Masih Perlu ke Perpustakaan? | 1 j 15 m |
| 11 | 20 Mei 2026 | Cara Eksklusif Menghabiskan Waktu Luang? | 1 j 4 m |
| 12 | 9 Jul 2026 | Saat AI Seolah Menjawab Segalanya, Apa Pustakawan Masih Dibutuhkan? | 1 j 37 m |
| 13 | 30 Jul 2026 | Skrining Masalah Anak Usia Dini dan Mengenali Tanda Kesiapan Belajar | 1 j 1 m |
| 14 | 5 Agu 2026 | Bullying Pada Anak: Kenali, Cegah, dan Dampingi | 1 j 5 m |
| 15 | 10 Sep 2026 | Kisah Perjalanan Tokoh Perpustakaan: Di Balik Profesi, Ada Cerita | 1 j 6 m |
| 16 | 14 Sep 2026 | Perjalanan Perpustakaan Tual: Nyala Literasi Dari Timur Indonesia | 1 j 5 m |
| 17 | 15 Okt 2026 | Sudah Kerja Keras, Masih Belum Kaya, Salahnya Dimana? | 1 j 42 m |

### 6.18 CERITA BUKI (8 episode)

*Kategori: Literasi, Minat Baca & Keluarga · Jenis: Seri resmi · Alamat halaman: `/program/cerita-buki`*

Siniar ulasan dan cerita buku bersama penulis, pembaca, serta komunitas. Judul episode umumnya memuat nama narasumber dan buku yang dibahas.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 22 Jul 2020 | Bersama Fai - Karena Kau Manusia Sayangi Manusia | 21 m |
| 2 | 19 Agu 2020 | Bersama Natalia Kristiani - "86" | 18 m |
| 3 | 4 Sep 2020 | Bersama Denny Yan Fauzi - Dan Damai di Bumi! | 23 m |
| 4 | 24 Nov 2020 | Bersama Tsabdany Tzahra - Review BUKU: NKCTHI, Geez dan Ann 1, Geez dan Ann 2 | 32 m |
| 5 | 26 Nov 2020 | Bersama MUTIAH SAHARA - Review BUKU: Bulan Nararya, Pelik | 40 m |
| 6 | 26 Nov 2020 | Bersama Puspita Atiyah Saputri - Arah Langkah, Garis Waktu | 27 m |
| 7 | 3 Des 2020 | Bersama MEGA ANGGRAINI-Review BUKU: How to win friends and influence people | 23 m |
| 8 | 3 Des 2020 | Bersama Siti Alfiah - Jangan Membuat Masalah Kecil Jadi Masalah Besar | 20 m |

### 6.19 NGOPI SENSASI (4 episode)

*Kategori: Literasi, Minat Baca & Keluarga · Jenis: Seri resmi · Alamat halaman: `/program/ngopi-sensasi`*

Bincang santai tentang literasi, buku, dan pelayanan publik, termasuk bedah buku dan refleksi hari kunjung perpustakaan.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 25 Jan 2024 | Pelayanan Publik dan Indeks Literasi Masyarakat | 1 j 20 m |
| 2 | 12 Agu 2024 | Bedah Buku Gule Kabung: Konsep Pelayanan Publik Turun Langsung Ke Masyarakat | 55 m |
| 3 | 13 Sep 2024 | Hari Kunjung Perpustakaan: Festival Literasi-Literasi Meningkat Indonesia Hebat | 49 m |
| 4 | 16 Des 2024 | Budaya Literasi Dalam Membangun Mahkamah Konstitusi yang Modern dan Terpercaya | 1 j 5 m |

### 6.20 Diskusi JASMERAH (6 episode)

*Kategori: Sejarah, Kebudayaan & Diskusi Publik · Jenis: Seri resmi · Alamat halaman: `/program/diskusi-jasmerah`*

Diskusi sejarah publik: jalur rempah, maritim Asia Tenggara, sejarah Jakarta, dan refleksi peristiwa kebangsaan.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 31 Agu 2022 | Notaris Batavia Abad 17-18 | 1 j 29 m |
| 2 | 15 Sep 2022 | Rekam Jejak Jalur Rempah di Indonesia | 2 j 36 m |
| 3 | 9 Mar 2023 | Mengenal Dunia Maritim Asia Tenggara | 2 j 55 m |
| 4 | 16 Mei 2023 | Peran Pulau-Pulau Bersejarah di Teluk Jakarta | 2 j 56 m |
| 5 | 16 Okt 2023 | Refleksi Sumpah Pemuda: Cerdas Berakhlak, Literasi Kuat Untuk Indonesia Hebat | 2 j 15 m |
| 6 | 6 Mar 2024 | Indonesia Swasembada Pangan: Antara Kenyataan dan Angan-Angan | 4 j 25 m |

### 6.21 Gelarwicara (2 episode)

*Kategori: Sejarah, Kebudayaan & Diskusi Publik · Jenis: Seri resmi · Alamat halaman: `/program/gelarwicara`*

Talkshow kebudayaan dan pendidikan, antara lain menelusuri lini masa pendidikan di Indonesia.

| No | Tanggal | Judul Baku | Durasi |
|---|---|---|---|
| 1 | 14 Mei 2024 | Lini Masa Pendidikan di Indonesia Hari Ke-1 | 2 j 18 m |
| 2 | 15 Mei 2024 | Lini Masa Pendidikan di Indonesia Hari Ke-2 | 2 j 55 m |

---

## 7. Keranjang “Lainnya”

“Lainnya” berisi **82 video** yang tidak memenuhi syarat seri: webinar tunggal, rekaman acara khusus, liputan kegiatan, dan judul yang hanya muncul sekali. Video di sini tetap tayang dan tetap dapat dicari; yang tidak ada hanyalah halaman seri.

Kolom **Topik** menunjukkan kategori topik yang dipakai untuk penyaringan. Kolom **No** hanya nomor urut dokumen, bukan nomor episode.

| No | Tanggal | Judul Baku | Topik | Durasi |
|---|---|---|---|---|
| 1 | 2 Jul 2020 | Ibu Deputi On Podcast | Layanan | 9 m |
| 2 | 20 Jul 2020 | Kolaborasi Perpustakaan Nasional RI dan Noema Psychology | Layanan | 34 m |
| 3 | 13 Agu 2020 | WEBINAR: Mengenal Lebih Dekat Koleksi Langka Perpustakaan Nasional RI | Naskah | 2 j 31 m |
| 4 | 8 Sep 2020 | Yang Fana Adalah Waktu Kita Abadi - Mengenang Sapardi Djoko Damono | Sejarah | 56 m |
| 5 | 18 Sep 2020 | Hari ke-5, Hari Kunjung Perpustakaan dan Bulan Gemar Membaca | Literasi | 2 j 34 m |
| 6 | 15 Okt 2020 | Visualisasi Naskah dan Animasi | Naskah | 29 m |
| 7 | 16 Okt 2020 | VISUALISASI NASKAH DAN ANIMASI BERSAMA FILOLOG MILENIAL | Naskah | 36 m |
| 8 | 17 Okt 2020 | Sesi 1 Teori Workshop Kopi | Layanan | 3 j 49 m |
| 9 | 17 Okt 2020 | Sesi 4 - Workshop E-Commerce Untuk Masyarakat | Layanan | 2 j 2 m |
| 10 | 18 Okt 2020 | Hari ke-3, 25 Tahun Hari Kunjung Perpustakaan dan Bulan Gemar Membaca. Penguatan Literasi Digital | Literasi | 2 j 58 m |
| 11 | 18 Okt 2020 | Hari ke-6, Hari Kunjung Perpustakaan dan Bulan Gemar Membaca | Literasi | 2 j 10 m |
| 12 | 18 Okt 2020 | Sesi 2 Kelas Workshop E-Commerce Untuk Masyarakat. | Layanan | 1 j 34 m |
| 13 | 18 Okt 2020 | Sesi 2 Teori Workshop Kopi | Layanan | 3 j 57 m |
| 14 | 26 Okt 2020 | JEJAK PERLAWANAN SANG PANGERAN | Sejarah | 5 m |
| 15 | 26 Okt 2020 | KELAHIRAN SANG LEGENDA I LA GALIGO | Sejarah | 7 m |
| 16 | 26 Okt 2020 | PANJI SANG PEMERSATU | Sejarah | 8 m |
| 17 | 26 Okt 2020 | Prasetya / ( Sumpah Setia ) Gadjah Mada# Sepenggal Kisah Dari Majapahit | Sejarah | 7 m |
| 18 | 26 Okt 2020 | TIGA IKAN BERSAUDARA | Layanan | 9 m |
| 19 | 19 Nov 2020 | Librarian Career Path - Sharing Perjalanan Karir Sebagai Pustakawan | Layanan | 2 j 17 m |
| 20 | 20 Nov 2020 | Waktunya Gen Z | Layanan | 44 m |
| 21 | 1 Apr 2021 | 100 Tahun Usmar Ismail & Retrospeksi Rempo Urip Tanggal 29 Maret 2021 | Sejarah | 1 j 39 m |
| 22 | 1 Apr 2021 | 100 Tahun Usmar Ismail & Retrospeksi Rempo Urip Tanggal 30 Maret 2021 | Sejarah | 2 j 8 m |
| 23 | 28 Apr 2021 | Sharing session: Peran Milenial di Hari Buku Sedunia | Literasi | 1 j 5 m |
| 24 | 10 Mei 2021 | Podcast BIP_Perpusnas - Peran dan Kiprah Pustakawan Milenial Perpustakaan Nasional RI | Layanan | 50 m |
| 25 | 18 Mei 2021 | Greeting Hut Perpusnas RI Ke-41 dari Surface Band: Layanan Teater Mini dan Studio Musik | Layanan | 1 m |
| 26 | 25 Mei 2021 | Sharing Session: Arti Perpusnas Bagiku | Layanan | 16 m |
| 27 | 31 Mei 2021 | Ngobrol Literasi Sastra Digital Bareng Anak Muda with Ziliun | Literasi | 53 m |
| 28 | 30 Jun 2021 | Berbagi Ruang Pustaka: berbagi ruang literasi mengembangkan perpustakaan komunitas dengan katakerja | Literasi | 1 j 40 m |
| 29 | 16 Jul 2021 | EKSISTENSI PUSTAKAWAN SEKOLAH DIMASA PANDEMI | Literasi | 2 j 24 m |
| 30 | 23 Jul 2021 | DIGITAL STORYTELLING UNTUK TUJUAN REKREATIF DAN EDUKATIF | Layanan | 2 j 9 m |
| 31 | 19 Agu 2021 | Kelas Literasi Informasi 3 | Literasi | 3 j 11 m |
| 32 | 26 Agu 2021 | Simposium Internasional Pernaskahan Nusantara Ke-18 | Naskah | 6 j 1 m |
| 33 | 30 Sep 2021 | SEKOLAH KONTEN _ Pentingnya Pembuatan Konten Oleh Pustakawan Untuk Meningkatkan Literasi | Literasi | 2 j 17 m |
| 34 | 4 Nov 2021 | Edukasi E-Library \| Bersama UPT Perpustakaan Institut Seni Indonesia Padangpanjang dengan Perpusnas | Layanan | 3 j 43 m |
| 35 | 17 Nov 2021 | FGD Survei Kepuasan Pemustaka | Layanan | 2 j 31 m |
| 36 | 5 Des 2021 | PAGELARAN WAYANG KULIT \| Ki Nartosabdo Dalam Lakon PAMUKSO ( Pandu Gugur ) | Sejarah | 4 j 43 m |
| 37 | 7 Des 2021 | Meniti Jalan Literasi Untuk Wujudkan SDM Unggul Indonesia Maju | Literasi | 54 m |
| 38 | 10 Des 2021 | International Webinar On \| Family Literacy and Indigenous and Local Learning | Layanan | 2 j 47 m |
| 39 | 16 Des 2021 | #1 REVIEW BUKU: Sri Menanti _Karya Joko Pinurbo | Literasi | 14 m |
| 40 | 16 Des 2021 | #2 REVIEW BUKU: Filosofi teras, filsafat Yunani-Romawi kuno untuk mental tangguh masa kini | Literasi | 10 m |
| 41 | 19 Apr 2022 | Podcast Tradisi & Kebudayaan \| NgeBaPer ( Ngabuburit Bareng Perpusnas ) | Layanan | 1 j 46 m |
| 42 | 21 Apr 2022 | TalkShow Masak Ala Perpusnas \| NgeBaPer ( Ngabuburit Bareng Perpusnas ) | Layanan | 1 j 34 m |
| 43 | 23 Mei 2022 | Pemanfaatan E-Resources, iPusnas, dan Khastara | Layanan | 2 j 53 m |
| 44 | 27 Mei 2022 | Peran Naskah Nusantara Dalam Dunia Pernaskahan dan Ilmu Pengetahuan | Naskah | 2 j 14 m |
| 45 | 16 Jun 2022 | Haji Dalam Lintas Sejarah; Perspektif Arsiparis, Sejarawan dan Pustakawan | Sejarah | 2 j 2 m |
| 46 | 20 Jul 2022 | Talkshow Literasi \| Ilustrasi Cerita Anak: Buku Anak Yang Baik dan Berkualitas | Literasi | 2 j 22 m |
| 47 | 24 Agu 2022 | Talkshow Inspiratif: Kemerdekaan Dalam Keterbatasan | Layanan | 1 j 57 m |
| 48 | 31 Agu 2022 | Budaya Literasi dan Perilaku Pencarian Informasi Siswa | Literasi | 1 j 37 m |
| 49 | 16 Sep 2022 | FGD Strategi Komunikasi Digital dalam Layanan Referensi Virtual | Layanan | 2 j 37 m |
| 50 | 20 Sep 2022 | FGD \| Layanan Prima | Layanan | 2 j 50 m |
| 51 | 16 Nov 2022 | FGD Koleksi Langka \| Bangunan Bersejarah Di Jakarta Pada Masa Pra-Kemerdekaan (1920-1945) | Naskah | 2 j 16 m |
| 52 | 17 Nov 2022 | Sejarah Nama - Nama Jalan Di Jakarta | Sejarah | 2 j 28 m |
| 53 | 4 Apr 2023 | Komunitas SAL Gamelan | Sejarah | 1 m |
| 54 | 13 Apr 2023 | Pemanfaatan Koleksi Digital Perpusnas RI Bersama Universitas Dinamika Bangsa Jambi | Layanan | 2 j 52 m |
| 55 | 19 Jun 2023 | Gita Murti | Layanan | 5 m |
| 56 | 24 Jul 2023 | Graha Literasi Perpustakaan Nasional RI | Literasi | 2 m |
| 57 | 20 Agu 2023 | SAL Gamelan Minggu 20 Agustus 2023 | Sejarah | 7 m |
| 58 | 20 Agu 2023 | SAL Gamelan gending Asmorodono | Sejarah | 9 m |
| 59 | 8 Des 2023 | Kapus Menyapa - ASN Adaptif Menjawab Perubahan | Layanan | 1 m |
| 60 | 13 Mei 2024 | Festival Literasi Nusantara I 44 Tahun Perpusnas, Merajut Asa Melayani Negeri | Literasi | 1 j 50 m |
| 61 | 12 Sep 2024 | Seminar Naskah Kuno dan Anak: Literasi Bermain, Belajar, dan Berkreatifitas | Naskah | 2 j 59 m |
| 62 | 3 Feb 2025 | Siniar "200 Tahun Perang Jawa" #1: Lahirnya Sang Pangeran | Sejarah | 57 m |
| 63 | 4 Jun 2025 | Diseminasi Naskah Ingatan Kolektif Nasional: Ingok Perjanjian Kita (Lampung) | Naskah | 2 j 45 m |
| 64 | 12 Jun 2025 | Menuju 500th Jkt: Warisan Naskah Pecenongan sebagai Cermin Literasi, Budaya, & Identitas Kota Global | Naskah | 2 j 36 m |
| 65 | 13 Jun 2025 | Diseminasi Naskah IKON: Naskah Poerba Ratoe Menuju Ingatan Kolektif Nasional | Naskah | 2 j 14 m |
| 66 | 16 Jun 2025 | Isti'datul Maut: Telaah Awal Naskah Syaikhona Kholil Menuju IKON | Naskah | 2 j 41 m |
| 67 | 25 Jun 2025 | Menyingkap Warisan Intelektual Syaikhona Kholill | Naskah | 2 j 1 m |
| 68 | 26 Jun 2025 | Naskah Pecenongan Untuk Warga Jakarta: Alih Media sebagai Sarana Pelestarian Pengetahuan dan Sejarah | Naskah | 2 j 22 m |
| 69 | 1 Jul 2025 | Menjaga Jejak, Merawat Warisan: Naskah Kuno Lampung Menuju IKON 2025 | Naskah | 2 j 14 m |
| 70 | 2 Jul 2025 | Menguatkan Ingatan: Warisan Intelektual Syaikhona Kholill dalam Kehidupan Bernegara dan Beragama | Naskah | 1 j 45 m |
| 71 | 13 Nov 2025 | Jejak Literasi Melayu: Mengangkat Karya Raja Ali Haji sebagai IKON Kepri | Naskah | 3 j 6 m |
| 72 | 2 Des 2025 | Strategi Pelestarian, Penelusuran dan Diseminasi Karya Raja Ali Haji sebagai Warisan Literasi Kepri | Naskah | 2 j 36 m |
| 73 | 17 Des 2025 | Mahkamah Konstitusi & Literasi Konstitusi | Literasi | 2 j 5 m |
| 74 | 4 Feb 2026 | Siniar Peringatan World Read Aloud Day 2026 | Literasi | 1 j 5 m |
| 75 | 26 Feb 2026 | Berbagi Kebaikan Melalui Tulisan bersama Dr. Drs. Joko Santoso, M.Hum | Literasi | 1 j 0 m |
| 76 | 11 Mar 2026 | Siniar Ramadhan I Menulis Kebaikan di Bulan Ramadan | Literasi | 56 m |
| 77 | 14 Jul 2026 | Cozy Corner \| Romantika Sastra: Perjalanan Berkarya Seorang Nia S. Amira | Literasi | 1 j 9 m |
| 78 | 30 Sep 2026 | SINIAR BERSAMA DIPLOMAT \| Kontribusi Perpustakaan Menjawab Tantangan Keberagaman | Layanan | 1 j 17 m |
| 79 | 8 Okt 2026 | Pustakawan dalam Konteks Sosial&Budaya:Pustakawan sebagai Penggerak Budaya Baca& Pembangun Peradaban | Literasi | 1 j 30 m |
| 80 | 30 Okt 2026 | 25 Tahun GPMB: Refleksi Perjalanan, Konsolidasi Gerakan, dan Penguatan Literasi Indonesia | Literasi | 1 j 11 m |
| 81 | 2 Nov 2026 | PUSTAKAWAN BUKAN SEKADAR PENJAGA BUKU, TETAPI PENJAGA INGATAN BANGSA! | Literasi | 1 j 45 m |
| 82 | 10 Nov 2026 | Pustaka, Kuasa, & Ingatan: Menghidupkan Kembali Perjuangan Pahlawan Perempuan dalam Gelar Nasional | Sejarah | 1 j 51 m |

Beberapa judul pada keranjang ini terlihat mirip, misalnya *Visualisasi Naskah dan Animasi* dan *VISUALISASI NASKAH DAN ANIMASI BERSAMA FILOLOG MILENIAL*. Keduanya adalah video berbeda, sehingga tidak digabung.

---

## 8. Aturan Penulisan dan Penomoran

### 8.1 Judul baku

1. Judul baku **tidak memuat merek seri**. Merek sudah tampil pada halaman seri dan remah navigasi.
2. Judul baku **tidak memuat nomor episode**. Nomor diurus sistem (`PR-29`).
3. Judul baku **tidak memuat emoji** dan **tidak memuat tanda pagar** di awal, kecuali tanda pagar yang menandai nomor urut acara seperti `#1 REVIEW BUKU`.
4. Nama orang, lembaga, dan nama diri **tidak diterjemahkan** dan **tidak diubah hurufnya**.
5. Bila setelah pembersihan judul menjadi kosong atau kurang dari tiga huruf, judul asli dipakai kembali; bila yang tertinggal hanya tanggal di dalam tanda kurung, tanggal itu yang dipakai.
6. Perbaikan ejaan yang salah ketik pada judul asli **tidak dilakukan** di dokumen ini, kecuali menghilangkan merek yang salah ketik. Perbaikan isi judul adalah keputusan pengelola.

### 8.2 Nomor episode

- Nomor dihitung **per seri**, mulai dari 1, mengikuti urutan tanggal tayang paling awal.
- Bila dua episode tayang pada tanggal yang sama, urutan ditentukan oleh judul secara alfabetis, lalu oleh pengenal video. Urutan ini hanya untuk penomoran, bukan penilaian.
- Baris ganda memakai nomor yang sama, sehingga tidak ada nomor yang melompat.
- Nomor **tidak boleh diisi manual** di panel. Bila tanggal tayang diperbaiki, nomor menyesuaikan sendiri.
- Video pada “Lainnya” **tidak diberi nomor episode**.

### 8.3 Pemberian topik pada “Lainnya”

Topik ditentukan dari kata kunci judul, dengan urutan pemeriksaan: naskah dan warisan budaya lebih dahulu, lalu sejarah dan kebudayaan, lalu literasi dan keluarga, dan sisanya layanan perpustakaan. Urutan ini mencegah judul seperti *Seminar Naskah Kuno dan Anak* jatuh ke kategori literasi hanya karena memuat kata “anak”.

### 8.4 Contoh penerapan

| Judul Asli | Judul Baku | Alasan |
|---|---|---|
| `🎙️ LibTalk \| Seri Penelusuran Informasi : Sumber - sumber Informasi Ilmu Hukum` | `Seri Penelusuran Informasi: Sumber-sumber Informasi Ilmu Hukum` | Emoji, merek, spasi tanda baca dirapikan |
| `KUNJUNGAN VIRTUAL KE PERPUSNAS \| SD TRI RATNA JAKARTA` | `SD TRI RATNA JAKARTA` | Merek kunjungan dihapus; huruf kapital dipertahankan |
| `FGD IKON #1 I Kupas Tuntas Aturan Pergaulan…` | `Kupas Tuntas Aturan Pergaulan…` | Merek dan nomor dihapus; pemisah `I` dikenali sebagai garis |
| `CERITA BUKI#Bersama Tsabdany Tzahra - Review BUKU : NKCTHI…` | `Bersama Tsabdany Tzahra - Review BUKU: NKCTHI…` | Tanda pagar dan spasi dirapikan |
| `Penggalian Potensi Naskah Kuno Nusantara sebagai Ingatan Kolektif Nasional (Lampung)` | `Lampung` | Judul baku berupa wilayah agar mudah dibedakan |
| `AP PASTI Menyapa - 27 Agustus 2020` | `27 Agustus 2020` | Tidak ada topik lain pada judul; tanggal menjadi pembeda |

---

## 9. Peta Konten ke Halaman Website

Taksonomi ini langsung menentukan isi halaman. Tidak ada halaman tambahan di luar peta situs dokumen `01`.

| Halaman | Alamat | Yang Diambil dari Dokumen Ini |
|---|---|---|
| **Program & Siniar** | `/program` | 21 kartu seri + 1 pintu masuk “Lainnya”; saringan 4 kategori topik |
| **Detail Seri** | `/program/{nama-seri}` | Judul seri, deskripsi, kategori, jumlah episode, dan daftar episode bernomor |
| **Detail Episode** | `/program/{nama-seri}/{judul-episode}` | Judul baku, tanggal, durasi, nomor episode, tautan YouTube asli |
| **Hasil Pencarian** | `/cari?q=...` | Pencarian atas judul baku dan nama seri, bukan judul asli |
| **Beranda** | `/` | Enam kartu seri unggulan (`PR-45`) dan episode terbaru |

Daftar alamat halaman seri:

| No | Seri | Alamat Halaman | Video unik |
|---|---|---|---|---|
| 1 | LibTalk | `/program/libtalk` | 41 |
| 2 | SUPER MORNING | `/program/super-morning` | 30 |
| 3 | Bimbingan Pemustaka & Literasi Informasi | `/program/bimbingan-pemustaka-dan-literasi-informasi` | 29 |
| 4 | Sosialisasi Program & Layanan Perpusnas | `/program/sosialisasi-program-dan-layanan-perpusnas` | 15 |
| 5 | LibTalk Reference Series | `/program/libtalk-reference-series` | 9 |
| 6 | Kunjungan Virtual ke Perpusnas | `/program/kunjungan-virtual-ke-perpusnas` | 8 |
| 7 | AP PASTI Menyapa | `/program/ap-pasti-menyapa` | 7 |
| 8 | SUDUT INSPIRASI | `/program/sudut-inspirasi` | 5 |
| 9 | DP on Podcast | `/program/dp-on-podcast` | 1 |
| 10 | Seri Pengantar Teori Ilmu Perpustakaan, Arsip, dan Museum | `/program/seri-pengantar-teori-ilmu-perpustakaan-arsip-dan-museum` | 2 |
| 11 | Diskusi Naskah Nusantara | `/program/diskusi-naskah-nusantara` | 25 |
| 12 | FGD IKON | `/program/fgd-ikon` | 23 |
| 13 | Penggalian Potensi Naskah Kuno Nusantara | `/program/penggalian-potensi-naskah-kuno-nusantara` | 7 |
| 14 | Kelas Literasi Naskah Nusantara | `/program/kelas-literasi-naskah-nusantara` | 5 |
| 15 | PESONA NUSANTARA | `/program/pesona-nusantara` | 3 |
| 16 | Naskah Kuno Indonesia Menuju Ingatan Dunia | `/program/naskah-kuno-indonesia-menuju-ingatan-dunia` | 2 |
| 17 | Kelas Literasi Siniar | `/program/kelas-literasi-siniar` | 17 |
| 18 | CERITA BUKI | `/program/cerita-buki` | 8 |
| 19 | NGOPI SENSASI | `/program/ngopi-sensasi` | 4 |
| 20 | Diskusi JASMERAH | `/program/diskusi-jasmerah` | 6 |
| 21 | Gelarwicara | `/program/gelarwicara` | 2 |
| — | **Lainnya** | `/program/lainnya` | 82 |

Catatan penerapan:

- Kartu “Lainnya” tampil paling akhir dan memakai keterangan singkat: *“Video lepas yang tidak termasuk seri.”*
- Jumlah pada kolom **Video unik** (total 331) adalah angka yang tampil di website. Angka 337 baris tetap disimpan sebagai catatan migrasi dan tidak ditampilkan ke pengunjung.
- Saringan kategori hanya menampilkan kategori yang memiliki seri. Karena keempat kategori terisi, keempatnya tampil.
- Remah navigasi pada detail episode: *Beranda / Program & Siniar / Nama Seri / Judul Episode*.
- Judul asli YouTube tetap disimpan sebagai metadata, tetapi **tidak ditampilkan** sebagai judul utama agar tidak terjadi dua judul berbeda pada satu halaman. Tautan “Lihat di YouTube” tetap disediakan.
- Kolom pencarian mencocokkan judul baku, nama seri, dan nama narasumber bila nanti diisi, bukan judul asli yang masih mengandung emoji.

---

## 10. Catatan Kualitas Data

Bagian ini mencatat hal-hal yang perlu diketahui pengelola sebelum data dimasukkan ke panel. Semua temuan berasal dari data publik, bukan dugaan.

### 10.1 Baris ganda

Tiga video tercatat lebih dari sekali, sehingga jumlah baris menjadi 337 sedangkan video uniknya 331:

| Video | Baris | Judul Baku | Seri |
|---|---|---|---|
| `G9NHxEkWBDc` | 4 | Duta Perpusnas dan Perayaan Kemerdekaan RI | DP on Podcast |
| `p9yN1CeocTo` | 2 | Pengembangan Tata Bahasa Komputasional Untuk Bahasa Jawa Kuno | Diskusi Naskah Nusantara |
| `ho9emkO5IbI` | 3 | Pengembangan Tata Bahasa Komputasional Untuk Bahasa Jawa Kuno | Diskusi Naskah Nusantara |

Saran: pada saat impor, sistem menyimpan satu kartu per pengenal video. Baris kedua dan seterusnya diabaikan, sehingga katalog menampilkan 331 video unik tanpa kehilangan data. Sembilan baris di atas mewakili tiga video, jadi ada **6 baris berlebih**.

### 10.2 Video berdurasi sangat pendek

Terdapat **13 video unik** berdurasi di bawah lima menit. Video seperti ini umumnya merupakan potongan pengumuman, cuplikan, atau rekaman yang terputus. Sesuai `M-16`, konten uji siaran dan konten internal tidak ditampilkan; karena itu video berikut perlu diperiksa satu per satu sebelum dinaikkan ke katalog utama.

| Tanggal | Judul Baku | Durasi | Seri |
|---|---|---|---|
| 18 Mei 2021 | Greeting Hut Perpusnas RI Ke-41 dari Surface Band: Layanan Teater Mini dan Studio Musik | 1 menit | Lainnya |
| 24 Jun 2021 | #2 TESTIMONI DUKUNGAN PROYEK PERUBAHAN KARTU ANGGOTA LAYANAN PERPUSTAKAAN BERBASIS NIK | 3 menit | Sosialisasi Program & Layanan Perpusnas |
| 23 Feb 2022 | Seri Penelusuran Informasi: Sumber-sumber Informasi Bidang Ilmu Kedokteran | 24 detik | LibTalk |
| 23 Mei 2022 | Seri Penelusuran Informasi Bidang Ilmu Terapan | 1 menit | LibTalk |
| 27 Jun 2022 | Zona Integritas Pusat Pendidikan dan Pelatihan Perpustakaan Nasional RI | 3 menit | Sosialisasi Program & Layanan Perpusnas |
| 4 Apr 2023 | Komunitas SAL Gamelan | 1 menit | Lainnya |
| 10 Apr 2023 | Kunjungan Homeschool For Life (HS4Life) | 37 detik | Kunjungan Virtual ke Perpusnas |
| 21 Mei 2023 | Pengembangan Tata Bahasa Komputasional Untuk Bahasa Jawa Kuno | 5 detik | Diskusi Naskah Nusantara |
| 24 Jul 2023 | Graha Literasi Perpustakaan Nasional RI | 2 menit | Lainnya |
| 8 Des 2023 | Kapus Menyapa - ASN Adaptif Menjawab Perubahan | 1 menit | Lainnya |
| 13 Jan 2025 | Pengembangan Tata Bahasa Komputasional Untuk Bahasa Jawa Kuno | 12 detik | Diskusi Naskah Nusantara |
| 20 Mei 2026 | Provinsi Jawa Tengah | 6 detik | Penggalian Potensi Naskah Kuno Nusantara |
| 7 Okt 2026 | Gebrakan Baru Untuk Meningkatkan Pelayanan Prima | 0 detik | SUPER MORNING |

Satu video berdurasi **0 detik** (*SUPER MORNING — Gebrakan Baru Untuk Meningkatkan Pelayanan Prima*, 7 Oktober 2026). Video ini kemungkinan besar gagal diproses atau merupakan siaran yang terputus, sehingga perlu dicek langsung di kanal.

### 10.3 Konten yang tidak masuk

| Kelompok | Jumlah | Perlakuan |
|---|---|---|
| Video privat | 160 | Tidak diimpor (`M-04`) |
| Video unlisted | 10 | Tidak diimpor (`M-04`) |
| **Subtotal yang tidak diimpor** | **170** | 507 − 337 = 170 baris |
| Konten yang sudah hilang dari kanal | 11 | Temuan terpisah pada dokumen `01` Bagian 2; tidak termasuk 170 baris di atas dan tidak dapat ditampilkan karena sumbernya tidak tersedia |

### 10.4 Ketidakkonsistenan judul asli

Sebanyak **116 judul asli** sudah memuat nomor episode, dihitung dari empat pola yang muncul: `#04`, `Sesi 2`, `(S2)`, dan angka setelah nama seri seperti `Diskusi Naskah Nusantara 26`. Penulisannya tidak seragam, bahkan ada nomor yang terpakai dua kali pada seri yang sama: *Kelas Literasi Naskah Nusantara* memakai `#1` untuk dua episode berbeda dan *SUDUT INSPIRASI* memakai `#4` dua kali. Karena nomor dihitung ulang otomatis (`PR-29`), keadaan ini tidak lagi memengaruhi tampilan website.

Hal lain yang ditemukan:

- Nama seri pada judul asli kerap salah ketik, misalnya `APM PASTI Menyapa`, `Perpusatakaan`, dan `Lib-Talks!`. Semuanya sudah dipetakan ke ejaan baku.
- Sebagian judul memakai huruf kapital semua, sebagian memakai huruf judul. Keduanya dipertahankan.
- Beberapa judul memuat dua sub-judul yang dipisah titik dua. Bagian setelah titik dua dipertahankan karena biasanya memuat topik, bukan merek seri.
- **Judul pada data sumber terpotong pada 100 karakter.** Contohnya judul episode BIMBINGAN PEMUSTAKA ONLINE KLASIKA berhenti pada kata “MASA”. Judul baku mengikuti data yang ada; pengelola perlu melengkapi judul dari kanal YouTube saat memasukkan data ke panel.
- **Judul yang sama tidak selalu berarti video yang sama.** Tiga video *SUPER MORNING — Gebrakan Baru Untuk Meningkatkan Pelayanan Prima* adalah tiga unggahan berbeda, dan LibTalk *Ilmu Kedokteran* muncul sebagai klip 24 detik sekaligus rekaman penuh 2 jam 10 menit. Keduanya dihitung sebagai episode berbeda.

---

## 11. Pemeliharaan Taksonomi

### 11.1 Menambah episode baru

1. Tentukan seri yang tepat. Bila ragu, cek Bagian 5 dan Bagian 6 lebih dahulu.
2. Tulis judul baku mengikuti aturan Bagian 8. Jangan menyalin judul YouTube apa adanya.
3. Isi tanggal tayang dengan benar. Nomor episode akan menyesuaikan sendiri.
4. Bila video baru tidak cocok dengan seri mana pun dan bersifat tunggal, tempatkan di “Lainnya” dan beri topik.

### 11.2 Mengubah atau menggabungkan seri

| Tindakan | Wewenang | Catatan |
|---|---|---|
| Mengubah nama tampilan seri | Superadmin | Nama baku pada dokumen ini harus diperbarui agar tetap menjadi acuan |
| Menggabungkan dua seri | Superadmin | Hanya bila isinya benar-benar satu program |
| Memindahkan satu episode | Admin | Cukup satu episode; nomor kedua seri menyesuaikan otomatis |
| Menambah seri baru | Superadmin | Minimal 3 episode, atau memakai nama dan penomoran seri yang jelas |

### 11.3 Peninjauan berkala

Taksonomi ditinjau **setiap enam bulan** atau setiap kali muncul seri baru yang mencapai tiga episode. Peninjauan mencakup: seri yang tidak pernah bertambah, “Lainnya” yang mulai membesar, dan judul baku yang masih memuat merek seri. Hasil peninjauan dicatat pada riwayat revisi dokumen ini.

Ambang yang perlu dijaga: bila “Lainnya” melebihi **sepertiga** dari seluruh katalog, perlu dipertimbangkan seri baru dari kelompok judul yang berulang.

---

## 12. Penutup dan Langkah Berikutnya

Dokumen ini menutup pekerjaan penataan konten yang dimandatkan `M-03`: seluruh 337 baris data publik sudah punya rumah, judulnya sudah dibakukan, dan setiap seri punya alamat halaman yang jelas. Setelah duplikat digabung, **331 video unik** menjadi isi katalog yang tampil di website. Yang tersisa adalah pekerjaan teknis dan pengisian data di panel.

Langkah berikutnya:

| Langkah | Keluaran | Rujukan |
|---|---|---|
| Menyusun dokumen `03` | Rancangan data dan antarmuka panel pengelola — **selesai** | `01` Bagian 12 |
| Menyusun dokumen `04` | Rancangan halaman pengunjung: beranda, jadwal, program, detail episode, pencarian, dan halaman statis — **selesai** | `01` Bagian 6 |
| Memasukkan data ke panel | 21 seri (249 episode unik) dan 82 video “Lainnya” | Dokumen ini |
| Memeriksa video pendek dan video 0 detik | Keputusan tampil atau simpan sebagai arsip internal | Bagian 10.2, `M-16` |
| Menetapkan narasumber dan moderator | Metadata episode lengkap | `IK-5` |

Dokumen ini sudah disahkan. Daftar seri pada Bagian 5 dan aturan penulisan pada Bagian 8 berlaku sebagai acuan kerja; perubahan taksonomi dicatat pada riwayat revisi.

---

## Riwayat Revisi

| Versi | Tanggal | Perubahan | Penyusun |
|---|---|---|---|
| 1.0 | 17 November 2026 | Versi final awal: 21 seri resmi, keranjang “Lainnya”, 4 kategori topik, aturan penamaan dan penomoran | Gusti Ahmad Muttahid Bilhaq |
| 1.1 | 17 November 2026 | Penyelarasan angka: 337 baris data publik dibedakan dari 331 video unik; tabel kategori, tabel seri, peta halaman, dan langkah berikutnya menampilkan kolom baris serta video unik; judul DP on Podcast dan Diskusi Naskah Nusantara disesuaikan | Gusti Ahmad Muttahid Bilhaq |
| 1.2 | 17 November 2026 | Pembaruan rujukan acuan ke dokumen `01` versi 2.2 pasca-kesepakatan hosting GitHub Pages dan Supabase | Gusti Ahmad Muttahid Bilhaq |
