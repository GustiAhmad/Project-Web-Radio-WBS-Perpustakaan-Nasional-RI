import { useEffect, useState, type ChangeEvent } from 'react'
import { ImagePlus, Trash2 } from 'lucide-react'

type Props = {
  id: string
  label: string
  nilai: string | null
  berkas: File | null
  padaPilih: (berkas: File | null) => void
  padaHapus: () => void
  placeholder: string
  bantuan?: string
}

export default function UnggahGambarField({
  id,
  label,
  nilai,
  berkas,
  padaPilih,
  padaHapus,
  placeholder,
  bantuan,
}: Props) {
  const [pratinjau, setPratinjau] = useState('')

  useEffect(() => {
    if (!berkas) {
      setPratinjau('')
      return
    }
    const url = URL.createObjectURL(berkas)
    setPratinjau(url)
    return () => URL.revokeObjectURL(url)
  }, [berkas])

  function pilih(e: ChangeEvent<HTMLInputElement>): void {
    padaPilih(e.target.files?.[0] ?? null)
  }

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-perpusnas-gray-900">{label}</label>
      <div className="mt-2 flex flex-wrap items-start gap-4">
        <img
          src={pratinjau || nilai || placeholder}
          alt="Pratinjau gambar"
          width={160}
          height={90}
          className="h-24 w-40 rounded-lg border border-perpusnas-blue/10 bg-perpusnas-blue-light object-contain"
        />
        <div className="min-w-0 flex-1">
          <input
            id={id}
            type="file"
            accept="image/jpeg,image/png"
            onChange={pilih}
            className="block w-full text-xs text-perpusnas-gray-600 file:mr-3 file:rounded-full file:border-0 file:bg-perpusnas-blue-light file:px-4 file:py-2 file:text-xs file:font-semibold file:text-perpusnas-blue"
          />
          {(nilai || berkas) && (
            <button
              type="button"
              onClick={() => {
                padaPilih(null)
                padaHapus()
              }}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-red-800 hover:underline"
            >
              <Trash2 size={13} aria-hidden="true" />
              Hapus gambar
            </button>
          )}
          {!nilai && !berkas && (
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-perpusnas-gray-600">
              <ImagePlus size={13} aria-hidden="true" />
              Belum ada gambar. Placeholder dipakai sampai diunggah.
            </p>
          )}
          <p className="mt-1 text-xs text-perpusnas-gray-600">Maksimal 2 MB, format JPG/PNG.</p>
          {bantuan && <p className="mt-1 text-xs text-perpusnas-gray-600">{bantuan}</p>}
        </div>
      </div>
    </div>
  )
}
