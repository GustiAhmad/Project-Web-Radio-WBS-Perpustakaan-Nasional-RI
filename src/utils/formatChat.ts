import type { ChatPesan } from '../types/database.types'
import { unduhCsv } from './csv'
import { bersihkanTeks } from './stringUtils'

const formatWaktu = new Intl.DateTimeFormat('id-ID', {
  timeZone: 'Asia/Jakarta',
  dateStyle: 'medium',
  timeStyle: 'short',
})

export function waktuTampil(nilai: string | null): string {
  return nilai ? formatWaktu.format(new Date(nilai)) : '-'
}

export const labelStatus: Record<ChatPesan['status'], string> = {
  terlihat: 'Terlihat',
  disembunyikan: 'Disembunyikan',
}

/** Satu format CSV untuk sesi berlangsung maupun arsip riwayat. */
export function unduhCsvChat(namaSesi: string, pesan: ChatPesan[]): void {
  if (pesan.length === 0) return
  const namaBerkas = `chat-${bersihkanTeks(namaSesi, 60).replace(/\s+/g, '-').toLowerCase()}.csv`
  unduhCsv(
    namaBerkas,
    ['Waktu', 'Nama', 'Isi Pesan', 'Status', 'Disembunyikan Oleh'],
    pesan.map((item) => [
      waktuTampil(item.created_at),
      item.nama,
      item.isi,
      labelStatus[item.status],
      item.disembunyikan_oleh ?? '',
    ])
  )
}
