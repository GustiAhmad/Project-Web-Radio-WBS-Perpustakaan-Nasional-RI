import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, ExternalLink, UserRound } from 'lucide-react'
import ArtikelTampil from '../../components/artikel/ArtikelTampil'
import { Kosong, Pemuatan } from '../../components/common/StateBox'
import { ambilArtikelAdminById } from '../../services/artikel'
import type { Artikel } from '../../types/database.types'
import { formatTanggalArtikel, namaKategoriArtikel } from '../../utils/formatArtikel'

export default function AdminArtikelPratinjauPage() {
  const { id } = useParams<{ id: string }>()
  const [artikel, setArtikel] = useState<Artikel | null>(null)
  const [memuat, setMuat] = useState(true)
  const [galat, setGalat] = useState('')

  useEffect(() => {
    if (!id) {
      setMuat(false)
      return
    }
    let masihAktif = true
    void ambilArtikelAdminById(id).then((hasil) => {
      if (!masihAktif) return
      setArtikel(hasil.artikel)
      setGalat(hasil.galat ?? '')
      setMuat(false)
    })
    return () => {
      masihAktif = false
    }
  }, [id])

  if (memuat) return <Pemuatan pesan="Memuat pratinjau artikel..." />

  if (!artikel) {
    return (
      <div>
        <Kosong judul="Pratinjau tidak tersedia" pesan={galat || 'Artikel tidak ditemukan.'} />
        <div className="mt-6 text-center">
          <Link to="/admin/artikel" className="text-sm font-semibold text-perpusnas-blue hover:underline">
            Kembali ke daftar artikel
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Link
        to={`/admin/artikel/${artikel.id}/edit`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-perpusnas-blue hover:underline"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Kembali ke sunting artikel
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-perpusnas-gold/40 bg-perpusnas-gold-light px-4 py-3">
        <div>
          <p className="text-sm font-bold text-perpusnas-blue-dark">Pratinjau Pengelola</p>
          <p className="mt-1 text-xs text-perpusnas-gray-600">
            {artikel.status === 'draf'
              ? 'Tulisan ini masih draf dan belum tampil di situs publik.'
              : 'Tulisan ini sudah terbit dan dapat dilihat publik.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {artikel.status === 'terbit' && (
            <a
              href={`/berita/${artikel.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-perpusnas-blue px-3 py-2 text-xs font-semibold text-white hover:bg-perpusnas-blue-dark"
            >
              <ExternalLink size={14} aria-hidden="true" />
              Lihat di Situs
            </a>
          )}
          <Link
            to={`/admin/artikel/${artikel.id}/edit`}
            className="rounded-lg border border-perpusnas-blue/20 bg-white px-3 py-2 text-xs font-semibold text-perpusnas-blue"
          >
            Sunting
          </Link>
        </div>
      </div>

      <article className="mt-6 rounded-2xl border border-perpusnas-blue/10 bg-white p-5 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
          <span className="rounded-full bg-perpusnas-blue-light px-3 py-1 text-perpusnas-blue">
            {namaKategoriArtikel(artikel.kategori)}
          </span>
          <span className="text-perpusnas-gray-600">
            {artikel.status === 'terbit' ? 'Terbit' : 'Draf'}
          </span>
          <span className="inline-flex items-center gap-1 text-perpusnas-gray-600">
            <CalendarDays size={13} aria-hidden="true" />
            {formatTanggalArtikel(artikel.diterbitkan_pada ?? artikel.diubah_pada)}
          </span>
        </div>
        <h1 className="mt-4 text-2xl font-bold leading-tight text-perpusnas-blue sm:text-3xl">{artikel.judul}</h1>
        <p className="mt-3 text-sm leading-relaxed text-perpusnas-gray-600">{artikel.ringkasan}</p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-perpusnas-gray-600">
          <UserRound size={14} aria-hidden="true" />
          Oleh {artikel.penulis}
        </p>

        {artikel.gambar_url && (
          <img
            src={artikel.gambar_url}
            alt={artikel.teks_alternatif ?? artikel.judul}
            width={960}
            height={540}
            className="mt-6 h-auto w-full rounded-xl bg-perpusnas-blue-light object-cover"
          />
        )}

        <div className="mt-8 border-t border-perpusnas-blue/10 pt-6">
          <ArtikelTampil isi={artikel.isi} />
        </div>
      </article>
    </div>
  )
}
