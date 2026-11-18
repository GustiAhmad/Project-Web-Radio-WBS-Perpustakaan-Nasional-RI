import type { SesiOnAir } from './database.types'

export type SesiOnAirAktif = Pick<
  SesiOnAir,
  'id' | 'tanggal' | 'nama_program' | 'jam_mulai' | 'jam_selesai' | 'status' | 'acara_id'
>

export type StatusKirim = 'idle' | 'mengirim' | 'sukses' | 'gagal'

export const BATAS_NAMA = 100
export const BATAS_PERTANYAAN = 500
export const JEDA_KIRIM_MS = 30_000
export const KUNCI_JEDA_KIRIM = 'wbs_qna_kirim_terakhir'
