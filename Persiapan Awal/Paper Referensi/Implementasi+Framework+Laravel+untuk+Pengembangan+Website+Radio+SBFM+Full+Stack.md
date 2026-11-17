

CYCLOTRON : Jurnal Teknik Elektro
( P-ISSN 2614-5146) dan (E-ISSN 2614-5499 )                                                   | Vol. 8 | No. 01| Halaman 27-33
## Januari 2025

## 27

## Implementasi Framework Laravel Untuk
Pengembangan Website Radio SBFM Full Stack
## Iwan Santosa
## 1
## , A. Makmun Aji
## 2
## , Dwi Kuswanto
## 3
## , Triuli Novianti
## 4
## , Rudi Irmawanto
## 5

## 1,2,3
## Universitas Trunojoyo Madura,
Jl. Raya Telang PO BOX 2 Kamal (69162)
## 4,5
## Universitas Muhammadiyah Surabaya
## Jl. Sutorejo No.59 Surabaya (60113)
e-mail: iwan@trunojoyo.ac.id


## I. PENDAHULUAN
Radio  telah  menjadi  salah  satu  media  komunikasi  dan
hiburan  tertua  yang  digunakan  oleh  masyarakat  di  seluruh
dunia[1].  Dari  masa  ke  masa,  radio  telah  menjadi  teman
setia  di  berbagai  situasi,  mulai  dari  mengisi  waktu  luang
hingga  menjadi  sumber  informasi  penting  dalam  keadaan
darurat.  Namun,  seiring  dengan  pesatnya  perkembangan
teknologi, peran radio sebagai media utama komunikasi dan
hiburan mulai tergeser oleh kehadiran platform digital yang
menawarkan    pengalaman    mendengarkan    yang    lebih
personal, fleksibel, dan interaktif[2].
Kemunculan  layanan  streaming  musik  seperti Spotify,
Apple   Music,   serta   berbagai   platform   podcast,   telah
memberikan  pilihan  yang  lebih  beragam  bagi  masyarakat
dalam    menikmati    konten    audio[3].    Keunggulan    dari
platform ini terletak pada kemampuan untuk mendengarkan
kapan  saja  dan  di  mana  saja,  tanpa  terikat  oleh  waktu  dan
frekuensi tertentu, seperti yang terjadi pada radio tradisional.
Hal  inilah  yang  menjadikan  tantangan  bagi  perkembangan
radio kedepannya[4].
Radio  tetap  memiliki  keunggulan  tersendiri,  terutama
dalam   menyampaikan   informasi   secara   real-time   dan
membangun  koneksi  personal  melalui  siaran  langsung[5].
Keunggulan  inilah  yang  menjadi  alasan  mengapa  industri
radio tidak boleh sepenuhnya ditinggalkan, melainkan harus
beradaptasi dengan perkembangan zaman. Salah satu solusi
untuk  mengatasi  tantangan  ini  adalah  melalui  transformasi
digital yang  memungkinkan stasiun radio untuk tetap eksis
dan juga   memberikan  peluang   baru   untuk  menjangkau
audiens    yang    lebih    luas,    melampaui    batas    wilayah
jangkauan frekuensi tradisional[6].
Website streaming radio menjadi salah satu inovasi yang
menjawab     kebutuhan     masyarakat     modern.     Dengan
menggunakan  teknologi  ini,  pendengar  dapat  menikmati
siaran radio  di  mana  saja  dan  kapan  saja, asalkan memiliki
koneksi  internet.  Selain  itu,  website  streaming  radio  juga
dapat  diintegrasikan  dengan  berbagai  fitur  modern,  seperti
daftar  putar  yang  dapat  disesuaikan,  rekaman  siaran  ulang,
serta  interaksi  langsung  melalui  kolom  komentar  atau  fitur
chat.   Semua   fitur   ini dirancang   untuk   meningkatkan
Abstrak— Di  era  modern  ini,  popularitas  radio  tradisional  semakin  menurun  di  kalangan  masyarakat,  terutama
dengan  kemunculan  layanan streaming  musik  dan  podcast  yang  menawarkan  pengalaman  lebih  interaktif  dan
fleksibel.   Kondisi   ini   menciptakan   tantangan   bagi   industri   radio   tradisional   untuk   tetap   relevan   di   tengah
perkembangan  era  digital. Penelitian  ini  bertujuan  untuk  merancang  dan  mengembangkan  sebuah  website  radio
streaming  yang  dirancang  untuk  mempermudah  akses  dan  meningkatkan  minat  pendengar.  Proses  pengembangan
dilakukan   menggunakan   metode Waterfall ,   yang   melibatkan   tahapan   berurutan   seperti   analisis   kebutuhan,
perancangan  sistem, implementasi,  dan pengujian.  Teknologi yang  digunakan  meliputi HTML,  CSS,  dan  JavaScript,
dengan  framework  Bootstrap  untuk  pengembangan  antarmuka  (front-end)  serta  Laravel  untuk  pengelolaan  logika
server  (back-end). Hasil  penelitian  ini  adalah  sebuah  platform  web  radio  yang  responsif,  stabil,  dan  menarik,
diharapkan mampu membangkitkan kembali minat masyarakat terhadap radio dalam format digital yang lebih sesuai
dengan perkembangan zaman.
Kata kunci: Laravel, Website Radio, Waterfall
Abstract— In  this  modern  era,  the  popularity  of  traditional  radio  is  decreasing  among  the  public,  especially  with the
emergence of music streaming  services and podcasts that offer a more interactive and flexible experience. This condition
creates  a  challenge  for  the  traditional  radio  industry  to  remain  relevant  amidst  the  development  of  the  digital  era.  This
study aims to design and develop a streaming  radio website designed to facilitate access and increase listener interest. The
development  process is  carried out  using the Waterfall  method, which involves  sequential stages such  as  needs  analysis,
system design, implementation, and testing. The technologies used include HTML, CSS, and JavaScript, with the Bootstrap
framework for interface development (front-end) and Laravel for server logic management (back-end). The results of this
study  are a  responsive, stable,  and  attractive radio  web platform,  which  is expected to be able to revive  public interest in
radio in a digital format that is more in line with the times.
## Keywords: Laravel, Radio Website, Waterfall



## 28

JURNAL CYCLOTRON Vol. 8, No. 01, Januari 2025
pengalaman  mendengarkan  dan  membuatnya  lebih  relevan
bagi audien masa kini.
Melihat peluang besar ini, proyek penelitian ini bertujuan
untuk   merancang   dan   mengembangkan   sebuah   website
streaming   radio   yang   tidak   hanya   berfungsi sebagai
platform  mendengarkan  siaran  radio,  tetapi  juga  memiliki
daya  tarik  visual  dan  interaktivitas  yang  mampu  menarik
minat  masyarakat,  terutama   generasi  muda.   Proyek   ini
menggunakan   metode   pengembangan   perangkat   lunak
Waterfall ,  yang  dikenal  sebagai  metode  pengembangan
yang   sistematis   dan   berurutan.   Tahapan-tahapan   dalam
metode  ini  mencakup  analisis  kebutuhan,  desain  sistem,
implementasi, pengujian, dan pemeliharaan.
Pada  tahap  analisis  kebutuhan,  dilakukan  identifikasi
terhadap    kebutuhan   utama   pengguna,    baik   dari    sisi
pendengar  maupun  stasiun  radio.  Berdasarkan  analisis  ini,
dirancanglah   fitur-fitur   yang   relevan,   seperti   streaming
langsung,  integrasi  media  sosial,  fitur  pencarian  stasiun
radio,  serta  desain  antarmuka  yang  responsif  dan  mudah
digunakan. Desain    sistem    yang    baik   menjadi    kunci
keberhasilan  pengembangan  platform  ini,  sehingga  proses
desain    dilakukan    dengan    mempertimbangkan    aspek
pengalaman  pengguna  (user  experience)  dan  antarmuka
pengguna (user interface).
Tahap    implementasi    melibatkan    pengkodean    dan
pengintegrasian  fitur-fitur  yang  telah  dirancang.  Teknologi
yang  digunakan  mencakup  HTML,  CSS,  dan  JavaScript
untuk  tampilan  antarmuka,  serta  framework  modern  untuk
mendukung  interaktivitas.  Pada  sisi  backend,  digunakan
teknologi   server-side   seperti   Node.js   atau   PHP   untuk
memastikan   pengolahan   data   berjalan   dengan   efisien.
Selain    itu,    database    yang    digunakan    harus    mampu
menangani  data  dalam  jumlah  besar,  mengingat  potensi
tingginya jumlah pengguna yang mengakses website secara
bersamaan.
Website     streaming     radio     ini     diharapkan     dapat
memberikan   berbagai  manfaat,   baik   bagi   stasiun  radio
maupun  pendengarnya.  Bagi  stasiun  radio,  platform  ini
dapat menjadi sarana untuk memperluas jangkauan audiens,
meningkatkan  interaksi  dengan  pendengar,  serta  membuka
peluang  monetisasi  baru  melalui  iklan  digital  atau  layanan
berlangganan   premium.   Sementara   itu,   bagi  pendengar,
website   ini   menawarkan   fleksibilitas   dan   kenyamanan
dalam menikmati siaran radio kapan saja dan di mana saja.
Kesimpulannya,  pengembangan  website streaming  radio
adalah  langkah  strategis  yang  dapat  membantu  industri
radio  mempertahankan  relevansinya  di  era  digital.  Dengan
mengintegrasikan  teknologi  modern  dan  memperhatikan
kebutuhan  masyarakat,  platform  ini  dapat  menjadi  solusi
yang  efektif  untuk  menjawab  tantangan  zaman  sekaligus
membuka  peluang  baru  bagi  industri  radio  di  masa  depan.
Proyek  ini  juga  menunjukkan  bahwa  radio  tetap  memiliki
tempat   penting   dalam   lanskap   media,   asalkan   mampu
bertransformasi   dan   beradaptasi   dengan   perkembangan
teknologi.
## II. STUDI PUSTAKA
## A. Website
Website   merupakan   sekumpulan  halaman   web   yang
saling terhubung dan dapat diakses melalui internet dengan
menggunakan   peramban   web   (web   browser).   Website
dibangun   menggunakan    teknologi    Hypertext    Markup
Language   (HTML)   untuk   membuat   struktur   konten,
Cascading  Style  Sheets  (CSS)  untuk  pengaturan  tata  letak
dan    tampilan,    serta    JavaScript    untuk    menambahkan
interaktivitas dan fitur dinamis[7-9]. HTML adalah elemen
dasar     dari     semua     halaman     web     modern,     yang
menjadikannya    bagian    penting    dalam    pengembangan
web[10]. JavaScript memiliki  banyak  kelebihan  walaupun
ketidakkompatibilitasnya  dengan  beberapa  versi  browser
lama    yang    mungkin    tidak    mendukung    semua    fitur
terbaru[11]. Website  umumnya  di-host  di  server  web  dan
diakses  melalui  Uniform  Resource  Locator  (URL),  yang
merupakan alamat unik untuk setiap situs[12].
Website   dapat   dikategorikan   berdasarkan   fungsinya,
seperti    website    statis    dan    dinamis.    Website    statis
menampilkan konten yang tidak berubah, di mana halaman
web  disusun  dengan  konten  tetap  dan  biasanya  diubah
secara  manual.  Sebaliknya,  website  dinamis  menampilkan
konten  yang  bisa  diperbarui  secara  otomatis  dari  database
atau  sumber  data  lain  tanpa  perlu  mengubah  kode  dasar
halaman  tersebut. Hal  ini  memungkinkan  pengguna  untuk
mendapatkan  informasi  terkini  secara  real-time.  Website
dinamis   biasanya   memanfaatkan   bahasa   pemrograman
server-side   seperti   PHP,   Python,   atau   Node.js,   serta
database     seperti     MySQL     atau     MongoDB     untuk
menyimpan  dan  mengelola  data[12]. PHP,  atau  Hypertext
Preprocessor,  adalah  bahasa  pemrograman  yang  sangat
populer  untuk  pengembangan  aplikasi  web[13]. MySQL
mengimplementasikan  mekanisme  yang  disebut  storage
engine,  yang  memberikan  fleksibilitas  dalam  cara  data
disimpan  dan  diakses[13]. MySQL  menggunakan  bahasa
SQL  (Structured  Query  Language)  sebagai  bahasa  standar
untuk  mengakses  dan  mengelola  data  dalam  database[14].
Perkembangan selanjutnya adalah adanya Framework yang
mempermudal dalam pengembangan aplikasi salah satunya
adalah  Laravel. Framework  ini  menawarkan  solusi  untuk
pengembangan  yang  lebih  cepat,  dengan  kode  yang  lebih
terstruktur   dan   mudah   dipelihara[15]. Terdapat   juga
Framework  front-end  yang  bernama  Bootstrap  yang  tidak
hanya sekadar   template   desain,   tetapi   juga   alat   yang
menawarkan fleksibilitas dan kemudahan bagi
pengembang  dalam  menciptakan  pengalaman  pengguna
yang optimal[16].
Perkembangan website telah menciptakan berbagai jenis
platform  web  yang  berbeda-beda  sesuai  dengan  kebutuhan
dan  penggunaannya. Salah  satu  perkembangan  terpenting
adalah     website     responsif,     yang     dirancang     untuk
menyesuaikan  tampilan  dengan  perangkat  pengguna,  baik
itu  desktop,  tablet,  maupun  ponsel.  Ini  bertujuan  untuk
memberikan pengalaman pengguna (user experience) yang
lebih    baik dengan   memaksimalkan   keterbacaan    dan
kemudahan  navigasi  pada  berbagai  ukuran  layar.  Di  era
modern  ini,  website  tidak  hanya  sekadar  alat  komunikasi,
tetapi  juga  menjadi  bagian  integral  dari  strategi  bisnis
untuk  meningkatkan  keterlibatan  pengguna,  memperluas
jangkauan pasar, serta memperkuat citra mereka[12].
## B. Radio
Radio  adalah  teknologi  komunikasi  yang  menggunakan
gelombang elektromagnetik untuk     mentransmisikan
informasi,  seperti  suara,  musik,  dan  berita,  dari  pemancar
ke  penerima.  Secara  umum, radio  telah  menjadi  salah  satu
media     penyiaran     yang     paling     berpengaruh     sejak
ditemukannya  pada  awal  abad  ke-20.  Radio  digunakan
untuk   berbagai   keperluan,   mulai   dari   hiburan,   berita,
hingga informasi penting seperti cuaca atau situasi darurat.
Salah  satu  keunggulan  radio  adalah  kemampuannya  untuk



## 29

Iwan Santosa dkk.:  Implementasi Framework Laravel Untuk Pengembangan Website Radio SBFM Full Stack
menjangkau  pendengar  yang  berada  di  berbagai  wilayah
geografis  tanpa  membutuhkan  koneksi  fisik  seperti  kabel
atau internet[17].
## 1) Cara Kerja Radio Konvensional
Radio   konvensional,   atau   siaran   radio   tradisional,
menggunakan Radio Frequency (RF) untuk
mentransmisikan  sinyal  audio.  Sistem  ini  melibatkan  tiga
komponen   utama   yaitu   stasiun   pemancar,   gelombang
elektromagnetik    sebagai    media    transmisi,    dan    radio
penerima  sebagai  penerima.  Pada  stasiun  pemancar,  sinyal
suara  dikonversi  menjadi  sinyal  elektronik  yang  kemudian
dimodulasi pada frekuensi tertentu (biasanya AM atau FM).
Gelombang radio yang dipancarkan oleh antenna pemancar
akan   diterima   oleh   antena   penerima,   di   mana   radio
penerima kemudian mendemodulasi sinyal 28 tersebut dan
mengubahnya    kembali    menjadi    suara    yang    dapat
didengar[17].
Pada    siaran    radio    AM    (Amplitude    Modulation),
informasi     suara     ditransmisikan     dengan     mengubah
amplitudo  gelombang  radio.  Sedangkan  pada  siaran  FM
(Frequency    Modulation),    frekuensi    gelombang    yang
diubah    untuk    mentransmisikan    suara.    FM    biasanya
menghasilkan  kualitas  suara  yang  lebih  baik,  sementara
AM lebih mampu menjangkau jarak yang lebih jauh[18].
## 2) Radio Streaming Internet
Dengan  perkembangan  teknologi  digital  dan  internet,
radio   telah   mengalami   transformasi   ke   bentuk   radio
streaming.  Radio  internet  menggunakan  protocol  internet
untuk mentransmisikan audio melalui jaringan digital alih-
alih    melalui    gelombang    radio.    Stasiun    radio    yang
beroperasi melalui internet mengalirkan (streaming) konten
audio mereka  dalam  bentuk  paket  data  yang  dapat  diakses
oleh    pendengar    melalui    berbagai    perangkat    seperti
komputer,   smartphone,   atau   tablet   yang   terhubung   ke
internet [5].
Cara  kerja  radio  internet  melibatkan  pengkodean  sinyal
audio  menjadi  format  digital  (misalnya  MP3,  AAC)  dan
kemudian   mengirimkan   data   tersebut   melalui   server
streaming.  Pendengar  dapat  mengakses  konten  ini  secara
real-time  dengan 29  menggunakan  aplikasi  atau  browser
yang mendukung streaming audio [19].
3) Peralihan   Radio   SBFM   dari   Konvensional   ke
## Streaming
Radio SBFM adalah salah satu radio lokal yang awalnya
menggunakan    metode     siaran     konvensional    melalui
gelombang  radio   AM   dan   beralih   ke  gelombang   FM.
Dalam     tahap     awal,     Radio     SBFM     memanfaatkan
infrastruktur penyiaran  tradisional  yang terdiri  dari  stasiun
pemancar,  antena,  dan  perangkat  penerima  radio  FM  di
wilayah cakupannya. Dengan perkembangan teknologi dan
meningkatnya     penggunaan     internet,     Radio     SBFM
kemudian   mencoba   beralih   ke   radio   streaming   untuk
memperluas   jangkauan   siarannya   dan   mengikuti   tren
konsumsi  media  digital.  Dengan  adopsi  radio  streaming,
diharapkan  dapat  menjangkau  pendengar  tidak  hanya  di
wilayah   lokal,   tetapi   juga   di   seluruh   dunia   selama
pendengar terhubung ke internet.
## C. Sistem Informasi
Sistem  informasi  merupakan  kumpulan  komponen  yang
terintegrasi   dan   bekerja   sama   untuk   mengumpulkan,
menyimpan, memproses, dan menyebarkan informasi guna
mendukung   pengambilan   keputusan,   koordinasi,   serta
control  dalam  suatu  organisasi[12].  Sistem  informasi  tidak
terbatas  pada  perangkat  keras  dan  perangkat  lunak  saja,
namun  juga  melibatkan  data,  prosedur,  hingga  sumber
daya  manusia.  Sistem informasi  memainkan  peran penting
dalam   meningkatkan   efisiensi   operasional,   mendorong
inovasi,  serta  memungkinkan  akses  cepat  dan  tepat  waktu
ke    informasi    yang    relevan.    Dengan    adanya    sistem
informasi,  organisasi  dapat  memantau  kinerja,  merespons
perubahan  pasar,  serta  mendukung  berbagai  proses  bisnis
inti  seperti  manajemen  keuangan,  operasi,  pemasaran,  dan
sumber daya manusia[20].
Sistem   informasi   terbagi   menjadi   beberapa   kategori
berdasarkan  fungsi  dan  tujuannya[12].  Sistem  Informasi
Manajemen  (SIM)  mendukung  fungsi  manajerial  dengan
menyediakan  laporan  rutin  dan  data  performa.  Executive
Information System (EIS) menyediakan informasi strategis
bagi  eksekutif  tingkat  atas,  sementara  Decision  Support
System  (DSS)  membantu  dalam  pengambilan  keputusan
yang  bersifat  semi-terstruktur  atau tidak  terstruktur.  Selain
itu,  ada  sistem  informasi  operasional  seperti  Transaction
Processing System (TPS) yang menangani data operasional
rutin  dan  transaksi  bisnis  sehari-hari,  seperti  penjualan,
penggajian, atau pembelian.
Sistem    informasi    juga    menghubungkan    organisasi
dengan pihak eksternal melalui Interorganizational System
(IOS)   atau   Sistem Informasi   Antar   Organisasi   seperti
Electronic  Data  Interchange  (EDI),  yang  memungkinkan
pertukaran  informasi  elektronik  antar  perusahaan.  Seiring
perkembangan  teknologi,  muncul pula  Sistem  Informasi
Berbasis    Web    yang    memanfaatkan    internet    sebagai
platform, memungkinkan akses data yang cepat dan global.
Penerapan   sistem   informasi   berbasis   web   semakin
populer   dengan   berkembangnya   Content   Management
Systems (CMS), yang memungkinkan organisasi
mengelola  konten  secara  dinamis  dan  responsif.  Hal  ini
membuka  peluang  bagi  berbagai  industri  dan  instansi,
termasuk yang bergerak di bidang media informasi. Sistem
informasi  berbasis  website  dapat  dimanfaatkan  sebagai
platform informasi dan komunikasi yang efisien. Termasuk
dalam  kategori  ini  adalah  Radio  SBFM,  di  mana  sistem
informasi    berbasis    website    dirancang    sebagai    profil
website  yang  menyediakan  informasi  terkait  profil  radio
tersebut.
## D. Website Streaming Radio


## Gambar 1. Skema Radio Streaming

Penemuan internet telah mengubah cara transmisi sinyal
yang  digunakan  oleh  radio  konvensional.  Radio  internet,
yang juga dikenal sebagai web radio, radio streaming, atau
e-radio,   berfungsi   dengan   mentransmisikan   gelombang
suara melalui internet. Prinsip kerjanya mirip dengan radio



## 30

JURNAL CYCLOTRON Vol. 8, No. 01, Januari 2025
konvensional  berbasis  gelombang  pendek,  menggunakan
medium  streaming  untuk  menyediakan  aliran  suara  yang
berkelanjutan.
Sistem  ini  memungkinkan  siaran  radio  diakses  secara
global  selama  pendengar  memiliki  koneksi  internet.  Di
Indonesia,   stasiun   radio   sering   menggabungkan   radio
internet  dengan  sistem  radio  analog  untuk  memperluas
jangkauan siaran mereka[21].
## III. METODE
## A. Metode Waterfall
Metode Dalam  pengembangan  web  radio,  terdapat  dua
permasalahan  utama  yaitu  bagaimana  merancang  sistem
yang  tepat  dan  bagaimana  menyiarkan  siaran  radio  secara
online.  Tantangan  pertama  adalah  merancang  sistem  yang
dapat   menangani   manajemen   siaran,   pemutaran   musik,
serta penjadwalan siaran, dengan memastikan performa dan
skalabilitas.  Tantangan  kedua  adalah  memastikan  siaran
radio  bisa  diakses  secara  online  melalui  streaming  dengan
kualitas yang baik dan stabil.
Untuk  mengatasi  masalah  ini,  maka  metode waterfall
digunakan.  Metode  ini  sering  menjadi  pilihan  bagi  para
pengembang perangkat lunak karena dianggap lebih mudah
diterapkan.  Proses  dari  metode  ini  bersifat  linear  yang
dimulai dari  tahap  perencanaan,  analisis  kebutuhan,  desain
sistem,    implementasi,    hingga    pengujian[22].    Dengan
menggunakan metode ini, diharapkan proses
pengembangan  lebih  efisien  dan  kualitas  serta  keandalan
sistem yang dihasilkan meningkat.



## Gambar 2. Waterfall

Metode waterfall  dipilih    karena    pendekatan    ini
mengutamakan  pengidentifikasian  kebutuhan  sejak  awal.
Pada  pengembangan  perangkat  lunak  perusahaan,  penting
untuk  memahami  kebutuhan  bisnis  agar  solusi  yang  dibuat
benar-benar  sesuai.  Sebelum  proyek  dimulai,  identifikasi
semua   persyaratan   dilakukan   secara   menyeluruh   agar
analisis dan implementasi dapat berjalan dengan tepat.
Tahapan dalam Metode Waterfall :
- Requirements  Analysis  and  Specification (Analisis
dan    Spesifikasi    Kebutuhan).    Semua    kebutuhan
sistem  dikumpulkan  dan  didokumentasikan  secara
rinci.
- System  and  Software  Design (Perancangan  Sistem
dan    Perangkat    Lunak),    Mengubah    spesifikasi
kebutuhan menjadi arsitektur dan desain sistem.
- Implementation and Unit Testing (Implementasi dan
Pengujian Unit), Kode perangkat lunak
dikembangkan  berdasarkan  desain  dan  diuji  pada
tingkat unit.
- Integration   and   System   Testing (Integrasi   dan
Pengujian Sistem), Komponen individual
digabungkan   menjadi   sistem   lengkap,   kemudian
diuji untuk memastikan fungsionalitas keseluruhan.
- Deployment    and    Maintenance (Penerapan    dan
Pemeliharaan),    Perangkat    lunak diterapkan    ke
lingkungan pengguna dan dipelihara untuk
memperbaiki bug atau memenuhi kebutuhan baru.
## B. Metode Pengumpulan Data
## 1) Observasi
Penulis melakukan pengamatan  secara  langsung aktifitas
yang  terjadi  pada  Radio  SBFM  untuk mendapatkan  system
operational prosedur dari aktifitas-aktifitas dalam
penyiaran.
## 2) Wawancara
Melakukan wawancara dengan narasumber dan tim guna
memperoleh  data  serta  informasi  penting  yang  diperlukan
dalam pembuatan Program Aplikasi.
## 3) Studi Pustaka
Studi Pustaka dilakukan melalui penelitian literatur untuk
mendapatkan  aspek  teoritis  dengan  mengumpulkan  data
dan  informasi  dari  jurnal,  buku,  serta  materi  lain  yang
relevan dengan topik
## IV. HASIL DAN PEMBAHASAN
A. Analisis dan Spesifikasi Kebutuhan
## Table 1. Analisis Kebutuhan Admin
## Fitur Deskripsi
Login Admin (Admin
biasa & Superadmin)
Sistem   dapat   menampilkan   halaman
login untuk Admin dan Superadmin
## Dashboard
Sistem   dapat   menampilkan   halaman
awal  dari  Admin  yang  berisi  statistik
pengunjung website
CRUD Data
## Broadcaster
Sistem   dapat   menampilkan   halaman
yang    memungkinkan    Admin    untuk
mengelola data broadcaster
CRUD Data Event
Sistem   dapat   menampilkan   halaman
yang    memungkinkan    Admin    untuk
mengelola data event
CRUD Data Kategori
Sistem   dapat   menampilkan   halaman
yang    memungkinkan    Admin    untuk
mengelola data kategori informasi
CRUD Data
## Informasi
Sistem   dapat   menampilkan   halaman
yang    memungkinkan    Admin    untuk
mengelola data informasi atau berita
CRUD Data
## Galeri
Sistem   dapat   menampilkan   halaman
yang    memungkinkan    Admin    untuk
mengelola data galeri
CRUD Data Jadwal
## Siaran
Sistem   dapat   menampilkan   halaman
yang    memungkinkan    Admin    untuk
mengelola data jadwal siaran
CRUD Data
## Admin
Sistem   dapat   menampilkan   halaman
yang     hanya dapat diakses oleh
Superadmin    untuk    mengelola    data
Admin yang  dapat  mengakses  bagian
## Admin





## 31

Iwan Santosa dkk.:  Implementasi Framework Laravel Untuk Pengembangan Website Radio SBFM Full Stack
Analisis   kebutuhan  aplikasi  merupakan   sekumpulan
aktivitas   dan   tahapan   yang   saling   berhubungan   yang
berguna  untuk  memecahkan  permasalahan menjadi  bagian
yang    lebih    terperinci.    Analisa    ini    bertujuan    untuk
menjelaskan  rincian  cara  kerja  dari  aplikasi.  Hasil  analisa
ini    adalah    Gambaran    awal    yang    digunakan    untuk
membangun   aplikasi   yang   baru   yang   sesuai   dengan
kebutuhan instansi terkait.
Untuk   mendapatkan   data   terkait   dengan   kebutuhan
pengguna  terhadap  sistem  yang  akan  dibangun,  analisis
kebutuhan  ini  dilakukan  menggunakan  metode  observasi
secara  langsung  dengan  melakukan  konsultasi  langsung
kepada  pihak  radio  SBFM.  Pada  tabel  tabel  1  dan  tabel
tabel  2  merupakan  beberapa  fitur  yang  dibutuhkan  dalam
sistem.

## Table 2. Analisis Kebutuhan Visitor
## Fitur Deskripsi
Dashboard (Visitor)
Sistem  dapat  menampilkan  halaman  awal
dari  bagian  visitor  yang  berisikan  event
yang  sedang  berjalan,  berita  terbaru,  live
radio    yang    sedang    berlangsung,    live
YouTube, dan berita populer
Informasi atau Berita
Sistem dapat menampilkan halaman berita
yang meliputi kategori berita, judul berita,
tanggal berita diposting, dan isi berita
## Kategori Berita
Sistem  dapat  menampilkan  dan  memfilter
berita  berdasarkan  kategori  yang  dipilih
pengguna
## Streaming Radio
Sistem dapat menampilkan radio
streaming   yang   sedang   On   Air   yang
meliputi  foto  dan  nama  broadcaster  serta
tombol untuk  memutar  dan  menghentikan
streaming    radio.    Sistem    juga    dapat
menampilkan  jadwal  siaran  yang  sudah,
sedang, dan akan disiarkan
## Galeri
Sistem dapat menampilkan halaman galeri
foto dari radio SBFM
## Profil
Sistem dapat menampilkan halaman profil
stasiun    radio    SBFM    yang    meliputi
"Tentang   Kami",   "Napak   Tilas   Suara
Bangkalan  FM",  visi  misi,  dan  profil  tim
broadcaster
## Kontak
Sistem     dapat     menampilkan     halaman
kontak  yang  berisi  alamat  lengkap  dan
informasi  kontak  yang  dapat  dihubungi
seperti alamat email dan nomor telepon
## Pencarian
Sistem     dapat     menampilkan     halaman
pencarian berita
Streaming YouTube
Sistem   dapat   memberikan   layanan   live
streaming  YouTube  radio  SBFM  ketika
sedang ada event Talkshow
## Sosial Media
Sistem  dapat  menampilkan  tombol  ikon
sosial  media  SBFM  yang  memungkinkan
pengguna untuk mengunjungi media masa
## SBFM

## B. Perancangan Sistem
Pada  Gambar  3  merupakan  rancangan  dari  sistem  yang
akan dibuat. Flowchart ini dibagi menjadi tiga kolom, yaitu
User, Admin, dan Sistem, yang menjelaskan peran masing-
masing pihak dalam interaksi dengan sistem. Pada Gambar
4  merupakan  flowchart  yang  menggambarkan  alur  proses
siaran  radio  secara  langsung  (live  radio)  dengan  beberapa
elemen    utama    yang    terlibat,    yaitu    Admin    untuk
menjalankan  sistem,  Server  digunakan  supaya  radio  bisa
diakses  secara  online,  Software  (Mixxx)  digunakan  untuk
mengkonfigurasikan  source  audio  dan  playlist  lagi, dan
Sistem untuk menampilkan radio.

## 1) Flowchart


## Gambar 3. Flowchart Sistem


Gambar 4. Flowchart live streaming radio





## 32

JURNAL CYCLOTRON Vol. 8, No. 01, Januari 2025
## 2) Usecase Diagram
Pada  gambar 5 tersebut  adalah  diagram  use  case  yang
menggambarkan  interaksi  antara  aktor  dan  sistem  dalam
aplikasi radio, dimana dalam web tersebut ada dua halaman.

## Gambar 5. Usecase Diagram
Halaman  pertama  yaitu  halaman  public  Dimana  hanya
user  biasa  yang  bisa  mengunjung,  kemudian  halaman  2
yaitu   halaman   admin   Dimana   hanya   admin   yang   bisa
mengakses  halaman  tersebut. Diagram  ini  menunjukkan
peran    dari    Admin,    Superadmin,    dan    User    dalam
menggunakan fitur-fitur yang disediakan oleh sistem.


## Gambar 6. Desain Database
Pada  Gambar 6 merupakan  rancangan  database  dari
system   yang   akan   dibuat.   Database   disini   merupakan
komponen   penting   dalam   sistem   aplikasi   radio   yang
berfungsi    sebagai    tempat    penyimpanan    data    yang
terstruktur dan memfasilitasi pengolahan data.
Home adalah halaman pertama yang dilihat pengunjung
saat  mengakses  situs.  Halaman  ini  berisi  beragam  kontent
seperti berita  terbaru  dan  popular,  acara/event  yang  akan
datang,  live  youtube  jika  sedang  live,  dan  pemberitahuan
siapa host/broadcaster yang sedang OnAir, dan konten lain
yang menarik untuk dilihat.
Pada   Gambar   8 menampilkan   daftar   berita   yang
dikelompokkan   berdasarkan   kategori.   Pengunjung   dapat
memilih  kategori  berita  yang  mereka  minati  untuk  melihat
informasi yang relevan. Setiap kategori menampilkan berita
terbaru  yang  disajikan  dalam  bentuk  kartu,  dengan  judul
untuk   setiap   berita.   Kemudian   pengunjung   juga   dapat
melakukan filter berdasarkan tahun


## Gambar 7. Halaman Home


Gambar 8. Halaman kategori berita
Halaman  ini  menyediakan  fitur  streaming  radio  secara
langsung.  Pengunjung  dapat  mendengarkan  siaran  radio
secara  real-time,  lengkap  dengan  informasi  jadwal siaran
tentang  program  yang  sedang  disiarkan  dan  penyiar  yang
bertugas.    Fitur    ini    memungkinkan    pengguna    untuk
menikmati   layanan   radio    secara    online   tanpa   harus
membuka   aplikasi   lain.   Kemudian   pada   halaman   ini
menyediakan  sebuah  pop  up  yang  berisi  sebuah  navigasi
seperti  Permintaan  Lagu,  dan  Pertanyan,  yang  nantinya
akan di arahkan ke WhatsApp radio.
Halaman  search  digunakan  untuk  menampilkan  hasil
pencarian  berdasarkan  kata  kunci  yang  dimasukkan  oleh
pengunjung.  Halaman  ini  menunjukkan  daftar  berita  atau
informasi   yang   sesuai   dengan   kata   kunci,   membantu
pengunjung menemukan konten yang relevan dengan cepat.



## 33

Iwan Santosa dkk.:  Implementasi Framework Laravel Untuk Pengembangan Website Radio SBFM Full Stack
Hasil   pencarian   biasanya   disusun   dalam   bentuk   daftar
dengan ringkasan untuk setiap item.


## Gambar 9. Halaman Streaming


## Gambar 10. Halaman Search
## V. KESIMPULAN
Setelah   melakukan   evaluasi  terhadap  hasil   uji   coba
penelitian pada  pengembangan  sistem  website  streaming
radio   SBFM,   Perancangan   Sistem   Website   Streaming
Radio    SBFM:    Penggunaan    platform    Laravel    dalam
merancang  sistem  website  streaming  radio  SBFM  telah
berhasil  menciptakan  sistem  yang  mudah  diakses  oleh
pengguna.   Hal   ini   memungkinkan   pengunjung   untuk
dengan mudah mengakses siaran radio secara langsung dan
mendapatkan   informasi   terkait   Radio   SBFM.   Desain
website   yang   responsif   dan   terstruktur   mempermudah
pengguna   dalam   menikmati   layanan   streaming.   Proses
penyiaraan  siaran  radio  secara  online  juga  telah  berhasil
diimplementasikan  dengan  baik.  Sistem  yang  dibangun
memungkinkan  pengelolaan  siaran  radio  secara  real-time,
memudahkan     staf     untuk     mengelola     siaran,     serta
memungkinkan   pengunjung   untuk   mendengarkan   radio
secara langsung melalui website. Keberhasilan
implementasi  ini  memberikan pengalaman  yang lebih  baik
bagi  pengguna. Berdasarkan  evaluasi  di  atas,  penerapan
Laravel  dalam  merancang  sistem  website streaming  radio
SBFM  dan  menyiarkan  siaran  radio  secara  online  telah
memberikan    manfaat    yang    signifikan,    serta    berhasil
mencapai tujuan yang ditetapkan dalam penelitian ini.



## REFERENSI

[1] S.  S.  Gusna,  A.  M.  Fatih,  and  T.  Salsabila, "Konvergensi  Digital
Radio  Republik  Indonesia  Yogyakarta  di  Masa  Pandemi  Covid-
19," Jurnal Audiens, vol. 3, no. 1, pp. 161-170, 2022.
[2] A.  R.  Alston,  "Radio  broadcasting  industry:  Marketing  strategy
plan  for  the  future  of  digital  media  platform,"  Capella University,
## 2021.
[3] N. A. Pandusaputri and R. B. R. Mokodompit, "Peminat Radio dan
## Podcast   Kalangan   Generasi   Z   Saat   Berkendara," Jurnal   Ilmu
Komunikasi Dan Media Sosial  (JKOMDIS), vol. 4, no. 1, pp. 179-
## 192, 2024.
[4] L.    Hallett,    "Broadcast    radio:    Technology,    challenges    and
opportunities  in  the  twenty-first  century," Interactions:  Studies  in
Communication & Culture, vol. 12, no. 1, pp. 17-37, 2021.
[5] T.  Laor,  "Radio  on  demand:  New  habits  of  consuming  radio
content," Global media and communication, vol. 18, no. 1, pp. 25-
## 48, 2022.
[6] A.  Pamungkas  and  U.  Halwati,  "Digitalisasi  Penyiaran  Radio  di
Mitra  FM  Purwokerto," ARKANA:  Jurnal  Komunikasi  dan  Media,
vol. 2, no. 02, pp. 171-185, 2023.
[7] S. Mariko, "Aplikasi website berbasis HTML dan JavaScript untuk
menyelesaikan  fungsi  integral  pada  mata  kuliah  kalkulus," Jurnal
Inovasi Teknologi Pendidikan, vol. 6, no. 1, pp. 80-91, 2019.
[8] S.  M.  Prasetiyo,  M.  I.  P.  Nugroho,  R.  L.  Putri,  and  O.  Fauzi,
"Pembahasan  Mengenai  Front-End  Web  Developer  dalam  Ruang
Lingkup  Web  Development," BULLET:  Jurnal  Multidisiplin  Ilmu,
vol. 1, no. 06, pp. 1015-1020, 2022.
[9] I.  P.  Sari,   A.   Azzahrah,  I.  F.  Qathrunada,  N.   Lubis,  and  T.
Anggraini,  "Perancangan  sistem  absensi  pegawai  kantoran  secara
online pada  website  berbasis HTML  dan  CSS," Blend sains  jurnal
teknik, vol. 1, no. 1, pp. 8-15, 2022.
[10] J.   K.   Kawistara   and   P.   Hidayatullah,   "Pemrograman   Web,"
## Bandung: Penerbit Informatika, 2015.
[11] J.  Enterprise, Otodidak  Pemrograman  JavaScript.  Elex  Media
## Komputindo, 2017.
[12] E. Y. Anggraeni, Pengantar sistem informasi. Penerbit Andi, 2017.
[13] D.  Pranata,  H.  Hamdani,  and  D.  M.  Khairina,  "Rancang  Bangun
Website  Jurnal  Ilmiah  Bidang  Komputer  (Studi  Kasus:  Program
## Studi   Ilmu   Komputer   Universitas   Mulawarman)," Informatika
Mulawarman: Jurnal Ilmiah Ilmu Komputer, vol. 10, no. 2, pp. 25-
## 29, 2015.
[14] L.  Welling  and  L.  Thomson, PHP  and  MySQL  Web  development.
Sams publishing, 2003.
[15] M.  Stauffer, Laravel:  Up  &  running:  A  framework  for  building
modern php apps. " O'Reilly Media, Inc.", 2019.
[16] S.   Prabumulih,   "Rancang   bangun   Sistem   Informasi   pendataan
Alumni     pada     stie     prabumulih     berbasis     website     dengan
menggunakan bootstrap," Jurnal Informatika, vol. 17, no. 1, 2017.
[17] S.   Ramadhani,   R.   Ataqiya,   B.   Haris,   E.   Law,   and   J.   Royi,
"Analysis  of Radio  Broadcast," Journal International Dakwah and
Communication, vol. 2, no. 1, pp. 20-30, 2022.
[18] T. H. M. Brain. "How radio works."
https://electronics.howstuffworks.com/radio.htm (accessed 25
## Desember 2024.
[19] D. Beller. "How internet radio works."
https://electronics.howstuffworks.com/internet-radio.htm (accessed
## 25 Oktober 2024.
[20] E.   Turban,   L.   Volonino,   G.   R.   Wood,   and   J.   C.   Sipior,
"Information  technology  for  management:  Advancing  sustainable,
profitable business growth," (No Title), 2013.
[21] I.  Bukhari,  M.  I.  Wahyuddin,  and  N.  D.  Nathasia,  "Perancangan
## Sistem   Informasi   Radio   Online   Universitas   Nasional   Berbasis
Web," Jurnal Media Informatika Budidarma, vol. 4, no. 3, pp. 715-
## 725, 2020.
[22] A.  Alshamrani  and  A.  Bahattab,  "A  comparison  between  three
SDLC models waterfall  model, spiral model, and
Incremental/Iterative  model," International  Journal of  Computer
Science Issues (IJCSI), vol. 12, no. 1, p. 106, 2015.
