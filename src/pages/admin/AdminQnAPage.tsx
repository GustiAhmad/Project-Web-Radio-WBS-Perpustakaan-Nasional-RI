import { useCallback, useEffect, useState } from 'react'
import {
  Check,
  Download,
  EyeOff,
  LockKeyhole,
  Pin,
  Radio,
  RefreshCw,
  Trash2,
  Video,
} from 'lucide-react'
import { Kosong, Pemuatan } from '../../components/common/StateBox'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../services/supabase'
import type { AcaraMendatang, JadwalTetap, Pertanyaan, SesiOnAir } from '../../types/database.types'
import { unduhCsv } from '../../utils/csv'
import {
  jamSelesaiDariDurasi,
  jenisHariSiaran,
  waktuWibSekarang,
  type JenisHariSiaran,
} from '../../utils/timeUtils'

type Sumber = 'jadwal' | 'acara'
type ProgramSesi = Pick<JadwalTetap, 'id' | 'jam_mulai' | 'jam_selesai' | 'nama_program' | 'hari' | 'interaktif'>

const PROGRAM_PRIORITAS = ['Indonesia Pagi Ini', 'Pesona Nusantara', 'Ruang Literasi']
const LABEL_HARI: Record<JenisHariSiaran, string> = {
  hari_kerja: 'Senin s.d. Jumat',
  sabtu: 'Sabtu',
  minggu: 'Minggu',
}

const statusPertanyaan: Record<Pertanyaan['status'], string> = {
  baru: 'Baru',
  dibacakan: 'Dibacakan',
  disembunyikan: 'Disembunyikan',
}

export default function AdminQnAPage() {
  const { profil } = useAuth()
  const [sesi, setSesi] = useState<SesiOnAir | null>(null)
  const [pertanyaan, setPertanyaan] = useState<Pertanyaan[]>([])
  const [jadwal, setJadwal] = useState<ProgramSesi[]>([])
  const [acara, setAcara] = useState<AcaraMendatang[]>([])
  const [hariSiaran, setHariSiaran] = useState<JenisHariSiaran>(() => jenisHariSiaran(waktuWibSekarang()))
  const [sumber, setSumber] = useState<Sumber>('jadwal')
  const [sumberId, setSumberId] = useState('')
  const [durasiMenit, setDurasiMenit] = useState('60')
  const [memuat, setMuat] = useState(true)
  const [memproses, setMemproses] = useState(false)
  const [galat, setGalat] = useState('')
  const [pesan, setPesan] = useState('')

  const muatSesi = useCallback(async (): Promise<void> => {
    if (!supabase) return
    const { data, error } = await supabase
      .from('sesi_onair')
      .select('*')
      .eq('status', 'terbuka')
      .order('dibuka_pada', { ascending: false })
      .limit(1)
      .maybeSingle()
    if (error) setGalat(`Gagal memuat sesi: ${error.message}`)
    setSesi((data as SesiOnAir | null) ?? null)
  }, [])

  const muatPertanyaan = useCallback(async (sesiId: string): Promise<void> => {
    if (!supabase) return
    const { data, error } = await supabase
      .from('pertanyaan')
      .select('*')
      .eq('sesi_id', sesiId)
      .order('created_at', { ascending: false })
    if (error) setGalat(`Gagal memuat pertanyaan: ${error.message}`)
    setPertanyaan((data as Pertanyaan[] | null) ?? [])
  }, [])

  useEffect(() => {
    if (!supabase) {
      setMuat(false)
      setGalat('Koneksi ke studio belum tersedia.')
      return
    }
    let masihAktif = true

    async function muatAwal(): Promise<void> {
      await muatSesi()
      const hari = jenisHariSiaran(waktuWibSekarang())
      const [dataJadwal, dataAcara] = await Promise.all([
        supabase!
          .from('jadwal_tetap')
          .select('id, jam_mulai, jam_selesai, nama_program, hari, interaktif')
          .eq('status', 'terbit')
          .eq('hari', hari)
          .eq('interaktif', true)
          .order('jam_mulai'),
        supabase!.from('acara_mendatang').select('*').eq('status', 'terbit').order('tanggal'),
      ])
      if (!masihAktif) return
      setHariSiaran(hari)
      setJadwal((dataJadwal.data as ProgramSesi[] | null) ?? [])
      setAcara((dataAcara.data as AcaraMendatang[] | null) ?? [])
      setMuat(false)
    }

    void muatAwal()
    return () => {
      masihAktif = false
    }
  }, [muatSesi])

  useEffect(() => {
    if (sesi) void muatPertanyaan(sesi.id)
    else setPertanyaan([])
  }, [sesi?.id, muatPertanyaan])

  useEffect(() => {
    if (!supabase) return
    const klien = supabase
    const channel = klien
      .channel(`admin-qna-${Date.now()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sesi_onair' }, () => {
        void muatSesi()
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pertanyaan' }, () => {
        if (sesi?.id) void muatPertanyaan(sesi.id)
      })
      .subscribe()
    return () => {
      void klien.removeChannel(channel)
    }
  }, [muatSesi, muatPertanyaan, sesi?.id])

  async function bukaSesi(): Promise<void> {
    if (!supabase || !sumberId) {
      setGalat('Pilih program siaran atau acara khusus terlebih dahulu.')
      return
    }
    const durasi = Number(durasiMenit)
    if (!Number.isInteger(durasi) || durasi < 1 || durasi > 480) {
      setGalat('Target durasi sesi harus berupa bilangan bulat 1 sampai 480 menit.')
      return
    }
    setMemproses(true)
    setGalat('')
    setPesan('')

    if (sumber === 'jadwal') {
      const pilihan = jadwal.find((item) => item.id === sumberId)
      if (!pilihan || !pilihan.interaktif) {
        setGalat('Program ini tidak berpenanda sesi tanya jawab. Centang kolom Tanya Jawab di menu Jadwal Siaran.')
        setMemproses(false)
        return
      }
      const { error } = await supabase.from('sesi_onair').insert({
        nama_program: pilihan.nama_program,
        jadwal_id: pilihan.id,
        jam_mulai: pilihan.jam_mulai,
        jam_selesai: jamSelesaiDariDurasi(pilihan.jam_mulai, durasi),
        dibuka_oleh: profil?.nama_lengkap ?? null,
      })
      if (error) setGalat(`Gagal membuka sesi: ${error.message}`)
      else setPesan(`Sesi ${pilihan.nama_program} dibuka selama ${durasi} menit.`)
    } else {
      const pilihan = acara.find((item) => item.id === sumberId)
      if (!pilihan) {
        setGalat('Acara tidak ditemukan.')
        setMemproses(false)
        return
      }
      const { error } = await supabase.from('sesi_onair').insert({
        nama_program: pilihan.judul,
        acara_id: pilihan.id,
        jam_mulai: pilihan.jam_mulai,
        jam_selesai: jamSelesaiDariDurasi(pilihan.jam_mulai, durasi),
        dibuka_oleh: profil?.nama_lengkap ?? null,
      })
      if (error) setGalat(`Gagal membuka sesi: ${error.message}`)
      else setPesan(`Sesi acara ${pilihan.judul} dibuka selama ${durasi} menit.`)
    }

    setMemproses(false)
    await muatSesi()
  }

  async function tutupSesi(): Promise<void> {
    if (!supabase || !sesi) return
    setMemproses(true)
    setGalat('')
    const { error } = await supabase
      .from('sesi_onair')
      .update({
        status: 'tertutup',
        ditutup_pada: new Date().toISOString(),
        ditutup_oleh: profil?.nama_lengkap ?? null,
      })
      .eq('id', sesi.id)
    if (error) setGalat(`Gagal menutup sesi: ${error.message}`)
    else setPesan('Sesi ditutup. Formulir publik berubah otomatis.')
    setMemproses(false)
    await muatSesi()
  }

  async function ubahPertanyaan(id: string, pembaruan: Record<string, unknown>): Promise<void> {
    if (!supabase) return
    setGalat('')
    const { error } = await supabase
      .from('pertanyaan')
      .update(pembaruan as never)
      .eq('id', id)
    if (error) setGalat(`Gagal memperbarui pertanyaan: ${error.message}`)
  }

  async function hapusPertanyaan(id: string): Promise<void> {
    if (!supabase) return
    setGalat('')
    const { error } = await supabase.from('pertanyaan').delete().eq('id', id)
    if (error) setGalat(`Gagal menghapus pertanyaan: ${error.message}`)
  }

  function unduhRiwayat(): void {
    unduhCsv(
      `riwayat-tanya-jawab-${sesi?.tanggal ?? 'sesi'}.csv`,
      ['Waktu', 'Nama', 'Pertanyaan', 'Status', 'Disorot'],
      pertanyaan.map((item) => [
        item.created_at,
        item.nama_pengirim,
        item.isi_pertanyaan,
        statusPertanyaan[item.status],
        item.disorot ? 'Ya' : 'Tidak',
      ])
    )
  }

  const daftarSumber =
    sumber === 'jadwal'
      ? [...jadwal].sort((a, b) => {
          const indeksA = PROGRAM_PRIORITAS.indexOf(a.nama_program)
          const indeksB = PROGRAM_PRIORITAS.indexOf(b.nama_program)
          const prioritasA = indeksA === -1 ? PROGRAM_PRIORITAS.length : indeksA
          const prioritasB = indeksB === -1 ? PROGRAM_PRIORITAS.length : indeksB
          return prioritasA - prioritasB || a.jam_mulai.localeCompare(b.jam_mulai)
        })
      : acara

  return (
    <div>
      <h1 className="text-2xl font-bold text-perpusnas-blue">Tanya Jawab On-Air</h1>
      <p className="mt-2 text-sm text-perpusnas-gray-600">
        Buka sesi, terima pertanyaan pendengar secara langsung, dan kelola tampilannya di studio.
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

      {memuat ? (
        <div className="mt-6">
          <Pemuatan pesan="Memuat sesi tanya jawab..." />
        </div>
      ) : (
        <section className="mt-6 rounded-2xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm">
          {sesi ? (
            <>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-perpusnas-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-perpusnas-blue-dark">
                    <Radio size={13} aria-hidden="true" />
                    Sesi Terbuka
                  </span>
                  <h2 className="mt-3 text-xl font-bold text-perpusnas-blue">{sesi.nama_program}</h2>
                  <p className="mt-1 text-sm text-perpusnas-gray-600">
                    {sesi.jam_mulai.slice(0, 5)}–{sesi.jam_selesai.slice(0, 5)} WIB - {sesi.tanggal}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void tutupSesi()}
                  disabled={memproses}
                  className="inline-flex items-center gap-2 rounded-full border border-red-300 px-5 py-2.5 text-sm font-semibold text-red-800 disabled:opacity-60"
                >
                  <LockKeyhole size={16} aria-hidden="true" />
                  Tutup Sesi
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold text-perpusnas-blue">Buka Sesi Baru</h2>
              <p className="mt-1 text-sm text-perpusnas-gray-600">
                Pilih blok jadwal atau acara khusus yang sedang berlangsung.
              </p>
              <p className="mt-1 text-xs text-perpusnas-gray-600">
                {sumber === 'jadwal'
                  ? `Daftar hanya berisi program interaktif ${LABEL_HARI[hariSiaran]} (WIB). Program tanpa penanda Tanya Jawab tidak dapat dibuka.`
                  : 'Durasi sesi acara khusus juga ditentukan manual saat membuka.'}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSumber('jadwal')
                    setSumberId('')
                  }}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
                    sumber === 'jadwal'
                      ? 'border-perpusnas-blue bg-perpusnas-blue text-white'
                      : 'border-perpusnas-blue/20 text-perpusnas-blue'
                  }`}
                >
                  <Radio size={15} aria-hidden="true" />
                  Program Siaran
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSumber('acara')
                    setSumberId('')
                  }}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
                    sumber === 'acara'
                      ? 'border-perpusnas-blue bg-perpusnas-blue text-white'
                      : 'border-perpusnas-blue/20 text-perpusnas-blue'
                  }`}
                >
                  <Video size={15} aria-hidden="true" />
                  Acara Khusus
                </button>
              </div>
              <div className="mt-4 flex flex-wrap items-end gap-3">
                <div className="min-w-[240px] flex-1">
                  <label htmlFor="sumber-sesi" className="block text-sm font-semibold text-perpusnas-gray-900">
                    {sumber === 'jadwal' ? 'Program siaran' : 'Acara'}
                  </label>
                  <select
                    id="sumber-sesi"
                    value={sumberId}
                    onChange={(e) => setSumberId(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 bg-white px-3 py-2.5 text-sm outline-none focus:border-perpusnas-blue focus:ring-2 focus:ring-perpusnas-blue/20"
                  >
                    <option value="">Pilih {sumber === 'jadwal' ? 'program' : 'acara'}</option>
                    {daftarSumber.map((item) => (
                      <option key={item.id} value={item.id}>
                        {sumber === 'jadwal'
                          ? `${(item as ProgramSesi).jam_mulai.slice(0, 5)} - ${(item as ProgramSesi).nama_program}`
                          : `${(item as AcaraMendatang).tanggal} - ${(item as AcaraMendatang).judul}`}
                      </option>
                    ))}
                  </select>
                  {sumber === 'jadwal' && jadwal.length === 0 && (
                    <p className="mt-2 text-xs text-amber-700">
                      Belum ada program berpenanda Tanya Jawab hari ini. Centang kolom Tanya Jawab di menu Jadwal Siaran.
                    </p>
                  )}
                </div>
                <div className="w-36">
                  <label htmlFor="durasi-sesi" className="block text-sm font-semibold text-perpusnas-gray-900">
                    Target durasi (menit)
                  </label>
                  <input
                    id="durasi-sesi"
                    type="number"
                    min={1}
                    max={480}
                    value={durasiMenit}
                    onChange={(e) => setDurasiMenit(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 bg-white px-3 py-2.5 text-sm outline-none focus:border-perpusnas-blue focus:ring-2 focus:ring-perpusnas-blue/20"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => void bukaSesi()}
                  disabled={memproses || !sumberId}
                  className="rounded-full bg-green-700 px-6 py-3 text-sm font-bold text-white hover:bg-green-800 disabled:opacity-60"
                >
                  {memproses ? 'Membuka...' : 'Buka Sesi Baru'}
                </button>
              </div>
              <p className="mt-3 text-xs text-perpusnas-gray-600">
                Sesi berakhir otomatis pada jam mulai ditambah target durasi. Isi lebih lama dari jadwal bila acara berlangsung lebih dari satu jam.
              </p>
            </>
          )}
        </section>
      )}

      <section className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-perpusnas-blue">Pertanyaan Masuk</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => sesi && void muatPertanyaan(sesi.id)}
              className="inline-flex items-center gap-2 rounded-full border border-perpusnas-blue/20 px-4 py-2 text-xs font-semibold text-perpusnas-blue"
            >
              <RefreshCw size={15} aria-hidden="true" />
              Segarkan
            </button>
            <button
              type="button"
              onClick={unduhRiwayat}
              disabled={!sesi || pertanyaan.length === 0}
              className="inline-flex items-center gap-2 rounded-full border border-perpusnas-blue/20 px-4 py-2 text-xs font-semibold text-perpusnas-blue disabled:opacity-50"
            >
              <Download size={15} aria-hidden="true" />
              Unduh CSV
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {!sesi && (
            <Kosong judul="Belum ada sesi" pesan="Buka sesi terlebih dahulu untuk menerima pertanyaan." />
          )}
          {sesi && pertanyaan.length === 0 && (
            <Kosong judul="Belum ada pertanyaan" pesan="Pertanyaan baru akan muncul otomatis di sini." />
          )}
          {sesi &&
            pertanyaan.map((item) => (
              <article
                key={item.id}
                className={`rounded-xl border bg-white p-5 shadow-sm ${
                  item.disorot ? 'border-perpusnas-gold' : 'border-perpusnas-blue/10'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-perpusnas-blue">{item.nama_pengirim}</p>
                    <p className="mt-1 text-xs text-perpusnas-gray-600">{item.created_at.replace('T', ' ').slice(0, 19)} WIB</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                      item.status === 'baru'
                        ? 'bg-perpusnas-gold-light text-perpusnas-blue-dark'
                        : item.status === 'dibacakan'
                          ? 'bg-green-50 text-green-800'
                          : 'bg-perpusnas-gray-100 text-perpusnas-gray-600'
                    }`}
                  >
                    {statusPertanyaan[item.status]}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-perpusnas-gray-900">{item.isi_pertanyaan}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => void ubahPertanyaan(item.id, {
                      status: 'dibacakan',
                      ditandai_oleh: profil?.nama_lengkap ?? null,
                    })}
                    className="inline-flex items-center gap-1.5 rounded-full border border-green-300 px-3 py-1.5 text-xs font-semibold text-green-800"
                  >
                    <Check size={14} aria-hidden="true" />
                    Tandai Dibaca
                  </button>
                  <button
                    type="button"
                    onClick={() => void ubahPertanyaan(item.id, { disorot: !item.disorot })}
                    className="inline-flex items-center gap-1.5 rounded-full border border-perpusnas-blue/20 px-3 py-1.5 text-xs font-semibold text-perpusnas-blue"
                  >
                    <Pin size={14} aria-hidden="true" />
                    {item.disorot ? 'Batalkan Sorotan' : 'Sorot'}
                  </button>
                  <button
                    type="button"
                    onClick={() => void ubahPertanyaan(item.id, { status: 'disembunyikan' })}
                    className="inline-flex items-center gap-1.5 rounded-full border border-perpusnas-blue/20 px-3 py-1.5 text-xs font-semibold text-perpusnas-gray-600"
                  >
                    <EyeOff size={14} aria-hidden="true" />
                    Sembunyikan
                  </button>
                  <button
                    type="button"
                    onClick={() => void hapusPertanyaan(item.id)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-800"
                  >
                    <Trash2 size={14} aria-hidden="true" />
                    Hapus
                  </button>
                </div>
              </article>
            ))}
        </div>
      </section>
    </div>
  )
}
