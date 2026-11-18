import { Link } from 'react-router-dom'
import { Layers3, PlayCircle } from 'lucide-react'
import type { SeriKatalog } from '../../services/catalog'
import { labelKategori } from '../../utils/formatters'

type Props = {
  seri: SeriKatalog
  jumlahEpisode?: number
}

export default function SeriCard({ seri, jumlahEpisode }: Props) {
  return (
    <Link
      to={`/program/${seri.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-perpusnas-blue/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-perpusnas-blue to-perpusnas-blue-dark">
        {seri.gambar_url ? (
          <img
            src={seri.gambar_url}
            alt={seri.teks_alternatif ?? `Sampul seri ${seri.nama}`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/70">
            <Layers3 size={40} aria-hidden="true" />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-perpusnas-blue">
          {labelKategori(seri.kategori)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-bold text-perpusnas-gray-900 group-hover:text-perpusnas-blue">
          {seri.nama}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-perpusnas-gray-600">
          {seri.deskripsi}
        </p>
        <p className="mt-4 flex items-center gap-2 text-xs font-medium text-perpusnas-blue">
          <PlayCircle size={15} aria-hidden="true" />
          {seri.jenis === 'keranjang'
            ? 'Rekaman lepasan'
            : jumlahEpisode === undefined
              ? 'Lihat episode'
              : `${jumlahEpisode} episode`}
          <span className="ml-auto opacity-0 transition group-hover:opacity-100" aria-hidden="true">
            Lihat →
          </span>
        </p>
      </div>
    </Link>
  )
}
