import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-perpusnas-blue-light text-perpusnas-blue">
        <Compass size={30} aria-hidden="true" />
      </span>
      <p className="mt-6 text-sm font-bold uppercase tracking-wide text-perpusnas-gold">404</p>
      <h1 className="mt-2 text-3xl font-bold text-perpusnas-blue">Halaman tidak ditemukan</h1>
      <p className="mt-3 text-base text-perpusnas-gray-600">
        Alamat yang Anda buka tidak tersedia. Kembali ke beranda untuk mendengarkan siaran atau menjelajahi katalog.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link to="/" className="rounded-full bg-perpusnas-blue px-6 py-2.5 text-sm font-semibold text-white hover:bg-perpusnas-blue-dark">
          Ke Beranda
        </Link>
        <Link to="/program" className="rounded-full border border-perpusnas-blue px-6 py-2.5 text-sm font-semibold text-perpusnas-blue hover:bg-perpusnas-blue-light">
          Jelajahi Program
        </Link>
      </div>
    </div>
  )
}
