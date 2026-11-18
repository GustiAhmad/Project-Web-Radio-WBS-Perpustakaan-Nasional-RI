import { useEffect, useState } from 'react'
import { ambilHalaman } from '../../services/catalog'
import type { HalamanStatis } from '../../types/database.types'
import { Pemuatan } from './StateBox'

type Props = {
  slug: string
  judulFallback: string
  isiFallback: string
}

export default function HalamanStatisView({ slug, judulFallback, isiFallback }: Props) {
  const [halaman, setHalaman] = useState<HalamanStatis | null>(null)
  const [memuat, setMuat] = useState(true)

  useEffect(() => {
    let masihAktif = true
    void ambilHalaman(slug).then((data) => {
      if (!masihAktif) return
      setHalaman(data)
      setMuat(false)
    })
    return () => {
      masihAktif = false
    }
  }, [slug])

  if (memuat) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Pemuatan pesan="Memuat halaman..." />
      </div>
    )
  }

  const judul = halaman?.judul ?? judulFallback
  const isi = halaman?.konten_markdown ?? isiFallback
  const paragraf = isi.split(/\n{2,}/).map((bagian) => bagian.trim()).filter(Boolean)

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-perpusnas-blue">{judul}</h1>
      {halaman?.ringkasan && <p className="mt-3 text-base text-perpusnas-gray-600">{halaman.ringkasan}</p>}
      <div className="mt-8 space-y-4 rounded-xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm sm:p-8">
        {paragraf.map((bagian, indeks) => (
          <p key={indeks} className="text-sm leading-relaxed text-perpusnas-gray-600 sm:text-base">
            {bagian}
          </p>
        ))}
      </div>
    </div>
  )
}
