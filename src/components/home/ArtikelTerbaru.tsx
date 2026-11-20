import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ArtikelCard from '../artikel/ArtikelCard'
import { ambilArtikelTerbaru } from '../../services/artikel'
import type { Artikel } from '../../types/database.types'

export default function ArtikelTerbaru() {
  const [artikel, setArtikel] = useState<Artikel[]>([])

  useEffect(() => {
    let masihAktif = true
    void ambilArtikelTerbaru(3).then(({ artikel: data }) => {
      if (masihAktif) setArtikel(data)
    })
    return () => {
      masihAktif = false
    }
  }, [])

  if (artikel.length === 0) return null

  return (
    <section aria-labelledby="artikel-terbaru-judul">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="artikel-terbaru-judul" className="text-2xl font-bold text-perpusnas-blue">
            Berita &amp; Artikel Terbaru
          </h2>
          <p className="mt-2 text-sm text-perpusnas-gray-600">
            Informasi dan tulisan resmi dari Layanan Radio dan Siniar WBS.
          </p>
        </div>
        <Link
          to="/berita"
          className="inline-flex items-center gap-1.5 rounded-full border border-perpusnas-blue/20 px-4 py-2 text-sm font-semibold text-perpusnas-blue hover:bg-perpusnas-blue-light"
        >
          Lihat semua
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {artikel.map((item) => (
          <ArtikelCard key={item.id} artikel={item} />
        ))}
      </div>
    </section>
  )
}
