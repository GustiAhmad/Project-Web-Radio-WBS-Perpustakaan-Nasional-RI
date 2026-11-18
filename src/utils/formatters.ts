const labelKategoriMap: Record<string, string> = {
  layanan_perpustakaan: 'Layanan Perpustakaan',
  naskah_nusantara: 'Naskah Nusantara',
  literasi_keluarga: 'Literasi Keluarga',
  sejarah_kebudayaan: 'Sejarah & Kebudayaan',
  semua_kategori: 'Semua Kategori',
}

export function labelKategori(kategori: string): string {
  return labelKategoriMap[kategori] ?? kategori
}

export function labelKanal(kanal: string): string {
  const peta: Record<string, string> = {
    youtube: 'YouTube',
    zoom: 'Zoom',
    instagram: 'Instagram',
    'tatap_muka': 'Tatap Muka',
    lainnya: 'Lainnya',
  }
  return peta[kanal] ?? kanal
}

export function formatTanggal(tanggal: string): string {
  const nilai = new Date(`${tanggal}T00:00:00+07:00`)
  if (Number.isNaN(nilai.getTime())) return tanggal
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  }).format(nilai)
}

export function formatDurasi(detik: number): string {
  const jam = Math.floor(detik / 3600)
  const menit = Math.floor((detik % 3600) / 60)
  if (jam === 0) return `${menit} menit`
  return menit === 0 ? `${jam} jam` : `${jam} jam ${menit} menit`
}

export function posterYouTube(videoId: string, webp = true): string {
  return webp
    ? `https://i.ytimg.com/vi_webp/${videoId}/hqdefault.webp`
    : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}
