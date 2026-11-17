# Product Requirements Document (PRD)
## Website Radio & Siniar WBS Perpusnas

| Keterangan | Isi |
|---|---|
| **Nomor Dokumen** | 01 |
| **Nama Dokumen** | Product Requirements Document (PRD) |
| **Nama Situs** | Radio & Siniar WBS Perpusnas |
| **Versi** | 2.2 — Final Disepakati |
| **Tanggal** | 17 November 2026 |
| **Status** | Final — Seluruh keputusan (M-01 s.d. M-19) telah ditetapkan; hosting disepakati di GitHub Pages dengan backend/database Supabase; siap menjadi acuan dokumen lanjutan |
| **Penyusun** | Gusti Ahmad Muttahid Bilhaq |
| **Pembaca Utama** | Pustakawan pengelola Layanan Radio dan Siniar WBS |
| **Sifat Dokumen** | Final; perubahan hanya melalui kesepakatan baru yang dicatat pada riwayat revisi |

---

## 0. Cara Membaca Dokumen Ini

Dokumen ini ditulis untuk **pustakawan**, bukan untuk programmer. Istilah teknis sengaja dijelaskan di tempat atau di daftar istilah (Bagian 14). Tidak ada kode, tidak ada diagram rumit.

Setiap kebutuhan dan setiap keputusan diberi **nomor rujukan** (contoh: `PR-05`, `M-17`). Tujuannya agar pembahasan operasional cukup menyebut nomornya, tanpa harus mengulang kalimat panjang.

| Bagian | Isi Singkat | Perlu Dibaca Oleh |
|---|---|---|
| 1 | Ringkasan satu halaman | Semua pembaca |
| 2 | Latar belakang, dua wajah layanan, jadwal radio, kondisi katalog | Semua pembaca |
| 3 | Tujuan & ukuran keberhasilan | Semua pembaca |
| 4 | Siapa pengguna website | Semua pembaca |
| 5 | Keputusan yang sudah ditetapkan | Semua pembaca |
| 6 | Gambaran solusi yang diusulkan | Semua pembaca |
| 7 | Alur penggunaan sehari-hari | Semua pembaca |
| 8 | Daftar kebutuhan tingkat tinggi | Semua pembaca |
| 9–12 | Batasan, risiko, prasyarat, tahapan | Pustakawan & pimpinan |
| **13** | **Rekapitulasi keputusan final** | **Acuan kerja pustakawan dan pengembang** |
| 14–15 | Daftar istilah & riwayat revisi | Semua |

> **Status dokumen:** seluruh keputusan sudah ditetapkan dan dicatat pada Bagian 13. Dokumen ini menjadi acuan kerja; perubahan berikutnya hanya dilakukan melalui kesepakatan baru dan dicatat pada Bagian 15.

---

## 1. Ringkasan Eksekutif

Layanan Radio dan Siniar **Widya Bahana Swara (WBS)** Perpustakaan Nasional RI memiliki **dua wajah yang berbeda** dan selama ini belum pernah disatukan dalam satu kanal digital:

| Wajah | Sifat | Volume |
|---|---|---|
| **Siaran Radio** | Berjalan terus **24 jam setiap hari** dengan **jadwal tetap** (Senin–Minggu) | 1 kanal, 24 jam/hari |
| **Katalog Video & Siniar** | Acara khusus, webinar, diskusi, liputan, dan rekaman siniar yang **insidental** dan dinamis | **507 konten** (337 baris publik; 331 video unik ditampilkan) — Juli 2020 s.d. November 2026 |

Siaran radio berjalan setiap hari, tetapi jadwal 24 jam-nya belum tersaji dalam bentuk yang mudah dibaca pendengar. Sementara itu, 337 baris data publik (331 video unik) dari 507 konten hanya "hidup" di kanal YouTube: tidak ada halaman yang menjelaskan *program apa saja yang dimiliki WBS*, *episode mana yang cocok untuk topik tertentu*, atau *program radio apa yang sedang mengudara saat ini*.

Dokumen ini menetapkan pembangunan **satu website** yang berperan sebagai:

1. **Pintu masuk siaran radio** — pengunjung langsung tahu **program apa yang sedang mengudara** pada jam tersebut, dan dapat memutar siaran radio.
2. **Papan jadwal 24 jam** — jadwal tetap Weekday, Sabtu, dan Minggu disajikan terbuka.
3. **Katalog video & siniar terstruktur** — 337 baris data publik (331 video unik) dirapikan menjadi seri dan episode yang bisa dicari, dengan pemutar dari YouTube.
4. **Kanal pertanyaan pendengar** — pendengar dapat mengirim pertanyaan **hanya ketika pengelola membuka sesi** untuk program radio yang sedang mengudara.

Website ini **tidak menampung file video/audio**. Sesuai keputusan yang telah disepakati (`K-2`), website berperan sebagai **etalase dan katalog** yang menampilkan pemutar dari YouTube resmi WBS. Dengan cara ini website tetap ringan, murah dirawat, dan seluruh arsip tetap berada di kanal resmi.

Dokumen ini **belum menyentuh teknis pembuatan**. Ia menjawab pertanyaan: *apa yang akan dibangun, untuk siapa, mengapa, dan apa yang harus diputuskan bersama.*

---

## 2. Latar Belakang

### 2.1 Tentang Layanan Radio dan Siniar WBS

Radio **Widya Bahana Swara (WBS)** adalah layanan penyiaran Perpustakaan Nasional RI yang dikelola oleh **Pusat Jasa Informasi dan Naskah Nusantara (PUJASINTARA)**. Isi siarannya mencakup literasi dan perpustakaan, naskah Nusantara, sejarah dan kebudayaan, pengembangan profesi pustakawan, serta program internal kepegawaian.

Layanan ini berjalan dalam **dua bentuk yang berbeda**, dan perbedaan ini menjadi fondasi seluruh rancangan website.

### 2.2 Dua Wajah Layanan: Radio Siaran vs Katalog Video

| Aspek | **Siaran Radio** | **Katalog Video & Siniar** |
|---|---|---|
| **Bentuk** | Audio, mengudara terus-menerus | Video/audio rekaman |
| **Sifat** | **Terjadwal tetap**, berulang setiap hari | **Insidental**, kondisional, dinamis |
| **Jadwal** | 24 jam Senin–Minggu, siklus harian mulai 06.00 WIB | Tidak ada jadwal tetap; mengikuti acara/kegiatan |
| **Contoh isi** | Indonesia Pagi Ini, Pesona Nusantara, Audiobook, Ruang Literasi, Dongeng, Wayang, Religi, Tausiyah | LibTalk, Super Morning, Diskusi Naskah Nusantara, FGD IKON, Kelas Literasi Siniar, Cerita BUKI |
| **Sumber tayang** | Aliran audio **Icecast** dari studio; pengaturan playout di **Jazler RadioStar 2** (`K-5`) | Kanal YouTube **WBS Radio Perpusnas** (337 baris publik atau 331 video unik, dari 507 konten) |
| **Peran di website** | Diputar langsung + jadwal + sesi tanya jawab | Dicari, dibaca, dan diputar dari arsip (embed) |

> **Kesalahan yang perlu dihindari:** menyamakan 507 konten YouTube dengan jadwal radio. Konten YouTube adalah **dokumentasi acara**, bukan program harian radio. Acara video/live diadakan **sewaktu-waktu dan tidak konsisten**, sehingga pola hari/jam unggahnya **tidak boleh** dipakai sebagai acuan jadwal radio.

**Titik temu keduanya:** beberapa nama muncul di dua tempat. Misalnya *Pesona Nusantara* adalah **slot radio** sekaligus **seri video** di YouTube. Pada website, keduanya perlu dibedakan: slot radio ditampilkan di halaman Jadwal, sedangkan seri video ditampilkan di halaman Program & Siniar. Pembakuan seri video ditetapkan pada `M-03` dan disusun pada dokumen `02`.

### 2.3 Jadwal Tetap Siaran Radio WBS (24 Jam)

Jadwal berikut adalah **acuan resmi** siaran radio WBS. Siklus harian dimulai pukul **06.00 WIB** dan berakhir pukul **05.59 WIB** keesokan harinya.

Label pada tabel adalah **nama payung program**, bukan daftar lagu atau daftar segmen. Isi tiap jam dapat berupa materi yang berkaitan dengan label tersebut — misalnya obrolan, wawancara, pembacaan, atau musik pendukung. Jadwal ini **sudah final** dan tidak disusun dari pola unggahan YouTube. Perubahan sewaktu-waktu dapat dilakukan oleh **Superadmin atau Admin** melalui panel pengelola (`PR-20`, `M-18`).

| Jam (WIB) | Weekday (Senin–Jumat) | Sabtu | Minggu |
|---|---|---|---|
| **06.00** | Opening | Opening | Opening |
| **07.00** | Lagu | Lagu | Lagu |
| **08.00** | Lagu | Lagu | Lagu |
| **09.00** | Indonesia Pagi Ini | Indonesia Pagi Ini | Indonesia Pagi Ini |
| **10.00** | Pesona Nusantara | Dongeng + Lagu Anak | Dongeng + Lagu Anak |
| **11.00** | Pesona Nusantara | Dongeng + Lagu Anak | Dongeng + Lagu Anak |
| **12.00** | Audiobook | Audiobook | Audiobook |
| **13.00** | Ruang Literasi | Ruang Literasi | Ruang Literasi |
| **14.00** | Ruang Literasi | Ruang Literasi | Ruang Literasi |
| **15.00** | Lagu | Lagu Daerah | Lagu Daerah |
| **16.00** | Lagu | Lagu | Lagu |
| **17.00** | Religi | Religi | Religi |
| **18.00** | Tausiyah | Tausiyah | Tausiyah |
| **19.00** | Lagu Bebas | Lagu Bebas | Lagu Bebas |
| **20.00** | Audiobook | Wayang | Wayang |
| **21.00** | Audiobook | Wayang | Wayang |
| **22.00** | Audiobook | Wayang | Wayang |
| **23.00** | Audiobook | Wayang | Wayang |
| **00.00** | Audiobook | Wayang | Wayang |
| **01.00** | Audiobook | Wayang | Wayang |
| **02.00** | Audiobook | Wayang | Wayang |
| **03.00** | Audiobook | Wayang | Wayang |
| **04.00** | Audiobook | Wayang | Wayang |
| **05.00** | Tausiyah + Lagu Religi | Tausiyah + Lagu Religi | Tausiyah + Lagu Religi |

**Hal penting yang perlu dipahami:**

- **Sabtu dan Minggu identik.** Perbedaan hanya terjadi antara **hari kerja** dan **akhir pekan**: siang hari kerja diisi *Pesona Nusantara* dan *Lagu*, sedangkan akhir pekan diisi *Dongeng + Lagu Anak* dan *Lagu Daerah*; malam hari kerja diisi *Audiobook*, sedangkan akhir pekan diisi *Wayang*.
- **Blok panjang:** Audiobook (weekday) dan Wayang (akhir pekan) berjalan **sembilan jam**, pukul 20.00 sampai 04.59.
- **Transisi 05.00–06.00 (sudah disepakati).** **05.00–05.59** adalah *Tausiyah + Lagu Religi* sebagai penutup siklus, lalu **06.00 Opening** memulai siklus baru. Tidak ada baris ganda.
- **Nama program ditulis "Ruang Literasi" secara penuh** pada jadwal dan seluruh halaman website. Tidak ada singkatan lain (`M-03`).
- **Program yang membuka sesi tanya jawab** hanya *Indonesia Pagi Ini*, *Pesona Nusantara*, dan *Ruang Literasi*, ditambah acara khusus YouTube yang ditandai pengelola (`M-19`).

### 2.4 Kondisi Saat Ini — Katalog YouTube (Bukan Jadwal Radio)

Kami memeriksa seluruh 507 konten pada kanal YouTube WBS. Temuan berikut menggambarkan **kondisi arsip video**, bukan jadwal radio. Sesuai `M-04`, **hanya video berstatus Publik yang dimasukkan ke website: 337 baris data, yang setelah duplikat digabung menjadi 331 video unik**; video privat, *unlisted*, dan yang sudah dihapus tidak diimpor sama sekali.

**a. Kanal YouTube sudah menjadi arsip kegiatan, tetapi belum tertata.**

| Temuan | Angka |
|---|---|
| Total konten (Juli 2020 – November 2026) | **507** |
| Berupa rekaman siaran langsung (live) | **435** (86%) |
| Berupa unggahan video biasa | **72** |
| Status publik — **yang ditampilkan di website** | **337 baris** (331 video unik) |
| Status privat — tidak diimpor | **160** |
| Status "tidak publik"/unlisted — tidak diimpor | **10** |
| Konten tanpa tag sama sekali | **345** (68%) |
| Konten tanpa deskripsi | **21** |
| Judul yang memuat nomor episode | hanya **116** dari 507 |
| Judul yang dipakai lebih dari satu konten | **43 judul** (74 konten berlebih) |

**b. Judul dan penomoran belum baku.** Satu program yang sama bisa muncul sebagai `LibTalk`, `Libtalk`, `LibTalks`, `🔴 LibTalk`, atau `🎙️ LibTalk`. Penomoran episode pun campur: `Diskusi Naskah Nusantara #26` dan `Diskusi Naskah Nusantara 26` adalah hal yang sama.

**c. Deskripsi konten berisi teks promosi, bukan data katalog.** Deskripsi lebih banyak memuat ajakan menghadiri acara, tautan Zoom, nama narasumber, dan footer tautan media sosial. Hanya sebagian konten yang memuat tanggal, jam, narasumber, dan moderator secara lengkap. Akibatnya, **tidak mungkin mencari episode berdasarkan topik, narasumber, atau tahun** dengan andal.

**d. Durasi konten sangat beragam.** Median durasi ±103 menit. Rinciannya: **31 konten kurang dari 5 menit** (umumnya klip pendek atau uji siaran), 26 konten 5–15 menit, 79 konten 15–60 menit, **161 konten 1–2 jam**, **156 konten 2–3 jam**, dan 50 konten lebih dari 3 jam.

**e. Waktu unggah tidak mencerminkan jadwal radio.** Aktivitas unggah/live YouTube memang terkonsentrasi pada hari **Rabu (125)**, Kamis (74), Selasa (64), Senin (43), dan Jumat (40), dengan waktu unggah metadata banyak jatuh pada malam hari. Ini adalah **kebiasaan dokumentasi acara**, bukan jadwal siaran radio — sehingga tidak dipakai sebagai patokan jadwal.

**f. Interaksi di YouTube rendah, padahal acara interaktif.** Total likes 10.615, tetapi komentar hanya **446** untuk 507 konten. Ini menandakan pendengar berinteraksi di tempat lain — Zoom, Instagram, atau WhatsApp — bukan di kolom komentar YouTube.

**g. Sudah ada konten yang hilang dari kanal.** Sebanyak **11 konten** yang masih tercatat pada arsip ekspor data pengelola **tidak lagi ditemukan** pada data kanal saat ini (indikasi dihapus atau diubah statusnya). Termasuk di antaranya materi LibTalk Reference Series dan satu sesi FGD IKON. Ini bukti nyata bahwa **arsip yang hanya bergantung pada satu kanal itu rapuh**.

### 2.5 Masalah yang Ingin Dipecahkan

| No | Masalah | Akibat bagi Pendengar | Akibat bagi Pustakawan |
|---|---|---|---|
| **P-1** | Arsip 337 baris data publik (331 video unik, dari 507 konten) tidak terstruktur (tidak ada seri, episode, topik) | Sulit menemukan kembali episode yang pernah ditonton | Sulit menunjukkan capaian layanan; sulit menyusun program berbasis arsip |
| **P-2** | Tidak ada halaman yang menjelaskan program WBS | Pendengar baru tidak tahu ada program apa saja | Setiap kali ditanya, harus menjelaskan manual |
| **P-3** | Jadwal radio 24 jam yang sudah baku tidak tersaji secara digital | Pendengar tidak tahu apa yang sedang/akan mengudara | Setiap ditanya jadwal, harus menjawab manual |
| **P-4** | Tidak ada kanal pertanyaan yang tercatat | Pertanyaan hilang di kolom komentar atau DM | Penyiar tidak punya daftar pertanyaan yang siap dibacakan |
| **P-5** | Data konten tidak baku | Pencarian tidak akurat | Pekerjaan merapikan data menumpuk |
| **P-6** | Arsip bergantung pada satu kanal pihak ketiga | Konten bisa hilang tanpa pemberitahuan | Kehilangan dokumentasi kegiatan yang bernilai |

---

## 3. Tujuan dan Indikator Keberhasilan

### 3.1 Tujuan

| No | Tujuan | Penjelasan Sederhana |
|---|---|---|
| **T-1** | Menyatukan kedua wajah layanan dalam satu alamat | Satu tempat untuk mendengar radio, melihat jadwal, dan menelusuri arsip video |
| **T-2** | Menyajikan jadwal radio 24 jam secara terbuka | Pendengar tahu apa yang mengudara sekarang dan nanti |
| **T-3** | Menata 337 baris data publik (331 video unik) menjadi katalog yang bisa ditelusuri | Setiap konten punya rumah: seri, episode, topik, narasumber |
| **T-4** | Menyediakan kanal pertanyaan yang tertib | Pertanyaan masuk hanya saat sesi dibuka, tersimpan, dan bisa dibacakan |
| **T-5** | Menjaga keberlangsungan arsip | Data katalog tersimpan di sistem sendiri, tidak bergantung penuh pada YouTube |
| **T-6** | Menyiapkan fondasi serah terima | Website dan panduan dapat diserahkan serta dikelola mandiri oleh pustakawan |

### 3.2 Indikator Keberhasilan

Diukur **3 bulan setelah peluncuran**. Angka awal (baseline) saat ini adalah **0** karena website belum ada.

| No | Indikator | Target Awal | Cara Mengukur |
|---|---|---|---|
| **IK-1** | Jadwal radio 24 jam tampil dan sesuai jadwal studio | 100% jam terisi benar untuk Weekday, Sabtu, Minggu | Uji banding jadwal vs tampilan |
| **IK-2** | Penanda "Sedang Mengudara" akurat | ≥95% pengamatan tepat | Uji coba pada jam berbeda |
| **IK-3** | Siaran radio dapat diputar dari beranda | Maksimal 2 klik | Uji coba langsung |
| **IK-4** | Seri video yang disepakati memiliki halaman resmi | 100% dari daftar seri pada `M-03` | Daftar seri vs halaman terbit |
| **IK-5** | Konten publik terpetakan ke seri & metadata wajib | ≥80% dari 331 konten publik (video unik) | Laporan kelengkapan metadata |
| **IK-6** | Halaman utama tampil dalam waktu wajar | ≤3 detik pada jaringan kantor | Pengukuran kecepatan halaman |
| **IK-7** | Pertanyaan pendengar tercatat | 100% pertanyaan tersimpan dan dapat ditindaklanjuti | Rekap panel admin |
| **IK-8** | Konten yang hilang dari kanal tetap terdokumentasi | 0 konten hilang tanpa catatan | Pemeriksaan berkala tautan |
| **IK-9** | Pustakawan dapat mengelola konten tanpa bantuan pengembang | ≥80% tugas rutin selesai mandiri | Uji coba & kuesioner kepuasan |
| **IK-10** | Navigasi publik ringkas dan dangkal | Maksimal 5 menu utama; semua halaman publik tercapai ≤2 klik dari beranda | Uji peta navigasi & uji pengguna |

### 3.3 Yang Bukan Tujuan (Non-Goals)

| No | Tidak Termasuk | Alasan |
|---|---|---|
| **NG-1** | Menyimpan/menghosting file video atau audio | Membebani penyimpanan & biaya; arsip tetap di YouTube (`K-2`) |
| **NG-2** | Membangun atau menggantikan infrastruktur pemancar/server streaming radio | Radio sudah berjalan; website hanya menampilkan pemutar |
| **NG-3** | Live chat bebas atau request lagu terbuka | Risiko moderasi tinggi dan tidak sesuai kebutuhan (`K-3`) |
| **NG-4** | Aplikasi mobile (Android/iOS) | Website responsif sudah cukup untuk tahap awal |
| **NG-5** | Transaksi, langganan, atau iklan | Tidak relevan dengan layanan publik Perpusnas |
| **NG-6** | Komentar publik di dalam website | Interaksi dibatasi pada pertanyaan sesi On-Air |
| **NG-7** | Transkripsi otomatis seluruh arsip | Bermanfaat, tetapi berat; dipertimbangkan pada tahap lanjutan |
| **NG-8** | Situs multibahasa (Inggris) | Dipertimbangkan setelah versi Indonesia stabil (`M-12`) |
| **NG-9** | Pengganti sistem kepegawaian atau presensi | Di luar cakupan layanan radio |
| **NG-10** | Carousel otomatis, efek parallax, pop-up promosi, dan mode gelap | Mengganggu keterbacaan, memberatkan ponsel, dan menambah pekerjaan pengujian (`K-6`) |

---

## 4. Pengguna dan Peran

### 4.1 Pengguna Website (Publik)

| Peran | Siapa | Kebutuhan Utama |
|---|---|---|
| **Pendengar Radio** | Masyarakat umum, pemustaka, pengunjung Perpusnas | Tahu apa yang sedang mengudara, memutar radio, melihat jadwal |
| **Pendengar Setia (Sahabat Perpusnas)** | Pengikut kanal & media sosial WBS | Mencari episode lama, mengirim pertanyaan saat sesi dibuka |
| **Peneliti / Pelajar** | Mahasiswa, peneliti naskah & sejarah | Mencari video berdasarkan topik, narasumber, tahun |
| **Pustakawan Daerah / Mitra** | Mitra kolaborasi, perpustakaan daerah | Mencari materi literasi untuk dipakai ulang |

### 4.2 Pengelola (Internal)

| Peran | Siapa | Tugas dalam Sistem | Perlu Akun? |
|---|---|---|---|
| **Superadmin** | Gusti Ahmad Muttahid Bilhaq dan Kepala Layanan Radio & Siniar WBS | Akses penuh: mengelola akun & peran pengguna, pengaturan situs (termasuk URL aliran Icecast dan integrasi analitik), jadwal tetap, seri & episode, halaman statis, sesi tanya jawab On-Air, serta melihat laporan/statistik | Ya |
| **Admin** | Seluruh petugas layanan, pustakawan, dan penyiar di unit WBS | Memperbarui jadwal tetap, mengelola seri & episode, menyunting halaman statis, membuka/menutup sesi tanya jawab On-Air, serta memantau dan menyaring pertanyaan masuk | Ya |

> **Catatan:** hanya ada **dua peran akun**. Penyiar dan pustakawan memakai akun **Admin**; kewenangan khusus seperti mengelola akun dan pengaturan situs dipegang **Superadmin** (`M-09`, `M-15`).

---

## 5. Keputusan yang Sudah Ditetapkan

Enam keputusan berikut sudah disepakati dan **menjadi dasar seluruh rancangan**.

### K-1 — Identitas Proyek: Inisiatif Magang Berstandar Kanal Resmi

Website ini adalah **proyek inisiatif** mahasiswa magang, dirancang **menyerupai standar kanal resmi** Perpustakaan Nasional RI (gaya bahasa, identitas visual, tata kelola informasi). Rancangannya telah **dimusyawarahkan dan disepakati** pada dokumen ini, lalu disiapkan untuk **dihibahkan** kepada unit Layanan Radio dan Siniar WBS.

**Konsekuensi:**
- Selama masa magang, pengelola teknis utama adalah penyusun.
- Website tidak otomatis menjadi kanal resmi sebelum ada persetujuan dan serah terima formal.
- Rancangan harus **mudah dilanjutkan orang lain**: terdokumentasi dan tidak bergantung pada satu orang.

### K-2 — Posisi terhadap YouTube: Etalase & Katalog yang Me-*embed*

Website **tidak menyimpan** file video/audio. Pemutar diambil dari kanal YouTube resmi **WBS Radio Perpusnas**, baik untuk acara langsung maupun arsip publik. Video privat, *unlisted*, atau yang sudah dihapus tidak dimasukkan (`M-04`).

**Yang didapat:** biaya penyimpanan dan bandwidth jauh lebih kecil; 331 video unik (dari 337 baris publik) tidak perlu diunggah ulang; konten tetap terlacak di kanal resmi.

**Yang harus diantisipasi:** jika video dihapus atau diprivatkan, pemutar di website ikut kosong. Karena itu **data katalog wajib disimpan di sistem sendiri** (judul, seri, narasumber, durasi, tanggal), bukan sekadar tautan.

### K-3 — Interaksi Pendengar: Pertanyaan pada Sesi Siaran Aktif

Tidak ada live chat bebas dan tidak ada request lagu terbuka. Interaksi dibatasi pada **pengajuan pertanyaan ketika pengelola membuka sesi** untuk program yang sedang mengudara:

1. Pengunjung melihat **program yang sedang mengudara** beserta jamnya.
2. Kolom pertanyaan **hanya muncul jika pengelola telah membuka sesi** untuk program tersebut.
3. Pendengar mengisi **dua kolom: Nama dan Pertanyaan**. Kolom Nama wajib diisi, tetapi boleh memakai nama samaran atau **"Anonim"** (`M-06`).
4. Pertanyaan masuk ke panel pengelola untuk **dipilih dan dibacakan** saat siaran.
5. Pengelola **menutup sesi** ketika sesi berakhir; kolom pertanyaan hilang dari halaman publik.

**Alasan pemilihan konsep ini:** sesuai kebiasaan siaran WBS yang interaktif melalui moderator; menghindari beban moderasi 24 jam; menghasilkan **daftar pertanyaan yang rapi dan siap dibacakan**.

*(Program yang membuka sesi tanya jawab sudah ditetapkan pada `M-19`: hanya program interaktif dan acara khusus YouTube yang ditandai pengelola.)*

### K-4 — Acuan Jadwal: Radio Bersifat Tetap, Katalog YouTube Bersifat Insidental

Jadwal siaran radio mengikuti **tabel tetap 24 jam** (Bagian 2.3) yang dimulai pukul 06.00 WIB setiap hari. Sebaliknya, 507 konten YouTube adalah **arsip acara yang insidental** dan **tidak** mengikuti jadwal tetap.

**Konsekuensi:**
- Halaman **Jadwal** menampilkan jadwal radio 24 jam, **bukan** daftar waktu unggah YouTube.
- Halaman **Program & Siniar** menampilkan arsip video berdasarkan seri/kategori, **bukan** berdasarkan jam tayang.
- Jadwal radio bersifat **baku**, sehingga perubahan jadwal harus melalui pembaruan data oleh **Superadmin atau Admin** di panel pengelola.

### K-5 — Sumber Audio & Kendali Siaran: Icecast + Jazler RadioStar 2

Audio siaran radio diambil dari **aliran Icecast** yang dipancarkan studio WBS. Pengaturan pemutaran (playlist, jingle, urutan materi) dilakukan di studio melalui **Jazler RadioStar 2**.

**Konsekuensi:**
- Website hanya menjadi **penerima aliran audio**. Website **tidak** mengendalikan apa yang sedang diputar dan **tidak** menggantikan Jazler.
- Penanda "Sedang Mengudara" dihitung dari **jam dan jadwal** (Bagian 2.3), bukan dari pemantauan playout studio. Jika studio menyimpang dari jadwal, website tidak otomatis mengetahuinya.
- Panel admin **tidak memiliki tombol putar/hentikan/ganti lagu**. Fitur itu tetap menjadi wewenang penyiar di studio.
- Alamat aliran Icecast (host, port, nama kanal/mount) harus diserahkan oleh pengelola studio sebelum pemutar dapat diaktifkan (`D-8`).

### K-6 — Acuan Desain & Pengalaman: Sederhana ala UT Radio, Identitas Tetap Perpusnas

Rancangan antarmuka mengadaptasi **pola desain UT Radio** (`https://utradio.ut.ac.id/`) yang dinilai sederhana, bersih, dan mudah dipakai. Yang diadopsi adalah **polanya**, bukan logo, warna, atau isinya.

**Konsekuensi:**
- **Navigasi publik dibatasi 5 menu utama**: Beranda, Jadwal Siaran, Program & Siniar, Tentang WBS, Kontak.
- **Pemutar radio melekat di semua halaman** (bar bawah), sehingga pendengar dapat berpindah halaman tanpa kehilangan siaran.
- **Beranda berpusat pada siaran**, bukan pada banner promosi. Tidak ada carousel otomatis, parallax, atau pop-up.
- **Identitas visual tetap mengikuti Perpusnas** (logo, warna, tipografi) dan disetujui melalui `D-2`. UT Radio hanya menjadi acuan tata letak dan alur.
- Unsur UT Radio yang **tidak diadopsi** pada tahap awal: komentar/like publik, login pengunjung, ringkasan AI, mode gelap, dan kalender acara penuh. Acara khusus cukup tampil sebagai daftar **"Acara Mendatang"** (`M-10`). Alasannya: menambah beban pengelolaan dan tidak menjawab masalah utama WBS.

---

## 6. Gambaran Solusi

### 6.1 Dua Mode yang Sejajar

| Mode | Kapan Muncul | Isi |
|---|---|---|
| **Mode Radio** | Selalu aktif | Pemutar audio siaran (aliran **Icecast**) yang **melekat di semua halaman**, penanda **"Sedang Mengudara"** sesuai jam, jadwal 24 jam, program berikutnya, kolom pertanyaan (jika sesi dibuka) |
| **Mode Katalog Video & Siniar** | Setiap saat | Daftar seri, daftar episode, pencarian, detail episode dengan pemutar YouTube |

Keduanya **tidak saling menggantikan**. Saat radio sedang menyiarkan lagu, katalog tetap dapat ditelusuri. Saat tidak ada acara khusus di YouTube, beranda tetap hidup dengan **"Sedang Mengudara"** dan **jadwal berikutnya** — karena radio selalu mengudara, beranda tidak pernah kosong.

### 6.2 Prinsip Katalog: "Etalase, Bukan Gudang"

- Hanya video YouTube berstatus **Publik** yang dipetakan menjadi **satu Episode**; video privat, *unlisted*, dan yang sudah dihapus **tidak diimpor** (`M-04`).
- Setiap Episode berada di bawah **satu Seri/Program**. Nama seri dibakukan dari variasi judul yang mirip; judul yang berdiri sendiri dimasukkan ke kategori **"Lainnya"** (`M-03`).
- Episode memiliki **metadata wajib**: judul baku, seri, nomor episode, tanggal tayang, durasi, narasumber, moderator, topik, tautan YouTube, dan status.
- Video publik yang tidak layak tampil (uji siaran, klip sangat pendek, konten internal kepegawaian) **tetap tercatat** dengan status **Arsip Internal**, tetapi tidak muncul di katalog publik (`M-16`).

### 6.3 Prinsip Jadwal: "Selalu Tahu Apa yang Mengudara"

- Sistem memiliki data **jadwal tetap** yang terdiri atas: jam mulai, jam selesai, nama program, hari berlaku (Weekday/Sabtu/Minggu), dan deskripsi singkat.
- Berdasarkan jam perangkat pengunjung (WIB), sistem menandai **program yang sedang berlangsung** dan **program berikutnya**.
- Penanda ini **berbasis jam dan jadwal**, bukan bergantung pada sinyal dari studio. Sistem **tidak terhubung langsung ke Jazler RadioStar 2**, sehingga isi playout tidak terbaca otomatis. Jika siaran terlambat atau berubah mendadak, admin dapat menyesuaikan jadwal.

### 6.4 Fitur Tanya Jawab On-Air

**Di sisi pendengar:**
```
[ Sedang Mengudara: Pesona Nusantara ]
🎙️ Radio WBS — 10.00–12.00 WIB

Punya pertanyaan untuk penyiar/narasumber?
[Nama]        ...................  (wajib; boleh nama samaran atau "Anonim")
[Pertanyaan]  ...................
[ Kirim Pertanyaan ]
```
Jika sesi belum dibuka: kolom tidak tampil, diganti keterangan *"Sesi tanya jawab belum dibuka."*
Jika sesi sudah ditutup: diganti *"Sesi tanya jawab untuk program ini telah berakhir."*

**Di sisi pengelola:**
- Pertanyaan **langsung masuk** ke panel tanpa pra-moderasi karena tidak tampil di halaman publik (`M-07`).
- Daftar pertanyaan ditandai jumlah baru; petugas dapat **menandai Dibacakan**, **menyembunyikan**, atau **menghapus** pertanyaan yang tidak pantas.
- Pertanyaan tersimpan sebagai **arsip tanya jawab** dan dapat dihapus sewaktu-waktu oleh Admin atau Superadmin (`M-08`).
- Tombol **Buka Sesi** dan **Tutup Sesi** per program per tanggal dapat dipakai **Superadmin maupun Admin** (`M-09`).
- Sesi hanya tersedia untuk *Indonesia Pagi Ini*, *Pesona Nusantara*, *Ruang Literasi*, dan acara khusus yang ditandai (`M-19`).

### 6.5 Prinsip Desain & Pengalaman Pengguna (UX)

Rancangan mengadaptasi **pola** UT Radio: sederhana, bersih, dan tidak membuat pengunjung berpikir dua kali. Sepuluh prinsip berikut menjadi pegangan saat halaman dirancang dan saat diuji.

1. **Satu tujuan utama per layar.** Begitu beranda terbuka, pengunjung langsung melihat **apa yang sedang mengudara** dan **tombol putar**. Tidak ada banner promosi yang menutupinya.
2. **Radio selalu satu klik dari mana saja.** Pemutar melekat di bagian bawah semua halaman. Berpindah halaman **tidak memutus** audio.
3. **Navigasi maksimal 5 menu.** Beranda, Jadwal Siaran, Program & Siniar, Tentang WBS, Kontak. Tidak ada menu tambahan yang disembunyikan di dalam menu lain.
4. **Beranda bercerita dari atas ke bawah.** Urutannya tetap: siaran → pintasan → episode terbaru → program → jadwal hari ini → acara mendatang → tentang. Pengunjung tidak perlu menebak ke mana harus menggulir.
5. **Kartu, bukan tabel padat.** Katalog dan daftar episode memakai kartu dengan gambar, judul, seri, tanggal, dan durasi. Tabel hanya dipakai untuk jadwal 24 jam.
6. **Jadwal mudah dipindai.** Halaman Jadwal memakai tab **Hari Kerja / Sabtu / Minggu**, penanda baris **"Sekarang"**, dan tombol kembali ke atas. Jam selalu berlabel **WIB**.
7. **Tanpa gangguan.** Tidak ada carousel otomatis, parallax, pop-up, atau audio yang berbunyi sendiri. Video hanya berputar setelah pengunjung menekan tombol.
8. **Selalu ada jalan kembali.** Episode → Seri → Program & Siniar. Setiap halaman detail memuat remah navigasi (*Beranda / Program / Nama Seri / Judul Episode*).
9. **Ponsel lebih dulu.** Semua tombol penting dapat dijangkau dengan ibu jari; tidak ada teks yang harus diperbesar; pemutar tetap terlihat tanpa menutupi isi.
10. **Bahasa sederhana dan konsisten.** Label memakai istilah yang sama di seluruh situs (contoh: selalu "Sedang Mengudara", bukan berganti-ganti "On Air"/"Live"). Bahasa Indonesia, tanpa singkatan internal.

**Arah visual (menunggu persetujuan `D-2`):**
- Identitas Perpusnas menjadi dasar: logo resmi, warna institusi, dan tipografi yang mudah dibaca.
- Warna netral untuk latar, **satu warna aksen** untuk tombol utama dan penanda siaran. Status siaran tidak boleh hanya dibedakan oleh warna (perlu teks/ikon).
- Ruang kosong yang cukup; satu layar tidak dipenuhi lebih dari satu pesan utama.
- Gambar program memakai rasio **16:9** yang seragam agar kartu sejajar rapi.
- Ikon sederhana dan sudah dikenal: putar, jeda, volume, pencarian, kalender.

**Pola UT Radio yang diadopsi, disesuaikan, atau tidak diadopsi:**

| Pola pada UT Radio | Keputusan untuk WBS | Alasan |
|---|---|---|
| Navigasi ringkas 3 menu + Login | **Diadopsi** menjadi 5 menu, **tanpa login pengunjung** | Ringkas, tetapi WBS perlu halaman Program & Siniar dan Kontak |
| Pemutar bar bawah yang melekat | **Diadopsi**, ditambah informasi **program aktif & berikutnya** | Nilai tambah WBS; UT Radio hanya menampilkan status pemutar |
| Banner besar di atas beranda (carousel) | **Disesuaikan** menjadi **hero siaran statis** | Menghindari carousel otomatis; fokus pada siaran |
| Blok "New Release" berisi kartu program | **Diadopsi** sebagai **Episode Terbaru** | Pola yang sudah dikenal dan mudah dipindai |
| Tab kategori podcast | **Disesuaikan** menjadi saringan seri di satu halaman | Lebih sedikit halaman, lebih mudah dikelola |
| "Trend Videos" dan blok promosi tambahan | **Tidak diadopsi** | Menambah kepadatan tanpa manfaat langsung |
| Parallax dan ajakan bergulir | **Tidak diadopsi** | Mengganggu, berat di ponsel |
| Pencarian jadwal di dalam pemutar | **Disesuaikan** menjadi tautan ke halaman Jadwal Siaran | Satu tempat untuk mencari jadwal, tidak menduplikasi |
| Tambah ke kalender (Google/MS) | **Tidak diadopsi** tahap awal | Belum menjadi kebutuhan mendesak |
| Komentar, suka, login pengunjung, ringkasan AI | **Tidak diadopsi** tahap awal | Beban moderasi dan pengelolaan (`NG-6`) |
| Footer kontak, media sosial, kebijakan privasi | **Diadopsi** | Pola baku layanan publik |
| Halaman Tentang berisi visi, misi, dan tim | **Diadopsi** | Dibutuhkan untuk kredibilitas lembaga |
| Mode gelap | **Tidak diadopsi** tahap awal | Menambah pekerjaan pengujian; bukan kebutuhan utama |

**Perilaku responsif yang dijanjikan:**

| Bagian | Ponsel (< 640 px) | Desktop (≥ 1024 px) |
|---|---|---|
| Header | Logo + tombol menu (laci) + ikon pencarian | Logo + 5 menu sejajar + ikon pencarian |
| Hero siaran | Teks bertumpuk, tombol selebar layar | Dua kolom: teks siaran + ilustrasi/foto |
| Kartu episode | Satu kolom (daftar) | Tiga kolom sejajar |
| Jadwal | Daftar per jam (kartu ringkas) | Tabel 24 baris |
| Pemutar | Bar bawah dua baris, tombol besar | Bar bawah satu baris |
| Footer | Satu kolom bertumpuk | Empat kolom |

---

### 6.6 Peta Situs Final

**Navigasi header (5 menu):**

| Urutan | Menu | Mengarah ke |
|---|---|---|
| 1 | **Beranda** | `/` |
| 2 | **Jadwal Siaran** | `/jadwal` |
| 3 | **Program & Siniar** | `/program` |
| 4 | **Tentang WBS** | `/tentang` |
| 5 | **Kontak** | `/kontak` |

Di sisi kanan header: **ikon pencarian** (membuka kolom pencarian di tempat, bukan halaman baru) dan **tombol "Dengarkan"** yang memutar siaran langsung tanpa meninggalkan halaman. Hasil pencarian ditampilkan pada halaman `/cari`.

**Navigasi footer (4 kolom):**

| Kolom | Isi |
|---|---|
| **Tentang** | Ringkasan singkat WBS + tautan ke Tentang WBS dan Kebijakan Privasi |
| **Jelajahi** | Beranda, Jadwal Siaran, Program & Siniar, Pencarian |
| **Kontak** | Alamat Perpusnas, surel, telepon, jam layanan |
| **Ikuti** | Instagram, Facebook, X, YouTube, WhatsApp (sesuai kanal aktif, `PR-41`) |

Baris paling bawah: `© 2026 Perpustakaan Nasional RI — Layanan Radio & Siniar Widya Bahana Swara` dan tautan ke situs utama Perpusnas.

**Daftar halaman final:**

| No | Halaman | Alamat | Fungsi Utama | Akses |
|---|---|---|---|---|
| 1 | **Beranda** | `/` | Status siaran, tombol putar, episode terbaru, program, jadwal hari ini, acara mendatang, pengenalan WBS | Menu utama |
| 2 | **Jadwal Siaran** | `/jadwal` | Jadwal 24 jam dengan tab Hari Kerja / Sabtu / Minggu dan penanda "Sekarang" | Menu utama |
| 3 | **Program & Siniar** | `/program` | Semua seri dalam kartu; saringan kategori dan pencarian di halaman | Menu utama |
| 4 | **Tentang WBS** | `/tentang` | Profil layanan, visi, sejarah singkat, tim, dan kanal resmi | Menu utama |
| 5 | **Kontak** | `/kontak` | Alamat, surel, telepon, jam layanan, media sosial, kanal pengaduan | Menu utama |
| 6 | **Detail Seri** | `/program/{nama-seri}` | Penjelasan satu seri + daftar seluruh episodenya | Dari kartu program |
| 7 | **Detail Episode** | `/program/{nama-seri}/{judul-episode}` | Metadata lengkap, pemutar YouTube, tautan asli, tautan kembali ke seri | Dari daftar episode / pencarian |
| 8 | **Hasil Pencarian** | `/cari?q=...` | Mencari seri dan episode berdasarkan kata kunci | Ikon pencarian |
| 9 | **Kebijakan Privasi** | `/kebijakan-privasi` | Penjelasan data pertanyaan, arsip tanya jawab, dan analitik kunjungan anonim | Footer |
| 10 | **Halaman Tidak Ditemukan** | `/404` | Pesan ramah + jalan kembali ke Beranda atau Program & Siniar | Otomatis |

**Panel Tanya Jawab** bukan halaman tersendiri. Panel ini muncul di **beranda** (dan di halaman Jadwal pada program yang sedang berlangsung) hanya ketika pengelola membuka sesi untuk program tersebut. Bila sesi tertutup, tempatnya diganti keterangan singkat.

**Aturan navigasi:**
- Semua halaman publik dapat dicapai **maksimal 2 klik** dari beranda.
- Halaman **Radio** terpisah **tidak ada**; fungsi radio menyatu di beranda + pemutar persisten.
- Setiap halaman detail selalu menampilkan **remah navigasi** dan tombol **"Kembali ke seri"**.
- Halaman `404` tetap menampilkan pemutar persisten agar siaran tidak terputus saat tautan salah.

---

### 6.7 Blueprint Halaman Utama (Beranda)

Sketsa berikut menggambarkan urutan blok dari atas ke bawah pada layar desktop. Pada ponsel, blok yang sama ditumpuk satu kolom.

```
[HEADER]
Logo WBS  |  Beranda  |  Jadwal Siaran  |  Program & Siniar  |  Tentang WBS  |  Kontak   [🔍 Pencarian]  [Dengarkan]
────────────────────────────────────────────────────────────
[HERO SIARAN — statis, tanpa carousel]
● SEDANG MENGUDARA
Indonesia Pagi Ini
08.00–10.00 WIB · Hari Kerja
[ ▶ Dengarkan Sekarang ]   [ Lihat Jadwal Hari Ini ]
Berikutnya: Pesona Nusantara — 10.00 WIB
────────────────────────────────────────────────────────────
[PINTASAN CEPAT]
[ Jadwal Hari Ini ]   [ Program & Siniar ]   [ Tentang WBS ]
────────────────────────────────────────────────────────────
[EPISODE TERBARU]                                  [Lihat semua →]
[Kartu 1]   [Kartu 2]   [Kartu 3]   [Kartu 4]
(gambar 16:9 + judul + seri + tanggal pada setiap kartu)
────────────────────────────────────────────────────────────
[JELAJAHI PROGRAM]                                [Semua program →]
[Semua] [Kategori A] [Kategori B] [Kategori C]
[Kartu Seri]   [Kartu Seri]   [Kartu Seri]
────────────────────────────────────────────────────────────
[JADWAL HARI INI]                                  [Jadwal 24 jam →]
06.00  Opening
07.00  ...
08.00  Indonesia Pagi Ini            ◀ SEKARANG
09.00  Indonesia Pagi Ini
10.00  Pesona Nusantara
────────────────────────────────────────────────────────────
[ACARA MENDATANG]
[Kartu Acara]  Judul · tanggal · jam WIB · kanal
[Kartu Acara]  ...
────────────────────────────────────────────────────────────
[TENTANG WBS]
[Foto studio]   Radio & Siniar Widya Bahana Swara ...
                [Baca selengkapnya →]
────────────────────────────────────────────────────────────
[FOOTER — 4 kolom + baris hak cipta]
────────────────────────────────────────────────────────────
[PEMUTAR PERSISTEN — melekat di bawah layar]
[Logo]  Sedang Mengudara: Indonesia Pagi Ini   [▶/❚❚]   🔊 ────
```

**Aturan setiap blok beranda:**

| Blok | Isi | Aturan UX | Sumber di Panel Admin |
|---|---|---|---|
| **Header** | Logo, 5 menu, ikon pencarian, tombol Dengarkan | Tetap terlihat saat menggulir; pada ponsel menu masuk ke laci | Pengaturan situs (`PR-26`) |
| **Hero siaran** | Status, nama program, jam, tombol putar, program berikutnya | Status dihitung dari jam & jadwal, bukan dari studio (`K-5`); tanpa carousel | Jadwal Tetap (`PR-20`) |
| **Pintasan** | Tiga tombol ke halaman utama | Tetap sama sepanjang tahun; tidak berubah-ubah | Tetap (bukan konten) |
| **Episode terbaru** | Empat episode berstatus **Tayang**, terbaru lebih dulu | Bila kurang dari empat, kartu yang ada saja yang tampil; tidak ada kartu kosong | Kelola Episode (`PR-19`) |
| **Jelajahi program** | Kartu seri + saringan kategori | Maksimal 6 kartu di beranda; sisanya lewat "Semua program" | Kelola Seri (`PR-18`, `PR-45`) |
| **Jadwal hari ini** | Lima baris jadwal di sekitar jam sekarang + penanda | Otomatis mengikuti hari (Hari Kerja/Sabtu/Minggu) | Jadwal Tetap (`PR-20`) |
| **Acara mendatang** | Maksimal 3 acara khusus terdekat: judul, tanggal, jam WIB, kanal | Blok disembunyikan bila tidak ada acara; bukan kalender penuh (`M-10`) | Pengumuman & Acara (`PR-23`) |
| **Tentang WBS** | Satu paragraf + foto + tautan | Teks ringkas, bukan sejarah panjang | Halaman statis (`PR-23`) |
| **Footer** | Empat kolom + hak cipta | Tautan media sosial mengikuti kanal aktif | Pengaturan situs (`PR-26`) |
| **Pemutar persisten** | Tombol putar/jeda, nama program aktif, volume | Tidak menutupi footer; tetap aktif saat berpindah halaman | Jadwal Tetap + `D-8` (`PR-44`) |

---

### 6.8 Blueprint Program & Detail Episode

#### 6.8.1 Halaman Program & Siniar (`/program`)

```
[HEADER — sama seperti beranda]
────────────────────────────────────────────────────────────
[JUDUL HALAMAN]
Program & Siniar
"Jelajahi seluruh seri dan episode Radio WBS."
[🔍 Cari judul episode atau nama seri...]
[Semua] [Kategori A] [Kategori B] [Kategori C] [Kategori D]
────────────────────────────────────────────────────────────
[DAFTAR SERI]
[Kartu Seri]   [Kartu Seri]   [Kartu Seri]
[Kartu Seri]   [Kartu Seri]   [Kartu Seri]

Menampilkan 12 dari 21 seri          [Muat lebih banyak]
────────────────────────────────────────────────────────────
[FOOTER]
[PEMUTAR PERSISTEN]
```

Setiap kartu seri memuat: gambar 16:9, nama seri, satu kalimat penjelasan, jumlah episode, dan label kategori.

#### 6.8.2 Halaman Detail Seri (`/program/{nama-seri}`)

```
Beranda / Program & Siniar / Nama Seri
────────────────────────────────────────────────────────────
[Gambar seri 16:9]   NAMA SERI
                     Kategori · 24 episode
                     Penjelasan 2–3 kalimat tentang seri
────────────────────────────────────────────────────────────
[DAFTAR EPISODE]
Urutkan: [Terbaru ▾]
[Kartu Episode]   Judul · tanggal · durasi · nomor episode
[Kartu Episode]   ...
[Kartu Episode]   ...
                                     [Muat lebih banyak]
────────────────────────────────────────────────────────────
[FOOTER]
[PEMUTAR PERSISTEN]
```

#### 6.8.3 Halaman Detail Episode (`/program/{nama-seri}/{judul-episode}`)

```
Beranda / Program & Siniar / Nama Seri / Judul Episode
────────────────────────────────────────────────────────────
[JUDUL EPISODE]
Nama Seri · Episode 12 · 14 Oktober 2026 · 1 jam 42 menit

[PEMUTAR YOUTUBE 16:9]              [TENTANG EPISODE]
                                    Narasumber: ...
                                    Moderator: ...
                                    Topik: ...
                                    [Tonton di YouTube]
                                    [Bagikan] [Salin tautan]
────────────────────────────────────────────────────────────
[DESKRIPSI EPISODE]
Ringkasan isi episode (2–4 paragraf pendek).
────────────────────────────────────────────────────────────
[EPISODE LAIN DARI SERI INI — tahap lanjutan]      [Lihat seri →]
[Kartu]   [Kartu]   [Kartu]
────────────────────────────────────────────────────────────
[FOOTER]
[PEMUTAR PERSISTEN]
```

**Aturan halaman katalog dan detail:**

| Blok | Aturan UX | Sumber di Panel Admin |
|---|---|---|
| Saringan kategori | Hanya kategori yang punya seri tampil; pilihan "Semua" selalu ada | Kelola Seri (`PR-18`) |
| Kartu seri | Hanya seri berstatus **Tayang** yang muncul | Kelola Seri (`PR-18`) |
| Daftar episode | Hanya episode berstatus **Tayang**; **Draf** dan **Arsip Internal** tidak terlihat publik | Kelola Episode (`PR-19`, `PR-28`) |
| Pemutar YouTube | Video **tidak** berputar otomatis; bila video gagal, tampil pesan sopan + tautan ke YouTube | Tautan episode (`PR-40`) |
| Metadata | Judul baku, seri, nomor episode, tanggal, durasi, narasumber, moderator, topik | Metadata wajib (`PR-27`) |
| Berbagi | Tombol WhatsApp + salin tautan; tanpa pelacakan pribadi | `PR-16` |
| Episode terkait | Maksimal 3 episode dari seri yang sama; bila kosong, blok disembunyikan | Otomatis (fitur `N`; aktif pada tahap lanjutan) |
| Pencarian | Mencari pada judul episode, nama seri, narasumber, dan topik | Pencarian (`PR-10`) |
| Hasil kosong | Pesan "Tidak ada hasil untuk '...'" + saran kata kunci + tombol kembali | Tetap |

---

### 6.9 Penyelarasan Pengunjung–Admin

Bagian ini memastikan **setiap komponen yang dilihat pengunjung punya pengelolaan yang jelas**. Pustakawan tidak perlu menyentuh kode untuk perubahan rutin.

| Komponen di Halaman Pengunjung | Yang Tampil | Tindakan Admin | Lokasi di Panel | Frekuensi |
|---|---|---|---|---|
| **Status "Sedang Mengudara"** | Nama program + jam | Menyunting jadwal tetap (jam, hari, nama) | Jadwal Tetap | Saat jadwal berubah |
| **Program berikutnya** | Nama + jam mulai | Otomatis dari jadwal; tidak perlu diisi terpisah | Jadwal Tetap | Otomatis |
| **Jadwal hari ini / 24 jam** | Tabel per hari | Menambah/mengubah baris jadwal, menandai hari berlaku | Jadwal Tetap | Awal periode / insidental |
| **Acara Mendatang** | Judul, tanggal, jam WIB, kanal | Menambah atau menghapus acara khusus | Pengumuman & Acara | Insidental |
| **Hero beranda** | Program aktif + tombol putar | Tidak ada konten manual; mengikuti jadwal | — | Otomatis |
| **Episode terbaru** | Empat episode terbaru | Menambah episode, mengubah status menjadi **Tayang** | Kelola Episode | Setiap ada episode baru |
| **Kartu seri** | Nama, gambar, jumlah episode | Menambah seri, mengunggah gambar, mengatur urutan | Kelola Seri | Saat ada seri baru |
| **Halaman detail episode** | Metadata + pemutar YouTube | Mengisi metadata wajib, menempel tautan YouTube | Kelola Episode | Setiap episode |
| **Pencarian** | Hasil dari judul/seri/narasumber/topik | Tidak ada tindakan khusus; kualitas hasil bergantung metadata | — | Otomatis |
| **Panel Tanya Jawab** | Formulir saat sesi dibuka | Membuka/menutup sesi per program per tanggal; menyaring pertanyaan | Sesi On-Air & Pertanyaan | Setiap siaran interaktif |
| **Tentang WBS** | Profil, visi, sejarah, tim | Menyunting halaman statis | Halaman Statis | Sesuai kebutuhan |
| **Kontak & media sosial** | Alamat, surel, tautan sosial | Mengubah data kontak dan tautan | Pengaturan Situs | Sesuai kebutuhan |
| **Kebijakan Privasi** | Teks kebijakan | Menyunting halaman statis | Halaman Statis | Bila kebijakan berubah |
| **Pemutar radio** | Audio + nama program | Tidak ada tombol putar di panel; alamat Icecast diatur sekali; status sambungan terlihat di dasbor | Pengaturan Situs (`D-8`, `PR-47`) | Sekali saat pemasangan |

**Batas yang perlu dipahami pustakawan:**
- Panel **tidak** bisa mengganti lagu atau mengatur playlist. Itu tugas penyiar di studio melalui **Jazler RadioStar 2** (`K-5`).
- Panel **tidak** menampilkan isi yang benar-benar diputar studio; status di website mengikuti **jam dan jadwal**.
- Bila siaran berubah mendadak, admin cukup mengubah jadwal tampil; perubahan langsung terlihat tanpa menunggu pengembang (`PR-20`).
- Perubahan pada episode atau jadwal **tidak langsung tayang** bila admin masih menyimpannya sebagai **Draf**; admin dapat melihat pratinjau sebelum menerbitkan (`PR-46`).
- Laporan kunjungan dan sebaran wilayah tersedia di panel **Laporan & Statistik**, bersumber dari **GA4** (`PR-49`, `M-14`).

---

## 7. Alur Utama

### A-1. Pendengar Mendengarkan Radio
1. Pendengar membuka beranda.
2. Blok paling atas (hero) menampilkan **"Sedang Mengudara: [nama program]"** beserta jam dan hari berlakunya.
3. Pendengar menekan tombol **Dengarkan Sekarang** → audio radio berjalan dan **pemutar melekat di bawah layar**.
4. Pemutar tetap berbunyi saat pendengar membuka Jadwal, Program & Siniar, Tentang, atau Kontak.
5. Di bawah hero terlihat jadwal program berikutnya hari itu.

### A-2. Pendengar Melihat Jadwal
1. Pendengar membuka **Jadwal Siaran**, baik dari menu utama maupun dari tautan "Jadwal 24 jam" di beranda.
2. Memilih tab **Hari Kerja**, **Sabtu**, atau **Minggu**.
3. Tabel 24 jam tampil; baris program yang sedang berlangsung ditandai **"Sekarang"**.
4. Pendengar dapat melihat program apa yang akan datang pada jam tertentu.
5. Bila audio sedang diputar, pemutar di bawah layar **tidak terputus** saat berpindah tab atau kembali ke beranda.

### A-3. Pendengar Mengajukan Pertanyaan
1. Saat program berlangsung dan pengelola sudah membuka sesi, muncul formulir.
2. Pendengar mengisi **Nama** dan **Pertanyaan**, lalu menekan **Kirim**. Kolom Nama wajib, tetapi boleh diisi nama samaran atau **"Anonim"**.
3. Muncul konfirmasi: *"Pertanyaan Anda sudah diterima. Terima kasih."*
4. Pertanyaan langsung masuk ke daftar di panel pengelola.
5. Setelah sesi ditutup, formulir berganti keterangan bahwa sesi telah berakhir.

### A-4. Admin/Penyiar Mengelola Pertanyaan
1. Petugas (memakai akun **Admin**) membuka panel **Pertanyaan Siaran**.
2. Melihat daftar pertanyaan terbaru, memilih yang relevan.
3. Menandai **Dibacakan**; menyembunyikan atau menghapus pertanyaan yang tidak pantas.
4. Saat sesi selesai, menekan **Tutup Sesi**. Superadmin juga dapat melakukan langkah yang sama.

### A-5. Pengelola Menambah Episode Video
1. Admin menempelkan tautan YouTube episode baru yang berstatus **Publik**.
2. Admin mengisi data episode (judul, durasi, tanggal, thumbnail); impor otomatis YouTube disiapkan pada tahap lanjutan (`PR-42`, prioritas `N`).
3. Admin melengkapi metadata wajib: seri, nomor episode, narasumber, moderator, topik.
4. Admin memilih status: **Draf**, **Tayang**, atau **Arsip Internal**.
5. Episode muncul di katalog publik setelah berstatus Tayang.

### A-6. Pengunjung Mencari Episode Lama
1. Pengunjung membuka **Program & Siniar** atau menekan ikon pencarian di header.
2. Mengetik kata kunci (judul, nama seri, narasumber, atau topik).
3. Hasil tampil sebagai kartu episode dan kartu seri yang dapat dibuka.
4. Pengunjung membuka salah satu episode.
5. Pemutar YouTube tampil, lengkap dengan penjelasan dan metadata.
6. Pengunjung dapat membagikan tautan episode tersebut.

### A-7. Pengunjung Berpindah Halaman Tanpa Memutus Audio
1. Pengunjung sudah menekan tombol putar dan siaran berjalan.
2. Pengunjung membuka halaman lain (Jadwal, Program & Siniar, Detail Episode, Tentang, Kontak).
3. **Pemutar tetap berada di bawah layar** dan audio berlanjut tanpa henti.
4. Nama program aktif dan tombol jeda tetap terlihat di pemutar.
5. Pendengar dapat menjeda atau melanjutkan dari halaman mana pun.

---

## 8. Kebutuhan Tingkat Tinggi

Kode prioritas: **W** = Wajib (tanpa ini website tidak layak rilis), **S** = Sebaiknya (sangat dianjurkan), **N** = Nanti (tahap lanjutan).

**Cakupan yang disetujui:** seluruh kebutuhan berlabel **`W` (Wajib)** dan **`S` (Sebaiknya)** **dibangun seluruhnya** pada tahap pengembangan website saat ini. Kebutuhan berlabel **`N` (Nanti)** ditunda ke tahap pengembangan lanjutan.

### 8.1 Siaran Radio & Jadwal Tetap

| No | Kebutuhan | Prioritas | Catatan |
|---|---|---|---|
| **PR-01** | Pemutar audio siaran radio yang **melekat di semua halaman** (bar bawah) | W | Aliran **Icecast** dari studio (`K-5`); URL menyusul (`D-8`); wajib berprotokol HTTPS atau melalui reverse proxy SSL agar tidak terblokir *mixed content* di GitHub Pages |
| **PR-02** | Penanda "Sedang Mengudara" berdasarkan jam & jadwal tetap | W | Tidak bergantung pada sinyal studio |
| **PR-03** | Halaman Jadwal 24 jam dengan tab Hari Kerja / Sabtu / Minggu | W | Sesuai tabel Bagian 2.3 |
| **PR-04** | Keterangan program berikutnya setelah program aktif | W | Tampil di hero beranda dan di pemutar |
| **PR-05** | Formulir pertanyaan hanya muncul saat sesi dibuka | W | Inti `K-3`; program dibatasi `M-19` |
| **PR-06** | Hero beranda menampilkan program aktif, jam, dan deskripsi singkat | W | Termasuk status "siaran belum/tidak aktif" |

### 8.2 Katalog Video & Siniar

| No | Kebutuhan | Prioritas | Catatan |
|---|---|---|---|
| **PR-07** | Halaman Program & Siniar: daftar seri dalam bentuk kartu dengan saringan kategori | W | 331 konten publik (video unik) harus bisa ditelusuri |
| **PR-08** | Halaman detail episode dengan metadata lengkap + pemutar YouTube | W | Termasuk tautan "tonton di YouTube" |
| **PR-09** | Halaman detail seri beserta daftar episode | W | Menjawab `P-2` |
| **PR-10** | Pencarian kata kunci episode & seri dari header | S | Bisa menyusul setelah katalog stabil |
| **PR-11** | Penanda "episode terkait" pada detail episode | N | Memperpanjang waktu kunjungan |

### 8.3 Halaman Umum

| No | Kebutuhan | Prioritas | Catatan |
|---|---|---|---|
| **PR-12** | Beranda menyatukan status siaran, pemutar, dan katalog pilihan | W | Radio dan katalog terlihat tanpa berpindah halaman |
| **PR-13** | Halaman Tentang WBS | W | Profil, visi, sejarah, tim |
| **PR-14** | Halaman Kontak & media sosial | W | Termasuk kanal pengaduan |
| **PR-15** | Halaman Kebijakan Privasi | W | Wajib karena mengumpulkan nama/pertanyaan dan memakai analitik kunjungan anonim (`PR-49`) |
| **PR-16** | Tautan berbagi (WhatsApp, salin tautan) | S | Membantu penyebaran |

### 8.4 Panel Pengelola

| No | Kebutuhan | Prioritas | Catatan |
|---|---|---|---|
| **PR-17** | Login dengan peran berbeda | W | Hanya dua peran: **Superadmin** & **Admin** |
| **PR-18** | Kelola Seri Video (tambah, ubah, urutkan) | W | Nama seri harus baku |
| **PR-19** | Kelola Episode secara manual (judul, tautan YouTube, metadata) | W | Metadata wajib divalidasi; impor otomatis menyusul (`PR-42`, `N`) |
| **PR-20** | Kelola Jadwal Tetap Radio (program, jam, hari berlaku) | W | Perubahan jadwal tanpa menyentuh kode |
| **PR-21** | Kelola Sesi On-Air (buka/tutup per program per tanggal) | W | Superadmin & Admin berwenang (`M-09`) |
| **PR-22** | Kelola Pertanyaan (lihat, pilih, tandai, sembunyikan, arsip) | W | Harus nyaman dipakai saat siaran |
| **PR-23** | Kelola halaman statis (Tentang, Kontak, Pengumuman) | S | Mengurangi ketergantungan pengembang |
| **PR-24** | Kelola pengguna & peran | S | Khusus **Superadmin** |
| **PR-25** | Statistik ringkas: jumlah episode, pertanyaan, kunjungan/tayangan, dan sebaran wilayah | S | Untuk laporan pimpinan (`M-14`, `PR-49`) |
| **PR-26** | Pengaturan situs (identitas, tautan sosial, URL audio, pengumuman) | S | Penting saat serah terima |

> **Batas kewenangan panel:** panel pengelola **tidak** mengatur pemutaran lagu, playlist, atau jadwal playout studio. Semua itu dijalankan melalui **Jazler RadioStar 2** di studio (`K-5`). Panel hanya mengatur **jadwal tampil**, katalog, dan pertanyaan pendengar.

### 8.5 Konten & Katalog

| No | Kebutuhan | Prioritas | Catatan |
|---|---|---|---|
| **PR-27** | Metadata wajib episode: judul baku, seri, nomor episode, tanggal, durasi, narasumber, moderator, topik, tautan, status | W | Detail di dokumen `02` |
| **PR-28** | Status konten: Draf / Tayang / Arsip Internal; video privat/unlisted/dihapus tidak diimpor | W | `M-04`, `M-16` |
| **PR-29** | Penomoran episode otomatis per seri | S | Mengakhiri inkonsistensi judul |
| **PR-30** | Pemeriksaan berkala ketersediaan tautan YouTube | S | Menjawab `P-6` |
| **PR-31** | Catatan riwayat perubahan pada data episode & jadwal | N | Penting saat banyak pengelola |

### 8.6 Kualitas (Non-Fungsional)

| No | Kebutuhan | Prioritas | Catatan |
|---|---|---|---|
| **PR-32** | Tampilan responsif (ponsel, tablet, desktop) mengikuti tabel perilaku pada 6.5 | W | Mayoritas pendengar memakai ponsel |
| **PR-33** | Waktu muat cepat meski pemutar berupa embed | W | Target ≤3 detik (`IK-6`); pemutar radio dimuat terpisah agar isi halaman tetap tampil |
| **PR-34** | Aksesibilitas dasar: kontras, teks alternatif, navigasi papan tunas | W | Layanan publik wajib ramah disabilitas |
| **PR-35** | Keamanan: koneksi terenkripsi, kata sandi ter-hash, pembatasan akses panel | W | Standar minimal |
| **PR-36** | Pencadangan data katalog & jadwal berkala | W | Menjawab `P-6` |
| **PR-37** | Antarmuka panel berbahasa Indonesia dan ramah non-teknis | W | Syarat serah terima (`IK-9`) |
| **PR-38** | Dapat berjalan pada peramban umum (Chrome, Edge, Firefox, Safari) | W | Uji lintas peramban |
| **PR-39** | Pemutar audio radio tetap andal saat koneksi tidak stabil | W | Perlu penanganan "memuat ulang" otomatis |

### 8.7 Integrasi

| No | Kebutuhan | Prioritas | Catatan |
|---|---|---|---|
| **PR-40** | Embed pemutar YouTube untuk katalog & acara khusus | W | Inti keputusan `K-2` |
| **PR-41** | Tautan ke Instagram, Facebook, X, WhatsApp Perpusnas | S | Disetujui ditampilkan (`M-11`) |
| **PR-42** | Impor metadata otomatis dari YouTube (opsional) | N | Mempercepat pengelolaan 331 video publik (dari 337 baris data) |
| **PR-43** | Notifikasi surel/WhatsApp saat ada pertanyaan baru | N | Berguna bila penyiar tidak memantau layar |
| **PR-49** | Integrasi **Google Analytics 4 (GA4)** untuk statistik kunjungan dan sebaran lokasi pengunjung (kota, provinsi, negara) berbasis **IP teranonimasi** | S | Mendukung laporan pimpinan (`M-14`); tidak menyimpan IP mentah di database aplikasi (`PR-15`, `R-6`) |

### 8.8 Desain Antarmuka & Pengalaman

| No | Kebutuhan | Prioritas | Catatan |
|---|---|---|---|
| **PR-44** | Pemutar radio **persisten** di semua halaman; audio tidak terputus saat berpindah halaman | W | Konsekuensi `K-6`; diuji pada ponsel dan desktop |
| **PR-45** | Admin dapat menandai **program/seri unggulan** yang tampil di blok "Jelajahi Program" beranda | S | Tanpa ini, urutan kartu mengikuti tanggal terbaru |
| **PR-46** | **Pratinjau sebelum terbit** untuk episode dan perubahan jadwal | S | Admin melihat tampilan publik sebelum menekan **Tayang** |
| **PR-47** | **Indikator status aliran Icecast** di panel admin (tersambung / terputus) | S | Membantu membedakan gangguan siaran dari gangguan website (`R-10`) |
| **PR-48** | Semua halaman publik dapat dicapai maksimal **2 klik** dari beranda | W | Diuji dengan peta navigasi 6.6 (`IK-10`) |

---

## 9. Batasan dan Asumsi

### 9.1 Batasan

| No | Batasan | Dampak pada Rancangan |
|---|---|---|
| **B-1** | Proyek dikerjakan dalam masa magang terbatas | Prioritas pada versi inti (radio + jadwal + katalog + pertanyaan) |
| **B-2** | Pustakawan pengelola memiliki kesibukan utama lain | Panel harus sederhana; pekerjaan rutin beberapa menit per konten |
| **B-3** | Website bukan kanal resmi sampai ada serah terima | Perlu label, pedoman, dan dokumen serah terima |
| **B-4** | Hak cipta dan izin tayang konten | Seluruh video berstatus **Publik** dinyatakan sudah berizin tampil (`M-05`); video privat/unlisted tidak diimpor (`M-04`) |
| **B-5** | Ketergantungan pada YouTube untuk katalog video | Data katalog wajib mandiri (`P-6`) |
| **B-6** | Hosting disepakati memakai layanan **GitHub Pages** pada **domain terpisah** dengan backend/database **Supabase** (`M-02`) | Situs statis di-deploy ke GitHub Pages; fungsi dinamis (autentikasi pengelola, data jadwal/katalog, sesi tanya jawab real-time) dikelola melalui BaaS Supabase tier gratis |
| **B-7** | Kebijakan pengadaan & keamanan TI Perpusnas | Perlu koordinasi sebelum domain terpisah dan akun hosting ditetapkan (lihat `D-3`, `D-4`) |
| **B-8** | Alamat aliran Icecast belum diterima | Teknologi sudah ditetapkan (`K-5`); pemutar baru aktif setelah `D-8` terpenuhi |
| **B-9** | Perubahan jadwal insidental di studio tidak otomatis terbaca sistem | Admin harus dapat menyesuaikan jadwal tanpa kode (`PR-20`) |

### 9.2 Asumsi

| No | Asumsi |
|---|---|
| **A-1** | Kanal YouTube WBS tetap aktif dan mengizinkan penyematan (embed) |
| **A-2** | Pustakawan bersedia mengisi metadata episode secara rutin |
| **A-3** | Ada minimal satu orang yang bertanggung jawab membuka & menutup sesi On-Air |
| **A-4** | Website diakses melalui **domain terpisah** (bukan subdomain Perpusnas) yang di-*deploy* ke **GitHub Pages** dengan backend/database **Supabase** (`M-02`) |
| **A-5** | Tidak ada kebutuhan menyimpan rekaman audio di server sendiri |
| **A-6** | Data 507 konten hasil ekspor dapat dipakai sebagai bahan migrasi awal; hanya **337 baris data publik (331 video unik)** yang diimpor (`M-04`) |
| **A-7** | Jadwal 24 jam pada Bagian 2.3 sudah final; label merupakan nama payung program dan hanya berubah melalui panel pengelola oleh Superadmin/Admin (`M-18`, `PR-20`) |
| **A-8** | Akan tersedia alamat aliran **Icecast** (host, port, kanal) yang stabil untuk diputar di website |

---

## 10. Risiko dan Mitigasi

| No | Risiko | Kemungkinan | Dampak | Mitigasi |
|---|---|---|---|---|
| **R-1** | Video di YouTube dihapus/diprivat sehingga pemutar kosong | Sedang (sudah terjadi 11 kali) | Tinggi | Simpan metadata lengkap; periksa tautan berkala; tampilkan pesan sopan "video tidak tersedia" |
| **R-2** | Perubahan kebijakan YouTube memengaruhi embed | Rendah–Sedang | Tinggi | Halaman detail tetap informatif walau pemutar gagal |
| **R-3** | Kuota/akun API YouTube bermasalah | Sedang | Sedang | Impor otomatis bersifat opsional; sediakan input manual |
| **R-4** | Pengelola tidak sempat memperbarui konten | Tinggi | Tinggi | Alur singkat (≤5 menit/episode), pelatihan, panduan tertulis |
| **R-5** | Pertanyaan masuk tidak pantas/spam | Sedang | Sedang | Pertanyaan langsung masuk panel (`M-07`); tombol sembunyikan/hapus; batas pengiriman; kebijakan privasi |
| **R-6** | Data pribadi (nama & pertanyaan) disalahgunakan | Rendah | Tinggi | Nama boleh **anonim** (`M-06`); kumpulkan seperlunya; arsip tanya jawab dapat dihapus kapan saja oleh Admin/Superadmin (`M-08`); analitik hanya menyimpan data agregat/anonim, tanpa IP mentah (`PR-49`) |
| **R-7** | Proyek bergantung pada satu orang | Tinggi | Tinggi | Dokumentasi lengkap, serah terima, pelatihan |
| **R-8** | Metadata kembali tidak konsisten | Tinggi | Sedang | Validasi isian wajib + daftar seri baku terkunci |
| **R-9** | Ekspektasi berlebihan dari pemangku kepentingan | Sedang | Sedang | Seluruh poin `M` dan non-goals sudah disepakati (Bagian 13, Bagian 5) |
| **R-10** | Aliran **Icecast** terputus, tidak tersedia, atau diblokir peramban karena *mixed content* (HTTP di situs HTTPS) | Sedang | Tinggi | Uji koneksi berkala; pastikan URL stream mendukung HTTPS/SSL atau disiapkan reverse proxy HTTPS; pesan "siaran sedang gangguan"; sediakan tautan alternatif |
| **R-11** | Studio menyimpang dari jadwal (mis. Jazler memutar materi lain) tetapi data website belum diperbarui | Sedang | Sedang | Admin dapat mengubah jadwal cepat; perubahan dicatat pada riwayat otomatis yang menyusul (`PR-31`, `N`); penanda berbasis jam, bukan playout |
| **R-12** | Perbedaan zona waktu pengunjung di luar WIB | Rendah | Rendah | Semua jam ditampilkan berlabel **WIB** |
| **R-13** | Kekhawatiran privasi atas pelacakan pengunjung | Rendah | Sedang | **GA4** hanya dipakai untuk statistik agregat (kunjungan & sebaran kota/provinsi/negara) dengan **IP teranonimasi**; IP mentah tidak disimpan di database aplikasi (`PR-49`, `PR-15`) |

---

## 11. Ketergantungan dan Prasyarat

| No | Prasyarat | Dibutuhkan Untuk | Pemilik |
|---|---|---|---|
| **D-1** | Akses/izin mengelola kanal YouTube WBS | Impor & penautan konten | Pengelola kanal |
| **D-2** | Persetujuan penggunaan identitas visual Perpusnas | Desain & branding | PUJASINTARA / Humas |
| **D-3** | Penetapan **domain terpisah** dan konfigurasi DNS-nya (`M-02`) | Peluncuran | Tim TI / PUJASINTARA |
| **D-4** | Penyediaan repositori & *deployment* di **GitHub Pages** serta proyek database **Supabase** (tier gratis), terhubung ke domain terpisah (`M-02`) | Peluncuran | Tim TI / pengembang |
| **D-5** | Penunjukan akun **Superadmin** dan **Admin** beserta penanggung jawab konten & jadwal (`M-15`) | Operasional harian | PUJASINTARA |
| **D-6** | **Taksonomi seri video** hasil pengelompokan otomatis AI atas `metadata_youtube.csv` (nama seri baku, kategori, dan penampung "Lainnya"), ditetapkan pada dokumen `02` | Migrasi & taksonomi katalog | Pustakawan — **selesai pada dokumen `02` versi 1.1** (`M-03`) |
| **D-7** | Kebijakan privasi (termasuk analitik **GA4** dan arsip pertanyaan) serta pernyataan izin tayang video Publik | Kepatuhan | PUJASINTARA / Hukum |
| **D-8** | Alamat aliran **Icecast** (host, port, mount/kanal) yang mendukung HTTPS/SSL atau reverse proxy SSL | Pemutar radio | Pengelola studio / TI |
| **D-9** | Salinan jadwal 24 jam final (Weekday, Sabtu, Minggu) sebagai acuan data | Halaman Jadwal | Pustakawan — **selesai, tercantum di Bagian 2.3** |
| **D-10** | Kontak teknis studio untuk konfirmasi alamat Icecast dan koordinasi gangguan siaran | Operasional & pengujian pemutar | Pengelola studio / PUJASINTARA |

---

## 12. Peta Jalan Bertahap

Seluruh kebutuhan berlabel **`W` (Wajib)** dan **`S` (Sebaiknya)** dibangun pada tahap pengembangan website saat ini (Tahap 1–3). Kebutuhan berlabel **`N` (Nanti)** dikerjakan pada tahap pengembangan lanjutan.

| Tahap | Fokus | Keluaran | Gerbang |
|---|---|---|---|
| **Tahap 0** | Dokumentasi & penetapan | Dokumen `01` final v2.2; dokumen `02` final v1.2; dokumen `03` final v1.2; dokumen `04` final v1.1 | ACC pustakawan |
| **Tahap 1** | Versi inti (seluruh `W`) | Pemutar **Icecast** + Jadwal 24 jam + Penanda Mengudara + katalog 337 baris data publik (331 video unik) + detail episode + pertanyaan On-Air + panel admin + halaman statis + kebijakan privasi | Uji coba internal |
| **Tahap 2** | Pemenuhan seluruh `S` | Pencarian, statistik & **GA4**, sebaran wilayah, pratinjau sebelum terbit, kelola pengguna & peran, acara mendatang, kanal sosial, penomoran episode, pemeriksaan tautan, indikator Icecast, episode unggulan, pratinjau halaman statis | UAT pustakawan |
| **Tahap 3** | Penyempurnaan & peluncuran | Uji aksesibilitas dan lintas peramban, peluncuran pada **domain terpisah** di GitHub Pages + Supabase | Peluncuran resmi |
| **Tahap 4** | Serah terima | Panduan pengelolaan, pelatihan, dokumen serah terima | Pengelolaan mandiri |
| **Tahap 5** | Pengembangan lanjutan (`N`) | Episode terkait, riwayat perubahan, impor otomatis YouTube, notifikasi pertanyaan baru, transkrip bertahap | Sesuai kebutuhan & sumber daya |

*(Waktu pasti menyesuaikan ketersediaan sumber daya; urutan tahap tidak mengubah cakupan `W` + `S`.)*

---

## 13. Rekapitulasi Keputusan Final

Seluruh keputusan musyawarah **`M-01` sampai `M-19` sudah ditetapkan** dan tercermin pada bagian terkait di dokumen ini. Tabel berikut menjadi rujukan tunggal bila terjadi perbedaan tafsir.

| No | Status | Topik | Keputusan Final | Dampak pada Dokumen |
|---|---|---|---|---|
| **M-01** | ✅ Selesai | Nama situs | **"Radio & Siniar WBS Perpusnas"** | Judul dokumen, metadata, Beranda, footer |
| **M-02** | ✅ Selesai | Alamat domain & hosting | **Domain terpisah**, di-*deploy* ke **GitHub Pages** dengan backend/database **Supabase** (tier gratis: Auth, PostgreSQL, Realtime, Storage) | `B-6`, `A-4`, `D-3`, `D-4`, Tahap 3 |
| **M-03** | ✅ Selesai | Kategorisasi seri video | AI **mengelompokkan sendiri** seri video dari `metadata_youtube.csv`: variasi judul yang mirip dibakukan menjadi satu nama seri, judul berdiri sendiri/sedikit masuk **"Lainnya"**. Hasilnya disusun pada dokumen `02` | Bagian 2.2, 2.4, 6.2, `D-6`, Lampiran B |
| **M-04** | ✅ Selesai | Konten privat/unlisted | **Hanya video berstatus Publik yang masuk website: 337 baris data, 331 video unik**; privat, *unlisted*, dan yang dihapus **tidak diimpor** | Bagian 2.4, 2.5, 3, 6.2, `PR-28`, `A-6` |
| **M-05** | ✅ Selesai | Izin tayang konten | **(b) Tayang semua** untuk video berstatus Publik — dianggap sudah berizin tampil | `B-4`, `D-7` |
| **M-06** | ✅ Selesai | Identitas pengaju pertanyaan | **(b) Boleh anonim** — kolom Nama wajib diisi, tetapi boleh nama samaran atau **"Anonim"** | Bagian 6.4, `K-3`, `A-3`, `R-6` |
| **M-07** | ✅ Selesai | Moderasi pertanyaan | **(a) Langsung masuk panel**, tanpa pra-moderasi; petugas menyembunyikan atau menghapus pertanyaan yang tidak pantas | Bagian 6.4, `A-4`, `R-5` |
| **M-08** | ✅ Selesai | Penyimpanan data pertanyaan | **(c) Disimpan sebagai arsip tanya jawab** di panel, dapat dihapus sewaktu-waktu oleh Admin/Superadmin | Bagian 6.4, 6.9, `PR-15`, `PR-22`, `R-6` |
| **M-09** | ✅ Selesai | Kewenangan buka/tutup sesi | **(c) Keduanya** — Superadmin maupun Admin berwenang membuka dan menutup sesi | Bagian 4.2, 6.4, `PR-21`, `PR-17` |
| **M-10** | ✅ Selesai | Acara insidental/live YouTube | Cukup **pengumuman/daftar "Acara Mendatang"**, tanpa kalender acara penuh | Bagian 6.5, 6.7, 6.9, `K-6`, `PR-23` |
| **M-11** | ✅ Selesai | Kanal interaksi alternatif | **(a) Tampilkan** tautan WhatsApp, Instagram, dan media sosial resmi aktif | Bagian 6.9, `PR-41` |
| **M-12** | ✅ Selesai | Bahasa situs | **(a) Bahasa Indonesia saja** untuk tahap ini | Bagian 5, 6.5 |
| **M-13** | ✅ Selesai | Transkrip otomatis | **(a) Nanti; belum urgent** — masuk tahap pengembangan lanjutan | Bagian 5 (`NG-7`), Tahap 5 |
| **M-14** | ✅ Selesai | Laporan untuk pimpinan | **(c) Keduanya** — statistik kunjungan/tayangan & sebaran wilayah via **GA4**, serta jumlah episode & pertanyaan | `PR-25`, `PR-49`, Bagian 6.9 |
| **M-15** | ✅ Selesai | Pembaruan konten & jadwal | **Semua Admin (dan Superadmin)** dapat memperbarui konten maupun jadwal langsung dari panel | Bagian 4.2, `K-4`, `D-5` |
| **M-16** | ✅ Selesai | Kriteria arsip internal | **(c) Keduanya** — uji siaran/klip sangat pendek dan konten internal kepegawaian tidak tampil di katalog publik | Bagian 6.2, `PR-28` |
| **M-17** | ✅ Selesai | Sumber audio siaran | **(a) Aliran Icecast**; playout studio di **Jazler RadioStar 2** | `K-5`, `PR-01`, `D-8` |
| **M-18** | ✅ Selesai | Jadwal 24 jam | **Final**, tetapi dapat diubah sewaktu-waktu oleh Admin/Superadmin melalui panel | Bagian 2.3, `PR-20`, `A-7` |
| **M-19** | ✅ Selesai | Program yang membuka sesi tanya jawab | **(a) Hanya program interaktif** (*Indonesia Pagi Ini*, *Pesona Nusantara*, *Ruang Literasi*), dengan opsi **(c)** untuk acara khusus | Bagian 2.3, 6.4, `K-3`, `PR-05` |

---

## 14. Daftar Istilah

| Istilah | Arti Sederhana |
|---|---|
| **Siaran Radio** | Suara yang mengudara terus-menerus dan didengarkan bersamaan oleh pendengar |
| **Jadwal Tetap** | Susunan program per jam yang berulang setiap hari |
| **Siklus Harian** | Satu putaran jadwal dari pukul 06.00 sampai 05.59 keesokan hari |
| **Acara Insidental** | Acara yang tidak berjadwal rutin, muncul sesuai kegiatan |
| **Aliran Audio (Stream)** | Pengiriman suara lewat internet secara terus-menerus |
| **Icecast** | Perangkat lunak/server yang menyalurkan aliran audio radio ke pendengar lewat internet |
| **Jazler RadioStar 2** | Perangkat lunak studio yang digunakan untuk mengatur playlist/playout siaran radio WBS |
| **Playout** | Proses pemutaran materi siaran (musik, rekaman, jingle) sesuai urutan yang diatur di studio |
| **On-Air / Sedang Mengudara** | Program yang sedang berlangsung pada jam tersebut |
| **Siniar (Podcast)** | Rekaman program yang bisa didengarkan kapan saja |
| **On-Demand** | Konten yang diputar sesuai permintaan, tidak terikat jadwal |
| **Seri / Program** | Kelompok konten dengan nama dan format tetap, misalnya "LibTalk" |
| **Ruang Literasi** | Salah satu program radio interaktif pada jadwal WBS yang membuka sesi tanya jawab; ditulis penuh, tanpa singkatan |
| **Episode** | Satu bagian dari sebuah seri |
| **Katalog** | Daftar episode yang tersusun dan dapat dicari |
| **Metadata** | Keterangan tentang sebuah konten: judul, tanggal, narasumber, durasi, topik |
| **Embed** | Menampilkan pemutar YouTube di dalam halaman website tanpa menyimpan filenya |
| **Panel Admin** | Halaman khusus pengelola untuk mengatur isi website |
| **Pemutar Persisten** | Pemutar radio yang tetap berada di bagian bawah layar dan tidak berhenti saat pengunjung berpindah halaman |
| **Hero** | Blok paling atas pada beranda yang menampilkan status siaran dan tombol putar |
| **Wireframe (Blueprint)** | Sketsa susunan blok halaman, dibuat dengan teks, sebelum bentuk visual final |
| **Kartu (Card)** | Kotak berisi gambar dan keterangan singkat untuk satu seri atau episode |
| **Navigasi Utama** | Deretan menu pokok di header: Beranda, Jadwal Siaran, Program & Siniar, Tentang WBS, Kontak |
| **Pencarian Global** | Kolom pencarian di header yang mencari judul episode, nama seri, narasumber, dan topik |
| **Remah Navigasi (Breadcrumb)** | Jejak letak halaman, misalnya *Beranda / Program / Nama Seri / Judul Episode* |
| **Pratinjau** | Tampilan sementara yang dilihat admin sebelum konten diterbitkan ke publik |
| **Peran (Role)** | Tingkat kewenangan pengguna; hanya ada dua: **Superadmin** dan **Admin** |
| **Sesi On-Air** | Masa ketika kolom pertanyaan dibuka untuk satu program; dapat dibuka/ditutup Superadmin maupun Admin |
| **Anonim** | Isian nama samaran yang diperbolehkan pada formulir pertanyaan; kolom Nama tetap wajib diisi |
| **Acara Mendatang** | Daftar ringkas acara khusus/live YouTube terdekat; bukan kalender acara penuh |
| **GA4 (Google Analytics 4)** | Layanan analitik untuk melihat jumlah kunjungan dan sebaran lokasi pengunjung secara agregat/anonim |
| **Domain Terpisah** | Alamat website sendiri (bukan subdomain Perpusnas), di-*deploy* ke GitHub Pages dengan backend Supabase |
| **Supabase** | Layanan backend-as-a-service berbasis PostgreSQL sumber terbuka (tier gratis) yang menyediakan database, autentikasi pengelola, dan pembaruan tanya jawab seketika (realtime) tanpa biaya server |
| **WIB** | Waktu Indonesia Barat (UTC+7), zona waktu yang dipakai seluruh jadwal |
| **UAT** | Uji penerimaan oleh pengguna akhir, dilakukan pustakawan sebelum rilis |
| **Responsif** | Tampilan menyesuaikan ukuran layar ponsel, tablet, dan komputer |
| **Migrasi Data** | Proses memindahkan 337 baris data publik (331 video unik) ke katalog baru |

---

## 15. Riwayat Revisi

| Versi | Tanggal | Perubahan | Penyusun |
|---|---|---|---|
| 0.1 | 16 November 2026 | Draf awal berdasarkan analisis 5 paper referensi dan data 507 konten kanal YouTube WBS | Gusti Ahmad Muttahid Bilhaq |
| **0.2** | **16 November 2026** | Penyesuaian hasil penggalian fakta lapangan: (1) pemisahan tegas **Siaran Radio 24 jam (jadwal tetap)** vs **Katalog Video YouTube (insidental)**; (2) penambahan tabel jadwal resmi Weekday/Sabtu/Minggu; (3) koreksi asumsi jadwal yang sebelumnya diambil dari pola live YouTube; (4) revisi `M-10` dan penambahan `M-17`, `M-18`, `M-19`; (5) penambahan `K-4`, `PR-01`–`PR-06`, `IK-1`–`IK-3`, `R-10`–`R-12`, `D-8`, `D-9` | Gusti Ahmad Muttahid Bilhaq |
| **1.0** | **16 November 2026** | Finalisasi untuk musyawarah: (1) sumber audio ditetapkan **Icecast** (playout studio: **Jazler RadioStar 2**) dan ditambahkan **`K-5`**; (2) jadwal 24 jam difinalkan apa adanya; label sebagai nama payung program; transisi 05.00–05.59/06.00 dan penulisan nama program **Ruang Literasi** dibakukan; (3) `M-17` dan `M-18` ditutup; `M-03` difokuskan ke daftar seri video; (4) ditambahkan `D-10`, kolom **Status** pada Bagian 13, serta pembaruan glosarium, asumsi, risiko, dan batas kewenangan panel admin | Gusti Ahmad Muttahid Bilhaq |
| **1.1** | **17 November 2026** | Revisi desain berdasarkan acuan **UT Radio**: (1) ditambahkan **`K-6`** — adaptasi pola sederhana UT Radio dengan identitas visual tetap Perpusnas; (2) Bagian 6.5–6.9 ditulis ulang menjadi **Prinsip Desain & UX**, **Peta Situs Final**, **Blueprint Beranda**, **Blueprint Program & Detail Episode**, dan **Penyelarasan Pengunjung–Admin**; (3) halaman Radio terpisah dihapus, pemutar dibuat **persisten**; (4) alur A-1, A-2, A-6 diperbarui dan ditambahkan **A-7**; (5) ditambahkan `PR-44`–`PR-48`, `IK-10`, `NG-10`, dan istilah baru pada glosarium | Gusti Ahmad Muttahid Bilhaq |
| **2.0** | **17 November 2026** | **Final disepakati:** (1) seluruh keputusan `M-01`–`M-19` ditetapkan dan Bagian 13 menjadi rekapitulasi final; (2) nama situs **Radio & Siniar WBS Perpusnas**, **domain terpisah** dengan rencana awal hosting; (3) hanya **337 baris data publik (331 video unik)** yang diimpor, video privat/unlisted diabaikan; (4) peran pengelola disederhanakan menjadi **Superadmin** dan **Admin**; (5) pertanyaan boleh **anonim**, langsung masuk panel, disimpan sebagai arsip yang dapat dihapus; (6) blok **Acara Mendatang** ditambahkan tanpa kalender penuh; (7) penulisan nama program dibakukan menjadi **Ruang Literasi**; (8) ditambahkan **`PR-49` GA4** untuk statistik kunjungan & sebaran wilayah; (9) seluruh kebutuhan **`W` + `S`** disetujui dibangun | Gusti Ahmad Muttahid Bilhaq |
| **2.1** | **17 November 2026** | **Penyelarasan dokumen:** (1) angka katalog dibedakan menjadi **337 baris data publik** dan **331 video unik** pada ringkasan, masalah, tujuan, indikator, kebutuhan, asumsi, tahapan, dan glosarium; (2) ditambahkan catatan rekonsiliasi 6 baris berlebih pada Lampiran A.2; (3) Lampiran B diperbarui: `02` final v1.1, `03` data dan panel pengelola, dan `04` halaman pengunjung; (4) penutup dan langkah berikutnya disesuaikan | Gusti Ahmad Muttahid Bilhaq |
| **2.2** | **17 November 2026** | **Penetapan arsitektur deployment & pembersihan hasil audit:** (1) Hosting disepakati di **GitHub Pages** dengan backend/database **Supabase** tier gratis (`M-02`, `B-6`, `A-4`, `D-4`); (2) Catatan teknis antisipasi *mixed content* pemutar audio Icecast HTTPS (`PR-01`, `R-10`, `D-8`); (3) Penghapusan tautan buntu `[Lihat semua →]` pada blok Acara Mendatang di wireframe beranda; (4) Status dokumen `03` pada Lampiran B diselaraskan menjadi Final v1.1 | Gusti Ahmad Muttahid Bilhaq |

---

## Lampiran A — Data Pendukung (Ringkas)

**A.1 Jadwal Radio** — lihat tabel lengkap pada Bagian 2.3 (24 jam × 3 jenis hari).

**A.2 Data Katalog YouTube** *(menggambarkan arsip acara, bukan jadwal radio; sesuai `M-04`, hanya video Publik yang ditampilkan)*

| Ukuran | Nilai |
|---|---|
| Rentang konten | 2 Juli 2020 – 10 November 2026 |
| Total konten | 507 (435 live, 72 unggahan) |
| Status | **337 baris publik — ditampilkan di website** · 160 privat — tidak diimpor · 10 unlisted — tidak diimpor |
| Video unik di antara baris publik | **331** (6 baris berlebih dari 3 video yang tercatat berulang) |
| Median durasi | ±103 menit |
| Konten < 5 menit | 31 |
| Konten 1–3 jam | 317 |
| Konten > 3 jam | 50 |
| Total tayangan | ±325.900 |
| Median tayangan per konten | 265 |
| Total suka / komentar | 10.615 / 446 |
| Konten tanpa tag | 345 |
| Konten tanpa deskripsi | 21 |
| Judul bernomor episode | 116 |
| Konten hilang dari kanal | 11 |
| Hari unggah/live tersibuk | Rabu (125), Kamis (74), Selasa (64) |
| Waktu unggah tersibuk | Malam hari (bukan jadwal radio) |

*Sumber: `metadata_youtube.csv` (507 baris) dan berkas ekspor Takeout kanal YouTube WBS, diolah pada 16 November 2026.*

**A.3 Acuan Desain UT Radio** *(dasar `K-6`)*

| Unsur | Temuan pada UT Radio | Sikap WBS |
|---|---|---|
| Navigasi header | 3 menu (Beranda, Jadwal, Tentang Kami) + Login | Diadaptasi menjadi **5 menu tanpa login publik** |
| Pemutar | Bar bawah melekat, tombol putar/jeda, volume, pencarian jadwal | Diadaptasi + info **program aktif & berikutnya** |
| Beranda | Banner carousel, New Release, tab podcast, Trend Videos, parallax, Info Kampus, On Air Personalities | Diambil **pola kartu dan urutan**; carousel/parallax/blok promosi tidak dipakai |
| Jadwal | Filter fakultas & tahun, tabel 8 kolom, tambah ke kalender | Disederhanakan: **tab hari**, tabel jam–program, penanda "Sekarang" |
| Detail episode | Embed YouTube, metadata, tombol berbagi, rekomendasi | Diadaptasi; **tanpa** komentar, like, dan ringkasan AI |
| Footer | Kontak, WhatsApp, surel, Instagram, YouTube, alamat, kebijakan privasi | Diadaptasi; tautan mengikuti kanal resmi Perpusnas |
| Identitas visual | Logo dan warna UT | **Tidak dipakai**; identitas Perpusnas menunggu `D-2` |

*Catatan: yang diadopsi adalah pola tata letak dan alur, bukan aset, logo, warna, atau isi UT Radio.*

---

## Lampiran B — Peta Dokumen `/docs`

| No | Dokumen | Status |
|---|---|---|
| 01 | `01-prd.md` — Product Requirements Document | **Final v2.2 — Final Disepakati (seluruh keputusan pada Bagian 13)** |
| 02 | `02-peta-konten-dan-taksonomi.md` | **Final v1.2** — peta konten dan taksonomi 21 seri, 337 baris publik (331 video unik), dan keranjang "Lainnya" (`M-03`) |
| 03 | `03-rancangan-data-dan-panel.md` | **Final v1.2** — rancangan data, hak akses, dan antarmuka panel pengelola; memuat rekonsiliasi 337 baris menjadi 331 episode |
| 04 | `04-rancangan-halaman-pengunjung.md` | **Final v1.1** — rancangan halaman pengunjung: beranda, jadwal, program, detail seri, detail episode, pencarian, dan halaman statis; menunggu ACC pustakawan |
| 05 | `05-kebutuhan-fungsional-dan-prioritas.md` | **Final v1.0** — 53 kebutuhan fungsional (`FR-01` s.d. `FR-53`), prioritas MoSCoW, kriteria penerimaan, dan matriks ketertelusuran |
| 06 | `06-arsitektur-dan-kebutuhan-teknis.md` | **Final v1.0** — Arsitektur Jamstack GitHub Pages + Supabase BaaS, penanganan Icecast HTTPS, Facade YouTube, WebSockets, dan CI/CD |
| 07 | `07-model-data-dan-kamus-data.md` | **Final v1.0** — ERD, DDL 9 tabel PostgreSQL Supabase, kamus data, kebijakan RLS, dan seed data 21 seri & jadwal 24 jam |
| 08 | `08-rencana-migrasi-dan-operasional.md` | **Final v1.0** — Pipeline migrasi 331 video, 7 SOP operasional harian pustakawan, dan kurikulum pelatihan 2 jam |
| 09 | `09-rencana-pengujian-dan-evaluasi.md` | **Final v1.0** — Pengujian 53 FR, audio persistensi Icecast HTTPS, keamanan RLS, skenario UAT pustakawan, dan berita acara |
| 10 | `10-glosarium-dan-log-keputusan.md` | **Final v1.0** — Glosarium terpadu, log 34 keputusan (K-1 s.d. K-6, M-01 s.d. M-19, DR-01 s.d. DR-09), matriks induk, dan panduan pengembang penerus |

---

## Penutup

Dokumen ini **final (v2.2 — Final Disepakati)** dan menjadi acuan kerja penyusunan dokumen lanjutan serta pengembangan website. Seluruh 19 keputusan musyawarah (`M-01`–`M-19`) sudah ditetapkan dan dirangkum pada Bagian 13, sehingga tidak ada lagi poin yang menunggu pembahasan.

**Yang sudah ditetapkan dalam dokumen ini:**
- Identitas situs: **Radio & Siniar WBS Perpusnas**, dengan **domain terpisah** dan hosting **GitHub Pages** didukung database/backend **Supabase** (`M-01`, `M-02`).
- Dua entitas terpisah: **Siaran Radio 24 jam** (jadwal tetap) dan **Katalog Video & Siniar** YouTube yang bersifat insidental (`K-4`).
- Sumber audio radio: **Icecast** dari studio, playout diatur melalui **Jazler RadioStar 2**; website hanya pemutar (`K-5`, `M-17`). Aliran audio wajib mendukung HTTPS atau reverse proxy SSL agar tidak terblokir *mixed content*.
- **Jadwal 24 jam** (Hari Kerja/Sabtu/Minggu) final, dapat diubah melalui panel oleh Superadmin/Admin (`M-18`, `PR-20`).
- **Katalog hanya memuat data publik: 337 baris yang setelah duplikat digabung menjadi 331 video unik**; video privat, *unlisted*, dan yang dihapus tidak diimpor (`M-04`); taksonomi seri disusun otomatis pada dokumen `02` (`M-03`).
- **Dua peran akun**: **Superadmin** dan **Admin**, dengan kewenangan yang jelas pada Bagian 4.2 (`M-09`, `M-15`).
- **Alur pertanyaan On-Air**: hanya program interaktif dan acara khusus yang ditandai (`M-19`); nama boleh **anonim** (`M-06`); pertanyaan langsung masuk panel (`M-07`); tersimpan sebagai arsip yang dapat dihapus (`M-08`).
- **Arah desain**: mengadaptasi pola **UT Radio** yang sederhana dan bersih, **5 menu utama**, **pemutar persisten**, blok **Acara Mendatang** tanpa kalender penuh, dan identitas visual Perpusnas (`K-6`, `M-10`, `D-2`).
- **Cakupan pembangunan**: seluruh kebutuhan `W` dan `S` dibangun pada tahap ini; kebutuhan `N` ditunda ke Tahap 5 (Bagian 8, Bagian 12).
- **Laporan pimpinan**: statistik kunjungan/tayangan, sebaran wilayah via **GA4** dengan IP teranonimasi, serta jumlah episode & pertanyaan (`M-14`, `PR-49`).

**Langkah berikutnya:** dokumen `01`–`04` sudah lengkap dan sejalan. Pekerjaan berlanjut ke **pengisian 331 episode ke panel**, pembangunan halaman pengunjung sesuai dokumen `04`, lalu UAT panel dan UAT halaman pengunjung. Sebelum pemutar radio dan tampilan final diaktifkan, masih diperlukan **alamat aliran Icecast** (`D-8`, `D-10`), **domain & akun hosting** (`D-3`, `D-4`), dan **persetujuan identitas visual Perpusnas** (`D-2`).
