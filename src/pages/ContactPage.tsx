import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-perpusnas-blue">Kontak &amp; WhatsApp</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-perpusnas-gray-600">
        Hubungi studio WBS untuk saran, kritik, dan koordinasi siaran.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <article className="rounded-xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-perpusnas-gray-900">Alamat Studio</h2>
          <p className="mt-3 flex gap-3 text-sm leading-relaxed text-perpusnas-gray-600">
            <MapPin size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-perpusnas-blue" />
            Gedung Fasilitas Layanan Perpustakaan Nasional RI, Jl. Medan Merdeka Selatan No. 11, Jakarta Pusat 10110
          </p>
        </article>

        <article className="rounded-xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-perpusnas-gray-900">Hubungi Kami</h2>
          <ul className="mt-3 space-y-3 text-sm text-perpusnas-gray-600">
            <li className="flex items-center gap-3">
              <Mail size={18} aria-hidden="true" className="shrink-0 text-perpusnas-blue" />
              <a href="mailto:wbsradio@perpusnas.go.id" className="hover:text-perpusnas-blue">wbsradio@perpusnas.go.id</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} aria-hidden="true" className="shrink-0 text-perpusnas-blue" />
              (021) 3870070
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle size={18} aria-hidden="true" className="shrink-0 text-perpusnas-blue" />
              <a
                href="https://wa.me/628111977777"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-perpusnas-blue"
              >
                Chat WhatsApp
              </a>
            </li>
          </ul>
        </article>
      </div>
    </div>
  )
}
