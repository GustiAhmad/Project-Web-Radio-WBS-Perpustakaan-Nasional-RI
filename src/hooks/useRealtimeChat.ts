import { useCallback, useEffect, useState } from 'react'
import { ambilPesan, kirimPesanChat } from '../services/chat'
import { supabase } from '../services/supabase'
import type { ChatPesan } from '../types/database.types'

/** Daftar pesan satu sesi, diperbarui lewat Realtime tanpa memuat ulang halaman. */
export function useRealtimeChat(sesiId: string | null) {
  const [pesan, setPesan] = useState<ChatPesan[]>([])
  const [memuat, setMuat] = useState(false)
  const [galat, setGalat] = useState('')

  const muatUlang = useCallback(async (): Promise<void> => {
    if (!sesiId) {
      setPesan([])
      return
    }
    const hasil = await ambilPesan(sesiId)
    setPesan(hasil.pesan)
    setGalat(hasil.galat ?? '')
  }, [sesiId])

  useEffect(() => {
    if (!sesiId) {
      setPesan([])
      setMuat(false)
      return
    }

    const klien = supabase
    if (!klien) {
      setGalat('Koneksi ke studio belum tersedia. Periksa pengaturan Supabase.')
      setMuat(false)
      return
    }

    let masihAktif = true
    setMuat(true)
    void ambilPesan(sesiId).then((hasil) => {
      if (!masihAktif) return
      setPesan(hasil.pesan)
      setGalat(hasil.galat ?? '')
      setMuat(false)
    })

    const channel = klien
      .channel(`chat-pesan-${sesiId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_pesan', filter: `sesi_id=eq.${sesiId}` },
        () => {
          void muatUlang()
        }
      )
      .subscribe()

    return () => {
      masihAktif = false
      void klien.removeChannel(channel)
    }
  }, [sesiId, muatUlang])

  const kirim = useCallback(
    async (nama: string, isi: string): Promise<string> => {
      if (!sesiId) return 'Sesi chat sudah ditutup.'
      const galat = await kirimPesanChat(sesiId, nama, isi)
      if (galat) {
        setGalat(galat)
        return galat
      }
      setGalat('')
      await muatUlang()
      return ''
    },
    [sesiId, muatUlang]
  )

  return { pesan, memuat, galat, muatUlang, kirim }
}
