import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { Kosong, PenandaKosong, Pemuatan } from '../../components/common/StateBox'
import FormulirSeri from '../../components/admin/FormulirSeri'
import { useAuth } from '../../context/AuthContext'
import { useNotifikasi } from '../../context/NotifikasiContext'
import { useNotifikasiGalat } from '../../hooks/useNotifikasiGalat'
import { supabase } from '../../services/supabase'
import { labelKategori, simpanSeri, validasiDraftSeri, type DraftSeri } from '../../services/seri'
import type { Seri } from '../../types/database.types'
import { adaIsi } from '../../utils/stringUtils'

export default function AdminSeriPage() {
  const { peran } = useAuth()
  const { beriNotifikasi } = useNotifikasi()
  const [seri, setSeri] = useState<Seri[]>([])
  const [memuat, setMuat] = useState(true)
  const [idSunting, setIdSunting] = useState<string | null>(null)
  const [draft, setDraft] = useState<DraftSeri | null>(null)
  const [galat, setGalat] = useState('')
  const [sedangMenyimpan, setSedangMenyimpan] = useState(false)
  const [sedangMenghapus, setSedangMenghapus] = useState<string | null>(null)
  useNotifikasiGalat(galat)

  const superadmin = peran === 'superadmin'
  const penampung = seri.find((item) => item.jenis === 'keranjang') ?? seri.find((item) => item.slug === 'lainnya')

  async function muat(): Promise<void> {
    if (!supabase) {
      setMuat(false)
      setGalat('Koneksi ke studio belum tersedia.')
      return
    }
    const { data, error } = await supabase.from('seri').select('*').order('urutan')
    if (error) setGalat(`Gagal memuat seri: ${error.message}`)
    setSeri((data as Seri[] | null) ?? [])
    setMuat(false)
  }

  useEffect(() => {
    void muat()
  }, [])

  function mulaiSunting(item: Seri): void {
    setGalat('')
    setIdSunting(item.id)
    setDraft({
      nama: item.nama,
      deskripsi: item.deskripsi,
      kategori: item.kategori,
      urutan: item.urutan,
      unggulan: item.unggulan,
      gambarUrl: item.gambar_url,
      gambar: null,
      teksAlternatif: item.teks_alternatif ?? '',
    })
  }

  function batalkan(): void {
    setIdSunting(null)
    setDraft(null)
  }

  async function simpan(): Promise<void> {
    if (!draft || !idSunting) return
    const pesanGalat = validasiDraftSeri(draft, seri, idSunting)
    if (pesanGalat) {
      setGalat(pesanGalat)
      return
    }
    setGalat('')
    setSedangMenyimpan(true)
    try {
      await simpanSeri(draft, seri, idSunting)
      batalkan()
      beriNotifikasi('sukses', 'Seri tersimpan.')
      await muat()
    } catch (galatSimpan) {
      setGalat(galatSimpan instanceof Error ? galatSimpan.message : 'Seri gagal disimpan.')
    } finally {
      setSedangMenyimpan(false)
    }
  }

  async function hapusSeri(item: Seri): Promise<void> {
    if (!supabase || !superadmin) return
    if (item.jenis === 'keranjang' || item.slug === 'lainnya') {
      setGalat('Seri Lainnya tidak dapat dihapus karena menjadi penampung video.')
      return
    }
    if (!penampung) {
      setGalat('Seri Lainnya belum tersedia. Jalankan migrasi Tahap 2 terlebih dahulu.')
      return
    }
    const setuju = window.confirm(
      `Hapus seri "${item.nama}"? Video di dalamnya akan dipindahkan ke seri Lainnya.`
    )
    if (!setuju) return

    setGalat('')
    setSedangMenghapus(item.id)
    try {
      const { count, error: galatHitung } = await supabase
        .from('episode')
        .select('id', { count: 'exact', head: true })
        .eq('seri_id', item.id)
      if (galatHitung) {
        setGalat(`Gagal menghitung video dalam seri: ${galatHitung.message}`)
        return
      }
      const jumlah = count ?? 0

      const { error: galatPindah } = await supabase
        .from('episode')
        .update({ seri_id: penampung.id, nomor_episode: null })
        .eq('seri_id', item.id)
      if (galatPindah) {
        setGalat(`Gagal memindahkan video ke Lainnya: ${galatPindah.message}`)
        return
      }

      const { error: galatHapus } = await supabase.from('seri').delete().eq('id', item.id)
      if (galatHapus) {
        setGalat(`Gagal menghapus seri: ${galatHapus.message}`)
        return
      }

      beriNotifikasi(
        'sukses',
        jumlah > 0
          ? `Seri "${item.nama}" dihapus. ${jumlah} video dipindahkan ke Lainnya.`
          : `Seri "${item.nama}" dihapus. Tidak ada video yang perlu dipindahkan.`
      )
      await muat()
    } finally {
      setSedangMenghapus(null)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-perpusnas-blue">Kelola Seri</h1>
          <p className="mt-2 text-sm text-perpusnas-gray-600">
            Daftar seri menjadi halaman awal. Sunting nama, kategori, urutan, dan unggulan langsung pada kartu seri.
          </p>
        </div>
        {superadmin && (
          <Link
            to="/admin/seri/baru"
            className="inline-flex items-center gap-2 rounded-full bg-perpusnas-blue px-5 py-2.5 text-sm font-bold text-white hover:bg-perpusnas-blue-dark"
          >
            <Plus size={16} aria-hidden="true" />
            Tambah Seri
          </Link>
        )}
      </div>

      {!superadmin && (
        <p className="mt-4 rounded-lg border border-perpusnas-blue/10 bg-perpusnas-blue-light px-4 py-3 text-sm text-perpusnas-blue">
          Akun Admin dapat menyunting seri. Penambahan dan penghapusan seri memerlukan akun Superadmin.
        </p>
      )}

      <div className="mt-6">
        {memuat ? (
          <Pemuatan pesan="Memuat seri..." />
        ) : seri.length === 0 ? (
          <Kosong judul="Seri belum tersedia" pesan="Jalankan migrasi Tahap 2 untuk mengisi katalog seri." />
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {seri.map((item) => {
              const aktif = idSunting === item.id && draft
              return (
                <article key={item.id} className="rounded-xl border border-perpusnas-blue/10 bg-white p-5 shadow-sm">
                  {aktif ? (
                    <>
                      <h2 className="mb-4 font-bold text-perpusnas-blue">Sunting: {item.nama}</h2>
                      <FormulirSeri
                        draft={draft}
                        padaUbah={(perubahan) => setDraft({ ...draft, ...perubahan })}
                        padaSimpan={() => void simpan()}
                        padaBatal={batalkan}
                        sedangMenyimpan={sedangMenyimpan}
                        id={item.id}
                        teksTombol="Simpan Perubahan"
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="font-bold text-perpusnas-blue">{item.nama}</h2>
                          <p className="mt-1 text-[11px] uppercase tracking-wide text-perpusnas-gray-600">
                            {labelKategori[item.kategori]} - urutan {item.urutan}
                          </p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <button
                            type="button"
                            onClick={() => mulaiSunting(item)}
                            aria-label={`Sunting ${item.nama}`}
                            className="rounded-lg bg-perpusnas-blue-light p-2 text-perpusnas-blue"
                          >
                            <Pencil size={15} aria-hidden="true" />
                          </button>
                          {superadmin && item.jenis !== 'keranjang' && item.slug !== 'lainnya' && (
                            <button
                              type="button"
                              onClick={() => void hapusSeri(item)}
                              disabled={sedangMenghapus === item.id}
                              aria-label={`Hapus ${item.nama}`}
                              className="rounded-lg bg-red-50 p-2 text-red-800 disabled:opacity-50"
                            >
                              <Trash2 size={15} aria-hidden="true" />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="mt-3 line-clamp-3 text-sm text-perpusnas-gray-600">{item.deskripsi}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <p className="text-xs text-perpusnas-gray-600">
                          {item.jenis === 'keranjang' ? 'Keranjang Lainnya' : item.unggulan ? 'Unggulan' : 'Seri reguler'}
                        </p>
                        {!adaIsi(item.gambar_url) && <PenandaKosong label="Gambar" />}
                      </div>
                    </>
                  )}
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
