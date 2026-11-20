import { Link } from 'react-router-dom'
import { Radio, Youtube } from 'lucide-react'
import AcaraMendatang from '../components/home/AcaraMendatang'
import ArtikelTerbaru from '../components/home/ArtikelTerbaru'
import HeroOnAir from '../components/home/HeroOnAir'
import OnAirPersonalities from '../components/home/OnAirPersonalities'
import ProgramUnggulan from '../components/home/ProgramUnggulan'
import VideoTerbaru from '../components/home/VideoTerbaru'

const ringkasan = [
  {
    ikon: Radio,
    judul: 'Siaran Radio',
    deskripsi: 'Dengarkan radio WBS langsung dari studio tanpa terputus saat menjelajah situs.',
    ke: '/jadwal',
  },
  {
    ikon: Youtube,
    judul: 'Video Siniar',
    deskripsi: 'Jelajahi seri resmi dan keranjang Lainnya berisi rekaman siaran WBS.',
    ke: '/program',
  },
]

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <HeroOnAir />

      <section aria-label="Layanan WBS" className="mt-8 grid gap-4 sm:grid-cols-2">
        {ringkasan.map(({ ikon: Ikon, judul, deskripsi, ke }) => (
          <Link
            key={judul}
            to={ke}
            className="rounded-xl border border-perpusnas-blue/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-perpusnas-blue-light text-perpusnas-blue">
              <Ikon size={20} aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-sm font-bold text-perpusnas-gray-900">{judul}</h2>
            <p className="mt-2 text-xs leading-relaxed text-perpusnas-gray-600">{deskripsi}</p>
          </Link>
        ))}
      </section>

      <div className="mt-12 space-y-12">
        <AcaraMendatang />
        <OnAirPersonalities />
        <VideoTerbaru />
        <ProgramUnggulan />
        <ArtikelTerbaru />
      </div>
    </div>
  )
}
