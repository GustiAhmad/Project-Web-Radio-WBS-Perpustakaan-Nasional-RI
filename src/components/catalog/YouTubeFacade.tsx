import { useState } from 'react'
import { ExternalLink, ImageOff, Play } from 'lucide-react'
import { posterYouTube } from '../../utils/formatters'

type Props = {
  videoId: string
  judul: string
}

export default function YouTubeFacade({ videoId, judul }: Props) {
  const [aktif, setAktif] = useState(false)
  const [webpGagal, setWebpGagal] = useState(false)
  const [posterGagal, setPosterGagal] = useState(false)

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-perpusnas-blue-dark shadow-sm">
        {aktif ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={`Video ${judul}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : posterGagal ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center text-white">
            <ImageOff size={32} aria-hidden="true" />
            <p className="text-sm font-semibold">Poster video tidak tersedia</p>
            <p className="text-xs text-white/70">Video mungkin telah dihapus atau dibuat privat. Gunakan tautan YouTube di bawah.</p>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setAktif(true)}
            aria-label={`Putar video ${judul}`}
            className="group relative block h-full w-full"
          >
            <img
              src={posterYouTube(videoId, !webpGagal)}
              alt={`Poster video ${judul}`}
              onError={() => (webpGagal ? setPosterGagal(true) : setWebpGagal(true))}
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 grid place-items-center bg-black/10 transition group-hover:bg-black/25">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg">
                <Play size={26} aria-hidden="true" className="ml-1" />
              </span>
            </span>
            <span className="absolute bottom-3 left-3 rounded bg-black/60 px-2.5 py-1 text-xs text-white">
              Klik untuk memutar video
            </span>
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-perpusnas-gray-600">
        <p>Video tidak diputar otomatis agar siaran radio tetap dapat didengarkan.</p>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-perpusnas-blue hover:underline"
        >
          Buka di YouTube
          <ExternalLink size={13} aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
