# Rancangan Data dan Antarmuka Panel Pengelola
## Website Radio & Siniar WBS Perpusnas

| Keterangan | Isi |
|---|---|
| **Nomor Dokumen** | 03 |
| **Nama Dokumen** | Rancangan Data dan Antarmuka Panel Pengelola |
| **Nama Situs** | Radio & Siniar WBS Perpusnas |
| **Versi** | 1.2 — Final |
| **Tanggal** | 17 November 2026 |
| **Status** | Final — menjadi acuan pembangunan panel pengelola dan pengisian data; diselaraskan dengan arsitektur GitHub Pages & Supabase |
| **Penyusun** | Gusti Ahmad Muttahid Bilhaq |
| **Pembaca Utama** | Pustakawan pengelola Layanan Radio dan Siniar WBS |
| **Acuan** | Dokumen `01` versi 2.2 dan dokumen `02` versi 1.1 |
| **Sifat Dokumen** | Final; perubahan susunan data atau hak akses dicatat pada riwayat revisi |

---

## 0. Cara Membaca Dokumen Ini

Dokumen ini menjelaskan **isi panel pengelola**: data apa yang disimpan, kolom apa yang diisi, aturan apa yang dijaga sistem, dan siapa yang boleh melakukan apa. Dokumen ini ditujukan untuk pustakawan, bukan untuk pengembang. Istilah teknis dipakai seperlunya dan dijelaskan di tempat pertama kali muncul.

Panel pengelola adalah ruang kerja di balik website. Semua yang dilihat pengunjung diatur dari sini, kecuali pemutaran lagu di studio. Panel **tidak** memiliki tombol putar, hentikan, atau ganti lagu. Wewenang itu tetap berada pada penyiar melalui Jazler RadioStar 2 (`K-5`).

| Bagian | Isi Singkat |
|---|---|
| 1 | Ringkasan dan prinsip panel |
| 2 | Dasar, rujukan, dan keputusan rancangan |
| 3 | Peran dan hak akses |
| 4 | Peta panel dan pola antarmuka |
| 5 | Rancangan data setiap entitas |
| 6 | Rincian sepuluh modul panel |
| 7 | Alur kerja rutin |
| 8 | Pesan galat dan teks bantuan |
| 9 | Pratinjau, penerbitan, dan pembatalan |
| 10 | Keamanan, privasi, dan pemeliharaan data |
| 11 | Rencana uji terima panel |
| 12 | Serah terima dan pelatihan |
| 13 | Penutup |

Tiga hal yang perlu dipahami lebih dahulu:

1. **Satu video adalah satu episode.** Data sumber berisi 337 baris, tetapi hanya ada 331 video unik. Enam baris berlebih berasal dari video yang sama dan dicatat lebih dari sekali. Panel menyimpan 331 episode, bukan 337. Rinciannya ada pada Bagian 5.4.
2. **Panel mengatur tampilan, bukan playout.** Perubahan jadwal di panel mengubah apa yang tertulis di website. Panel tidak dapat mengetahui atau mengubah apa yang benar-benar diputar studio.
3. **Setiap isian penting punya aturan.** Aturan ini mencegah data kembali tidak konsisten seperti kondisi awal kanal YouTube (`R-8`). Bila aturan dilanggar, sistem menolak menyimpan dan menampilkan pesan berbahasa Indonesia yang menjelaskan cara memperbaikinya.

> **Catatan penomoran dokumen.** Dokumen `03` ini membahas data dan panel pengelola. Dokumen `04` membahas halaman pengunjung. Peta dokumen pada Lampiran B dokumen `01` sudah disesuaikan dengan urutan ini: `03` untuk data dan panel pengelola, `04` untuk halaman pengunjung.

---

## 1. Ringkasan dan Prinsip Panel

### 1.1 Apa yang diatur panel

Panel mengatur sepuluh hal:

| No | Yang Diatur | Terlihat di Halaman Publik |
|---|---|---|
| 1 | Jadwal siaran 24 jam untuk Hari Kerja, Sabtu, dan Minggu | Beranda, Jadwal Siaran, pemutar |
| 2 | Nama, gambar, deskripsi, dan urutan seri | Beranda, Program & Siniar, detail seri |
| 3 | Judul, metadata, status, dan tautan setiap episode | Detail episode, pencarian, episode terbaru |
| 4 | Pembukaan dan penutupan sesi tanya jawab | Formulir pertanyaan di beranda dan Jadwal |
| 5 | Pertanyaan pendengar dan status tindak lanjutnya | Tidak tampil; hanya untuk penyiar |
| 6 | Acara khusus yang akan datang | Blok Acara Mendatang |
| 7 | Halaman Tentang WBS, Kontak, dan Kebijakan Privasi | Halaman statis dan footer |
| 8 | Akun pengelola dan perannya | Tidak tampil |
| 9 | Laporan kunjungan dan statistik | Tidak tampil |
| 10 | Identitas situs, kontak, media sosial, alamat audio, dan analitik | Header, footer, pemutar, halaman kontak |

### 1.2 Tujuh prinsip panel

| No | Prinsip | Konsekuensi pada Rancangan |
|---|---|---|
| **PP-1** | **Sederhana karena pengelola punya pekerjaan lain** (`B-2`) | Satu layar satu tugas; formulir episode dapat diselesaikan dalam lima menit; istilah sehari-hari |
| **PP-2** | **Berbahasa Indonesia dan ramah non-teknis** (`PR-37`) | Tidak ada kode, nama tabel, atau istilah pemrograman di layar; pesan galat memakai kalimat perintah |
| **PP-3** | **Tidak ada kejutan** | Aksi merusak meminta konfirmasi; perubahan yang memengaruhi nomor episode diperlihatkan lebih dahulu |
| **PP-4** | **Draf aman, terbit sadar** (`PR-46`) | Perubahan dapat disimpan sebagai draf dan dipratinjau sebelum tampil |
| **PP-5** | **Satu sumber kebenaran** | Nama program, jam, dan tautan tidak diketik ulang di beberapa tempat; data yang sama dipakai beranda, jadwal, dan pemutar |
| **PP-6** | **Jujur pada keterbatasan** | Bila narasumber belum diketahui, dipilih "Belum tercatat", bukan dikarang; bila Icecast terputus, panel mengatakannya |
| **PP-7** | **Aman secara bawaan** (`PR-35`) | Hak akses diperiksa di server; kata sandi disimpan ter-hash; unggahan dibatasi jenis dan ukurannya |

### 1.3 Yang tidak diatur panel

| Hal | Alasan | Tempat Pengaturan |
|---|---|---|
| Memutar, menjeda, atau mengganti lagu siaran | Panel bukan alat playout | Jazler RadioStar 2 di studio (`K-5`) |
| Urutan playlist, jingle, dan materi siaran | Wewenang penyiar | Jazler RadioStar 2 |
| Isi yang benar-benar terdengar di radio | Website hanya menerima aliran audio | Studio dan Icecast (`K-5`, `R-11`) |
| Komentar atau interaksi publik di halaman | Tidak termasuk lingkup (`NG-6`, `K-6`) | Tidak ada |
| Transkrip otomatis episode | Ditunda (`M-13`, `NG-7`) | Tahap 5 |
| Impor otomatis metadata YouTube | Ditunda (`PR-42`, `N`) | Tahap 5; saat ini input manual |
| Riwayat perubahan lengkap dengan perbandingan versi | Ditunda (`PR-31`, `N`) | Tahap 5; panel hanya mencatat "diubah oleh" dan waktunya |

---

## 2. Dasar, Rujukan, dan Keputusan Rancangan

### 2.1 Kebutuhan yang menjadi dasar

| Kebutuhan | Isi | Modul yang Terdampak |
|---|---|---|
| **PR-17** | Login dengan peran berbeda | Pengguna, seluruh panel |
| **PR-18** | Kelola seri video: tambah, ubah, urutkan | Seri |
| **PR-19** | Kelola episode secara manual | Episode |
| **PR-20** | Kelola jadwal tetap radio | Jadwal Tetap |
| **PR-21** | Kelola sesi On-Air per program per tanggal | Sesi On-Air |
| **PR-22** | Kelola pertanyaan: lihat, pilih, tandai, sembunyikan, arsip | Sesi On-Air dan Pertanyaan |
| **PR-23** | Kelola halaman statis dan pengumuman | Halaman Statis, Acara Mendatang |
| **PR-24** | Kelola pengguna dan peran | Pengguna |
| **PR-25** | Statistik ringkas | Laporan dan Statistik, Dasbor |
| **PR-26** | Pengaturan situs | Pengaturan Situs |
| **PR-27** | Metadata wajib episode | Episode |
| **PR-28** | Status Draf, Tayang, Arsip Internal | Episode |
| **PR-29** | Penomoran episode otomatis per seri | Episode |
| **PR-30** | Pemeriksaan berkala tautan YouTube | Episode |
| **PR-35** | Keamanan panel | Pengguna, seluruh panel |
| **PR-36** | Pencadangan data katalog dan jadwal | Pengaturan Situs |
| **PR-37** | Panel berbahasa Indonesia, ramah non-teknis | Seluruh panel |
| **PR-45** | Penanda seri unggulan | Seri |
| **PR-46** | Pratinjau sebelum terbit | Episode, Jadwal, Halaman, Acara |
| **PR-47** | Indikator status aliran Icecast | Dasbor, Pengaturan Situs |
| **PR-49** | Statistik kunjungan dan sebaran wilayah lewat GA4 | Laporan dan Statistik |

Keputusan musyawarah yang mengikat panel: `M-06` (nama pengirim boleh anonim), `M-07` (pertanyaan langsung masuk panel), `M-08` (arsip pertanyaan dapat dihapus), `M-09` (Superadmin dan Admin dapat membuka dan menutup sesi), `M-14` (laporan pimpinan), `M-15` (semua Admin dapat memperbarui konten dan jadwal), `M-16` (arsip internal tidak tampil), `M-18` (jadwal dapat diubah), dan `M-19` (hanya program interaktif dan acara khusus yang membuka sesi).

### 2.2 Keputusan rancangan dokumen ini

Sebagian hal tidak diatur langsung oleh dokumen `01`. Agar tidak menggantung saat pembangunan, dokumen ini menetapkan delapan keputusan rancangan berikut. Semua konsisten dengan keputusan `M-*` dan kebutuhan `PR-*` di atas.

| No | Keputusan | Alasan |
|---|---|---|
| **DR-01** | **Satu video adalah satu episode.** Enam baris ganda pada data sumber digabung; panel dan website memakai 331 episode | Video yang sama tidak boleh muncul dua kali di katalog; angka 337 tetap dipertahankan sebagai catatan migrasi |
| **DR-02** | **Metadata dilengkapi bertahap, tanpa mengarang.** Saat terbit, judul, seri, tanggal, durasi, tautan, dan topik wajib terisi. Narasumber dan moderator wajib dipilih; bila belum diketahui, dipilih **"Belum tercatat"** dan episode masuk daftar tugas kelengkapan | `PR-27` mewajibkan metadata, tetapi data sumber tidak memuat narasumber dan moderator secara lengkap. Mengarang nama berbahaya; mengosongkan kolom melanggar kebutuhan |
| **DR-03** | **Jadwal memakai draf dan terbit per jenis hari.** Perubahan disimpan sebagai draf, dipratinjau, lalu diterbitkan | `PR-46` meminta pratinjau perubahan jadwal; jadwal yang setengah jadi tidak boleh tampil ke publik |
| **DR-04** | **Sesi On-Air menutup sendiri saat program berakhir**, dengan masa tenggang 15 menit. Admin tetap dapat menutup lebih awal | Mencegah formulir pertanyaan tetap terbuka setelah acara selesai; mengurangi beban petugas (`B-2`) |
| **DR-05** | **Alamat halaman episode dikunci setelah terbit.** Judul boleh diperbaiki tanpa mengubah alamat. Perubahan alamat hanya oleh Superadmin dan dicatat | Alamat yang berubah memutus tautan yang sudah dibagikan; judul tetap dapat dirapikan |
| **DR-06** | **Laporan lengkap hanya untuk Superadmin.** Admin melihat ringkasan operasional di Dasbor | Bagian 4.2 dokumen `01` memberi laporan dan statistik kepada Superadmin; Admin memerlukan angka operasional, bukan laporan pimpinan |
| **DR-07** | **Identitas seri dipegang Superadmin.** Admin dapat mengubah deskripsi, gambar, urutan, dan penanda unggulan; menambah, mengganti nama, mengganti kategori, menggabungkan, atau menghapus seri hanya Superadmin | Selaras dengan aturan pemeliharaan taksonomi dokumen `02` Bagian 11.2 |
| **DR-08** | **Episode yang sudah terbit tidak dihapus permanen.** Episode bermasalah diubah menjadi Arsip Internal. Hapus permanen hanya untuk Draf, atau oleh Superadmin dengan konfirmasi ketik | Menjaga arsip katalog tetap utuh (`K-2`, `R-1`); kesalahan dapat diperbaiki tanpa kehilangan data |
| **DR-09** | **Penyimpanan data dan autentikasi berbasis Supabase.** Mengingat website di-hosting di GitHub Pages (situs statis), seluruh kebutuhan dinamis (autentikasi pengelola dengan Row Level Security/RLS, database PostgreSQL untuk jadwal/katalog/sesi, pembaruan pertanyaan real-time, dan penyimpanan berkas gambar) dikelola via Supabase tier gratis tanpa biaya server | Menjamin situs tetap ringan, gratis dirawat, dan memiliki keamanan data setara standar institusi tanpa memerlukan server backend mandiri (`M-02`, `PR-17`, `PR-35`) |

### 2.3 Istilah data yang dipakai

| Istilah | Arti di panel |
|---|---|
| **Entitas** | Jenis data yang punya daftar dan formulir sendiri, misalnya Seri atau Episode |
| **Field** | Satu kolom isian pada formulir |
| **Wajib** | Tidak boleh kosong saat menyimpan atau menerbitkan, sesuai keterangan pada tabel |
| **Draf** | Data tersimpan tetapi belum tampil ke publik |
| **Terbit** | Data sudah tampil ke publik |
| **Arsip Internal** | Data tersimpan, tidak tampil di katalog publik, tetapi masih dapat dicari petugas |
| **Slug atau alamat** | Bagian alamat halaman yang ditulis dengan huruf kecil dan tanda hubung, misalnya `/program/libtalk` |
| **Rekaman sumber** | Satu baris pada berkas `metadata_youtube.csv` |
| **Video unik** | Satu video YouTube dengan satu pengenal, meskipun tercatat pada beberapa baris |

---

## 3. Peran dan Hak Akses

### 3.1 Dua peran

| Peran | Siapa | Kewenangan Inti |
|---|---|---|
| **Superadmin** | Penyusun, Kepala Layanan Radio dan Siniar WBS, dan orang yang ditunjuk | Semua kewenangan Admin, ditambah akun pengguna, pengaturan situs, laporan lengkap, dan tindakan permanen |
| **Admin** | Pustakawan, penyiar, dan petugas layanan | Jadwal, seri, episode, sesi dan pertanyaan, acara, halaman statis, serta ringkasan operasional |

Tidak ada peran lain. Penyiar memakai akun Admin. Tidak ada akun publik dan tidak ada login untuk pengunjung.

### 3.2 Matriks hak akses

Keterangan: **Ya** berarti boleh; **Tidak** berarti tombol tidak tampil dan permintaan ditolak server; **Terbatas** berarti hanya pada data miliknya atau hanya sebagian aksi.

| Modul dan Aksi | Admin | Superadmin |
|---|---|---|
| **Dasbor** - melihat ringkasan | Ya | Ya |
| **Jadwal Tetap** - melihat, menyimpan draf, menerbitkan, menghapus baris | Ya | Ya |
| **Jadwal Tetap** - mengubah penanda program interaktif | Tidak | Ya |
| **Seri** - melihat daftar dan detail | Ya | Ya |
| **Seri** - mengubah deskripsi, gambar, teks alternatif, urutan, unggulan | Ya | Ya |
| **Seri** - menambah seri, mengganti nama, mengganti alamat, mengganti kategori, menggabungkan, menghapus | Tidak | Ya |
| **Episode** - melihat, menambah, mengubah, mempratinjau, menerbitkan, mengarsipkan | Ya | Ya |
| **Episode** - memindahkan episode antar-seri | Ya | Ya |
| **Episode** - menghapus permanen | Hanya Draf | Ya, dengan konfirmasi ketik |
| **Sesi On-Air** - membuka dan menutup sesi | Ya | Ya |
| **Pertanyaan** - melihat, menandai, menyembunyikan, menghapus, mengekspor | Ya | Ya |
| **Acara Mendatang** - menambah, mengubah, menerbitkan, menghapus | Ya | Ya |
| **Halaman Statis** - menyunting, mempratinjau, menerbitkan | Ya | Ya |
| **Pengguna dan Peran** - melihat, menambah, mengubah, menonaktifkan, mengatur ulang kata sandi | Tidak | Ya |
| **Laporan dan Statistik** - laporan lengkap dan ekspor | Tidak | Ya |
| **Pengaturan Situs** - identitas, kontak, sosial, audio, analitik, cadangan | Tidak | Ya |

### 3.3 Aturan pengaman peran

1. **Superadmin terakhir tidak dapat diturunkan atau dinonaktifkan.** Sistem menolak dengan pesan: "Sistem harus memiliki minimal satu Superadmin aktif."
2. **Pengguna tidak dapat menghapus akunnya sendiri.** Untuk berhenti, minta Superadmin lain menonaktifkan akun.
3. **Admin tidak dapat menaikkan perannya sendiri.** Hanya Superadmin yang dapat mengubah peran.
4. **Pemeriksaan hak akses dilakukan di server**, bukan hanya dengan menyembunyikan tombol. Mengetik alamat panel secara langsung tetap ditolak bila peran tidak sesuai (`PR-35`).
5. **Setiap data mencatat pembuat dan pengubah terakhir.** Nama dan waktu ditampilkan pada halaman detail. Ini bukan riwayat perubahan lengkap (`PR-31`, `N`), melainkan penanda tanggung jawab.
6. **Akun nonaktif tidak dapat masuk**, tetapi namanya tetap tersimpan pada data yang pernah dibuat.

---

## 4. Peta Panel dan Pola Antarmuka

### 4.1 Struktur navigasi panel

Panel memakai satu menu samping (sidebar) dengan sepuluh modul. Urutan berikut juga menjadi urutan pekerjaan harian.

| No | Menu | Isi | Peran |
|---|---|---|---|
| 1 | **Dasbor** | Status siaran, status Icecast, program aktif dan berikutnya, angka ringkas, tugas hari ini | Admin, Superadmin |
| 2 | **Jadwal Tetap** | Tiga jenis hari, draf dan terbit, pratinjau | Admin, Superadmin |
| 3 | **Seri** | 21 seri resmi dan keranjang Lainnya | Admin, Superadmin |
| 4 | **Episode** | 331 episode, status, penomoran otomatis, pemeriksaan tautan | Admin, Superadmin |
| 5 | **Sesi On-Air dan Pertanyaan** | Sesi hari ini, antrean pertanyaan, arsip | Admin, Superadmin |
| 6 | **Acara Mendatang** | Acara khusus dan live YouTube | Admin, Superadmin |
| 7 | **Halaman Statis** | Tentang WBS, Kontak, Kebijakan Privasi | Admin, Superadmin |
| 8 | **Laporan dan Statistik** | Kunjungan, sebaran wilayah, jumlah episode dan pertanyaan | Superadmin |
| 9 | **Pengguna** | Akun dan peran | Superadmin |
| 10 | **Pengaturan Situs** | Identitas, kontak, sosial, audio, analitik, cadangan | Superadmin |

Di bagian bawah sidebar terdapat nama pengguna, peran, tautan **Lihat situs**, dan tombol **Keluar**. Menu yang tidak boleh diakses tidak ditampilkan bagi peran tersebut.

### 4.2 Kerangka layar

```
[HEADER PANEL]
Logo | Nama modul | Pencarian | Lonceng pemberitahuan | Nama dan peran
------------------------------------------------------------------
[MENU SAMPING]        [ISI MODUL]
Dasbor                Judul halaman
Jadwal Tetap          Satu kalimat penjelasan
Seri                  [Aksi utama]  [Saringan]
Episode               ---------------------------------------
...                   Tabel atau formulir
                      ---------------------------------------
                      [Paginasi]
```

Aturan tata letak:

- Lebar isi maksimal 1.200 piksel pada desktop; satu kolom penuh pada ponsel.
- Aksi utama selalu di kanan atas daftar dan di bilah bawah formulir.
- Formulir panjang dibagi menjadi kelompok berjudul, bukan satu halaman tanpa jeda.
- Tombol **Simpan draf** selalu tersedia. Tombol **Terbitkan** hanya aktif bila syarat terbit terpenuhi, dengan keterangan syarat yang belum lengkap.
- Tabel dapat diurutkan pada kolom tanggal, judul, dan status. Pencarian menunggu 300 milidetik setelah berhenti mengetik.
- Halaman daftar memuat 20 baris; pilihan 20, 50, atau 100 baris per halaman.

### 4.3 Pola daftar, formulir, dan aksi

| Pola | Aturan |
|---|---|
| **Daftar kosong** | Tampilkan penjelasan singkat dan satu tombol aksi, bukan tabel kosong |
| **Saringan** | Saringan disimpan pada alamat halaman agar dapat dibagikan dan tidak hilang saat kembali |
| **Pilih semua** | Hanya memilih baris pada halaman yang sedang terlihat, dengan jumlah terpilih disebutkan |
| **Aksi massal** | Maksimal tiga aksi: Terbitkan, Arsipkan, Pindahkan seri. Setiap aksi menampilkan jumlah data dan akibatnya |
| **Formulir** | Label di atas kolom; teks bantuan di bawah kolom; tanda bintang untuk wajib; galat muncul di bawah kolom yang bermasalah |
| **Simpan** | Tombol nonaktif saat menyimpan, dengan tulisan "Menyimpan..."; tidak ada penyimpanan ganda |
| **Konfirmasi** | Aksi merusak menyebut nama data, akibat, dan tombol "Batal" lebih menonjol daripada tombol berbahaya |
| **Notifikasi** | Muncul di kanan atas, hilang setelah 5 detik, dan tetap tercatat di lonceng |
| **Status** | Selalu memakai teks, bukan hanya warna: Draf, Tayang, Arsip Internal, Terbuka, Tertutup |
| **Ponsel** | Tabel berubah menjadi kartu; aksi utama tetap terlihat; formulir satu kolom |

### 4.4 Dasbor sekilas

Dasbor adalah halaman pertama setelah masuk. Isinya:

| Blok | Isi | Sumber |
|---|---|---|
| **Sedang mengudara** | Nama program, jam, jenis hari, program berikutnya | Jadwal terbit |
| **Status Icecast** | Tersambung, terputus, atau tidak dapat diperiksa; waktu pemeriksaan terakhir; tombol Periksa lagi | `PR-47` |
| **Sesi hari ini** | Program interaktif hari ini, status sesi, jumlah pertanyaan baru, tombol Buka atau Tutup Sesi | Sesi On-Air |
| **Angka ringkas** | Episode Tayang, Draf, Arsip Internal, pertanyaan baru hari ini, acara terdekat | Episode, Pertanyaan, Acara |
| **Tugas kelengkapan** | Jumlah episode Tayang yang narasumber atau moderatornya "Belum tercatat" | Episode |
| **Tautan cepat** | Tambah episode, ubah jadwal, buka sesi, tulis pengumuman | Sesuai peran |

Dasbor **tidak** menampilkan grafik kunjungan. Angka kunjungan ada di Laporan dan Statistik agar Dasbor tetap ringan dan fokus pada siaran.

---

## 5. Rancangan Data

### 5.1 Gambaran entitas dan hubungan

Panel memiliki delapan entitas isi dan satu kelompok pengaturan.

| Entitas | Jumlah Awal | Relasi |
|---|---|---|
| **Pengguna** | Minimal 2 akun | Membuat dan mengubah data lain |
| **Seri** | 21 seri resmi + 1 keranjang Lainnya | Menampung banyak episode |
| **Episode** | 331 video unik | Berada pada tepat satu seri |
| **Jadwal** | 3 jenis hari, masing-masing 24 jam | Menentukan program aktif dan sesi yang boleh dibuka |
| **Sesi On-Air** | Dibuat per program per tanggal | Menampung banyak pertanyaan |
| **Pertanyaan** | Mengikuti sesi | Berada pada tepat satu sesi |
| **Acara Mendatang** | Mengikuti kegiatan | Dapat membuka sesi khusus |
| **Halaman Statis** | 3 halaman | Tidak berelasi ke entitas lain |
| **Pengaturan Situs** | Satu kumpulan | Dipakai seluruh halaman |

Aturan hubungan:

- Satu episode hanya berada pada satu seri. Memindahkan episode berarti mengubah seri, bukan menyalin.
- Satu sesi hanya untuk satu program pada satu tanggal. Tidak boleh ada dua sesi terbuka untuk program dan tanggal yang sama.
- Satu pertanyaan hanya milik satu sesi. Pertanyaan tidak dapat dipindahkan ke sesi lain.
- Menghapus seri tidak menghapus episode. Sistem menolak penghapusan selama seri masih memiliki episode.
- Menghapus sesi tidak disediakan. Sesi ditutup, lalu pertanyaannya dapat dihapus satu per satu atau seluruhnya.

### 5.2 Entitas Pengguna

| Field | Label di Panel | Tipe | Wajib | Aturan |
|---|---|---|---|---|
| `id` | - | Nomor otomatis | - | Tidak ditampilkan |
| `nama` | Nama lengkap | Teks pendek | Ya | 3-60 karakter; huruf, spasi, titik, koma, dan tanda hubung |
| `surel` | Surel | Surel | Ya | Harus unik; dipakai untuk masuk; maksimal 100 karakter |
| `peran` | Peran | Pilihan | Ya | Superadmin atau Admin |
| `status` | Status akun | Pilihan | Ya | Aktif atau Nonaktif; bawaan Aktif |
| `kata_sandi` | Kata sandi | Rahasia | Ya saat dibuat | Minimal 12 karakter; disimpan ter-hash; tidak pernah ditampilkan kembali |
| `terakhir_masuk` | Terakhir masuk | Waktu | - | Diisi otomatis; tidak dapat diubah |
| `dibuat_pada` | Dibuat | Waktu | - | Otomatis |
| `diubah_pada` | Diubah | Waktu | - | Otomatis |

Aturan tambahan:

- Surel tidak boleh sama meskipun beda huruf besar-kecil.
- Superadmin dapat mengatur ulang kata sandi. Sistem menampilkan kata sandi sementara satu kali dan meminta pengguna menggantinya saat masuk.
- Pengguna dapat mengganti kata sandinya sendiri dengan memasukkan kata sandi lama.
- Tidak ada pendaftaran mandiri. Akun hanya dibuat Superadmin.
- Akun yang pernah membuat data tidak dihapus, tetapi dinonaktifkan, agar catatan "dibuat oleh" tetap bermakna.

### 5.3 Entitas Seri

| Field | Label di Panel | Tipe | Wajib | Aturan |
|---|---|---|---|---|
| `id` | - | Nomor otomatis | - | Tidak ditampilkan |
| `nama` | Nama seri | Teks pendek | Ya | 2-80 karakter; unik; tidak boleh "Lainnya"; mengikuti nama baku dokumen `02` |
| `slug` | Alamat halaman | Teks pendek | Ya | Huruf kecil, angka, tanda hubung; unik; 2-60 karakter; dibuat otomatis dari nama |
| `kategori` | Kategori topik | Pilihan | Ya | Empat kategori dokumen `02`; untuk Lainnya bernilai "Semua kategori" |
| `jenis` | Jenis | Pilihan | Ya | Seri resmi, Seri gabungan, atau Keranjang; Lainnya terkunci sebagai Keranjang |
| `deskripsi` | Deskripsi | Teks panjang | Ya | 2-3 kalimat; 80-400 karakter; tampil di kartu dan detail seri |
| `gambar` | Gambar sampul | Berkas gambar | Tidak | JPG, PNG, atau WebP; 16:9; minimal 1.280 x 720; maksimal 2 MB |
| `teks_alternatif` | Teks alternatif gambar | Teks pendek | Ya bila ada gambar | 10-120 karakter; menjelaskan isi gambar untuk pembaca layar (`PR-34`) |
| `urutan` | Urutan tampil | Angka | Ya | 1-999; bawaan mengikuti abjad; dapat diubah dengan naik/turun |
| `unggulan` | Tampil di beranda | Sakelar | Ya | Bawaan Tidak; maksimal 6 seri berstatus Ya (`PR-45`) |
| `jumlah_tayang` | Jumlah episode tayang | Angka otomatis | - | Dihitung dari episode berstatus Tayang; tidak dapat diisi |
| `dibuat_oleh` | Dibuat oleh | Teks otomatis | - | Nama pengguna |
| `diubah_oleh` | Diubah oleh | Teks otomatis | - | Nama dan waktu pengubahan terakhir |

Aturan tambahan:

- **Lainnya** adalah data sistem. Nama, alamat `lainnya`, dan jenisnya tidak dapat diubah; tidak dapat dihapus; tidak dapat dijadikan unggulan; episodenya tidak diberi nomor.
- Nama seri harus persis mengikuti dokumen `02`. Perubahan nama hanya oleh Superadmin dan wajib disertai pembaruan dokumen `02`.
- Alamat halaman dibuat sekali. Setelah seri memiliki episode terbit, alamat tidak dapat diubah.
- Kategori hanya boleh salah satu dari empat kategori resmi. Memindahkan kategori seri berarti memindahkan seluruh episode di dalamnya; aksi ini hanya untuk Superadmin dan menampilkan jumlah episode yang terdampak.
- Seri tanpa episode Tayang tidak tampil di halaman publik, tetapi tetap terlihat di panel dengan penanda "Belum tampil".
- Menghapus seri hanya dapat dilakukan bila tidak memiliki episode dan bukan Lainnya.

### 5.4 Entitas Episode

| Field | Label di Panel | Tipe | Wajib | Aturan |
|---|---|---|---|---|
| `id` | - | Nomor otomatis | - | Tidak ditampilkan |
| `judul` | Judul episode | Teks pendek | Ya | 3-120 karakter; tanpa emoji; tanpa nama seri di awal; tanpa nomor episode |
| `slug` | Alamat halaman | Teks pendek | Ya | Dibuat otomatis; 3-80 karakter; unik dalam seri; terkunci setelah terbit |
| `seri` | Seri | Pilihan | Ya | Salah satu dari 21 seri atau Lainnya |
| `nomor` | Nomor episode | Angka otomatis | - | Dihitung sistem; tidak dapat diisi; kosong untuk Lainnya |
| `tanggal` | Tanggal tayang | Tanggal | Ya | Format hari-bulan-tahun; tidak boleh setelah hari ini untuk status Tayang |
| `durasi` | Durasi | Jam dan menit | Ya | 1 menit sampai 12 jam; disimpan sebagai total detik; ditampilkan "1 j 42 m" |
| `narasumber` | Narasumber | Teks pendek | Ya | 3-150 karakter; beberapa nama dipisah titik koma; boleh "Belum tercatat" |
| `moderator` | Moderator | Teks pendek | Ya | 3-150 karakter; beberapa nama dipisah titik koma; boleh "Belum tercatat" |
| `topik` | Topik | Kata kunci | Ya | 1-5 topik; tiap topik 3-30 karakter; dipakai pencarian |
| `kategori_topik` | Kategori topik | Pilihan | Hanya untuk Lainnya | Wajib saat seri Lainnya; untuk seri resmi mengikuti kategori seri dan tidak ditampilkan |
| `tautan` | Tautan YouTube | Tautan | Ya | Harus tautan video, bukan kanal atau playlist; harus unik |
| `video_id` | Pengenal video | Teks otomatis | - | Diambil dari tautan; 11 karakter; dasar pencegahan duplikat |
| `deskripsi` | Ringkasan episode | Teks panjang | Tidak | 2-4 paragraf pendek; maksimal 1.500 karakter; tidak wajib untuk terbit |
| `gambar` | Gambar episode | Berkas gambar | Tidak | Bila kosong, memakai gambar YouTube; bila diunggah, 16:9 dan maksimal 2 MB |
| `teks_alternatif` | Teks alternatif gambar | Teks pendek | Ya bila unggah gambar | 10-120 karakter |
| `status` | Status | Pilihan | Ya | Draf, Tayang, atau Arsip Internal; bawaan Draf |
| `alasan_arsip` | Alasan arsip internal | Teks pendek | Ya bila Arsip Internal | 10-200 karakter; tidak tampil ke publik |
| `jenis_sumber` | Jenis sumber | Pilihan | Ya | Siaran Langsung atau Unggahan Video; untuk laporan internal |
| `diperiksa_pada` | Tautan diperiksa | Waktu | - | Diisi saat pemeriksaan tautan (`PR-30`) |
| `status_tautan` | Status tautan | Pilihan otomatis | - | Baik, Tidak tersedia, atau Belum diperiksa |
| `dibuat_oleh` | Dibuat oleh | Teks otomatis | - | Nama pengguna |
| `diubah_oleh` | Diubah oleh | Teks otomatis | - | Nama dan waktu pengubahan terakhir |

**Syarat terbit.** Episode dapat berubah dari Draf menjadi Tayang bila: judul, seri, tanggal, durasi, tautan, topik, narasumber, dan moderator terisi; tautan valid dan belum dipakai episode lain; nomor berhasil dihitung; serta seri memiliki gambar sampul atau memakai gambar bawaan. Syarat yang belum lengkap ditampilkan sebagai daftar periksa, bukan satu pesan galat panjang.

**Kebijakan "Belum tercatat" (`DR-02`).** Pilihan ini disediakan untuk migrasi 331 episode lama yang narasumber atau moderatornya tidak tercatat pada data sumber. Nilai ini dihitung sebagai terisi, tetapi:

- muncul sebagai tugas pada Dasbor dan saringan "Metadata belum lengkap";
- tidak ditampilkan sebagai baris pada halaman publik;
- wajib diganti dengan nama sebenarnya paling lambat sebelum UAT pada akhir Tahap 2.

**Penomoran otomatis (`PR-29`).** Nomor hanya dihitung dari episode berstatus Tayang pada seri yang sama, urut tanggal tayang paling awal. Bila tanggalnya sama, urutan ditentukan judul secara alfabetis, lalu pengenal video. Nomor pada Draf dan Arsip Internal bersifat sementara dan tidak tampil ke publik. Saat sebuah episode diterbitkan, diarsipkan, dipindahkan, atau tanggalnya diubah, seluruh nomor pada seri itu dihitung ulang. Panel menampilkan pratinjau pergeseran nomor sebelum menyimpan.

**Rekonsiliasi 337 baris menjadi 331 episode (`DR-01`).**

| Ukuran | Dokumen `02` (baris sumber) | Panel dan website (video unik) |
|---|---|---|
| Episode total | 337 | **331** |
| Episode dalam 21 seri resmi | 255 | **249** |
| Keranjang Lainnya | 82 | 82 |
| Kategori Layanan | 176 | **173** |
| Kategori Naskah | 85 | **82** |
| Kategori Literasi | 53 | 53 |
| Kategori Sejarah | 23 | 23 |
| DP on Podcast | 4 | **1** |
| Diskusi Naskah Nusantara | 28 | **25** |

Enam baris berlebih berasal dari tiga video: satu video DP on Podcast tercatat empat kali, satu video Diskusi Naskah Nusantara tercatat dua kali, dan satu video Diskusi Naskah Nusantara lain tercatat tiga kali. Panel menyimpan satu episode untuk masing-masing video. Karena itu halaman publik menampilkan **1 episode** untuk DP on Podcast dan **25 episode** untuk Diskusi Naskah Nusantara. Dokumen `02` versi 1.1 sudah menyelaraskan angka ini: **337 baris** tetap dicatat sebagai data sumber, sedangkan **331 video unik** menjadi angka yang dipakai panel dan website.

**Alamat halaman episode.** Alamat dibuat dari judul, misalnya `/program/libtalk/pustakawan-tanpa-batas`. Bila judul yang sama sudah ada dalam seri, sistem menambahkan angka di belakang: `-2`, `-3`. Alamat dikunci setelah terbit (`DR-05`). Mengubah judul tidak mengubah alamat; perubahan alamat hanya oleh Superadmin dan ditampilkan peringatan bahwa tautan lama tidak otomatis dialihkan.

**Pemeriksaan tautan (`PR-30`).** Panel memeriksa tautan secara berkala, sedikitnya sekali sebulan. Hasilnya hanya tiga: Baik, Tidak tersedia, atau Belum diperiksa. Episode dengan tautan tidak tersedia tetap tampil, tetapi pemutar diganti pesan sopan dan tautan ke YouTube (`R-1`).

### 5.5 Entitas Jadwal

| Field | Label di Panel | Tipe | Wajib | Aturan |
|---|---|---|---|---|
| `id` | - | Nomor otomatis | - | Tidak ditampilkan |
| `jenis_hari` | Jenis hari | Pilihan | Ya | Hari Kerja, Sabtu, atau Minggu |
| `jam_mulai` | Jam mulai | Jam | Ya | Format 24 jam WIB, kelipatan 15 menit |
| `jam_selesai` | Jam selesai | Jam | Ya | Harus setelah jam mulai; slot terakhir boleh 05.59 |
| `program` | Nama program | Teks pendek | Ya | 2-60 karakter; nama payung, bukan daftar lagu |
| `deskripsi` | Deskripsi singkat | Teks pendek | Tidak | Maksimal 160 karakter; tampil di hero dan detail jadwal |
| `interaktif` | Membuka sesi tanya jawab | Sakelar | Ya | Bawaan Tidak; hanya Superadmin dapat mengubah |
| `versi` | Versi | Pilihan otomatis | - | Draf atau Terbit; dikelola sistem |
| `diubah_oleh` | Diubah oleh | Teks otomatis | - | Nama dan waktu |

Aturan tambahan:

- Setiap jenis hari memiliki satu set jadwal sendiri. Sabtu dan Minggu identik pada data awal, tetapi disimpan terpisah agar dapat diubah sendiri.
- Satu jenis hari harus menutup siklus **06.00 sampai 05.59** tanpa celah dan tanpa tumpang tindih pada versi terbit.
- Draf boleh belum lengkap. Tombol **Terbitkan** baru aktif setelah pemeriksaan celah dan tumpang tindih lolos.
- Program interaktif awal: **Indonesia Pagi Ini**, **Pesona Nusantara**, dan **Ruang Literasi** (`M-19`). Penanda ini hanya menentukan program yang boleh membuka sesi; isi siaran tetap wewenang studio. Karena mengubah keputusan `M-19`, penanda ini hanya dapat diubah Superadmin; Admin tetap dapat mengubah jam dan nama program.
- Nama program ditulis penuh. "Ruang Literasi" tidak disingkat.
- Menghapus baris jadwal yang dipakai sesi hari ini ditolak sampai sesi ditutup.
- Perubahan yang diterbitkan langsung dipakai beranda, halaman Jadwal, dan penanda "Sedang Mengudara" pada pemuatan halaman berikutnya.

### 5.6 Entitas Sesi On-Air

| Field | Label di Panel | Tipe | Wajib | Aturan |
|---|---|---|---|---|
| `id` | - | Nomor otomatis | - | Tidak ditampilkan |
| `tanggal` | Tanggal | Tanggal | Ya | Hanya hari ini atau hari yang akan datang; maksimal 30 hari ke depan |
| `program` | Program | Pilihan | Ya | Diambil dari jadwal yang bertanda interaktif, atau acara khusus yang bertanda membuka sesi |
| `jam_mulai` | Jam mulai | Jam otomatis | - | Mengikuti jadwal atau acara |
| `jam_selesai` | Jam selesai | Jam otomatis | - | Mengikuti jadwal atau acara |
| `status` | Status sesi | Pilihan | Ya | Terbuka atau Tertutup |
| `dibuka_oleh` | Dibuka oleh | Teks otomatis | - | Nama dan waktu |
| `ditutup_oleh` | Ditutup oleh | Teks otomatis | - | Nama dan waktu |
| `jumlah_pertanyaan` | Jumlah pertanyaan | Angka otomatis | - | Dihitung dari pertanyaan yang tidak dihapus |
| `catatan` | Catatan internal | Teks pendek | Tidak | Maksimal 200 karakter; tidak tampil ke publik |

Aturan tambahan:

- Hanya satu sesi terbuka untuk satu program pada satu tanggal.
- Sesi hanya dapat dibuka untuk program bertanda interaktif atau acara khusus bertanda membuka sesi (`M-19`).
- **Pembukaan sesi tidak langsung menampilkan formulir.** Formulir tampil hanya bila sesi berstatus Terbuka dan waktu sekarang berada di dalam jam program. Di luar itu, pengunjung melihat keterangan "Sesi tanya jawab belum dibuka" atau "Sesi tanya jawab untuk program ini telah berakhir."
- Sesi menutup sendiri pada jam selesai ditambah 15 menit (`DR-04`). Penutupan otomatis dicatat sebagai "Sistem" pada `ditutup_oleh`.
- Setelah tertutup, sesi tidak dapat dibuka kembali. Bila acara diperpanjang, buat sesi baru untuk program dan tanggal yang sama setelah sesi lama ditutup; sistem mengizinkan karena tidak ada sesi terbuka.
- Pertanyaan yang masuk setelah sesi tertutup ditolak, meskipun halaman masih terbuka di peramban pengunjung.

### 5.7 Entitas Pertanyaan

| Field | Label di Panel | Tipe | Wajib | Aturan |
|---|---|---|---|---|
| `id` | - | Nomor otomatis | - | Tidak ditampilkan |
| `sesi` | Sesi | Relasi otomatis | - | Diisi sistem |
| `nama` | Nama pengirim | Teks pendek | Ya | 2-60 karakter; boleh nama samaran atau "Anonim" (`M-06`) |
| `isi` | Pertanyaan | Teks panjang | Ya | 10-500 karakter; teks biasa; tanpa tautan |
| `waktu` | Waktu masuk | Waktu otomatis | - | Waktu server dalam WIB |
| `status` | Status | Pilihan | Ya | Baru, Dibacakan, atau Disembunyikan |
| `catatan` | Catatan petugas | Teks pendek | Tidak | Maksimal 160 karakter; misalnya "dibacakan pukul 13.40" |
| `ditandai_oleh` | Ditandai oleh | Teks otomatis | - | Nama dan waktu perubahan status terakhir |

Aturan tambahan:

- Pertanyaan **tidak dapat disunting** isinya, termasuk oleh Superadmin. Yang dapat diubah hanya status dan catatan. Menyunting pertanyaan pendengar menghilangkan keaslian arsip.
- **Baru** berarti belum ditindaklanjuti. **Dibacakan** berarti sudah masuk antrean baca atau sudah dibacakan. **Disembunyikan** berarti dikeluarkan dari antrean baca karena tidak pantas, tetapi tetap tersimpan.
- Menghapus pertanyaan bersifat permanen dan dapat dilakukan Admin maupun Superadmin (`M-08`). Sistem meminta konfirmasi dan menyebut nama pengirim.
- Tidak ada data alamat IP, peramban, atau lokasi pengirim pada tabel pertanyaan. Pembatasan spam dilakukan dengan batas tiga pertanyaan per 10 menit per sesi peramban dan satu kolom jebakan yang tidak terlihat (`R-5`).
- Pertanyaan tidak tampil di halaman publik mana pun (`M-07`).
- Satu sesi dapat diekspor ke CSV oleh Admin. Berkas ekspor memuat nama, pertanyaan, waktu, dan status; panel mengingatkan bahwa berkas mengandung data pribadi.

### 5.8 Entitas Acara Mendatang

| Field | Label di Panel | Tipe | Wajib | Aturan |
|---|---|---|---|---|
| `id` | - | Nomor otomatis | - | Tidak ditampilkan |
| `judul` | Judul acara | Teks pendek | Ya | 5-100 karakter |
| `tanggal` | Tanggal | Tanggal | Ya | Hari ini atau setelahnya untuk status Terbit |
| `jam_mulai` | Jam mulai | Jam | Ya | WIB |
| `jam_selesai` | Jam selesai | Jam | Tidak | Boleh kosong bila durasi belum pasti |
| `kanal` | Kanal | Pilihan | Ya | YouTube, Instagram, Zoom, atau Tatap Muka |
| `tautan` | Tautan acara | Tautan | Tidak | Wajib bila kanal bukan Tatap Muka |
| `deskripsi` | Deskripsi | Teks panjang | Ya | 40-400 karakter |
| `gambar` | Gambar acara | Berkas gambar | Tidak | 16:9; maksimal 2 MB |
| `teks_alternatif` | Teks alternatif gambar | Teks pendek | Ya bila ada gambar | 10-120 karakter |
| `buka_sesi` | Membuka sesi tanya jawab | Sakelar | Ya | Bawaan Tidak; bila Ya, acara muncul sebagai pilihan saat membuka sesi |
| `status` | Status | Pilihan | Ya | Draf atau Terbit |

Aturan tambahan:

- Blok Acara Mendatang menampilkan maksimal tiga acara terdekat yang berstatus Terbit dan belum lewat (`M-10`).
- Acara yang sudah lewat otomatis hilang dari halaman publik, tetapi tetap tersimpan di panel sebagai arsip.
- Acara bukan kalender penuh. Tidak ada tampilan bulanan, pengulangan, atau undangan kalender.
- Satu acara khusus dapat membuka sesi tanya jawab bila sakelar `buka_sesi` dinyalakan (`M-19`).

### 5.9 Entitas Halaman Statis

| Field | Label di Panel | Tipe | Wajib | Aturan |
|---|---|---|---|---|
| `id` | - | Nomor otomatis | - | Tidak ditampilkan |
| `nama` | Nama halaman | Pilihan tetap | Ya | Tentang WBS, Kontak, atau Kebijakan Privasi |
| `slug` | Alamat halaman | Teks otomatis | - | Tetap: `/tentang`, `/kontak`, `/kebijakan-privasi` |
| `ringkasan` | Ringkasan | Teks pendek | Ya | 40-200 karakter; dipakai cuplikan dan pencarian |
| `isi` | Isi halaman | Teks panjang berformat | Ya | Minimal 200 karakter; hanya judul, tebal, miring, daftar, dan tautan |
| `gambar` | Gambar utama | Berkas gambar | Tidak | Maksimal 2 MB; 16:9 |
| `teks_alternatif` | Teks alternatif gambar | Teks pendek | Ya bila ada gambar | 10-120 karakter |
| `status` | Status | Pilihan | Ya | Draf atau Terbit |
| `diubah_oleh` | Diubah oleh | Teks otomatis | - | Nama dan waktu |

Aturan tambahan:

- Ketiga halaman wajib ada dan tidak dapat dihapus atau diganti alamatnya.
- Isi halaman tidak boleh memuat HTML, skrip, atau kode sematan. Tautan keluar dibuka di tab baru dengan penanda yang jelas.
- Data kontak terstruktur (alamat, surel, telepon, jam layanan) diambil dari Pengaturan Situs agar halaman Kontak dan footer selalu sama. Halaman Kontak hanya memuat teks pengantar dan kanal pengaduan.
- Perubahan Kebijakan Privasi harus mencerminkan praktik sebenarnya: nama dan pertanyaan pendengar, arsip yang dapat dihapus, serta GA4 dengan IP teranonimasi (`PR-15`, `PR-49`).
- Halaman berstatus Draf hanya dapat dilihat lewat pratinjau pengelola.
- Setelah peluncuran, ketiga halaman wajib berstatus Terbit dan tidak dapat dikembalikan ke Draf. Perubahan diterbitkan setelah dipratinjau.

### 5.10 Pengaturan Situs

Pengaturan dibagi menjadi enam kelompok. Seluruhnya hanya dapat diubah Superadmin.

| Kelompok | Field | Tipe | Wajib | Aturan |
|---|---|---|---|---|
| **Identitas** | Nama situs | Teks tetap | - | "Radio & Siniar WBS Perpusnas" (`M-01`); tidak dapat diubah |
| **Identitas** | Tagline | Teks pendek | Ya | Maksimal 120 karakter |
| **Identitas** | Logo header | Berkas gambar | Ya | SVG atau PNG transparan; maksimal 1 MB |
| **Identitas** | Ikon situs | Berkas gambar | Ya | PNG 512 x 512; maksimal 500 KB |
| **Identitas** | Gambar bawaan saat tautan dibagikan | Berkas gambar | Ya | 16:9; minimal 1.200 x 675; maksimal 2 MB |
| **Kontak** | Alamat | Teks panjang | Ya | Alamat Perpusnas; maksimal 300 karakter |
| **Kontak** | Surel | Surel | Ya | Surel resmi layanan |
| **Kontak** | Telepon | Teks pendek | Ya | 8-20 karakter; angka, spasi, tanda hubung, dan tanda tambah |
| **Kontak** | Jam layanan | Teks pendek | Ya | Maksimal 120 karakter; sebut WIB |
| **Kontak** | Tautan kanal pengaduan | Tautan | Ya | Harus alamat resmi Perpusnas |
| **Sosial** | Instagram, Facebook, X, YouTube, WhatsApp | Tautan | Tidak | Hanya kanal aktif; alamat harus cocok dengan platform; kosong berarti tidak tampil (`M-11`, `PR-41`) |
| **Audio** | Alamat aliran Icecast | Tautan | Ya | Hanya alamat pendengar; tidak memuat nama pengguna atau kata sandi; wajib https atau reverse proxy SSL agar tidak terblokir *mixed content* pada situs GitHub Pages (`D-8`) |
| **Audio** | Pesan saat siaran terganggu | Teks pendek | Ya | Maksimal 160 karakter; tampil saat pemutar gagal |
| **Analitik** | ID GA4 | Teks pendek | Tidak | Format G-XXXXXXXXXX; bila kosong, analitik tidak aktif |
| **Analitik** | Aktifkan analitik | Sakelar | Ya | Bawaan Tidak; baru dinyalakan setelah Kebijakan Privasi terbit (`PR-15`, `PR-49`) |
| **Operasional** | Zona waktu | Teks tetap | - | WIB (UTC+7); tidak dapat diubah |
| **Operasional** | Batas pertanyaan per 10 menit | Angka | Ya | 1-10; bawaan 3 |
| **Operasional** | Masa tenggang penutupan sesi | Angka | Ya | 0-60 menit; bawaan 15 |

Aturan tambahan:

- Panel **tidak menyimpan** nama pengguna, kata sandi, atau kunci sumber Icecast. Yang disimpan hanya alamat yang boleh didengar publik. Kredensial studio tetap di studio.
- Tombol **Tes koneksi** memeriksa alamat audio dan menampilkan Tersambung, Terputus, atau Tidak dapat diperiksa. Hasil ini juga muncul di Dasbor (`PR-47`).
- Tombol **Unduh cadangan** menghasilkan satu berkas berisi seri, episode, jadwal, acara, halaman, dan pengaturan. Pertanyaan pendengar tidak disertakan secara bawaan karena mengandung data pribadi; Superadmin dapat memilih menyertakannya dengan peringatan (`PR-36`).
- Perubahan pengaturan dicatat pada "diubah oleh" dan waktu. Perubahan alamat audio langsung dipakai pemutar pada pemuatan halaman berikutnya.

### 5.11 Aturan lintas data

| Hal | Aturan |
|---|---|
| **Tanggal dan jam** | Semua tanggal disimpan sebagai tanggal; semua jam disimpan dalam WIB. Zona waktu peramban pengunjung tidak mengubah data |
| **Status konten** | Hanya tiga: Draf, Tayang, Arsip Internal. Tidak ada status "Terbit sebagian" |
| **Penghapusan** | Data yang tampil publik tidak dihapus permanen kecuali diatur khusus. Gunakan Arsip Internal atau Nonaktif |
| **Unggahan berkas** | Jenis dibatasi JPG, PNG, WebP, SVG untuk logo. Nama berkas diubah sistem. Isi berkas diperiksa, bukan hanya ekstensinya |
| **Teks alternatif** | Wajib setiap kali gambar diunggah; gambar bawaan YouTube memakai teks alternatif otomatis dari judul episode |
| **Slug** | Huruf kecil, angka, dan tanda hubung; tanpa spasi; tanpa tanda baca lain; tidak boleh sama dengan alamat sistem seperti `admin`, `cari`, `jadwal`, `program` |
| **Pencarian** | Mencari judul episode, nama seri, narasumber, moderator, dan topik. Bukan judul asli YouTube (`PR-10`) |
| **Waktu tampil** | Perubahan yang diterbitkan terlihat pada pemuatan halaman berikutnya, paling lambat satu menit |
| **Bahasa** | Seluruh teks panel dan pesan galat berbahasa Indonesia (`PR-37`, `M-12`) |

---

## 6. Rincian Modul Panel

Setiap modul dijelaskan dengan urutan yang sama: tujuan, isi daftar, formulir, aksi, aturan yang ditolak sistem, dan hak akses. Kolom "Rujukan" menunjuk kebutuhan atau keputusan pada dokumen `01`.

### 6.1 Dasbor

**Tujuan.** Menjawab tiga pertanyaan saat petugas masuk: apa yang sedang mengudara, apakah audio tersambung, dan apa yang perlu dikerjakan hari ini.

| Blok | Rincian |
|---|---|
| **Sedang mengudara** | Nama program, jam mulai dan selesai, jenis hari, program berikutnya, hitung mundur |
| **Status Icecast** | Tersambung, Terputus, atau Tidak dapat diperiksa; waktu pemeriksaan; tombol Periksa lagi |
| **Sesi hari ini** | Program interaktif hari ini beserta status sesi dan jumlah pertanyaan baru; tombol Buka Sesi atau Tutup Sesi |
| **Angka ringkas** | Episode Tayang, Draf, Arsip Internal, pertanyaan Baru hari ini, acara terdekat |
| **Tugas kelengkapan** | Jumlah episode Tayang dengan narasumber atau moderator "Belum tercatat"; tautan ke saringan |
| **Tautan cepat** | Tambah episode, Ubah jadwal, Tulis acara, Buka halaman pengunjung |

Aturan: Dasbor tidak memiliki tombol playout. Bila Icecast terputus, tampil saran "Periksa sambungan studio atau hubungi kontak teknis", bukan tombol yang berpura-pura dapat memperbaiki siaran. Bila jadwal hari ini belum diterbitkan, muncul peringatan dengan tautan ke Jadwal Tetap.

**Hak akses.** Admin dan Superadmin melihat Dasbor yang sama. Blok pengaturan situs dan laporan lengkap tidak tampil bagi Admin.

**Rujukan.** `PR-02`, `PR-04`, `PR-25`, `PR-47`, `M-14`.

### 6.2 Jadwal Tetap

**Tujuan.** Mengubah jadwal 24 jam tanpa menyentuh kode dan tanpa mengganggu siaran yang sedang berjalan (`PR-20`, `M-18`).

**Tampilan daftar.** Tiga tab: Hari Kerja, Sabtu, Minggu. Setiap tab menampilkan:

| Kolom | Isi |
|---|---|
| Jam | Mulai sampai selesai, format 24 jam WIB |
| Program | Nama payung |
| Deskripsi | Satu kalimat, bila ada |
| Interaktif | Ya atau Tidak |
| Status versi | Draf memiliki perubahan atau Sama dengan terbit |
| Diubah | Nama dan waktu perubahan terakhir |

Di atas tabel terdapat ringkasan: jumlah slot, cakupan jam, dan peringatan bila ada celah atau tumpang tindih pada draf. Tombol **Pratinjau** membuka tampilan halaman Jadwal dengan data draf, lengkap dengan penanda "Pratinjau - belum terbit".

**Formulir slot.** Field: jenis hari, jam mulai, jam selesai, nama program, deskripsi singkat, dan sakelar interaktif. Jam diisi dengan pemilih jam kelipatan 15 menit; tidak ada isian bebas. Tombol **Simpan draf**, **Hapus slot**, dan **Batal**.

**Aksi khusus.**

- **Salin dari Sabtu** menyalin seluruh slot Sabtu ke Minggu, atau sebaliknya, sebagai draf. Berguna karena keduanya identik pada data awal.
- **Tambah slot** menyisipkan baris kosong; tidak otomatis memotong slot lain.
- **Terbitkan** memeriksa cakupan 06.00-05.59, tumpang tindih, dan nama program kosong. Bila lolos, versi terbit diganti dan draf menjadi sama dengan terbit.
- **Batalkan perubahan** mengembalikan draf ke versi terbit, dengan konfirmasi.

**Yang ditolak sistem.**

| Keadaan | Pesan dan Tindakan |
|---|---|
| Jam selesai lebih awal atau sama dengan jam mulai | "Jam selesai harus setelah jam mulai." |
| Dua slot bertumpang tindih | "Slot 09.00-10.00 bertumpang tindih dengan Indonesia Pagi Ini. Perbaiki jam terlebih dahulu." |
| Ada celah pada versi terbit | "Jadwal belum menutup 24 jam. Bagian 10.00-11.00 masih kosong." |
| Menghapus slot yang dipakai sesi hari ini | "Slot ini dipakai sesi tanya jawab yang masih terbuka. Tutup sesi terlebih dahulu." |
| Mengubah penanda interaktif oleh Admin | Tombol tidak tampil; permintaan langsung ditolak |

**Catatan.** Perubahan jadwal tidak mengubah katalog video. Penanda "Sedang Mengudara" dihitung dari jam dan jadwal terbit, bukan dari Icecast atau Jazler (`K-5`, `R-11`). Bila studio menyimpang dari jadwal, petugas cukup memperbarui jadwal tampil.

**Hak akses.** Admin dan Superadmin dapat menyunting serta menerbitkan. Penanda interaktif hanya Superadmin.

**Rujukan.** `PR-20`, `PR-46`, `M-18`, `A-7`, `B-9`.

### 6.3 Seri

**Tujuan.** Menjaga nama seri tetap baku dan mengatur tampilan kartu seri di katalog (`PR-18`, `M-03`).

**Tampilan daftar.** Kolom: urutan, gambar mini, nama seri, kategori, jenis, jumlah episode tayang, unggulan, diubah. Saringan: kategori, jenis, dan status tampil (Sudah tampil atau Belum tampil). Pencarian berdasarkan nama.

Urutan awal mengikuti dokumen `02`: kategori, lalu jumlah episode. Tombol naik dan turun langsung menyimpan urutan. Perubahan lain berlaku setelah tombol **Simpan** ditekan; kartu pratinjau di sebelah formulir memperlihatkan hasilnya sebelum disimpan.

**Formulir seri.** Dua kelompok:

| Kelompok | Field |
|---|---|
| **Identitas** | Nama seri, alamat halaman, kategori, jenis, deskripsi |
| **Tampilan** | Gambar sampul, teks alternatif, urutan, sakelar unggulan |

Di sebelah kanan formulir terdapat kartu pratinjau dan ringkasan "X episode tayang, Y draf, Z arsip".

**Aksi.**

- **Tambah seri** (Superadmin): membuat seri baru. Setelah disimpan, seri muncul di daftar dengan status Belum tampil sampai memiliki episode Tayang.
- **Ubah** (Admin): deskripsi, gambar, teks alternatif, urutan, unggulan.
- **Ubah identitas** (Superadmin): nama, alamat, kategori, jenis.
- **Gabungkan seri** (Superadmin): memindahkan seluruh episode dari seri sumber ke seri tujuan, lalu menghapus seri sumber yang kosong. Wajib menampilkan jumlah episode dan pratinjau nomor baru.
- **Hapus** (Superadmin): hanya bila tidak ada episode dan bukan Lainnya.

**Yang ditolak sistem.**

| Keadaan | Pesan dan Tindakan |
|---|---|
| Nama seri sudah ada | "Nama seri sudah dipakai. Gunakan nama lain atau gabungkan seri." |
| Nama "Lainnya" untuk seri baru | "Nama Lainnya disediakan sistem dan tidak dapat dipakai seri baru." |
| Mengubah alamat setelah ada episode terbit | "Alamat halaman tidak dapat diubah setelah episode terbit. Perbaiki judul seri bila perlu." |
| Menjadikan lebih dari enam seri unggulan | "Beranda hanya memuat enam seri unggulan. Lepas penanda salah satu seri terlebih dahulu." |
| Menghapus seri yang masih memiliki episode | "Seri masih memiliki 12 episode. Pindahkan atau arsipkan terlebih dahulu." |
| Admin mencoba menambah atau mengganti nama | Tombol tidak tampil; permintaan ditolak |

**Seri Lainnya.** Tampil paling bawah, diberi label "Keranjang", dan memiliki keterangan: "Video yang tidak memenuhi syarat menjadi seri. Tidak diberi nomor episode. Setiap episode wajib memiliki kategori topik." Tombol ubah identitas dan hapus tidak tersedia.

**Hak akses.** Lihat: keduanya. Ubah tampilan: keduanya. Tambah, ubah identitas, gabung, hapus: Superadmin (`DR-07`).

**Rujukan.** `PR-18`, `PR-45`, `M-03`, dokumen `02` Bagian 5 dan 11.

### 6.4 Episode

**Tujuan.** Menjadi tempat kerja utama pustakawan: menambah, melengkapi, menerbitkan, dan merawat 331 episode (`PR-19`, `PR-27`, `PR-28`).

**Tampilan daftar.** Kolom: gambar mini, judul, seri, nomor, tanggal, durasi, status, status tautan, diubah. Nomor tampil sebagai "E-12" atau "-" untuk Lainnya.

Saringan:

| Saringan | Pilihan |
|---|---|
| Seri | Semua, 21 seri, Lainnya |
| Kategori | Semua, Layanan, Naskah, Literasi, Sejarah |
| Status | Semua, Draf, Tayang, Arsip Internal |
| Kelengkapan | Semua, Metadata belum lengkap, Narasumber belum tercatat, Moderator belum tercatat |
| Tautan | Semua, Baik, Tidak tersedia, Belum diperiksa |
| Tahun | 2020 sampai 2026 |
| Kata kunci | Judul, narasumber, moderator, topik |

Pencarian dan saringan disimpan pada alamat halaman. Di atas tabel terdapat tombol **Tambah episode**, **Periksa tautan**, dan **Ekspor daftar**.

**Formulir episode.** Dibagi empat kelompok:

| Kelompok | Field | Catatan |
|---|---|---|
| **Sumber** | Tautan YouTube, jenis sumber | Setelah tautan ditempel, pengenal video diambil otomatis dan duplikat langsung diperiksa |
| **Identitas** | Judul, seri, nomor, tanggal tayang, durasi | Nomor hanya baca; berubah otomatis |
| **Metadata** | Narasumber, moderator, topik, kategori topik (Lainnya), deskripsi | Saran topik muncul dari topik yang sudah dipakai |
| **Tampilan** | Gambar, teks alternatif, status, alasan arsip | Pratinjau kartu dan halaman detail di sisi kanan |

Tombol di bilah bawah: **Simpan draf**, **Pratinjau**, **Terbitkan**, dan **Arsipkan**. Tombol **Terbitkan** menampilkan daftar periksa sebelum aktif.

**Alur menambah episode (lima menit).**

1. Tekan **Tambah episode**.
2. Tempel tautan YouTube. Sistem menolak tautan kanal, playlist, atau video yang sudah tercatat.
3. Isi judul baku sesuai aturan dokumen `02`. Bila judul masih memuat nama seri atau nomor, sistem memberi peringatan, bukan menolak.
4. Pilih seri, tanggal, dan durasi.
5. Isi narasumber, moderator, dan topik. Gunakan "Belum tercatat" hanya bila benar-benar belum ada.
6. Tekan **Pratinjau**, periksa tampilan, lalu **Terbitkan**.
7. Nomor episode dihitung ulang otomatis dan muncul di daftar.

**Aksi massal.**

| Aksi | Akibat | Batas |
|---|---|---|
| **Terbitkan** | Status menjadi Tayang bila syarat terpenuhi; nomor dihitung ulang | Maksimal 50 episode sekali jalan; yang gagal ditampilkan satu per satu |
| **Arsipkan** | Status menjadi Arsip Internal; hilang dari katalog publik; nomor dihitung ulang | Wajib mengisi alasan arsip; maksimal 50 |
| **Pindahkan seri** | Episode berpindah seri; nomor kedua seri dihitung ulang | Menampilkan pratinjau pergeseran nomor sebelum menyimpan |
| **Periksa tautan** | Memeriksa ketersediaan video | Berjalan di latar belakang; hasil muncul bertahap |

**Yang ditolak sistem.**

| Keadaan | Pesan dan Tindakan |
|---|---|
| Tautan bukan video | "Tautan ini bukan video YouTube. Salin alamat dari tombol Bagikan pada video." |
| Video sudah tercatat | "Video ini sudah ada sebagai [judul] di seri [nama]. Buka episode tersebut." |
| Judul memuat emoji | "Judul tidak boleh memuat emoji. Gunakan judul baku tanpa emoji." |
| Judul memuat nomor episode | Peringatan: "Nomor episode diurus sistem. Hapus nomor dari judul." Tetap dapat disimpan setelah dikonfirmasi |
| Judul diawali nama seri | Peringatan: "Judul sebaiknya tanpa nama seri. Nama seri sudah tampil di halaman." Tetap dapat disimpan setelah dikonfirmasi |
| Tanggal tayang di masa depan untuk status Tayang | "Tanggal tayang belum terjadi. Simpan sebagai Draf atau perbaiki tanggal." |
| Durasi nol atau lebih dari 12 jam | "Durasi harus antara 1 menit dan 12 jam." |
| Narasumber kosong | "Isi nama narasumber atau pilih Belum tercatat." |
| Terbit tanpa topik | "Isi minimal satu topik agar episode dapat ditemukan." |
| Episode Lainnya tanpa kategori topik | "Pilih satu kategori topik untuk episode di keranjang Lainnya." |
| Mengosongkan alasan arsip | "Sebutkan alasan singkat mengapa episode diarsipkan." |
| Menghapus episode Tayang oleh Admin | Tombol hapus tidak tampil; gunakan Arsipkan |
| Judul sama dalam satu seri | Diizinkan, tetapi alamat halaman diberi angka pembeda |

**Pratinjau.** Pratinjau episode menampilkan halaman detail seperti yang dilihat pengunjung, dengan pita "Pratinjau - belum terbit". Pemutar YouTube tetap dimuat agar petugas dapat memastikan video yang benar. Tautan pratinjau hanya berlaku bagi pengguna yang masuk.

**Pemeriksaan tautan.** Berjalan otomatis setiap bulan dan dapat dijalankan manual. Hasil "Tidak tersedia" tidak menghapus episode. Panel menampilkan daftar episode bermasalah dan tombol **Periksa ulang**. Bila video benar-benar hilang, petugas memilih Arsipkan dengan alasan "Video tidak tersedia di YouTube" (`R-1`, `P-6`).

**Hak akses.** Admin dan Superadmin dapat menambah, mengubah, menerbitkan, memindahkan, dan mengarsipkan. Hapus permanen hanya Draf untuk Admin; Superadmin dapat menghapus permanen dengan konfirmasi ketik (`DR-08`).

**Rujukan.** `PR-19`, `PR-27`, `PR-28`, `PR-29`, `PR-30`, `PR-40`, `PR-46`, `M-04`, `M-16`.

### 6.5 Sesi On-Air dan Pertanyaan

**Tujuan.** Menjadi meja kerja penyiar saat siaran: membuka sesi, melihat pertanyaan yang masuk, memilih yang akan dibacakan, dan menutup sesi (`PR-21`, `PR-22`).

Modul ini memiliki dua tab: **Hari Ini** dan **Arsip**.

**Tab Hari Ini.** Bagian atas menampilkan kartu program interaktif hari ini:

| Informasi | Isi |
|---|---|
| Program | Nama program dan jam |
| Status sesi | Belum dibuka, Terbuka, atau Tertutup |
| Pertanyaan | Jumlah Baru, Dibacakan, Disembunyikan |
| Aksi | Buka Sesi, Tutup Sesi, atau Lihat Pertanyaan |

Bila hari ini tidak ada program interaktif, tampil keterangan: "Tidak ada program interaktif hari ini." Tombol **Buka Sesi Khusus** membuka pilihan acara khusus yang bertanda membuka sesi.

**Membuka sesi.** Formulir singkat: program, tanggal, dan konfirmasi jam. Sebelum menyimpan, panel menampilkan kalimat yang akan dilihat pengunjung: "Punya pertanyaan untuk penyiar? Isi nama dan pertanyaan Anda." Setelah dibuka, muncul status Terbuka dan penghitung waktu sampai sesi berakhir.

Aturan pembukaan:

- Hanya program bertanda interaktif atau acara khusus bertanda membuka sesi (`M-19`).
- Tanggal hanya hari ini atau maksimal 30 hari ke depan.
- Satu sesi terbuka per program per tanggal.
- Formulir publik muncul saat jam program dimulai dan hilang 15 menit setelah jam selesai (`DR-04`). Membuka sesi lebih awal hanya menyiapkan data; formulir tetap menunggu program dimulai.
- Membuka sesi tidak memengaruhi audio atau playout.

**Antrean pertanyaan.** Kartu pertanyaan disusun dari yang paling lama, agar tidak ada yang terlewat. Setiap kartu memuat nama, waktu masuk, isi pertanyaan, status, dan catatan.

| Aksi | Akibat |
|---|---|
| **Tandai Dibacakan** | Status menjadi Dibacakan; kartu pindah ke bagian "Sudah ditangani" |
| **Sembunyikan** | Status menjadi Disembunyikan; keluar dari antrean baca, tetap di arsip |
| **Batalkan status** | Mengembalikan ke Baru bila salah tekan |
| **Tambah catatan** | Menyimpan catatan petugas, misalnya waktu dibacakan |
| **Hapus** | Menghapus permanen setelah konfirmasi; tidak dapat dibatalkan |
| **Muat ulang** | Mengambil pertanyaan terbaru tanpa memuat ulang halaman |

Panel memuat pertanyaan baru otomatis setiap 20 detik. Bila ada pertanyaan baru, muncul penanda dan bunyi pemberitahuan yang dapat dimatikan. Pada mode fokus siaran, antrean diperbesar dan tombol lain disembunyikan.

**Menutup sesi.** Tombol **Tutup Sesi** meminta konfirmasi bila masih ada pertanyaan berstatus Baru: "Masih ada 4 pertanyaan baru. Tutup sesi sekarang?" Setelah ditutup, formulir publik berganti keterangan bahwa sesi telah berakhir. Sesi yang sudah tertutup tidak dapat dibuka kembali.

**Tab Arsip.** Daftar seluruh sesi lampau dengan saringan tanggal, program, dan status. Kolom: tanggal, program, jam, jumlah pertanyaan, jumlah dibacakan, ditutup oleh. Aksi: **Lihat pertanyaan**, **Ekspor CSV**, dan **Hapus seluruh pertanyaan**. Penghapusan seluruh pertanyaan hanya untuk sesi yang sudah tertutup, menyebut jumlah data, dan meminta konfirmasi dengan mengetik "HAPUS". Arsip tidak dihapus otomatis (`M-08`). Peninjauan disarankan setiap enam bulan; pertanyaan yang tidak diperlukan dapat dihapus.

**Yang ditolak sistem.**

| Keadaan | Pesan dan Tindakan |
|---|---|
| Membuka sesi untuk program noninteraktif | "Program ini tidak membuka sesi tanya jawab. Pilih program interaktif atau tandai acara khusus." |
| Membuka sesi ganda | "Sesi untuk program ini pada tanggal tersebut sudah terbuka." |
| Membuka sesi pada tanggal lampau | "Sesi hanya dapat dibuka untuk hari ini atau tanggal yang akan datang." |
| Pertanyaan kurang dari 10 karakter | "Pertanyaan terlalu pendek. Tuliskan pertanyaan dengan jelas." |
| Pertanyaan lebih dari 500 karakter | "Pertanyaan maksimal 500 karakter." |
| Nama kosong | "Isi nama atau tulis Anonim." |
| Mengirim saat sesi tertutup | "Sesi tanya jawab untuk program ini telah berakhir." |
| Mengirim di luar jam program | "Sesi tanya jawab dibuka saat program berlangsung." |
| Lebih dari tiga pertanyaan dalam 10 menit | "Terlalu banyak pertanyaan dalam waktu singkat. Coba lagi beberapa menit lagi." |

**Hak akses.** Admin dan Superadmin memiliki kewenangan penuh atas sesi dan pertanyaan (`M-08`, `M-09`).

**Rujukan.** `PR-05`, `PR-21`, `PR-22`, `M-06`, `M-07`, `M-08`, `M-09`, `M-19`, `R-5`, `R-6`.

### 6.6 Acara Mendatang

**Tujuan.** Mengumumkan acara khusus atau live YouTube terdekat tanpa membuat kalender penuh (`M-10`).

**Tampilan daftar.** Dua tab: **Akan Datang** dan **Sudah Lewat**. Kolom: judul, tanggal, jam, kanal, status, tampil di beranda, diubah.

Saringan: kanal, status, dan bulan. Urutan bawaan: tanggal terdekat.

**Formulir acara.** Field: judul, tanggal, jam mulai, jam selesai (boleh kosong), kanal, tautan, deskripsi, gambar, teks alternatif, sakelar buka sesi, dan status. Pratinjau kartu acara tampil di sisi kanan.

**Aksi.** Tambah, ubah, pratinjau, terbitkan, kembalikan ke draf, dan hapus. Acara yang sudah lewat tidak perlu dihapus; sistem menyembunyikannya dari publik dan memindahkannya ke tab Sudah Lewat.

**Aturan.**

- Halaman publik menampilkan maksimal tiga acara Terbit yang belum lewat, diurutkan tanggal terdekat.
- Bila tidak ada acara, blok disembunyikan seluruhnya, bukan menampilkan kotak kosong.
- Acara yang tanggalnya hari ini dan jam selesainya sudah lewat dianggap selesai.
- Tautan wajib untuk kanal daring dan harus alamat http atau https.
- Acara dengan sakelar buka sesi menjadi pilihan pada modul Sesi On-Air.
- Menghapus acara yang sudah memiliki sesi ditolak sampai sesi ditutup. Pertanyaan tetap tersimpan pada arsip sesi.

**Yang ditolak sistem.**

| Keadaan | Pesan dan Tindakan |
|---|---|
| Tanggal lampau untuk status Terbit | "Acara yang akan diterbitkan tidak boleh bertanggal lampau." |
| Jam selesai sebelum jam mulai | "Jam selesai harus setelah jam mulai." |
| Kanal daring tanpa tautan | "Isi tautan acara untuk kanal daring." |
| Deskripsi terlalu pendek | "Deskripsi minimal 40 karakter agar pengunjung memahami acara." |

**Hak akses.** Admin dan Superadmin.

**Rujukan.** `PR-23`, `M-10`, `M-19`, `PR-41`.

### 6.7 Halaman Statis

**Tujuan.** Memungkinkan pustakawan memperbarui Tentang WBS, Kontak, dan Kebijakan Privasi tanpa pengembang (`PR-23`, `PR-15`).

**Tampilan daftar.** Tiga kartu tetap: Tentang WBS, Kontak, Kebijakan Privasi. Setiap kartu menampilkan ringkasan, status, terakhir diubah, dan tombol **Sunting**. Tidak ada tombol tambah atau hapus.

**Editor halaman.** Field: ringkasan, isi, gambar utama, teks alternatif, dan status. Editor mendukung:

| Format | Cara |
|---|---|
| Judul bagian | Pilih gaya Judul 2 atau Judul 3 |
| Tebal dan miring | Tombol atau pintasan papan tunas |
| Daftar berpoin dan bernomor | Tombol daftar |
| Tautan | Tempel alamat; teks tautan wajib diisi; tautan keluar dibuka di tab baru |
| Gambar dalam isi | Unggah satu per satu dengan teks alternatif |

Editor **tidak** menerima HTML, skrip, tabel, atau kode sematan. Tombol **Pratinjau** menampilkan halaman seperti di situs. Tombol **Terbitkan** menyimpan dan langsung memperbarui halaman publik.

**Aturan khusus per halaman.**

Halaman statis terdiri dari tiga halaman tetap. Pengumuman singkat tidak dibuat sebagai halaman baru; gunakan **Acara Mendatang** agar peta situs final tidak bertambah (`PR-23`, `M-10`).

- **Tentang WBS** memuat profil, visi, sejarah singkat, dan tim. Tidak memuat daftar episode.
- **Kontak** memuat teks pengantar dan kanal pengaduan. Alamat, surel, telepon, jam layanan, dan media sosial diambil dari Pengaturan Situs agar tidak ada data ganda.
- **Kebijakan Privasi** wajib menjelaskan: nama dan pertanyaan yang dikumpulkan, tujuan penggunaan, masa penyimpanan, cara meminta penghapusan, penggunaan GA4 dengan IP teranonimasi, dan tidak adanya penyimpanan IP mentah (`PR-15`, `PR-49`).

**Yang ditolak sistem.**

| Keadaan | Pesan dan Tindakan |
|---|---|
| Isi kurang dari 200 karakter | "Isi halaman terlalu pendek. Lengkapi penjelasan." |
| Menyisipkan HTML atau skrip | "Kode HTML tidak diizinkan. Gunakan tombol pemformatan yang tersedia." |
| Mengunggah gambar lebih dari 2 MB | "Ukuran gambar melebihi 2 MB. Perkecil terlebih dahulu." |
| Gambar tanpa teks alternatif | "Isi teks alternatif agar pembaca layar dapat menjelaskan gambar." |
| Menerbitkan Kebijakan Privasi yang tidak menyebut GA4 padahal analitik aktif | Peringatan wajib dikonfirmasi |

**Hak akses.** Admin dan Superadmin.

**Rujukan.** `PR-15`, `PR-23`, `PR-46`, `PR-49`, `M-10`.

### 6.8 Pengguna dan Peran

**Tujuan.** Menjaga akses panel tetap terbatas dan dapat dipertanggungjawabkan (`PR-17`, `PR-24`).

**Tampilan daftar.** Kolom: nama, surel, peran, status, terakhir masuk, dibuat. Saringan: peran (Semua, Superadmin, Admin) dan status (Aktif, Nonaktif). Pencarian berdasarkan nama atau surel.

**Formulir pengguna.**

| Field | Saat Dibuat | Saat Diubah |
|---|---|---|
| Nama lengkap | Wajib | Wajib |
| Surel | Wajib | Wajib |
| Peran | Wajib | Wajib, dengan pengaman Superadmin terakhir |
| Status | Aktif | Aktif atau Nonaktif |
| Kata sandi | Wajib, minimal 12 karakter | Tidak diisi; gunakan Atur Ulang Kata Sandi |

**Aksi.**

- **Tambah pengguna**: membuat akun dan menampilkan kata sandi sementara satu kali.
- **Ubah**: memperbaiki nama, surel, peran, atau status.
- **Atur ulang kata sandi**: menghasilkan kata sandi sementara baru; pengguna wajib menggantinya saat masuk.
- **Nonaktifkan**: memutus sesi pengguna tersebut dan menolak login berikutnya. Data yang pernah dibuat tetap utuh.
- **Hapus**: hanya untuk akun yang belum pernah membuat atau mengubah data. Selain itu, gunakan Nonaktifkan.

Tidak ada pemulihan kata sandi mandiri lewat surel pada tahap ini. Pengguna yang lupa kata sandi menghubungi Superadmin untuk mendapat kata sandi sementara. Setelah masuk, pengguna wajib menggantinya.

**Pengaman.**

1. Minimal satu Superadmin aktif harus selalu ada.
2. Pengguna tidak dapat menonaktifkan, menghapus, atau menurunkan perannya sendiri.
3. Kata sandi disimpan ter-hash dan tidak dapat dilihat siapa pun, termasuk Superadmin (`PR-35`).
4. Lima percobaan masuk gagal dalam 15 menit mengunci percobaan selama 15 menit. Pesan tidak menyebut apakah surel atau kata sandi yang salah.
5. Sesi berakhir setelah 30 menit tanpa aktivitas atau 8 jam sejak masuk, mana yang lebih dahulu.
6. Keluar dari panel mengakhiri sesi di peramban tersebut.
7. Perubahan peran dan status dicatat pada "diubah oleh" dan waktu.

**Yang ditolak sistem.**

| Keadaan | Pesan dan Tindakan |
|---|---|
| Surel sudah dipakai | "Surel ini sudah terdaftar. Gunakan surel lain atau atur ulang kata sandi pengguna tersebut." |
| Kata sandi kurang dari 12 karakter | "Kata sandi minimal 12 karakter." |
| Menonaktifkan Superadmin terakhir | "Sistem harus memiliki minimal satu Superadmin aktif." |
| Menurunkan peran sendiri | "Anda tidak dapat mengubah peran akun sendiri." |
| Menghapus akun yang punya riwayat data | "Akun ini pernah membuat data. Nonaktifkan saja agar catatan tetap utuh." |
| Login dengan akun nonaktif | "Akun ini tidak aktif. Hubungi Superadmin." |
| Terlalu banyak percobaan | "Terlalu banyak percobaan masuk. Coba lagi dalam 15 menit." |

**Hak akses.** Hanya Superadmin. Admin tidak melihat menu ini.

**Rujukan.** `PR-17`, `PR-24`, `PR-35`, `M-09`, `M-15`, `D-5`.

### 6.9 Laporan dan Statistik

**Tujuan.** Menyediakan bahan laporan pimpinan: jumlah kunjungan, sebaran wilayah, jumlah episode, dan jumlah pertanyaan (`PR-25`, `PR-49`, `M-14`).

**Hak akses.** Hanya Superadmin (`DR-06`). Admin melihat angka operasional pada Dasbor, bukan laporan lengkap.

**Pilihan periode.** Tujuh hari terakhir, 30 hari terakhir, 90 hari terakhir, atau rentang tanggal khusus. Periode bawaan 30 hari terakhir. Semua tanggal dalam WIB.

**Isi laporan.**

| Bagian | Data | Sumber |
|---|---|---|
| **Ringkasan kunjungan** | Sesi, pengguna, tampilan halaman, durasi rata-rata | GA4 |
| **Halaman terpopuler** | Sepuluh halaman dengan tampilan terbanyak | GA4 |
| **Sumber kunjungan** | Pencarian, langsung, media sosial, rujukan | GA4 |
| **Sebaran wilayah** | Negara, provinsi, dan kota dengan jumlah pengunjung | GA4, IP teranonimasi |
| **Katalog** | Episode Tayang, Draf, Arsip; jumlah per seri; episode tanpa gambar | Data panel |
| **Pertanyaan** | Jumlah sesi, pertanyaan masuk, dibacakan, disembunyikan; per program | Data panel |
| **Acara** | Jumlah acara terbit dan sudah lewat | Data panel |

**Batasan yang dinyatakan di layar.**

- Data GA4 adalah **agregat dan anonim**. Panel tidak menampilkan identitas, alamat IP, atau perjalanan satu pengunjung (`PR-15`, `R-6`, `R-13`).
- Data GA4 dapat tertunda hingga 48 jam. Waktu pembaruan terakhir ditampilkan di pojok laporan.
- Bila GA4 belum diatur, bagian kunjungan menampilkan: "Analitik belum aktif. Superadmin dapat mengaktifkannya di Pengaturan Situs." Bagian katalog dan pertanyaan tetap tampil.
- Angka kunjungan tidak dapat dijadikan patokan jumlah pendengar radio. Radio didengar melalui pemutar dan tidak semua pendengar memuat halaman.
- Laporan tidak menampilkan kata sandi, surel pengguna, atau isi pertanyaan pendengar.

**Aksi.** **Cetak** menghasilkan tata letak A4 hitam putih yang rapi; **Ekspor CSV** mengunduh tabel yang sedang tampil. Berkas ekspor tidak memuat data pribadi pengunjung.

**Rujukan.** `PR-25`, `PR-49`, `M-14`, `R-13`.

### 6.10 Pengaturan Situs

**Tujuan.** Menyimpan identitas dan tautan yang dipakai bersama oleh header, footer, halaman kontak, pemutar, dan analitik (`PR-26`).

**Tampilan.** Enam kelompok berbentuk akordeon: Identitas, Kontak, Sosial, Audio, Analitik, dan Operasional. Setiap kelompok memiliki tombol **Simpan** sendiri agar perubahan kecil tidak berisiko membatalkan kelompok lain.

| Kelompok | Yang Diatur | Catatan |
|---|---|---|
| **Identitas** | Nama situs (tetap), tagline, logo, ikon situs, gambar bawaan berbagi | Pratinjau header dan kartu berbagi |
| **Kontak** | Alamat, surel, telepon, jam layanan, tautan pengaduan | Langsung tampil di footer dan halaman Kontak |
| **Sosial** | Instagram, Facebook, X, YouTube, WhatsApp | Hanya kanal aktif; kosong berarti tidak tampil (`M-11`) |
| **Audio** | Alamat Icecast, pesan gangguan, tombol Tes koneksi | Hanya alamat pendengar; tanpa kredensial (`D-8`, `PR-47`) |
| **Analitik** | ID GA4, sakelar aktif, keterangan privasi | Wajib selaras dengan Kebijakan Privasi (`PR-49`) |
| **Operasional** | Batas pertanyaan, masa tenggang sesi, unduh cadangan | Zona waktu tetap WIB |

**Tes koneksi audio.** Tombol memeriksa alamat aliran dan menampilkan salah satu hasil:

| Hasil | Arti | Tindakan yang Disarankan |
|---|---|---|
| **Tersambung** | Aliran merespons | Tidak ada |
| **Terputus** | Alamat benar tetapi tidak ada aliran | Hubungi studio; periksa apakah siaran sedang berjalan (`R-10`) |
| **Tidak dapat diperiksa** | Panel tidak dapat menjangkau alamat | Periksa jaringan atau alamat; coba lagi |
| **Alamat tidak valid** | Bukan alamat http atau https | Perbaiki alamat |

Hasil tes bukan jaminan audio terdengar di peramban pengunjung. Ia hanya memeriksa apakah alamat merespons.

**Unduh cadangan.** Menghasilkan satu berkas bertanggal, misalnya `cadangan-wbs-2026-11-17.json`, berisi seri, episode, jadwal, acara, halaman, dan pengaturan. Pilihan "Sertakan arsip pertanyaan" tidak aktif secara bawaan dan menampilkan peringatan data pribadi. Berkas disimpan oleh petugas, bukan di server web. Saran: unduh setiap Jumat dan simpan dua bulan terakhir (`PR-36`).

**Yang ditolak sistem.**

| Keadaan | Pesan dan Tindakan |
|---|---|
| Alamat audio bukan http atau https | "Alamat audio harus diawali http:// atau https:// (wajib https:// atau melalui reverse proxy SSL agar tidak terblokir mixed content di GitHub Pages)." |
| Alamat audio memuat nama pengguna atau kata sandi | "Jangan menyimpan kredensial sumber siaran di panel. Masukkan alamat pendengar saja." |
| ID GA4 bukan format G- | "ID GA4 diawali G- diikuti huruf dan angka, misalnya G-ABC123XYZ." |
| Mengaktifkan analitik saat Kebijakan Privasi masih Draf | "Terbitkan Kebijakan Privasi yang menyebut GA4 terlebih dahulu." |
| Tautan sosial tidak cocok dengan platform | "Alamat ini bukan tautan Instagram. Periksa kembali." |
| Logo lebih dari 1 MB | "Ukuran logo melebihi 1 MB." |

**Hak akses.** Hanya Superadmin. Admin dapat melihat alamat audio yang sedang dipakai pada Dasbor, tanpa tombol ubah.

**Rujukan.** `PR-26`, `PR-01`, `PR-36`, `PR-41`, `PR-47`, `PR-49`, `M-01`, `M-11`, `D-8`.

---

## 7. Alur Kerja Rutin

Bagian ini menjawab pertanyaan yang paling sering muncul: "Apa yang harus saya lakukan sekarang?" Semua perkiraan waktu sudah memperhitungkan pengguna yang belum terbiasa.

### 7.1 Ringkasan pekerjaan rutin

| Waktu | Pekerjaan | Perkiraan | Modul |
|---|---|---|---|
| Setiap pagi sebelum siaran | Periksa Dasbor, status audio, jadwal hari ini | 2 menit | Dasbor |
| Awal program interaktif | Buka sesi tanya jawab | 1 menit | Sesi On-Air |
| Saat siaran | Pantau dan tandai pertanyaan | Berkelanjutan | Sesi On-Air |
| Akhir program | Tutup sesi, periksa pertanyaan tersisa | 2 menit | Sesi On-Air |
| Setiap ada episode baru | Tambah dan terbitkan episode | 5 menit | Episode |
| Setiap Senin | Periksa episode Draf dan metadata belum lengkap | 10 menit | Episode |
| Setiap awal bulan | Periksa tautan YouTube dan acara mendatang | 10 menit | Episode, Acara |
| Setiap Jumat | Unduh cadangan data | 2 menit | Pengaturan Situs |
| Setiap enam bulan | Tinjau taksonomi dan arsip pertanyaan | 60 menit | Seri, Sesi On-Air |

### 7.2 Sebelum siaran

1. Masuk ke panel dan buka **Dasbor**.
2. Pastikan status Icecast **Tersambung**. Bila Terputus, hubungi kontak teknis studio (`D-10`).
3. Periksa kartu **Sedang mengudara**: nama program dan jam harus sesuai jadwal hari ini.
4. Bila jadwal berubah, buka **Jadwal Tetap**, sunting draf, pratinjau, lalu terbitkan.
5. Buka situs publik di ponsel dan pastikan program yang sama tampil. Ini memeriksa tampilan sekaligus sambungan audio.

### 7.3 Saat siaran interaktif

1. Lima menit sebelum program, buka **Sesi On-Air dan Pertanyaan**.
2. Tekan **Buka Sesi**, pilih program, dan periksa jam. Membuka lebih awal hanya menyiapkan data; formulir belum tampil.
3. Saat jam program dimulai, buka halaman publik untuk memastikan formulir muncul. Bila belum muncul, periksa status sesi dan jam program.
4. Pantau antrean. Tandai **Dibacakan** setelah pertanyaan dibacakan agar penyiar tahu mana yang tersisa.
5. Sembunyikan pertanyaan yang tidak pantas. Hapus hanya bila jelas spam atau berisi data pribadi.
6. Saat program selesai, tekan **Tutup Sesi**. Sesi juga menutup sendiri 15 menit setelah jam selesai.

### 7.4 Setelah siaran

1. Periksa pertanyaan yang masih berstatus Baru. Bacakan pada kesempatan berikutnya atau tutup sebagai tidak terpakai.
2. Bila ada pertanyaan yang perlu ditindaklanjuti di luar siaran, salin isinya ke kanal pengaduan; jangan menambahkan data pribadi ke catatan panel.
3. Bila episode siaran akan diunggah ke YouTube, tambahkan sebagai episode baru setelah video berstatus Publik.

### 7.5 Menambah episode baru

Alur rinci ada pada Bagian 6.4. Ringkasnya:

1. Pastikan video sudah **Publik** di YouTube. Video unlisted atau privat tidak boleh dimasukkan (`M-04`).
2. Tempel tautan video, bukan tautan kanal atau playlist.
3. Tulis judul baku sesuai dokumen `02`.
4. Pilih seri, tanggal, dan durasi.
5. Lengkapi narasumber, moderator, dan topik.
6. Pratinjau, lalu terbitkan.
7. Periksa halaman publik dan pemutar YouTube.

Bila video termasuk uji siaran, klip sangat pendek, atau konten internal kepegawaian, simpan sebagai **Arsip Internal** dengan alasan yang jelas (`M-16`).

### 7.6 Mengubah jadwal mendadak

1. Buka **Jadwal Tetap** dan pilih jenis hari yang berlaku.
2. Ubah jam atau nama program pada draf. Jangan menghapus seluruh baris bila hanya satu program yang berubah.
3. Periksa peringatan celah dan tumpang tindih.
4. Tekan **Pratinjau** dan bandingkan dengan jadwal yang sedang berjalan.
5. Tekan **Terbitkan**. Perubahan terlihat pada pemuatan halaman berikutnya.
6. Catat alasan perubahan pada catatan internal bila perubahan berlaku lebih dari sehari.

Yang **tidak** perlu dilakukan: mengubah playout di Jazler. Panel hanya mengubah tulisan di website. Bila studio tetap menyiarkan program lama, website akan menampilkan jadwal baru; itulah batas yang sudah disepakati (`K-5`, `R-11`).

### 7.7 Menangani tautan video yang rusak

1. Buka **Episode**, saring status tautan **Tidak tersedia**.
2. Buka episode dan tekan **Periksa ulang** untuk memastikan bukan gangguan sementara.
3. Bila video benar-benar hilang, pilih **Arsipkan** dengan alasan "Video tidak tersedia di YouTube".
4. Bila video diprivatkan sementara, biarkan Tayang dan periksa lagi dalam tujuh hari.
5. Jangan menghapus episode. Metadata tetap berguna meskipun pemutar kosong (`K-2`, `R-1`).

### 7.8 Serah terima akun

1. Superadmin membuat akun baru dengan peran yang sesuai.
2. Kata sandi sementara diserahkan langsung, bukan melalui pesan terbuka.
3. Pengguna baru wajib mengganti kata sandi saat masuk pertama.
4. Setelah satu minggu pendampingan, akun lama dinonaktifkan.
5. Periksa bahwa minimal satu Superadmin aktif tetap ada.
6. Perbarui daftar penanggung jawab konten dan jadwal pada dokumen serah terima (`D-5`).

---

## 8. Pesan Galat dan Teks Bantuan

Pesan galat harus menjawab tiga hal: apa yang salah, mengapa, dan apa langkah berikutnya. Hindari kata "error", "invalid", "server", atau kode angka. Contoh yang dipakai di seluruh panel:

| Keadaan | Pesan di Layar | Tindakan Pengguna |
|---|---|---|
| Sesi masuk berakhir | "Sesi Anda telah berakhir karena tidak ada aktivitas. Silakan masuk kembali." | Masuk kembali; pekerjaan yang belum disimpan hilang, kecuali tersimpan sebagai draf |
| Tidak berhak membuka modul | "Halaman ini hanya untuk Superadmin." | Kembali ke Dasbor atau hubungi Superadmin |
| Koneksi terputus saat menyimpan | "Data belum tersimpan karena koneksi terputus. Periksa jaringan lalu coba lagi." | Jangan menutup peramban; coba simpan lagi |
| Menyimpan dua kali | "Data sedang disimpan. Tunggu sebentar." | Tunggu hingga selesai |
| Data sudah diubah orang lain | "Data ini baru saja diubah pengguna lain. Muat ulang untuk melihat versi terbaru." | Muat ulang; bandingkan sebelum menyimpan |
| Data tidak ditemukan | "Data yang Anda cari tidak ditemukan. Mungkin sudah dihapus." | Kembali ke daftar |
| Unggahan gagal | "Gambar gagal diunggah. Pastikan format JPG, PNG, atau WebP dan ukuran di bawah 2 MB." | Perkecil atau ubah format |
| Berkas terlalu besar | "Ukuran berkas melebihi batas. Maksimal 2 MB untuk gambar." | Perkecil gambar |
| Pratinjau kedaluwarsa | "Pratinjau sudah kedaluwarsa. Buka pratinjau baru dari formulir." | Kembali ke formulir |
| Laporan belum tersedia | "Laporan belum dapat dimuat. Coba lagi beberapa saat lagi." | Muat ulang; hubungi pengembang bila berulang |
| Analitik belum aktif | "Analitik belum aktif. Superadmin dapat mengaktifkannya di Pengaturan Situs." | Hubungi Superadmin |
| Audio tidak merespons | "Aliran audio tidak merespons. Periksa sambungan studio atau hubungi kontak teknis." | Periksa `D-10`; jangan mengubah alamat tanpa konfirmasi |
| Jam tidak valid | "Gunakan format 24 jam, misalnya 09.00 atau 17.30." | Perbaiki jam |
| Tanggal tidak valid | "Tanggal tayang tidak boleh sebelum 1 Januari 2020. Untuk status Tayang, tanggal tidak boleh setelah hari ini." | Perbaiki tanggal |
| Terlalu banyak pertanyaan | "Terlalu banyak pertanyaan dalam waktu singkat. Coba lagi beberapa menit lagi." | Tunggu 10 menit |

**Aturan penulisan pesan.** Sapaan tidak memakai "Anda" berlebihan; cukup kalimat perintah. Sebut nama field, bukan nama kolom basis data. Bila kesalahan disebabkan sistem, akui dan beri jalan keluar. Bila disebabkan isian, jelaskan cara memperbaikinya tanpa menyalahkan.

**Pesan berhasil.** Contoh: "Episode berhasil diterbitkan. Nomor episode menjadi E-12." atau "Jadwal Hari Kerja berhasil diterbitkan. Perubahan langsung tampil di situs."

---

## 9. Pratinjau, Penerbitan, dan Pembatalan

### 9.1 Pratinjau

| Data | Yang Dilihat Saat Pratinjau | Batas |
|---|---|---|
| Episode | Halaman detail lengkap dengan pemutar dan metadata | Hanya pengguna yang masuk; alamat pratinjau tidak diindeks mesin pencari |
| Jadwal | Halaman Jadwal dengan tab yang sedang disunting | Pita "Pratinjau - belum terbit" terlihat |
| Halaman statis | Halaman seperti di situs | Pita pratinjau terlihat |
| Acara | Kartu acara pada blok beranda | Pita pratinjau terlihat |

Pratinjau selalu memakai data draf yang tersimpan. Saat tombol Pratinjau ditekan dari formulir, sistem menyimpan draf terlebih dahulu. Data yang sudah terbit tidak berubah sampai tombol Terbitkan ditekan.

### 9.2 Status dan akibatnya

| Status | Tampil di Publik | Dihitung Nomor | Dapat Dihapus |
|---|---|---|---|
| **Draf episode** | Tidak | Tidak (nomor sementara) | Ya, Admin |
| **Tayang** | Ya | Ya | Hanya Superadmin, dengan konfirmasi ketik |
| **Arsip Internal** | Tidak | Tidak | Hanya Superadmin, dengan konfirmasi ketik |
| **Draf jadwal** | Tidak | - | Ya, bagian dari draf |
| **Jadwal terbit** | Ya | - | Hanya lewat draf baru |
| **Halaman Draf** | Tidak | - | Tidak; halaman tetap ada |
| **Acara Draf** | Tidak | - | Ya |
| **Sesi Tertutup** | Formulir hilang | - | Tidak; sesi disimpan sebagai arsip |

### 9.3 Membatalkan penerbitan

- **Episode**: ubah status dari Tayang menjadi Arsip Internal, bukan Draf. Alasannya, episode yang pernah tayang tetap perlu tercatat untuk arsip dan laporan. Bila benar-benar harus disembunyikan, Arsip Internal sudah cukup. Hapus permanen hanya dipakai bila ada alasan hukum atau permintaan resmi, dan hanya oleh Superadmin.
- **Jadwal**: buat draf baru yang mengembalikan slot sebelumnya, lalu terbitkan. Versi terbit tidak dapat "di-undo" secara otomatis.
- **Halaman**: ketiga halaman wajib tidak dapat disembunyikan. Perubahan diterbitkan setelah dipratinjau dan langsung menggantikan isi publik. Tidak ada versi lama yang dipertahankan.
- **Acara**: ubah status menjadi Draf atau hapus bila belum lewat.

Semua pembatalan meminta konfirmasi dan mencatat pengubah terakhir.

### 9.4 Yang tidak boleh dilakukan tanpa persetujuan

| Tindakan | Mengapa Perlu Persetujuan |
|---|---|
| Mengubah nama atau alamat seri | Memutus tautan dan mengubah taksonomi dokumen `02` |
| Menggabungkan seri | Memindahkan banyak episode dan mengubah nomor |
| Menghapus pertanyaan | Data pendengar hilang permanen |
| Mengubah alamat Icecast | Dapat mematikan pemutar bagi semua pengunjung |
| Mengaktifkan analitik | Berdampak pada privasi dan Kebijakan Privasi |
| Menghapus episode Tayang secara permanen | Bertentangan dengan prinsip arsip katalog |

---

## 10. Keamanan, Privasi, dan Pemeliharaan Data

### 10.1 Keamanan akses

| Hal | Aturan |
|---|---|
| Koneksi | Seluruh halaman panel memakai HTTPS (`PR-35`) |
| Kata sandi | Minimal 12 karakter; disimpan ter-hash; tidak pernah ditampilkan kembali |
| Percobaan masuk | Lima kali gagal dalam 15 menit mengunci sementara |
| Sesi | Berakhir setelah 30 menit tanpa aktivitas atau 8 jam sejak masuk |
| Hak akses | Diperiksa di server pada setiap permintaan, bukan hanya di tampilan |
| Layanan backend & RLS | Dikelola via Supabase BaaS dengan Row Level Security (RLS); kredensial dan hak akses terlindungi di tingkat database |
| Unggahan | Jenis dan ukuran diperiksa; berkas berbahaya ditolak |
| Akun | Tidak ada pendaftaran mandiri; akun dibuat Superadmin |
| Perangkat | Dianjurkan memakai komputer atau ponsel pribadi dan keluar setelah selesai |

### 10.2 Privasi data pendengar

- Panel hanya menyimpan **nama** dan **pertanyaan**. Tidak ada alamat IP, lokasi, surel, atau nomor telepon pengirim (`R-6`).
- Nama boleh samaran atau "Anonim" (`M-06`).
- Pertanyaan tidak tampil di halaman publik (`M-07`).
- Arsip dapat dihapus kapan saja oleh Admin atau Superadmin (`M-08`).
- Ekspor CSV mengandung data pribadi. Simpan hanya di tempat yang aman dan hapus setelah laporan selesai.
- GA4 dipakai untuk statistik agregat dengan IP teranonimasi. Panel tidak menampilkan data tingkat pengunjung (`PR-49`).
- Kebijakan Privasi wajib diperbarui bila cara pengumpulan data berubah (`PR-15`, `D-7`).

### 10.3 Pemeliharaan data

| Pekerjaan | Waktu | Penanggung Jawab |
|---|---|---|
| Unduh cadangan | Setiap Jumat | Admin yang bertugas |
| Periksa tautan YouTube | Setiap awal bulan | Admin |
| Periksa episode Draf dan metadata belum lengkap | Setiap Senin | Admin |
| Tinjau acara mendatang | Setiap awal bulan | Admin |
| Tinjau arsip pertanyaan | Setiap enam bulan | Superadmin |
| Tinjau taksonomi seri | Setiap enam bulan | Superadmin |
| Periksa akun nonaktif dan peran | Setiap enam bulan | Superadmin |
| Uji pemulihan cadangan | Sekali sebelum peluncuran | Pengembang dan Superadmin |

**Masa simpan.** Tidak ada penghapusan otomatis. Data dipertahankan sampai dihapus dengan sengaja. Episode Arsip Internal dan arsip sesi disimpan agar laporan pimpinan dapat disusun; penghapusan dilakukan bila data sudah tidak diperlukan atau atas permintaan pengirim.

**Cadangan.** Berkas cadangan disimpan di luar server web, minimal dua salinan pada dua tempat berbeda. Uji pemulihan wajib dilakukan sebelum peluncuran, bukan setelah data hilang (`PR-36`, `P-6`).

### 10.4 Batas tanggung jawab

Panel membantu pekerjaan tampilan, bukan menggantikan tanggung jawab penyiaran. Kesalahan jadwal playout, audio putus, atau materi yang salah diputar tetap diselesaikan di studio. Panel hanya memastikan informasi di website sesuai dengan yang disepakati.

---

## 11. Rencana Uji Terima Panel

Uji terima dilakukan pustakawan sebelum peluncuran (UAT). Setiap butir diuji pada desktop dan ponsel. Hasil dicatat: Lulus, Lulus dengan catatan, atau Gagal.

| No | Yang Diuji | Langkah Singkat | Hasil yang Diharapkan | Rujukan |
|---|---|---|---|---|
| **U-01** | Masuk dan keluar | Masuk sebagai Admin, keluar, masuk lagi | Berhasil; nama dan peran tampil | `PR-17` |
| **U-02** | Pembatasan Admin | Admin membuka Pengguna dan Pengaturan Situs | Menu tidak tampil; alamat langsung ditolak | `PR-24`, `PR-26` |
| **U-03** | Jadwal terbit | Ubah satu jam, pratinjau, terbitkan | Jadwal publik berubah; penanda mengudara menyesuaikan | `PR-20`, `PR-46` |
| **U-04** | Jadwal bertumpang tindih | Buat dua slot 09.00-10.00 | Simpan draf boleh; terbit ditolak dengan pesan jelas | `PR-20` |
| **U-05** | Jadwal bercelah | Hapus satu slot lalu terbitkan | Terbit ditolak; celah disebutkan | `PR-20` |
| **U-06** | Tambah episode | Tempel tautan, isi metadata, terbitkan | Episode tampil dengan nomor otomatis | `PR-19`, `PR-29` |
| **U-07** | Video ganda | Tempel tautan yang sudah ada | Ditolak; episode lama ditawarkan | `PR-27` |
| **U-08** | Metadata wajib | Kosongkan narasumber, coba terbitkan | Terbit ditolak; daftar syarat tampil | `PR-27` |
| **U-09** | Nomor otomatis | Ubah tanggal satu episode | Nomor seri dihitung ulang; pratinjau pergeseran tampil | `PR-29` |
| **U-10** | Arsip internal | Arsipkan episode, buka katalog publik | Episode hilang dari publik; tetap ada di panel | `PR-28`, `M-16` |
| **U-11** | Pratinjau episode | Simpan Draf, tekan Pratinjau | Halaman detail tampil dengan pita pratinjau | `PR-46` |
| **U-12** | Seri unggulan | Tandai tujuh seri | Seri ketujuh ditolak; beranda tetap enam | `PR-45` |
| **U-13** | Tambah seri | Admin mencoba menambah seri | Tombol tidak tampil; Superadmin berhasil | `PR-18`, `DR-07` |
| **U-14** | Buka sesi | Buka sesi untuk program interaktif | Formulir publik muncul saat jam program | `PR-21`, `M-19` |
| **U-15** | Program noninteraktif | Coba buka sesi untuk program lain | Pilihan tidak tersedia atau ditolak | `M-19` |
| **U-16** | Kirim pertanyaan | Isi nama "Anonim" dan pertanyaan | Masuk panel sebagai Baru | `M-06`, `M-07` |
| **U-17** | Tandai dibacakan | Tekan Tandai Dibacakan | Status berubah; hilang dari antrean baru | `PR-22` |
| **U-18** | Sembunyikan dan hapus | Sembunyikan satu, hapus satu | Sembunyi tetap di arsip; hapus hilang permanen | `M-08` |
| **U-19** | Tutup sesi | Tutup sesi saat ada pertanyaan baru | Konfirmasi muncul; formulir publik hilang | `PR-21` |
| **U-20** | Penutupan otomatis | Biarkan sesi melewati jam selesai | Sesi tertutup sendiri setelah masa tenggang | `DR-04` |
| **U-21** | Acara mendatang | Terbitkan tiga acara | Tampil maksimal tiga di beranda; lewat tanggal hilang | `M-10` |
| **U-22** | Halaman statis | Ubah Tentang WBS, terbitkan | Halaman publik berubah; Kontak memakai data pengaturan | `PR-23` |
| **U-23** | Akun pengguna | Buat akun, atur ulang kata sandi, nonaktifkan | Kata sandi sementara hanya tampil sekali; akun nonaktif tidak bisa masuk | `PR-24` |
| **U-24** | Superadmin terakhir | Coba nonaktifkan Superadmin terakhir | Ditolak dengan pesan jelas | `PR-24` |
| **U-25** | Laporan Admin | Admin membuka Laporan lengkap | Menu tidak tampil; Dasbor tetap menampilkan angka operasional | `DR-06` |
| **U-26** | Analitik belum aktif | Kosongkan ID GA4 | Laporan kunjungan menampilkan keterangan, bukan galat | `PR-49` |
| **U-27** | Status Icecast | Matikan aliran sementara | Dasbor menampilkan Terputus dan saran tindakan | `PR-47` |
| **U-28** | Cadangan | Unduh cadangan tanpa arsip pertanyaan | Berkas berisi seri, episode, jadwal, acara, halaman | `PR-36` |
| **U-29** | Ponsel | Ulangi U-03, U-06, U-16 pada layar 375 piksel | Semua dapat diselesaikan tanpa menggulir mendatar | `PR-32` |
| **U-30** | Bahasa | Periksa seluruh pesan galat | Tidak ada istilah teknis atau teks Inggris | `PR-37` |

**Syarat lulus.** Minimal 28 dari 30 butir Lulus, dan tidak ada butir Gagal pada kategori keamanan, hak akses, atau pertanyaan pendengar. Butir yang gagal wajib diperbaiki dan diuji ulang sebelum peluncuran.

---

## 12. Serah Terima dan Pelatihan

### 12.1 Yang diserahkan

| No | Berkas atau Akses | Isi |
|---|---|---|
| 1 | Akun Superadmin | Minimal dua orang, satu sebagai cadangan |
| 2 | Akun Admin | Untuk pustakawan dan penyiar yang bertugas |
| 3 | Dokumen `01` sampai `04` | Acuan kebutuhan, taksonomi, panel, dan halaman pengunjung |
| 4 | Panduan singkat satu halaman | Alur harian, alamat panel, kontak teknis |
| 5 | Berkas cadangan awal | Data setelah migrasi 331 episode |
| 6 | Daftar kontak | Pengelola studio, hosting, dan pengembang (`D-10`) |

### 12.2 Pelatihan minimal

| Sesi | Peserta | Durasi | Isi |
|---|---|---|---|
| **Dasar** | Semua Admin | 60 menit | Masuk, Dasbor, jadwal, pertanyaan |
| **Katalog** | Pustakawan | 90 menit | Tambah episode, metadata, status, penomoran |
| **Siaran** | Penyiar dan petugas jaga | 45 menit | Buka dan tutup sesi, antrean pertanyaan, gangguan audio |
| **Superadmin** | Superadmin | 60 menit | Akun, pengaturan, laporan, cadangan, pemulihan |

Pelatihan memakai data uji, bukan data asli. Setiap peserta menyelesaikan satu tugas nyata: menambah satu episode, mengubah satu jadwal, dan membuka lalu menutup satu sesi.

### 12.3 Pendampingan

Selama dua minggu pertama setelah peluncuran, sediakan satu kanal tanya jawab dan satu kali tinjauan mingguan. Setelah itu, tinjauan dilakukan setiap bulan pada tiga hal: episode Draf yang menumpuk, tautan rusak, dan pertanyaan yang belum ditindaklanjuti.

---

## 13. Penutup

Dokumen ini menetapkan data dan antarmuka panel pengelola secara lengkap: sepuluh modul, delapan entitas isi, satu kelompok pengaturan, dua peran, aturan validasi, alur kerja, pesan galat, dan rencana uji terima. Rancangan ini menjaga tiga hal yang paling mudah rusak pada proyek seperti ini:

1. **Konsistensi data.** Satu video satu episode, penomoran otomatis, dan daftar seri terkunci mencegah kekacauan judul terulang (`R-8`).
2. **Keselamatan arsip.** Episode yang pernah terbit tidak dihapus diam-diam; pertanyaan pendengar dapat dihapus atas permintaan; cadangan diunduh rutin (`K-2`, `M-08`, `PR-36`).
3. **Kewenangan yang jelas.** Panel mengatur tampilan, bukan playout. Superadmin memegang identitas dan akses; Admin menjalankan pekerjaan harian (`K-5`, `M-15`).

**Yang masih menunggu di luar dokumen ini:**

| Hal | Rujukan | Akibat bila belum ada |
|---|---|---|
| Alamat aliran Icecast | `D-8`, `D-10` | Pemutar radio belum dapat diaktifkan |
| Domain dan akun hosting | `D-3`, `D-4` | Panel dan situs belum dapat diluncurkan |
| Persetujuan identitas visual | `D-2` | Logo dan warna final belum dapat dipasang |
| Kebijakan privasi resmi | `D-7` | Analitik belum boleh diaktifkan |
| Penetapan akun pengelola | `D-5` | Pembagian peran belum dapat diuji |

**Langkah berikutnya.** Dokumen `04` yang merinci halaman pengunjung sudah disusun dan menunggu ACC. Setelah itu, data 331 episode dimasukkan ke panel, halaman pengunjung dibangun mengikuti dokumen `04`, panel dan halaman diuji dengan UAT, lalu situs disiapkan untuk peluncuran pada domain terpisah.

---

## Riwayat Revisi

| Versi | Tanggal | Perubahan | Penyusun |
|---|---|---|---|
| 1.0 | 17 November 2026 | Versi final awal: sepuluh modul panel, delapan entitas isi dan satu kelompok pengaturan, dua peran, delapan keputusan rancangan, alur kerja, pesan galat, dan 30 butir uji terima | Gusti Ahmad Muttahid Bilhaq |
| 1.1 | 17 November 2026 | Penyelarasan rujukan: acuan diperbarui ke dokumen `01` versi 2.1 dan dokumen `02` versi 1.1; catatan penomoran dokumen disesuaikan dengan Lampiran B dokumen `01`; paragraf rekonsiliasi 337 baris menjadi 331 episode diperbarui | Gusti Ahmad Muttahid Bilhaq |
| 1.2 | 17 November 2026 | Penyelarasan arsitektur deployment: (1) Penambahan `DR-09` penetapan Supabase sebagai BaaS database, autentikasi RLS, dan realtime Q&A pendukung GitHub Pages; (2) Penegasan URL Icecast HTTPS / reverse proxy SSL untuk mencegah *mixed content*; (3) Acuan diperbarui ke dokumen `01` versi 2.2 | Gusti Ahmad Muttahid Bilhaq |
