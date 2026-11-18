import { useEffect, useMemo, useState } from 'react'
import CategoryFilter from '../components/catalog/CategoryFilter'
import SeriCard from '../components/catalog/SeriCard'
import { Kosong, Pemuatan } from '../components/common/StateBox'
import { ambilRingkasanEpisode, ambilSemuaSeri, type SeriKatalog } from '../services/catalog'

export default function ProgramListPage() {
  const [seri, setSeri] = useState<SeriKatalog[]>([])
  const [hitung, setHitung] = useState<Record<string, number>>({})
  const [kategori, setKategori] = useState('semua_kategori')
  const [memuat, setMuat] = useState(true)

  useEffect(() => {
    let masihAktif = true
    void Promise.all([ambilSemuaSeri(), ambilRingkasanEpisode()]).then(([daftarSeri, daftarEpisode]) => {
      if (!masihAktif) return
      const jumlah: Record<string, number> = {}
      for (const episode of daftarEpisode) {
        jumlah[episode.seri_id] = (jumlah[episode.seri_id] ?? 0) + 1
      }
      setSeri(daftarSeri)
      setHitung(jumlah)
      setMuat(false)
    })
    return () => {
      masihAktif = false
    }
  }, [])

  const tersaring = useMemo(
    () => (kategori === 'semua_kategori' ? seri : seri.filter((item) => item.kategori === kategori)),
    [seri, kategori]
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-perpusnas-blue">Jelajah Program</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-perpusnas-gray-600">
        Temukan berbagai seri siaran Widya Bahana Swara, termasuk program unggulan Ruang Literasi dan keranjang video
        Lainnya.
      </p>

      <div className="mt-8">
        <CategoryFilter aktif={kategori} onChange={setKategori} />
      </div>

      <div className="mt-6">
        {memuat ? (
          <Pemuatan pesan="Memuat katalog seri..." />
        ) : tersaring.length === 0 ? (
          <Kosong judul="Tidak ada seri pada topik ini" pesan="Pilih topik lain untuk melihat katalog yang tersedia." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tersaring.map((item) => (
              <SeriCard key={item.id} seri={item} jumlahEpisode={hitung[item.id] ?? 0} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
