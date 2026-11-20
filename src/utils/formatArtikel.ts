import type { KategoriArtikel } from '../types/database.types'

export const KATEGORI_ARTIKEL: KategoriArtikel[] = ['berita', 'artikel', 'pengumuman']

export const labelKategoriArtikel: Record<KategoriArtikel, string> = {
  berita: 'Berita',
  artikel: 'Artikel',
  pengumuman: 'Pengumuman',
}

export function namaKategoriArtikel(kategori: KategoriArtikel): string {
  return labelKategoriArtikel[kategori] ?? kategori
}

const formatTanggal = new Intl.DateTimeFormat('id-ID', {
  timeZone: 'Asia/Jakarta',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function formatTanggalArtikel(nilai: string | null): string {
  if (!nilai) return '-'
  const tanggal = new Date(nilai)
  if (Number.isNaN(tanggal.getTime())) return '-'
  return `${formatTanggal.format(tanggal)} WIB`
}
