import { useSearchParams } from 'react-router-dom'

export default function SearchPage() {
  const [params] = useSearchParams()
  const kataKunci = params.get('q')?.trim() ?? ''

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-perpusnas-blue">Hasil Pencarian</h1>
      {kataKunci ? (
        <p className="mt-3 text-base text-perpusnas-gray-600">
          Kata kunci: <span className="font-semibold text-perpusnas-gray-900">“{kataKunci}”</span>
        </p>
      ) : (
        <p className="mt-3 text-base text-perpusnas-gray-600">Masukkan kata kunci pada bilah pencarian di atas.</p>
      )}
      <div className="mt-8 rounded-xl border border-dashed border-perpusnas-blue/20 bg-white p-10 text-center text-sm text-perpusnas-gray-600">
        Hasil pencarian seri dan episode akan tersedia pada tahap berikutnya.
      </div>
    </div>
  )
}
