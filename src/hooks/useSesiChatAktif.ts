import { useEffect, useRef, useState } from 'react'
import { ambilSesiChatAktif } from '../services/chat'
import { lacakEvent } from '../services/ga4'
import { supabase } from '../services/supabase'
import type { SesiChatAktif } from '../types/chat.types'

/** Sesi chat berdiri sendiri, tidak bergantung pada jadwal atau acara. */
export function useSesiChatAktif() {
  const [sesi, setSesi] = useState<SesiChatAktif | null>(null)
  const [memuat, setMuat] = useState(true)
  const idSesiSebelumnya = useRef<string | null>(null)
  const sudahDimuatAwal = useRef(false)

  useEffect(() => {
    const klien = supabase
    if (!klien) {
      setMuat(false)
      return
    }

    let masihAktif = true

    async function perbarui(): Promise<void> {
      const hasil = await ambilSesiChatAktif()
      if (!masihAktif) return
      if (hasil.galat) console.error(`[WBS] ${hasil.galat}`)

      const idBaru = hasil.sesi?.id ?? null
      if (sudahDimuatAwal.current && idBaru !== idSesiSebelumnya.current) {
        lacakEvent(idBaru ? 'chat_sesi_dibuka' : 'chat_sesi_ditutup')
      }
      idSesiSebelumnya.current = idBaru
      sudahDimuatAwal.current = true

      setSesi(hasil.sesi)
      setMuat(false)
    }

    void perbarui()

    const channel = klien
      .channel('sesi-chat-status')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sesi_chat' }, () => {
        void perbarui()
      })
      .subscribe()

    return () => {
      masihAktif = false
      void klien.removeChannel(channel)
    }
  }, [])

  return { sesi, memuat }
}
