import type { LucideIcon } from 'lucide-react'

type Props = {
  label: string
  nilai: string | number
  keterangan?: string
  ikon: LucideIcon
}

export default function StatCard({ label, nilai, keterangan, ikon: Ikon }: Props) {
  return (
    <div className="rounded-xl border border-perpusnas-blue/10 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-perpusnas-gray-600">{label}</p>
          <p className="mt-2 text-2xl font-bold text-perpusnas-blue">{nilai}</p>
          {keterangan && <p className="mt-1 text-xs text-perpusnas-gray-600">{keterangan}</p>}
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-perpusnas-blue-light text-perpusnas-blue">
          <Ikon size={19} aria-hidden="true" />
        </span>
      </div>
    </div>
  )
}
