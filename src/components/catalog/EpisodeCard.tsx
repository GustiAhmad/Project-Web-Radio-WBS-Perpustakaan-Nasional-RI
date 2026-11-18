import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Clock3, ImageOff } from 'lucide-react'
import type { EpisodeKatalog } from '../../services/catalog'
import { formatDurasi, formatTanggal, posterYouTube } from '../../utils/formatters'

type Props = {
  episode: EpisodeKatalog
  seriSlug: string
  seriNama?: string
}

export default function EpisodeCard({ episode, seriSlug, seriNama }: Props) {
  const [posterGagal, setPosterGagal] = useState(false)
  const [webpGagal, setWebpGagal] = useState(false)

  return (
    <Link
      to={`/program/${seriSlug}/${episode.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-perpusnas-blue/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-video overflow-hidden bg-perpusnas-blue-light">
        {posterGagal ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-perpusnas-gray-600">
            <ImageOff size={26} aria-hidden="true" />
            <span className="text-xs">Poster tidak tersedia</span>
          </div>
        ) : (
          <img
            src={posterYouTube(episode.video_id, !webpGagal)}
            alt={`Poster episode ${episode.judul}`}
            width={480}
            height={270}
            loading="lazy"
            decoding="async"
            onError={() => (webpGagal ? setPosterGagal(true) : setWebpGagal(true))}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        )}
        {episode.nomor_episode !== null && (
          <span className="absolute left-3 top-3 rounded-full bg-perpusnas-blue px-2.5 py-1 text-[11px] font-semibold text-white">
            Episode {episode.nomor_episode}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        {seriNama && <p className="text-[11px] font-semibold uppercase tracking-wide text-perpusnas-blue">{seriNama}</p>}
        <h3 className="mt-1 line-clamp-2 text-sm font-bold text-perpusnas-gray-900 group-hover:text-perpusnas-blue">
          {episode.judul}
        </h3>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-perpusnas-gray-600">
          <span className="flex items-center gap-1">
            <CalendarDays size={13} aria-hidden="true" />
            {formatTanggal(episode.tanggal_tayang)}
          </span>
          <span className="flex items-center gap-1">
            <Clock3 size={13} aria-hidden="true" />
            {formatDurasi(episode.durasi_detik)}
          </span>
        </div>
      </div>
    </Link>
  )
}
