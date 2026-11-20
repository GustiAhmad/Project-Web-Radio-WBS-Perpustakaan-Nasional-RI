import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import DaftarNarasumberField from '../../components/admin/DaftarNarasumberField'
import { Kosong, Pemuatan } from '../../components/common/StateBox'
import { useNotifikasi } from '../../context/NotifikasiContext'
import { useNotifikasiGalat } from '../../hooks/useNotifikasiGalat'
import { supabase } from '../../services/supabase'
import type { AcaraMendatang, Database, Episode, Seri } from '../../types/database.types'
import { bersihkanTeks, gabungNarasumber, pecahNarasumber, slugify, videoIdDariTautan } from '../../utils/stringUtils'
import { tanggalWibHariIni } from '../../utils/timeUtils'

type StatusEpisode = Database['public']['Enums']['status_episode']

export default function AdminEpisodeFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const modeSunting = Boolean(id)

  const [seri, setSeri] = useState<Seri[]>([])
  const [acaraSelesai, setAcaraSelesai] = useState<AcaraMendatang[]>([])
  const [memuat, setMuat] = useState(true)
  const [galat, setGalat] = useState('')
  const [tidakDitemukan, setTidakDitemukan] = useState(false)

  const [seriId, setSeriId] = useState('')
  const [judul, setJudul] = useState('')
  const [tautan, setTautan] = useState('')
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10))
  const [topik, setTopik] = useState('')
  const [narasumber, setNarasumber] = useState<string[]>([''])
  const [moderator, setModerator] = useState('')
  const [menit, setMenit] = useState('60')
  const [deskripsi, setDeskripsi] = useState('')
  const [status, setStatus] = useState<StatusEpisode>('tayang')
  const [slug, setSlug] = useState('')
  const [nomorEpisode, setNomorEpisode] = useState<number | null>(null)
  const [mengirim, setMengirim] = useState(false)

  const { beriNotifikasi } = useNotifikasi()
  useNotifikasiGalat(galat)

  async function muat(): Promise<void> {
    if (!supabase) {
      setMuat(false)
      setGalat('Koneksi ke studio belum tersedia.')
      return
    }
    setGalat('')
    const dataSeri = await supabase.from('seri').select('*').order('urutan')
    if (dataSeri.error) setGalat(`Gagal memuat seri: ${dataSeri.error.message}`)
    setSeri((dataSeri.data as Seri[] | null) ?? [])

    if (modeSunting && id) {
      const dataEpisode = await supabase.from('episode').select('*').eq('id', id).maybeSingle()
      if (dataEpisode.error) {
        setGalat(`Gagal memuat episode: ${dataEpisode.error.message}`)
      } else if (!dataEpisode.data) {
        setTidakDitemukan(true)
      } else {
        const item = dataEpisode.data as Episode
        setSeriId(item.seri_id)
        setJudul(item.judul)
        setTautan(item.tautan_youtube)
        setTanggal(item.tanggal_tayang)
        setTopik(item.topik)
        setNarasumber(pecahNarasumber(item.narasumber))
        setModerator(item.moderator)
        setMenit(String(Math.round(item.durasi_detik / 60)))
        setDeskripsi(item.deskripsi ?? '')
        setStatus(item.status)
        setSlug(item.slug)
        setNomorEpisode(item.nomor_episode)
      }
    } else {
      const dataAcara = await supabase
        .from('acara_mendatang')
        .select('id, judul, tanggal, narasumber, moderator, topik, deskripsi, seri_id, jam_mulai, jam_selesai, durasi_detik')
        .lt('tanggal', tanggalWibHariIni())
        .order('tanggal', { ascending: false })
        .limit(50)
      if (dataAcara.error) setGalat(`Gagal memuat acara selesai: ${dataAcara.error.message}`)
      setAcaraSelesai((dataAcara.data as AcaraMendatang[] | null) ?? [])
      if (dataSeri.data && dataSeri.data.length > 0) setSeriId(dataSeri.data[0].id)
    }
    setMuat(false)
  }

  useEffect(() => {
    void muat()
  }, [id])

  function pilihAcara(acaraId: string): void {
    if (!acaraId) return
    const acara = acaraSelesai.find((item) => item.id === acaraId)
    if (!acara) return
    const keMenit = (jam: string): number => {
      const [jamValue, menitValue] = jam.split(':').map(Number)
      return (jamValue ?? 0) * 60 + (menitValue ?? 0)
    }
    const selisih = acara.jam_selesai ? keMenit(acara.jam_selesai) - keMenit(acara.jam_mulai) : 0
    const menitAcara = acara.durasi_detik > 0
      ? Math.round(acara.durasi_detik / 60)
      : Math.max(0, selisih < 0 ? selisih + 1440 : selisih)
    setSeriId(acara.seri_id ?? '')
    setJudul(acara.judul)
    setTanggal(acara.tanggal)
    setTopik(acara.topik)
    setNarasumber(pecahNarasumber(acara.narasumber))
    setModerator(acara.moderator)
    setMenit(String(menitAcara))
    setDeskripsi(acara.deskripsi ?? '')
    setTautan('')
    setGalat('')
    beriNotifikasi('info', 'Data acara sudah diisi. Tambahkan tautan YouTube lalu simpan episode.')
  }

  async function simpan(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    if (!supabase) return
    setGalat('')

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
    let slugFinal = slug
    let nomorFinal = nomorEpisode

    if (!modeSunting) {
      const { data: nomorData } = await supabase
        .from('episode')
        .select('nomor_episode')
        .eq('seri_id', seriId)
        .order('nomor_episode', { ascending: false })
        .limit(1)
      const nomorTerakhir = (nomorData?.[0]?.nomor_episode as number | null) ?? 0
      nomorFinal = seriDipilih.jenis === 'keranjang' ? null : nomorTerakhir + 1
      slugFinal = `${slugify(judulBersih) || 'episode'}-${videoId.slice(-4)}`
    }

    const payload = {
      seri_id: seriId,
      judul: judulBersih,
      slug: slugFinal,
      nomor_episode: nomorFinal,
      tanggal_tayang: tanggal,
      durasi_detik: Math.max(0, Number(menit) || 0) * 60,
      narasumber: gabungNarasumber(narasumber),
      moderator: bersihkanTeks(moderator, 150) || '-',
      topik: bersihkanTeks(topik, 150) || 'Siaran WBS',
      tautan_youtube: `https://www.youtube.com/watch?v=${videoId}`,
      video_id: videoId,
      deskripsi: bersihkanTeks(deskripsi, 2000) || null,
      status,
    }

    const hasil = modeSunting && id
      ? await supabase.from('episode').update(payload).eq('id', id)
      : await supabase.from('episode').insert(payload)

    setMengirim(false)
    if (hasil.error) {
      setGalat(`Gagal menyimpan episode: ${hasil.error.message}`)
      return
    }

    beriNotifikasi(
      'sukses',
      modeSunting
        ? 'Perubahan episode tersimpan.'
        : `Episode tersimpan dengan nomor ${nomorFinal ?? 'tanpa nomor'}.`
    )
    navigate('/admin/episode')
  }

  return (
    <div>
      <Link
        to="/admin/episode"
        className="inline-flex items-center gap-2 text-sm font-semibold text-perpusnas-blue hover:underline"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Kembali ke daftar episode
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-perpusnas-blue">
        {modeSunting ? 'Sunting Episode' : 'Tambah Episode'}
      </h1>
      <p className="mt-2 text-sm text-perpusnas-gray-600">
        {modeSunting
          ? 'Ubah judul, narasumber, moderator, tautan, dan status episode. Nomor episode tidak berubah.'
          : 'Tambah rekaman YouTube resmi WBS. Nomor episode dihitung otomatis untuk seri bernomor.'}
      </p>

      {memuat && <div className="mt-6"><Pemuatan pesan="Memuat data episode..." /></div>}
      {!memuat && tidakDitemukan && (
        <div className="mt-6">
          <Kosong judul="Episode tidak ditemukan" pesan="Data mungkin sudah dihapus. Kembali ke daftar episode." />
        </div>
      )}

      {!memuat && !tidakDitemukan && (
        <section className="mt-6 rounded-2xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm">
          <form onSubmit={(e) => void simpan(e)} className="grid gap-4 md:grid-cols-2">
            {!modeSunting && acaraSelesai.length > 0 && (
              <div className="md:col-span-2 rounded-xl border border-perpusnas-gold/40 bg-perpusnas-gold-light p-4">
                <label htmlFor="ep-acara" className="block text-sm font-semibold text-perpusnas-blue-dark">
                  Ambil dari acara yang sudah selesai
                </label>
                <select
                  id="ep-acara"
                  defaultValue=""
                  onChange={(e) => pilihAcara(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 bg-white px-3 py-2.5 text-sm"
                >
                  <option value="">Isi manual</option>
                  {acaraSelesai.map((acara) => (
                    <option key={acara.id} value={acara.id}>
                      {acara.tanggal} - {acara.judul}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-perpusnas-gray-600">
                  Data acara terisi otomatis. Anda hanya perlu menambahkan tautan YouTube.
                </p>
              </div>
            )}
            <div>
              <label htmlFor="ep-seri" className="block text-sm font-semibold text-perpusnas-gray-900">Seri</label>
              <select
                id="ep-seri"
                value={seriId}
                disabled={modeSunting}
                onChange={(e) => setSeriId(e.target.value)}
                className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 bg-white px-3 py-2.5 text-sm disabled:bg-perpusnas-gray-100"
              >
                <option value="">Pilih seri</option>
                {seri.map((item) => (
                  <option key={item.id} value={item.id}>{item.nama}</option>
                ))}
              </select>
              {modeSunting && (
                <p className="mt-1 text-xs text-perpusnas-gray-600">Seri tidak diubah saat menyunting.</p>
              )}
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
            <div className="md:col-span-2">
              <DaftarNarasumberField idPrefix="ep-narasumber" nilai={narasumber} onChange={setNarasumber} />
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
            <div className="md:col-span-2 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={mengirim}
                className="rounded-full bg-perpusnas-blue px-6 py-3 text-sm font-bold text-white hover:bg-perpusnas-blue-dark disabled:opacity-60"
              >
                {mengirim ? 'Menyimpan...' : modeSunting ? 'Simpan Perubahan' : 'Simpan Episode'}
              </button>
              <Link
                to="/admin/episode"
                className="rounded-full border border-perpusnas-blue/20 px-6 py-3 text-sm font-bold text-perpusnas-blue"
              >
                Batal
              </Link>
            </div>
          </form>
        </section>
      )}
    </div>
  )
}
