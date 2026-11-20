import { Loader2, Pause, Play, Radio } from 'lucide-react'
import { useAudio } from '../../context/AudioContext'
import { useOnAirProgram } from '../../hooks/useOnAirProgram'

export default function HeroOnAir() {
  const { isPlaying, isBuffering, toggle } = useAudio()
  const { program, berikutnya, jam } = useOnAirProgram()

  return (
    <section className="overflow-hidden rounded-2xl bg-perpusnas-blue text-white" aria-label="Siaran radio langsung">
      <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:px-14 lg:py-14">
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

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={toggle}
              disabled={isBuffering}
              className="inline-flex items-center gap-3 rounded-full bg-perpusnas-gold px-6 py-3 text-sm font-bold text-perpusnas-blue-dark transition hover:bg-yellow-400 disabled:cursor-wait disabled:opacity-70"
            >
              {isBuffering ? (
                <Loader2 size={18} aria-hidden="true" className="animate-spin" />
              ) : isPlaying ? (
                <Pause size={18} aria-hidden="true" />
              ) : (
                <Play size={18} aria-hidden="true" />
              )}
              {isBuffering ? 'Menghubungkan...' : isPlaying ? 'Jeda siaran' : 'Dengarkan siaran'}
            </button>
          </div>
          <p className="mt-3 text-sm text-white/80">
            {program ? `Sedang mengudara: ${program.nama_program}` : 'Siaran langsung dari studio WBS'}
          </p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/5 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
              <Radio size={20} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wide text-white/60">Jadwal siaran</p>
              <p className="text-2xl font-bold tabular-nums">{jam.slice(0, 5)} WIB</p>
            </div>
          </div>
          <div className="mt-5 border-t border-white/15 pt-4">
            <p className="text-xs uppercase tracking-wide text-white/60">Program saat ini</p>
            <p className="mt-1 text-base font-semibold">{program?.nama_program ?? 'Siaran umum'}</p>
            <p className="mt-3 text-xs uppercase tracking-wide text-white/60">Berikutnya</p>
            <p className="mt-1 text-sm text-white/90">{berikutnya?.nama_program ?? 'Jadwal menyusul'}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
