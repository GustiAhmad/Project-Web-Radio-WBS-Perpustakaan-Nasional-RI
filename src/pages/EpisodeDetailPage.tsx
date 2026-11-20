import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CalendarDays, Check, Clock3, Copy, Lightbulb, Mic2, Tag, UserRound } from 'lucide-react'
import Breadcrumbs from '../components/common/Breadcrumbs'
import { Kosong, Pemuatan } from '../components/common/StateBox'
import YouTubeFacade from '../components/catalog/YouTubeFacade'
import { ambilEpisode, type EpisodeKatalog, type SeriKatalog } from '../services/catalog'
import { lacakEvent } from '../services/ga4'
import { supabase } from '../services/supabase'
import { formatDurasi, formatTanggal, labelKategori } from '../utils/formatters'

export default function EpisodeDetailPage() {
  const { seriSlug = '', episodeSlug = '' } = useParams()
  const [episode, setEpisode] = useState<EpisodeKatalog | null>(null)
  const [seri, setSeri] = useState<SeriKatalog | null>(null)
  const [memuat, setMuat] = useState(true)
  const [statusSalin, setStatusSalin] = useState<'idle' | 'sukses' | 'gagal'>('idle')
  const episodeDilacakRef = useRef('')

  useEffect(() => {
    if (!episode || !seri || seri.slug !== seriSlug) return
    const kunci = `${seri.slug}/${episode.slug}`
    if (episodeDilacakRef.current === kunci) return
    episodeDilacakRef.current = kunci
    lacakEvent('episode_view', {
      episode_slug: episode.slug,
      seri_slug: seri.slug,
      nomor_episode: episode.nomor_episode,
    })
  }, [episode, seri, seriSlug])

  useEffect(() => {
    let masihAktif = true
    setMuat(true)
    void ambilEpisode(episodeSlug).then(async (data) => {
      if (!masihAktif) return
      setEpisode(data)
      if (data) {
        const induk = await ambilSeriById(data.seri_id)
        if (!masihAktif) return
        setSeri(induk)
      } else {
        setSeri(null)
      }
      setMuat(false)
    })
    return () => {
      masihAktif = false
    }
  }, [episodeSlug])

  async function salinTautan() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setStatusSalin('sukses')
    } catch {
      setStatusSalin('gagal')
    }
  }

  if (memuat) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Pemuatan pesan="Memuat detail episode..." />
      </div>
    )
  }

  if (!episode || !seri || seri.slug !== seriSlug) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Program', ke: '/program' }, { label: 'Episode tidak ditemukan' }]} />
        <Kosong judul="Episode tidak ditemukan" pesan="Rekaman mungkin dipindahkan atau belum diterbitkan." />
        <Link to="/program" className="mt-5 inline-block text-sm font-semibold text-perpusnas-blue hover:underline">
          Kembali ke Jelajah Program
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Program', ke: '/program' },
          { label: seri.nama, ke: `/program/${seri.slug}` },
          { label: episode.judul },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <YouTubeFacade videoId={episode.video_id} judul={episode.judul} episodeSlug={episode.slug} />
          <h1 className="mt-6 text-2xl font-bold text-perpusnas-blue sm:text-3xl">{episode.judul}</h1>
          <p className="mt-2 text-sm font-semibold text-perpusnas-gray-600">
            {seri.nama}
            {episode.nomor_episode !== null && ` · Episode ${episode.nomor_episode}`}
          </p>
          {episode.deskripsi && (
            <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-perpusnas-gray-600">
              {episode.deskripsi}
            </p>
          )}
        </div>

        <aside className="h-fit rounded-xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-perpusnas-gray-900">Informasi Episode</h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div className="flex gap-3">
              <UserRound size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-perpusnas-blue" />
              <div>
                <dt className="text-xs text-perpusnas-gray-600">Narasumber</dt>
                <dd className="font-medium text-perpusnas-gray-900">{episode.narasumber || 'Belum tercatat'}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Mic2 size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-perpusnas-blue" />
              <div>
                <dt className="text-xs text-perpusnas-gray-600">Moderator</dt>
                <dd className="font-medium text-perpusnas-gray-900">{episode.moderator || 'Belum tercatat'}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <CalendarDays size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-perpusnas-blue" />
              <div>
                <dt className="text-xs text-perpusnas-gray-600">Tanggal tayang</dt>
                <dd className="font-medium text-perpusnas-gray-900">{formatTanggal(episode.tanggal_tayang)}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock3 size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-perpusnas-blue" />
              <div>
                <dt className="text-xs text-perpusnas-gray-600">Durasi</dt>
                <dd className="font-medium text-perpusnas-gray-900">{formatDurasi(episode.durasi_detik)}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Lightbulb size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-perpusnas-blue" />
              <div>
                <dt className="text-xs text-perpusnas-gray-600">Topik</dt>
                <dd className="font-medium text-perpusnas-gray-900">{episode.topik || 'Belum tercatat'}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Tag size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-perpusnas-blue" />
              <div>
                <dt className="text-xs text-perpusnas-gray-600">Kategori seri</dt>
                <dd className="font-medium text-perpusnas-gray-900">{labelKategori(seri.kategori)}</dd>
              </div>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => void salinTautan()}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-perpusnas-blue px-5 py-2.5 text-sm font-semibold text-perpusnas-blue transition hover:bg-perpusnas-blue hover:text-white"
          >
            {statusSalin === 'sukses' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {statusSalin === 'sukses' ? 'Tautan tersalin' : 'Salin tautan episode'}
          </button>
          {statusSalin === 'gagal' && (
            <p className="mt-2 text-center text-xs text-perpusnas-gray-600">
              Salin gagal. Gunakan bilah alamat browser Anda.
            </p>
          )}

          <Link
            to={`/program/${seri.slug}`}
            className="mt-3 block text-center text-sm font-semibold text-perpusnas-blue hover:underline"
          >
            Lihat episode lain dalam seri
          </Link>
        </aside>
      </div>
    </div>
  )
}

async function ambilSeriById(seriId: string): Promise<SeriKatalog | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('seri')
    .select('id, nama, slug, kategori, jenis, deskripsi, gambar_url, teks_alternatif, urutan, unggulan')
    .eq('id', seriId)
    .maybeSingle()
  if (error) {
    console.error(`[WBS] Gagal memuat seri episode: ${error.message}`)
    return null
  }
  return (data as SeriKatalog | null) ?? null
}
