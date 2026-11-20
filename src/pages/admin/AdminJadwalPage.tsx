import { useEffect, useState } from 'react'
import { Check, MessageCircle, Pencil, X } from 'lucide-react'
import { Kosong, Pemuatan } from '../../components/common/StateBox'
import { supabase } from '../../services/supabase'
import type { Database, JadwalTetap } from '../../types/database.types'

type JenisHari = JadwalTetap['hari']

const hari: { label: string; nilai: JenisHari }[] = [
  { label: 'Senin s.d. Jumat', nilai: 'hari_kerja' },
  { label: 'Sabtu', nilai: 'sabtu' },
  { label: 'Minggu', nilai: 'minggu' },
]

type Draft = {
  nama_program: string
  nama_penyiar: string
  jam_mulai: string
  jam_selesai: string
  deskripsi: string
  interaktif: boolean
  status: Database['public']['Enums']['status_publikasi']
}

import { useNotifikasiGalat } from '../../hooks/useNotifikasiGalat'

export default function AdminJadwalPage() {
  const [jadwal, setJadwal] = useState<JadwalTetap[]>([])
  const [hariAktif, setHariAktif] = useState<JenisHari>('hari_kerja')
  const [memuat, setMuat] = useState(true)
  const [sedangSunting, setSedangSunting] = useState<string | null>(null)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [galat, setGalat] = useState('')
  useNotifikasiGalat(galat)
  const [pesan, setPesan] = useState('')

  async function muat(): Promise<void> {
    if (!supabase) {
      setMuat(false)
      setGalat('Koneksi ke studio belum tersedia.')
      return
    }
    const { data, error } = await supabase.from('jadwal_tetap').select('*').order('jam_mulai')
    if (error) setGalat(`Gagal memuat jadwal: ${error.message}`)
    setJadwal((data as JadwalTetap[] | null) ?? [])
    setMuat(false)
  }

  useEffect(() => {
    void muat()
  }, [])

  function mulaiSunting(item: JadwalTetap): void {
    setGalat('')
    setPesan('')
    setSedangSunting(item.id)
    setDraft({
      nama_program: item.nama_program,
      nama_penyiar: item.nama_penyiar ?? '',
      jam_mulai: item.jam_mulai.slice(0, 5),
      jam_selesai: item.jam_selesai.slice(0, 5),
      deskripsi: item.deskripsi ?? '',
      interaktif: item.interaktif,
      status: item.status,
    })
  }

  async function simpan(id: string): Promise<void> {
    if (!supabase || !draft) return
    setGalat('')
    setPesan('')
    const { error } = await supabase
      .from('jadwal_tetap')
      .update({
        nama_program: draft.nama_program.trim(),
        nama_penyiar: draft.nama_penyiar.trim() || null,
        jam_mulai: `${draft.jam_mulai}:00`,
        jam_selesai: `${draft.jam_selesai}:00`,
        deskripsi: draft.deskripsi.trim() || null,
        interaktif: draft.interaktif,
        status: draft.status,
      })
      .eq('id', id)
    if (error) {
      setGalat(`Gagal menyimpan jadwal: ${error.message}`)
      return
    }
    setSedangSunting(null)
    setDraft(null)
    setPesan('Jadwal tersimpan. Halaman publik langsung memperbarui data.')
    await muat()
  }

  const daftar = jadwal.filter((item) => item.hari === hariAktif)

  return (
    <div>
      <h1 className="text-2xl font-bold text-perpusnas-blue">Jadwal Siaran</h1>
      <p className="mt-2 text-sm text-perpusnas-gray-600">
        Sunting program, penyiar, jam tayang, dan penanda sesi tanya jawab. Panel ini tidak mengendalikan pemutaran lagu atau playlist studio.
      </p>
      <p className="mt-1 text-xs text-perpusnas-gray-600">
        Program berpenanda Tanya Jawab dapat dibuka sebagai sesi di menu Tanya Jawab On-Air.
      </p>

      {galat && (
        <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {galat}
        </p>
      )}
      {pesan && (
        <p role="status" className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {pesan}
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {hari.map((item) => (
          <button
            key={item.nilai}
            type="button"
            onClick={() => {
              setHariAktif(item.nilai)
              setSedangSunting(null)
              setDraft(null)
            }}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${
              hariAktif === item.nilai
                ? 'border-perpusnas-blue bg-perpusnas-blue text-white'
                : 'border-perpusnas-blue/20 bg-white text-perpusnas-blue'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {memuat ? (
          <Pemuatan pesan="Memuat jadwal..." />
        ) : daftar.length === 0 ? (
          <Kosong judul="Jadwal kosong" pesan="Belum ada jadwal untuk hari yang dipilih." />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-perpusnas-blue/10 bg-white shadow-sm">
            <table className="w-full min-w-[940px] border-collapse text-left text-sm">
              <thead className="bg-perpusnas-blue-light text-xs uppercase tracking-wide text-perpusnas-blue">
                <tr>
                  <th className="px-4 py-3 font-semibold">Jam</th>
                  <th className="px-4 py-3 font-semibold">Program</th>
                  <th className="px-4 py-3 font-semibold">Penyiar</th>
                  <th className="px-4 py-3 font-semibold">Keterangan</th>
                  <th className="px-4 py-3 font-semibold">Tanya Jawab</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {daftar.map((item) => {
                  const aktif = sedangSunting === item.id && draft
                  return (
                    <tr key={item.id} className="border-t border-perpusnas-gray-100 align-top">
                      <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                        {aktif ? (
                          <div className="flex items-center gap-1">
                            <input
                              aria-label="Jam mulai"
                              type="time"
                              value={draft.jam_mulai}
                              onChange={(e) => setDraft({ ...draft, jam_mulai: e.target.value })}
                              className="w-24 rounded border border-perpusnas-blue/20 px-2 py-1 text-xs"
                            />
                            <span>-</span>
                            <input
                              aria-label="Jam selesai"
                              type="time"
                              value={draft.jam_selesai}
                              onChange={(e) => setDraft({ ...draft, jam_selesai: e.target.value })}
                              className="w-24 rounded border border-perpusnas-blue/20 px-2 py-1 text-xs"
                            />
                          </div>
                        ) : (
                          `${item.jam_mulai.slice(0, 5)}-${item.jam_selesai.slice(0, 5)}`
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {aktif ? (
                          <input
                            aria-label="Nama program"
                            value={draft.nama_program}
                            onChange={(e) => setDraft({ ...draft, nama_program: e.target.value })}
                            className="w-44 rounded border border-perpusnas-blue/20 px-2 py-1 text-sm"
                          />
                        ) : (
                          <span className="font-semibold text-perpusnas-gray-900">{item.nama_program}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {aktif ? (
                          <input
                            aria-label="Nama penyiar"
                            value={draft.nama_penyiar}
                            onChange={(e) => setDraft({ ...draft, nama_penyiar: e.target.value })}
                            className="w-40 rounded border border-perpusnas-blue/20 px-2 py-1 text-sm"
                          />
                        ) : (
                          <span className="text-perpusnas-gray-600">{item.nama_penyiar ?? '-'}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-perpusnas-gray-600">
                        {aktif ? (
                          <input
                            aria-label="Keterangan"
                            value={draft.deskripsi}
                            onChange={(e) => setDraft({ ...draft, deskripsi: e.target.value })}
                            className="w-52 rounded border border-perpusnas-blue/20 px-2 py-1 text-xs"
                          />
                        ) : (
                          item.deskripsi ?? '-'
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {aktif ? (
                          <label className="inline-flex items-center gap-2 text-xs font-semibold text-perpusnas-blue">
                            <input
                              aria-label={`Sesi tanya jawab ${item.nama_program}`}
                              type="checkbox"
                              checked={draft.interaktif}
                              onChange={(e) => setDraft({ ...draft, interaktif: e.target.checked })}
                              className="h-4 w-4 accent-perpusnas-blue"
                            />
                            Aktif
                          </label>
                        ) : item.interaktif ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-perpusnas-gold-light px-2.5 py-1 text-[11px] font-bold text-perpusnas-blue-dark">
                            <MessageCircle size={12} aria-hidden="true" />
                            Tanya Jawab
                          </span>
                        ) : (
                          <span className="text-xs text-perpusnas-gray-600">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {aktif ? (
                          <select
                            aria-label="Status jadwal"
                            value={draft.status}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                status: e.target.value as Database['public']['Enums']['status_publikasi'],
                              })
                            }
                            className="rounded border border-perpusnas-blue/20 px-2 py-1 text-xs"
                          >
                            <option value="draf">Draf</option>
                            <option value="terbit">Terbit</option>
                          </select>
                        ) : (
                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                              item.status === 'terbit'
                                ? 'bg-green-50 text-green-800'
                                : 'bg-perpusnas-gray-100 text-perpusnas-gray-600'
                            }`}
                          >
                            {item.status === 'terbit' ? 'Terbit' : 'Draf'}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {aktif ? (
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => void simpan(item.id)}
                              aria-label="Simpan jadwal"
                              className="rounded-lg bg-perpusnas-blue p-2 text-white"
                            >
                              <Check size={15} aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSedangSunting(null)
                                setDraft(null)
                              }}
                              aria-label="Batal sunting"
                              className="rounded-lg bg-perpusnas-gray-100 p-2 text-perpusnas-gray-600"
                            >
                              <X size={15} aria-hidden="true" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => mulaiSunting(item)}
                            aria-label={`Sunting ${item.nama_program}`}
                            className="rounded-lg bg-perpusnas-blue-light p-2 text-perpusnas-blue"
                          >
                            <Pencil size={15} aria-hidden="true" />
                          </button>
                        )}
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
