import { useEffect, useState, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react'
import { Kosong, Pemuatan } from '../../components/common/StateBox'
import { supabase } from '../../services/supabase'
import type { Database, Episode, Seri } from '../../types/database.types'
import { bersihkanTeks, slugify, videoIdDariTautan } from '../../utils/stringUtils'

type StatusEpisode = Database['public']['Enums']['status_episode']

export default function AdminEpisodePage() {
  const [episode, setEpisode] = useState<Episode[]>([])
  const [seri, setSeri] = useState<Seri[]>([])
  const [memuat, setMuat] = useState(true)
  const [galat, setGalat] = useState('')
  const [pesan, setPesan] = useState('')
  const [kataKunci, setKataKunci] = useState('')

  const [seriId, setSeriId] = useState('')
  const [judul, setJudul] = useState('')
  const [tautan, setTautan] = useState('')
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10))
  const [topik, setTopik] = useState('')
  const [narasumber, setNarasumber] = useState('')
  const [moderator, setModerator] = useState('')
  const [menit, setMenit] = useState('60')
  const [deskripsi, setDeskripsi] = useState('')
  const [status, setStatus] = useState<StatusEpisode>('tayang')
  const [mengirim, setMengirim] = useState(false)

  async function muat(): Promise<void> {
    if (!supabase) {
      setMuat(false)
      setGalat('Koneksi ke studio belum tersedia.')
      return
    }
    const [dataEpisode, dataSeri] = await Promise.all([
      supabase.from('episode').select('*').order('created_at', { ascending: false }).limit(100),
      supabase.from('seri').select('*').order('urutan'),
    ])
    if (dataEpisode.error) setGalat(`Gagal memuat episode: ${dataEpisode.error.message}`)
    if (dataSeri.error) setGalat(`Gagal memuat seri: ${dataSeri.error.message}`)
    setEpisode((dataEpisode.data as Episode[] | null) ?? [])
    setSeri((dataSeri.data as Seri[] | null) ?? [])
    if (!seriId && dataSeri.data && dataSeri.data.length > 0) {
      setSeriId((dataSeri.data[0] as Seri).id)
    }
    setMuat(false)
  }

  useEffect(() => {
    void muat()
  }, [])

  async function simpan(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    if (!supabase) return
    setGalat('')
    setPesan('')

    const videoId = videoIdDariTautan(tautan)
    if (!videoId) {
      setGalat('Tautan YouTube tidak dikenali. Tempel alamat video atau ID 11 karakter.')
      return
    }
    const judulBersih = bersihkanTeks(judul, 200)
    if (judulBersih.length < 5) {
      setGalat('Judul minimal 5 karakter.')
      return
    }
    const seriDipilih = seri.find((item) => item.id === seriId)
    if (!seriDipilih) {
      setGalat('Pilih seri terlebih dahulu.')
      return
    }

    setMengirim(true)
    const { data: nomorData } = await supabase
      .from('episode')
      .select('nomor_episode')
      .eq('seri_id', seriId)
      .order('nomor_episode', { ascending: false })
      .limit(1)

    const nomorTerakhir = (nomorData?.[0]?.nomor_episode as number | null) ?? 0
    const nomorEpisode = seriDipilih.jenis === 'keranjang' ? null : nomorTerakhir + 1
    const slugUnik = `${slugify(judulBersih) || 'episode'}-${videoId.slice(-4)}`

    const { error } = await supabase.from('episode').insert({
      seri_id: seriId,
      judul: judulBersih,
      slug: slugUnik,
      nomor_episode: nomorEpisode,
      tanggal_tayang: tanggal,
      durasi_detik: Math.max(0, Number(menit) || 0) * 60,
      narasumber: bersihkanTeks(narasumber, 150) || '-',
      moderator: bersihkanTeks(moderator, 150) || '-',
      topik: bersihkanTeks(topik, 150) || 'Siaran WBS',
      tautan_youtube: `https://www.youtube.com/watch?v=${videoId}`,
      video_id: videoId,
      deskripsi: bersihkanTeks(deskripsi, 2000) || null,
      status,
    })

    setMengirim(false)
    if (error) {
      setGalat(`Gagal menyimpan episode: ${error.message}`)
      return
    }

    setPesan(`Episode tersimpan dengan nomor ${nomorEpisode ?? 'tanpa nomor'} dan status ${status}.`)
    setJudul('')
    setTautan('')
    setTopik('')
    setNarasumber('')
    setModerator('')
    setDeskripsi('')
    await muat()
  }

  async function ubahStatus(id: string, nilai: StatusEpisode): Promise<void> {
    if (!supabase) return
    setGalat('')
    const { error } = await supabase.from('episode').update({ status: nilai }).eq('id', id)
    if (error) setGalat(`Gagal mengubah status: ${error.message}`)
    else setPesan('Status episode diperbarui.')
    await muat()
  }

  const daftarTampil = episode.filter((item) =>
    item.judul.toLowerCase().includes(kataKunci.trim().toLowerCase())
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-perpusnas-blue">Kelola Episode</h1>
      <p className="mt-2 text-sm text-perpusnas-gray-600">
        Tambah rekaman YouTube resmi WBS. Nomor episode dihitung otomatis untuk seri bernomor.
      </p>

      {galat && (
        <p role="alert" className="mt-5 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle size={17} aria-hidden="true" className="mt-0.5 shrink-0" />
          {galat}
        </p>
      )}
      {pesan && (
        <p role="status" className="mt-5 flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          <CheckCircle2 size={17} aria-hidden="true" className="mt-0.5 shrink-0" />
          {pesan}
        </p>
      )}

      <section className="mt-6 rounded-2xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-perpusnas-blue">Tambah Episode Baru</h2>
        <form onSubmit={(e) => void simpan(e)} className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="ep-seri" className="block text-sm font-semibold text-perpusnas-gray-900">Seri</label>
            <select
              id="ep-seri"
              value={seriId}
              onChange={(e) => setSeriId(e.target.value)}
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 bg-white px-3 py-2.5 text-sm"
            >
              <option value="">Pilih seri</option>
              {seri.map((item) => (
                <option key={item.id} value={item.id}>{item.nama}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ep-status" className="block text-sm font-semibold text-perpusnas-gray-900">Status</label>
            <select
              id="ep-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as StatusEpisode)}
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 bg-white px-3 py-2.5 text-sm"
            >
              <option value="draf">Draf</option>
              <option value="tayang">Tayang</option>
              <option value="arsip_internal">Internal</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="ep-judul" className="block text-sm font-semibold text-perpusnas-gray-900">Judul</label>
            <input
              id="ep-judul"
              required
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="ep-tautan" className="block text-sm font-semibold text-perpusnas-gray-900">Tautan atau ID YouTube</label>
            <input
              id="ep-tautan"
              required
              value={tautan}
              onChange={(e) => setTautan(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="ep-tanggal" className="block text-sm font-semibold text-perpusnas-gray-900">Tanggal tayang</label>
            <input
              id="ep-tanggal"
              type="date"
              required
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="ep-menit" className="block text-sm font-semibold text-perpusnas-gray-900">Durasi (menit)</label>
            <input
              id="ep-menit"
              type="number"
              min={0}
              value={menit}
              onChange={(e) => setMenit(e.target.value)}
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="ep-topik" className="block text-sm font-semibold text-perpusnas-gray-900">Topik</label>
            <input
              id="ep-topik"
              value={topik}
              onChange={(e) => setTopik(e.target.value)}
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="ep-narasumber" className="block text-sm font-semibold text-perpusnas-gray-900">Narasumber</label>
            <input
              id="ep-narasumber"
              value={narasumber}
              onChange={(e) => setNarasumber(e.target.value)}
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="ep-moderator" className="block text-sm font-semibold text-perpusnas-gray-900">Moderator</label>
            <input
              id="ep-moderator"
              value={moderator}
              onChange={(e) => setModerator(e.target.value)}
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="ep-deskripsi" className="block text-sm font-semibold text-perpusnas-gray-900">Ringkasan (opsional)</label>
            <textarea
              id="ep-deskripsi"
              rows={3}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="mt-2 w-full resize-y rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={mengirim}
              className="rounded-full bg-perpusnas-blue px-6 py-3 text-sm font-bold text-white hover:bg-perpusnas-blue-dark disabled:opacity-60"
            >
              {mengirim ? 'Menyimpan...' : 'Simpan Episode'}
            </button>
          </div>
        </form>
      </section>

      <section className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-perpusnas-blue">Daftar Episode</h2>
          <div className="flex items-center gap-2">
            <input
              type="search"
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
              placeholder="Cari judul episode"
              aria-label="Cari judul episode"
              className="rounded-full border border-perpusnas-blue/20 px-4 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() => void muat()}
              aria-label="Segarkan episode"
              className="rounded-full border border-perpusnas-blue/20 p-2 text-perpusnas-blue"
            >
              <RefreshCw size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {memuat && <Pemuatan pesan="Memuat episode..." />}
          {!memuat && daftarTampil.length === 0 && (
            <Kosong judul="Episode tidak ditemukan" pesan="Ubah kata kunci atau tambahkan episode baru." />
          )}
          {!memuat &&
            daftarTampil.map((item) => (
              <article key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-perpusnas-blue/10 bg-white p-4 shadow-sm">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-perpusnas-gray-900">
                    {item.nomor_episode ? `Episode ${item.nomor_episode} - ` : ''}{item.judul}
                  </p>
                  <p className="mt-1 text-xs text-perpusnas-gray-600">{item.tanggal_tayang} - {item.topik}</p>
                </div>
                <select
                  aria-label={`Status ${item.judul}`}
                  value={item.status}
                  onChange={(e) => void ubahStatus(item.id, e.target.value as StatusEpisode)}
                  className="rounded-lg border border-perpusnas-blue/20 bg-white px-3 py-2 text-xs"
                >
                  <option value="draf">Draf</option>
                  <option value="tayang">Tayang</option>
                  <option value="arsip_internal">Internal</option>
                </select>
              </article>
            ))}
        </div>
      </section>
    </div>
  )
}
