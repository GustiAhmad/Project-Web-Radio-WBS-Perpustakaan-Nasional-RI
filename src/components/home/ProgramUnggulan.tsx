import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ambilSeriUnggulan, type SeriKatalog } from '../../services/catalog'
import SeriCard from '../catalog/SeriCard'
import { Kosong, Pemuatan } from '../common/StateBox'

export default function ProgramUnggulan() {
  const [seri, setSeri] = useState<SeriKatalog[]>([])
  const [memuat, setMuat] = useState(true)

  useEffect(() => {
    let masihAktif = true
    void ambilSeriUnggulan().then((data) => {
      if (!masihAktif) return
      setSeri(data)
      setMuat(false)
    })
    return () => {
      masihAktif = false
    }
  }, [])

  return (
    <section aria-labelledby="judul-unggulan">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 id="judul-unggulan" className="text-xl font-bold text-perpusnas-blue sm:text-2xl">Program Unggulan</h2>
          <p className="mt-1 text-sm text-perpusnas-gray-600">Seri pilihan untuk mulai menjelajah arsip WBS.</p>
        </div>
        <Link to="/program" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-perpusnas-blue hover:underline">
          Semua seri
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-5">
        {memuat ? (
          <Pemuatan pesan="Memuat program unggulan..." />
        ) : seri.length === 0 ? (
          <Kosong judul="Belum ada seri unggulan" pesan="Daftar seri akan muncul setelah katalog tersedia." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {seri.map((item) => (
              <SeriCard key={item.id} seri={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
