import { useEffect, useRef, useState } from 'react'
import { supabase } from '../services/supabase'
import type { SesiOnAirAktif } from '../types/qna.types'

const KOLOM_SESI = 'id, tanggal, nama_program, jam_mulai, jam_selesai, status, acara_id'

export function useRealtimeQnA() {
  const [sesi, setSesi] = useState<SesiOnAirAktif | null>(null)
  const [memuat, setMuat] = useState(true)
  const [modeLive, setModeLive] = useState(false)
  const sesiIdRef = useRef<string | null>(null)

  useEffect(() => {
    const klien = supabase
    if (!klien) {
      setMuat(false)
      return
    }

    let masihAktif = true

    async function terapkanModeLive(acaraId: string | null | undefined): Promise<void> {
      if (!acaraId) {
        if (masihAktif) setModeLive(false)
        return
      }
      const { data, error } = await klien!
        .from('acara_mendatang')
        .select('kanal')
        .eq('id', acaraId)
        .maybeSingle()
      if (error) console.error(`[WBS] Gagal memuat kanal acara: ${error.message}`)
      if (masihAktif) setModeLive((data as { kanal: string } | null)?.kanal === 'youtube')
    }

    async function muatSesiAwal(): Promise<void> {
      const { data, error } = await klien!
        .from('sesi_onair')
        .select(KOLOM_SESI)
        .eq('status', 'terbuka')
        .order('dibuka_pada', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (!masihAktif) return
      if (error) console.error(`[WBS] Gagal memuat sesi tanya jawab: ${error.message}`)

      const aktif = (data as SesiOnAirAktif | null) ?? null
      sesiIdRef.current = aktif?.id ?? null
      setSesi(aktif)
      setMuat(false)
      await terapkanModeLive(aktif?.acara_id)
    }

    void muatSesiAwal()

    const namaChannel = `wbs-qna-${Date.now()}-${Math.random().toString(36).slice(2)}`
    const channel = klien
      .channel(namaChannel)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sesi_onair' }, (payload) => {
        if (!masihAktif) return
        const baru = payload.new as unknown as Partial<SesiOnAirAktif> | null
        const lama = payload.old as unknown as { id?: string } | null
        const id = baru?.id ?? lama?.id ?? null

        if (sesiIdRef.current && id !== sesiIdRef.current) return

        if (payload.eventType === 'DELETE' || baru?.status === 'tertutup') {
          sesiIdRef.current = null
          setSesi(null)
          setModeLive(false)
          return
        }

        if (baru?.status === 'terbuka' && baru.id) {
          sesiIdRef.current = baru.id
          setSesi(baru as SesiOnAirAktif)
          void terapkanModeLive(baru.acara_id)
        }
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pertanyaan' }, () => {
        // Langganan ini mengawal alur CDC sesuai roadmap. Pertanyaan pendengar
        // sengaja tidak dikirim ke klien publik karena RLS SELECT hanya untuk staf.
      })
      .subscribe()

    return () => {
      masihAktif = false
      void klien.removeChannel(channel)
    }
  }, [])

  return { sesi, memuat, modeLive }
}
