import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import type { JadwalTetap } from '../types/database.types'
import {
  dalamRentang,
  jamTanpaDetik,
  jenisHariSiaran,
  waktuWibSekarang,
} from '../utils/timeUtils'

type ProgramSiaran = Pick<
  JadwalTetap,
  'id' | 'nama_program' | 'jam_mulai' | 'jam_selesai' | 'interaktif' | 'deskripsi'
>

export function useOnAirProgram() {
  const [jadwal, setJadwal] = useState<ProgramSiaran[]>([])
  const [waktu, setWaktu] = useState(waktuWibSekarang)

  useEffect(() => {
    const pengaturWaktu = window.setInterval(() => setWaktu(waktuWibSekarang()), 30_000)
    return () => window.clearInterval(pengaturWaktu)
  }, [])

  const jenisHari = jenisHariSiaran(waktu)

  useEffect(() => {
    if (!supabase) return

    let masihAktif = true
    void supabase
      .from('jadwal_tetap')
      .select('id, nama_program, jam_mulai, jam_selesai, interaktif, deskripsi')
      .eq('hari', jenisHari)
      .eq('status', 'terbit')
      .order('jam_mulai', { ascending: true })
      .then(({ data, error }) => {
        if (!masihAktif) return
        if (error) {
          console.error('[WBS] Gagal memuat jadwal siaran:', error.message)
          return
        }
        setJadwal((data ?? []) as ProgramSiaran[])
      })

    return () => {
      masihAktif = false
    }
  }, [jenisHari])

  const jam = jamTanpaDetik(waktu)
  const indeks = jadwal.findIndex((item) => dalamRentang(jam, item.jam_mulai, item.jam_selesai))
  const program = indeks >= 0 ? jadwal[indeks] : null
  const berikutnya = jadwal.length > 0 ? jadwal[(indeks + 1) % jadwal.length] : null

  return { program, berikutnya, jam, jenisHari }
}
