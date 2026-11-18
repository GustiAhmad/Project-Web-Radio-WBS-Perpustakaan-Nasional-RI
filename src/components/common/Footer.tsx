import { Link } from 'react-router-dom'
import { Facebook, Instagram, Mail, Youtube } from 'lucide-react'

const mediaSosial = [
  { label: 'YouTube WBS', href: 'https://www.youtube.com/@WBSRadioPerpusnas', ikon: Youtube },
  { label: 'Instagram', href: 'https://www.instagram.com/perpusnas.go.id', ikon: Instagram },
  { label: 'Facebook', href: 'https://www.facebook.com/ayokeperpusnas', ikon: Facebook },
]

export default function Footer() {
  return (
    <footer className="bg-perpusnas-blue-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="inline-flex rounded-lg bg-white p-2">
            <img
              src="/LOGO-PERPUSNAS.svg"
              alt="Logo Perpustakaan Nasional RI"
              className="h-14 w-auto object-contain"
            />
          </div>
          <p className="mt-4 font-bold">WBS Perpusnas</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Layanan Radio dan Siniar Widya Bahana Swara Perpustakaan Nasional RI. Siaran literasi untuk seluruh pemustaka,
            kapan saja dan di mana saja.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-perpusnas-gold">Tautan Cepat</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><Link className="hover:text-white" to="/jadwal">Jadwal Siaran</Link></li>
            <li><Link className="hover:text-white" to="/program">Jelajah Program</Link></li>
            <li><Link className="hover:text-white" to="/tentang">Tentang WBS</Link></li>
            <li><Link className="hover:text-white" to="/kontak">Kontak &amp; WhatsApp</Link></li>
            <li><Link className="hover:text-white" to="/kebijakan-privasi">Kebijakan Privasi</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-perpusnas-gold">Hubungi Studio</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Gedung Fasilitas Layanan Perpustakaan Nasional RI<br />
            Jl. Medan Merdeka Selatan No. 11, Jakarta Pusat 10110
          </p>
          <a
            href="mailto:wbsradio@perpusnas.go.id"
            className="mt-3 inline-flex items-center gap-2 text-sm text-white hover:text-perpusnas-gold"
          >
            <Mail size={16} aria-hidden="true" />
            wbsradio@perpusnas.go.id
          </a>
          <div className="mt-5 flex gap-3">
            {mediaSosial.map(({ label, href, ikon: Ikon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full border border-white/20 p-2 text-white/80 transition-colors hover:border-perpusnas-gold hover:text-perpusnas-gold"
              >
                <Ikon size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Perpustakaan Nasional RI. Seluruh hak dilindungi.</p>
          <p>Pusat Jasa Informasi Perpustakaan dan Pengelolaan Naskah Nusantara (PUJASINTARA)</p>
        </div>
      </div>
    </footer>
  )
}
