import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MessageCircle, Radio, X } from 'lucide-react'
import { Kosong, Pemuatan } from '../components/common/StateBox'
import { useOnAirProgram } from '../hooks/useOnAirProgram'
import { ambilPenyiar } from '../services/catalog'
import { supabase } from '../services/supabase'
import type { JadwalTetap } from '../types/database.types'
import { dalamRentang, jenisHariSiaran, waktuWibSekarang } from '../utils/timeUtils'

type JenisHari = JadwalTetap['hari']

const tabs: { label: string; jenis: JenisHari }[] = [
  { label: 'Senin', jenis: 'hari_kerja' },
  { label: 'Selasa', jenis: 'hari_kerja' },
  { label: 'Rabu', jenis: 'hari_kerja' },
  { label: 'Kamis', jenis: 'hari_kerja' },
  { label: 'Jumat', jenis: 'hari_kerja' },
  { label: 'Sabtu', jenis: 'sabtu' },
  { label: 'Minggu', jenis: 'minggu' },
]

type JadwalRingkas = Pick<JadwalTetap, 'id' | 'jam_mulai' | 'jam_selesai' | 'nama_program' | 'nama_penyiar' | 'interaktif' | 'deskripsi' | 'hari'>

export default function SchedulePage() {
  const { jam, jenisHari } = useOnAirProgram()
  const [tabAktif, setTabAktif] = useState(() => {
    const hari = jenisHariSiaran(waktuWibSekarang())
    const indeks = tabs.findIndex((item) => item.jenis === hari)
    return indeks < 0 ? 0 : indeks
  })
  const [jadwal, setJadwal] = useState<JadwalRingkas[]>([])
  const [memuat, setMuat] = useState(true)
  const [params, setParams] = useSearchParams()
  const slugPenyiar = params.get('penyiar') ?? ''
  const [namaPenyiar, setNamaPenyiar] = useState('')
  const [penyiarTidakDitemukan, setPenyiarTidakDitemukan] = useState(false)

  useEffect(() => {
    if (!slugPenyiar) {
      setNamaPenyiar('')
      setPenyiarTidakDitemukan(false)
      return
    }
    let masihAktif = true
    void ambilPenyiar().then((daftarPenyiar) => {
      if (!masihAktif) return
      const cocok = daftarPenyiar.find((orang) => orang.slug === slugPenyiar)
      setNamaPenyiar(cocok?.nama ?? '')
      setPenyiarTidakDitemukan(!cocok)
    })
    return () => {
      masihAktif = false
    }
  }, [slugPenyiar])

  useEffect(() => {
    if (!supabase) {
      setMuat(false)
      return
    }
    let masihAktif = true
    void supabase
      .from('jadwal_tetap')
      .select('id, jam_mulai, jam_selesai, nama_program, nama_penyiar, interaktif, deskripsi, hari')
      .eq('status', 'terbit')
      .in('hari', ['hari_kerja', 'sabtu', 'minggu'])
      .order('jam_mulai', { ascending: true })
      .then(({ data, error }) => {
        if (!masihAktif) return
        if (error) console.error(`[WBS] Gagal memuat jadwal: ${error.message}`)
        else setJadwal((data ?? []) as JadwalRingkas[])
        setMuat(false)
      })
    return () => {
      masihAktif = false
    }
  }, [])

  const tab = tabs[tabAktif]
  const daftar = jadwal.filter((item) => {
    if (item.hari !== tab.jenis) return false
    if (!namaPenyiar) return true
    return item.nama_penyiar?.toLowerCase().includes(namaPenyiar.toLowerCase()) ?? false
  })
  const jamSekarang = jam
  const hariIniSesuai = tab.jenis === jenisHari

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-perpusnas-blue">Jadwal Siaran Radio</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-perpusnas-gray-600">
        Siaran radio WBS berjalan 24 jam setiap hari. Pilih hari untuk melihat blok acara, dengan penanda siaran yang
        sedang mengudara sesuai waktu WIB.
      </p>

      <div className="mt-6 flex items-center gap-2 rounded-lg bg-perpusnas-blue-light px-4 py-3 text-sm text-perpusnas-blue">
        <Radio size={17} aria-hidden="true" />
        Waktu sekarang: <strong className="tabular-nums">{jam.slice(0, 5)} WIB</strong>
      </div>

      {slugPenyiar && (
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-perpusnas-blue/20 bg-white px-4 py-3 text-sm text-perpusnas-gray-900">
          <span>
            {penyiarTidakDitemukan
              ? 'Penyiar tidak ditemukan. Menampilkan seluruh jadwal.'
              : namaPenyiar
                ? `Menampilkan jadwal untuk ${namaPenyiar}.`
                : 'Mencari profil penyiar...'}
          </span>
          <button
            type="button"
            onClick={() => setParams({})}
            className="inline-flex items-center gap-1 rounded-full bg-perpusnas-blue-light px-3 py-1 text-xs font-semibold text-perpusnas-blue"
          >
            <X size={13} aria-hidden="true" />
            Hapus filter
          </button>
        </div>
      )}

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Pilih hari siaran">
        {tabs.map((item, indeks) => {
          const dipilih = indeks === tabAktif
          return (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={dipilih}
              onClick={() => setTabAktif(indeks)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                dipilih
                  ? 'border-perpusnas-blue bg-perpusnas-blue text-white'
                  : 'border-perpusnas-blue/20 bg-white text-perpusnas-gray-600 hover:border-perpusnas-blue hover:text-perpusnas-blue'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <div className="mt-5">
        {memuat ? (
          <Pemuatan pesan="Memuat jadwal siaran..." />
        ) : daftar.length === 0 ? (
          <Kosong judul="Jadwal belum tersedia" pesan="Jadwal siaran akan muncul setelah petugas menerbitkannya." />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-perpusnas-blue/10 bg-white shadow-sm">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead className="bg-perpusnas-blue-light text-xs uppercase tracking-wide text-perpusnas-blue">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Jam (WIB)</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Program</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {daftar.map((item) => {
                  const aktif = hariIniSesuai && dalamRentang(jamSekarang, item.jam_mulai, item.jam_selesai)
                  return (
                    <tr
                      key={item.id}
                      className={`border-t border-perpusnas-gray-100 ${aktif ? 'bg-perpusnas-gold-light' : 'bg-white'}`}
                      aria-current={aktif ? 'true' : undefined}
                    >
                      <td className="whitespace-nowrap px-5 py-3 font-semibold tabular-nums text-perpusnas-gray-900">
                        {item.jam_mulai.slice(0, 5)}–{item.jam_selesai.slice(0, 5)}
                      </td>
                      <td className="px-5 py-3 font-medium text-perpusnas-gray-900">
                        {item.nama_program}
                        {item.interaktif && (
                          <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-perpusnas-blue-light px-2 py-0.5 text-[10px] font-bold text-perpusnas-blue">
                            <MessageCircle size={11} aria-hidden="true" />
                            Tanya Jawab
                          </span>
                        )}
                        {aktif && (
                          <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-perpusnas-gold px-2 py-0.5 text-[10px] font-bold uppercase text-perpusnas-blue-dark">
                            <span className="h-1.5 w-1.5 rounded-full bg-perpusnas-blue-dark" aria-hidden="true" />
                            On-Air
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-xs text-perpusnas-gray-600">
                        {item.nama_penyiar && (
                          <span className="mb-1 block font-semibold text-perpusnas-gray-900">
                            Penyiar: {item.nama_penyiar}
                          </span>
                        )}
                        {item.deskripsi ?? (item.interaktif ? 'Sesi interaktif' : 'Siaran reguler')}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
