import { supabase } from './supabase'
import type { AcaraMendatang, Episode, HalamanStatis, Seri } from '../types/database.types'
import { tanggalWibHariIni } from '../utils/timeUtils'

export type { AcaraMendatang }

export type SeriKatalog = Pick<
  Seri,
  'id' | 'nama' | 'slug' | 'kategori' | 'jenis' | 'deskripsi' | 'gambar_url' | 'teks_alternatif' | 'urutan' | 'unggulan'
>

export type EpisodeKatalog = Pick<
  Episode,
  | 'id'
  | 'seri_id'
  | 'judul'
  | 'slug'
  | 'nomor_episode'
  | 'tanggal_tayang'
  | 'durasi_detik'
  | 'narasumber'
  | 'moderator'
  | 'topik'
  | 'video_id'
  | 'deskripsi'
  | 'status'
>

const kolomSeri = 'id, nama, slug, kategori, jenis, deskripsi, gambar_url, teks_alternatif, urutan, unggulan'
const kolomEpisode =
  'id, seri_id, judul, slug, nomor_episode, tanggal_tayang, durasi_detik, narasumber, moderator, topik, video_id, deskripsi, status'

function gagal(konteks: string, pesan: string): void {
  console.error(`[WBS] Gagal ${konteks}: ${pesan}`)
}

export async function ambilSemuaSeri(): Promise<SeriKatalog[]> {
  if (!supabase) return []
  const { data, error } = await supabase.from('seri').select(kolomSeri).order('urutan', { ascending: true })
  if (error) {
    gagal('memuat seri', error.message)
    return []
  }
  return (data ?? []) as SeriKatalog[]
}

export async function ambilSeriUnggulan(): Promise<SeriKatalog[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('seri')
    .select(kolomSeri)
    .eq('unggulan', true)
    .order('urutan', { ascending: true })
    .limit(6)
  if (error) {
    gagal('memuat seri unggulan', error.message)
    return []
  }
  return (data ?? []) as SeriKatalog[]
}

export async function ambilSeri(slug: string): Promise<SeriKatalog | null> {
  if (!supabase) return null
  const { data, error } = await supabase.from('seri').select(kolomSeri).eq('slug', slug).maybeSingle()
  if (error) {
    gagal('memuat detail seri', error.message)
    return null
  }
  return (data as SeriKatalog | null) ?? null
}

export async function ambilEpisodeTerbaru(batas = 4): Promise<EpisodeKatalog[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('episode')
    .select(kolomEpisode)
    .eq('status', 'tayang')
    .order('tanggal_tayang', { ascending: false })
    .limit(batas)
  if (error) {
    gagal('memuat episode terbaru', error.message)
    return []
  }
  return (data ?? []) as EpisodeKatalog[]
}

export async function ambilEpisodeSeri(seriId: string): Promise<EpisodeKatalog[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('episode')
    .select(kolomEpisode)
    .eq('seri_id', seriId)
    .eq('status', 'tayang')
    .order('nomor_episode', { ascending: true, nullsFirst: false })
    .order('tanggal_tayang', { ascending: false })
  if (error) {
    gagal('memuat episode seri', error.message)
    return []
  }
  return (data ?? []) as EpisodeKatalog[]
}

export async function ambilEpisode(slug: string): Promise<EpisodeKatalog | null> {
  if (!supabase) return null
  const { data, error } = await supabase.from('episode').select(kolomEpisode).eq('slug', slug).maybeSingle()
  if (error) {
    gagal('memuat detail episode', error.message)
    return null
  }
  return (data as EpisodeKatalog | null) ?? null
}

export async function ambilRingkasanEpisode(): Promise<EpisodeKatalog[]> {
  if (!supabase) return []
  const { data, error } = await supabase.from('episode').select(kolomEpisode).eq('status', 'tayang')
  if (error) {
    gagal('memuat ringkasan episode', error.message)
    return []
  }
  return (data ?? []) as EpisodeKatalog[]
}

export async function ambilAcaraMendatang(): Promise<AcaraMendatang[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('acara_mendatang')
    .select('id, judul, tanggal, jam_mulai, jam_selesai, kanal, tautan_acara, deskripsi')
    .eq('status', 'terbit')
    .gte('tanggal', tanggalWibHariIni())
    .order('tanggal', { ascending: true })
    .order('jam_mulai', { ascending: true })
    .limit(3)
  if (error) {
    gagal('memuat acara mendatang', error.message)
    return []
  }
  return (data ?? []) as AcaraMendatang[]
}

export async function ambilHalaman(slug: string): Promise<HalamanStatis | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('halaman_statis')
    .select('id, slug, judul, ringkasan, konten_markdown, updated_at')
    .eq('slug', slug)
    .maybeSingle()
  if (error) {
    gagal('memuat halaman statis', error.message)
    return null
  }
  return (data as HalamanStatis | null) ?? null
}
