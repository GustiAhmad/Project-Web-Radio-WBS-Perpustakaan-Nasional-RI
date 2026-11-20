import { PESAN_GAMBAR_TIDAK_VALID, terimaBerkas, unggahGambar } from './aset'
import { supabase } from './supabase'
import type { Database, Seri } from '../types/database.types'
import { adaIsi, bersihkanTeks, slugify } from '../utils/stringUtils'

export type Kategori = Database['public']['Enums']['kategori_topik']

export type DraftSeri = {
  nama: string
  deskripsi: string
  kategori: Kategori
  urutan: number
  unggulan: boolean
  gambarUrl: string | null
  gambar: File | null
  teksAlternatif: string
}

export const daftarKategori: Kategori[] = [
  'layanan_perpustakaan',
  'naskah_nusantara',
  'literasi_keluarga',
  'sejarah_kebudayaan',
  'semua_kategori',
]

export const labelKategori: Record<Kategori, string> = {
  layanan_perpustakaan: 'Layanan Perpustakaan',
  naskah_nusantara: 'Naskah Nusantara',
  literasi_keluarga: 'Literasi Keluarga',
  sejarah_kebudayaan: 'Sejarah & Kebudayaan',
  semua_kategori: 'Semua Kategori',
}

export function draftKosongSeri(seri: Seri[]): DraftSeri {
  const urutanTerakhir = seri.reduce((maks, item) => Math.max(maks, item.urutan), 0)
  return {
    nama: '',
    deskripsi: '',
    kategori: 'semua_kategori',
    urutan: urutanTerakhir + 1,
    unggulan: false,
    gambarUrl: null,
    gambar: null,
    teksAlternatif: '',
  }
}

export function slugUnikSeri(nama: string, seri: Seri[]): string {
  const dasar = slugify(nama) || 'seri'
  let slug = dasar
  let angka = 2
  while (seri.some((item) => item.slug === slug)) {
    slug = `${dasar}-${angka}`
    angka += 1
  }
  return slug
}

/** Mengembalikan pesan galat, atau string kosong bila draft valid. */
export function validasiDraftSeri(draft: DraftSeri, seri: Seri[], id: string | null): string {
  if (!adaIsi(draft.nama)) return 'Nama seri wajib diisi.'
  const nama = draft.nama.trim()
  if (nama.length > 100) return 'Nama seri maksimal 100 karakter.'
  if (seri.some((item) => item.id !== id && item.nama.toLowerCase() === nama.toLowerCase())) {
    return `Seri "${nama}" sudah ada. Gunakan nama lain.`
  }
  if (draft.deskripsi.trim().length < 10) return 'Deskripsi seri wajib diisi minimal 10 karakter.'
  if (draft.gambar && !terimaBerkas(draft.gambar)) return PESAN_GAMBAR_TIDAK_VALID
  return ''
}

/** Menyimpan seri baru atau perubahan seri. Melempar Error dengan pesan siap tampil. */
export async function simpanSeri(draft: DraftSeri, seri: Seri[], id: string | null): Promise<void> {
  if (!supabase) throw new Error('Koneksi ke studio belum tersedia.')

  const nama = bersihkanTeks(draft.nama, 100)
  const deskripsi = bersihkanTeks(draft.deskripsi, 4000)
  const teksAlternatif = draft.teksAlternatif.trim() ? bersihkanTeks(draft.teksAlternatif, 255) : null

  let idSeri = id
  if (idSeri) {
    const { error } = await supabase
      .from('seri')
      .update({
        nama,
        deskripsi,
        kategori: draft.kategori,
        urutan: draft.urutan,
        unggulan: draft.unggulan,
      })
      .eq('id', idSeri)
    if (error) throw new Error(`Gagal menyimpan seri: ${error.message}`)
  } else {
    const { data: seriBaru, error } = await supabase
      .from('seri')
      .insert({
        nama,
        slug: slugUnikSeri(nama, seri),
        kategori: draft.kategori,
        jenis: 'resmi',
        deskripsi,
        urutan: draft.urutan,
        unggulan: draft.unggulan,
        teks_alternatif: teksAlternatif,
      })
      .select('id')
      .single()
    if (error) throw new Error(`Gagal menambah seri: ${error.message}`)
    idSeri = seriBaru.id
  }

  let urlGambar = draft.gambarUrl
  if (draft.gambar && idSeri) {
    try {
      urlGambar = await unggahGambar('seri', idSeri, draft.gambar)
    } catch (galatUnggah) {
      throw new Error(galatUnggah instanceof Error ? galatUnggah.message : 'Gambar seri gagal diunggah.')
    }
  }

  const { error: galatGambar } = await supabase
    .from('seri')
    .update({ gambar_url: urlGambar, teks_alternatif: teksAlternatif })
    .eq('id', idSeri)
  if (galatGambar) throw new Error(`Gambar seri gagal disimpan: ${galatGambar.message}`)
}
