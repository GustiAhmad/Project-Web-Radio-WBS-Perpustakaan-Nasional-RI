# Panduan Menyiapkan YouTube Data API Key

Dokumen ini dipakai bila Tahap 10 menyetujui pengisian otomatis **tanggal tayang** dan **durasi** episode dari metadata YouTube. Kunci ini **belum diperlukan sekarang**. Panduan ini hanya persiapan agar Anda bisa langsung mencoba setelah keputusan diambil.

## 1. Mengapa perlu API key

| Cara | Tanggal unggah | Durasi | Keterangan |
|---|---|---|---|
| oEmbed YouTube | Tidak ada | Tidak ada | Hanya judul, penulis, dan thumbnail |
| IFrame Player API | Tidak ada | Ada | Harus memuat video penuh, bertabrakan dengan *lite facade* |
| **YouTube Data API v3** | **Ada** | **Ada** | `snippet.publishedAt` dan `contentDetails.duration` |

Jadi, untuk dua kolom yang Anda minta, satu-satunya jalur yang bisa diandalkan adalah YouTube Data API v3.

## 2. Kuota dan biaya

- Kuota gratis: **10.000 unit per hari** per project Google Cloud.
- Satu panggilan `videos.list` memakan **1 unit**.
- Katalog 331 video, jadi kuota harian jauh lebih dari cukup.
- Biaya tetap **Rp 0** selama pemakaian di bawah kuota. Tidak ada langganan berbayar yang dibutuhkan.

## 3. Langkah mendapatkan API key

1. Buka <https://console.cloud.google.com/> dan masuk memakai akun Google yang akan dipakai pengelola.
2. Klik **Select a Project → New Project**.
3. Isi nama project, misalnya `wbs-perpusnas-metadata`, lalu klik **Create**. Tunggu hingga project aktif.
4. Buka **APIs & Services → Library**.
5. Cari **YouTube Data API v3**, klik hasilnya, lalu klik **Enable**.
6. Buka **APIs & Services → Credentials**.
7. Klik **+ CREATE CREDENTIALS → API key**.
8. Salin kunci yang muncul.

## 4. Batasi kunci

Kunci yang belum dibatasi bisa dipakai pihak lain. Lakukan ini segera:

1. Di halaman **Credentials**, klik nama kunci yang baru dibuat.
2. Pada **API restrictions**, pilih **Restrict key**.
3. Centang hanya **YouTube Data API v3**.
4. Klik **Save**.

Untuk **Application restrictions**, pilih **None**. Kunci ini dipanggil dari Edge Function (server), bukan dari browser, jadi pembatasan *HTTP referrers* tidak berlaku dan justru akan menggagalkan panggilan.

## 5. Simpan kunci di Supabase

Kunci **tidak boleh** ditulis ke `.env`, kode frontend, `README`, atau repository secret GitHub. Kunci hanya hidup sebagai Supabase Secret dan dibaca oleh Edge Function lewat `Deno.env.get('YOUTUBE_API_KEY')`.

### Cara lewat Dashboard (disarankan)

1. Buka <https://supabase.com/dashboard/project/xfybznzzwrpynrizikyd/settings/functions>.
2. Pada bagian **Secrets**, klik **Add new secret**.
3. Nama: `YOUTUBE_API_KEY`
4. Value: tempel kunci dari langkah 3.8.
5. Klik **Save**.

### Cara lewat CLI

```bash
supabase secrets set YOUTUBE_API_KEY=PASTE_KUNCI_DI_SINI --project-ref xfybznzzwrpynrizikyd
```

Perintah CLI menyimpan kunci di riwayat terminal. Pakai Dashboard bila komputer ini dipakai bersama.

### Verifikasi tanpa menampilkan nilai

```bash
supabase secrets list --project-ref xfybznzzwrpynrizikyd
```

Nama `YOUTUBE_API_KEY` harus muncul. Nilainya sengaja tidak ditampilkan.

## 6. Yang akan dikerjakan setelah disetujui

1. Edge Function baru `metadata-youtube`:
   - Menerima `videoId` atau tautan YouTube.
   - Memanggil `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=<id>&key=<secret>`.
   - Mengubah `publishedAt` menjadi `YYYY-MM-DD` dan `duration` dari ISO 8601 (contoh `PT1H2M3S`) menjadi detik.
   - Mengembalikan pesan galat yang jelas bila video tidak ditemukan atau kuota habis.
2. Form **Tambah Episode** mengisi otomatis kolom **Tanggal tayang** dan **Durasi** setelah tautan YouTube selesai diketik.
3. Input tetap bisa diubah manual bila metadata tidak tersedia.
4. Kunci tetap tersembunyi di frontend; tidak ada permintaan langsung dari browser ke Google.

## 7. Yang tidak berubah

- Dua peran saja: `superadmin` dan `admin`.
- Tidak ada audio atau video mentah yang disimpan di server.
- Tidak ada data pribadi penonton yang dikirim ke Google selain permintaan metadata video publik.
- Biaya hosting dan layanan tetap Rp 0 selama kuota gratis tidak terlampaui.

## 8. Keputusan yang perlu Anda ambil

- **Setuju** → siapkan kunci menurut langkah 3–5, lalu beri tahu saya untuk mengerjakan poin 6.
- **Belum setuju** → kolom tanggal dan durasi tetap diisi manual. Saya hanya menambah tombol bantu buka video di form episode.
