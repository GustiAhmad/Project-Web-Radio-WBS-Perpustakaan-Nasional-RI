import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Breadcrumbs from '../components/common/Breadcrumbs'
import EpisodeCard from '../components/catalog/EpisodeCard'
import { Kosong, Pemuatan } from '../components/common/StateBox'
import { ambilHalamanVideoTerbaru, ambilSemuaSeri, type EpisodeKatalog, type SeriKatalog } from '../services/catalog'
import { lacakEvent } from '../services/ga4'

const VIDEO_PER_HALAMAN = 12

export default function VideoTerbaruPage() {
  const [params, setParams] = useSearchParams()
  const halaman = Math.max(1, Number(params.get('halaman')) || 1)
  const [episode, setEpisode] = useState<EpisodeKatalog[]>([])
  const [seri, setSeri] = useState<SeriKatalog[]>([])
  const [total, setTotal] = useState(0)
  const [memuat, setMuat] = useState(true)

  useEffect(() => {
    let masihAktif = true
    setMuat(true)
    void Promise.all([
      ambilHalamanVideoTerbaru(halaman, VIDEO_PER_HALAMAN),
      ambilSemuaSeri(),
    ]).then(([halamanData, daftarSeri]) => {
      if (!masihAktif) return
      setEpisode(halamanData.episode)
      setTotal(halamanData.total)
      setSeri(daftarSeri)
      setMuat(false)
    })
    return () => {
      masihAktif = false
    }
  }, [halaman])

  const totalHalaman = Math.max(1, Math.ceil(total / VIDEO_PER_HALAMAN))

  useEffect(() => {
    if (!memuat && halaman > totalHalaman) {
      setParams({ halaman: String(totalHalaman) }, { replace: true })
    }
  }, [halaman, memuat, setParams, totalHalaman])

  const petaSeri = new Map(seri.map((item) => [item.id, item]))

  function bukaHalaman(nomor: number): void {
    lacakEvent('video_halaman', {
      halaman: nomor,
      arah: nomor > halaman ? 'maju' : 'mundur',
    })
    setParams(nomor === 1 ? {} : { halaman: String(nomor) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Video Terbaru' }]} />
      <h1 className="text-3xl font-bold text-perpusnas-blue">Video Terbaru</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-perpusnas-gray-600">
        Seluruh rekaman video resmi WBS Perpusnas, diurutkan dari yang terbaru sampai yang terlama.
      </p>
      {!memuat && (
        <p className="mt-4 text-sm text-perpusnas-gray-600">
          {total} video · Halaman {halaman} dari {totalHalaman}
        </p>
      )}

      <div className="mt-8">
        {memuat ? (
          <Pemuatan pesan="Memuat video terbaru..." />
        ) : episode.length === 0 ? (
          <Kosong judul="Video tidak ditemukan" pesan="Halaman ini belum berisi video tayang. Kembali ke halaman pertama." />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

      {!memuat && total > VIDEO_PER_HALAMAN && (
        <nav aria-label="Navigasi halaman video" className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => bukaHalaman(halaman - 1)}
            disabled={halaman <= 1}
            className="inline-flex items-center gap-1 rounded-full border border-perpusnas-blue/20 px-4 py-2 text-sm font-semibold text-perpusnas-blue disabled:opacity-40"
          >
            <ChevronLeft size={15} aria-hidden="true" />
            Sebelumnya
          </button>
          <span className="text-sm font-semibold text-perpusnas-gray-900">
            {halaman} / {totalHalaman}
          </span>
          <button
            type="button"
            onClick={() => bukaHalaman(halaman + 1)}
            disabled={halaman >= totalHalaman}
            className="inline-flex items-center gap-1 rounded-full border border-perpusnas-blue/20 px-4 py-2 text-sm font-semibold text-perpusnas-blue disabled:opacity-40"
          >
            Berikutnya
            <ChevronRight size={15} aria-hidden="true" />
          </button>
        </nav>
      )}
    </div>
  )
}
