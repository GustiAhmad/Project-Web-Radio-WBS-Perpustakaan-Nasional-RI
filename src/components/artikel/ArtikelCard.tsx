import { Link } from 'react-router-dom'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import type { Artikel } from '../../types/database.types'
import { formatTanggalArtikel, namaKategoriArtikel } from '../../utils/formatArtikel'

type Props = {
  artikel: Artikel
  ke?: string
}

export default function ArtikelCard({ artikel, ke }: Props) {
  const tujuan = ke ?? `/berita/${artikel.slug}`
  const gambar = artikel.gambar_url ?? `${import.meta.env.BASE_URL}placeholder-poster.svg`

  return (
    <article className="group overflow-hidden rounded-2xl border border-perpusnas-blue/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link to={tujuan} className="block focus-visible:outline-none" aria-label={`Baca ${artikel.judul}`}>
        <img
          src={gambar}
          alt={artikel.teks_alternatif ?? (artikel.gambar_url ? artikel.judul : '')}
          width={640}
          height={360}
          loading="lazy"
          className="h-44 w-full bg-perpusnas-blue-light object-cover"
        />
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
            <span className="rounded-full bg-perpusnas-blue-light px-3 py-1 text-perpusnas-blue">
              {namaKategoriArtikel(artikel.kategori)}
            </span>
            <span className="inline-flex items-center gap-1 text-perpusnas-gray-600">
              <CalendarDays size={12} aria-hidden="true" />
              {formatTanggalArtikel(artikel.diterbitkan_pada)}
            </span>
          </div>
          <h3 className="mt-3 text-base font-bold leading-snug text-perpusnas-blue group-hover:underline">
            {artikel.judul}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-perpusnas-gray-600">{artikel.ringkasan}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-perpusnas-blue">
            Baca selengkapnya
            <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  )
}
