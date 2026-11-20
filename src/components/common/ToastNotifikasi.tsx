import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'
import type { JenisNotifikasi } from '../../context/NotifikasiContext'

type Notifikasi = {
  id: number
  jenis: JenisNotifikasi
  pesan: string
}

type Props = {
  daftar: Notifikasi[]
  padaTutup: (id: number) => void
}

const gaya: Record<JenisNotifikasi, { bingkai: string; ikon: typeof AlertCircle; warna: string }> = {
  galat: {
    bingkai: 'border-red-200 bg-red-50',
    ikon: AlertCircle,
    warna: 'text-red-800',
  },
  sukses: {
    bingkai: 'border-green-200 bg-green-50',
    ikon: CheckCircle2,
    warna: 'text-green-800',
  },
  info: {
    bingkai: 'border-perpusnas-blue/20 bg-perpusnas-blue-light',
    ikon: Info,
    warna: 'text-perpusnas-blue-dark',
  },
}

export default function ToastNotifikasi({ daftar, padaTutup }: Props) {
  if (daftar.length === 0) return null

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-20 z-[60] flex flex-col items-stretch gap-2 sm:inset-x-auto sm:right-6 sm:top-6 sm:w-[380px] sm:items-end"
    >
      {daftar.map((notifikasi) => {
        const Ikon = gaya[notifikasi.jenis].ikon
        return (
          <div
            key={notifikasi.id}
            role={notifikasi.jenis === 'galat' ? 'alert' : 'status'}
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${gaya[notifikasi.jenis].bingkai}`}
          >
            <Ikon size={18} aria-hidden="true" className={`mt-0.5 shrink-0 ${gaya[notifikasi.jenis].warna}`} />
            <p className={`flex-1 text-sm font-medium leading-snug ${gaya[notifikasi.jenis].warna}`}>
              {notifikasi.pesan}
            </p>
            <button
              type="button"
              onClick={() => padaTutup(notifikasi.id)}
              aria-label="Tutup notifikasi"
              className={`shrink-0 rounded p-0.5 ${gaya[notifikasi.jenis].warna} opacity-70 hover:opacity-100`}
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
