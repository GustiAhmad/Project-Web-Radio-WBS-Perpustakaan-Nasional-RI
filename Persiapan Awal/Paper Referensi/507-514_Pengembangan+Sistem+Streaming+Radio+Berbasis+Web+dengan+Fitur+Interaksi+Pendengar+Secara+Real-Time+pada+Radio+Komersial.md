

## IN-FEST 2026
Seminar Nasional Informatika – FTI UPGRIS
## Volume 2026

## 507

## ISSN. 2988-2451
Pengembangan Sistem Streaming Radio Berbasis Web dengan Fitur
Interaksi Pendengar Secara Real-Time pada Radio Komersial

## Bayu Sukma Aji
## *1
## , Noora Qotrun Nada
## 2

## 1
Informatika, Universitas PGRI Semarang, Kota Semarang, baayusukmaa442@gmail.com
## 2
Informatika, Universitas PGRI Semarang, Kota Semarang, noora@upgris.ac.id



## Abstract.
The  rapid  development  of  internet  technology  has  encouraged  conventional  radio
stations  to  transform  into  digital  broadcasting  platforms.  This  study  aims  to  develop  a  web-
based  radio  streaming  system  equipped  with  real-time  listener  interaction  features  for
Comercial Radio.  The  system  was  developed  using  PHP  Native,  MySQL,  HTML5,  CSS3,
JavaScript, and Bootstrap. The development process included requirements analysis, system
design, implementation, and testing stages. The resulting application provides radio streaming
services, live chat, song requests, broadcast management, and an administrative dashboard.
Testing  results  indicate  that  the  system  functions  properly  and  supports  more  interactive
communication  between  broadcasters  and  listeners.  The  implementation  of  the system
contributes  to improving digital  radio services and  expanding  audience  accessibility  through
internet-based media.
Keywords: Radio   Streaming;   Web   Application;   Real-Time   Interaction;   PHP;   Digital
## Broadcasting
## Abstrak

Perkembangan   teknologi   internet   mendorong   stasiun   radio   konvensional   untuk
bertransformasi menuju platform penyiaran digital. Penelitian ini bertujuan mengembangkan
sistem  streaming  radio  berbasis  web  yang  dilengkapi  fitur  interaksi  pendengar  secara  real-
time  pada  Radio Komersial.  Sistem  dikembangkan  menggunakan  PHP  Native,  MySQL,
HTML5,   CSS3,   JavaScript,   dan   Bootstrap.   Tahapan   pengembangan   meliputi   analisis
kebutuhan, perancangan sistem, implementasi, dan pengujian. Hasil penelitian menunjukkan
bahwa aplikasi yang dikembangkan mampu menyediakan layanan streaming radio, live chat,
request    lagu,   pengelolaan   siaran,    serta   dashboard   administrator.   Hasil   pengujian
menunjukkan  sistem  berjalan  dengan  baik  dan  mampu  mendukung  komunikasi  interaktif
antara  penyiar  dan  pendengar.  Implementasi  sistem  ini  memberikan  kontribusi  dalam
peningkatan  layanan  radio  digital  dan  memperluas  jangkauan  pendengar  melalui  media
berbasis internet.
Kata Kunci: Streaming Radio; Website; Interaksi Real-Time; PHP; Radio Digital

## 1. Pendahuluan
Perkembangan  teknologi  informasi  dan  komunikasi  telah  mengubah  cara  masyarakat
mengakses  informasi  dan  hiburan.  Internet  menjadi  media  utama  yang  memungkinkan
pengguna memperoleh berbagai layanan secara cepat dan fleksibel. Perubahan tersebut turut
memengaruhi industri penyiaran radio yang sebelumnya mengandalkan frekuensi AM dan FM
sebagai  media distribusi  utama[1]. Radio masih menjadi  salah satu  media komunikasi  yang
efektif  dalam  menyampaikan  informasi,  edukasi,  dan  hiburan  kepada  masyarakat.  Namun,
perubahan  perilaku  pendengar  yang  lebih  banyak  menggunakan  perangkat  digital  seperti
smartphone  dan  komputer  menyebabkan  radio  konvensional  menghadapi  tantangan  dalam
mempertahankan   eksistensinya.   Oleh   karena   itu,   diperlukan   inovasi   yang   mampu
mengintegrasikan layanan radio dengan teknologi internet[2].

Berbagai penelitian menunjukkan bahwa penerapan teknologi streaming memungkinkan
siaran  radio  diakses  tanpa  batas  wilayah  geografis.  Akan  tetapi,  sebagian  besar  sistem
streaming  hanya  berfokus  pada  penyiaran  audio  tanpa  menyediakan  sarana  komunikasi

## IN-FEST 2026
Seminar Nasional Informatika – FTI UPGRIS
## Volume 2026

## 508

## ISSN. 2988-2451
langsung  antara  pendengar  dan  penyiar.  Kondisi  tersebut  menyebabkan  interaksi  yang
menjadi salah satu keunggulan radio menjadi kurang optimal pada platform digital[3].

Berdasarkan permasalahan tersebut, penelitian ini mengusulkan pengembangan sistem
streaming  radio  berbasis  web  yang  dilengkapi  fitur  interaksi  pendengar  secara  real-time.
Sistem  ini  diharapkan  mampu  meningkatkan  kualitas  layanan  penyiaran  digital  sekaligus
mempererat hubungan antara penyiar dan pendengar melalui fitur live chat dan request lagu.
Tujuan  penelitian  ini  adalah  merancang,  membangun,  dan  mengimplementasikan  sistem
streaming  radio  berbasis  web  untuk  Radio komersial yang  mampu  mendukung  layanan
streaming audio serta interaksi pendengar secara real-time[4].

## 2. Metode
## 2.1 Metode Penelitian
Metode  penelitian  digunakan  sebagai  pedoman  dalam  pelaksanaan  penelitian  agar
proses  pengembangan  sistem  dapat  dilakukan  secara  sistematis  dan  terarah.  Tahapan
penelitian yang dilakukan meliputi observasi, wawancara, studi pustaka, analisis kebutuhan,
perancangan sistem, implementasi sistem, pengujian, serta penyusunan laporan. Alur tahapan
penelitian yang digunakan pada penelitian ini ditunjukkan pada Gambar 1.


## Gambar 1. Metode Penelitian

Berdasarkan Gambar  1,  penelitian diawali  dengan tahap observasi  dan  wawancara  di
Radio komersil untuk memperoleh informasi mengenai proses penyiaran radio dan kebutuhan
pengguna. Selanjutnya dilakukan studi pustaka sebagai landasan teori dalam pengembangan
sistem.   Setelah   kebutuhan   sistem   diperoleh,   dilakukan   perancangan,   implementasi,
pengujian, dan penyusunan laporan hasil penelitian.
## 1. Observasi
Tahap observasi dilakukan dengan mengamati secara langsung proses operasional
dan layanan streaming yang berjalan di Radio komersil. Tujuan dari tahap ini adalah untuk
memahami alur kerja sistem yang sedang digunakan serta mengidentifikasi permasalahan
yang dihadapi oleh pengguna.
## 2. Wawancara
Pada tahap ini dilakukan wawancara dengan pembimbing lapangan dan pihak terkait
untuk  memperoleh  informasi  mengenai  kebutuhan  sistem,  kendala  yang  dihadapi,  serta
fitur-fitur  yang  diharapkan  dapat  mendukung  aktivitas  penyiaran  radio  dan  interaksi
pendengar.
## 3. Studi Pustaka
Studi pustaka dilakukan dengan mengumpulkan berbagai referensi dari buku, jurnal
ilmiah,  artikel,  dan  sumber  terpercaya  lainnya  yang  berkaitan  dengan  sistem  informasi,
streaming  radio  berbasis  web,  serta  teknologi  yang  digunakan  dalam  pengembangan
sistem.
## 4. Analisis Kebutuhan
Tahap  analisis  kebutuhan  bertujuan  untuk  mengidentifikasi  kebutuhan  fungsional
dan  nonfungsional  sistem  berdasarkan  hasil  observasi,  wawancara,  dan  studi  pustaka.
Hasil analisis ini menjadi dasar dalam proses perancangan sistem.
## 5. Perancangan Sistem

## IN-FEST 2026
Seminar Nasional Informatika – FTI UPGRIS
## Volume 2026

## 509

## ISSN. 2988-2451
Pada  tahap  ini  dilakukan  perancangan  sistem  yang  meliputi  pembuatan  use  case
diagram,  perancangan  basis  data,  struktur  navigasi,  serta  desain  antarmuka  pengguna
untuk memberikan gambaran sistem sebelum proses implementasi dilakukan.
## 6. Implementasi Sistem
Tahap  implementasi  merupakan  proses  pembangunan  sistem  berdasarkan  hasil
perancangan  yang  telah  dibuat.  Sistem  dikembangkan  menggunakan  PHP  Native,
MySQL, HTML, CSS, JavaScript, dan Bootstrap.
## 7. Pengujian Sistem
Setelah  sistem  selesai  dibangun,  dilakukan  pengujian  untuk  memastikan  seluruh
fungsi berjalan sesuai dengan kebutuhan pengguna. Pengujian dilakukan menggunakan
metode Black Box Testing dengan menguji setiap fitur yang tersedia pada sistem.

## 8. Penyusunan Laporan
Tahap  terakhir  adalah  penyusunan  laporan  penelitian  yang  berisi  dokumentasi
seluruh  proses  penelitian,  hasil  implementasi  sistem,  pengujian,  serta  kesimpulan  yang
diperoleh dari penelitian.


## 2.2 Metode Pengembangan Sistem

Metode  pengembangan  sistem  yang  digunakan  pada  penelitian  ini  adalah  metode
Waterfall. Metode ini dipilih karena memiliki tahapan yang terstruktur sehingga memudahkan
proses  pengembangan  sistem  dari  tahap  analisis  hingga  pengujian.  Tahapan  metode
Waterfall yang digunakan dalam penelitian ini ditunjukkan pada Gambar 2.


## Gambar 2. Metode Pengembangan Sistem Waterfall

Berdasarkan   Gambar   2,   pengembangan   sistem   streaming   radio   berbasis   web
menggunakan metode Waterfall. Metode ini dipilih karena memiliki tahapan yang terstruktur
dan  sistematis  sehingga  memudahkan  proses  pengembangan  sistem  dari  awal  hingga
selesai.
## 1. Analisis Kebutuhan
Tahap pertama dilakukan untuk mengidentifikasi kebutuhan pengguna dan sistem.
Informasi  yang  diperoleh  dari  observasi  dan  wawancara  digunakan  untuk  menentukan
fitur-fitur yang akan dikembangkan, seperti streaming radio, live chat, request lagu, serta
dashboard administrator.
## 2. Desain Sistem
Setelah  kebutuhan  sistem  diketahui,  dilakukan  perancangan  sistem  yang  meliputi
desain  basis  data,  use  case  diagram,  activity  diagram,  serta  rancangan  antarmuka
pengguna. Tahap ini bertujuan untuk memberikan gambaran menyeluruh mengenai sistem
yang akan dibangun.
## 3. Implementasi
Pada  tahap  implementasi,  hasil  perancangan  diterjemahkan  ke  dalam  bentuk
program  menggunakan  PHP  Native  sebagai  bahasa  pemrograman  utama,  MySQL
sebagai  basis  data,  serta  HTML,  CSS,  JavaScript,  dan  Bootstrap  untuk  membangun
antarmuka pengguna.

## IN-FEST 2026
Seminar Nasional Informatika – FTI UPGRIS
## Volume 2026

## 510

## ISSN. 2988-2451
## 4. Pengujian
Sistem yang telah selesai dibangun kemudian diuji untuk memastikan seluruh fungsi
berjalan  dengan  baik  dan  sesuai  dengan  kebutuhan  yang  telah  ditentukan.  Pengujian
dilakukan terhadap fitur login, streaming radio, live chat, request lagu, dan fitur administrasi
lainnya.
## 5. Pemeliharaan
Tahap pemeliharaan dilakukan setelah sistem digunakan. Pada tahap ini dilakukan
perbaikan  apabila  ditemukan  kesalahan,  penyesuaian  terhadap  kebutuhan  baru,  serta
pengembangan fitur tambahan guna meningkatkan kinerja dan kualitas sistem.

Dengan  penerapan  metode  Waterfall,  proses  pengembangan  sistem  dapat  dilakukan
secara   terstruktur   sehingga   setiap   tahapan   dapat   diselesaikan   dengan   baik   sebelum
melanjutkan ke tahap berikutnya.

- Hasil dan Pembahasan
Penelitian   ini   menghasilkan   sebuah   sistem   streaming   radio   berbasis   web   yang
dikembangkan untuk mendukung proses penyiaran radio secara daring serta meningkatkan
interaksi antara pendengar dan penyiar[5]. Sistem yang dibangun menyediakan berbagai fitur
utama, seperti layanan streaming radio, live chat, request lagu, serta dashboard administrator
untuk mengelola data dan aktivitas pengguna[6]. Hasil perancangan dan implementasi sistem
yang telah dikembangkan akan dijelaskan pada subbab berikut.

## 3.1 Use Case Diagram

Use  Case  Diagram  digunakan  untuk  menggambarkan  interaksi  antara  pengguna
dengan sistem yang dikembangkan. Diagram ini menunjukkan fungsi-fungsi utama yang dapat
diakses oleh setiap aktor sesuai dengan hak akses yang dimiliki. Use Case Diagram sistem
streaming radio berbasis web ditunjukkan pada Gambar 3[7].


## Gambar 3. Use Case Diagram Sistem Streaming Radio Berbasis Web

Berdasarkan  Gambar  3,  terdapat  dua  aktor  yang  berinteraksi  dengan  sistem,  yaitu
administrator   dan   pendengar.   Administrator   memiliki   hak   akses   untuk   melakukan
pengelolaan data sistem, seperti mengelola jadwal siaran, data pengguna, pesan pendengar,
dan  informasi  streaming  radio[8].  Sementara  itu,  pendengar  dapat  mengakses  layanan
streaming radio, mengirim pesan melalui fitur live chat, serta melakukan request lagu kepada
penyiar[9]. Diagram tersebut menunjukkan bahwa sistem dirancang untuk mendukung proses
penyiaran  radio  sekaligus  memfasilitasi  interaksi  secara  real-time  antara  pendengar  dan
pihak radio[10].



## IN-FEST 2026
Seminar Nasional Informatika – FTI UPGRIS
## Volume 2026

## 511

## ISSN. 2988-2451


3.2 activity diagram

Activity  Diagram  digunakan  untuk  menggambarkan  alur  aktivitas  yang  terjadi  pada
sistem mulai dari pengguna melakukan suatu tindakan hingga sistem memberikan respons.
Diagram ini membantu menjelaskan proses bisnis yang berjalan pada sistem streaming radio
berbasis web.

Gambar 4. Activity diagram Sistem Streaming Radio Berbasis Web
Berdasarkan   Gambar 4,   proses   diawali   ketika   pengguna   mengakses   website
streaming radio. Pengguna dapat memilih menu yang tersedia, seperti mendengarkan siaran
radio, mengirim pesan melalui fitur live chat, atau melakukan request lagu[11]. Selanjutnya
sistem  memproses  permintaan  pengguna  dan  menyimpan  data  yang  diperlukan  ke  dalam
database. Administrator memiliki hak akses untuk mengelola data pengguna, jadwal siaran,
pesan  pendengar,  dan  request  lagu  melalui  dashboard  admin.  Setelah  proses  selesai
dilakukan, sistem menampilkan hasil sesuai dengan tindakan yang dipilih oleh pengguna[12].

3.3 class diagram

Class  Diagram  digunakan  untuk  menggambarkan  struktur  kelas  yang  terdapat  pada
sistem  beserta  hubungan  antar  kelas.  Diagram  ini  memberikan  gambaran  mengenai  objek
yang  digunakan  dalam  sistem  serta  atribut  dan  metode  yang  dimiliki  oleh  masing-masing
kelas.

## IN-FEST 2026
Seminar Nasional Informatika – FTI UPGRIS
## Volume 2026

## 512

## ISSN. 2988-2451

Gambar 5. class diagram Sistem Streaming Radio Berbasis Web
Berdasarkan  Gambar 5,  sistem  terdiri  dari  beberapa  kelas  utama  yang  saling
berhubungan,  antara  lain  kelas  User,  Admin,  Chat,  RequestLagu,  dan  JadwalSiaran.  Kelas
User digunakan untuk menyimpan informasi pengguna yang mengakses sistem, sedangkan
kelas Admin digunakan untuk mengelola seluruh data yang terdapat pada sistem. Kelas Chat
berfungsi  untuk  menyimpan  pesan  yang  dikirim  oleh  pendengar  melalui  fitur  live  chat[13].
Kelas  RequestLagu  digunakan  untuk  mengelola  data  permintaan  lagu  dari  pendengar,
sedangkan kelas JadwalSiaran menyimpan informasi mengenai jadwal program siaran radio.
Hubungan  antar  kelas  memungkinkan  proses  pengelolaan  data  berjalan  secara  terintegrasi
sehingga mendukung operasional sistem streaming radio berbasis web[14].

## 3.4 Implementasi Sistem

Setelah tahap perancangan selesai dilakukan, sistem kemudian diimplementasikan ke
dalam  bentuk  aplikasi  web  yang  dapat  diakses  oleh  administrator  maupun  pendengar.
Beberapa tampilan utama hasil implementasi sistem ditunjukkan pada tabel.


(a) Halaman beranda

(b) Halaman streaming radio

(c) Halaman interaksi pendengar

(d) Dashboard administrator
Gambar 6. Hasil Implementasi sistem


## IN-FEST 2026
Seminar Nasional Informatika – FTI UPGRIS
## Volume 2026

## 513

## ISSN. 2988-2451
Gambar  4(a)  Menampilkan Halaman  beranda yang merupakan  halaman
pertama  yang  ditampilkan ketika pengguna mengakses website.  Halaman  ini  berisi
informasi umum mengenai radio, menu navigasi, jadwal siaran, dan tombol streaming
yang dapat digunakan untuk memutar siaran radio secara langsung.
Gambar 4(b) Menampilkan Halaman streaming yang berfungsi sebagai media
utama  bagi  pengguna  untuk  mendengarkan  siaran  radio  secara  online.  Pada
halaman ini tersedia media player yang terhubung langsung dengan server streaming
radio.
Gambar   4(c)   Menampilkan Halaman interaksi   pendengar,   Halaman ini
menyediakan formulir pengiriman pesan yang dapat digunakan oleh pendengar untuk
berinteraksi  dengan  penyiar.  Pesan  yang  dikirim  akan  tersimpan  ke  database  dan
dapat dilihat oleh administrator.
Gambar  4(d)  Menampilkan Dashboard  administrator,  Dashboard  tersebut
digunakan  untuk  mengelola  seluruh  data  yang  terdapat  pada  sistem.  Melalui
dashboard  ini  administrator  dapat  mengelola  jadwal  siaran,  data  pengguna,  dan
pesan pendengar.

## 4. Kesimpulan
Penelitian  ini  berhasil  mengembangkan  sistem  streaming  radio  berbasis  web  dengan
fitur interaksi pendengar secara real-time untuk Radio komersil. Sistem yang dibangun mampu
menyediakan layanan streaming audio, live chat, request lagu, dan dashboard administrator
dalam  satu  platform  terintegrasi.  Hasil  pengujian  menunjukkan bahwa seluruh  fungsi  utama
berjalan   dengan   baik   dan   dapat   mendukung   transformasi   digital   layanan   radio[15].
Pengembangan  lebih  lanjut  dapat  dilakukan  dengan  menambahkan  fitur  notifikasi  siaran
langsung, integrasi media sosial, serta aplikasi mobile untuk meningkatkan aksesibilitas dan
pengalaman pengguna.

## 5. Referensi

[1] H. Nindhasari, N. Fsm, and D. S. W, “Perkembangan Komunikasi Radio di Era Digital :
Tinjauan  Literatur  yang  Sistematis,”  vol.  5,  no.  2,  pp.  751–762,   2026,   doi:
## 10.54259/mukasi.v5i2.6356.
[2] P.  Teknologi  and  K.  Dan,  “Eksistensi  m-radio  terhadap  perkembangan  teknologi
komunikasi dan informasi,” pp. 174–183.
[3] M. Dhamayanti, P. Studi, I. Komunikasi, and U. B. Nusantara, “Meilani Dhamayanti
untuk mendapatkan hiburan maupun informasi . Karateristik radio yang akrab ( memiliki
kemunculan  media  televisi  membuat  radio  perlahan  tergeser  .  Kelebihan  visual
membuat,” vol. 3, pp. 82–89, 2019.
[4] I.  Santosa,  A.  M.  Aji,  D.  Kuswanto,  T.  Novianti,  and  R.  Irmawanto,  “Implementasi
Framework Laravel Untuk Pengembangan Website Radio SBFM Full Stack,” vol. 8, no.
## 01, 2025.
[5] I. Bukhari, M. I. Wahyuddin, and N. D. Nathasia, “Perancangan Sistem Informasi Radio
Online  Universitas  Nasional  Berbasis  Web,”  vol.  4,  pp.  715–725,   2020,   doi:
## 10.30865/mib.v4i3.2214.
[6] A. Trianasari, S. Zahwa, and P. Janriadi, “Perancangan Sistem Informasi Streaming
Radio  Berbasis  Website  Pada  Uvon  Radio  Jakarta  Dengan  Metode  RAD  (  Rapid
Application   Development   ),”   vol.   10,   no.   1,   pp.   27–38,     2026,     doi:
## 10.55886/infokom.v101.452.
[7] B. A. B. Ii and L. Teori, “Streaming Online,” pp. 9–24, 2012.
[8] U.  Promosi,  I.  Musik,  L.  Di,  and  K.  Kupang,  “Rancang  Bangun  Radio  Streaming
Berbasis Web Untuk Promosi Industri Musik Lokal Di Kota Kupang,” vol. 15, no. 01, pp.
## 1–7, 2025.
[9] “Journal Speed – Sentra Penelitian Engineering dan Edukasi – Volume 4 No 4 - 2012 -
ijns.org,” vol. 4, no. 4, pp. 47–55, 2012.

## IN-FEST 2026
Seminar Nasional Informatika – FTI UPGRIS
## Volume 2026

## 514

## ISSN. 2988-2451
[10] F.  W.  Christanto,  B.  V.  Christioko,  and  V.  Vydia,  “Teknologi  Open  Source  Radio
Streaming Berbasis Website dan Android,” vol. 6, no. 2, 2020.
[11] H.   V.   Hartanto,   K.   P.   Purnamasari,   F.   Teknologi,   R.   Website,   and   S.   Radio,
“IMPLEMENTASI METODE PROTOTYPE DALAM PENGEMBANGAN WEBSITE P a
g e 49 | 63,” vol. 2, no. 2, pp. 49–63, 2024.
[12] E. Editor and E. Emeritus, “Editorial Team,” pp. 0–3, 2027.
[13] N. Widyastuti, “Pengembangan Radio MBS 107 . 80 FM Berbasis Aplikasi Android,” vol.
1, no. 2, pp. 125–138, 2019.
[14] F. Nur, “Konvergensi media pada perkembangan radio komersial di Yogyakarta ( studi
kasus pada radio Geronimo FM dan radio Swaragama FM ),” no. September, pp. 90–
97, 2021, doi: 10.12928/commicast.v2i2.3350.
[15] W. Kustiawan, Y. P. Dinar, K. Salsabila, and T. Apsyara, “Strategi Penyiaran Radio
Komersial di Era Digitalisasi,” vol. 1, no. 3, 2024.