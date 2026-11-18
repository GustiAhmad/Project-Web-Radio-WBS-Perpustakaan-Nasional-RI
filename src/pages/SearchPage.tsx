import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import EpisodeCard from '../components/catalog/EpisodeCard'
import SeriCard from '../components/catalog/SeriCard'
import { Kosong, Pemuatan } from '../components/common/StateBox'
import {
  ambilRingkasanEpisode,
  ambilSemuaSeri,
  type EpisodeKatalog,
  type SeriKatalog,
} from '../services/catalog'
import { labelKategori } from '../utils/formatters'

export default function SearchPage() {
  const [params] = useSearchParams()
  const kataKunci = (params.get('q') ?? '').trim()
  const kunci = kataKunci.toLowerCase()

  const [seri, setSeri] = useState<SeriKatalog[]>([])
  const [episode, setEpisode] = useState<EpisodeKatalog[]>([])
  const [memuat, setMuat] = useState(true)

  useEffect(() => {
    let masihAktif = true
    void Promise.all([ambilSemuaSeri(), ambilRingkasanEpisode()]).then(([daftarSeri, daftarEpisode]) => {
      if (!masihAktif) return
      setSeri(daftarSeri)
      setEpisode(daftarEpisode)
      setMuat(false)
    })
    return () => {
      masihAktif = false
    }
  }, [])

  const hasilSeri = useMemo(
    () =>
      kunci
        ? seri.filter((item) =>
            [item.nama, item.deskripsi, labelKategori(item.kategori)].some((field) =>
              field.toLowerCase().includes(kunci)
            )
          )
        : [],
    [seri, kunci]
  )

  const hasilEpisode = useMemo(
    () =>
      kunci
        ? episode.filter((item) =>
            [item.judul, item.topik, item.narasumber, item.moderator, item.deskripsi ?? ''].some((field) =>
              field.toLowerCase().includes(kunci)
            )
          )
        : [],
    [episode, kunci]
  )

  const petaSeri = useMemo(() => new Map(seri.map((item) => [item.id, item])), [seri])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-perpusnas-blue">Hasil Pencarian</h1>
      {kataKunci ? (
        <p className="mt-3 text-base text-perpusnas-gray-600">
          Kata kunci: <span className="font-semibold text-perpusnas-gray-900">“{kataKunci}”</span>
        </p>
      ) : (
        <p className="mt-3 text-base text-perpusnas-gray-600">
          Masukkan kata kunci pada bilah pencarian di atas, lalu tekan Enter.
        </p>
      )}

      {memuat ? (
        <div className="mt-8">
          <Pemuatan pesan="Mencari di katalog..." />
        </div>
      ) : !kataKunci ? (
        <div className="mt-8">
          <Kosong judul="Belum ada kata kunci" pesan="Coba cari topik seperti naskah, literasi, atau nama seri." />
        </div>
      ) : hasilSeri.length === 0 && hasilEpisode.length === 0 ? (
        <div className="mt-8">
          <Kosong
            judul="Tidak ada hasil"
            pesan="Coba kata kunci lain atau periksa ejaan. Pencarian mencakup nama seri, judul episode, topik, dan narasumber."
          />
        </div>
      ) : (
        <div className="mt-10 space-y-12">
          {hasilSeri.length > 0 && (
            <section aria-labelledby="hasil-seri">
              <h2 id="hasil-seri" className="text-xl font-bold text-perpusnas-blue">
                Seri <span className="text-base font-normal text-perpusnas-gray-600">({hasilSeri.length})</span>
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {hasilSeri.map((item) => (
                  <SeriCard key={item.id} seri={item} />
                ))}
              </div>
            </section>
          )}

          {hasilEpisode.length > 0 && (
            <section aria-labelledby="hasil-episode">
              <h2 id="hasil-episode" className="text-xl font-bold text-perpusnas-blue">
                Episode <span className="text-base font-normal text-perpusnas-gray-600">({hasilEpisode.length})</span>
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {hasilEpisode.map((item) => {
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
            </section>
          )}
        </div>
      )}

      <p className="mt-10 text-sm text-perpusnas-gray-600">
        Tidak menemukan yang dicari? <Link to="/program" className="font-semibold text-perpusnas-blue hover:underline">Jelajahi semua program</Link>.
      </p>
    </div>
  )
}
