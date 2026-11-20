import { supabase } from './supabase'
import type { SesiChatAktif } from '../types/chat.types'
import type { ChatPesan, SesiChat } from '../types/database.types'

const KOLOM_SESI_AKTIF = 'id, nama_sesi, status, dibuka_pada, dibuka_oleh'
const KOLOM_PESAN = 'id, sesi_id, nama, isi, status, disembunyikan_oleh, created_at, updated_at'

type Galat = string | null

function pesanGalat(galat: { message: string } | null, konteks: string): Galat {
  return galat ? `${konteks}: ${galat.message}` : null
}

function koneksi(): Galat {
  return supabase ? null : 'Koneksi ke studio belum tersedia. Periksa pengaturan Supabase.'
}

export async function ambilSesiChatAktif(): Promise<{ sesi: SesiChatAktif | null; galat: Galat }> {
  const galatKoneksi = koneksi()
  if (galatKoneksi) return { sesi: null, galat: galatKoneksi }

  const { data, error } = await supabase!
    .from('sesi_chat')
    .select(KOLOM_SESI_AKTIF)
    .eq('status', 'terbuka')
    .order('dibuka_pada', { ascending: false })
    .limit(1)
    .maybeSingle()

  return { sesi: (data as SesiChatAktif | null) ?? null, galat: pesanGalat(error, 'Gagal memuat sesi chat') }
}

export async function ambilSesiChatById(id: string): Promise<{ sesi: SesiChat | null; galat: Galat }> {
  const galatKoneksi = koneksi()
  if (galatKoneksi) return { sesi: null, galat: galatKoneksi }

  const { data, error } = await supabase!
    .from('sesi_chat')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  return { sesi: (data as SesiChat | null) ?? null, galat: pesanGalat(error, 'Gagal memuat sesi chat') }
}

export async function ambilRiwayatSesi(): Promise<{ riwayat: SesiChat[]; galat: Galat }> {
  const galatKoneksi = koneksi()
  if (galatKoneksi) return { riwayat: [], galat: galatKoneksi }

  const { data, error } = await supabase!
    .from('sesi_chat')
    .select('*')
    .eq('status', 'tertutup')
    .order('ditutup_pada', { ascending: false })

  return { riwayat: (data as SesiChat[] | null) ?? [], galat: pesanGalat(error, 'Gagal memuat riwayat sesi chat') }
}

export async function ambilPesan(sesiId: string): Promise<{ pesan: ChatPesan[]; galat: Galat }> {
  const galatKoneksi = koneksi()
  if (galatKoneksi) return { pesan: [], galat: galatKoneksi }

  const { data, error } = await supabase!
    .from('chat_pesan')
    .select(KOLOM_PESAN)
    .eq('sesi_id', sesiId)
    .order('created_at', { ascending: true })

  return { pesan: (data as ChatPesan[] | null) ?? [], galat: pesanGalat(error, 'Gagal memuat pesan chat') }
}

export async function bukaSesiChat(
  namaSesi: string,
  pembuka: { id: string | null; nama: string }
): Promise<Galat> {
  const galatKoneksi = koneksi()
  if (galatKoneksi) return galatKoneksi

  const { error } = await supabase!.from('sesi_chat').insert({
    nama_sesi: namaSesi,
    dibuka_oleh: pembuka.nama,
    dibuka_oleh_id: pembuka.id,
  })

  return pesanGalat(error, 'Gagal membuka sesi chat')
}

export async function tutupSesiChat(
  sesiId: string,
  penutup: { id: string | null; nama: string }
): Promise<Galat> {
  const galatKoneksi = koneksi()
  if (galatKoneksi) return galatKoneksi

  const { error } = await supabase!
    .from('sesi_chat')
    .update({
      status: 'tertutup',
      ditutup_pada: new Date().toISOString(),
      ditutup_oleh: penutup.nama,
      ditutup_oleh_id: penutup.id,
    })
    .eq('id', sesiId)
    .eq('status', 'terbuka')

  return pesanGalat(error, 'Gagal menutup sesi chat')
}

export async function hapusSesiChat(sesiId: string): Promise<Galat> {
  const galatKoneksi = koneksi()
  if (galatKoneksi) return galatKoneksi

  const { error } = await supabase!.from('sesi_chat').delete().eq('id', sesiId).eq('status', 'tertutup')
  return pesanGalat(error, 'Gagal menghapus riwayat sesi chat')
}

export async function kirimPesanChat(sesiId: string, nama: string, isi: string): Promise<Galat> {
  const galatKoneksi = koneksi()
  if (galatKoneksi) return galatKoneksi

  const { error } = await supabase!.from('chat_pesan').insert({ sesi_id: sesiId, nama, isi })
  return pesanGalat(error, 'Gagal mengirim pesan')
}

export async function ubahStatusPesan(
  pesanId: string,
  status: ChatPesan['status'],
  petugas: string
): Promise<Galat> {
  const galatKoneksi = koneksi()
  if (galatKoneksi) return galatKoneksi

  const { error } = await supabase!
    .from('chat_pesan')
    .update({
      status,
      disembunyikan_oleh: status === 'disembunyikan' ? petugas : null,
    })
    .eq('id', pesanId)

  return pesanGalat(error, 'Gagal memperbarui pesan')
}

export async function hapusPesanChat(pesanId: string): Promise<Galat> {
  const galatKoneksi = koneksi()
  if (galatKoneksi) return galatKoneksi

  const { error } = await supabase!.from('chat_pesan').delete().eq('id', pesanId)
  return pesanGalat(error, 'Gagal menghapus pesan')
}
