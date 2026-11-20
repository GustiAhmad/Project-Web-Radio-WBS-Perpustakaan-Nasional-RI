import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  Bug,
  CalendarDays,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MessagesSquare,
  Settings,
  UserCog,
  UserRound,
  Users,
  Video,
  X,
  Layers3,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useRealtimeLaporan } from '../../hooks/useRealtimeLaporan'

type MenuItem = {
  ke: string
  label: string
  ikon: typeof Bug
  akhir: boolean
  laporan?: boolean
}

const menuUtama: MenuItem[] = [
  { ke: '/admin', label: 'Dasbor', ikon: LayoutDashboard, akhir: true },
  { ke: '/admin/profil', label: 'Profil Saya', ikon: UserRound, akhir: false },
  { ke: '/admin/chat', label: 'Inisiasi Sesi Chat', ikon: MessagesSquare, akhir: false },
  { ke: '/admin/jadwal', label: 'Jadwal Siaran', ikon: CalendarDays, akhir: false },
  { ke: '/admin/episode', label: 'Kelola Episode', ikon: Video, akhir: false },
  { ke: '/admin/seri', label: 'Kelola Seri', ikon: Layers3, akhir: false },
  { ke: '/admin/acara', label: 'Acara Mendatang', ikon: CalendarDays, akhir: false },
  { ke: '/admin/halaman', label: 'Halaman Statis', ikon: FileText, akhir: false },
  { ke: '/admin/penyiar', label: 'Kelola Penyiar', ikon: UserCog, akhir: false },
  { ke: '/admin/pengguna', label: 'Kelola Pengguna', ikon: Users, akhir: false },
  { ke: '/admin/laporan-error', label: 'Laporan Error', ikon: Bug, akhir: false, laporan: true },
]

function kelasMenu(isActive: boolean) {
  return isActive
    ? 'flex items-center gap-3 rounded-lg bg-perpusnas-blue-light px-3 py-2.5 text-sm font-semibold text-perpusnas-blue'
    : 'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white'
}

export default function AdminLayout() {
  const { profil, peran, keluar } = useAuth()
  const { jumlahBaru } = useRealtimeLaporan()
  const [menuBuka, setMenuBuka] = useState(false)
  const navigate = useNavigate()

  async function keluarPanel(): Promise<void> {
    await keluar()
    navigate('/admin/masuk', { replace: true })
  }

  const daftarMenu = [
    ...menuUtama,
    ...(peran === 'superadmin'
      ? [{ ke: '/admin/pengaturan', label: 'Pengaturan Situs', ikon: Settings, akhir: false }]
      : []),
  ]

  return (
    <div className="min-h-screen bg-perpusnas-gray-50">
      <div className="lg:flex">
        <aside
          className={`${
            menuBuka ? 'block' : 'hidden'
          } bg-perpusnas-blue-dark lg:sticky lg:top-0 lg:block lg:h-screen lg:w-64 lg:shrink-0`}
        >
          <div className="flex items-center gap-3 px-5 py-5">
            <img
              src={`${import.meta.env.BASE_URL}LOGO-PERPUSNAS.svg`}
              alt="Logo Perpustakaan Nasional RI"
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-lg bg-white object-contain p-1"
            />
            <span className="leading-tight text-white">
              <span className="block text-sm font-bold">Panel Pengelola</span>
              <span className="block text-[11px] text-white/60">Radio &amp; Siniar WBS</span>
            </span>
            <button
              type="button"
              onClick={() => setMenuBuka(false)}
              aria-label="Tutup menu panel"
              className="ml-auto text-white/70 lg:hidden"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Navigasi panel admin" className="space-y-1 px-3 pb-6">
            {daftarMenu.map((item) => {
              const Ikon = item.ikon
              return (
                <NavLink
                  key={item.ke}
                  to={item.ke}
                  end={item.akhir}
                  onClick={() => setMenuBuka(false)}
                  className={({ isActive }) => kelasMenu(isActive)}
                >
                  <Ikon size={18} aria-hidden="true" />
                  <span className="flex-1">{item.label}</span>
                  {item.laporan && jumlahBaru > 0 && (
                    <span className="rounded-full bg-perpusnas-gold px-2 py-0.5 text-[11px] font-bold text-perpusnas-blue-dark">
                      {jumlahBaru}
                    </span>
                  )}
                </NavLink>
              )
            })}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-perpusnas-blue/10 bg-white px-4 sm:px-6">
            <button
              type="button"
              onClick={() => setMenuBuka((buka) => !buka)}
              aria-label="Buka menu panel"
              aria-expanded={menuBuka}
              className="rounded-lg border border-perpusnas-blue/20 p-2 text-perpusnas-blue lg:hidden"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
            <img
              src={profil?.foto_url ?? `${import.meta.env.BASE_URL}placeholder-penyiar.svg`}
              alt={profil?.foto_url ? `Foto ${profil.nama_lengkap}` : 'Foto profil belum tersedia'}
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 rounded-full bg-perpusnas-blue-light object-contain"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-perpusnas-gray-900">
                {profil?.nama_lengkap ?? 'Pengelola'}
              </p>
              <p className="text-[11px] uppercase tracking-wide text-perpusnas-gray-600">
                {peran === 'superadmin' ? 'Superadmin' : 'Admin'} · @{profil?.nama_pengguna ?? 'pengelola'}
              </p>
            </div>
            <a
              href="/"
              className="hidden items-center gap-1.5 rounded-lg border border-perpusnas-blue/20 px-3 py-2 text-xs font-semibold text-perpusnas-blue sm:inline-flex"
            >
              <ExternalLink size={14} aria-hidden="true" />
              Lihat Situs
            </a>
            <button
              type="button"
              onClick={() => void keluarPanel()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-perpusnas-gray-100 px-3 py-2 text-xs font-semibold text-perpusnas-gray-900"
            >
              <LogOut size={14} aria-hidden="true" />
              Keluar
            </button>
          </header>

          <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
