import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../services/supabase'

export function useRealtimeLaporan() {
  const { peran } = useAuth()
  const [jumlahBaru, setJumlahBaru] = useState(0)
  const [versi, setVersi] = useState(0)

  useEffect(() => {
    if (!supabase || peran !== 'superadmin') return

    const namaChannel = `wbs-laporan-${Date.now()}-${Math.random().toString(36).slice(2)}`
    const klien = supabase
    const channel = klien
      .channel(namaChannel)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'laporan_error' }, (payload) => {
        setVersi((nilai) => nilai + 1)
        if (payload.eventType === 'INSERT') setJumlahBaru((nilai) => nilai + 1)
      })
      .subscribe()

    return () => {
      void klien.removeChannel(channel)
    }
  }, [peran])

  return { jumlahBaru, versi, tandaiDibaca: () => setJumlahBaru(0) }
}
