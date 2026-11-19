import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {
  ambilEpisodeTerbaru,
  ambilSemuaSeri,
  type EpisodeKatalog,
  type SeriKatalog,
} from '../../services/catalog'
import EpisodeCard from '../catalog/EpisodeCard'
import { Kosong, Pemuatan } from '../common/StateBox'

export default function VideoTerbaru() {
  const [episode, setEpisode] = useState<EpisodeKatalog[]>([])
  const [seri, setSeri] = useState<SeriKatalog[]>([])
  const [memuat, setMuat] = useState(true)

  useEffect(() => {
    let masihAktif = true
    void Promise.all([ambilEpisodeTerbaru(4), ambilSemuaSeri()]).then(([daftarEpisode, daftarSeri]) => {
      if (!masihAktif) return
      setEpisode(daftarEpisode)
      setSeri(daftarSeri)
      setMuat(false)
    })
    return () => {
      masihAktif = false
    }
  }, [])

  const petaSeri = new Map(seri.map((item) => [item.id, item]))

  return (
    <section aria-labelledby="judul-video-terbaru">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 id="judul-video-terbaru" className="text-xl font-bold text-perpusnas-blue sm:text-2xl">Video Terbaru</h2>
          <p className="mt-1 text-sm text-perpusnas-gray-600">Rekaman siaran dan siniar yang baru tayang.</p>
        </div>
        <Link to="/video-terbaru" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-perpusnas-blue hover:underline">
          Jelajahi semua
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-5">
        {memuat ? (
          <Pemuatan pesan="Memuat video terbaru..." />
        ) : episode.length === 0 ? (
          <Kosong judul="Belum ada video tayang" pesan="Rekaman akan muncul setelah petugas menerbitkannya." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {episode.map((item) => {
              const induk = petaSeri.get(item.seri_id)
              return (
                <EpisodeCard
                  key={item.id}
                  episode={item}
                  seriSlug={induk?.slug ?? 'lainnya'}
                  seriNama={induk?.nama}
                />
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
