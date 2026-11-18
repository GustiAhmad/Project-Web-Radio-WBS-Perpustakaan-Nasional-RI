import { labelKategori } from '../../utils/formatters'

const kategori = [
  'semua_kategori',
  'layanan_perpustakaan',
  'naskah_nusantara',
  'literasi_keluarga',
  'sejarah_kebudayaan',
]

type Props = {
  aktif: string
  onChange: (nilai: string) => void
}

export default function CategoryFilter({ aktif, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Saring seri berdasarkan topik">
      {kategori.map((kunci) => {
        const dipilih = kunci === aktif
        return (
          <button
            key={kunci}
            type="button"
            onClick={() => onChange(kunci)}
            aria-pressed={dipilih}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              dipilih
                ? 'border-perpusnas-blue bg-perpusnas-blue text-white'
                : 'border-perpusnas-blue/20 bg-white text-perpusnas-gray-600 hover:border-perpusnas-blue hover:text-perpusnas-blue'
            }`}
          >
            {labelKategori(kunci)}
          </button>
        )
      })}
    </div>
  )
}
