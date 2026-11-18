import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

type Item = { label: string; ke?: string }

export default function Breadcrumbs({ items }: { items: Item[] }) {
  return (
    <nav aria-label="Peta halaman" className="mb-6 flex flex-wrap items-center gap-1 text-xs text-perpusnas-gray-600">
      <Link to="/" className="hover:text-perpusnas-blue hover:underline">
        Beranda
      </Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1">
          <ChevronRight size={12} aria-hidden="true" />
          {item.ke ? (
            <Link to={item.ke} className="hover:text-perpusnas-blue hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-perpusnas-gray-900">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
