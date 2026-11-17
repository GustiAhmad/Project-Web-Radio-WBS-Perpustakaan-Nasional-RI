






Jurnal Komputer, Informasi dan Teknologi Vol: 5, No 1, 2025, Page: 1-15


https://penerbitadm.pubmedia.id/index.php/KOMITEK
## Rancang   Bangun   Aplikasi   Radio Online Universitas
## Muhammadiyah Sidoarjo Berbasis Web
## Andry Rachmadany
## 1
## *, Mochamad Nashrullah
## 2
## 1
## Universitas Muhammadiyah Sidoarjo
## 2
## Universitas Negeri Surabaya

Abstrak: Penelitian  ini  bertujuan  merancang dan  membangun  aplikasi  radio  online  berbasis  web  untuk  Universitas
Muhammadiyah Sidoarjo (UMSIDA) sebagai sarana penyebaran informasi, edukasi, dan hiburan bagi civitas akademika
serta  masyarakat  umum.  Pengembangan  aplikasi  dilakukan  dengan  pendekatan waterfall,  melalui  tahapan  analisis
kebutuhan,  desain  sistem,  implementasi,  dan  pengujian.  Teknologi  yang  digunakan  meliputi  HTML,  CSS,  JavaScript,
PHP, serta protokol streaming audio Icecast. Hasil pengujian menunjukkan bahwa aplikasi dapat berjalan dengan stabil
pada berbagai perangkat dan peramban, serta mampu melakukan siaran audio secara real-time dan terjadwal. Aplikasi ini
dinilai  mampu  menjadi  media  komunikasi  institusi  yang  representatif  dalam  mendistribusikan  konten  audio  secara
langsung dan efektif.
Kata kunci: Radio Online, Web Streaming, Media Digital, Rancang Bangun
Abstract: This research aims to design and build a web-based online radio application for
Universitas   Muhammadiyah   Sidoarjo   (UMSIDA)   as   a   means   of   disseminating
information, education, and entertainment for the academic community and the general
public.  Application  development  is  carried  out  with  a  waterfall  approach, through  the
stages  of  needs  analysis,  system  design,  implementation,  and  testing.  The  technologies
used include HTML, CSS, JavaScript, PHP, and Icecast audio streaming protocol. The
test results show that the application can run stably on various devices and browsers, and
is  able  to  broadcast  audio  in  real-time  and  scheduled.  This  application  is  considered
capable of becoming a representative institutional communication media in distributing
audio content directly and effectively.
## Keywords: Online Radio, Web Streaming, Digital Media, Design



## Pendahuluan
Radio merupakan salah satu media penyiaran yang memiliki sejarah panjang dalam
menyampaikan   informasi   kepada   publik.   Sebagai   media   berbasis   suara,   radio   telah
memainkan peran penting dalam menyampaikan berita, pendidikan, hiburan, dan dakwah
kepada  masyarakat  luas.  Prinsip  kerja  radio  didasarkan  pada  penggunaan  gelombang
elektromagnetik yang memancarkan sinyal audio melalui udara, kemudian ditangkap oleh
perangkat  penerima  dan  diubah  menjadi energi  bunyi  melalui  pengeras  suara.  Dalam
kehidupan  sehari-hari,  radio  digunakan  di  berbagai  sektor,  termasuk  pemerintahan,
pendidikan,  hingga  komunitas  lokal.  Namun,  di  tengah  kemajuan  teknologi  komunikasi
saat ini, fungsi radio konvensional mulai mengalami pergeseran. Hal ini disebabkan oleh
munculnya    berbagai    platform    digital    yang    menawarkan    kemudahan    akses    dan
## DOI:
https://doi.org/10.503697/jkomitek.v5i1.2
## 774
*Correspondence: Andry Rachmadany
Email:  rachmadany@umsida.ac.id

## Received: 25-04-2025
## Accepted: 25-05-2025
## Published: 25-06-2025

Copyright: ©    2025 by    the    authors.
Submitted  for  open  access  publication
under  the  terms  and  conditions  of  the
Creative  Commons  Attribution  (CC  BY)
license
## (http://creativecommons.org/licenses/by/
## 4.0/).

Jurnal Komputer, Informasi dan Teknologi Vol: 5, No 1, 2025 2 of 16


https://penerbitadm.pubmedia.id/index.php/KOMITEK
interaktivitas lebih tinggi. Generasi muda sebagai pengguna dominan media saat ini lebih
memilih  platform  yang  fleksibel,  dapat  diakses  melalui internet,  dan  kompatibel  dengan
perangkat mobile. Akibatnya, eksistensi radio analog menghadapi tantangan serius dalam
mempertahankan daya tariknya di era digital.
Transformasi  digital  telah  mendorong  perubahan  mendasar  dalam  cara  masyarakat
mengonsumsi informasi. Salah satu wujud transformasi tersebut adalah kemunculan radio
online yang memanfaatkan jaringan internet untuk menyampaikan siaran audio. Berbeda
dengan radio tradisional yang terbatas oleh jangkauan frekuensi dan perangkat penerima,
radio online dapat diakses secara global selama pengguna terhubung dengan internet. Hal
ini  membuka  peluang  baru  bagi  institusi,  komunitas,  dan  individu  untuk  memproduksi
dan mendistribusikan konten audio secara mandiri tanpa memerlukan infrastruktur siaran
konvensional.  Selain  itu,  radio  online  memungkinkan  personalisasi  konten  dan  jadwal
siaran yang lebih fleksibel. Berdasarkan penelitian Sulistyowati (2022), radio daring terbukti
meningkatkan jangkauan dan interaksi dengan pendengar, terutama di kalangan generasi
muda.  Namun  demikian,  implementasi  radio  online  di  lingkungan  institusi  pendidikan
masih  belum  optimal  dan  cenderung  terbatas  pada  lembaga  berskala  nasional  atau
universitas besar di kota-kota besar. Hal ini menunjukkan adanya celah penelitian dalam
konteks pengembangan radio online berbasis web di lingkungan perguruan tinggi swasta
seperti Universitas Muhammadiyah Sidoarjo (UMSIDA).
Dalam  konteks  perguruan  tinggi,  penyebaran  informasi  dan  penguatan  identitas
institusi menjadi aspek penting yang mendukung eksistensi dan reputasi kampus. Kegiatan
akademik, non-akademik, hingga kebijakan kampus memerlukan media komunikasi yang
dapat  menjangkau  seluruh  sivitas  akademika  secara  efektif.  Penggunaan  radio  online
berbasis web menjadi salah satu alternatif yang menjanjikan karena bersifat fleksibel, hemat
biaya,  dan  mudah  diintegrasikan  dengan  sistem  teknologi  informasi  kampus  yang  telah
ada. Di samping itu, media ini juga membuka ruang bagi mahasiswa untuk berkontribusi
secara  aktif  dalam  produksi  konten  audio,  seperti  berita  kampus,  program  edukasi,  dan
hiburan  kreatif.  Dengan  demikian,  radio  online  tidak  hanya  berfungsi  sebagai  kanal
informasi  satu  arah,  tetapi  juga  sebagai  sarana  partisipasi  dan  pembelajaran  praktis  bagi
mahasiswa.  Hal  ini  selaras  dengan  kebutuhan institusi  dalam  menumbuhkan  budaya
literasi  digital  dan  komunikasi  publik  di  kalangan  civitas  akademika.  Oleh  karena  itu,
pengembangan  media  penyiaran  berbasis  web  menjadi  relevan  untuk  dilakukan  sebagai
upaya penguatan peran institusi dalam ekosistem digital.
Penelitian  ini  secara  khusus  bertujuan  untuk  merancang  dan  membangun  aplikasi
radio  online  berbasis  web  yang  dapat  digunakan  oleh  UMSIDA.  Aplikasi  ini  dirancang
untuk  menyiarkan  konten  audio  secara  langsung  (live  streaming)  maupun  terjadwal,
dengan  mengedepankan  kemudahan  akses  dan  kenyamanan  pengguna.  Pengembangan
dilakukan  menggunakan  teknologi  HTML,  CSS,  JavaScript,  dan  PHP,  dengan  dukungan
protokol  streaming  audio  Icecast  yang  memungkinkan  siaran  berjalan  secara  real-time.
Selain itu, fitur-fitur pendukung seperti antarmuka pengguna responsif, halaman playlist,
login  pengguna,  dan  pengelolaan  konten  disediakan  untuk  meningkatkan  fungsionalitas
sistem. Fokus utama dari desain sistem adalah menjamin kestabilan performa di berbagai
jenis  perangkat  dan browser,  agar  aplikasi  dapat  digunakan  secara  luas  tanpa  kendala
teknis  yang  berarti.  Dengan  pendekatan  ini,  aplikasi  diharapkan  tidak  hanya  dapat

Jurnal Komputer, Informasi dan Teknologi Vol: 5, No 1, 2025 3 of 16


https://penerbitadm.pubmedia.id/index.php/KOMITEK
dimanfaatkan oleh sivitas akademika, tetapi juga menjangkau masyarakat umum sebagai
bagian  dari  kontribusi  institusi  dalam  penyebaran  pengetahuan  dan  informasi  publik.
Proses pengujian dilakukan secara menyeluruh untuk memastikan kelayakan operasional
aplikasi di lingkungan kampus.
Secara fungsional, pengembangan aplikasi ini mendukung integrasi antara teknologi
informasi dan aktivitas penyiaran kampus. Aplikasi ini dapat diakses melalui web browser
tanpa  perlu  instalasi  aplikasi  tambahan,  menjadikannya  mudah  digunakan  oleh  semua
kalangan.  Selain  itu,  kemudahan  ini  memungkinkan  kampus  menjadwalkan  berbagai
program audio, mulai dari pengumuman akademik, siaran keagamaan, talkshow edukatif,
hingga  hiburan  mahasiswa.  Pendekatan  desain  antarmuka  responsif  yang  diterapkan
menjadikan  tampilan  sistem  tetap  optimal  di  berbagai  ukuran  layar  perangkat.  Hal  ini
penting mengingat kebanyakan pengguna saat ini mengakses informasi melalui perangkat
mobile.  Dengan  keberhasilan  implementasi  tersebut,  aplikasi  ini  dapat  menjadi  prototipe
sistem komunikasi digital kampus berbasis suara yang dapat direplikasi oleh institusi lain.
Penelitian  ini  juga  memberikan  contoh  praktik  pengembangan  aplikasi  berbasis  web
dengan pendekatan sederhana, efisien, dan fungsional yang dapat dijadikan rujukan bagi
pengembang sistem informasi kampus lainnya.
Dari    sisi    manfaat,    aplikasi    radio    online    ini    membuka    peluang    baru    bagi
pengembangan media kampus yang lebih dinamis dan interaktif. Sivitas akademika dapat
memanfaatkan  platform  ini  sebagai  sarana  penyebaran  gagasan,  kampanye  sosial,  atau
penguatan  nilai-nilai  keislaman  dan  kemuhammadiyahan.  Bagi  mahasiswa,  platform  ini
dapat  menjadi  media  praktik  komunikasi,  penyiaran,  dan  pengembangan  kreativitas
konten   audio.   Hal   ini   sejalan   dengan   semangat   Merdeka   Belajar   yang   mendorong
mahasiswa  untuk  belajar  di  luar  kelas  dan  menghasilkan  karya  nyata  yang  bernilai
edukatif. Bagi dosen, aplikasi ini juga dapat digunakan untuk menyampaikan materi atau
inspirasi  keilmuan  dalam  bentuk  narasi  suara.  Dengan  kata  lain,  aplikasi  ini  memiliki
potensi  untuk  mengintegrasikan  fungsi  edukatif,  informatif,  dan  rekreatif  dalam  satu
media.  Secara  kelembagaan,  radio  online  berbasis  web  ini  juga  memperkuat  branding
institusi  di  dunia  digital,  sekaligus  meningkatkan  citra  kampus  sebagai  lembaga  yang
adaptif terhadap perkembangan teknologi informasi.
Penelitian  sebelumnya  telah  banyak  membahas  aspek  teknis  pengembangan  radio
online maupun dampaknya terhadap perilaku media pengguna, namun masih sedikit yang
mengkaji penerapannya dalam konteks institusi pendidikan swasta skala menengah. Studi
oleh Setiawan dan Wulandari (2021) misalnya, menyoroti pentingnya pemanfaatan media
digital    untuk    mendukung    komunikasi    kampus,    tetapi    belum    menyentuh    pada
implementasi  teknis  sistem  siaran  berbasis  web  yang  mandiri  dan  terintegrasi.  Dengan
demikian,  penelitian  ini  memiliki  kontribusi  teoritis  dan  praktis  yang  signifikan  dalam
pengembangan  media  digital  kampus,  khususnya  dalam  bidang  teknologi  informasi
pendidikan   dan   komunikasi   digital.   Kebaruan   dari   penelitian   ini   terletak   pada
penggabungan   antara   pendekatan   teknis   pengembangan   sistem   dengan   orientasi
kelembagaan  pendidikan  tinggi  yang  aplikatif  dan  kontekstual.  Selain  itu,  penelitian  ini
juga memberikan solusi nyata yang dapat langsung dimanfaatkan dan dikembangkan lebih
lanjut oleh institusi.

Jurnal Komputer, Informasi dan Teknologi Vol: 5, No 1, 2025 4 of 16


https://penerbitadm.pubmedia.id/index.php/KOMITEK
Sebagai   penutup,   penelitian   ini   menawarkan   kontribusi   strategis   bagi   institusi
pendidikan  dalam  mengembangkan  kanal  komunikasi  berbasis  suara  yang  fleksibel,
efisien,  dan  luas  jangkauannya.  Dengan  membangun  aplikasi  radio  online  berbasis  web
untuk  UMSIDA,  penelitian  ini  menjawab  tantangan  transformasi  media  konvensional  ke
digital  yang  belum  banyak  disentuh  di  lingkungan  kampus  swasta.  Penelitian  ini  juga
menunjukkan  bahwa  dengan  pendekatan  teknologi  yang  tepat  dan  perencanaan  sistem
yang  matang,  institusi  pendidikan  dapat  membangun  media  internal  yang  kuat  dan
mandiri.  Aplikasi  ini  diharapkan  menjadi  tonggak  awal  pengembangan  media  kampus
berbasis  digital  yang  inklusif,  adaptif,  dan  mendukung  peningkatan  literasi  informasi  di
lingkungan  akademik.  Oleh  karena  itu,  penelitian  ini  tidak  hanya  bersifat  teknis  semata,
tetapi  juga  strategis  dan  visioner  dalam  mendorong  digitalisasi  komunikasi  kampus.
Dengan demikian, tujuan utama dari penelitian ini adalah menghadirkan media penyiaran
berbasis   web   yang   fungsional,   representatif,   dan   memiliki   dampak   nyata   dalam
mendukung transformasi digital institusi pendidikan tinggi.
## Metodologi
Dalam   pengembangan   aplikasi   ini,   digunakan   Icecast   sebagai   perangkat   lunak
streaming radio freeware yang mendukung siaran audio secara real-time melalui internet.
Icecast dipilih karena bersifat open-source, ringan, dan kompatibel dengan berbagai format
audio serta platform. Metode yang digunakan dalam penelitian ini adalah tahapan metode
water   fall   yang   ditunjukkan   pada   gambar   1. Penggunaan   model waterfall dalam
pengembangan  aplikasi  sistem  informasi  dinilai  efektif  karena  menyediakan  pendekatan
yang   sistematis   dan   terstruktur   melalui   tahapan   analisis   kebutuhan,   perancangan,
implementasi,  pengujian,  dan  pemeliharaan.  Model  ini  sangat  sesuai  diterapkan  pada
proyek  dengan  kebutuhan  yang  jelas  dan tidak  berubah  secara  dinamis  selama  proses
pengembangan,  seperti  pada  pengembangan  aplikasi  radio  online  berbasis  web  untuk
lingkungan  institusi  pendidikan.  Pendekatan  ini  telah  terbukti  mampu  meningkatkan
efisiensi  proses  pembangunan  sistem  serta  meminimalisasi  kesalahan  dalam  pengolahan
data dan perancangan antarmuka pengguna (Achyani & Saumi, 2019).
Waterfall dengan tahapan sebagai berikut:
A. Analisis kebutuhan: Identifikasi kebutuhan fungsional dan non-fungsional aplikasi.
B. Perancangan sistem: Desain antarmuka, arsitektur sistem, dan alur streaming audio.
C. Implementasi: Penggunaan HTML, CSS, JavaScript, PHP, dan server streaming Icecast.
D. Pengujian: Uji fungsionalitas dan kompatibilitas lintas perangkat dan browser.
## Tahapan Metode Waterfall
















## Analisis Kebutuhan
## Perancangan Sistem
## Implementasi
## Pengujian

Jurnal Komputer, Informasi dan Teknologi Vol: 5, No 1, 2025 5 of 16


https://penerbitadm.pubmedia.id/index.php/KOMITEK


## Gambar 1. Tahapan Metode Waterfall
## Streaming
Streaming audio adalah proses pengiriman data audio secara kontinu melalui jaringan
internet,  sehingga  pengguna  dapat  mendengarkan  siaran  secara  langsung  tanpa  perlu
mengunduh  seluruh  file  terlebih  dahulu.  Teknologi  ini  sangat  cocok  digunakan  dalam
aplikasi  radio online karena  mampu  memberikan  pengalaman  mendengarkan  secara real-
time. Dengan memanfaatkan streaming, konten audio dapat dikirim dari server ke pengguna
secara efisien dan responsif.
## Icecast
Dalam   penelitian   ini,   digunakan   Icecast   sebagai   solusi   utama   dalam   penyiaran
streaming.   Icecast   merupakan   perangkat   lunak   server streaming open-source   yang
mendukung protokol HTTP, SHOUTcast, dan format audio seperti MP3 dan Ogg Vorbis.
Icecast bekerja dengan cara menerima input audio, lalu mendistribusikan siaran tersebut ke
klien melalui URL streaming yang dapat diakses pengguna melalui browser
## Diagram Alur Perancangan Radio Streaming
Agar tercapainya sistem yang bagus, diperlukan tahapan penelitian supaya penelitian
ini   menjadi   sistematis.   Diagram   alur   perancangan   radio streaming berfungsi   untuk
menggambarkan  proses  kerja  sistem  secara  menyeluruh,  mulai  dari input audio  oleh
penyiar  hingga  diterimanya  siaran  oleh  pendengar  melalui  browser yang  digambarkan
pada gambar 2.


Jurnal Komputer, Informasi dan Teknologi Vol: 5, No 1, 2025 6 of 16


https://penerbitadm.pubmedia.id/index.php/KOMITEK

Gambar 2. Flowchart alur perancangan radio streaming

## Arsitektur Sistem Radio Streaming
Sistem  ini  terdiri  dari  tiga  bagian  utama:  sumber  audio  (encoder),  server streaming
(Icecast),  dan  klien  pengguna  (web  player).  Sumber  audio  berasal  dari studio  siaran  yang
menggunakan  perangkat  lunak  encoder  seperti  BUTT  atau  Mixxx  untuk  mengirimkan
aliran   audio   ke   server.   Server   Icecast   kemudian   bertindak   sebagai   perantara   yang
mendistribusikan  siaran  ke  pengguna  akhir  melalui  protokol  HTTP, Arsitektur  Sistem
Radio Streaming digambarkan pada gambar 3. Pengguna dapat mengakses siaran melalui
browser yang telah diintegrasikan dengan pemutar audio berbasis HTML5. Arsitektur ini
dirancang  agar  fleksibel,  ringan,  dan  mampu  menjangkau  banyak  pengguna  secara
bersamaan tanpa mengorbankan kualitas audio.














## Mulai

## Identifikasi Masalah

## Studi Literatur

## Analisis Kebutuhan

## Perancangan Sistem

## Pengujian

## Implementasi

## Selesai


Jurnal Komputer, Informasi dan Teknologi Vol: 5, No 1, 2025 7 of 16


https://penerbitadm.pubmedia.id/index.php/KOMITEK

## Gambar 3. Arsitektur Sistem Radio Streaming
Hasil dan Pembahasan
Hasil   pengembangan   aplikasi   radio   online   berbasis   web   untuk   Universitas
Muhammadiyah  Sidoarjo  menunjukkan  keberhasilan  implementasi  sistem siaran  daring
yang  responsif,  stabil,  dan  mudah  diakses.  Sistem  ini  dirancang  menggunakan  model
waterfall yang telah terbukti efektif dalam berbagai pengembangan perangkat lunak serupa
(Achyani  &  Saumi,  2019).  Penggunaan  protokol  Icecast  memungkinkan  penyiaran  audio
real-time  tanpa  lag  yang  berarti,  sebagaimana  juga  ditunjukkan  dalam  penelitian  oleh
Nugraha  dan  Munir  (2020)  mengenai  streaming  audio  di  lingkungan  kampus.  Selain  itu,
aspek  kompatibilitas  diuji  pada  berbagai  peramban  dan  perangkat,  menunjukkan bahwa
sistem  mampu  berjalan  optimal  baik  di  desktop  maupun  perangkat  seluler.  Pengujian
dilakukan  dengan  metode  blackbox  dan  user  testing,  menunjukkan  bahwa  seluruh  fitur
dapat  diakses  dan  berfungsi  dengan  benar.  Ini  memperkuat  temuan  Marlinah  dan  Sari
(2021)  bahwa  antarmuka  sederhana  berbasis   web  dapat   meningkatkan  kenyamanan
pengguna lintas perangkat.
Aplikasi  ini  terdiri  atas  beberapa  halaman  utama  yang  dirancang  sesuai  kebutuhan
fungsional pengguna dan administrator. Fitur-fitur seperti halaman pengguna (user), login
admin,   dashboard   siaran,   playlist,   dan   katalog   musik   diimplementasikan   dengan
pendekatan UI/UX yang mengacu pada prinsip mobile-first design (Setiawan & Wulandari,
2021).  Sebagaimana  dibahas  oleh  Arifin  dan  Nugroho  (2022),  kejelasan  navigasi  dan

Jurnal Komputer, Informasi dan Teknologi Vol: 5, No 1, 2025 8 of 16


https://penerbitadm.pubmedia.id/index.php/KOMITEK
konsistensi visual merupakan elemen penting dalam meningkatkan keterlibatan pengguna
pada  aplikasi  web  edukatif.  Dalam  penelitian  ini,  pemutar  audio  ditanamkan  secara
langsung pada halaman utama pengguna sehingga memudahkan akses siaran tanpa login.
Sistem juga menyediakan ruang interaksi berupa fitur pesan singkat (chatroom) yang secara
fungsional  mendekati  konsep  interaktivitas  radio  digital  dalam  studi  oleh  Wahyuni  dan
## Setyawan (2020).
Halaman   dashboard   memberikan   fleksibilitas   kepada   admin   untuk   mengatur
jalannya siaran, termasuk memilih lagu berikutnya, menghentikan lagu, serta melihat status
siaran  secara  real-time.  Integrasi  antara  halaman  musik  dan  playlist  mempermudah
pengaturan  jadwal  konten  yang  akan  diputar,  mendekati  sistem  otomatisasi  radio  yang
dibahas dalam penelitian oleh Sudarsono dan Mardiana (2023). Seluruh entri musik dapat
ditambahkan,  diedit,  maupun  dihapus  melalui  sistem  berbasis  tabel  yang  dilengkapi
dengan kontrol CRUD (Create, Read, Update, Delete). Fitur ini juga menyesuaikan dengan
prinsip  efisiensi  manajemen  konten  berbasis  web  sebagaimana  direkomendasikan  oleh
Fatoni dan Aditya (2019) dalam pengembangan sistem manajemen media digital kampus.
Dengan demikian, aplikasi tidak hanya menjadi sarana distribusi konten audio, tetapi juga
berfungsi sebagai alat manajemen penyiaran kampus yang profesional dan berkelanjutan.
Secara keseluruhan, implementasi sistem ini menunjukkan bahwa media radio online
berbasis   web   dapat   menjadi   solusi   strategis   untuk   penguatan   komunikasi   institusi
pendidikan. Selain mendukung penyebaran informasi internal kampus secara luas, sistem
ini juga membuka ruang kolaboratif bagi mahasiswa untuk memproduksi konten, belajar
penyiaran, dan mengembangkan soft skill dalam literasi digital (Rakhmawati & Iskandar,
2022).  Kebaruan  dari  penelitian  ini  terletak  pada  integrasi  antarmuka  siaran  langsung
dengan   sistem   pengelolaan   konten   berbasis   jadwal   yang   dirancang   khusus   untuk
kebutuhan   lembaga   pendidikan   tinggi   berbasis   nilai   Islam.   Hasil   ini   memperkuat
pentingnya  pengembangan  media  digital  institusi  sebagai  bentuk  adaptasi  terhadap
transformasi digital pendidikan di era pascapandemi.
## Halaman Pengguna
Halaman  pengguna  dirancang  dengan  antarmuka  responsif  yang  memprioritaskan
kemudahan  akses  pada  berbagai ukuran  layar,  baik  desktop  maupun  perangkat  mobile.
Desain  ini  mengusung  pendekatan mobile-first untuk  mempercepat  waktu  muat  dan
meningkatkan  kenyamanan  navigasi  pengguna  secara  keseluruhan.  Studi  menunjukkan
bahwa  penggunaan  desain  web  responsif  dapat  meningkatkan  keterlibatan  pengguna
karena  konten  ditampilkan  sesuai  ukuran  layar  mereka.  Selain  itu,  pola  layout  yang  rapi
dan penggunaan elemen visual sederhana membantu memastikan bahwa pengguna baru
maupun awam dapat langsung berinteraksi tanpa hambatan belajar aplikasi baru.
Dalam  halaman  ini,  pemutar  audio  diintegrasikan  secara  langsung  dengan  server
Icecast   untuk   menyediakan   layanan   streaming real-time.   Pengguna   dapat   langsung
mendengarkan  siaran  tanpa  harus  login  atau  memasang  aplikasi  tambahan—fitur  yang
terus mendorong kemudahan akses dan efisiensi penggunaan. Hal ini sejalan dengan hasil
penelitian  tentang  implementasi  pemutar  audio  berbasis  web  dalam  konteks  pendidikan
tinggi yang menyatakan bahwa pengguna lebih terlibat secara pasif maupun aktif saat akses

Jurnal Komputer, Informasi dan Teknologi Vol: 5, No 1, 2025 9 of 16


https://penerbitadm.pubmedia.id/index.php/KOMITEK
siaran  audio  dibuat  sesederhana  mungkin .  Pengujian  penggunaan  nyata  menunjukkan
performa pemutar yang stabil, meskipun akses bersamaan dari banyak perangkat, berkat
protokol Icecast dan setup backend yang optimal.
Halaman  pengguna  juga  menghadirkan  fitur chat  room sebagai  sarana  interaksi
langsung antara pendengar dan penyiar selama siaran berlangsung. Fitur ini mendukung
komunikasi dua arah: pengguna dapat memberi komentar, pesan, atau kesan siaran secara
real-time, menciptakan atmosfer interaktif yang lebih menarik, ditunjukkan pada gambar
-  studi  lain  menemukan  bahwa  penggunaan live  chat meningkatkan  perasaan  dukungan
dan   keterlibatan   pengguna   dalam   konteks   pembelajaran   daring.   Dengan   demikian,
integrasi chat room dalam aplikasi radio online ini tidak hanya memperkuat aspek sosial
dari  siaran,  tetapi  juga  memperluas  fungsi  radio  sebagai  media  interaktif  yang  relevan
dengan kebutuhan pengguna masa kini.

## Gambar 4. Tampilan Halaman Pengguna
## Halaman Login
Halaman  login  berperan  sebagai  pintu  utama bagi  administrator  untuk  mengakses
fitur  manajemen  konten  dan  pengaturan  jadwal  siaran.  Proses  autentikasi  menggunakan
mekanisme  username  dan  password  yang  terenkripsi  untuk  menjaga  keamanan  data
pengguna   dan   mencegah   akses   tidak   sah.   Penggunaan   enkripsi saat   transmisi   dan
penyimpanan kata sandi telah terbukti dapat mengurangi risiko serangan seperti phishing
dan replay attack (Tan, Szalachowski, & Zhou, 2020)
Selain  itu,  sistem  autentikasi  ini  dirancang  sesuai  prinsip  usable  security,  yaitu
menggabungkan     keamanan     tinggi     dengan     kemudahan     penggunaan     sehingga
administrator dapat masuk tanpa mengalami kebingungan teknis (Salter & Schneier, 2004
sebagai dikutip oleh Renaud & Volkamer, 2014)
Untuk  memperkuat  keamanan,  implementasi  risk-based  authentication  (RBA)  juga
dipertimbangkan  dalam  pengembangan  lanjutan.  RBA  memantau  perilaku  login,  seperti
lokasi IP dan perangkat yang digunakan, serta memicu verifikasi tambahan jika mendeteksi

Jurnal Komputer, Informasi dan Teknologi Vol: 5, No 1, 2025 10 of 16


https://penerbitadm.pubmedia.id/index.php/KOMITEK
aktivitas   mencurigakan (Wiefling,   Dürmuth,   &   Lo   Iacono,   2020) . Pendekatan   ini
menawarkan  tingkat  keamanan  yang  setara  dengan  autentikasi  dua  faktor,  namun  lebih
mudah bagi pengguna karena hanya memperlakukan situasi login yang tidak biasa secara
khusus.   Dengan   demikian,   sistem   login   tetap   ramah   penggunaan,   tetapi   mampu
menyesuaikan gaya proteksi sesuai konteks risiko.
Dari  sudut  antarmuka,  halaman  login  dirancang  dengan  tata  letak  sederhana —
formulir  login  di  tengah  halaman,  indikasi  status  error  yang  jelas  tanpa  membocorkan
informasi sensitif (seperti memisalkan “Username atau password salah”), serta penggunaan
protokol  HTTPS  untuk  enkripsi  komunikasi.  Penelitian  tentang  usable  authentication
menunjukkan   bahwa   desain   yang   transparan,   feed-back   real-time,   dan   penggunaan
protokol aman merupakan komponen penting untuk memperoleh tingkat kepercayaan dan
kemudahan  pengguna  yang  seimbang  (Bonneau  et  al.,  2012) .  Dengan  desain  tersebut,
halaman login tidak hanya aman secara teknis, tetapi juga memberikan pengalaman masuk
yang lancar bagi administrator, tampilan halaman login bisa dilihat pada gambar 5.


## Gambar 5. Tampilan Halaman Login




## Halaman Dashboard
Pada halaman dashboard, admin mendapatkan akses penuh untuk memantau musik
apa  yang  sedang  diputar  dan  didengarkan  secara  real-time  oleh  pengguna  melalui  web.
Informasi ini disajikan secara visual, memungkinkan admin melihat judul lagu, penyanyi,
dan  durasi  siaran  saat  ini,  sehingga  memudahkan  pengawasan  jalannya  siaran.  Hal  ini
sesuai  dengan  rekomendasi  desain  dashboard  interaktif  yang  menyatakan  bahwa  akses
visual terhadap data real-time meningkatkan efisiensi pengambilan keputusan (Bach et al.,
2022).   Dengan   antarmuka   yang   dirancang   berdasarkan   pattern   dashboard   analitik,

Jurnal Komputer, Informasi dan Teknologi Vol: 5, No 1, 2025 11 of 16


https://penerbitadm.pubmedia.id/index.php/KOMITEK
informasi  menjadi  jelas  dan  mudah  dipahami  oleh  admin  tanpa  perlu  pelatihan  khusus
serta mendukung kontrol berbasis visual.
Selain  itu,  dashboard  dilengkapi  tombol  kendali  pemutar,  yang  memungkinkan
admin  mengganti  lagu  ke  track  berikutnya,  kembali  ke  track  sebelumnya,  ataupun
menghentikan  siaran  secara  langsung  dari  daftar  lagu  yang  sudah  ditetapkan.  Fungsi
kontrol  ini  dibuat  seintuitif  mungkin,  dengan  ikon  yang  familiar  dan  responsif  terhadap
interaksi klik atau sentuhan. Pendekatan ini sejalan dengan temuan dalam studi UX pada
aplikasi musik yang menekankan pentingnya akses cepat dan kontrol langsung atas konten
pemutaran (Choi, Shin, Joung, Lee, & Lee, 2023). Evaluasi antarmuka menunjukkan bahwa
tombol  kontrol  mudah  digunakan,  bahkan  saat  admin  mengakses  dashboard  melalui
perangkat mobile, mendukung fleksibilitas pengelolaan siaran kapan saja.
Integrasi  fitur  pengendalian  ini  dalam  satu  halaman  menjadikan  dashboard  sebagai
pusat  kendali  yang  komprehensif  dan  efisien.  Admin  tidak  perlu  berpindah  ke  halaman
lain  untuk  mengatur  siaran  berjalan,  sehingga  mengurangi  waktu  interaksi  dan  potensi
gangguan   saat   siaran   berlangsung.   Menurut   Nguyen   et   al.   (2025),   dashboard   yang
menyatukan  kontrol,  monitoring,  dan  akses  konten  dalam  satu  layar  interaktif  mampu
meningkatkan   produktivitas   pengguna   karena   mengurangi   beban   kognitif.   Dengan
demikian, desain dashboard ini tidak hanya memenuhi aspek fungsionalitas teknis, tetapi
juga  mencerminkan  pendekatan  efektif  dalam  pengelolaan  konten  audio  berbasis  web
untuk institusi pendidikan, tampilan dapat dilihat pada gambar 6.


## Gambar 6. Tampilan Halaman Dashboard
## Halaman Music
Halaman Music dirancang sebagai pusat informasi katalog lagu yang siap disiarkan
melalui platform radio online, dengan tampilan yang ditata dalam bentuk tabel responsif.
Tabel  ini  menyajikan  informasi  penting  seperti  judul  lagu,  nama  penyanyi,  dan  durasi.
Desain  antarmuka  mengikuti  prinsip  data  table  interaction,  yaitu  memadukan  struktur
hierarkis dan kemudahan navigasi. Pendekatan ini mengacu pada studi oleh Renda, Grasso,
dan  Daquino  (2023),  yang  menekankan  pentingnya  visualisasi  katalog  lagu  berbasis
metadata untuk mendukung pengalaman pengguna dalam sistem distribusi konten digital

Jurnal Komputer, Informasi dan Teknologi Vol: 5, No 1, 2025 12 of 16


https://penerbitadm.pubmedia.id/index.php/KOMITEK
berbasis   musik.   Gambar   6   menunjukkan   tampilan   halaman   ini   yang   mendukung
pengalaman  admin  dalam  melihat,  memilih,  atau  mencari  lagu  berdasarkan  atribut yang
tersedia.
Fitur CRUD   (Create,   Read,   Update,   Delete) yang   ditanamkan   memungkinkan
administrator  menambah,  mengedit,  atau  menghapus  entri  lagu  secara  langsung  dari
halaman  ini.  Komponen  ini  penting  untuk  menjaga  integritas  dan  kelengkapan  katalog
lagu, terutama untuk kebutuhan siaran terjadwal. Hsiao et al. (2022) dalam penelitiannya
menyatakan   bahwa   penggunaan   antarmuka   CRUD   berbasis   web   dengan   dukungan
validasi input dan umpan balik real-time sangat meningkatkan efisiensi operasional dalam
sistem pengelolaan media. Setiap interaksi pada form dilengkapi dengan konfirmasi visual
dan sistem validasi untuk memastikan data tersimpan sesuai standar.
Halaman ini juga dilengkapi fitur pencarian dan filter berbasis kolom (misalnya, filter
berdasarkan  penyanyi, genre,  atau  kata  kunci),  yang  memungkinkan  admin  menelusuri
katalog secara cepat. Fitur pencarian real-time ini sejalan dengan temuan Chen dan Golan
(2021), yang menunjukkan bahwa antarmuka pencarian berbasis filter dapat meningkatkan
efisiensi  navigasi  konten  digital  hingga  35% dibandingkan  dengan  metode  konvensional.
Dengan  demikian,  halaman  Music  tidak  hanya  menjadi  pusat  informasi,  tetapi  juga  alat
manajemen  konten  siaran  yang  efisien  dan  modern,  menunjang  operasional  radio  online
secara profesional.

## Gambar 7. Tampilan Halaman Music
## Halaman Playlist
Halaman playlist (Gambar 7) menampilkan integrasi antara jadwal siaran dan daftar
lagu yang diputar, serta dirancang untuk memudahkan administrator dalam perancangan
program siaran. Dengan tata letak berbasis tabel yang jelas dan hierarki visual yang logis,
admin  dapat  melihat  urutan,  waktu  siaran,  dan  konten  lagu  dengan  satu  tampilan.
Penelitian   Lundström   (2025)   tentang   desain   playlist   di   aplikasi   musik   streaming
menekankan  bahwa  hierarki  visual  dan  kontrol  pengguna  yang  intuitif  secara  signifikan
meningkatkan kemudahan pengelolaan playlist.

Jurnal Komputer, Informasi dan Teknologi Vol: 5, No 1, 2025 13 of 16


https://penerbitadm.pubmedia.id/index.php/KOMITEK
Fitur  penjadwalan  memungkinkan  admin  menetapkan  kapan  dan  urutan  playlist
akan diputar secara otomatis selama siaran berlangsung. Hal ini mereplikasi konsep smart
scheduling   yang   dipakai   dalam   sistem   digital   signage   dan   radio   yang   telah   diuji
keberhasilannya  dalam  memastikan  konten  tersampaikan  tepat  waktu .  Interface  tersebut
memudahkan drag‑and‑drop atau pemilihan waktu siaran, lengkap dengan tanda visual
waktu aktif playlist, sehingga fungsi ini menjadi pusat kendali operasi siaran tersentralisasi.
Dari  sudut  usability,  desain  halaman  playlist  mengedepankan  prinsip  antarmuka
pengguna berbasis web responsif yang dapat digunakan pada perangkat mobile maupun
desktop.   Menurut   laporan   Alqurni   (2022)   mengenai   evaluasi   antarmuka   elearning,
penggunaan  layout  responsif  dan  kontrol  interaktif  pada  tabel  dapat  meningkatkan
efektivitas  penggunaan  hingga  40 % . Hal  ini  menegaskan  bahwa  fitur  playlist  ini  bukan
hanya memenuhi kebutuhan administrasi teknis, tetapi juga menjaga standar kenyamanan
dan produktivitas bagi pengguna sistem.


## Gambar 8. Tampilan Halaman Jadwal Playlist
Pada  daftar playlist urutan  waktu  siaran,  administrator  dapat  mengetahui  program
yang  sedang atau  akan  disiarkan.  Informasi  yang  ditampilkan  meliputi  nama  program,
waktu tayang, serta lagu-lagu yang termasuk dalam sesi tersebut. Dengan integrasi antara
data  musik  dan  jadwal  siaran,  halaman  ini  menjadi  pusat  kendali  penyiaran  yang  efisien
dan terstruktur, tampilan halaman playlist dapat dilihat pada gambar 8.

Jurnal Komputer, Informasi dan Teknologi Vol: 5, No 1, 2025 14 of 16


https://penerbitadm.pubmedia.id/index.php/KOMITEK

## Gambar 9. Tampilan Daftar Lagu Playlis
## Simpulan
Aplikasi  radio online berbasis  web  untuk  UMSIDA  berhasil  dibangun  dan  berjalan
sesuai kebutuhan. Aplikasi ini mendukung penyiaran audio real-time, mudah diakses, dan
ramah   pengguna.   Keberhasilan   pengembangan   ini   menunjukkan   bahwa   teknologi
streaming audio  seperti  Icecast  sangat  layak  digunakan  dalam  lingkungan  pendidikan
sebagai media siaran informasi dan hiburan.
Melalui  perancangan  antarmuka yang  responsif  serta  dukungan  fitur-fitur  seperti
halaman user,  login,  playlist,  dan  daftar  musik,  aplikasi  ini  mampu  memenuhi  aspek
fungsionalitas  dan  kenyamanan  penggunaan.  Pengujian  sistem  menunjukkan  stabilitas
performa  aplikasi  di  berbagai  perangkat  dan browser,  membuktikan  kelayakan  aplikasi
untuk dioperasikan secara luas.
Untuk  pengembangan  di  masa  mendatang,  aplikasi  ini  dapat  ditingkatkan  dengan
fitur-fitur  interaktif  seperti  komentar  siaran,  integrasi  media  sosial,  statistik  pendengar,
serta   penyimpanan   siaran   (on-demand).   Selain   itu,   perlu   dilakukan   evaluasi   berkala
terhadap  pengalaman  pengguna  agar  aplikasi  dapat  terus  berkembang  dan  memberikan
manfaat optimal bagi sivitas akademika UMSIDA dan masyarakat umum.
Untuk penelitian selanjutnya, disarankan untuk mengeksplorasi integrasi kecerdasan
buatan   (AI)   dalam   aplikasi   radio   online,   seperti   fitur   rekomendasi   konten   berbasis
preferensi   pengguna   atau   analisis   sentimen   dari   komentar   pendengar.   Selain   itu,
pengembangan  dapat  difokuskan  pada  aspek  keamanan  data  pengguna  dan  optimalisasi
bandwidth untuk siaran berkualitas tinggi di area dengan koneksi internet terbatas. Secara
praktis,  pengelola  institusi  dapat  membentuk  tim  siaran  mahasiswa  lintas  prodi  guna
memproduksi konten yang relevan dan edukatif secara berkala, serta menjadikan aplikasi
ini  sebagai  bagian  dari  strategi  komunikasi  kampus  yang  lebih  luas,  termasuk  untuk
promosi institusi dan penyebaran nilai-nilai kampus secara digital.



Jurnal Komputer, Informasi dan Teknologi Vol: 5, No 1, 2025 15 of 16


https://penerbitadm.pubmedia.id/index.php/KOMITEK
## Daftar Pustaka
Achyani,  Y.  E.,  &  Saumi,  S.  (2019).  Penerapan  metode  waterfall  pada  sistem  informasi
manajemen  buku  perpustakaan  berbasis  web. Jurnal  Teknik  Komputer, 4(1),  83–94.
STMIK Palangka Raya.
Ajisafe, I. O. (2021). Radio as a Tool for National Development.
https://doi.org/10.9734/AJESS/2021/V14I330354
Alqurni,    J.    S.    (2022).    Evaluating    the    User    Interface    and    Usability    Approaches
for E‑Learning Systems.  International  Journal  of  Information  Technology  and  Web
Engineering, 18(1). https://doi.org/10.4018/IJITWE.333638
Aprilani, A. (2011). Radio Internet dalam Perspektif Determinisme Teknologi.
https://doi.org/10.24329/ASPIKOM.V1I2.15
Arifin,   M.,   &   Nugroho,   A.   (2022).   Pengaruh   desain   antarmuka   terhadap   kepuasan
pengguna dalam aplikasi edukatif berbasis web. Jurnal Sistem Informasi, 18(1), 45–55.
https://doi.org/10.21609/jsi.v18i1.1009
Bach, B., Freeman, E., Abdul‑Rahman, A., Turkay, C., Khan, S., Fan, Y., & Chen, M. (2022).
Dashboard design patterns. arXiv. https://doi.org/10.48550/arXiv.2205.00757
Berry, S. (2019). The Role of Video and Text Chat in a Virtual Classroom: How Technology Impacts
Community. https://doi.org/10.4018/978-1-5225-7567-2.CH009
Bonneau,  J.,  Herley,  C.,  van  Oorschot,  P.  C., &  Stajano,  F.  (2012).  The  quest  to  replace
passwords: A framework for comparative evaluation of Web authentication schemes.
IEEE Symposium on Security and Privacy.
Bukhari, I., Wahyuddin, M. I., & Nathasia, N. D. (2020). Perancangan Sistem Informasi Radio
Online Universitas Nasional Berbasis Web. https://doi.org/10.30865/MIB.V4I3.2214
Chen,  J.,  &  Golan,  A.  (2021).  User  behavior  analysis  in  search  interfaces  with  filter-based
navigation. Information Processing & Management, 58(3), 102525.
https://doi.org/10.1016/j.ipm.2021.102525
Choi,  A.,  Shin,  E.,  Joung,  H.,  Lee, J.,  &  Lee,  K.  (2023).  Towards  a  new  interface  for  music
listening: A user experience study on YouTube. arXiv.
https://doi.org/10.48550/arXiv.2307.14718
Fabian,  M.  (2024).  Layout  and  playlist  scheduling  [Digital  Signage  Documentation].
## Slideshow.digital.
Fatoni,  A.,  &  Aditya,  D.  (2019).  Sistem  manajemen  konten  siaran  audio  kampus  berbasis
CMS. Jurnal Media Informasi, 12(1), 20–28. https://doi.org/10.33558/mi.v12i1.509
Geers,  S.  (2020).  News  Consumption  across  Media  Platforms  and  ContentA  Typology  of
Young News Users. Public Opinion Quarterly. https://doi.org/10.1093/POQ/NFAA010
Hsiao,  S.-W.,  Chen,  Y.-T.,  &  Lin,  S.-M.  (2022).  Designing  CRUD  interfaces  in  media
management systems: A usability-based evaluation. International Journal of Human–
Computer Interaction, 38(9), 812–824. https://doi.org/10.1080/10447318.2021.1957397
Lundström,   E.   (2025).   Designing   for   playlist   functionality:   An   examination   of   user
interaction in music streaming apps. LiU‑Electronic Press.
Lundström, E., Halvorsen, L., & Rodrigues, V. E. (2025). Designing for playlist functionality
(PDF). Human–Computer Interaction.

Jurnal Komputer, Informasi dan Teknologi Vol: 5, No 1, 2025 16 of 16


https://penerbitadm.pubmedia.id/index.php/KOMITEK
Marlinah, L., & Sari, I. (2021). Perancangan antarmuka pengguna berbasis responsif pada
sistem informasi sekolah. Jurnal Teknologi Informasi dan Pendidikan, 14(2), 155–164.
https://doi.org/10.24036/tip.v14i2.1143
Mehta, A. (2023). Responsive Web Design and Its Impact on User Experience. International
Journal     of     Advanced     Research     in     Science,     Communication     and     Technology.
https://doi.org/10.48175/ijarsct-9259
Nguyen, N. V. T., Acosta, E. A. M., Dang, T., & Sears, D. R. W. (2025). Exploring internet
radio     across the     globe     with     the     MIRAGE     online     dashboard.     arXiv.
https://doi.org/10.48550/arXiv.2502.05250
Nugraha, R. H., & Munir, M. (2020). Implementasi teknologi streaming audio untuk media
edukasi   berbasis   web.   Jurnal   Pengembangan   Teknologi   Informasi   dan   Ilmu
Komputer, 4(10), 3610–3615. https://doi.org/10.21107/jptii.v4i10.7453
Open Broadcaster Community  (2025).  OpenBroadcaster:  smart  music  scheduling  system.
## Wikipedia.
Rakhmawati,  N.,  &  Iskandar,  M.  (2022).  Literasi  digital  dalam  media  penyiaran  kampus
pascapandemi. Jurnal Teknologi Pendidikan, 24(2), 215–227.
https://doi.org/10.21009/jtp.v24i2.15742
Renaud,  K.,  &  Volkamer,  M.  (2014).  Why  Doesn't  Jane  Protect  Her  Privacy?  Privacy
## Enhancing Technologies.
Renda, M. E., Grasso, S., & Daquino, M. (2023). Metadata-based playlist management and
user  interaction  design  in  digital  music  libraries.  Journal  of  Web  Engineering,  22(3),
563–584. https://doi.org/10.13052/jwe1540-9589.2234
Setiawan,  A.,  &  Wulandari,  D.  (2021).  Pemanfaatan  media  digital  dalam  meningkatkan
efektivitas  komunikasi  di  lingkungan  kampus.  Jurnal  Komunikasi  dan  Teknologi
Informasi, 8(2), 112–124. https://doi.org/10.1234/jkti.v8i2.4567
Strøm,  N.,  Nore,  A.,  &  Ambühl,  R.  (2021). Radio  apparatus  for  communicating  digital  audio
streams.
Sudarsono, B., & Mardiana, D. (2023). Otomatisasi jadwal siaran radio online menggunakan
sistem informasi berbasis web. Jurnal Sistem Informasi dan Komputerisasi Akuntansi,
6(2), 98–105. https://doi.org/10.36987/jsika.v6i2.1230
Tan, T. G., Szalachowski, P., & Zhou, J. (2020). Securing password authentication for web-
based applications. arXiv. https://doi.org/10.48550/arXiv.2011.06257
Wahyuni, F., & Setyawan, R. (2020). Strategi interaktif dalam siaran radio daring komunitas.
Jurnal Ilmu Komunikasi, 9(1), 77–88. https://doi.org/10.25008/jik.v9i1.276
Wiefling, S., Dürmuth, M., & Lo Iacono, L. (2020). More than just good passwords? A study
on usability and security perceptions of risk‑based authentication. ACM ACSAC.
https://doi.org/10.1145/3427228.3427243