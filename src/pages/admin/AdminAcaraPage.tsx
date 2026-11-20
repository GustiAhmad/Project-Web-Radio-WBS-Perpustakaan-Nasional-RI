import { useEffect, useState, type FormEvent } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import DaftarNarasumberField from '../../components/admin/DaftarNarasumberField'
import { Kosong, Pemuatan } from '../../components/common/StateBox'
import UnggahGambarField from '../../components/admin/UnggahGambarField'
import { PESAN_GAMBAR_TIDAK_VALID, terimaBerkas, unggahGambar } from '../../services/aset'
import { supabase } from '../../services/supabase'
import type { AcaraMendatang, Database, Seri } from '../../types/database.types'
import { labelKanal } from '../../utils/formatters'
import { gabungNarasumber, pecahNarasumber } from '../../utils/stringUtils'

type Kanal = Database['public']['Enums']['kanal_acara']
type Status = Database['public']['Enums']['status_publikasi']

const daftarKanal: Kanal[] = ['youtube', 'zoom', 'instagram', 'tatap_muka', 'lainnya']

import { useNotifikasiGalat } from '../../hooks/useNotifikasiGalat'

export default function AdminAcaraPage() {
  const [acara, setAcara] = useState<AcaraMendatang[]>([])
  const [seri, setSeri] = useState<Seri[]>([])
  const [memuat, setMuat] = useState(true)
  const [galat, setGalat] = useState('')
  useNotifikasiGalat(galat)
  const [pesan, setPesan] = useState('')
  const [menampilkanForm, setMenampilkanForm] = useState(false)
  const [suntingId, setSuntingId] = useState<string | null>(null)

  const [judul, setJudul] = useState('')
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10))
  const [jamMulai, setJamMulai] = useState('09:00')
  const [jamSelesai, setJamSelesai] = useState('10:00')
  const [kanal, setKanal] = useState<Kanal>('youtube')
  const [tautan, setTautan] = useState('')
  const [seriId, setSeriId] = useState('')
  const [moderator, setModerator] = useState('')
  const [narasumber, setNarasumber] = useState<string[]>([''])
  const [topik, setTopik] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [status, setStatus] = useState<Status>('terbit')
  const [poster, setPoster] = useState<File | null>(null)
  const [posterUrl, setPosterUrl] = useState<string | null>(null)

  async function muat(): Promise<void> {
    if (!supabase) {
      setMuat(false)
      setGalat('Koneksi ke studio belum tersedia.')
      return
    }
    const [dataAcara, dataSeri] = await Promise.all([
      supabase.from('acara_mendatang').select('*').order('tanggal', { ascending: false }),
      supabase.from('seri').select('id, nama').order('urutan', { ascending: true }),
    ])
    if (dataAcara.error) setGalat(`Gagal memuat acara: ${dataAcara.error.message}`)
    if (dataSeri.error) setGalat(`Gagal memuat seri: ${dataSeri.error.message}`)
    setAcara((dataAcara.data as AcaraMendatang[] | null) ?? [])
    setSeri((dataSeri.data as Seri[] | null) ?? [])
    setMuat(false)
  }

  useEffect(() => {
    void muat()
  }, [])

  function isiForm(item?: AcaraMendatang): void {
    setGalat('')
    setPesan('')
    setMenampilkanForm(true)
    setSuntingId(item?.id ?? null)
    setJudul(item?.judul ?? '')
    setTanggal(item?.tanggal ?? new Date().toISOString().slice(0, 10))
    setJamMulai(item?.jam_mulai.slice(0, 5) ?? '09:00')
    setJamSelesai(item?.jam_selesai?.slice(0, 5) ?? '10:00')
    setKanal(item?.kanal ?? 'youtube')
    setTautan(item?.tautan_acara ?? '')
    setSeriId(item?.seri_id ?? '')
    setModerator(item?.moderator ?? '')
    setNarasumber(pecahNarasumber(item?.narasumber))
    setTopik(item?.topik ?? '')
    setDeskripsi(item?.deskripsi ?? '')
    setStatus(item?.status ?? 'terbit')
    setPoster(null)
    setPosterUrl(item?.gambar_url ?? null)
  }

  async function simpan(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    if (!supabase) return
    setGalat('')
    if (poster && !terimaBerkas(poster)) {
      setGalat(PESAN_GAMBAR_TIDAK_VALID)
      return
    }
    const keMenit = (jam: string): number => {
      const [jamValue, menitValue] = jam.split(':').map(Number)
      return (jamValue ?? 0) * 60 + (menitValue ?? 0)
    }
    const selisih = jamSelesai ? keMenit(jamSelesai) - keMenit(jamMulai) : 0
    const durasiDetik = Math.max(0, selisih < 0 ? selisih + 1440 : selisih) * 60
    const isi = {
      judul: judul.trim(),
      tanggal,
      jam_mulai: `${jamMulai}:00`,
      jam_selesai: jamSelesai ? `${jamSelesai}:00` : null,
      kanal,
      tautan_acara: tautan.trim() || null,
      seri_id: seriId || null,
      moderator: moderator.trim() || 'Belum tercatat',
      narasumber: gabungNarasumber(narasumber),
      topik: topik.trim() || 'Siaran WBS',
      durasi_detik: durasiDetik,
      deskripsi: deskripsi.trim() || null,
      status,
    }
    let idAcara = suntingId
    if (suntingId) {
      const { error } = await supabase.from('acara_mendatang').update(isi).eq('id', suntingId)
      if (error) {
        setGalat(`Gagal menyimpan acara: ${error.message}`)
        return
      }
    } else {
      const { data, error } = await supabase.from('acara_mendatang').insert(isi).select('id').single()
      if (error) {
        setGalat(`Gagal menyimpan acara: ${error.message}`)
        return
      }
      idAcara = data.id
    }

    let urlPoster = posterUrl
    if (poster && idAcara) {
      try {
        urlPoster = await unggahGambar('poster-acara', idAcara, poster)
      } catch (galatUnggah) {
        setGalat(galatUnggah instanceof Error ? galatUnggah.message : 'Poster gagal diunggah.')
        return
      }
    }
    const { error: galatPoster } = await supabase
      .from('acara_mendatang')
      .update({ gambar_url: urlPoster })
      .eq('id', idAcara ?? '')
    if (galatPoster) {
      setGalat(`Poster gagal disimpan: ${galatPoster.message}`)
      return
    }

    setPesan(suntingId ? 'Acara diperbarui.' : 'Acara ditambahkan.')
    setMenampilkanForm(false)
    setSuntingId(null)
    setPoster(null)
    setPosterUrl(null)
    await muat()
  }

  async function hapus(id: string): Promise<void> {
    if (!supabase) return
    setGalat('')
    const { error } = await supabase.from('acara_mendatang').delete().eq('id', id)
    if (error) setGalat(`Gagal menghapus acara: ${error.message}`)
    else setPesan('Acara dihapus.')
    await muat()
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-perpusnas-blue">Acara Mendatang</h1>
          <p className="mt-2 text-sm text-perpusnas-gray-600">
            Kelola pengumuman talkshow dan webinar. Acara berstatus terbit tampil di halaman publik.
          </p>
        </div>
        <button
          type="button"
          onClick={() => isiForm()}
          className="inline-flex items-center gap-2 rounded-full bg-perpusnas-blue px-5 py-2.5 text-sm font-bold text-white"
        >
          <Plus size={16} aria-hidden="true" />
          Tambah Acara
        </button>
      </div>

      {galat && (
        <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{galat}</p>
      )}
      {pesan && (
        <p role="status" className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{pesan}</p>
      )}

      {menampilkanForm && (
        <section className="mt-6 rounded-2xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-perpusnas-blue">{suntingId ? 'Sunting Acara' : 'Acara Baru'}</h2>
          <form onSubmit={(e) => void simpan(e)} className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label htmlFor="ac-judul" className="block text-sm font-semibold text-perpusnas-gray-900">Judul acara</label>
              <input id="ac-judul" required value={judul} onChange={(e) => setJudul(e.target.value)} className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label htmlFor="ac-tanggal" className="block text-sm font-semibold text-perpusnas-gray-900">Tanggal</label>
              <input id="ac-tanggal" type="date" required value={tanggal} onChange={(e) => setTanggal(e.target.value)} className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label htmlFor="ac-kanal" className="block text-sm font-semibold text-perpusnas-gray-900">Kanal</label>
              <select id="ac-kanal" value={kanal} onChange={(e) => setKanal(e.target.value as Kanal)} className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 bg-white px-3 py-2.5 text-sm">
                {daftarKanal.map((nilai) => <option key={nilai} value={nilai}>{labelKanal(nilai)}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="ac-mulai" className="block text-sm font-semibold text-perpusnas-gray-900">Jam mulai</label>
              <input id="ac-mulai" type="time" required value={jamMulai} onChange={(e) => setJamMulai(e.target.value)} className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label htmlFor="ac-selesai" className="block text-sm font-semibold text-perpusnas-gray-900">Jam selesai</label>
              <input id="ac-selesai" type="time" value={jamSelesai} onChange={(e) => setJamSelesai(e.target.value)} className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ac-tautan" className="block text-sm font-semibold text-perpusnas-gray-900">Tautan acara (opsional)</label>
              <input id="ac-tautan" value={tautan} onChange={(e) => setTautan(e.target.value)} className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label htmlFor="ac-seri" className="block text-sm font-semibold text-perpusnas-gray-900">Seri program</label>
              <select id="ac-seri" value={seriId} onChange={(e) => setSeriId(e.target.value)} className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 bg-white px-3 py-2.5 text-sm">
                <option value="">Belum ditentukan</option>
                {seri.map((item) => <option key={item.id} value={item.id}>{item.nama}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="ac-topik" className="block text-sm font-semibold text-perpusnas-gray-900">Topik</label>
              <input id="ac-topik" value={topik} onChange={(e) => setTopik(e.target.value)} className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label htmlFor="ac-moderator" className="block text-sm font-semibold text-perpusnas-gray-900">Moderator</label>
              <input id="ac-moderator" value={moderator} onChange={(e) => setModerator(e.target.value)} className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <DaftarNarasumberField idPrefix="ac-narasumber" nilai={narasumber} onChange={setNarasumber} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ac-deskripsi" className="block text-sm font-semibold text-perpusnas-gray-900">Deskripsi (opsional)</label>
              <textarea id="ac-deskripsi" rows={3} value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className="mt-2 w-full resize-y rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <UnggahGambarField
                id="ac-poster"
                label="Poster acara"
                nilai={posterUrl}
                berkas={poster}
                padaPilih={setPoster}
                padaHapus={() => setPosterUrl(null)}
                placeholder={`${import.meta.env.BASE_URL}placeholder-poster.svg`}
                bantuan="Poster tampil di kartu acara dan halaman detail. Kosongkan untuk memakai placeholder."
              />
            </div>
            <div>
              <label htmlFor="ac-status" className="block text-sm font-semibold text-perpusnas-gray-900">Status</label>
              <select id="ac-status" value={status} onChange={(e) => setStatus(e.target.value as Status)} className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 bg-white px-3 py-2.5 text-sm">
                <option value="draf">Draf</option>
                <option value="terbit">Terbit</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button type="submit" className="rounded-full bg-perpusnas-blue px-6 py-3 text-sm font-bold text-white">Simpan</button>
              <button type="button" onClick={() => setMenampilkanForm(false)} className="rounded-full border border-perpusnas-blue/20 px-5 py-3 text-sm font-semibold text-perpusnas-blue">Batal</button>
            </div>
          </form>
        </section>
      )}

      <div className="mt-6">
        {memuat ? (
          <Pemuatan pesan="Memuat acara..." />
        ) : acara.length === 0 ? (
          <Kosong judul="Belum ada acara" pesan="Tambahkan acara mendatang melalui tombol di atas." />
        ) : (
          <div className="space-y-3">
            {acara.map((item) => (
              <article key={item.id} className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-perpusnas-blue/10 bg-white p-5 shadow-sm">
                <div>
                  <h2 className="font-bold text-perpusnas-blue">{item.judul}</h2>
                  <p className="mt-1 text-xs text-perpusnas-gray-600">
                    {item.tanggal} - {item.jam_mulai.slice(0, 5)} WIB - {labelKanal(item.kanal)} - {item.status === 'terbit' ? 'Terbit' : 'Draf'}
                  </p>
                  {item.deskripsi && <p className="mt-2 text-sm text-perpusnas-gray-600">{item.deskripsi}</p>}
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => isiForm(item)} aria-label={`Sunting ${item.judul}`} className="rounded-lg bg-perpusnas-blue-light p-2 text-perpusnas-blue">
                    <Pencil size={15} aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => void hapus(item.id)} aria-label={`Hapus ${item.judul}`} className="rounded-lg bg-red-50 p-2 text-red-800">
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
