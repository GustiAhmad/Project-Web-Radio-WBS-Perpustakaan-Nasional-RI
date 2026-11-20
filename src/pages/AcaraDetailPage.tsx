import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3 } from 'lucide-react'
import { Kosong, Pemuatan } from '../components/common/StateBox'
import { ambilAcaraDetail, type AcaraMendatang } from '../services/catalog'
import { lacakEvent } from '../services/ga4'
import { formatTanggal, labelKanal } from '../utils/formatters'
import { pecahNarasumber } from '../utils/stringUtils'

const posterBawaan = `${import.meta.env.BASE_URL}placeholder-poster.svg`

export default function AcaraDetailPage() {
  const { id = '' } = useParams()
  const [acara, setAcara] = useState<AcaraMendatang | null>(null)
  const [memuat, setMuat] = useState(true)
  const acaraDilacakRef = useRef('')

  useEffect(() => {
    if (!acara || acaraDilacakRef.current === acara.id) return
    acaraDilacakRef.current = acara.id
    lacakEvent('acara_view', { acara_id: acara.id, kanal: acara.kanal })
  }, [acara])

  useEffect(() => {
    let masihAktif = true
    setMuat(true)
    void ambilAcaraDetail(id).then((data) => {
      if (!masihAktif) return
      setAcara(data)
      setMuat(false)
    })
    return () => {
      masihAktif = false
    }
  }, [id])

  if (memuat) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Pemuatan pesan="Memuat detail acara..." />
      </div>
    )
  }

  if (!acara) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Kosong
          judul="Acara tidak ditemukan"
          pesan="Pengumuman mungkin sudah dihapus atau belum diterbitkan. Kembali ke beranda untuk melihat acara lain."
        />
        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-perpusnas-blue hover:underline">
            <ArrowLeft size={15} aria-hidden="true" />
            Kembali ke beranda
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-perpusnas-blue hover:underline">
        <ArrowLeft size={15} aria-hidden="true" />
        Kembali ke beranda
      </Link>

      <div className="mt-6 overflow-hidden rounded-2xl border border-perpusnas-blue/10 bg-white shadow-sm">
        <img
          src={acara.gambar_url ?? posterBawaan}
          alt={acara.gambar_url ? `Poster acara ${acara.judul}` : 'Poster acara belum tersedia'}
          width={1280}
          height={720}
          className="aspect-video w-full bg-perpusnas-blue-light object-contain"
        />
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-perpusnas-blue">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-perpusnas-blue-light px-3 py-1.5">
              <CalendarDays size={14} aria-hidden="true" />
              {formatTanggal(acara.tanggal)}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-perpusnas-blue-light px-3 py-1.5">
              <Clock3 size={14} aria-hidden="true" />
              {acara.jam_mulai.slice(0, 5)}
              {acara.jam_selesai ? `–${acara.jam_selesai.slice(0, 5)}` : ''} WIB
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-perpusnas-gold-light px-3 py-1.5 text-perpusnas-blue-dark">
              {labelKanal(acara.kanal)}
            </span>
          </div>

          <h1 className="mt-5 text-2xl font-bold leading-tight text-perpusnas-blue sm:text-3xl">{acara.judul}</h1>

          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
            {acara.moderator && acara.moderator !== 'Belum tercatat' && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-perpusnas-gray-600">Moderator</dt>
                <dd className="mt-1 font-medium text-perpusnas-gray-900">{acara.moderator}</dd>
              </div>
            )}
            <div className={acara.moderator && acara.moderator !== 'Belum tercatat' ? '' : 'sm:col-span-2'}>
              <dt className="text-xs font-semibold uppercase tracking-wide text-perpusnas-gray-600">Narasumber / Pemateri</dt>
              <dd className="mt-1 font-medium text-perpusnas-gray-900">
                {pecahNarasumber(acara.narasumber).join(', ')}
              </dd>
            </div>
            {acara.topik && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-perpusnas-gray-600">Topik</dt>
                <dd className="mt-1 font-medium text-perpusnas-gray-900">{acara.topik}</dd>
              </div>
            )}
          </dl>

          {acara.deskripsi ? (
            <div className="mt-5 whitespace-pre-line text-sm leading-relaxed text-perpusnas-gray-600 sm:text-base">
              {acara.deskripsi}
            </div>
          ) : (
            <p className="mt-5 text-sm text-perpusnas-gray-600">
              Detail acara belum ditambahkan oleh pengelola.
            </p>
          )}

          {acara.tautan_acara && (
            <a
              href={acara.tautan_acara}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-perpusnas-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-perpusnas-blue-dark"
            >
              Buka acara di {labelKanal(acara.kanal)}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
