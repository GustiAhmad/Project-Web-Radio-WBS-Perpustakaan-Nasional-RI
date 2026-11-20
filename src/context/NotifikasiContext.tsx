import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import ToastNotifikasi from '../components/common/ToastNotifikasi'

export type JenisNotifikasi = 'galat' | 'sukses' | 'info'

type Notifikasi = {
  id: number
  jenis: JenisNotifikasi
  pesan: string
}

type KonteksNotifikasi = {
  beriNotifikasi: (jenis: JenisNotifikasi, pesan: string) => void
  tutupNotifikasi: (id: number) => void
}

const Konteks = createContext<KonteksNotifikasi | null>(null)

export function NotifikasiProvider({ children }: { children: ReactNode }) {
  const [daftar, setDaftar] = useState<Notifikasi[]>([])
  const urutan = useRef(0)

  const tutupNotifikasi = useCallback((id: number) => {
    setDaftar((item) => item.filter((notifikasi) => notifikasi.id !== id))
  }, [])

  const beriNotifikasi = useCallback((jenis: JenisNotifikasi, pesan: string) => {
    const isi = pesan.trim()
    if (!isi) return

    urutan.current += 1
    setDaftar((item) => [...item.slice(-2), { id: urutan.current, jenis, pesan: isi }])

    if (jenis === 'galat' && typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if (daftar.length === 0) return
    const pengaturWaktu = window.setTimeout(() => {
      tutupNotifikasi(daftar[0].id)
    }, 6000)
    return () => window.clearTimeout(pengaturWaktu)
  }, [daftar, tutupNotifikasi])

  const nilai = useMemo(
    () => ({ beriNotifikasi, tutupNotifikasi }),
    [beriNotifikasi, tutupNotifikasi]
  )

  return (
    <Konteks.Provider value={nilai}>
      {children}
      <ToastNotifikasi daftar={daftar} padaTutup={tutupNotifikasi} />
    </Konteks.Provider>
  )
}

export function useNotifikasi(): KonteksNotifikasi {
  const nilai = useContext(Konteks)
  if (!nilai) throw new Error('useNotifikasi harus dipakai di dalam NotifikasiProvider.')
  return nilai
}
