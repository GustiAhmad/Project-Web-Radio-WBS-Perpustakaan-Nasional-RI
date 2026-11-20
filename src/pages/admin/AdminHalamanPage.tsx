import { useEffect, useState } from 'react'
import { Pemuatan } from '../../components/common/StateBox'
import { supabase } from '../../services/supabase'
import type { HalamanStatis } from '../../types/database.types'

import { useNotifikasiGalat } from '../../hooks/useNotifikasiGalat'

export default function AdminHalamanPage() {
  const [halaman, setHalaman] = useState<HalamanStatis[]>([])
  const [pilih, setPilih] = useState('')
  const [judul, setJudul] = useState('')
  const [ringkasan, setRingkasan] = useState('')
  const [konten, setKonten] = useState('')
  const [memuat, setMuat] = useState(true)
  const [galat, setGalat] = useState('')
  useNotifikasiGalat(galat)
  const [pesan, setPesan] = useState('')

  async function muat(): Promise<void> {
    if (!supabase) {
      setMuat(false)
      setGalat('Koneksi ke studio belum tersedia.')
      return
    }
    const { data, error } = await supabase.from('halaman_statis').select('*').order('slug')
    if (error) setGalat(`Gagal memuat halaman: ${error.message}`)
    const daftar = (data as HalamanStatis[] | null) ?? []
    setHalaman(daftar)
    const awal = daftar[0]
    if (awal) {
      setPilih(awal.slug)
      setJudul(awal.judul)
      setRingkasan(awal.ringkasan ?? '')
      setKonten(awal.konten_markdown)
    }
    setMuat(false)
  }

  useEffect(() => {
    void muat()
  }, [])

  function gantiHalaman(slug: string): void {
    setPilih(slug)
    setGalat('')
    setPesan('')
    const item = halaman.find((hal) => hal.slug === slug)
    if (item) {
      setJudul(item.judul)
      setRingkasan(item.ringkasan ?? '')
      setKonten(item.konten_markdown)
    }
  }

  async function simpan(): Promise<void> {
    if (!supabase) return
    setGalat('')
    setPesan('')
    const { error } = await supabase
      .from('halaman_statis')
      .update({
        judul: judul.trim(),
        ringkasan: ringkasan.trim() || null,
        konten_markdown: konten.trim(),
      })
      .eq('slug', pilih)
    if (error) setGalat(`Gagal menyimpan halaman: ${error.message}`)
    else setPesan('Halaman tersimpan dan langsung tampil di situs publik.')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-perpusnas-blue">Halaman Statis</h1>
      <p className="mt-2 text-sm text-perpusnas-gray-600">
        Sunting teks halaman Tentang, Kontak, dan Kebijakan Privasi. Tulisan ditampilkan apa adanya, tanpa format khusus.
      </p>

      {galat && (
        <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{galat}</p>
      )}
      {pesan && (
        <p role="status" className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{pesan}</p>
      )}

      {memuat ? (
        <div className="mt-6"><Pemuatan pesan="Memuat halaman..." /></div>
      ) : (
        <section className="mt-6 rounded-2xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm">
          <label htmlFor="hal-pilih" className="block text-sm font-semibold text-perpusnas-gray-900">Pilih halaman</label>
          <select
            id="hal-pilih"
            value={pilih}
            onChange={(e) => gantiHalaman(e.target.value)}
            className="mt-2 w-full max-w-sm rounded-lg border border-perpusnas-blue/20 bg-white px-3 py-2.5 text-sm"
          >
            {halaman.map((item) => <option key={item.slug} value={item.slug}>{item.judul}</option>)}
          </select>

          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="hal-judul" className="block text-sm font-semibold text-perpusnas-gray-900">Judul</label>
              <input id="hal-judul" value={judul} onChange={(e) => setJudul(e.target.value)} className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label htmlFor="hal-ringkasan" className="block text-sm font-semibold text-perpusnas-gray-900">Ringkasan</label>
              <input id="hal-ringkasan" value={ringkasan} onChange={(e) => setRingkasan(e.target.value)} className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label htmlFor="hal-konten" className="block text-sm font-semibold text-perpusnas-gray-900">Isi halaman</label>
              <textarea id="hal-konten" rows={12} value={konten} onChange={(e) => setKonten(e.target.value)} className="mt-2 w-full resize-y rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm leading-relaxed" />
            </div>
            <button type="button" onClick={() => void simpan()} className="rounded-full bg-perpusnas-blue px-6 py-3 text-sm font-bold text-white hover:bg-perpusnas-blue-dark">
              Simpan Halaman
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
