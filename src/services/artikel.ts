import { supabase } from './supabase'
import { hapusGambar, jalurGambar, unggahGambar } from './aset'
import type { Artikel, KategoriArtikel, StatusPublikasi } from '../types/database.types'
import { sanitasiHtml, teksDariHtml } from '../utils/sanitasiHtml'
import { bersihkanTeks, slugify } from '../utils/stringUtils'

const KOLOM_DAFTAR =
  'id, judul, slug, kategori, ringkasan, gambar_url, teks_alternatif, penulis, diterbitkan_pada, status, dibuat_pada, diubah_pada'
const KOLOM_LENGKAP =
  'id, judul, slug, kategori, ringkasan, isi, gambar_path, gambar_url, teks_alternatif, status, penulis, diterbitkan_pada, dibuat_pada, dibuat_oleh, diubah_pada, diubah_oleh'

type Galat = string | null

export type DraftArtikel = {
  id: string | null
  judul: string
  slug: string
  kategori: KategoriArtikel
  ringkasan: string
  isi: string
  gambar: File | null
  gambar_path: string | null
  gambar_url: string | null
  hapusGambarLama: boolean
  teks_alternatif: string
  status: StatusPublikasi
  penulis: string
  dibuat_oleh: string | null
  diubah_oleh: string | null
}

function koneksi(): Galat {
  return supabase ? null : 'Koneksi ke studio belum tersedia. Periksa pengaturan Supabase.'
}

function pesanGalat(galat: { message: string } | null, konteks: string): Galat {
  return galat ? `${konteks}: ${galat.message}` : null
}

export async function ambilDaftarArtikelPublik(
  kategori: KategoriArtikel | 'semua',
  halaman: number,
  perHalaman = 6
): Promise<{ artikel: Artikel[]; total: number; galat: Galat }> {
  const galatKoneksi = koneksi()
  if (galatKoneksi) return { artikel: [], total: 0, galat: galatKoneksi }

  let query = supabase!
    .from('artikel')
    .select(KOLOM_DAFTAR, { count: 'exact' })
    .eq('status', 'terbit')
    .lte('diterbitkan_pada', new Date().toISOString())

  if (kategori !== 'semua') query = query.eq('kategori', kategori)

  const mulai = (Math.max(1, halaman) - 1) * perHalaman
  const { data, count, error } = await query
    .order('diterbitkan_pada', { ascending: false })
    .range(mulai, mulai + perHalaman - 1)

  return {
    artikel: (data ?? []) as Artikel[],
    total: count ?? 0,
    galat: pesanGalat(error, 'Gagal memuat artikel'),
  }
}

export async function ambilArtikelTerbaru(batas = 3): Promise<{ artikel: Artikel[]; galat: Galat }> {
  const galatKoneksi = koneksi()
  if (galatKoneksi) return { artikel: [], galat: galatKoneksi }

  const { data, error } = await supabase!
    .from('artikel')
    .select(KOLOM_DAFTAR)
    .eq('status', 'terbit')
    .lte('diterbitkan_pada', new Date().toISOString())
    .order('diterbitkan_pada', { ascending: false })
    .limit(batas)

  return { artikel: (data ?? []) as Artikel[], galat: pesanGalat(error, 'Gagal memuat artikel terbaru') }
}

export async function ambilArtikelPublikBySlug(slug: string): Promise<{ artikel: Artikel | null; galat: Galat }> {
  const galatKoneksi = koneksi()
  if (galatKoneksi) return { artikel: null, galat: galatKoneksi }

  const { data, error } = await supabase!
    .from('artikel')
    .select(KOLOM_LENGKAP)
    .eq('slug', slug)
    .eq('status', 'terbit')
    .lte('diterbitkan_pada', new Date().toISOString())
    .maybeSingle()

  return { artikel: (data as Artikel | null) ?? null, galat: pesanGalat(error, 'Gagal memuat artikel') }
}

export async function ambilSemuaArtikelAdmin(): Promise<{ artikel: Artikel[]; galat: Galat }> {
  const galatKoneksi = koneksi()
  if (galatKoneksi) return { artikel: [], galat: galatKoneksi }

  const { data, error } = await supabase!
    .from('artikel')
    .select(KOLOM_DAFTAR)
    .order('dibuat_pada', { ascending: false })

  return { artikel: (data ?? []) as Artikel[], galat: pesanGalat(error, 'Gagal memuat daftar artikel') }
}

export async function ambilArtikelAdminById(id: string): Promise<{ artikel: Artikel | null; galat: Galat }> {
  const galatKoneksi = koneksi()
  if (galatKoneksi) return { artikel: null, galat: galatKoneksi }

  const { data, error } = await supabase!.from('artikel').select(KOLOM_LENGKAP).eq('id', id).maybeSingle()
  return { artikel: (data as Artikel | null) ?? null, galat: pesanGalat(error, 'Gagal memuat artikel') }
}

export function validasiDraftArtikel(draft: DraftArtikel): Galat {
  const judul = bersihkanTeks(draft.judul, 200)
  if (judul.length < 5) return 'Judul wajib diisi minimal 5 karakter.'
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.slug)) return 'Slug hanya boleh huruf kecil, angka, dan tanda hubung.'
  if (draft.slug.length > 200) return 'Slug terlalu panjang.'

  const ringkasan = bersihkanTeks(draft.ringkasan, 300)
  if (ringkasan.length < 20) return 'Ringkasan wajib diisi minimal 20 karakter.'

  if (teksDariHtml(draft.isi).length < 50) return 'Isi artikel wajib diisi minimal 50 karakter.'
  if (!draft.penulis.trim()) return 'Nama penulis wajib diisi.'
  return null
}

export async function slugUnikArtikel(slug: string, idSaatIni: string | null): Promise<string> {
  if (!supabase) return slug
  let kandidat = slug
  let nomor = 2
  while (true) {
    let query = supabase.from('artikel').select('id').eq('slug', kandidat)
    if (idSaatIni) query = query.neq('id', idSaatIni)
    const { data } = await query.maybeSingle()
    if (!data) return kandidat
    kandidat = `${slug}-${nomor++}`.slice(0, 200)
  }
}

export function slugDariJudul(judul: string): string {
  return slugify(bersihkanTeks(judul, 200)) || 'artikel'
}

export async function simpanArtikel(draft: DraftArtikel): Promise<{ id: string; galat: Galat }> {
  if (!supabase) return { id: '', galat: koneksi() }

  const galatValidasi = validasiDraftArtikel(draft)
  if (galatValidasi) return { id: '', galat: galatValidasi }

  const id = draft.id ?? crypto.randomUUID()
  const klien = supabase
  const slug = await slugUnikArtikel(draft.slug, draft.id)
  let gambarPath = draft.gambar_path
  let gambarUrl = draft.gambar_url

  try {
    if (draft.gambar) {
      gambarPath = jalurGambar('artikel', id, draft.gambar)
      gambarUrl = await unggahGambar('artikel', id, draft.gambar)
    } else if (draft.hapusGambarLama && draft.gambar_path) {
      await hapusGambar(draft.gambar_path)
      gambarPath = null
      gambarUrl = null
    }

    const sekarang = new Date().toISOString()
    const data = {
      judul: bersihkanTeks(draft.judul, 200),
      slug,
      kategori: draft.kategori,
      ringkasan: bersihkanTeks(draft.ringkasan, 300),
      isi: sanitasiHtml(draft.isi),
      gambar_path: gambarPath,
      gambar_url: gambarUrl,
      teks_alternatif: draft.teks_alternatif.trim() ? bersihkanTeks(draft.teks_alternatif, 200) : null,
      status: draft.status,
      penulis: bersihkanTeks(draft.penulis, 150),
      diterbitkan_pada: draft.status === 'terbit' ? (draft.id ? (await ambilTanggalTerbit(draft.id)) ?? sekarang : sekarang) : null,
      dibuat_pada: draft.id ? undefined : sekarang,
      dibuat_oleh: draft.id ? undefined : draft.dibuat_oleh,
      diubah_pada: sekarang,
      diubah_oleh: draft.diubah_oleh,
    }

    const respons = draft.id
      ? await klien.from('artikel').update(data).eq('id', draft.id)
      : await klien.from('artikel').insert({ ...data, id })

    if (respons.error) return { id: '', galat: pesanGalat(respons.error, 'Gagal menyimpan artikel') }
    return { id: draft.id ?? id, galat: null }
  } catch (error) {
    return { id: '', galat: error instanceof Error ? error.message : 'Gagal menyimpan artikel.' }
  }
}

async function ambilTanggalTerbit(id: string): Promise<string | null> {
  if (!supabase) return null
  const { data } = await supabase.from('artikel').select('diterbitkan_pada').eq('id', id).maybeSingle()
  return (data?.diterbitkan_pada as string | null) ?? null
}

export async function ubahStatusArtikel(
  artikel: Artikel,
  status: StatusPublikasi,
  petugas: string | null
): Promise<Galat> {
  if (!supabase) return koneksi()
  const { error } = await supabase!
    .from('artikel')
    .update({
      status,
      diterbitkan_pada: status === 'terbit' ? new Date().toISOString() : null,
      diubah_pada: new Date().toISOString(),
      diubah_oleh: petugas,
    })
    .eq('id', artikel.id)
  return pesanGalat(error, 'Gagal mengubah status artikel')
}

export async function hapusArtikel(artikel: Artikel): Promise<Galat> {
  if (!supabase) return koneksi()
  const { error } = await supabase!.from('artikel').delete().eq('id', artikel.id)
  if (error) return pesanGalat(error, 'Gagal menghapus artikel')
  if (artikel.gambar_path) {
    try {
      await hapusGambar(artikel.gambar_path)
    } catch {
      // Baris sudah terhapus; gambar yatim akan dibersihkan pengelola storage.
    }
  }
  return null
}
