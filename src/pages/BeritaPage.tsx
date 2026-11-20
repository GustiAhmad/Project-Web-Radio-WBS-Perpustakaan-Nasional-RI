import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ArtikelCard from '../components/artikel/ArtikelCard'
import Breadcrumbs from '../components/common/Breadcrumbs'
import { Kosong, Pemuatan } from '../components/common/StateBox'
import { ambilDaftarArtikelPublik } from '../services/artikel'
import { lacakEvent } from '../services/ga4'
import type { Artikel, KategoriArtikel } from '../types/database.types'
import { KATEGORI_ARTIKEL, namaKategoriArtikel } from '../utils/formatArtikel'

const PER_HALAMAN = 6

type Filter = KategoriArtikel | 'semua'

export default function BeritaPage() {
  const [params, setParams] = useSearchParams()
  const kategoriParam = params.get('kategori') ?? 'semua'
  const kategori: Filter = KATEGORI_ARTIKEL.includes(kategoriParam as KategoriArtikel)
    ? (kategoriParam as KategoriArtikel)
    : 'semua'
  const halaman = Math.max(1, Number(params.get('halaman')) || 1)

  const [artikel, setArtikel] = useState<Artikel[]>([])
  const [total, setTotal] = useState(0)
  const [memuat, setMuat] = useState(true)
  const [galat, setGalat] = useState('')

  useEffect(() => {
    let masihAktif = true
    setMuat(true)
    setGalat('')
    void ambilDaftarArtikelPublik(kategori, halaman, PER_HALAMAN).then((hasil) => {
      if (!masihAktif) return
      setArtikel(hasil.artikel)
      setTotal(hasil.total)
      setGalat(hasil.galat ?? '')
      setMuat(false)
    })
    return () => {
      masihAktif = false
    }
  }, [kategori, halaman])

  const totalHalaman = Math.max(1, Math.ceil(total / PER_HALAMAN))

  useEffect(() => {
    if (!memuat && halaman > totalHalaman) {
      const berikut: Record<string, string> = {}
      if (kategori !== 'semua') berikut.kategori = kategori
      if (totalHalaman > 1) berikut.halaman = String(totalHalaman)
      setParams(berikut, { replace: true })
    }
  }, [halaman, kategori, memuat, setParams, totalHalaman])

  function pilihKategori(pilihan: Filter): void {
    lacakEvent('artikel_filter', { kategori: pilihan })
    setParams(pilihan === 'semua' ? {} : { kategori: pilihan })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function bukaHalaman(nomor: number): void {
    lacakEvent('artikel_halaman', { halaman: nomor, kategori })
    const berikut: Record<string, string> = {}
    if (kategori !== 'semua') berikut.kategori = kategori
    if (nomor > 1) berikut.halaman = String(nomor)
    setParams(berikut)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const daftarFilter: Filter[] = ['semua', ...KATEGORI_ARTIKEL]

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Berita & Artikel' }]} />
      <h1 className="text-3xl font-bold text-perpusnas-blue">Berita &amp; Artikel</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-perpusnas-gray-600">
        Kabar terbaru, tulisan literasi, dan pengumuman resmi dari Radio dan Siniar WBS Perpusnas.
      </p>

      <nav aria-label="Filter kategori artikel" className="mt-8 flex flex-wrap gap-2">
        {daftarFilter.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={kategori === item}
            onClick={() => pilihKategori(item)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              kategori === item
                ? 'border-perpusnas-blue bg-perpusnas-blue text-white'
                : 'border-perpusnas-blue/20 bg-white text-perpusnas-blue hover:bg-perpusnas-blue-light'
            }`}
          >
            {item === 'semua' ? 'Semua' : namaKategoriArtikel(item)}
          </button>
        ))}
      </nav>

      {!memuat && (
        <p className="mt-5 text-sm text-perpusnas-gray-600">
          {total} tulisan · Halaman {halaman} dari {totalHalaman}
        </p>
      )}

      <div className="mt-6">
        {memuat ? (
          <Pemuatan pesan="Memuat berita dan artikel..." />
        ) : galat ? (
          <Kosong judul="Berita belum dapat dimuat" pesan={galat} />
        ) : artikel.length === 0 ? (
          <Kosong
            judul="Belum ada tulisan"
            pesan="Tulisan untuk kategori ini belum tersedia. Coba pilih kategori lain."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {artikel.map((item) => (
              <ArtikelCard key={item.id} artikel={item} />
            ))}
          </div>
        )}
      </div>

      {!memuat && total > PER_HALAMAN && (
        <nav aria-label="Navigasi halaman berita" className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
