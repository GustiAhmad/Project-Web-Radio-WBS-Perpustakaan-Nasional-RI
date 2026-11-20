import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Download, MessageCircle } from 'lucide-react'
import { Kosong, Pemuatan } from '../../components/common/StateBox'
import { useNotifikasiGalat } from '../../hooks/useNotifikasiGalat'
import { ambilPesan, ambilSesiChatById } from '../../services/chat'
import type { ChatPesan, SesiChat } from '../../types/database.types'
import { labelStatus, unduhCsvChat, waktuTampil } from '../../utils/formatChat'

export default function AdminChatRiwayatPage() {
  const { id } = useParams<{ id: string }>()
  const [sesi, setSesi] = useState<SesiChat | null>(null)
  const [pesan, setPesan] = useState<ChatPesan[]>([])
  const [memuat, setMuat] = useState(true)
  const [galat, setGalat] = useState('')
  useNotifikasiGalat(galat)

  useEffect(() => {
    if (!id) {
      setGalat('Alamat riwayat sesi chat tidak valid.')
      setMuat(false)
      return
    }

    let masihAktif = true
    setMuat(true)

    void Promise.all([ambilSesiChatById(id), ambilPesan(id)]).then(([hasilSesi, hasilPesan]) => {
      if (!masihAktif) return
      if (hasilSesi.galat) setGalat(hasilSesi.galat)
      if (hasilPesan.galat) setGalat(hasilPesan.galat)
      setSesi(hasilSesi.sesi)
      setPesan(hasilPesan.pesan)
      setMuat(false)
    })

    return () => {
      masihAktif = false
    }
  }, [id])

  if (memuat) {
    return (
      <div>
        <Pemuatan pesan="Memuat riwayat sesi chat..." />
      </div>
    )
  }

  if (!sesi) {
    return (
      <div>
        <Link
          to="/admin/chat"
          className="inline-flex items-center gap-2 text-sm font-semibold text-perpusnas-blue hover:underline"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Kembali ke Inisiasi Sesi Chat
        </Link>
        <div className="mt-6">
          <Kosong judul="Sesi tidak ditemukan" pesan="Riwayat sesi ini sudah dihapus atau alamatnya tidak valid." />
        </div>
      </div>
    )
  }

  return (
    <div>
      <Link
        to="/admin/chat"
        className="inline-flex items-center gap-2 text-sm font-semibold text-perpusnas-blue hover:underline"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Kembali ke Inisiasi Sesi Chat
      </Link>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-perpusnas-blue">Riwayat Sesi Chat</h1>
          <div className="mt-3 flex items-center gap-2">
            <MessageCircle size={17} aria-hidden="true" className="text-perpusnas-gold" />
            <h2 className="text-xl font-bold text-perpusnas-gray-900">{sesi.nama_sesi}</h2>
          </div>
          <p className="mt-2 text-sm text-perpusnas-gray-600">
            Dibuka {waktuTampil(sesi.dibuka_pada)} WIB oleh {sesi.dibuka_oleh}
          </p>
          <p className="mt-1 text-sm text-perpusnas-gray-600">
            Ditutup {waktuTampil(sesi.ditutup_pada)} WIB oleh {sesi.ditutup_oleh ?? '-'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => unduhCsvChat(sesi.nama_sesi, pesan)}
          disabled={pesan.length === 0}
          className="inline-flex items-center gap-2 rounded-full border border-perpusnas-blue/20 px-5 py-2.5 text-sm font-semibold text-perpusnas-blue disabled:opacity-50"
        >
          <Download size={16} aria-hidden="true" />
          Unduh CSV
        </button>
      </div>

      <section className="mt-8">
        <h3 className="text-lg font-bold text-perpusnas-blue">Pesan dalam Sesi Ini</h3>
        <p className="mt-1 text-xs text-perpusnas-gray-600">
          Arsip bersifat tetap. Pesan yang disembunyikan tetap tampil di sini dan ikut diekspor ke CSV dengan kolom status.
        </p>
        <div className="mt-4 space-y-3">
          {pesan.length === 0 ? (
            <Kosong judul="Tidak ada pesan" pesan="Tidak ada pesan yang tercatat pada sesi ini." />
          ) : (
            pesan.map((item) => (
              <article
                key={item.id}
                className={`rounded-xl border bg-white p-5 shadow-sm ${
                  item.status === 'disembunyikan' ? 'border-amber-300 opacity-75' : 'border-perpusnas-blue/10'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-perpusnas-blue">{item.nama}</p>
                    <p className="mt-1 text-xs text-perpusnas-gray-600">{waktuTampil(item.created_at)} WIB</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                      item.status === 'terlihat'
                        ? 'bg-green-50 text-green-800'
                        : 'bg-perpusnas-gray-100 text-perpusnas-gray-600'
                    }`}
                  >
                    {labelStatus[item.status]}
                  </span>
                </div>
                <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-perpusnas-gray-900">
                  {item.isi}
                </p>
                {item.disembunyikan_oleh && (
                  <p className="mt-2 text-[11px] text-perpusnas-gray-600">
                    Disembunyikan oleh {item.disembunyikan_oleh}
                  </p>
                )}
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
