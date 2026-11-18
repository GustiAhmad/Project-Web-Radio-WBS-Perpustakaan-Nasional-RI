import { useState, type FormEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, Search, X } from 'lucide-react'

const navigasi = [
  { label: 'Beranda', ke: '/' },
  { label: 'Jadwal', ke: '/jadwal' },
  { label: 'Program', ke: '/program' },
  { label: 'Tentang', ke: '/tentang' },
  { label: 'Kontak', ke: '/kontak' },
]

function kelasTautan(isActive: boolean, seluler = false) {
  const dasar = seluler
    ? 'block rounded-lg px-4 py-3 text-sm font-medium'
    : 'rounded-lg px-3 py-2 text-sm font-medium'

  return isActive
    ? `${dasar} bg-perpusnas-blue-light text-perpusnas-blue`
    : `${dasar} text-perpusnas-gray-600 hover:bg-perpusnas-gray-50 hover:text-perpusnas-blue`
}

export default function Header() {
  const [menuBuka, setMenuBuka] = useState(false)
  const [kataKunci, setKataKunci] = useState('')
  const navigate = useNavigate()

  function cari(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const q = kataKunci.trim()
    if (!q) return
    navigate(`/cari?q=${encodeURIComponent(q)}`)
    setKataKunci('')
    setMenuBuka(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-perpusnas-blue/10 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="Beranda Radio & Siniar WBS Perpusnas"
          onClick={() => setMenuBuka(false)}
        >
          <img
            src="/LOGO-PERPUSNAS.svg"
            alt="Logo Perpustakaan Nasional RI"
            className="h-10 w-auto shrink-0 object-contain"
          />
          <span className="leading-tight">
            <span className="block text-sm font-bold text-perpusnas-blue">WBS Perpusnas</span>
            <span className="block text-[11px] text-perpusnas-gray-600">Radio &amp; Siniar</span>
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="mx-auto hidden items-center gap-1 lg:flex">
          {navigasi.map((item) => (
            <NavLink
              key={item.ke}
              to={item.ke}
              end={item.ke === '/'}
              className={({ isActive }) => kelasTautan(isActive)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={cari} role="search" className="hidden w-60 lg:block">
          <div className="relative">
            <Search
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-perpusnas-gray-600"
            />
            <input
              type="search"
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
              placeholder="Cari program atau episode"
              aria-label="Cari program atau episode"
              className="w-full rounded-full border border-perpusnas-blue/20 bg-perpusnas-gray-50 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-perpusnas-gray-600/70 focus:border-perpusnas-blue focus:ring-2 focus:ring-perpusnas-blue/20"
            />
          </div>
        </form>

        <button
          type="button"
          onClick={() => setMenuBuka((buka) => !buka)}
          aria-label={menuBuka ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={menuBuka}
          aria-controls="menu-seluler"
          className="ml-auto rounded-lg border border-perpusnas-blue/20 p-2 text-perpusnas-blue lg:hidden"
        >
          {menuBuka ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {menuBuka && (
        <div id="menu-seluler" className="border-t border-perpusnas-blue/10 bg-white px-4 py-4 lg:hidden">
          <form onSubmit={cari} role="search" className="mb-3">
            <div className="relative">
              <Search
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-perpusnas-gray-600"
              />
              <input
                type="search"
                value={kataKunci}
                onChange={(e) => setKataKunci(e.target.value)}
                placeholder="Cari program atau episode"
                aria-label="Cari program atau episode"
                className="w-full rounded-full border border-perpusnas-blue/20 bg-perpusnas-gray-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-perpusnas-blue focus:ring-2 focus:ring-perpusnas-blue/20"
              />
            </div>
          </form>
          <nav aria-label="Navigasi seluler" className="space-y-1">
            {navigasi.map((item) => (
              <NavLink
                key={item.ke}
                to={item.ke}
                end={item.ke === '/'}
                className={({ isActive }) => kelasTautan(isActive, true)}
                onClick={() => setMenuBuka(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
