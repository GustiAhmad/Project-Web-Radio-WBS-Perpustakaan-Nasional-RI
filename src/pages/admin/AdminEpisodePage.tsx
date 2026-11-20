import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Archive, Pencil, Plus, RefreshCw } from 'lucide-react'
import { Kosong, PenandaKosong, Pemuatan } from '../../components/common/StateBox'
import { useNotifikasi } from '../../context/NotifikasiContext'
import { useNotifikasiGalat } from '../../hooks/useNotifikasiGalat'
import { supabase } from '../../services/supabase'
import type { Database, Episode, Seri } from '../../types/database.types'
import { adaIsi } from '../../utils/stringUtils'

type StatusEpisode = Database['public']['Enums']['status_episode']
type EpisodeRingkas = Pick<
  Episode,
  'id' | 'seri_id' | 'judul' | 'nomor_episode' | 'tanggal_tayang' | 'narasumber' | 'moderator' | 'topik' | 'status'
>
type SeriRingkas = Pick<Seri, 'id' | 'nama'>

const daftarStatus: Array<{ nilai: StatusEpisode | 'semua'; label: string }> = [
  { nilai: 'tayang', label: 'Tayang' },
  { nilai: 'draf', label: 'Draf' },
  { nilai: 'arsip_internal', label: 'Internal' },
  { nilai: 'semua', label: 'Semua status' },
]

const labelStatus: Record<StatusEpisode, string> = {
  tayang: 'Tayang',
  draf: 'Draf',
  arsip_internal: 'Internal',
}

export default function AdminEpisodePage() {
  const [episode, setEpisode] = useState<EpisodeRingkas[]>([])
  const [seri, setSeri] = useState<SeriRingkas[]>([])
  const [memuat, setMuat] = useState(true)
  const [galat, setGalat] = useState('')
  const [kataKunci, setKataKunci] = useState('')
  const [filterStatus, setFilterStatus] = useState<StatusEpisode | 'semua'>('tayang')
  const [sedangMengarsipkan, setSedangMengarsipkan] = useState<string | null>(null)
  const { beriNotifikasi } = useNotifikasi()
  useNotifikasiGalat(galat)

  async function muat(): Promise<void> {
    if (!supabase) {
      setMuat(false)
      setGalat('Koneksi ke studio belum tersedia.')
      return
    }
    setGalat('')
    const [dataEpisode, dataSeri] = await Promise.all([
      supabase
        .from('episode')
        .select('id, seri_id, judul, nomor_episode, tanggal_tayang, narasumber, moderator, topik, status')
        .order('created_at', { ascending: false })
        .limit(500),
      supabase.from('seri').select('id, nama').order('urutan'),
    ])
    if (dataEpisode.error) setGalat(`Gagal memuat episode: ${dataEpisode.error.message}`)
    if (dataSeri.error) setGalat(`Gagal memuat seri: ${dataSeri.error.message}`)
    setEpisode((dataEpisode.data as EpisodeRingkas[] | null) ?? [])
    setSeri((dataSeri.data as SeriRingkas[] | null) ?? [])
    setMuat(false)
  }

  useEffect(() => {
    void muat()
  }, [])

  async function ubahStatus(id: string, nilai: StatusEpisode): Promise<void> {
    if (!supabase) return
    setGalat('')
    const { error } = await supabase.from('episode').update({ status: nilai }).eq('id', id)
    if (error) {
      setGalat(`Gagal mengubah status: ${error.message}`)
      return
    }
    beriNotifikasi('sukses', 'Status episode diperbarui.')
    await muat()
  }

  async function arsipkanEpisode(item: EpisodeRingkas): Promise<void> {
    if (!supabase) return
    const setuju = window.confirm(
      `Arsipkan episode "${item.judul}"? Episode tidak lagi tampil di katalog publik, tetapi data tetap tersimpan di panel ini.`
    )
    if (!setuju) return

    setSedangMengarsipkan(item.id)
    setGalat('')
    const { error } = await supabase
      .from('episode')
      .update({ status: 'arsip_internal' })
      .eq('id', item.id)
    setSedangMengarsipkan(null)
    if (error) {
      setGalat(`Gagal mengarsipkan episode: ${error.message}`)
      return
    }
    beriNotifikasi('sukses', 'Episode diarsipkan dan tidak lagi tampil di katalog publik.')
    await muat()
  }

  const daftarTampil = episode.filter((item) => {
    const cocokStatus = filterStatus === 'semua' || item.status === filterStatus
    const cocokJudul = item.judul.toLowerCase().includes(kataKunci.trim().toLowerCase())
    return cocokStatus && cocokJudul
  })

  function namaSeri(id: string): string {
    return seri.find((item) => item.id === id)?.nama ?? 'Seri tidak ditemukan'
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-perpusnas-blue">Kelola Episode</h1>
          <p className="mt-2 text-sm text-perpusnas-gray-600">
            Daftar episode tayang menjadi halaman awal. Sunting metadata lewat tombol Edit; tombol Arsipkan mengeluarkan episode dari katalog publik tanpa menghapus datanya.
          </p>
        </div>
        <Link
          to="/admin/episode/baru"
          className="inline-flex items-center gap-2 rounded-full bg-perpusnas-blue px-5 py-2.5 text-sm font-bold text-white hover:bg-perpusnas-blue-dark"
        >
          <Plus size={16} aria-hidden="true" />
          Tambah Episode
        </Link>
      </div>

      <section className="mt-6 rounded-xl border border-perpusnas-blue/10 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="filter-status-episode" className="text-xs font-semibold text-perpusnas-gray-600">
            Status
          </label>
          <select
            id="filter-status-episode"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as StatusEpisode | 'semua')}
            className="rounded-lg border border-perpusnas-blue/20 px-3 py-2 text-sm"
          >
            {daftarStatus.map((opsi) => (
              <option key={opsi.nilai} value={opsi.nilai}>{opsi.label}</option>
            ))}
          </select>
          <input
            type="search"
            value={kataKunci}
            onChange={(e) => setKataKunci(e.target.value)}
            placeholder="Cari judul episode"
            aria-label="Cari judul episode"
            className="min-w-[200px] flex-1 rounded-lg border border-perpusnas-blue/20 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => void muat()}
            aria-label="Segarkan episode"
            className="inline-flex items-center gap-2 rounded-lg border border-perpusnas-blue/20 px-3 py-2 text-sm font-semibold text-perpusnas-blue"
          >
            <RefreshCw size={15} aria-hidden="true" />
            Segarkan
          </button>
        </div>
      </section>

      <div className="mt-5 space-y-3">
        {memuat && <Pemuatan pesan="Memuat episode..." />}
        {!memuat && daftarTampil.length === 0 && (
          <Kosong
            judul="Episode tidak ditemukan"
            pesan="Ubah kata kunci atau status, atau tambahkan episode baru."
          />
        )}
        {!memuat &&
          daftarTampil.map((item) => {
            const narasumberKosong = !adaIsi(item.narasumber)
            const moderatorKosong = !adaIsi(item.moderator)
            return (
              <article
                key={item.id}
                className="rounded-xl border border-perpusnas-blue/10 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-perpusnas-gray-900">
                      {item.nomor_episode ? `Episode ${item.nomor_episode} - ` : ''}{item.judul}
                    </p>
                    <p className="mt-1 text-xs text-perpusnas-gray-600">
                      {namaSeri(item.seri_id)} · {item.tanggal_tayang} · {item.topik}
                    </p>
                    {(narasumberKosong || moderatorKosong) && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {narasumberKosong && <PenandaKosong label="Narasumber" />}
                        {moderatorKosong && <PenandaKosong label="Moderator" />}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      aria-label={`Status ${item.judul}`}
                      value={item.status}
                      onChange={(e) => void ubahStatus(item.id, e.target.value as StatusEpisode)}
                      className="rounded-lg border border-perpusnas-blue/20 bg-white px-3 py-2 text-xs"
                    >
                      {daftarStatus
                        .filter((opsi) => opsi.nilai !== 'semua')
                        .map((opsi) => (
                          <option key={opsi.nilai} value={opsi.nilai}>{opsi.label}</option>
                        ))}
                    </select>
                    <Link
                      to={`/admin/episode/${item.id}/edit`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-perpusnas-blue-light px-3 py-2 text-xs font-bold text-perpusnas-blue"
                    >
                      <Pencil size={14} aria-hidden="true" />
                      Edit
                    </Link>
                    {item.status !== 'arsip_internal' && (
                      <button
                        type="button"
                        onClick={() => void arsipkanEpisode(item)}
                        disabled={sedangMengarsipkan === item.id}
                        aria-label={`Arsipkan ${item.judul}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-800 disabled:opacity-50"
                      >
                        <Archive size={14} aria-hidden="true" />
                        {sedangMengarsipkan === item.id ? 'Mengarsipkan...' : 'Arsipkan'}
                      </button>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-[11px] uppercase tracking-wide text-perpusnas-gray-600">
                  {labelStatus[item.status]}
                </p>
              </article>
            )
          })}
      </div>
    </div>
  )
}
