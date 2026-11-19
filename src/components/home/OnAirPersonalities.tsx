import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Mic2 } from 'lucide-react'
import { ambilPenyiar, type Penyiar } from '../../services/catalog'
import { Kosong, Pemuatan } from '../common/StateBox'

const fotoBawaan = `${import.meta.env.BASE_URL}placeholder-penyiar.svg`

export default function OnAirPersonalities() {
  const [penyiar, setPenyiar] = useState<Penyiar[]>([])
  const [memuat, setMuat] = useState(true)

  useEffect(() => {
    let masihAktif = true
    void ambilPenyiar().then((data) => {
      if (!masihAktif) return
      setPenyiar(data)
      setMuat(false)
    })
    return () => {
      masihAktif = false
    }
  }, [])

  return (
    <section aria-labelledby="judul-penyiar">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 id="judul-penyiar" className="text-xl font-bold text-perpusnas-blue sm:text-2xl">On-Air Personalities</h2>
          <p className="mt-1 text-sm text-perpusnas-gray-600">Wajah di balik siaran Ruang Literasi dan program WBS lainnya.</p>
        </div>
      </div>

      <div className="mt-5">
        {memuat ? (
          <Pemuatan pesan="Memuat daftar penyiar..." />
        ) : penyiar.length === 0 ? (
          <Kosong
            judul="Profil penyiar belum diisi"
            pesan="Foto dan bio penyiar akan muncul di sini setelah pengelola menambahkannya di panel admin."
          />
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {penyiar.map((orang) => (
              <li key={orang.id} className="flex h-full flex-col items-center rounded-xl border border-perpusnas-blue/10 bg-white p-5 text-center shadow-sm">
                <img
                  src={orang.foto_url ?? fotoBawaan}
                  alt={orang.foto_url ? `Foto ${orang.nama}` : 'Foto penyiar belum tersedia'}
                  width={96}
                  height={96}
                  loading="lazy"
                  decoding="async"
                  className="h-24 w-24 rounded-full border-4 border-perpusnas-blue-light object-cover"
                />
                <h3 className="mt-4 flex items-center justify-center gap-1.5 text-sm font-bold text-perpusnas-gray-900">
                  <Mic2 size={14} aria-hidden="true" className="shrink-0 text-perpusnas-gold" />
                  {orang.nama}
                </h3>
                {orang.bio && <p className="mt-2 line-clamp-3 text-xs text-perpusnas-gray-600">{orang.bio}</p>}
                <Link
                  to={`/jadwal?penyiar=${encodeURIComponent(orang.slug)}`}
                  className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold text-perpusnas-blue hover:underline"
                >
                  <CalendarDays size={13} aria-hidden="true" />
                  Lihat jadwal
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
