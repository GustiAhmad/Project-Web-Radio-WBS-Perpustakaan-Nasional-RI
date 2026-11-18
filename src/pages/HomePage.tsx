import { Link } from 'react-router-dom'
import { CalendarDays, MessagesSquare, Play, Radio, Youtube } from 'lucide-react'

const ringkasan = [
  {
    ikon: Radio,
    judul: 'Siaran Radio',
    deskripsi: 'Dengarkan radio WBS langsung dari studio tanpa terputus saat menjelajah situs.',
  },
  {
    ikon: Youtube,
    judul: 'Video Siniar',
    deskripsi: 'Jelajahi seri resmi dan keranjang Lainnya berisi rekaman siaran WBS.',
  },
  {
    ikon: MessagesSquare,
    judul: 'Tanya Jawab Langsung',
    deskripsi: 'Kirim pertanyaan ke studio saat sesi dibuka oleh petugas siaran.',
  },
]

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="overflow-hidden rounded-2xl bg-perpusnas-blue text-white">
        <div className="grid gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:px-14 lg:py-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-perpusnas-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-perpusnas-blue-dark">
              <span className="h-2 w-2 rounded-full bg-perpusnas-blue-dark" aria-hidden="true" />
              Live On-Air
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
              Radio &amp; Siniar WBS Perpusnas
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-perpusnas-blue-light">
              Dengarkan siaran literasi Widya Bahana Swara langsung dari studio Perpustakaan Nasional RI,
              lalu jelajahi rekaman program favorit Anda kapan saja.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/jadwal"
                className="inline-flex items-center gap-2 rounded-lg bg-perpusnas-gold px-5 py-2.5 text-sm font-bold text-perpusnas-blue-dark hover:bg-yellow-400"
              >
                <CalendarDays size={17} aria-hidden="true" />
                Lihat Jadwal Siaran
              </Link>
              <Link
                to="/program"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                <Play size={17} aria-hidden="true" />
                Jelajahi Program
              </Link>
            </div>
          </div>

          <div className="hidden justify-center lg:flex">
            <div className="flex aspect-square w-full max-w-xs flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/10">
              <Radio size={72} strokeWidth={1.5} aria-hidden="true" className="text-perpusnas-gold" />
              <p className="mt-5 text-sm font-medium text-perpusnas-blue-light">Siaran Radio WBS</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Ringkasan layanan" className="mt-10 grid gap-5 md:grid-cols-3">
        {ringkasan.map(({ ikon: Ikon, judul, deskripsi }) => (
          <article key={judul} className="rounded-xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-perpusnas-blue-light text-perpusnas-blue">
              <Ikon size={22} aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-base font-bold text-perpusnas-gray-900">{judul}</h2>
            <p className="mt-2 text-sm leading-relaxed text-perpusnas-gray-600">{deskripsi}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
