import { Plus, Trash2 } from 'lucide-react'

type Props = {
  idPrefix: string
  nilai: string[]
  onChange: (daftar: string[]) => void
}

export default function DaftarNarasumberField({ idPrefix, nilai, onChange }: Props) {
  function ubahBaris(indeks: number, isi: string): void {
    onChange(nilai.map((item, posisi) => (posisi === indeks ? isi : item)))
  }

  function hapusBaris(indeks: number): void {
    const sisa = nilai.filter((_, posisi) => posisi !== indeks)
    onChange(sisa.length > 0 ? sisa : [''])
  }

  return (
    <div>
      <span className="block text-sm font-semibold text-perpusnas-gray-900">Narasumber</span>
      <div className="mt-2 space-y-2">
        {nilai.map((item, indeks) => (
          <div key={indeks} className="flex items-center gap-2">
            <input
              id={`${idPrefix}-${indeks}`}
              value={item}
              onChange={(e) => ubahBaris(indeks, e.target.value)}
              placeholder="Nama narasumber atau pemateri"
              aria-label={`Narasumber ${indeks + 1}`}
              className="w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
            />
            <button
              type="button"
              onClick={() => hapusBaris(indeks)}
              disabled={nilai.length === 1 && !item}
              aria-label={`Hapus narasumber ${indeks + 1}`}
              className="rounded-lg bg-red-50 p-2.5 text-red-800 disabled:opacity-40"
            >
              <Trash2 size={15} aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...nilai, ''])}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-perpusnas-blue/20 px-4 py-2 text-xs font-semibold text-perpusnas-blue"
      >
        <Plus size={14} aria-hidden="true" />
        Tambah Narasumber
      </button>
    </div>
  )
}
