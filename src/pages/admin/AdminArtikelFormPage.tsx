import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import EditorArtikel from '../../components/artikel/EditorArtikel'
import UnggahGambarField from '../../components/admin/UnggahGambarField'
import { Kosong, Pemuatan } from '../../components/common/StateBox'
import { useAuth } from '../../context/AuthContext'
import { useNotifikasi } from '../../context/NotifikasiContext'
import { useNotifikasiGalat } from '../../hooks/useNotifikasiGalat'
import { ambilArtikelAdminById, simpanArtikel, slugDariJudul } from '../../services/artikel'
import type { KategoriArtikel, StatusPublikasi } from '../../types/database.types'
import { KATEGORI_ARTIKEL, namaKategoriArtikel } from '../../utils/formatArtikel'

export default function AdminArtikelFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const modeSunting = Boolean(id)
  const { profil } = useAuth()
  const { beriNotifikasi } = useNotifikasi()

  const [judul, setJudul] = useState('')
  const [slug, setSlug] = useState('')
  const [slugDisentuh, setSlugDisentuh] = useState(false)
  const [kategori, setKategori] = useState<KategoriArtikel>('berita')
  const [ringkasan, setRingkasan] = useState('')
  const [isi, setIsi] = useState('')
  const [penulis, setPenulis] = useState('')
  const [gambar, setGambar] = useState<File | null>(null)
  const [gambarPath, setGambarPath] = useState<string | null>(null)
  const [gambarUrl, setGambarUrl] = useState<string | null>(null)
  const [hapusGambarLama, setHapusGambarLama] = useState(false)
  const [teksAlternatif, setTeksAlternatif] = useState('')
  const [status, setStatus] = useState<StatusPublikasi>('draf')
  const [memuat, setMuat] = useState(modeSunting)
  const [tidakDitemukan, setTidakDitemukan] = useState(false)
  const [galat, setGalat] = useState('')
  const [mengirim, setMengirim] = useState(false)
  const penulisDiisi = useRef(false)
  useNotifikasiGalat(galat)

  useEffect(() => {
    if (!id) {
      setMuat(false)
      return
    }
    let masihAktif = true
    void ambilArtikelAdminById(id).then(({ artikel, galat: pesan }) => {
      if (!masihAktif) return
      if (!artikel) {
        setTidakDitemukan(true)
      } else {
        setJudul(artikel.judul)
        setSlug(artikel.slug)
        setSlugDisentuh(true)
        setKategori(artikel.kategori)
        setRingkasan(artikel.ringkasan)
        setIsi(artikel.isi)
        setPenulis(artikel.penulis)
        setGambarPath(artikel.gambar_path)
        setGambarUrl(artikel.gambar_url)
        setTeksAlternatif(artikel.teks_alternatif ?? '')
        setStatus(artikel.status)
        penulisDiisi.current = true
      }
      setGalat(pesan ?? '')
      setMuat(false)
    })
    return () => {
      masihAktif = false
    }
  }, [id])

  useEffect(() => {
    if (modeSunting || penulisDiisi.current || !profil?.nama_lengkap) return
    penulisDiisi.current = true
    setPenulis(profil.nama_lengkap)
  }, [modeSunting, profil?.nama_lengkap])

  function ubahJudul(nilai: string): void {
    setJudul(nilai)
    if (!slugDisentuh) setSlug(slugDariJudul(nilai))
  }

  async function simpan(statusTarget: StatusPublikasi, kePratinjau: boolean): Promise<void> {
    if (mengirim) return
    setGalat('')
    setMengirim(true)

    const hasil = await simpanArtikel({
      id: id ?? null,
      judul,
      slug,
      kategori,
      ringkasan,
      isi,
      gambar,
      gambar_path: gambarPath,
      gambar_url: gambarUrl,
      hapusGambarLama,
      teks_alternatif: teksAlternatif,
      status: statusTarget,
      penulis,
      dibuat_oleh: profil?.nama_lengkap ?? null,
      diubah_oleh: profil?.nama_lengkap ?? null,
    })

    setMengirim(false)
    if (hasil.galat) {
      setGalat(hasil.galat)
      return
    }

    beriNotifikasi(
      'sukses',
      kePratinjau
        ? 'Perubahan tersimpan. Pratinjau siap ditinjau.'
        : statusTarget === 'terbit'
          ? 'Artikel tersimpan dan sudah terbit.'
          : 'Draf tersimpan. Artikel belum tampil di situs publik.'
    )

    if (kePratinjau) {
      navigate(`/admin/artikel/pratinjau/${hasil.id}`)
    } else {
      navigate('/admin/artikel')
    }
  }

  if (memuat) {
    return <Pemuatan pesan="Memuat artikel..." />
  }

  if (tidakDitemukan) {
    return (
      <div>
        <Kosong judul="Artikel tidak ditemukan" pesan="Data mungkin sudah dihapus. Kembali ke daftar artikel." />
        <div className="mt-6 text-center">
          <Link to="/admin/artikel" className="text-sm font-semibold text-perpusnas-blue hover:underline">
            Kembali ke daftar artikel
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Link
        to="/admin/artikel"
        className="inline-flex items-center gap-2 text-sm font-semibold text-perpusnas-blue hover:underline"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Kembali ke daftar artikel
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-perpusnas-blue">
        {modeSunting ? 'Sunting Artikel' : 'Tambah Artikel'}
      </h1>
      <p className="mt-2 text-sm text-perpusnas-gray-600">
        Isi judul, ringkasan, dan isi tulisan. Simpan sebagai draf untuk meninjau pratinjau sebelum diterbitkan.
      </p>

      <form
        className="mt-6 space-y-6"
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          void simpan('draf', false)
        }}
      >
        <section className="grid gap-4 rounded-2xl border border-perpusnas-blue/10 bg-white p-5 shadow-sm sm:p-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="ar-judul" className="block text-sm font-semibold text-perpusnas-gray-900">Judul</label>
            <input
              id="ar-judul"
              required
              value={judul}
              onChange={(e) => ubahJudul(e.target.value)}
              placeholder="Judul berita atau artikel"
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="ar-slug" className="block text-sm font-semibold text-perpusnas-gray-900">Slug</label>
            <input
              id="ar-slug"
              required
              value={slug}
              onChange={(e) => {
                setSlugDisentuh(true)
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))
              }}
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
            />
            <p className="mt-1 text-xs text-perpusnas-gray-600">Otomatis dari judul. Boleh disunting.</p>
          </div>
          <div>
            <label htmlFor="ar-kategori" className="block text-sm font-semibold text-perpusnas-gray-900">Kategori</label>
            <select
              id="ar-kategori"
              value={kategori}
              onChange={(e) => setKategori(e.target.value as KategoriArtikel)}
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 bg-white px-3 py-2.5 text-sm"
            >
              {KATEGORI_ARTIKEL.map((item) => (
                <option key={item} value={item}>{namaKategoriArtikel(item)}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="ar-ringkasan" className="block text-sm font-semibold text-perpusnas-gray-900">
              Ringkasan
            </label>
            <textarea
              id="ar-ringkasan"
              required
              rows={3}
              maxLength={300}
              value={ringkasan}
              onChange={(e) => setRingkasan(e.target.value)}
              placeholder="Ringkasan singkat yang tampil di kartu artikel"
              className="mt-2 w-full resize-y rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
            />
            <p className="mt-1 text-xs text-perpusnas-gray-600">{ringkasan.length}/300 karakter · minimal 20 karakter.</p>
          </div>
          <div>
            <label htmlFor="ar-penulis" className="block text-sm font-semibold text-perpusnas-gray-900">Penulis</label>
            <input
              id="ar-penulis"
              required
              value={penulis}
              onChange={(e) => setPenulis(e.target.value)}
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="ar-status" className="block text-sm font-semibold text-perpusnas-gray-900">Status saat ini</label>
            <select
              id="ar-status"
              value={status}
              disabled
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 bg-perpusnas-gray-100 px-3 py-2.5 text-sm"
            >
              <option value="draf">Draf</option>
              <option value="terbit">Terbit</option>
            </select>
            <p className="mt-1 text-xs text-perpusnas-gray-600">Gunakan tombol di bawah untuk mengubah status.</p>
          </div>
          <div className="md:col-span-2">
            <UnggahGambarField
              id="ar-gambar"
              label="Gambar sampul (opsional)"
              nilai={hapusGambarLama ? null : gambarUrl}
              berkas={gambar}
              padaPilih={(berkas) => {
                setGambar(berkas)
                if (berkas) setHapusGambarLama(false)
              }}
              padaHapus={() => setHapusGambarLama(true)}
              placeholder={`${import.meta.env.BASE_URL}placeholder-poster.svg`}
              bantuan="Sampul tampil di kartu beranda dan halaman detail artikel."
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="ar-alt" className="block text-sm font-semibold text-perpusnas-gray-900">
              Teks alternatif gambar (opsional)
            </label>
            <input
              id="ar-alt"
              value={teksAlternatif}
              onChange={(e) => setTeksAlternatif(e.target.value)}
              placeholder="Deskripsi singkat gambar untuk pembaca layar"
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-perpusnas-blue/10 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-bold text-perpusnas-gray-900">Isi Artikel</h2>
          <p className="mt-1 text-xs text-perpusnas-gray-600">
            Gunakan minimal 50 karakter. Gambar di dalam isi artikel diunggah ke folder artikel.
          </p>
          <div className="mt-4">
            <EditorArtikel
              nilaiAwal={isi}
              padaUbah={setIsi}
              padaGalat={setGalat}
            />
          </div>
        </section>

        <div className="flex flex-wrap gap-3 pb-4">
          <button
            type="submit"
            disabled={mengirim}
            className="rounded-full border border-perpusnas-blue/20 bg-white px-5 py-3 text-sm font-bold text-perpusnas-blue hover:bg-perpusnas-blue-light disabled:opacity-60"
          >
            Simpan Draf
          </button>
          <button
            type="button"
            disabled={mengirim}
            onClick={() => void simpan(status, true)}
            className="rounded-full border border-perpusnas-blue/20 bg-white px-5 py-3 text-sm font-bold text-perpusnas-blue hover:bg-perpusnas-blue-light disabled:opacity-60"
          >
            Simpan &amp; Pratinjau
          </button>
          <button
            type="button"
            disabled={mengirim}
            onClick={() => void simpan('terbit', false)}
            className="rounded-full bg-perpusnas-blue px-6 py-3 text-sm font-bold text-white hover:bg-perpusnas-blue-dark disabled:opacity-60"
          >
            {mengirim ? 'Menyimpan...' : 'Simpan & Terbitkan'}
          </button>
          <Link
            to="/admin/artikel"
            className="rounded-full px-5 py-3 text-sm font-bold text-perpusnas-gray-600 hover:text-perpusnas-blue"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  )
}
