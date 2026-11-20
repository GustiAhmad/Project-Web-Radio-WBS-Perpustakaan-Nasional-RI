import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, UserRound } from 'lucide-react'
import ArtikelTampil from '../components/artikel/ArtikelTampil'
import Breadcrumbs from '../components/common/Breadcrumbs'
import { Kosong, Pemuatan } from '../components/common/StateBox'
import { ambilArtikelPublikBySlug } from '../services/artikel'
import { lacakEvent } from '../services/ga4'
import type { Artikel } from '../types/database.types'
import { formatTanggalArtikel, namaKategoriArtikel } from '../utils/formatArtikel'

export default function ArtikelDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [artikel, setArtikel] = useState<Artikel | null>(null)
  const [memuat, setMuat] = useState(true)
  const [galat, setGalat] = useState('')
  const sudahLacak = useRef('')

  useEffect(() => {
    if (!slug) {
      setMuat(false)
      return
    }
    let masihAktif = true
    setMuat(true)
    setGalat('')
    void ambilArtikelPublikBySlug(slug).then((hasil) => {
      if (!masihAktif) return
      setArtikel(hasil.artikel)
      setGalat(hasil.galat ?? '')
      setMuat(false)
    })
    return () => {
      masihAktif = false
    }
  }, [slug])

  useEffect(() => {
    if (!artikel || sudahLacak.current === artikel.id) return
    sudahLacak.current = artikel.id
    lacakEvent('artikel_view', { artikel_slug: artikel.slug, kategori: artikel.kategori })
  }, [artikel])

  if (memuat) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Pemuatan pesan="Memuat artikel..." />
      </div>
    )
  }

  if (!artikel) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Kosong
          judul="Artikel tidak ditemukan"
          pesan={galat || 'Tulisan ini belum terbit atau sudah dihapus. Kembali ke daftar berita.'}
        />
        <div className="mt-6 text-center">
          <Link to="/berita" className="text-sm font-semibold text-perpusnas-blue hover:underline">
            Lihat berita lainnya
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Berita & Artikel', ke: '/berita' },
          { label: artikel.judul },
        ]}
      />
      <Link
        to="/berita"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-perpusnas-blue hover:underline"
      >
        <ArrowLeft size={15} aria-hidden="true" />
        Kembali ke Berita &amp; Artikel
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold">
        <span className="rounded-full bg-perpusnas-blue-light px-3 py-1 text-perpusnas-blue">
          {namaKategoriArtikel(artikel.kategori)}
        </span>
        <span className="inline-flex items-center gap-1 text-perpusnas-gray-600">
          <CalendarDays size={13} aria-hidden="true" />
          {formatTanggalArtikel(artikel.diterbitkan_pada)}
        </span>
      </div>

      <h1 className="mt-4 text-3xl font-bold leading-tight text-perpusnas-blue sm:text-4xl">{artikel.judul}</h1>
      <p className="mt-4 text-base leading-relaxed text-perpusnas-gray-600">{artikel.ringkasan}</p>
      <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-perpusnas-gray-600">
        <UserRound size={14} aria-hidden="true" />
        Oleh {artikel.penulis}
      </p>

      {artikel.gambar_url && (
        <img
          src={artikel.gambar_url}
          alt={artikel.teks_alternatif ?? artikel.judul}
          width={960}
          height={540}
          className="mt-8 h-auto w-full rounded-2xl bg-perpusnas-blue-light object-cover"
        />
      )}

      <div className="mt-8 border-t border-perpusnas-blue/10 pt-8">
        <ArtikelTampil isi={artikel.isi} />
      </div>
    </article>
  )
}
