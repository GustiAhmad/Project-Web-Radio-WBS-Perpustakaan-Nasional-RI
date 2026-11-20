import { Loader2, Inbox } from 'lucide-react'

export function Pemuatan({ pesan = 'Memuat data...' }: { pesan?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-xl border border-perpusnas-blue/10 bg-white p-10 text-sm text-perpusnas-gray-600">
      <Loader2 size={18} aria-hidden="true" className="animate-spin text-perpusnas-blue" />
      {pesan}
    </div>
  )
}

export function Kosong({ judul, pesan }: { judul: string; pesan: string }) {
  return (
    <div className="rounded-xl border border-dashed border-perpusnas-blue/20 bg-white p-10 text-center">
      <Inbox size={24} aria-hidden="true" className="mx-auto text-perpusnas-blue/60" />
      <p className="mt-3 font-semibold text-perpusnas-gray-900">{judul}</p>
      <p className="mt-1 text-sm text-perpusnas-gray-600">{pesan}</p>
    </div>
  )
}

export function PenandaKosong({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
      {label} kosong
    </span>
  )
}
