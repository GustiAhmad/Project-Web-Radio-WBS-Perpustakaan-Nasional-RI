# Kebutuhan Fungsional dan Prioritas
## Website Radio & Siniar WBS Perpusnas

> **Catatan Tahap 11:** Dokumen ini memuat rancangan awal dengan istilah Tanya Jawab On-Air dan tabel `sesi_onair`/`pertanyaan`. Sejak Tahap 11, fitur aktifnya adalah **Chat live** dengan tabel `sesi_chat` dan `chat_pesan`. Rincian perubahan ada di `roadmap-implementasi.md` bab Tahap 11.

| Keterangan | Isi |
|---|---|
| **Nomor Dokumen** | 05 |
| **Nama Dokumen** | Kebutuhan Fungsional dan Prioritas (*Functional Requirements & Priorities*) |
| **Nama Situs** | Radio & Siniar WBS Perpusnas |
| **Versi** | 1.0 — Final |
| **Tanggal** | 17 November 2026 |
| **Status** | Final — Menjadi jembatan antara kebutuhan bisnis PRD dan spesifikasi arsitektur teknis Gelombang 2 |
| **Penyusun** | Gusti Ahmad Muttahid Bilhaq (Mahasiswa Magang Teknik Informatika di PUJASINTARA) |
| **Pembaca Utama** | Tim Pengembang Perangkat Lunak & Pustakawan Pengelola Layanan Radio dan Siniar WBS |
| **Acuan** | Dokumen `01` versi 2.2, dokumen `02` versi 1.2, dokumen `03` versi 1.2, dan dokumen `04` versi 1.1 |
| **Sifat Dokumen** | Dokumen Teknis & Operasional; perubahan kebutuhan wajib melalui persetujuan bersama dan dicatat pada riwayat revisi |

---

## 0. Cara Membaca Dokumen Ini

Dokumen ini adalah **spesifikasi fungsional resmi** yang menjabarkan secara rinci apa yang harus dibangun oleh pengembang dan bagaimana setiap fitur harus berperilaku saat diuji oleh pustakawan. Dokumen ini mengubah kebutuhan tingkat tinggi pada Dokumen `01` (`PR-01` s.d. `PR-49`) serta rancangan layar pada Dokumen `03` dan `04` menjadi butir-butir fungsional bernomor (**`FR-01` s.d. `FR-53`**).

Setiap kebutuhan fungsional dilengkapi dengan:
1. **Pernyataan Kebutuhan (*User Story / Functional Statement*):** Siapa penggunanya, apa tindakannya, dan apa hasil yang diharapkan.
2. **Prioritas MoSCoW:** Status urgensi implementasi (**Must Have**, **Should Have**, **Could Have**, **Won't Have**).
3. **Masukan (*Input*), Proses (*Logic*), dan Keluaran (*Output*):** Batasan data dan alur sistem.
4. **Kriteria Penerimaan (*Acceptance Criteria*):** Skenario pengujian terukur berbasis format *Given-When-Then* atau *checklist* yang wajib dipenuhi sebelum fitur dinyatakan selesai.
5. **Rujukan Terkait:** Penelusuran ke pasal PRD (`PR-*`), keputusan musyawarah (`M-*`, `K-*`, `DR-*`), rancangan admin (`03`), dan halaman pengunjung (`04`).

| Bagian | Isi Utama | Sasaran Pembaca |
|---|---|---|
| **Bagian 1–2** | Ringkasan, prinsip penentuan prioritas, dan metode MoSCoW | Pustakawan, Pengembang, Pimpinan |
| **Bagian 3** | Kebutuhan Modul 1: Siaran Radio 24 Jam & Jadwal Tetap (`FR-01`–`FR-08`) | Pengembang & Penyiar |
| **Bagian 4** | Kebutuhan Modul 2: Katalog Video & Siniar YouTube (`FR-09`–`FR-18`) | Pengembang & Pengelola Katalog |
| **Bagian 5** | Kebutuhan Modul 3: Sesi Interaktif On-Air & Pertanyaan (`FR-19`–`FR-26`) | Pengembang & Penyiar |
| **Bagian 6** | Kebutuhan Modul 4: Acara Mendatang & Blok Beranda (`FR-27`–`FR-32`) | Pengembang & Pengelola Konten |
| **Bagian 7** | Kebutuhan Modul 5: Pencarian Global & Navigasi (`FR-33`–`FR-36`) | Pengembang Frontend |
| **Bagian 8** | Kebutuhan Modul 6: Halaman Statis & Informasi Layanan (`FR-37`–`FR-42`) | Pengembang & Humas |
| **Bagian 9** | Kebutuhan Modul 7: Autentikasi Pengelola & Keamanan Supabase (`FR-43`–`FR-48`) | Pengembang Backend / Keamanan |
| **Bagian 10** | Kebutuhan Modul 8: Laporan Statistik & Analitik GA4 (`FR-49`–`FR-53`) | Pengembang & Superadmin |
| **Bagian 11** | Batasan Tegas di Luar Cakupan (*Out-of-Scope*) | Semua Pihak |
| **Bagian 12** | Matriks Ketertelusuran Kebutuhan (*Traceability Matrix*) | Tim Penguji & Pustakawan |
| **Bagian 13** | Penutup & Langkah Menuju Dokumen 06 | Pengembang |

---

## 1. Ringkasan Eksekutif & Struktur Kebutuhan Fungsional

Sesuai keputusan final yang disepakati pada Dokumen `01` s.d. `04`, pembangunan website **Radio & Siniar WBS Perpusnas** bertumpu pada **dua entitas layanan utama** (`K-4`):
1. **Layanan Siaran Radio 24 Jam:** Audio dipancarkan langsung melalui aliran **Icecast studio** (wajib HTTPS / reverse proxy SSL), sedangkan manajemen *playout* materi musik dan siaran sepenuhnya berjalan di studio menggunakan **Jazler RadioStar 2** (`K-5`, `M-17`). Website bertindak sebagai pemutar audio persisten dan papan jadwal 24 jam interaktif tanpa kontrol pemutaran audio di panel admin (`M-18`).
2. **Layanan Katalog Video & Siniar:** Menata **337 baris data publik** menjadi **331 video unik** (249 episode pada 21 seri resmi dan 82 video pada keranjang "Lainnya") yang di-*embed* langsung dari kanal YouTube resmi WBS Radio Perpusnas (`K-2`, `M-03`, `M-04`). Konten privat, *unlisted*, uji siaran, dan internal kepegawaian diabaikan dari katalog publik (`M-16`).

Arsitektur sistem dibangun di atas fondasi **GitHub Pages** (hosting statis berkecepatan tinggi pada domain terpisah) yang dihubungkan dengan **Supabase** (BaaS tier gratis) untuk menangani autentikasi pengelola (*Superadmin* dan *Admin*), basis data PostgreSQL, langganan pembaruan tanya jawab seketika (*realtime*), dan penyimpanan berkas gambar sampul (`M-02`, `DR-09`).

Total kebutuhan fungsional yang ditetapkan dalam dokumen ini berjumlah **53 butir fungsional (`FR-01` s.d. `FR-53`)**, yang terdistribusi ke dalam 8 modul operasional.

---

## 2. Prinsip & Metode Penentuan Prioritas (MoSCoW)

Pengelompokan prioritas pada dokumen ini menggunakan metode **MoSCoW** yang diselaraskan dengan kode prioritas PRD (`W`, `S`, `N`):

| Prioritas MoSCoW | Padanan PRD | Kriteria & Keputusan Implementasi | Jumlah FR |
|---|---|---|---|
| **Must Have (M)** | **W (Wajib)** | Fitur esensial yang mutlak ada. Tanpa fitur ini, sistem tidak dapat diluncurkan ke publik maupun dioperasikan oleh pustakawan. Wajib selesai pada **Tahap 1**. | **31 FR** |
| **Should Have (S)** | **S (Sebaiknya)** | Fitur penting yang sangat mendukung efisiensi operasional dan kenyamanan pengguna, namun sistem masih bisa berfungsi minimal tanpanya. Wajib selesai pada **Tahap 2**. | **18 FR** |
| **Could Have (C)** | **S (Sebaiknya / Pelengkap)** | Fitur penyempurna antarmuka dan operasional sekunder yang dibangun bila sumber daya mencukupi pada **Tahap 2 / 3**. | **4 FR** |
| **Won't Have (W)** | **N (Nanti)** | Kebutuhan yang secara tegas **ditunda** ke tahap pengembangan lanjutan (**Tahap 5** pasca-serah terima) agar proyek magang tetap fokus dan tepat waktu. | *Dicatat di Bagian 11* |

> **Komitmen Pengembangan Saat Ini:** Seluruh kebutuhan berstatus **Must Have (M)** dan **Should Have (S)** masuk ke dalam cakupan pembangunan tahap ini. Fitur **Won't Have (W)** dicatat secara eksplisit agar tidak menimbulkan pembengkakan ruang lingkup (*scope creep*).

---

## 3. Kebutuhan Fungsional Modul 1: Siaran Radio 24 Jam & Jadwal Tetap

Modul ini mengatur pemutaran audio aliran Icecast studio, perhitungan program yang sedang mengudara, penyajian jadwal 24 jam, dan pengelolaan tabel jadwal tetap oleh petugas.

### FR-01 — Pemutar Audio Persisten Lintas Halaman
- **Pernyataan:** Sebagai pendengar, saya ingin pemutar audio radio tetap aktif di bilah bawah (*bottom bar*) saat berpindah halaman agar siaran tidak terputus ketika menjelajahi jadwal atau katalog.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-01`, `PR-44`, `K-6`, Dokumen 04 Bagian 3.5.
- **Masukan:** Aksi klik tombol "Dengarkan" / "Putar" oleh pengunjung; URL stream Icecast dari pengaturan situs.
- **Proses:**
  1. Aplikasi memuat objek audio HTML5 yang terhubung ke URL Icecast studio.
  2. Aliran audio wajib menggunakan protokol HTTPS atau reverse proxy SSL untuk menghindari pemblokiran *mixed content* oleh peramban di GitHub Pages.
  3. Status pemutaran dipertahankan di tingkat aplikasi (*single-page app state*) saat navigasi antar-halaman publik berlangsung.
  4. Bila terjadi gangguan koneksi, pemutar mencoba menyambung ulang (*auto-reconnect*) hingga 3 kali sebelum menampilkan pesan galat.
- **Keluaran:** Suara siaran mengudara, bilah pemutar menampilkan tombol Jeda, pengatur volume, nama program aktif, dan jam WIB.
- **Kriteria Penerimaan (Acceptance Criteria):**
  - *Given* pengunjung berada di halaman Beranda dan menekan tombol putar, *When* audio berbunyi dan pengunjung berpindah ke halaman `/jadwal` atau `/program`, *Then* audio siaran tetap terdengar tanpa *reloading* atau *buffering* ulang.
  - *Given* peramban modern (Chrome/Safari/Edge), *When* pemutar mengakses URL Icecast, *Then* audio tidak diblokir oleh kebijakan keamanan *mixed content*.

### FR-02 — Penanda Otomatis "Sedang Mengudara" (*On-Air*)
- **Pernyataan:** Sebagai pengunjung, saya ingin mengetahui program radio apa yang sedang berlangsung saat ini secara otomatis sesuai waktu nyata.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-02`, `PR-06`, `K-4`, Dokumen 04 Bagian 4.5.
- **Masukan:** Waktu perangkat pengunjung yang dikonversi ke zona Waktu Indonesia Barat (WIB, UTC+7); tabel jadwal 24 jam.
- **Proses:**
  1. Sistem menentukan jenis hari: Hari Kerja (Senin–Jumat), Sabtu, atau Minggu.
  2. Sistem membaca siklus hari siaran: dimulai pukul 06.00 WIB s.d. 05.59 WIB keesokan harinya. Jam 00.00–05.59 WIB dihitung sebagai kelanjutan hari siaran sebelumnya.
  3. Sistem mencocokkan jam sekarang dengan rentang `jam_mulai` dan `jam_selesai` pada jadwal aktif.
  4. Penanda ini murni berbasis jam dan tabel jadwal (tidak membaca sinyal studio atau metadata Jazler RadioStar 2).
- **Keluaran:** Teks "Sedang Mengudara: [Nama Program]" beserta jam tayang di Hero Beranda dan bilah pemutar persisten.
- **Kriteria Penerimaan:**
  - *Given* waktu lokal adalah Rabu pukul 10.15 WIB, *When* pengunjung membuka Beranda, *Then* sistem menandai program *"Pesona Nusantara"* sebagai program aktif.
  - *Given* waktu lokal adalah Minggu pukul 01.30 WIB, *When* pengunjung membuka situs, *Then* sistem menandai program *"Wayang"* sebagai program aktif pada siklus hari Sabtu.

### FR-03 — Penampil Program Berikutnya
- **Pernyataan:** Sebagai pendengar, saya ingin mengetahui program apa yang akan tayang berikutnya agar saya dapat merencanakan waktu mendengarkan.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-04`, Dokumen 04 Bagian 4.5 & 3.5.
- **Masukan:** Baris jadwal aktif saat ini; urutan tabel jadwal 24 jam.
- **Proses:**
  1. Mengambil baris program dengan `jam_mulai` tepat setelah `jam_selesai` program aktif pada jenis hari yang sama.
  2. Pada pukul 05.00–05.59 WIB (penutup siklus), program berikutnya otomatis mengarah ke program pukul 06.00 WIB (*Opening*) hari berikutnya.
- **Keluaran:** Keterangan teks: "Berikutnya: [Nama Program] — [Jam Mulai] WIB" pada Hero Beranda dan bilah pemutar.
- **Kriteria Penerimaan:**
  - *Given* program aktif adalah *"Indonesia Pagi Ini"* (09.00–10.00 WIB), *Then* sistem menampilkan teks "Berikutnya: Pesona Nusantara — 10.00 WIB".

### FR-04 — Penyajian Papan Jadwal Siaran 24 Jam Publik
- **Pernyataan:** Sebagai pengunjung, saya ingin melihat tabel jadwal siaran radio 24 jam penuh yang terbagi atas tab Hari Kerja, Sabtu, dan Minggu.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-03`, `K-4`, Dokumen 04 Bagian 5.
- **Masukan:** Navigasi ke URL `/jadwal`; pilihan tab jenis hari oleh pengunjung.
- **Proses:**
  1. Menampilkan jadwal dalam bentuk tabel terstruktur (24 jam, 06.00 s.d. 05.59 WIB).
  2. Menyediakan 3 tab filter: "Hari Kerja (Senin–Jumat)", "Sabtu", dan "Minggu". Tab bawaan otomatis aktif sesuai hari pengunjung saat mengakses.
  3. Memberikan penanda visual *"Sekarang"* dan warna latar kontras pada baris jam yang sedang aktif.
  4. Nama program wajib tertulis lengkap (termasuk membakukan "Ruang Literasi", dilarang singkatan).
- **Keluaran:** Halaman tabel jadwal interaktif dengan tombol buka ringkasan deskripsi program.
- **Kriteria Penerimaan:**
  - *Given* pengunjung membuka `/jadwal`, *When* memilih tab "Sabtu", *Then* tabel menampilkan blok program *Dongeng + Lagu Anak* pada pukul 10.00–12.00 dan *Wayang* pada pukul 20.00–04.59.
  - Baris jam yang sedang berlangsung memiliki penanda visual tegas *"Sekarang"*.

### FR-05 — Manajemen Tabel Jadwal Tetap di Panel Pengelola
- **Pernyataan:** Sebagai Admin atau Superadmin, saya ingin memperbarui data jadwal siaran 24 jam langsung dari panel tanpa perlu mengubah kode sumber website.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-20`, `M-15`, `M-18`, Dokumen 03 Bagian 5.5 & 6.2.
- **Masukan:** Formulir baris jadwal: jam mulai, jam selesai, nama program, jenis hari (Hari Kerja/Sabtu/Minggu), status interaktif (Ya/Tidak), dan deskripsi ringkas.
- **Proses:**
  1. Sistem memvalidasi tidak ada tumpang tindih (*overlap*) jam pada jenis hari yang sama.
  2. Perubahan disimpan ke tabel `jadwal` di Supabase dengan mekanisme Draf dan Terbit (`DR-03`).
  3. Memungkinkan penyuntingan cepat (*quick edit*) jam dan label payung program saat terjadi pergeseran siaran studio.
- **Keluaran:** Notifikasi sukses penyimpanan; pembaruan langsung terlihat di halaman publik seketika setelah diterbitkan.
- **Kriteria Penerimaan:**
  - *Given* Admin menyunting jam program di panel dan menekan "Terbitkan", *When* halaman publik dimuat ulang, *Then* jadwal publik langsung menampilkan data baru.
  - Sistem menolak penyimpanan bila terdapat jam yang saling bertabrakan pada hari yang sama.

### FR-06 — Indikator Status Sambungan Aliran Icecast di Dasbor Admin
- **Pernyataan:** Sebagai Admin, saya ingin melihat indikator apakah aliran Icecast studio sedang aktif atau terputus untuk membedakan gangguan studio dari gangguan website.
- **Prioritas:** **Should Have (S)** | Rujukan: `PR-47`, `R-10`, Dokumen 03 Bagian 6.1 & 6.10.
- **Masukan:** Tombol "Uji Koneksi" atau pengecekan berkala terhadap header HTTP/HTTPS mount Icecast.
- **Proses:**
  1. Panel melakukan permintaan *head request* ke URL Icecast.
  2. Menganalisis kode respons HTTP (200 OK berarti tersambung; 404/500/timeout berarti terputus).
- **Keluaran:** Lencana visual di Dasbor Admin: "Aliran Tersambung" (Hijau) atau "Aliran Terputus / Gangguan" (Merah/Kuning).
- **Kriteria Penerimaan:**
  - *Given* URL Icecast valid dan aktif, *When* Admin membuka Dasbor, *Then* lencana status berwarna hijau bertuliskan "Tersambung".
  - *Given* server studio mati, *Then* panel menampilkan status "Terputus" tanpa menyebabkan panel admin macet (*crash*).

### FR-07 — Penanganan Kondisi Siaran Radio Terganggu pada Halaman Publik
- **Pernyataan:** Sebagai pengunjung, saya ingin menerima informasi yang sopan dan jelas apabila siaran radio sedang mengalami gangguan teknis.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-39`, `R-10`, Dokumen 04 Bagian 3.5 & 4.12.
- **Masukan:** Kesalahan pemutaran audio HTML5 (*audio error event / network timeout*).
- **Proses:**
  1. Pemutar mendeteksi kegagalan koneksi ke server Icecast.
  2. Tombol pemutar bertransformasi menjadi tombol "Coba Lagi".
  3. Menampilkan teks pesan gangguan ramah yang diambil dari Pengaturan Situs (misal: *"Siaran radio sedang mengalami pemeliharaan teknis. Silakan coba beberapa saat lagi."*).
- **Keluaran:** Teks penjelasan gangguan yang rapi tanpa menampilkan kode kesalahan teknis peramban.
- **Kriteria Penerimaan:**
  - *Given* aliran audio terputus tiba-tiba, *When* pemutar gagal memuat segmen berikutnya, *Then* bilah pemutar menampilkan pesan gangguan dan tombol "Coba Lagi" yang dapat ditekan pengunjung.

### FR-08 — Pengaturan URL Aliran Audio & Pesan Gangguan oleh Superadmin
- **Pernyataan:** Sebagai Superadmin, saya ingin memperbarui URL aliran Icecast dan pesan gangguan tanpa menyentuh kode aplikasi.
- **Prioritas:** **Should Have (S)** | Rujukan: `PR-26`, `D-8`, Dokumen 03 Bagian 5.10 & 6.10.
- **Masukan:** URL audio baru (wajib diawali `https://` atau alamat reverse proxy SSL); teks pesan gangguan siaran.
- **Proses:**
  1. Validasi URL wajib format aman (HTTPS) untuk mencegah isu *mixed content*.
  2. Dilarang memasukkan kredensial sumber/penyiar (username/password source Icecast).
  3. Menyimpan konfigurasi ke tabel `pengaturan_situs` di Supabase.
- **Keluaran:** Pesan konfirmasi penyimpanan; pemutar pengunjung langsung mengarah ke URL baru.
- **Kriteria Penerimaan:**
  - *Given* Superadmin memasukkan URL diawali `http://`, *Then* sistem menolak dengan pesan peringatan: *"Alamat audio wajib diawali https:// atau melalui reverse proxy SSL agar tidak terblokir oleh peramban."*

---

## 4. Kebutuhan Fungsional Modul 2: Katalog Video & Siniar YouTube

Modul ini mengatur penataan etalase video publik dari kanal YouTube WBS, pemetaan taksonomi 21 seri resmi, halaman detail seri dan episode, pemutar embed, serta manajemen metadata episode.

### FR-09 — Penjelajahan Katalog Seri Video & Saringan Kategori
- **Pernyataan:** Sebagai pengunjung, saya ingin menelusuri seri video berdasarkan kategori topik agar dapat menemukan program siniar yang diminati.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-07`, `M-03`, Dokumen 04 Bagian 6.
- **Masukan:** Akses ke halaman `/program`; pemilihan tombol saringan kategori (Semua, Layanan Perpustakaan & Profesi Pustakawan, Naskah Nusantara & Warisan Budaya, Literasi Minat Baca & Keluarga, Sejarah Kebudayaan & Diskusi Publik).
- **Proses:**
  1. Sistem menampilkan daftar seri resmi (21 seri) ditambah 1 kartu penampung keranjang *"Lainnya"* (berisi 82 video).
  2. Saat tombol kategori ditekan, kartu seri disaring secara instan di sisi klien (*client-side filtering*).
  3. Setiap kartu seri menampilkan: gambar sampul rasio 16:9, nama seri baku, label kategori, deskripsi 1-2 kalimat, dan jumlah episode berstatus Tayang.
- **Keluaran:** Tampilan kisi (*grid*) kartu program yang responsif.
- **Kriteria Penerimaan:**
  - *Given* pengunjung memilih saringan "Naskah Nusantara & Warisan Budaya", *Then* kartu yang muncul hanya seri yang terdaftar di kategori tersebut (misal: *Diskusi Naskah Nusantara*, *FGD IKON*, dll.).
  - Kartu keranjang *"Lainnya"* selalu dapat diakses untuk melihat video lepasan.

### FR-10 — Halaman Detail Seri & Daftar Episode Berurutan
- **Pernyataan:** Sebagai pengunjung, saya ingin membuka halaman detail satu seri untuk melihat deskripsi lengkap program dan daftar seluruh episodenya.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-09`, Dokumen 04 Bagian 7.
- **Masukan:** Klik pada kartu seri di `/program/{nama-seri}`; pilihan pengurutan (Terbaru / Terlama).
- **Proses:**
  1. Sistem memuat informasi seri: nama, kategori, deskripsi lengkap, gambar sampul.
  2. Memuat daftar episode berstatus **Tayang** di bawah seri tersebut.
  3. Menampilkan nomor episode resmi yang telah dinormalisasi secara otomatis (`PR-29`).
  4. Menyediakan tombol "Muat Lebih Banyak" jika jumlah episode melebihi batas tampilan awal (misal >12 kartu).
- **Keluaran:** Halaman detail seri yang memuat daftar episode terstruktur.
- **Kriteria Penerimaan:**
  - *Given* pengunjung membuka `/program/libtalk`, *Then* sistem menyajikan 41 episode LibTalk dengan urutan nomor episode yang konsisten dan judul baku yang bersih dari karakter anomali.

### FR-11 — Halaman Detail Episode & Pemutar Video Tersemat (*Embed*)
- **Pernyataan:** Sebagai pengunjung, saya ingin menonton video episode langsung di website dan membaca metadata lengkapnya tanpa dialihkan ke situs lain.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-08`, `PR-40`, `K-2`, Dokumen 04 Bagian 8.
- **Masukan:** Klik tautan episode di `/program/{nama-seri}/{judul-episode}`.
- **Proses:**
  1. Menampilkan pemutar sematan YouTube (*YouTube IFrame Player*) berasio 16:9 yang dimuat secara efisien (*lazy-load / facade player*).
  2. Video **tidak diputar otomatis** (*no autoplay*) agar tidak mengganggu audio radio yang mungkin sedang menyala.
  3. Menampilkan panel metadata wajib: Judul Baku, Nama Seri, Nomor Episode, Tanggal Tayang, Durasi (jam dan menit), Narasumber, Moderator, dan Topik.
  4. Menyediakan tombol "Tonton di YouTube" (membuka tab baru) dan tombol "Salin Tautan".
- **Keluaran:** Halaman pemutar video lengkap dengan keterangan narasumber dan topik bahasan.
- **Kriteria Penerimaan:**
  - *Given* pengunjung membuka halaman detail episode, *When* video dimuat, *Then* video tidak langsung bersuara sendiri sebelum tombol putar ditekan pengunjung.
  - Informasi narasumber dan moderator tampil jelas sesuai data katalog.

### FR-12 — Penanganan Tautan Video YouTube Dihapus / Tidak Tersedia
- **Pernyataan:** Sebagai pengunjung, saya tetap ingin membaca arsip kegiatan dan metadata episode meskipun video aslinya telah dihapus atau diprivatkan di YouTube.
- **Prioritas:** **Should Have (S)** | Rujukan: `PR-30`, `P-6`, `R-1`, `IK-8`, Dokumen 04 Bagian 8.10.
- **Masukan:** Status video YouTube tidak tersedia (*error embed 100/101/150*).
- **Proses:**
  1. Sistem tetap menampilkan metadata lengkap (judul, narasumber, tanggal, ringkasan) yang tersimpan mandiri di basis data Supabase (`P-6`).
  2. Wadah pemutar video menampilkan pesan santun: *"Video ini sedang tidak tersedia di kanal resmi YouTube. Dokumentasi metadata kegiatan tetap tersimpan pada arsip WBS."*
- **Keluaran:** Tampilan informasi arsip yang utuh tanpa kerusakan tata letak halaman (*graceful degradation*).
- **Kriteria Penerimaan:**
  - *Given* sebuah video dihapus oleh pihak ketiga di YouTube, *When* pengunjung membuka halaman episode tersebut, *Then* halaman tidak rusak dan tetap menyajikan tanggal kegiatan, narasumber, dan ringkasan materi.

### FR-13 — Penyajian Keranjang Video "Lainnya"
- **Pernyataan:** Sebagai pengunjung, saya ingin melihat video dokumentasi kegiatan tunggal, webinar khusus, atau liputan yang tidak masuk ke dalam 21 seri resmi.
- **Prioritas:** **Must Have (M)** | Rujukan: `M-03`, Dokumen 02 Bagian 7 & Dokumen 04 Bagian 6.8.
- **Masukan:** Klik kartu "Lainnya" di halaman `/program/lainnya`.
- **Proses:**
  1. Menampilkan daftar 82 video unik yang tergolong video non-seri.
  2. Video pada keranjang ini **tidak memiliki nomor episode**.
  3. Setiap video tetap memiliki kategori topik, tanggal tayang, dan tautan embed YouTube.
- **Keluaran:** Daftar video lepasan yang terindeks rapi berdasarkan topik.
- **Kriteria Penerimaan:**
  - Halaman `/program/lainnya` menampilkan 82 video tanpa nomor episode, dengan filter topik yang berfungsi baik.

### FR-14 — Manajemen Seri Video di Panel Pengelola
- **Pernyataan:** Sebagai Admin atau Superadmin, saya ingin mengelola data seri video (nama, deskripsi, gambar sampul, urutan, dan penanda unggulan) agar katalog selalu mutakhir.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-18`, `PR-45`, `DR-07`, Dokumen 03 Bagian 5.3 & 6.3.
- **Masukan:** Formulir seri: nama seri, slug alamat, kategori topik, deskripsi, berkas gambar sampul (JPG/PNG/WebP maks 2 MB), urutan tampil, dan sakelar unggulan.
- **Proses:**
  1. Superadmin berwenang menambah seri baru, mengubah nama seri, mengganti kategori, atau menggabungkan seri (`DR-07`).
  2. Admin berwenang menyunting deskripsi, mengunggah sampul, mengatur urutan, dan menandai seri unggulan.
  3. Seri terkunci "Lainnya" adalah entitas sistem bawaan: tidak dapat dihapus, tidak dapat diganti namanya, dan tidak dapat ditandai sebagai unggulan.
  4. Gambar diunggah langsung ke *Supabase Storage* pada *bucket* publik.
- **Keluaran:** Notifikasi keberhasilan; pembaruan data seri pada katalog publik.
- **Kriteria Penerimaan:**
  - *Given* Admin menandai sebuah seri sebagai "Unggulan", *Then* sistem memvalidasi jumlah seri unggulan maksimal 6 seri untuk ditampilkan di beranda.

### FR-15 — Penambahan & Penyuntingan Episode Video Manual
- **Pernyataan:** Sebagai Admin, saya ingin mendaftarkan episode video baru dengan menempelkan tautan YouTube dan mengisi metadata wajib dalam waktu singkat (≤5 menit).
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-19`, `PR-27`, `B-2`, Dokumen 03 Bagian 5.4 & 6.4.
- **Masukan:** Tautan YouTube episode publik; Judul Baku; Seri; Tanggal Tayang; Durasi; Narasumber; Moderator; Kata Kunci Topik; Status (Draf / Tayang / Arsip Internal).
- **Proses:**
  1. Sistem mengekstrak ID video YouTube (11 karakter) dari tautan dan memastikan tautan belum pernah didaftarkan (mencegah duplikasi).
  2. Sistem menghitung nomor episode berikutnya secara otomatis untuk seri yang dipilih (`PR-29`).
  3. Memvalidasi seluruh isian wajib. Bila narasumber/moderator belum tercatat, sistem menyediakan opsi baku *"Belum tercatat"* (`DR-02`).
  4. Menyimpan data episode ke tabel `episode` di Supabase.
- **Keluaran:** Episode tersimpan; bila berstatus Tayang, episode langsung muncul di halaman detail seri terkait.
- **Kriteria Penerimaan:**
  - *Given* Admin memasukkan URL YouTube yang sudah pernah terdaftar, *Then* sistem menolak penyimpanan dan menampilkan peringatan bahwa video tersebut sudah ada di dalam katalog.

### FR-16 — Pengaturan Status Episode: Draf, Tayang, dan Arsip Internal
- **Pernyataan:** Sebagai Admin, saya ingin menandai status episode agar video yang belum lengkap metadatanya atau video internal kepegawaian tidak muncul di etalase publik.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-28`, `M-16`, Dokumen 03 Bagian 5.4 & 9.2.
- **Masukan:** Pilihan status pada formulir episode: `Draf`, `Tayang`, atau `Arsip Internal`.
- **Proses:**
  1. Status **Draf**: Episode hanya terlihat di panel pengelola; belum tampil di halaman publik.
  2. Status **Tayang**: Episode terbit di halaman publik dan dapat dicari.
  3. Status **Arsip Internal**: Episode video dokumentasi kepegawaian atau uji siaran (<1 menit) tetap tersimpan untuk arsip unit, tetapi tidak ditampilkan di katalog publik (`M-16`).
- **Keluaran:** Penyaringan otomatis pada kueri halaman pengunjung (hanya kueri status `Tayang` yang diambil).
- **Kriteria Penerimaan:**
  - Episode berstatus `Arsip Internal` atau `Draf` tidak dapat diakses melalui URL publik `/program/{nama-seri}/{judul-episode}` (mengembalikan halaman 404 ramah).

### FR-17 — Penomoran Episode Otomatis per Seri
- **Pernyataan:** Sebagai Admin, saya ingin nomor episode dihitung otomatis oleh sistem berdasarkan tanggal tayang agar mengakhiri penomoran judul yang tidak konsisten.
- **Prioritas:** **Should Have (S)** | Rujukan: `PR-29`, Dokumen 02 Bagian 8.2 & Dokumen 03 Bagian 5.4.
- **Masukan:** Pemilihan seri dan tanggal tayang episode.
- **Proses:**
  1. Sistem menghitung total episode terbit di bawah seri tersebut dan mengurutkannya secara kronologis berdasarkan tanggal tayang.
  2. Menghasilkan angka integer urut (Episode 1, Episode 2, dst.).
  3. Keranjang *"Lainnya"* dikecualikan dari penomoran otomatis.
- **Keluaran:** Label "Episode [N]" yang rapi di sisi pengunjung dan admin.
- **Kriteria Penerimaan:**
  - Saat episode baru ditambahkan ke seri *SUPER MORNING*, nomor episode otomatis terisi angka berikutnya tanpa perlu diketik manual oleh petugas.

### FR-18 — Pemeriksaan Berkala Ketersediaan Tautan YouTube di Panel Pengelola
- **Pernyataan:** Sebagai Admin, saya ingin sistem mendeteksi video yang rusak atau dihapus dari YouTube agar petugas dapat segera menindaklanjutinya.
- **Prioritas:** **Should Have (S)** | Rujukan: `PR-30`, `IK-8`, Dokumen 03 Bagian 6.4 & 7.7.
- **Masukan:** Tombol "Periksa Tautan" di panel admin atau pengecekan otomatis terjadwal.
- **Proses:**
  1. Memeriksa ketersediaan thumbnail / respons oEmbed YouTube untuk setiap episode berstatus Tayang.
  2. Menandai episode yang gagal direspons dengan label "Tautan Perlu Ditinjau" di panel pengelola.
- **Keluaran:** Daftar episode yang berpotensi rusak agar admin dapat memeriksa status privasi di YouTube Studio.
- **Kriteria Penerimaan:**
  - Video yang dihapus di YouTube terdeteksi dan masuk ke dalam daftar saringan "Tautan Bermasalah" pada tabel kelola episode di panel admin.

---

## 5. Kebutuhan Fungsional Modul 3: Sesi Interaktif On-Air & Pertanyaan Pendengar

Modul ini mengatur alur interaksi terkelola antara pendengar radio dan penyiar/narasumber di studio saat program interaktif berlangsung (`K-3`, `M-06` s.d. `M-09`, `M-19`).

### FR-19 — Pembukaan & Penutupan Sesi Tanya Jawab oleh Pengelola
- **Pernyataan:** Sebagai Admin atau Superadmin, saya ingin membuka dan menutup sesi tanya jawab untuk program interaktif yang sedang mengudara agar formulir pertanyaan hanya aktif pada waktu yang ditentukan.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-21`, `M-09`, `M-19`, Dokumen 03 Bagian 5.6 & 6.5.
- **Masukan:** Tombol "Buka Sesi" pada modul Sesi On-Air; pemilihan program interaktif (*Indonesia Pagi Ini*, *Pesona Nusantara*, *Ruang Literasi*, atau Acara Khusus YouTube terpilih); tanggal sesi.
- **Proses:**
  1. Superadmin maupun Admin berwenang membuka dan menutup sesi (`M-09`).
  2. Sesi hanya dapat dibuka untuk 3 program interaktif resmi atau acara khusus YouTube yang ditandai (`M-19`). Program siaran musik/audiobook/wayang tidak dapat dibuka sesinya.
  3. Hanya diizinkan satu sesi aktif untuk program yang sama pada tanggal yang sama.
  4. Penutupan sesi dapat dilakukan manual sewaktu-waktu oleh petugas, atau otomatis menutup sendiri saat jam siaran berakhir ditambah masa tenggang 15 menit (`DR-04`).
- **Keluaran:** Status sesi tercatat `Terbuka` atau `Tertutup` di tabel `sesi_onair` Supabase.
- **Kriteria Penerimaan:**
  - *Given* Admin menekan "Buka Sesi" untuk program *Indonesia Pagi Ini*, *When* waktu siaran berlangsung, *Then* formulir pertanyaan langsung muncul di halaman Beranda dan Jadwal pengunjung.
  - Sesi otomatis tertutup setelah jam selesai program + 15 menit jika petugas lupa menekan tombol tutup.

### FR-20 — Formulir Pengajuan Pertanyaan Pendengar pada Sisi Pengunjung
- **Pernyataan:** Sebagai pendengar, saya ingin mengirim pertanyaan singkat kepada penyiar atau narasumber saat sesi tanya jawab sedang dibuka.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-05`, `K-3`, `M-06`, Dokumen 04 Bagian 14.
- **Masukan:** Kolom Nama (wajib, 2–60 karakter, boleh nama samaran atau teks "Anonim"); Kolom Pertanyaan (wajib, 10–500 karakter, teks biasa tanpa tautan URL).
- **Proses:**
  1. Formulir hanya dirender jika sesi berstatus `Terbuka` dan jam sekarang berada dalam rentang program siaran.
  2. Validasi sisi klien dan server: kolom Nama wajib diisi, namun pendengar diizinkan mengetik nama samaran atau "Anonim" (`M-06`).
  3. Pertanyaan dilarang memuat tautan link (`http://`, `https://`, `www.`) untuk mencegah spam tautan iklan.
  4. Menampilkan penghitung karakter (0/500).
- **Keluaran:** Pertanyaan tersimpan ke database; pengunjung menerima notifikasi konfirmasi: *"Pertanyaan Anda sudah diterima. Terima kasih."*
- **Kriteria Penerimaan:**
  - *Given* pendengar mengisi nama "Anonim" dan pertanyaan 20 karakter, *When* menekan "Kirim Pertanyaan", *Then* pertanyaan berhasil terkirim dan muncul konfirmasi sukses.
  - *Given* pendengar memasukkan tautan website pada isi pertanyaan, *Then* sistem menolak pengiriman dengan pesan: *"Pertanyaan tidak boleh memuat tautan."*

### FR-21 — Penerimaan Pertanyaan Langsung ke Panel Pengelola (*Direct Ingestion*)
- **Pernyataan:** Sebagai penyiar/admin di studio, saya ingin pertanyaan pendengar langsung masuk ke panel admin secara seketika (*real-time*) tanpa pra-moderasi publik agar dapat segera saya pilih dan bacakan.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-22`, `M-07`, Dokumen 03 Bagian 5.7 & 6.5.
- **Masukan:** Pengiriman data dari formulir pengunjung yang berhasil divalidasi.
- **Proses:**
  1. Data pertanyaan disimpan langsung ke tabel `pertanyaan` Supabase dengan status awal `Baru`.
  2. Pertanyaan **sama sekali tidak ditampilkan di halaman publik** (`M-07`).
  3. Panel admin memanfaatkan *Supabase Realtime WebSocket subscription* sehingga daftar pertanyaan di layar studio bertambah otomatis tanpa perlu menyegarkan (*refresh*) peramban.
  4. Menampilkan penanda jumlah pertanyaan baru yang belum dibaca.
- **Keluaran:** Daftar antrean pertanyaan masuk di layar laptop penyiar studio.
- **Kriteria Penerimaan:**
  - *Given* penyiar sedang membuka panel Sesi On-Air, *When* seorang pendengar mengirim pertanyaan dari ponselnya, *Then* pertanyaan muncul di daftar panel penyiar dalam waktu <2 detik tanpa memuat ulang halaman.

### FR-22 — Kurasi & Pengelolaan Status Pertanyaan oleh Penyiar
- **Pernyataan:** Sebagai penyiar, saya ingin menandai pertanyaan yang sudah dibacakan, menyembunyikan pertanyaan yang tidak relevan, atau menghapus pertanyaan yang melanggar norma.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-22`, `M-07`, Dokumen 03 Bagian 6.5.
- **Masukan:** Aksi penyiar pada baris pertanyaan: tombol "Tandai Dibacakan", "Sembunyikan", "Hapus", dan kolom catatan internal.
- **Proses:**
  1. Mengubah status pertanyaan: `Baru` $\rightarrow$ `Dibacakan` atau `Disembunyikan`.
  2. Teks pertanyaan asli **tidak dapat disunting** oleh siapa pun guna menjaga integritas arsip pesan pendengar.
  3. Penyiar dapat menambahkan catatan petugas singkat (misal: *"Dibacakan pukul 09.35 WIB"*).
  4. Menghapus pertanyaan bersifat permanen dan meminta konfirmasi klik demi keamanan.
- **Keluaran:** Pembaruan status pertanyaan pada panel admin studio.
- **Kriteria Penerimaan:**
  - Pertanyaan yang telah ditandai "Dibacakan" berpindah ke kelompok riwayat baca atau ditandai visual abu-abu agar penyiar tidak mengulang membaca pertanyaan yang sama.

### FR-23 — Penyimpanan & Penghapusan Arsip Tanya Jawab
- **Pernyataan:** Sebagai Admin atau Superadmin, saya ingin arsip seluruh pertanyaan tersimpan dengan rapi dan dapat dihapus sewaktu-waktu sesuai kebijakan retensi data.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-15`, `PR-22`, `M-08`, `R-6`, Dokumen 03 Bagian 5.7 & 10.2.
- **Masukan:** Akses menu Arsip Tanya Jawab; tombol "Hapus Arsip Sesi".
- **Proses:**
  1. Data pertanyaan disimpan permanen sebagai riwayat keterlibatan publik (`M-08`).
  2. Superadmin dan Admin memiliki hak akses penuh untuk menghapus sebagian atau seluruh arsip pertanyaan suatu sesi bila masa retensi telah berakhir atau diminta oleh pihak berwenang (`R-6`).
  3. Sistem tidak pernah merekam alamat IP mentah, jenis perangkat, atau geolokasi pengirim pertanyaan pada tabel basis data (`PR-49`).
- **Keluaran:** Pengelolaan arsip yang patuh pada prinsip perlindungan privasi data pribadi.
- **Kriteria Penerimaan:**
  - Saat tombol "Hapus Arsip" ditekan dan dikonfirmasi oleh Admin, seluruh data pertanyaan pada sesi tersebut terhapus permanen dari basis data.

### FR-24 — Ekspor Arsip Tanya Jawab ke Berkas CSV
- **Pernyataan:** Sebagai Admin, saya ingin mengunduh daftar pertanyaan suatu program ke dalam berkas CSV untuk keperluan laporan dokumentasi siaran.
- **Prioritas:** **Should Have (S)** | Rujukan: `PR-22`, Dokumen 03 Bagian 5.7 & 6.5.
- **Masukan:** Klik tombol "Ekspor CSV" pada sesi tanya jawab tertentu.
- **Proses:**
  1. Sistem mengompilasi kolom: Tanggal Sesi, Program, Waktu Masuk, Nama Pengirim, Isi Pertanyaan, Status (Dibacakan/Disembunyikan), dan Catatan Petugas.
  2. Menghasilkan berkas teks terdelimitasi koma (UTF-8).
  3. Menampilkan dialog konfirmasi peringatan privasi bahwa berkas memuat data interaksi publik.
- **Keluaran:** Unduhan berkas `.csv` pada komputer petugas.
- **Kriteria Penerimaan:**
  - Berkas CSV berhasil diunduh dan dapat dibuka dengan rapi di Microsoft Excel tanpa kerusakan karakter huruf Indonesia.

### FR-25 — Pembatasan Pengiriman Pertanyaan & Anti-Spam (*Rate Limiting*)
- **Pernyataan:** Sebagai sistem, saya harus membatasi frekuensi pengiriman pertanyaan dari peramban yang sama agar tidak terjadi *spamming* atau pembanjiran data ke layar penyiar.
- **Prioritas:** **Must Have (M)** | Rujukan: `R-5`, Dokumen 03 Bagian 5.7 & Dokumen 04 Bagian 14.6.
- **Masukan:** Percobaan pengiriman pertanyaan berulang dari sesi peramban pengunjung.
- **Proses:**
  1. Sistem menerapkan batasan maksimal **3 pertanyaan per 10 menit** per sesi peramban lokal (*localStorage / session token*).
  2. Menerapkan satu bidang jebakan (*honeypot field*) yang tersembunyi bagi manusia namun diisi oleh bot otomatis; kiriman yang mengisi kolom ini langsung ditolak diam-diam.
  3. Bila batas terlampaui, tombol kirim dinonaktifkan sementara.
- **Keluaran:** Pesan penolakan ramah: *"Terlalu banyak pertanyaan dalam waktu singkat. Silakan coba lagi beberapa menit lagi."*
- **Kriteria Penerimaan:**
  - Percobaan pengiriman ke-4 dalam rentang waktu kurang dari 10 menit langsung diblokir di sisi klien dan server.

### FR-26 — Adaptasi Label Tanya Jawab untuk Acara Khusus / Live YouTube
- **Pernyataan:** Sebagai pengunjung, saya ingin kartu tanya jawab menyesuaikan judulnya saat sesi dibuka untuk siaran langsung webinar/acara khusus YouTube agar relevan dengan kegiatan tersebut.
- **Prioritas:** **Should Have (S)** | Rujukan: `M-19`, Dokumen 04 Bagian 4.11 & 14.1.
- **Masukan:** Sesi dibuka untuk entitas `Acara Khusus` (bukan program reguler radio).
- **Proses:**
  1. Sistem mendeteksi relasi sesi terhubung ke ID Acara Khusus.
  2. Judul kartu Tanya Jawab beradaptasi otomatis dari *"Punya pertanyaan untuk penyiar?"* menjadi *"Punya pertanyaan untuk narasumber [Judul Acara]?"*.
  3. Menyediakan tautan sematan/pintasan menuju siaran langsung YouTube acara tersebut.
- **Keluaran:** Kartu interaksi yang kontekstual dan tepat sasaran.
- **Kriteria Penerimaan:**
  - *Given* sesi dibuka untuk acara "Webinar Bedah Naskah Kuno", *When* pengunjung membuka Beranda, *Then* judul kartu interaksi tertulis "Punya pertanyaan untuk narasumber Webinar Bedah Naskah Kuno?".


---

## 6. Kebutuhan Fungsional Modul 4: Acara Mendatang & Blok Beranda

Modul ini mengatur penyajian etalase beranda yang dinamis, perpaduan dua entitas layanan, serta pengelolaan pengumuman acara khusus insidental (`M-10`, `PR-12`, `PR-45`).

### FR-27 — Hero Siaran Utama Beranda
- **Pernyataan:** Sebagai pengunjung, saya ingin disambut oleh status siaran radio yang sedang mengudara saat membuka beranda, lengkap dengan tombol dengarkan dan keterangan program berikutnya.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-06`, `PR-12`, `K-6`, Dokumen 04 Bagian 4.1 & 4.5.
- **Masukan:** Jadwal tetap 24 jam; waktu saat ini (WIB); aksi klik tombol "Dengarkan Sekarang".
- **Proses:**
  1. Menampilkan blok Hero statis (tanpa carousel gambar berputar otomatis, tanpa efek parallax, tanpa pop-up promosi) di bagian teratas beranda.
  2. Menampilkan badge "● SEDANG MENGUDARA", nama program aktif, rentang jam WIB, dan label hari.
  3. Tombol aksi utama "Dengarkan Sekarang" yang langsung memicu pemutaran audio pada bilah bawah tanpa berpindah halaman.
  4. Tombol aksi sekunder "Lihat Jadwal Hari Ini" yang menggulir halaman ke blok jadwal atau membuka `/jadwal`.
  5. Menampilkan keterangan teks program berikutnya dan jam mulainya.
- **Keluaran:** Tampilan visual hero siaran yang berfokus penuh pada audio radio WBS.
- **Kriteria Penerimaan:**
  - Hero beranda selalu terisi informasi program yang valid (karena siaran radio mengudara 24 jam penuh, beranda tidak pernah kosong).
  - Tidak ada animasi berkedip berlebihan atau spanduk promosi yang menutupi tombol putar.

### FR-28 — Blok Acara Mendatang di Beranda
- **Pernyataan:** Sebagai pengunjung, saya ingin melihat pengumuman acara khusus, webinar, atau siaran langsung YouTube terdekat yang diselenggarakan WBS.
- **Prioritas:** **Should Have (S)** | Rujukan: `M-10`, `PR-23`, Dokumen 04 Bagian 4.9 & 14.9.
- **Masukan:** Data dari tabel `acara_mendatang` berstatus Terbit.
- **Proses:**
  1. Menampilkan maksimal **3 kartu acara terdekat** yang tanggal dan jamnya belum terlewati.
  2. Setiap kartu memuat: gambar 16:9, judul acara (maksimal 2 baris), tanggal pelaksanaan panjang Indonesia, jam mulai WIB, kanal (YouTube, Zoom, Tatap Muka), dan tombol tautan "Lihat Acara".
  3. **Tidak ada halaman arsip acara terpisah atau tombol buntu `[Lihat semua →]`** karena WBS tidak mengoperasikan kalender acara penuh (`M-10`).
  4. Bila tidak ada acara yang aktif, **seluruh blok Acara Mendatang disembunyikan secara otomatis** dari beranda tanpa meninggalkan ruang kosong (*zero whitespace*).
- **Keluaran:** Blok pengumuman acara khusus terdekat yang ringkas dan bersih.
- **Kriteria Penerimaan:**
  - *Given* ada 2 acara terbit untuk minggu depan, *Then* beranda menampilkan 2 kartu acara tersebut tanpa tombol `[Lihat semua →]`.
  - *Given* tidak ada agenda acara khusus, *Then* blok Acara Mendatang otomatis hilang dari pandangan pengunjung.

### FR-29 — Blok Episode Video Terbaru di Beranda
- **Pernyataan:** Sebagai pengunjung, saya ingin melihat 4 episode video terbaru yang baru saja diterbitkan oleh WBS agar tidak ketinggalan rekaman siniar terkini.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-12`, Dokumen 04 Bagian 4.6.
- **Masukan:** Data episode berstatus `Tayang`, diurutkan berdasarkan `tanggal` terbaru.
- **Proses:**
  1. Mengambil 4 episode terbaru dari basis data Supabase.
  2. Merender 4 kartu episode: gambar sampul 16:9, judul baku episode, nama payung seri, tanggal tayang, dan penanda durasi.
  3. Menyediakan tombol pintasan "Lihat Semua Episode →" yang mengarahkan pengunjung ke halaman `/program`.
  4. Bila jumlah episode tayang kurang dari 4, hanya kartu yang ada yang ditampilkan (tidak menampilkan kartu kosong/kerangka palsu).
- **Keluaran:** Kisi kartu episode terbaru yang dapat diklik langsung menuju pemutar video.
- **Kriteria Penerimaan:**
  - Klik pada salah satu kartu episode terbaru langsung mengantar pengunjung ke halaman `/program/{nama-seri}/{judul-episode}`.

### FR-30 — Blok Jelajahi Program Unggulan di Beranda
- **Pernyataan:** Sebagai pengunjung, saya ingin melihat pilihan seri program unggulan di beranda beserta pintasan kategori untuk mulai menjelajahi katalog.
- **Prioritas:** **Should Have (S)** | Rujukan: `PR-45`, Dokumen 04 Bagian 4.7.
- **Masukan:** Data seri berstatus `Tayang` yang memiliki nilai `unggulan = true`.
- **Proses:**
  1. Menampilkan maksimal **6 kartu seri unggulan** yang telah ditandai oleh pengelola di panel admin (`PR-45`).
  2. Menampilkan tombol pil kategori cepat di atas kartu program.
  3. Menyediakan tautan "Semua Program →" yang mengarahkan ke katalog penuh `/program`.
- **Keluaran:** Bagian etalase program unggulan institusi di halaman beranda.
- **Kriteria Penerimaan:**
  - Kartu seri yang tampil di beranda persis mengikuti seri yang diberi tanda centang "Unggulan" di panel admin (maksimal 6 seri).

### FR-31 — Manajemen Acara Mendatang di Panel Pengelola
- **Pernyataan:** Sebagai Admin atau Superadmin, saya ingin menambah, mengubah, atau menghapus pengumuman acara khusus mendatang agar informasi kegiatan WBS selalu terbarui.
- **Prioritas:** **Should Have (S)** | Rujukan: `PR-23`, `M-10`, Dokumen 03 Bagian 5.8 & 6.6.
- **Masukan:** Formulir acara: judul acara, tanggal pelaksanaan, jam mulai, jam selesai (opsional), kanal siaran (YouTube/Zoom/Instagram/Tatap Muka), tautan kegiatan, berkas gambar sampul, deskripsi singkat, status (Draf / Terbit), dan sakelar "Buka Sesi Tanya Jawab".
- **Proses:**
  1. Validasi tanggal tidak boleh sebelum hari ini untuk status Terbit.
  2. Kanal daring wajib memiliki tautan URL valid; kanal tatap muka boleh tanpa tautan.
  3. Gambar diunggah ke Supabase Storage.
  4. Menyimpan data ke tabel `acara_mendatang`.
- **Keluaran:** Data acara tersimpan; acara berstatus Terbit langsung masuk ke antrean beranda.
- **Kriteria Penerimaan:**
  - Admin dapat menyimpan acara sebagai Draf untuk ditinjau sebelum diterbitkan ke halaman publik.

### FR-32 — Pembersihan Otomatis Acara yang Telah Lewat dari Beranda
- **Pernyataan:** Sebagai sistem, saya harus menyaring dan menyembunyikan acara yang tanggal dan jamnya telah selesai dari halaman publik secara otomatis tanpa menunggu tindakan manual admin.
- **Prioritas:** **Should Have (S)** | Rujukan: `M-10`, Dokumen 04 Bagian 14.10 & 14.11.
- **Masukan:** Waktu sekarang (WIB); kolom `tanggal` dan `jam_selesai` pada data acara.
- **Proses:**
  1. Kueri publik secara otomatis memfilter `tanggal >= CURRENT_DATE`.
  2. Untuk acara hari ini, jika `jam_selesai` telah terlewati lebih dari 30 menit, kartu acara dihentikan dari penayangan beranda.
  3. Data acara yang sudah lewat **tetap tersimpan** di basis data panel admin sebagai arsip kegiatan historis (tidak dihapus permanen).
- **Keluaran:** Halaman beranda hanya menampilkan kegiatan yang benar-benar masih akan datang.
- **Kriteria Penerimaan:**
  - Acara yang berlangsung hari ini pukul 09.00–11.00 WIB otomatis tidak lagi tampil di beranda pada pukul 11.31 WIB.

---

## 7. Kebutuhan Fungsional Modul 5: Pencarian Global & Navigasi

Modul ini mengatur penemuan konten secara cepat melalui kata kunci di bilah atas (*header*) serta penjelajahan hierarkis yang ramah pengguna (`PR-10`, `PR-48`, `IK-10`).

### FR-33 — Pencarian Kata Kunci Global pada Bilah Header
- **Pernyataan:** Sebagai pengunjung, saya ingin mencari konten melalui ikon pencarian di header dari halaman mana pun agar dapat menemukan program atau narasumber tertentu dengan cepat.
- **Prioritas:** **Should Have (S)** | Rujukan: `PR-10`, `K-6`, Dokumen 04 Bagian 3.3 & 9.1.
- **Masukan:** Klik ikon kaca pembesar di header; pengetikan kata kunci (minimal 2 karakter).
- **Proses:**
  1. Kolom pencarian terbuka di tempat (*in-place expand*) tanpa mengganggu audio siaran yang sedang berjalan.
  2. Menekan tombol `Enter` mengarahkan pengunjung ke halaman hasil pencarian `/cari?q=[kata-kunci]`.
  3. Sistem membersihkan kata kunci dari karakter berbahaya (*input sanitization*).
- **Keluaran:** Transisi mulus menuju halaman hasil pencarian dengan mempertahankan pemutar audio.
- **Kriteria Penerimaan:**
  - Mengirim kata kunci pencarian tidak menyebabkan halaman dimuat ulang secara penuh (*full page reload*); pemutar audio tetap berbunyi tanpa jeda.

### FR-34 — Penyajian Hasil Pencarian Terpilah (Seri & Episode)
- **Pernyataan:** Sebagai pengunjung, saya ingin hasil pencarian mengelompokkan temuan ke dalam kelompok Seri dan kelompok Episode agar mudah dipindai.
- **Prioritas:** **Should Have (S)** | Rujukan: `PR-10`, Dokumen 04 Bagian 9.4.
- **Masukan:** Akses URL `/cari?q=[kata-kunci]`.
- **Proses:**
  1. Kueri pencarian mencocokkan kata kunci pada:
     - Nama dan deskripsi Seri.
     - Judul baku Episode, nama Narasumber, Moderator, dan kata kunci Topik.
  2. Hasil disajikan dalam dua seksi terpisah:
     - Seksi 1: "Seri Program Ditemukan ([N])" berbentuk kartu seri.
     - Seksi 2: "Episode Video Ditemukan ([N])" berbentuk kartu episode.
  3. Kueri hanya mencari pada konten berstatus `Tayang`.
- **Keluaran:** Daftar hasil pencarian yang terstruktur dan informatif.
- **Kriteria Penerimaan:**
  - *Given* pengunjung mencari kata "Naskah", *Then* hasil pencarian menampilkan seri *Diskusi Naskah Nusantara* pada seksi seri, dan episode-episode bedah naskah kuno pada seksi episode.

### FR-35 — Penanganan Hasil Pencarian Kosong & Saran Kata Kunci
- **Pernyataan:** Sebagai pengunjung, saya ingin menerima petunjuk yang membantu ketika kata kunci yang saya masukkan tidak membuahkan hasil.
- **Prioritas:** **Should Have (S)** | Rujukan: Dokumen 04 Bagian 9.5 & 13.3.
- **Masukan:** Kata kunci yang tidak memiliki kecocokan di database.
- **Proses:**
  1. Menampilkan pesan santun: *"Tidak ditemukan hasil untuk '[kata-kunci]'."*
  2. Menyajikan daftar saran: periksa ejaan kata kunci, gunakan kata yang lebih umum (misal: "Naskah", "Literasi", "Pustakawan"), atau jelajahi katalog lengkap di halaman Program.
  3. Menyediakan tombol "Jelajahi Semua Program" menuju `/program`.
- **Keluaran:** Halaman kosong yang memandu dan tidak membingungkan pengunjung.
- **Kriteria Penerimaan:**
  - Halaman hasil pencarian kosong tidak menampilkan layar putih atau galat teknis basis data.

### FR-36 — Remah Navigasi (*Breadcrumbs*) pada Halaman Detail
- **Pernyataan:** Sebagai pengunjung, saya ingin melihat jejak letak halaman (remah navigasi) pada halaman detail agar saya selalu mengetahui posisi saya dan memiliki jalan kembali ke seri payungnya.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-48`, `IK-10`, Dokumen 04 Bagian 3.6 & 7.
- **Masukan:** Halaman detail seri (`/program/{seri}`) atau detail episode (`/program/{seri}/{episode}`).
- **Proses:**
  1. Sistem merender jejak tautan di bawah header:
     - Pada Detail Seri: `Beranda / Program & Siniar / [Nama Seri]`
     - Pada Detail Episode: `Beranda / Program & Siniar / [Nama Seri] / [Judul Episode]`
  2. Setiap segmen dapat diklik untuk kembali ke tingkat di atasnya, kecuali segmen terakhir (halaman aktif).
  3. Menggunakan elemen semantik `<nav aria-label="Remah navigasi">` dengan data terstruktur schema.org untuk aksesibilitas dan SEO.
- **Keluaran:** Navigasi jalur remah yang konsisten di semua halaman detail.
- **Kriteria Penerimaan:**
  - Pengunjung pada halaman episode dapat kembali ke halaman seri payungnya hanya dalam 1 klik melalui remah navigasi.
  - Seluruh halaman publik dapat dicapai maksimal dalam **2 klik dari Beranda** (`IK-10`, `PR-48`).

---

## 8. Kebutuhan Fungsional Modul 6: Halaman Informasi Statis & Kanal Pengaduan

Modul ini mengatur penyajian profil layanan, transparansi kelembagaan, kanal komunikasi resmi, kebijakan privasi, serta penanganan rute tidak ditemukan (`PR-13` s.d. `PR-15`, `PR-23`, `PR-41`).

### FR-37 — Halaman Profil "Tentang WBS"
- **Pernyataan:** Sebagai pemustaka atau mitra, saya ingin membaca profil resmi Layanan Radio dan Siniar WBS Perpustakaan Nasional RI agar memahami latar belakang, visi, dan tim pengelola layanan.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-13`, Dokumen 04 Bagian 10.
- **Masukan:** Navigasi ke `/tentang`.
- **Proses:**
  1. Merender 4 blok konten:
     - Profil Ringkas & Identitas WBS di bawah PUJASINTARA Perpusnas RI.
     - Visi & Misi Penyiaran Literasi Nusantara.
     - Sejarah Singkat Layanan Radio & Transformasi ke Siniar Digital.
     - Tim Pengelola & Struktur Penyiaran WBS.
  2. Data konten teks disimpan terstruktur di database Supabase dan dapat diperbarui oleh petugas.
- **Keluaran:** Halaman profil kelembagaan yang kredibel dan rapi.
- **Kriteria Penerimaan:**
  - Halaman memuat informasi resmi PUJASINTARA dan Perpusnas RI tanpa kesalahan istilah nama lembaga.

### FR-38 — Halaman Kontak Layanan & Kanal Pengaduan Resmi
- **Pernyataan:** Sebagai pengunjung, saya ingin mendapatkan informasi alamat, surel, telepon, dan kanal pengaduan resmi WBS jika memerlukan koordinasi atau bantuan layanan.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-14`, Dokumen 04 Bagian 11.
- **Masukan:** Navigasi ke `/kontak`.
- **Proses:**
  1. Menampilkan alamat resmi: Fasilitas Layanan Perpustakaan Nasional RI, Jl. Medan Merdeka Selatan No. 11, Jakarta Pusat.
  2. Menampilkan surel resmi layanan, jam operasional layanan penyiaran (WIB), dan nomor telepon.
  3. Menampilkan tautan resmi menuju **Kanal Pengaduan Resmi Perpusnas** (SP4N-LAPOR! / Layanan Pengaduan Internal Perpusnas).
  4. **Tidak menyediakan formulir kontak umum / buku tamu terbuka** untuk menghindari beban moderasi pesan sampah (*spam*) bagi pustakawan (`B-2`).
- **Keluaran:** Halaman direktori kontak resmi yang aman dan transparan.
- **Kriteria Penerimaan:**
  - Tautan kanal pengaduan mengarah ke portal resmi institusi dan terbuka pada tab baru secara aman (`rel="noopener noreferrer"`).

### FR-39 — Integrasi Tautan Media Sosial Aktif
- **Pernyataan:** Sebagai pendengar, saya ingin mengakses kanal media sosial resmi WBS dan Perpusnas (WhatsApp, Instagram, Facebook, X, YouTube) langsung dari website.
- **Prioritas:** **Should Have (S)** | Rujukan: `PR-41`, `M-11`, Dokumen 04 Bagian 3.4.
- **Masukan:** Ikon dan tautan media sosial pada Footer dan Halaman Kontak.
- **Proses:**
  1. Mengambil data URL akun media sosial dari Pengaturan Situs.
  2. Hanya kanal aktif yang memiliki URL yang ditampilkan; kolom yang dikosongkan oleh Superadmin tidak akan memunculkan ikonnya di halaman publik (`M-11`).
  3. Membuka tautan di tab baru dengan teks bantu aksesibilitas (misal: "Buka kanal Instagram WBS Perpusnas di tab baru").
- **Keluaran:** Tautan media sosial yang valid dan terkurasi.
- **Kriteria Penerimaan:**
  - Ikon media sosial tidak rusak dan tautan mengarah langsung ke akun resmi yang ditentukan.

### FR-40 — Halaman Kebijakan Privasi
- **Pernyataan:** Sebagai pengunjung, saya ingin memahami bagaimana data nama/pertanyaan saya dikelola dan bagaimana analitik kunjungan berjalan di website ini.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-15`, `PR-49`, `R-6`, `D-7`, Dokumen 04 Bagian 12.
- **Masukan:** Navigasi ke `/kebijakan-privasi` dari tautan footer atau formulir tanya jawab.
- **Proses:**
  1. Menjelaskan secara transparan bahwa formulir pertanyaan memperbolehkan nama samaran / **"Anonim"** (`M-06`).
  2. Menjelaskan bahwa sistem tidak pernah merekam alamat IP mentah pengunjung pada database aplikasi.
  3. Menjelaskan penggunaan Google Analytics 4 (GA4) berbasis IP teranonimasi murni untuk statistik agregat wilayah kunjungan (kota/provinsi/negara) demi evaluasi layanan pimpinan (`M-14`).
  4. Menjelaskan hak penghapusan arsip pertanyaan oleh pengelola layanan.
- **Keluaran:** Dokumen hukum layanan publik yang melindungi hak privasi pemustaka.
- **Kriteria Penerimaan:**
  - Teks kebijakan privasi berbahasa Indonesia lugas, mudah dipahami masyarakat awam, dan selaras dengan regulasi pelindungan data pribadi.

### FR-41 — Halaman Kesalahan 404 Kustom Ramah Pengunjung
- **Pernyataan:** Sebagai pengunjung, saya ingin menerima pesan yang ramah dan tetap dapat mendengarkan radio apabila mengetikkan alamat URL yang salah atau membuka episode yang sudah tidak tersedia.
- **Prioritas:** **Must Have (M)** | Rujukan: Dokumen 04 Bagian 1.1 & 13.1.
- **Masukan:** Kunjungan ke URL yang tidak terdaftar di sistem.
- **Proses:**
  1. Sistem merender halaman 404 kustom (*Page Not Found*).
  2. Menampilkan pesan ramah: *"Halaman yang Anda tuju tidak ditemukan atau telah dipindahkan."*
  3. Menyediakan tombol "Kembali ke Beranda" dan "Lihat Katalog Program".
  4. **Pemutar radio persisten di bilah bawah tetap aktif berbunyi** dan tidak terputus.
- **Keluaran:** Halaman kesalahan kustom yang mempertahankan kenyamanan pendengar.
- **Kriteria Penerimaan:**
  - Audio radio tidak berhenti berputar saat pengunjung sengaja maupun tidak sengaja membuka tautan rusak/404.

### FR-42 — Manajemen Halaman Statis di Panel Pengelola
- **Pernyataan:** Sebagai Admin atau Superadmin, saya ingin menyunting teks halaman Tentang WBS, Kontak, dan Kebijakan Privasi dari panel admin tanpa memerlukan bantuan teknisi pemrograman.
- **Prioritas:** **Should Have (S)** | Rujukan: `PR-23`, Dokumen 03 Bagian 5.9 & 6.7.
- **Masukan:** Editor teks halaman statis: judul, ringkasan, isi paragraf, dan tanggal pembaruan terakhir.
- **Proses:**
  1. Petugas menyunting teks paragraf dengan format terstruktur.
  2. Sistem menyediakan fitur "Pratinjau Draf" sebelum disimpan sebagai Terbit (`PR-46`).
  3. Menyimpan konten ke tabel `halaman_statis` di Supabase.
- **Keluaran:** Pembaruan isi teks pada halaman statis publik seketika.
- **Kriteria Penerimaan:**
  - Perubahan nomor telepon atau jam layanan di panel admin langsung tercermin pada halaman `/kontak` publik.

---

## 9. Kebutuhan Fungsional Modul 7: Autentikasi Pengelola, Hak Akses & Keamanan Data

Modul ini mengatur keamanan pintu masuk panel admin, pemisahan hak akses berbasis peran, perlindungan terhadap serangan siber, dan mekanisme cadangan data (`PR-17`, `PR-24`, `PR-35`, `PR-36`, `DR-09`).

### FR-43 — Otentikasi Pengelola Berbasis Supabase Auth
- **Pernyataan:** Sebagai pengelola (Superadmin/Admin), saya ingin masuk ke panel admin menggunakan surel dan kata sandi yang aman agar hak pengelolaan terlindungi.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-17`, `PR-35`, `DR-09`, Dokumen 03 Bagian 3 & 10.1.
- **Masukan:** Alamat surel terdaftar; kata sandi akun (minimal 12 karakter).
- **Proses:**
  1. Otentikasi diproses melalui layanan aman *Supabase Auth*.
  2. Kata sandi dienkripsi menggunakan algoritma *hashing* satu arah berstandar industri (bcrypt / Argon2) di tingkat server Supabase; kata sandi tidak pernah disimpan dalam bentuk teks mentah (*plain text*).
  3. Menghasilkan token sesi JWT yang aman dan disimpan di sisi klien (*secure storage / HTTP-only state*).
  4. **Tidak ada fitur pendaftaran mandiri (self-registration)** untuk publik; akun baru hanya dapat dibuat oleh Superadmin (`PR-24`).
- **Keluaran:** Pengalihan sukses ke Dasbor Admin; atau penolakan dengan pesan galat ramah.
- **Kriteria Penerimaan:**
  - Akun yang tidak terdaftar atau kata sandi salah ditolak dengan pesan: *"Surel atau kata sandi tidak cocok."*

### FR-44 — Proteksi Serangan Brute-Force & Batas Masa Sesi
- **Pernyataan:** Sebagai sistem, saya harus membatasi percobaan masuk yang gagal dan mengakhiri sesi yang tidak aktif demi menjaga keamanan panel pengelola.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-35`, Dokumen 03 Bagian 10.1.
- **Masukan:** Percobaan login berulang yang gagal; masa inaktivitas pengguna pada panel.
- **Proses:**
  1. Jika terjadi **5 kali kegagalan masuk berturut-turut** dalam rentang 15 menit, akun dikunci sementara selama 15 menit (*rate limit lockout*).
  2. Sesi pengelola otomatis berakhir (*auto logout*) bila tidak ada aktivitas interaksi selama **30 menit**, atau maksimal **8 jam** sejak waktu masuk awal.
- **Keluaran:** Perlindungan otomatis terhadap upaya pembobolan kata sandi.
- **Kriteria Penerimaan:**
  - Pada kegagalan login ke-6 berturut-turut, sistem menolak proses autentikasi dan menampilkan hitung mundur waktu tunggu.

### FR-45 — Kontrol Akses Berbasis Peran (*RBAC* & *Supabase Row Level Security*)
- **Pernyataan:** Sebagai sistem, saya harus membatasi wewenang setiap akun hanya pada modul yang diizinkan sesuai perannya (Superadmin vs Admin).
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-17`, `PR-24`, `M-09`, `M-15`, Dokumen 03 Bagian 3.2.
- **Masukan:** Peran akun pengguna (`Superadmin` atau `Admin`) yang tertera pada klaim JWT dan tabel profil.
- **Proses:**
  1. Diterapkan aturan *Row Level Security* (RLS) di basis data PostgreSQL Supabase pada setiap tabel.
  2. **Hak Akses Admin:** Memperbarui jadwal tetap, mengelola seri & episode video, menyunting halaman statis, membuka/menutup sesi tanya jawab, mengurasi pertanyaan masuk, dan mengunduh berkas CSV tanya jawab.
  3. **Hak Akses Superadmin:** Seluruh wewenang Admin ditambah: manajemen akun pengelola, pengaturan identitas situs, pengaturan URL aliran Icecast, konfigurasi analitik GA4, laporan statistik lengkap, dan penghapusan data krusial.
  4. Permintaan manipulasi data dari akun Admin terhadap tabel pengaturan situs atau pengguna ditolak di tingkat database (*database permission denied*).
- **Keluaran:** Penegakan izin akses yang kokoh di sisi frontend maupun database backend.
- **Kriteria Penerimaan:**
  - Akun Admin tidak dapat melihat menu "Pengguna & Peran" serta "Pengaturan Situs" pada bilah navigasi panel.
  - Upaya manipulasi API Supabase secara langsung oleh Admin ke tabel pengguna ditolak oleh aturan RLS.

### FR-46 — Manajemen Akun & Hak Akses Pengelola oleh Superadmin
- **Pernyataan:** Sebagai Superadmin, saya ingin mengelola daftar akun pengelola (menambah akun baru, menyetel peran Admin/Superadmin, menyetel ulang kata sandi, dan menonaktifkan akun).
- **Prioritas:** **Should Have (S)** | Rujukan: `PR-24`, `M-15`, Dokumen 03 Bagian 5.2 & 6.8.
- **Masukan:** Formulir pengguna: nama lengkap, surel resmi, peran (Admin / Superadmin), status aktif (Ya/Tidak), dan kata sandi baru.
- **Proses:**
  1. Superadmin mendaftarkan akun baru melalui modul Pengguna.
  2. Sistem mencegah Superadmin menonaktifkan atau menghapus akun miliknya sendiri untuk menghindari terkuncinya sistem (*lockout prevention*).
  3. Harus selalu ada minimal 1 akun Superadmin yang aktif di sistem.
- **Keluaran:** Daftar akun staf yang terkelola rapi.
- **Kriteria Penerimaan:**
  - Akun yang disetel `status = Tidak Aktif` langsung ditolak saat mencoba masuk, meskipun surel dan kata sandinya cocok.

### FR-47 — Pengamanan & Validasi Berkas Unggahan Gambar Sampul
- **Pernyataan:** Sebagai sistem, saya harus memvalidasi jenis dan ukuran berkas gambar yang diunggah petugas agar tidak terjadi eksploitasi keamanan atau pemborosan penyimpanan.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-35`, Dokumen 03 Bagian 5.3 & 10.1.
- **Masukan:** Berkas gambar sampul seri, episode, atau acara yang diunggah melalui formulir panel admin.
- **Proses:**
  1. Sistem memeriksa format berkas (hanya diizinkan: `image/jpeg`, `image/png`, `image/webp`).
  2. Memeriksa ukuran berkas (maksimal **2 MB** per berkas).
  3. Berkas disimpan ke *Supabase Storage Bucket* dengan penamaan unik acak (*UUID*) untuk menghindari tabrakan nama berkas.
  4. Berkas selain gambar (seperti skrip `.php`, `.js`, `.exe`, dll.) ditolak mentah-mentah di sisi klien dan server.
- **Keluaran:** URL gambar publik yang aman dan tersimpan di CDN Supabase.
- **Kriteria Penerimaan:**
  - Percobaan mengunggah berkas gambar berukuran 3 MB langsung ditolak dengan pesan: *"Ukuran gambar melebihi batas maksimal 2 MB."*

### FR-48 — Pencadangan Data Manual Format JSON
- **Pernyataan:** Sebagai Superadmin, saya ingin mengunduh salinan data seluruh katalog, jadwal, pengumuman, dan pengaturan situs ke dalam satu berkas JSON untuk arsip cadangan mandiri.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-36`, `P-6`, Dokumen 03 Bagian 6.10 & 10.3.
- **Masukan:** Klik tombol "Unduh Cadangan Data" pada modul Pengaturan Situs.
- **Proses:**
  1. Sistem mengekstrak seluruh baris data dari tabel: `seri`, `episode`, `jadwal`, `acara_mendatang`, `halaman_statis`, dan `pengaturan_situs`.
  2. Data pertanyaan pendengar secara bawaan **tidak disertakan** demi kepatuhan privasi (kecuali diberi tanda centang khusus oleh Superadmin disertai peringatan data pribadi).
  3. Membentuk berkas `.json` terstruktur dengan stempel tanggal (misal: `cadangan-wbs-2026-11-17.json`).
- **Keluaran:** Berkas cadangan data terunduh di perangkat lokal Superadmin.
- **Kriteria Penerimaan:**
  - Berkas JSON cadangan dapat diunduh lengkap dan memuat seluruh 331 video katalog serta jadwal siaran 24 jam.

---

## 10. Kebutuhan Fungsional Modul 8: Laporan Statistik & Analitik GA4

Modul ini mengatur penyediaan data kuantitatif kinerja layanan penyiaran, sebaran geografis pendengar, serta statistik ringkas untuk bahan laporan pimpinan Perpusnas (`PR-25`, `PR-49`, `M-14`).

### FR-49 — Integrasi Google Analytics 4 (GA4) dengan IP Teranonimasi
- **Pernyataan:** Sebagai pengelola dan pimpinan, saya ingin website terhubung dengan GA4 secara patuh privasi untuk memantau trafik pengunjung dan sebaran geografis pemustaka.
- **Prioritas:** **Should Have (S)** | Rujukan: `PR-49`, `M-14`, `R-13`, Dokumen 04 Bagian 18.
- **Masukan:** Kode ID Pengukuran GA4 (format `G-XXXXXXXXXX`) yang disimpan di Pengaturan Situs; sakelar "Aktifkan Analitik".
- **Proses:**
  1. Skrip pelacak GA4 hanya dimuat jika sakelar aktif bernilai `true` dan halaman Kebijakan Privasi telah berstatus Terbit.
  2. Menerapkan fitur **IP Anonymization** bawaan GA4 (seluruh alamat IP pengunjung disamarkan di jaringan Google sebelum diproses).
  3. **Aplikasi sama sekali tidak menyimpan alamat IP mentah atau identitas perangkat di basis data lokal Supabase** (`PR-15`, `PR-49`, `R-6`).
- **Keluaran:** Pengiriman metrik kunjungan agregat ke dasbor resmi GA4 Perpusnas.
- **Kriteria Penerimaan:**
  - Kode pelacak GA4 aktif di seluruh halaman publik tanpa menimbulkan pesan galat di konsol peramban.

### FR-50 — Pelacakan Peristiwa Interaksi Kunci (*Custom Events*) pada GA4
- **Pernyataan:** Sebagai pengelola, saya ingin GA4 mencatat interaksi penting pengunjung (memutar radio, mengirim pertanyaan, menonton video episode, dan mencari kata kunci).
- **Prioritas:** **Should Have (S)** | Rujukan: `PR-49`, Dokumen 04 Bagian 18.2.
- **Masukan:** Aksi interaksi pengunjung di halaman publik.
- **Proses:**
  1. Mengirim sinyal peristiwa kustom ke GA4 saat aksi terjadi:
     - `radio_play`: Saat tombol putar audio radio ditekan (memuat parameter nama program aktif).
     - `radio_pause`: Saat audio radio dijeda oleh pengunjung.
     - `question_submit`: Saat formulir pertanyaan On-Air berhasil terkirim.
     - `episode_view`: Saat halaman detail episode dibuka.
     - `search_query`: Saat pengunjung mengeksekusi pencarian kata kunci.
  2. Peristiwa **tidak menyertakan data pribadi** (seperti isi pertanyaan atau nama pengirim).
- **Keluaran:** Data metrik keterlibatan pemustaka yang terukur di GA4.
- **Kriteria Penerimaan:**
  - Peristiwa `radio_play` dan `question_submit` tercatat pada laporan *Realtime Event* di konsol Google Analytics.

### FR-51 — Dasbor Ringkasan Operasional untuk Admin
- **Pernyataan:** Sebagai Admin, saya ingin melihat statistik operasional harian begitu masuk ke panel admin agar langsung mengetahui kondisi layanan hari ini.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-25`, `DR-06`, Dokumen 03 Bagian 4.4 & 6.1.
- **Masukan:** Kueri agregat Supabase saat dasbor dimuat.
- **Proses:**
  1. Menampilkan 4 kartu ringkasan metrik utama:
     - Total Episode Publik (331 video unik).
     - Total Seri Aktif (21 seri).
     - Status Sesi On-Air Hari Ini (Buka / Tutup / Belum Ada).
     - Jumlah Pertanyaan Masuk Hari Ini (termasuk penanda pertanyaan baru).
  2. Menampilkan jadwal program siaran radio berikutnya hari ini.
  3. Menampilkan status indikator aliran Icecast (Tersambung / Terputus).
- **Keluaran:** Tampilan dasbor ringkas yang informatif dan bebas kekacauan data.
- **Kriteria Penerimaan:**
  - Angka pada kartu dasbor selalu mencerminkan data aktual di basis data tanpa jeda.

### FR-52 — Laporan Statistik & Sebaran Wilayah untuk Superadmin
- **Pernyataan:** Sebagai Superadmin, saya ingin melihat laporan statistik kunjungan dan sebaran wilayah geografis pendengar untuk bahan laporan pertanggungjawaban pimpinan.
- **Prioritas:** **Should Have (S)** | Rujukan: `PR-25`, `PR-49`, `M-14`, Dokumen 03 Bagian 6.9.
- **Masukan:** Data agregat metrik internal Supabase dan tautan/tampilan analitik GA4.
- **Proses:**
  1. Menyajikan tabel dan grafik sebaran pengunjung berdasarkan provinsi dan kota di Indonesia serta negara (bersumber dari data agregat GA4).
  2. Menyajikan grafik tren jumlah pertanyaan pendengar per bulan.
  3. Menyajikan laporan rekapitulasi jumlah episode per kategori topik.
  4. Menu ini **khusus untuk Superadmin**; akun Admin diarahkan ke dasbor operasional (`DR-06`).
- **Keluaran:** Halaman laporan analitik komprehensif yang siap dicetak/diekspor untuk pimpinan PUJASINTARA.
- **Kriteria Penerimaan:**
  - Data laporan menyajikan sebaran provinsi/kota tanpa membuka data identitas pribadi pengunjung mana pun.

### FR-53 — Penegakan Regulasi Privasi Data Analitik
- **Pernyataan:** Sebagai sistem, saya harus menjamin tidak ada kebocoran data privasi pemustaka pada modul laporan analitik.
- **Prioritas:** **Must Have (M)** | Rujukan: `PR-15`, `PR-49`, `R-6`, `R-13`.
- **Masukan:** Seluruh proses pengolahan data statistik.
- **Proses:**
  1. Sistem melarang perekaman *User-Agent* lengkap yang dapat digunakan untuk *fingerprinting* perangkat.
  2. Laporan hanya menyajikan data kelompok (*aggregated data*) dengan jumlah minimal kunjungan untuk mencegah identifikasi individu.
- **Keluaran:** Kepatuhan penuh terhadap etika layanan perpustakaan dan hukum pelindungan privasi.
- **Kriteria Penerimaan:**
  - Pengujian audit database membuktikan tidak ada kolom IP address atau data pelacak identitas individual pada seluruh tabel Supabase.

---

## 11. Batasan Tegas di Luar Cakupan (*Out-of-Scope / Non-Goals*)

Untuk mencegah pembengkakan ruang lingkup (*scope creep*), sepuluh hal berikut **secara tegas dinyatakan di luar cakupan pembangunan saat ini** (`NG-01` s.d. `NG-10` pada PRD `01`):

| No | Batasan di Luar Cakupan | Alasan dan Batas Keputusan |
|---|---|---|
| **NG-01** | **Penyimpanan/Hosting Mandiri Berkas Video atau Audio** | Website tidak menampung berkas video/audio mentah di server sendiri (`K-2`). Video di-*embed* dari YouTube, sedangkan audio siaran dialirkan langsung dari Icecast studio. Hal ini menjaga biaya hosting tetap **Rp 0** (gratis) dan menghemat bandwidth lembaga. |
| **NG-02** | **Infrastruktur Pemancar Radio atau Kontrol Playout Studio** | Website **tidak mengendalikan pemancar, urutan lagu, jingle, atau playlist studio** (`K-5`). Seluruh kendali penyiaran tetap berada di studio di bawah operator **Jazler RadioStar 2**. Panel admin hanya mengatur jadwal tampil 24 jam di website. |
| **NG-03** | **Live Chat Terbuka atau Request Lagu Terbuka** | Tidak ada ruang obrolan bebas tanpa batas (*chatbox* liar) guna menghindari risiko moderasi konten negatif, ujaran kebencian, dan kebutuhan penjagaan 24 jam (`K-3`). Interaksi dibatasi murni pada pengajuan pertanyaan terkelola saat sesi On-Air dibuka. |
| **NG-04** | **Pembangunan Aplikasi Mobile Mandiri (Android APK / iOS IPA)** | Website dirancang dengan pendekatan *Mobile-First Responsive Web Design* yang ringan dan nyaman diakses lewat peramban ponsel. Aplikasi native tidak dibangun pada tahap ini. |
| **NG-05** | **Fitur Transaksi Keuangan, Iklan Komersial, atau Donasi** | Layanan WBS adalah layanan penyiaran publik non-komersial Perpustakaan Nasional RI. Seluruh fitur pembayaran komersial dilarang. |
| **NG-06** | **Kolom Komentar Publik Bebas di Bawah Video / Halaman Berita** | Interaksi publik difokuskan pada program On-Air. Kolom komentar publik umum ditiadakan untuk menjaga ketertiban situs dan meringankan beban kerja pustakawan (`B-2`). |
| **NG-07** | **Transkripsi Otomatis Berbasis AI untuk Seluruh 331 Video** | Transkripsi audio-ke-teks otomatis memerlukan infrastruktur komputasi berbayar yang besar. Kebutuhan ini ditunda ke tahap pengembangan lanjutan pasca-magang (`M-13`, Tahap 5). |
| **NG-08** | **Antarmuka Multibahasa (Bilingual Indonesia–Inggris)** | Situs tahap ini berfokus 100% pada Bahasa Indonesia yang baik dan benar sesuai audiens utama pemustaka nasional (`M-12`). |
| **NG-09** | **Integrasi Sistem Kepegawaian, Presensi, atau Penilaian Kinerja Internal** | Website radio berfokus pada diseminasi literasi dan penyiaran publik, bukan sistem administrasi kepegawaian internal Perpusnas. |
| **NG-10** | **Spanduk Carousel Otomatis, Efek Parallax, Pop-up Mengambang, dan Mode Gelap** | Elemen visual ini dihindari sesuai acuan kesederhanaan UT Radio (`K-6`). Carousel otomatis dan parallax memberatkan ponsel pemustaka dan merusak keterbacaan; mode gelap ditunda agar fokus pada identitas visual resmi Perpusnas (`D-2`). |

---

## 12. Matriks Ketertelusuran Kebutuhan (*Traceability Matrix*)

Tabel berikut memetakan setiap kebutuhan fungsional (`FR-01` s.d. `FR-53`) ke nomor kebutuhan PRD Dokumen `01` (`PR-*`), modul panel admin Dokumen `03`, komponen halaman pengunjung Dokumen `04`, serta tingkat prioritas MoSCoW.

| ID Kebutuhan | Deskripsi Singkat Fitur | Prioritas MoSCoW | Rujukan PRD `01` | Modul Admin `03` | Komponen Pengunjung `04` |
|---|---|---|---|---|---|
| **FR-01** | Pemutar Audio Persisten Lintas Halaman | **Must Have** | `PR-01`, `PR-44` | Pengaturan Situs | Bilah Bawah Persisten |
| **FR-02** | Penanda Otomatis "Sedang Mengudara" | **Must Have** | `PR-02`, `PR-06` | Jadwal Tetap | Hero Beranda & Jadwal |
| **FR-03** | Penampil Program Siaran Berikutnya | **Must Have** | `PR-04` | Jadwal Tetap | Hero Beranda & Pemutar |
| **FR-04** | Papan Jadwal Siaran 24 Jam Publik | **Must Have** | `PR-03` | Jadwal Tetap | Halaman `/jadwal` |
| **FR-05** | Manajemen Tabel Jadwal di Panel Admin | **Must Have** | `PR-20`, `M-18` | Jadwal Tetap | — |
| **FR-06** | Indikator Sambungan Aliran Icecast Admin | **Should Have** | `PR-47`, `R-10` | Dasbor & Pengaturan | — |
| **FR-07** | Penanganan Siaran Radio Gangguan Publik | **Must Have** | `PR-39`, `R-10` | Pengaturan Situs | Bilah Pemutar & Hero |
| **FR-08** | Pengaturan URL Audio & Pesan Gangguan | **Should Have** | `PR-26`, `D-8` | Pengaturan Situs | — |
| **FR-09** | Penjelajahan Seri & Saringan Kategori | **Must Have** | `PR-07`, `M-03` | Seri | Halaman `/program` |
| **FR-10** | Detail Seri & Daftar Episode Berurutan | **Must Have** | `PR-09` | Seri & Episode | Halaman Detail Seri |
| **FR-11** | Detail Episode & Pemutar Sematan YouTube | **Must Have** | `PR-08`, `PR-40` | Episode | Halaman Detail Episode |
| **FR-12** | Penanganan Video YouTube Rusak / Hilang | **Should Have** | `PR-30`, `IK-8` | Episode | Halaman Detail Episode |
| **FR-13** | Penyajian Keranjang Video "Lainnya" | **Must Have** | `M-03` | Seri & Episode | Halaman `/program/lainnya` |
| **FR-14** | Manajemen Seri Video di Panel Pengelola | **Must Have** | `PR-18`, `PR-45` | Seri | — |
| **FR-15** | Penambahan Episode Video Manual (≤5 mnt) | **Must Have** | `PR-19`, `PR-27` | Episode | — |
| **FR-16** | Pengaturan Status Draf/Tayang/Internal | **Must Have** | `PR-28`, `M-16` | Episode | — |
| **FR-17** | Penomoran Episode Otomatis per Seri | **Should Have** | `PR-29` | Episode | Detail Seri & Episode |
| **FR-18** | Pemeriksaan Berkala Tautan YouTube | **Should Have** | `PR-30` | Episode | — |
| **FR-19** | Buka/Tutup Sesi Tanya Jawab Pengelola | **Must Have** | `PR-21`, `M-09` | Sesi On-Air | — |
| **FR-20** | Formulir Pertanyaan Pendengar Publik | **Must Have** | `PR-05`, `M-06` | Sesi On-Air | Kartu Tanya Jawab |
| **FR-21** | Ingesti Pertanyaan Seketika ke Studio | **Must Have** | `PR-22`, `M-07` | Sesi On-Air | — |
| **FR-22** | Kurasi & Pengelolaan Status Pertanyaan | **Must Have** | `PR-22` | Sesi On-Air | — |
| **FR-23** | Penyimpanan & Penghapusan Arsip Tanya | **Must Have** | `PR-15`, `M-08` | Sesi On-Air | — |
| **FR-24** | Ekspor Berkas CSV Tanya Jawab | **Should Have** | `PR-22` | Sesi On-Air | — |
| **FR-25** | Anti-Spam & Pembatasan Frekuensi Form | **Must Have** | `R-5` | Sesi On-Air | Kartu Tanya Jawab |
| **FR-26** | Adaptasi Label Form Acara Khusus Live | **Should Have** | `M-19` | Sesi On-Air | Kartu Tanya Jawab |
| **FR-27** | Hero Siaran Utama Beranda | **Must Have** | `PR-06`, `PR-12` | Jadwal Tetap | Hero Beranda |
| **FR-28** | Blok Acara Mendatang di Beranda | **Should Have** | `M-10`, `PR-23` | Acara Mendatang | Blok Beranda |
| **FR-29** | Blok 4 Episode Video Terbaru Beranda | **Must Have** | `PR-12` | Episode | Blok Beranda |
| **FR-30** | Blok Program Unggulan Beranda (Maks 6) | **Should Have** | `PR-45` | Seri | Blok Beranda |
| **FR-31** | Manajemen Acara Mendatang di Panel | **Should Have** | `PR-23`, `M-10` | Acara Mendatang | — |
| **FR-32** | Pembersihan Otomatis Acara yang Lewat | **Should Have** | `M-10` | Acara Mendatang | Blok Beranda |
| **FR-33** | Pencarian Kata Kunci Global di Header | **Should Have** | `PR-10`, `K-6` | — | Header Navigasi |
| **FR-34** | Halaman Hasil Pencarian Terpilah | **Should Have** | `PR-10` | — | Halaman `/cari` |
| **FR-35** | Penanganan Hasil Pencarian Kosong | **Should Have** | `PR-10` | — | Halaman `/cari` |
| **FR-36** | Remah Navigasi (*Breadcrumbs*) | **Must Have** | `PR-48`, `IK-10` | — | Halaman Detail |
| **FR-37** | Halaman Profil "Tentang WBS" | **Must Have** | `PR-13` | Halaman Statis | Halaman `/tentang` |
| **FR-38** | Halaman Kontak & Kanal Pengaduan | **Must Have** | `PR-14` | Halaman Statis | Halaman `/kontak` |
| **FR-39** | Integrasi Tautan Media Sosial Aktif | **Should Have** | `PR-41`, `M-11` | Pengaturan Situs | Footer & Kontak |
| **FR-40** | Halaman Kebijakan Privasi | **Must Have** | `PR-15`, `PR-49` | Halaman Statis | Halaman Kebijakan Privasi |
| **FR-41** | Halaman Kesalahan 404 Kustom Ramah | **Must Have** | Dokumen 04 | — | Halaman `/404` |
| **FR-42** | Manajemen Halaman Statis di Panel | **Should Have** | `PR-23` | Halaman Statis | — |
| **FR-43** | Otentikasi Supabase Auth Pengelola | **Must Have** | `PR-17`, `PR-35` | Pengguna & Peran | Layar Masuk Admin |
| **FR-44** | Proteksi Brute-Force & Batas Sesi | **Must Have** | `PR-35` | Pengguna & Peran | Layar Masuk Admin |
| **FR-45** | Kontrol Akses RBAC & Supabase RLS | **Must Have** | `PR-17`, `PR-24` | Pengguna & Peran | Seluruh Panel Admin |
| **FR-46** | Kelola Akun Pengelola oleh Superadmin | **Should Have** | `PR-24`, `M-15` | Pengguna & Peran | — |
| **FR-47** | Pengamanan Berkas Unggahan Gambar | **Must Have** | `PR-35` | Seri, Episode, Acara | — |
| **FR-48** | Pencadangan Data Manual Format JSON | **Must Have** | `PR-36`, `P-6` | Pengaturan Situs | — |
| **FR-49** | Integrasi GA4 dengan IP Teranonimasi | **Should Have** | `PR-49`, `M-14` | Pengaturan Situs | Seluruh Halaman Publik |
| **FR-50** | Pelacakan Peristiwa Kunci (*Events*) | **Should Have** | `PR-49` | — | Seluruh Halaman Publik |
| **FR-51** | Dasbor Ringkasan Operasional Admin | **Must Have** | `PR-25` | Dasbor Admin | — |
| **FR-52** | Laporan Statistik & Wilayah Superadmin | **Should Have** | `PR-25`, `M-14` | Laporan & Statistik | — |
| **FR-53** | Penegakan Regulasi Privasi Analitik | **Must Have** | `PR-15`, `R-6` | Laporan & Statistik | — |

---

## 13. Penutup & Langkah Menuju Dokumen 06

Dokumen Kebutuhan Fungsional dan Prioritas (`05-kebutuhan-fungsional-dan-prioritas.md` — v1.0 Final) ini telah memetakan seluruh kebutuhan operasional ke dalam **53 butir fungsional teruji (`FR-01` s.d. `FR-53`)**. Dokumen ini menjadi rujukan mutlak bagi tim pengembang dalam menyusun arsitektur sistem dan menulis kode program.

### Hal yang Telah Dikunci pada Dokumen Ini:
1. **Pemisahan Tegas Entitas:** Radio 24 jam berbasis Icecast studio (tanpa kontrol playout di panel) dan Katalog Video/Siniar berbasis etalase YouTube (331 video unik terkelola mandiri).
2. **Kesesuaian Tumpukan Teknologi (*Tech Stack*):** Desain fungsional telah diselaraskan dengan keputusan hosting **GitHub Pages** dan basis data **Supabase BaaS** (PostgreSQL, Auth RLS, Realtime WebSocket, Storage CDN).
3. **Penyempurnaan Hasil Audit Gelombang 1:** Antisipasi pemblokiran *Mixed Content* (aliran Icecast wajib HTTPS/SSL proxy), penghapusan tombol buntu pada blok Acara Mendatang, dan adaptasi kartu interaksi saat siaran langsung YouTube.

### Langkah Berikutnya:
Dengan tuntasnya Dokumen `05`, perancangan teknis berlanjut ke penyusunan **Dokumen 06: Arsitektur dan Kebutuhan Teknis (`06-arsitektur-dan-kebutuhan-teknis.md`)** yang akan menetapkan:
- Pemilihan kerangka kerja frontend (*framework* SPA/SSG yang optimal untuk GitHub Pages).
- Konfigurasi integrasi Supabase SDK & skema koneksi aman.
- Skema penanganan aliran audio Icecast HTTPS / reverse proxy SSL.
- Struktur direktori proyek, alur *Continuous Integration/Continuous Deployment* (CI/CD) GitHub Actions, dan strategi pengujian otomatis.

---

## Riwayat Revisi

| Versi | Tanggal | Perubahan | Penyusun |
|---|---|---|---|
| **1.0** | **17 November 2026** | **Penyusunan Dokumen Fungsional Final (Gelombang 2):** (1) Penjabaran 53 kebutuhan fungsional terinci (`FR-01` s.d. `FR-53`) dengan format User Story, MoSCoW, Masukan-Proses-Keluaran, dan Kriteria Penerimaan; (2) Integrasi ketetapan hosting GitHub Pages dan BaaS Supabase (`M-02`, `DR-09`); (3) Penegasan batasan di luar cakupan `NG-01` s.d. `NG-10`; (4) Penyusunan Matriks Ketertelusuran Kebutuhan (*Traceability Matrix*) yang menghubungkan PRD, Dokumen 03, Dokumen 04, dan Dokumen 05 | Gusti Ahmad Muttahid Bilhaq |
