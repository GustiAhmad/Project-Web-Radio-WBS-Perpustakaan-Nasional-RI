import { useEffect, useState, type FormEvent } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { Kosong, Pemuatan } from '../../components/common/StateBox'
import UnggahGambarField from '../../components/admin/UnggahGambarField'
import { PESAN_GAMBAR_TIDAK_VALID, terimaBerkas, unggahGambar } from '../../services/aset'
import { supabase } from '../../services/supabase'
import type { Penyiar } from '../../types/database.types'
import { slugify } from '../../utils/stringUtils'

import { useNotifikasiGalat } from '../../hooks/useNotifikasiGalat'

export default function AdminPenyiarPage() {
  const [penyiar, setPenyiar] = useState<Penyiar[]>([])
  const [memuat, setMuat] = useState(true)
  const [galat, setGalat] = useState('')
  useNotifikasiGalat(galat)
  const [pesan, setPesan] = useState('')
  const [menampilkanForm, setMenampilkanForm] = useState(false)
  const [suntingId, setSuntingId] = useState<string | null>(null)
  const [nama, setNama] = useState('')
  const [bio, setBio] = useState('')
  const [urutan, setUrutan] = useState(0)
  const [aktif, setAktif] = useState(true)
  const [foto, setFoto] = useState<File | null>(null)
  const [fotoUrl, setFotoUrl] = useState<string | null>(null)

  async function muat(): Promise<void> {
    if (!supabase) {
      setMuat(false)
      setGalat('Koneksi ke studio belum tersedia.')
      return
    }
    const { data, error } = await supabase
      .from('penyiar')
      .select('id, nama, slug, foto_url, bio, urutan, aktif')
      .order('urutan', { ascending: true })
      .order('nama', { ascending: true })
    if (error) setGalat(`Gagal memuat penyiar: ${error.message}`)
    setPenyiar((data as Penyiar[] | null) ?? [])
    setMuat(false)
  }

  useEffect(() => {
    void muat()
  }, [])

  function isiForm(item?: Penyiar): void {
    setGalat('')
    setPesan('')
    setMenampilkanForm(true)
    setSuntingId(item?.id ?? null)
    setNama(item?.nama ?? '')
    setBio(item?.bio ?? '')
    setUrutan(item?.urutan ?? 0)
    setAktif(item?.aktif ?? true)
    setFoto(null)
    setFotoUrl(item?.foto_url ?? null)
  }

  async function simpan(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    if (!supabase) return
    setGalat('')
    setPesan('')

    const namaBersih = nama.trim()
    const slug = slugify(namaBersih)
    if (!namaBersih || !slug) {
      setGalat('Nama penyiar wajib diisi.')
      return
    }
    if (foto && !terimaBerkas(foto)) {
      setGalat(PESAN_GAMBAR_TIDAK_VALID)
      return
    }

    const isi = {
      nama: namaBersih,
      slug,
      bio: bio.trim() || null,
      urutan,
      aktif,
    }

    let idPenyiar = suntingId
    if (suntingId) {
      const { error } = await supabase.from('penyiar').update(isi).eq('id', suntingId)
      if (error) {
        setGalat(`Gagal menyimpan penyiar: ${error.message}`)
        return
      }
    } else {
      const { data, error } = await supabase.from('penyiar').insert(isi).select('id').single()
      if (error) {
        setGalat(`Gagal menambah penyiar: ${error.message}`)
        return
      }
      idPenyiar = data.id
    }

    let urlFoto = fotoUrl
    if (foto && idPenyiar) {
      try {
        urlFoto = await unggahGambar('penyiar', idPenyiar, foto)
      } catch (galatUnggah) {
        setGalat(galatUnggah instanceof Error ? galatUnggah.message : 'Foto penyiar gagal diunggah.')
        return
      }
    }
    const { error: galatFoto } = await supabase
      .from('penyiar')
      .update({ foto_url: urlFoto })
      .eq('id', idPenyiar ?? '')
    if (galatFoto) {
      setGalat(`Foto penyiar gagal disimpan: ${galatFoto.message}`)
      return
    }

    setPesan(suntingId ? 'Profil penyiar diperbarui.' : 'Penyiar ditambahkan.')
    setMenampilkanForm(false)
    setSuntingId(null)
    setFoto(null)
    setFotoUrl(null)
    await muat()
  }

  async function hapus(item: Penyiar): Promise<void> {
    if (!supabase || !window.confirm(`Hapus profil ${item.nama}?`)) return
    setGalat('')
    const { error } = await supabase.from('penyiar').delete().eq('id', item.id)
    if (error) setGalat(`Gagal menghapus penyiar: ${error.message}`)
    else setPesan('Profil penyiar dihapus.')
    await muat()
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-perpusnas-blue">Kelola Penyiar</h1>
          <p className="mt-2 text-sm text-perpusnas-gray-600">
            Tambah foto dan bio On-Air Personalities. Penyiar aktif tampil di halaman beranda.
          </p>
        </div>
        <button
          type="button"
          onClick={() => isiForm()}
          className="inline-flex items-center gap-2 rounded-full bg-perpusnas-blue px-5 py-2.5 text-sm font-bold text-white"
        >
          <Plus size={16} aria-hidden="true" />
          Tambah Penyiar
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
          <h2 className="text-lg font-bold text-perpusnas-blue">{suntingId ? 'Sunting Penyiar' : 'Penyiar Baru'}</h2>
          <form onSubmit={(e) => void simpan(e)} className="mt-4 space-y-4">
            <div>
              <label htmlFor="pen-nama" className="block text-sm font-semibold text-perpusnas-gray-900">Nama penyiar</label>
              <input
                id="pen-nama"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
              />
            </div>
            <div>
              <label htmlFor="pen-bio" className="block text-sm font-semibold text-perpusnas-gray-900">Bio singkat (opsional)</label>
              <textarea
                id="pen-bio"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-2 w-full resize-y rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
              />
            </div>
            <UnggahGambarField
              id="pen-foto"
              label="Foto penyiar"
              nilai={fotoUrl}
              berkas={foto}
              padaPilih={setFoto}
              padaHapus={() => setFotoUrl(null)}
              placeholder={`${import.meta.env.BASE_URL}placeholder-penyiar.svg`}
              bantuan="Gunakan foto potret. Placeholder dipakai sampai foto diunggah."
            />
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <label htmlFor="pen-urutan" className="block text-sm font-semibold text-perpusnas-gray-900">Urutan</label>
                <input
                  id="pen-urutan"
                  type="number"
                  value={urutan}
                  onChange={(e) => setUrutan(Number(e.target.value))}
                  className="mt-2 w-28 rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
                />
              </div>
              <label className="flex items-center gap-2 pb-2.5 text-sm text-perpusnas-gray-900">
                <input type="checkbox" checked={aktif} onChange={(e) => setAktif(e.target.checked)} />
                Tampilkan di beranda
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="submit" className="rounded-full bg-perpusnas-blue px-6 py-3 text-sm font-bold text-white">Simpan</button>
              <button type="button" onClick={() => setMenampilkanForm(false)} className="rounded-full border border-perpusnas-blue/20 px-5 py-3 text-sm font-semibold text-perpusnas-blue">Batal</button>
            </div>
          </form>
        </section>
      )}

      <div className="mt-6">
        {memuat ? (
          <Pemuatan pesan="Memuat daftar penyiar..." />
        ) : penyiar.length === 0 ? (
          <Kosong judul="Belum ada penyiar" pesan="Tambahkan profil penyiar melalui tombol di atas." />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {penyiar.map((item) => (
              <article key={item.id} className="flex flex-col rounded-xl border border-perpusnas-blue/10 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <img
                    src={item.foto_url ?? `${import.meta.env.BASE_URL}placeholder-penyiar.svg`}
                    alt={item.foto_url ? `Foto ${item.nama}` : 'Foto penyiar belum tersedia'}
                    width={56}
                    height={56}
                    className="h-14 w-14 shrink-0 rounded-full bg-perpusnas-blue-light object-contain"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="font-bold text-perpusnas-blue">{item.nama}</h2>
                    <p className="text-[11px] text-perpusnas-gray-600">
                      Urutan {item.urutan} · {item.aktif ? 'Aktif' : 'Disembunyikan'}
                    </p>
                  </div>
                </div>
                {item.bio && <p className="mt-3 line-clamp-3 text-sm text-perpusnas-gray-600">{item.bio}</p>}
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={() => isiForm(item)} aria-label={`Sunting ${item.nama}`} className="rounded-lg bg-perpusnas-blue-light p-2 text-perpusnas-blue">
                    <Pencil size={15} aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => void hapus(item)} aria-label={`Hapus ${item.nama}`} className="rounded-lg bg-red-50 p-2 text-red-800">
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
