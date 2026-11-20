import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Download,
  Eye,
  EyeOff,
  LockKeyhole,
  MessageCircle,
  MessageSquarePlus,
  RefreshCw,
  Trash2,
} from 'lucide-react'
import { Kosong, Pemuatan } from '../../components/common/StateBox'
import { useAuth } from '../../context/AuthContext'
import { useNotifikasi } from '../../context/NotifikasiContext'
import { useRealtimeChat } from '../../hooks/useRealtimeChat'
import { useNotifikasiGalat } from '../../hooks/useNotifikasiGalat'
import {
  ambilRiwayatSesi,
  ambilSesiChatAktif,
  bukaSesiChat,
  hapusPesanChat,
  hapusSesiChat,
  tutupSesiChat,
  ubahStatusPesan,
} from '../../services/chat'
import { supabase } from '../../services/supabase'
import type { ChatPesan, SesiChat } from '../../types/database.types'
import { BATAS_NAMA } from '../../types/chat.types'
import { labelStatus, unduhCsvChat, waktuTampil } from '../../utils/formatChat'
import { bersihkanTeks } from '../../utils/stringUtils'

export default function AdminChatPage() {
  const { profil, penggunaAuth, peran } = useAuth()
  const { beriNotifikasi } = useNotifikasi()
  const [sesiAktif, setSesiAktif] = useState<SesiChat | null>(null)
  const [riwayat, setRiwayat] = useState<SesiChat[]>([])
  const [namaSesi, setNamaSesi] = useState('')
  const [memuat, setMuat] = useState(true)
  const [memproses, setMemproses] = useState(false)
  const [galat, setGalat] = useState('')
  useNotifikasiGalat(galat)

  // Kolom ini hanya menampilkan pesan sesi yang sedang berlangsung.
  // Sesi yang sudah ditutup dibuka di halaman riwayat tersendiri.
  const { pesan, memuat: memuatPesan, muatUlang } = useRealtimeChat(sesiAktif?.id ?? null)

  const muatSesi = useCallback(async (): Promise<void> => {
    if (!supabase) {
      setGalat('Koneksi ke studio belum tersedia.')
      setMuat(false)
      return
    }
    const [aktif, lampau] = await Promise.all([ambilSesiChatAktif(), ambilRiwayatSesi()])
    if (aktif.galat) setGalat(aktif.galat)
    if (lampau.galat) setGalat(lampau.galat)
    setSesiAktif((aktif.sesi as SesiChat | null) ?? null)
    setRiwayat(lampau.riwayat)
    setMuat(false)
  }, [])

  useEffect(() => {
    void muatSesi()
  }, [muatSesi])

  useEffect(() => {
    if (!supabase) return
    const klien = supabase
    const channel = klien
      .channel('admin-sesi-chat')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sesi_chat' }, () => {
        void muatSesi()
      })
      .subscribe()
    return () => {
      void klien.removeChannel(channel)
    }
  }, [muatSesi])

  async function buka(): Promise<void> {
    const nama = bersihkanTeks(namaSesi, BATAS_NAMA)
    if (nama.length < 3) {
      setGalat('Nama sesi wajib diisi minimal 3 karakter.')
      return
    }
    if (sesiAktif) {
      setGalat('Tutup sesi yang sedang berjalan sebelum membuka sesi baru.')
      return
    }
    setGalat('')
    setMemproses(true)
    const galatBuka = await bukaSesiChat(nama, {
      id: penggunaAuth?.id ?? null,
      nama: profil?.nama_lengkap ?? 'Petugas WBS',
    })
    setMemproses(false)
    if (galatBuka) {
      setGalat(galatBuka)
      return
    }
    setNamaSesi('')
    beriNotifikasi('sukses', `Sesi chat "${nama}" dibuka.`)
    await muatSesi()
  }

  async function tutup(): Promise<void> {
    if (!sesiAktif) return
    if (!window.confirm(`Tutup sesi chat "${sesiAktif.nama_sesi}"? Ikon chat publik akan langsung hilang.`)) return
    setGalat('')
    setMemproses(true)
    const galatTutup = await tutupSesiChat(sesiAktif.id, {
      id: penggunaAuth?.id ?? null,
      nama: profil?.nama_lengkap ?? 'Petugas WBS',
    })
    setMemproses(false)
    if (galatTutup) {
      setGalat(galatTutup)
      return
    }
    beriNotifikasi('sukses', 'Sesi chat ditutup. Riwayat dan pesan tetap tersimpan.')
    await muatSesi()
  }

  async function ubahStatus(item: ChatPesan, status: ChatPesan['status']): Promise<void> {
    setGalat('')
    const galatUbah = await ubahStatusPesan(item.id, status, profil?.nama_lengkap ?? 'Petugas WBS')
    if (galatUbah) {
      setGalat(galatUbah)
      return
    }
    beriNotifikasi('sukses', status === 'disembunyikan' ? 'Pesan disembunyikan.' : 'Pesan ditampilkan kembali.')
    await muatUlang()
  }

  async function hapus(item: ChatPesan): Promise<void> {
    if (!window.confirm(`Hapus pesan dari ${item.nama} secara permanen?`)) return
    setGalat('')
    const galatHapus = await hapusPesanChat(item.id)
    if (galatHapus) {
      setGalat(galatHapus)
      return
    }
    beriNotifikasi('sukses', 'Pesan dihapus permanen.')
    await muatUlang()
  }

  function unduhCsvSesi(): void {
    if (!sesiAktif) return
    unduhCsvChat(sesiAktif.nama_sesi, pesan)
  }

  async function hapusRiwayat(item: SesiChat): Promise<void> {
    if (peran !== 'superadmin') return
    if (!window.confirm(`Hapus riwayat sesi "${item.nama_sesi}" beserta seluruh pesannya? Tindakan ini permanen.`)) return
    setGalat('')
    setMemproses(true)
    const galatHapus = await hapusSesiChat(item.id)
    setMemproses(false)
    if (galatHapus) {
      setGalat(galatHapus)
      return
    }
    beriNotifikasi('sukses', 'Riwayat sesi chat dihapus.')
    await muatSesi()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-perpusnas-blue">Inisiasi Sesi Chat</h1>
      <p className="mt-2 text-sm text-perpusnas-gray-600">
        Buka sesi chat live untuk publik, pantau pesan yang masuk, dan kelola riwayatnya. Ikon chat di pemutar radio
        hanya muncul saat sesi terbuka.
      </p>

      {memuat ? (
        <div className="mt-6">
          <Pemuatan pesan="Memuat sesi chat..." />
        </div>
      ) : (
        <section className="mt-6 rounded-2xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm">
          {sesiAktif ? (
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-perpusnas-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-perpusnas-blue-dark">
                  <MessageCircle size={13} aria-hidden="true" />
                  Sesi Terbuka
                </span>
                <h2 className="mt-3 text-xl font-bold text-perpusnas-blue">{sesiAktif.nama_sesi}</h2>
                <p className="mt-1 text-sm text-perpusnas-gray-600">
                  Dibuka {waktuTampil(sesiAktif.dibuka_pada)} WIB oleh {sesiAktif.dibuka_oleh}
                </p>
              </div>
              <button
                type="button"
                onClick={() => void tutup()}
                disabled={memproses}
                className="inline-flex items-center gap-2 rounded-full border border-red-300 px-5 py-2.5 text-sm font-semibold text-red-800 disabled:opacity-60"
              >
                <LockKeyhole size={16} aria-hidden="true" />
                Tutup Sesi
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-bold text-perpusnas-blue">Buka Sesi Chat Baru</h2>
              <p className="mt-1 text-sm text-perpusnas-gray-600">
                Isi nama sesi. Sesi tidak terikat jadwal atau acara tertentu.
              </p>
              <div className="mt-4 flex flex-wrap items-end gap-3">
                <div className="min-w-[240px] flex-1">
                  <label htmlFor="nama-sesi-chat" className="block text-sm font-semibold text-perpusnas-gray-900">
                    Nama sesi chat
                  </label>
                  <input
                    id="nama-sesi-chat"
                    value={namaSesi}
                    onChange={(event) => setNamaSesi(event.target.value)}
                    maxLength={BATAS_NAMA}
                    placeholder="Misalnya: Ngobrol literasi bersama penyiar"
                    className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm outline-none focus:border-perpusnas-blue focus:ring-2 focus:ring-perpusnas-blue/20"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => void buka()}
                  disabled={memproses || namaSesi.trim().length < 3}
                  className="inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-3 text-sm font-bold text-white hover:bg-green-800 disabled:opacity-60"
                >
                  <MessageSquarePlus size={16} aria-hidden="true" />
                  {memproses ? 'Membuka...' : 'Buka Sesi'}
                </button>
              </div>
            </>
          )}
        </section>
      )}

      <section className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-perpusnas-blue">Pesan Chat Berlangsung</h2>
            <p className="mt-1 text-xs text-perpusnas-gray-600">
              Hanya pesan pada sesi yang sedang terbuka yang tampil di sini. Riwayat sesi dibuka pada halaman tersendiri.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => void muatUlang()}
              disabled={!sesiAktif}
              className="inline-flex items-center gap-2 rounded-full border border-perpusnas-blue/20 px-4 py-2 text-xs font-semibold text-perpusnas-blue disabled:opacity-50"
            >
              <RefreshCw size={14} aria-hidden="true" />
              Segarkan
            </button>
            <button
              type="button"
              onClick={unduhCsvSesi}
              disabled={!sesiAktif || pesan.length === 0}
              className="inline-flex items-center gap-2 rounded-full border border-perpusnas-blue/20 px-4 py-2 text-xs font-semibold text-perpusnas-blue disabled:opacity-50"
            >
              <Download size={14} aria-hidden="true" />
              Unduh CSV
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {!sesiAktif ? (
            <Kosong judul="Belum ada sesi" pesan="Buka sesi chat terlebih dahulu untuk menerima pesan." />
          ) : memuatPesan ? (
            <Pemuatan pesan="Memuat pesan chat..." />
          ) : pesan.length === 0 ? (
            <Kosong judul="Belum ada pesan" pesan="Pesan baru akan muncul otomatis di sini." />
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
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => void ubahStatus(item, item.status === 'terlihat' ? 'disembunyikan' : 'terlihat')}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                      item.status === 'terlihat'
                        ? 'border-perpusnas-blue/20 text-perpusnas-gray-600'
                        : 'border-green-300 text-green-800'
                    }`}
                  >
                    {item.status === 'terlihat' ? (
                      <EyeOff size={14} aria-hidden="true" />
                    ) : (
                      <Eye size={14} aria-hidden="true" />
                    )}
                    {item.status === 'terlihat' ? 'Sembunyikan' : 'Tampilkan'}
                  </button>
                  <button
                    type="button"
                    onClick={() => void hapus(item)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-800"
                  >
                    <Trash2 size={14} aria-hidden="true" />
                    Hapus
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-perpusnas-blue">Riwayat Sesi</h2>
        <p className="mt-1 text-xs text-perpusnas-gray-600">
          Admin dan Superadmin dapat mengunduh CSV. Hanya Superadmin yang dapat menghapus riwayat sesi.
        </p>
        <div className="mt-4 space-y-3">
          {riwayat.length === 0 ? (
            <Kosong judul="Belum ada riwayat" pesan="Sesi yang sudah ditutup akan tampil di sini." />
          ) : (
            riwayat.map((item) => (
              <article
                key={item.id}
                className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-perpusnas-blue/10 bg-white p-5 shadow-sm"
              >
                <div>
                  <h3 className="font-bold text-perpusnas-blue">{item.nama_sesi}</h3>
                  <p className="mt-1 text-xs text-perpusnas-gray-600">
                    Dibuka {waktuTampil(item.dibuka_pada)} oleh {item.dibuka_oleh}
                  </p>
                  <p className="mt-1 text-xs text-perpusnas-gray-600">
                    Ditutup {waktuTampil(item.ditutup_pada)} oleh {item.ditutup_oleh ?? '-'}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/admin/chat/riwayat/${item.id}`}
                    className="rounded-full border border-perpusnas-blue/20 px-3 py-1.5 text-xs font-semibold text-perpusnas-blue"
                  >
                    Lihat Pesan
                  </Link>
                  {peran === 'superadmin' && (
                    <button
                      type="button"
                      onClick={() => void hapusRiwayat(item)}
                      disabled={memproses}
                      className="inline-flex items-center gap-1.5 rounded-full border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-800 disabled:opacity-60"
                    >
                      <Trash2 size={14} aria-hidden="true" />
                      Hapus Riwayat
                    </button>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
