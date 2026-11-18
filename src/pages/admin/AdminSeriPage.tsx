import { useEffect, useState } from 'react'
import { Check, Pencil, X } from 'lucide-react'
import { Kosong, Pemuatan } from '../../components/common/StateBox'
import { supabase } from '../../services/supabase'
import type { Database, Seri } from '../../types/database.types'

type Kategori = Database['public']['Enums']['kategori_topik']

const daftarKategori: Kategori[] = [
  'layanan_perpustakaan',
  'naskah_nusantara',
  'literasi_keluarga',
  'sejarah_kebudayaan',
  'semua_kategori',
]

const labelKategori: Record<Kategori, string> = {
  layanan_perpustakaan: 'Layanan Perpustakaan',
  naskah_nusantara: 'Naskah Nusantara',
  literasi_keluarga: 'Literasi Keluarga',
  sejarah_kebudayaan: 'Sejarah & Kebudayaan',
  semua_kategori: 'Semua Kategori',
}

type Draft = { nama: string; deskripsi: string; kategori: Kategori; urutan: number; unggulan: boolean }

export default function AdminSeriPage() {
  const [seri, setSeri] = useState<Seri[]>([])
  const [memuat, setMuat] = useState(true)
  const [sunting, setSunting] = useState<string | null>(null)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [galat, setGalat] = useState('')
  const [pesan, setPesan] = useState('')

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

  async function simpan(id: string): Promise<void> {
    if (!supabase || !draft) return
    const { error } = await supabase
      .from('seri')
      .update({
        nama: draft.nama.trim(),
        deskripsi: draft.deskripsi.trim(),
        kategori: draft.kategori,
        urutan: draft.urutan,
        unggulan: draft.unggulan,
      })
      .eq('id', id)
    if (error) {
      setGalat(`Gagal menyimpan seri: ${error.message}`)
      return
    }
    setSunting(null)
    setDraft(null)
    setPesan('Seri tersimpan.')
    await muat()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-perpusnas-blue">Kelola Seri</h1>
      <p className="mt-2 text-sm text-perpusnas-gray-600">
        Sunting nama, kategori, urutan, dan status unggulan dari 22 seri resmi WBS.
      </p>
      {galat && (
        <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{galat}</p>
      )}
      {pesan && (
        <p role="status" className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{pesan}</p>
      )}
      <div className="mt-6">
        {memuat ? (
          <Pemuatan pesan="Memuat seri..." />
        ) : seri.length === 0 ? (
          <Kosong judul="Seri belum tersedia" pesan="Jalankan migrasi Tahap 2 untuk mengisi katalog seri." />
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {seri.map((item) => {
              const aktif = sunting === item.id && draft
              return (
                <article key={item.id} className="rounded-xl border border-perpusnas-blue/10 bg-white p-5 shadow-sm">
                  {aktif ? (
                    <div className="space-y-3">
                      <input
                        aria-label="Nama seri"
                        value={draft.nama}
                        onChange={(e) => setDraft({ ...draft, nama: e.target.value })}
                        className="w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2 text-sm"
                      />
                      <textarea
                        aria-label="Deskripsi seri"
                        rows={3}
                        value={draft.deskripsi}
                        onChange={(e) => setDraft({ ...draft, deskripsi: e.target.value })}
                        className="w-full resize-y rounded-lg border border-perpusnas-blue/20 px-3 py-2 text-sm"
                      />
                      <div className="flex flex-wrap gap-3">
                        <select
                          aria-label="Kategori seri"
                          value={draft.kategori}
                          onChange={(e) => setDraft({ ...draft, kategori: e.target.value as Kategori })}
                          className="rounded-lg border border-perpusnas-blue/20 px-3 py-2 text-sm"
                        >
                          {daftarKategori.map((nilai) => (
                            <option key={nilai} value={nilai}>{labelKategori[nilai]}</option>
                          ))}
                        </select>
                        <input
                          aria-label="Urutan seri"
                          type="number"
                          value={draft.urutan}
                          onChange={(e) => setDraft({ ...draft, urutan: Number(e.target.value) })}
                          className="w-24 rounded-lg border border-perpusnas-blue/20 px-3 py-2 text-sm"
                        />
                        <label className="flex items-center gap-2 text-xs text-perpusnas-gray-600">
                          <input
                            type="checkbox"
                            checked={draft.unggulan}
                            onChange={(e) => setDraft({ ...draft, unggulan: e.target.checked })}
                          />
                          Unggulan
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => void simpan(item.id)} className="rounded-lg bg-perpusnas-blue p-2 text-white" aria-label="Simpan seri">
                          <Check size={16} aria-hidden="true" />
                        </button>
                        <button type="button" onClick={() => { setSunting(null); setDraft(null) }} className="rounded-lg bg-perpusnas-gray-100 p-2 text-perpusnas-gray-600" aria-label="Batal sunting">
                          <X size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="font-bold text-perpusnas-blue">{item.nama}</h2>
                          <p className="mt-1 text-[11px] uppercase tracking-wide text-perpusnas-gray-600">
                            {labelKategori[item.kategori]} - urutan {item.urutan}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSunting(item.id)
                            setDraft({
                              nama: item.nama,
                              deskripsi: item.deskripsi,
                              kategori: item.kategori,
                              urutan: item.urutan,
                              unggulan: item.unggulan,
                            })
                          }}
                          aria-label={`Sunting ${item.nama}`}
                          className="rounded-lg bg-perpusnas-blue-light p-2 text-perpusnas-blue"
                        >
                          <Pencil size={15} aria-hidden="true" />
                        </button>
                      </div>
                      <p className="mt-3 line-clamp-3 text-sm text-perpusnas-gray-600">{item.deskripsi}</p>
                      <p className="mt-3 text-xs text-perpusnas-gray-600">
                        {item.jenis === 'keranjang' ? 'Keranjang Lainnya' : item.unggulan ? 'Unggulan' : 'Seri reguler'}
                      </p>
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
