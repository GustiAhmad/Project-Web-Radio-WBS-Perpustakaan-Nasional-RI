import type { SesiChat } from './database.types'

export type SesiChatAktif = Pick<SesiChat, 'id' | 'nama_sesi' | 'status' | 'dibuka_pada' | 'dibuka_oleh'>

export type StatusKirim = 'idle' | 'mengirim' | 'sukses' | 'gagal'

export const BATAS_NAMA = 100
export const BATAS_PESAN = 500
export const JEDA_KIRIM_MS = 30_000
export const KUNCI_JEDA_KIRIM = 'wbs_chat_kirim_terakhir'
