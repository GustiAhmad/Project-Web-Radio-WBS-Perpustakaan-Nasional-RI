import type { StatusLaporan, TingkatKeparahan } from './database.types'

export const BATAS_JUDUL = 150
export const BATAS_DESKRIPSI = 2000
export const BATAS_LANGKAH = 2000
export const UKURAN_MAKSIMAL_SCREENSHOT = 2 * 1024 * 1024
export const MIME_SCREENSHOT = ['image/png', 'image/jpeg', 'image/webp'] as const

export const labelStatusLaporan: Record<StatusLaporan, string> = {
  baru: 'Baru',
  diproses: 'Diproses',
  selesai: 'Selesai',
  ditolak: 'Ditolak',
}

export const labelKeparahan: Record<TingkatKeparahan, string> = {
  rendah: 'Rendah',
  sedang: 'Sedang',
  tinggi: 'Tinggi',
  kritis: 'Kritis',
}

export const kelasStatusLaporan: Record<StatusLaporan, string> = {
  baru: 'bg-perpusnas-gold-light text-perpusnas-blue-dark',
  diproses: 'bg-perpusnas-blue-light text-perpusnas-blue',
  selesai: 'bg-green-50 text-green-800',
  ditolak: 'bg-red-50 text-red-800',
}

export const kelasKeparahan: Record<TingkatKeparahan, string> = {
  rendah: 'bg-perpusnas-gray-100 text-perpusnas-gray-600',
  sedang: 'bg-perpusnas-blue-light text-perpusnas-blue',
  tinggi: 'bg-orange-50 text-orange-800',
  kritis: 'bg-red-50 text-red-800',
}
