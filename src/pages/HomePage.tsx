import { Link } from 'react-router-dom'
import { CalendarDays, MessagesSquare, Radio, Youtube } from 'lucide-react'
import AcaraMendatang from '../components/home/AcaraMendatang'
import HeroOnAir from '../components/home/HeroOnAir'
import OnAirPersonalities from '../components/home/OnAirPersonalities'
import ProgramUnggulan from '../components/home/ProgramUnggulan'
import VideoTerbaru from '../components/home/VideoTerbaru'
import QnAForm from '../components/interaction/QnAForm'

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
  {
    ikon: MessagesSquare,
    judul: 'Tanya Jawab Langsung',
    deskripsi: 'Kirim pertanyaan ke studio saat sesi dibuka oleh petugas siaran.',
    ke: '#tanya-jawab',
  },
]

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <HeroOnAir />

      <QnAForm />

      <section aria-label="Layanan WBS" className="mt-8 grid gap-4 sm:grid-cols-3">
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
      </div>

      <aside className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-perpusnas-blue-light p-6">
        <div className="flex items-center gap-3">
          <CalendarDays size={22} aria-hidden="true" className="text-perpusnas-blue" />
          <p className="text-sm text-perpusnas-gray-900">
            Ingin tahu apa yang mengudara hari ini? Lihat jadwal siaran 24 jam.
          </p>
        </div>
        <Link to="/jadwal" className="rounded-full bg-perpusnas-blue px-5 py-2 text-sm font-semibold text-white hover:bg-perpusnas-blue-dark">
          Lihat jadwal
        </Link>
      </aside>
    </div>
  )
}
