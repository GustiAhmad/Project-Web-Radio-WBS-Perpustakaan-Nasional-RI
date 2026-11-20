import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react'
import { Kosong, Pemuatan } from '../../components/common/StateBox'
import { useAuth } from '../../context/AuthContext'
import { useNotifikasi } from '../../context/NotifikasiContext'
import { useNotifikasiGalat } from '../../hooks/useNotifikasiGalat'
import { ambilSemuaArtikelAdmin, hapusArtikel, ubahStatusArtikel } from '../../services/artikel'
import type { Artikel } from '../../types/database.types'
import { formatTanggalArtikel, namaKategoriArtikel } from '../../utils/formatArtikel'

type Saringan = 'semua' | 'draf' | 'terbit'

export default function AdminArtikelPage() {
  const [daftar, setDaftar] = useState<Artikel[]>([])
  const [memuat, setMuat] = useState(true)
  const [galat, setGalat] = useState('')
  const [saringan, setSaringan] = useState<Saringan>('semua')
  const [memproses, setMemproses] = useState('')
  const { profil } = useAuth()
  const { beriNotifikasi } = useNotifikasi()
  useNotifikasiGalat(galat)

  async function muatUlang(): Promise<void> {
    setGalat('')
    const hasil = await ambilSemuaArtikelAdmin()
    setDaftar(hasil.artikel)
    setGalat(hasil.galat ?? '')
    setMuat(false)
  }

  useEffect(() => {
    void muatUlang()
  }, [])

  async function ubahStatus(artikel: Artikel): Promise<void> {
    const statusBaru = artikel.status === 'terbit' ? 'draf' : 'terbit'
    setMemproses(artikel.id)
    setGalat('')
    const pesan = await ubahStatusArtikel(artikel, statusBaru, profil?.nama_lengkap ?? null)
    setMemproses('')
    if (pesan) {
      setGalat(pesan)
      return
    }
    beriNotifikasi('sukses', statusBaru === 'terbit' ? 'Artikel sudah terbit.' : 'Artikel ditarik menjadi draf.')
    await muatUlang()
  }

  async function hapus(artikel: Artikel): Promise<void> {
    if (!window.confirm(`Hapus artikel "${artikel.judul}"? Tindakan ini tidak dapat diurungkan.`)) return
    setMemproses(artikel.id)
    setGalat('')
    const pesan = await hapusArtikel(artikel)
    setMemproses('')
    if (pesan) {
      setGalat(pesan)
      return
    }
    beriNotifikasi('sukses', 'Artikel dihapus.')
    await muatUlang()
  }

  const tampil = saringan === 'semua' ? daftar : daftar.filter((item) => item.status === saringan)

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-perpusnas-blue">Artikel &amp; Berita</h1>
          <p className="mt-2 text-sm text-perpusnas-gray-600">
            Kelola berita, artikel, dan pengumuman resmi WBS. Perubahan draf tidak tampil di situs publik.
          </p>
        </div>
        <Link
          to="/admin/artikel/baru"
          className="inline-flex items-center gap-2 rounded-full bg-perpusnas-blue px-5 py-2.5 text-sm font-bold text-white hover:bg-perpusnas-blue-dark"
        >
          <Plus size={16} aria-hidden="true" />
          Tambah Artikel
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-2" aria-label="Saringan status artikel">
        {(['semua', 'draf', 'terbit'] as Saringan[]).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={saringan === item}
            onClick={() => setSaringan(item)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold capitalize transition ${
              saringan === item
                ? 'border-perpusnas-blue bg-perpusnas-blue text-white'
                : 'border-perpusnas-blue/20 bg-white text-perpusnas-blue hover:bg-perpusnas-blue-light'
            }`}
          >
            {item} {item !== 'semua' && `(${daftar.filter((art) => art.status === item).length})`}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {memuat ? (
          <Pemuatan pesan="Memuat daftar artikel..." />
        ) : tampil.length === 0 ? (
          <Kosong
            judul="Belum ada artikel"
            pesan="Tambahkan artikel pertama untuk mulai mengisi halaman Berita & Artikel."
          />
        ) : (
          <div className="space-y-3">
            {tampil.map((artikel) => (
              <article
                key={artikel.id}
                className="rounded-xl border border-perpusnas-blue/10 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex flex-wrap items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
                      <span className="rounded-full bg-perpusnas-blue-light px-2.5 py-1 text-perpusnas-blue">
                        {namaKategoriArtikel(artikel.kategori)}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 ${
                          artikel.status === 'terbit'
                            ? 'bg-emerald-50 text-emerald-800'
                            : 'bg-amber-50 text-amber-800'
                        }`}
                      >
                        {artikel.status === 'terbit' ? 'Terbit' : 'Draf'}
                      </span>
                      <span className="text-perpusnas-gray-600">
                        {formatTanggalArtikel(artikel.diterbitkan_pada ?? artikel.dibuat_pada)}
                      </span>
                    </div>
                    <h2 className="mt-2 text-sm font-bold leading-snug text-perpusnas-gray-900 sm:text-base">
                      {artikel.judul}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-xs text-perpusnas-gray-600">{artikel.ringkasan}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to={`/admin/artikel/pratinjau/${artikel.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-perpusnas-blue/20 px-3 py-2 text-xs font-semibold text-perpusnas-blue hover:bg-perpusnas-blue-light"
                    >
                      <Eye size={14} aria-hidden="true" />
                      Pratinjau
                    </Link>
                    <Link
                      to={`/admin/artikel/${artikel.id}/edit`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-perpusnas-blue/20 px-3 py-2 text-xs font-semibold text-perpusnas-blue hover:bg-perpusnas-blue-light"
                    >
                      <Pencil size={14} aria-hidden="true" />
                      Sunting
                    </Link>
                    <button
                      type="button"
                      disabled={memproses === artikel.id}
                      onClick={() => void ubahStatus(artikel)}
                      className="rounded-lg bg-perpusnas-blue px-3 py-2 text-xs font-semibold text-white hover:bg-perpusnas-blue-dark disabled:opacity-50"
                    >
                      {artikel.status === 'terbit' ? 'Tarik ke Draf' : 'Terbitkan'}
                    </button>
                    <button
                      type="button"
                      disabled={memproses === artikel.id}
                      onClick={() => void hapus(artikel)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-800 hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 size={14} aria-hidden="true" />
                      Hapus
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
