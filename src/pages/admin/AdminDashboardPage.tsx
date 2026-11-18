import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bug, CalendarDays, MessagesSquare, Video } from 'lucide-react'
import StatCard from '../../components/admin/StatCard'
import { Pemuatan } from '../../components/common/StateBox'
import { useAuth } from '../../context/AuthContext'
import { useOnAirProgram } from '../../hooks/useOnAirProgram'
import { supabase } from '../../services/supabase'

type Ringkasan = {
  episodeTayang: number
  jadwalTerbit: number
  pertanyaanBaru: number
  laporanBaru: number
}

export default function AdminDashboardPage() {
  const { profil, peran } = useAuth()
  const { program, jam } = useOnAirProgram()
  const [ringkasan, setRingkasan] = useState<Ringkasan | null>(null)
  const [galat, setGalat] = useState('')

  useEffect(() => {
    if (!supabase) {
      setGalat('Koneksi ke studio belum tersedia. Periksa pengaturan Supabase.')
      return
    }
    let masihAktif = true

    async function muat(): Promise<void> {
      const [episode, jadwal, sesi, laporan] = await Promise.all([
        supabase!.from('episode').select('id', { count: 'exact', head: true }).eq('status', 'tayang'),
        supabase!.from('jadwal_tetap').select('id', { count: 'exact', head: true }).eq('status', 'terbit'),
        supabase!.from('sesi_onair').select('id').eq('status', 'terbuka').order('dibuka_pada', { ascending: false }).limit(1),
        supabase!.from('laporan_error').select('id', { count: 'exact', head: true }).eq('status', 'baru'),
      ])

      if (!masihAktif) return
      if (episode.error || jadwal.error || sesi.error || laporan.error) {
        setGalat('Sebagian data dasbor gagal dimuat. Periksa koneksi Supabase.')
      }

      let pertanyaanBaru = 0
      if (sesi.data && sesi.data.length > 0) {
        const { count } = await supabase!
          .from('pertanyaan')
          .select('id', { count: 'exact', head: true })
          .eq('sesi_id', sesi.data[0].id)
          .eq('status', 'baru')
        if (masihAktif) pertanyaanBaru = count ?? 0
      }

      if (masihAktif) {
        setRingkasan({
          episodeTayang: episode.count ?? 0,
          jadwalTerbit: jadwal.count ?? 0,
          pertanyaanBaru,
          laporanBaru: laporan.count ?? 0,
        })
      }
    }

    void muat()
    return () => {
      masihAktif = false
    }
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-perpusnas-blue">Dasbor Pengelola</h1>
      <p className="mt-2 text-sm text-perpusnas-gray-600">
        Selamat datang, {profil?.nama_lengkap ?? 'Pengelola'}. Peran Anda: {peran === 'superadmin' ? 'Superadmin' : 'Admin'}.
      </p>

      {galat && (
        <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {galat}
        </p>
      )}

      {!ringkasan ? (
        <div className="mt-6">
          <Pemuatan pesan="Memuat ringkasan operasional..." />
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Episode tayang" nilai={ringkasan.episodeTayang} ikon={Video} />
          <StatCard label="Jadwal terbit" nilai={ringkasan.jadwalTerbit} ikon={CalendarDays} />
          <StatCard label="Pertanyaan baru" nilai={ringkasan.pertanyaanBaru} ikon={MessagesSquare} />
          <StatCard label="Laporan baru" nilai={ringkasan.laporanBaru} ikon={Bug} />
        </div>
      )}

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <section className="rounded-xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-perpusnas-blue">Siaran Saat Ini</h2>
          <p className="mt-3 text-3xl font-bold tabular-nums text-perpusnas-blue">{jam.slice(0, 5)} WIB</p>
          <p className="mt-2 text-sm text-perpusnas-gray-600">
            {program ? `Sedang mengudara: ${program.nama_program}` : 'Program on-air belum dapat ditentukan.'}
          </p>
        </section>

        <section className="rounded-xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-perpusnas-blue">Aksi Cepat</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/admin/tanya-jawab"
              className="rounded-full bg-perpusnas-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-perpusnas-blue-dark"
            >
              Kelola Tanya Jawab
            </Link>
            <Link
              to="/admin/episode"
              className="rounded-full border border-perpusnas-blue/20 px-4 py-2.5 text-sm font-semibold text-perpusnas-blue"
            >
              Tambah Episode
            </Link>
            <Link
              to="/admin/laporan-error"
              className="rounded-full border border-perpusnas-blue/20 px-4 py-2.5 text-sm font-semibold text-perpusnas-blue"
            >
              Laporan Error
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
