import { useEffect, useRef } from 'react'
import { useNotifikasi } from '../context/NotifikasiContext'

/** Memunculkan toast dan menggulir ke atas ketika pesan galat berubah. */
export function useNotifikasiGalat(galat: string): void {
  const { beriNotifikasi } = useNotifikasi()
  const pesanTerakhir = useRef('')

  useEffect(() => {
    const isi = galat.trim()
    if (!isi) {
      pesanTerakhir.current = ''
      return
    }
    if (isi === pesanTerakhir.current) return
    pesanTerakhir.current = isi
    beriNotifikasi('galat', isi)
  }, [galat, beriNotifikasi])
}
