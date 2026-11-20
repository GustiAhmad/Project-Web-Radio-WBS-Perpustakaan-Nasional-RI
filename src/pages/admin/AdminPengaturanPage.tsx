import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import { Pemuatan } from '../../components/common/StateBox'
import { supabase } from '../../services/supabase'
import type { Json } from '../../types/database.types'

type ObjekJson = Record<string, unknown>

function sebagaiObjek(nilai: Json | undefined): ObjekJson {
  return nilai && typeof nilai === 'object' && !Array.isArray(nilai) ? (nilai as ObjekJson) : {}
}

import { useNotifikasiGalat } from '../../hooks/useNotifikasiGalat'

export default function AdminPengaturanPage() {
  const [streamUrl, setStreamUrl] = useState('')
  const [pesanGangguan, setPesanGangguan] = useState('')
  const [ga4Id, setGa4Id] = useState('')
  const [analitikAktif, setAnalitikAktif] = useState(false)
  const [memuat, setMuat] = useState(true)
  const [galat, setGalat] = useState('')
  useNotifikasiGalat(galat)
  const [pesan, setPesan] = useState('')
  const [mengunduh, setMengunduh] = useState(false)

  useEffect(() => {
    if (!supabase) {
      setMuat(false)
      setGalat('Koneksi ke studio belum tersedia.')
      return
    }
    let masihAktif = true
    const klien = supabase
    void klien
      .from('pengaturan_situs')
      .select('kunci, nilai')
      .in('kunci', ['streaming', 'analitik'])
      .then(({ data, error }) => {
        if (!masihAktif) return
        if (error) setGalat(`Gagal memuat pengaturan: ${error.message}`)
        for (const baris of data ?? []) {
          const nilai = sebagaiObjek(baris.nilai)
          if (baris.kunci === 'streaming') {
            setStreamUrl(String(nilai.stream_url ?? ''))
            setPesanGangguan(String(nilai.pesan_gangguan ?? ''))
          }
          if (baris.kunci === 'analitik') {
            setGa4Id(String(nilai.ga4_id ?? ''))
            setAnalitikAktif(nilai.aktifkan_analitik === true)
          }
        }
        setMuat(false)
      })
    return () => {
      masihAktif = false
    }
  }, [])

  async function simpan(): Promise<void> {
    if (!supabase) return
    setGalat('')
    setPesan('')
    const [stream, analitik] = await Promise.all([
      supabase
        .from('pengaturan_situs')
        .update({ nilai: { stream_url: streamUrl.trim(), pesan_gangguan: pesanGangguan.trim() } as Json })
        .eq('kunci', 'streaming'),
      supabase
        .from('pengaturan_situs')
        .update({
          nilai: {
            ga4_id: ga4Id.trim(),
            aktifkan_analitik: analitikAktif,
            anonymize_ip: true,
          } as Json,
        })
        .eq('kunci', 'analitik'),
    ])
    if (stream.error || analitik.error) {
      setGalat(`Gagal menyimpan pengaturan: ${stream.error?.message ?? analitik.error?.message}`)
      return
    }
    setPesan('Pengaturan tersimpan.')
  }

  async function unduhCadangan(): Promise<void> {
    if (!supabase) return
    setMengunduh(true)
    setGalat('')
    const namaTabel = [
      'pengguna',
      'seri',
      'episode',
      'jadwal_tetap',
      'acara_mendatang',
      'sesi_chat',
      'chat_pesan',
      'halaman_statis',
      'pengaturan_situs',
      'laporan_error',
    ] as const

    const klien = supabase
    const hasil = await Promise.all(namaTabel.map((nama) => klien.from(nama).select('*')))
    const cadangan: Record<string, unknown> = {}
    let adaGalat = false
    hasil.forEach((respons, indeks) => {
      if (respons.error) {
        adaGalat = true
        return
      }
      cadangan[namaTabel[indeks]] = respons.data ?? []
    })

    if (adaGalat) setGalat('Sebagian tabel gagal diunduh. Periksa hak akses Superadmin.')
    const berkas = new Blob([JSON.stringify({ diunduh_pada: new Date().toISOString(), data: cadangan }, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(berkas)
    const tautan = document.createElement('a')
    tautan.href = url
    tautan.download = `cadangan-wbs-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(tautan)
    tautan.click()
    tautan.remove()
    URL.revokeObjectURL(url)
    setMengunduh(false)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-perpusnas-blue">Pengaturan Situs</h1>
      <p className="mt-2 text-sm text-perpusnas-gray-600">
        Menu khusus Superadmin. Perubahan pada aliran audio dan pengaturan situs langsung dipakai aplikasi.
      </p>

      {galat && (
        <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{galat}</p>
      )}
      {pesan && (
        <p role="status" className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{pesan}</p>
      )}

      {memuat ? (
        <div className="mt-6"><Pemuatan pesan="Memuat pengaturan..." /></div>
      ) : (
        <>
          <section className="mt-6 rounded-2xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-perpusnas-blue">Aliran Radio</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="set-stream" className="block text-sm font-semibold text-perpusnas-gray-900">URL aliran Icecast HTTPS</label>
                <input
                  id="set-stream"
                  type="url"
                  value={streamUrl}
                  onChange={(e) => setStreamUrl(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
                />
                <p className="mt-1 text-xs text-perpusnas-gray-600">Wajib HTTPS agar tidak diblokir sebagai mixed content.</p>
              </div>
              <div>
                <label htmlFor="set-gangguan" className="block text-sm font-semibold text-perpusnas-gray-900">Pesan gangguan siaran</label>
                <textarea
                  id="set-gangguan"
                  rows={2}
                  value={pesanGangguan}
                  onChange={(e) => setPesanGangguan(e.target.value)}
                  className="mt-2 w-full resize-y rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
                />
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-perpusnas-blue">Google Analytics 4</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="set-ga4" className="block text-sm font-semibold text-perpusnas-gray-900">ID Pengukuran</label>
                <input
                  id="set-ga4"
                  value={ga4Id}
                  onChange={(e) => setGa4Id(e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                  className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-perpusnas-gray-900">
                <input type="checkbox" checked={analitikAktif} onChange={(e) => setAnalitikAktif(e.target.checked)} />
                Aktifkan analitik
              </label>
              <p className="text-xs text-perpusnas-gray-600">Penyamaran IP selalu aktif dan tidak dapat dimatikan.</p>
            </div>
          </section>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => void simpan()} className="rounded-full bg-perpusnas-blue px-6 py-3 text-sm font-bold text-white hover:bg-perpusnas-blue-dark">
              Simpan Pengaturan
            </button>
            <button
              type="button"
              onClick={() => void unduhCadangan()}
              disabled={mengunduh}
              className="inline-flex items-center gap-2 rounded-full border border-perpusnas-blue/20 px-6 py-3 text-sm font-semibold text-perpusnas-blue disabled:opacity-60"
            >
              <Download size={16} aria-hidden="true" />
              {mengunduh ? 'Menyiapkan...' : 'Unduh Cadangan JSON'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
