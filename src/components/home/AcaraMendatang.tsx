import { useEffect, useState } from 'react'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { ambilAcaraMendatang, type AcaraMendatang } from '../../services/catalog'
import { formatTanggal, labelKanal } from '../../utils/formatters'
import { Kosong, Pemuatan } from '../common/StateBox'

export default function AcaraMendatang() {
  const [acara, setAcara] = useState<AcaraMendatang[]>([])
  const [memuat, setMuat] = useState(true)

  useEffect(() => {
    let masihAktif = true
    void ambilAcaraMendatang().then((data) => {
      if (!masihAktif) return
      setAcara(data)
      setMuat(false)
    })
    return () => {
      masihAktif = false
    }
  }, [])

  return (
    <section aria-labelledby="judul-acara">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 id="judul-acara" className="text-xl font-bold text-perpusnas-blue sm:text-2xl">Acara Mendatang</h2>
          <p className="mt-1 text-sm text-perpusnas-gray-600">Program live dan talkshow yang segera disiarkan.</p>
        </div>
      </div>

      <div className="mt-5">
        {memuat ? (
          <Pemuatan pesan="Memuat acara mendatang..." />
        ) : acara.length === 0 ? (
          <Kosong
            judul="Belum ada acara mendatang"
            pesan="Pengumuman acara live akan muncul di sini setelah petugas menerbitkannya."
          />
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {acara.map((item) => (
              <li key={item.id} className="rounded-xl border border-perpusnas-blue/10 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold text-perpusnas-blue">
                  <CalendarDays size={14} aria-hidden="true" />
                  {formatTanggal(item.tanggal)} · {item.jam_mulai.slice(0, 5)} WIB · {labelKanal(item.kanal)}
                </div>
                <h3 className="mt-3 text-sm font-bold text-perpusnas-gray-900">{item.judul}</h3>
                {item.deskripsi && <p className="mt-2 line-clamp-2 text-xs text-perpusnas-gray-600">{item.deskripsi}</p>}
                {item.tautan_acara && (
                  <a
                    href={item.tautan_acara}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-perpusnas-blue hover:underline"
                  >
                    Lihat acara
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
