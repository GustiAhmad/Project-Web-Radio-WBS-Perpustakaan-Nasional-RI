import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Clock3, ImageOff, PlayCircle } from 'lucide-react'
import Breadcrumbs from '../components/common/Breadcrumbs'
import { Kosong, Pemuatan } from '../components/common/StateBox'
import {
  ambilEpisodeSeri,
  ambilSeri,
  type EpisodeKatalog,
  type SeriKatalog,
} from '../services/catalog'
import { lacakEvent } from '../services/ga4'
import { formatDurasi, formatTanggal, labelKategori, posterYouTube } from '../utils/formatters'

const BATAS_AWAL = 12

export default function SeriesDetailPage() {
  const { seriSlug = '' } = useParams()
  const [seri, setSeri] = useState<SeriKatalog | null>(null)
  const [episode, setEpisode] = useState<EpisodeKatalog[]>([])
  const [batas, setBatas] = useState(BATAS_AWAL)
  const [memuat, setMuat] = useState(true)
  const [coverGagal, setCoverGagal] = useState(false)
  const seriDilacakRef = useRef('')

  useEffect(() => {
    if (!seri || seriDilacakRef.current === seri.slug) return
    seriDilacakRef.current = seri.slug
    lacakEvent('series_view', { seri_slug: seri.slug, kategori: seri.kategori })
  }, [seri])

  useEffect(() => {
    let masihAktif = true
    setMuat(true)
    setBatas(BATAS_AWAL)
    void ambilSeri(seriSlug).then(async (data) => {
      if (!masihAktif) return
      setSeri(data)
      if (data) {
        const daftar = await ambilEpisodeSeri(data.id)
        if (!masihAktif) return
        setEpisode(daftar)
      } else {
        setEpisode([])
      }
      setMuat(false)
    })
    return () => {
      masihAktif = false
    }
  }, [seriSlug])

  if (memuat) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Pemuatan pesan="Memuat detail seri..." />
      </div>
    )
  }

  if (!seri) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Program', ke: '/program' }, { label: 'Seri tidak ditemukan' }]} />
        <Kosong judul="Seri tidak ditemukan" pesan="Kembali ke halaman Jelajah Program untuk melihat katalog yang tersedia." />
        <Link to="/program" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-perpusnas-blue hover:underline">
          <ArrowLeft size={15} aria-hidden="true" />
          Kembali ke program
        </Link>
      </div>
    )
  }

  const sampul = seri.gambar_url ?? (episode.length > 0 ? posterYouTube(episode[0].video_id) : '')
  const tampil = episode.slice(0, batas)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Program', ke: '/program' }, { label: seri.nama }]} />

      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div className="aspect-video overflow-hidden rounded-xl bg-perpusnas-blue-light shadow-sm">
          {sampul && !coverGagal ? (
            <img
              src={sampul}
              alt={seri.teks_alternatif ?? `Sampul seri ${seri.nama}`}
              width={1280}
              height={720}
              loading="eager"
              decoding="async"
              onError={() => setCoverGagal(true)}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-perpusnas-gray-600">
              <ImageOff size={30} aria-hidden="true" />
              <span className="text-xs">Sampul belum tersedia</span>
            </div>
          )}
        </div>

        <div>
          <span className="inline-flex rounded-full bg-perpusnas-blue-light px-3 py-1 text-xs font-semibold text-perpusnas-blue">
            {labelKategori(seri.kategori)}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-perpusnas-blue">{seri.nama}</h1>
          <p className="mt-4 text-base leading-relaxed text-perpusnas-gray-600">{seri.deskripsi}</p>
          <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-perpusnas-gray-900">
            <PlayCircle size={17} aria-hidden="true" className="text-perpusnas-blue" />
            {seri.jenis === 'keranjang' ? 'Rekaman lepasan' : `${episode.length} episode tersedia`}
          </p>
        </div>
      </div>

      <section className="mt-12" aria-labelledby="judul-daftar-episode">
        <h2 id="judul-daftar-episode" className="text-xl font-bold text-perpusnas-blue sm:text-2xl">Daftar Episode</h2>
        <p className="mt-1 text-sm text-perpusnas-gray-600">
          {seri.jenis === 'keranjang'
            ? 'Rekaman lepasan tanpa nomor episode.'
            : 'Episode diurutkan berdasarkan nomor tayang resmi.'}
        </p>

        <div className="mt-5">
          {tampil.length === 0 ? (
            <Kosong judul="Belum ada episode tayang" pesan="Episode pada seri ini akan muncul setelah diterbitkan." />
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tampil.map((item) => (
                  <Link
                    key={item.id}
                    to={`/program/${seri.slug}/${item.slug}`}
                    className="group flex gap-4 rounded-xl border border-perpusnas-blue/10 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-perpusnas-blue-light text-xs font-bold text-perpusnas-blue">
                      {item.nomor_episode ?? '—'}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-semibold uppercase tracking-wide text-perpusnas-blue">
                        {item.nomor_episode === null ? 'Rekaman lepasan' : `Episode ${item.nomor_episode}`}
                      </span>
                      <span className="mt-1 block line-clamp-2 text-sm font-bold text-perpusnas-gray-900 group-hover:text-perpusnas-blue">
                        {item.judul}
                      </span>
                      <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-perpusnas-gray-600">
                        <span className="flex items-center gap-1">
                          <CalendarDays size={13} aria-hidden="true" />
                          {formatTanggal(item.tanggal_tayang)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock3 size={13} aria-hidden="true" />
                          {formatDurasi(item.durasi_detik)}
                        </span>
                      </span>
                    </span>
                  </Link>
                ))}
              </div>

              {batas < episode.length && (
                <div className="mt-8 text-center">
                  <button
                    type="button"
                    onClick={() => setBatas((nilai) => nilai + BATAS_AWAL)}
                    className="rounded-full border border-perpusnas-blue px-6 py-2.5 text-sm font-semibold text-perpusnas-blue transition hover:bg-perpusnas-blue hover:text-white"
                  >
                    Muat Lebih Banyak
                  </button>
                  <p className="mt-2 text-xs text-perpusnas-gray-600">
                    Menampilkan {tampil.length} dari {episode.length} episode
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
