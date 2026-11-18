import { Play, Radio, Volume2 } from 'lucide-react'

export default function PlayerPlaceholder() {
  return (
    <div
      role="status"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-perpusnas-blue-dark text-white shadow-[0_-4px_16px_rgba(0,0,0,0.15)]"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-perpusnas-gold text-perpusnas-blue-dark">
            <Radio size={18} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Radio WBS</p>
            <p className="truncate text-xs text-white/60">Siaran Radio WBS</p>
          </div>
        </div>

        <p className="mx-auto hidden text-center text-xs text-white/60 sm:block">
          Pemutar audio siaran langsung akan tersedia segera.
        </p>

        <div className="ml-auto flex shrink-0 items-center gap-3 sm:ml-0">
          <Volume2 size={18} aria-hidden="true" className="hidden text-white/40 sm:block" />
          <button
            type="button"
            disabled
            aria-label="Putar siaran radio"
            className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full bg-white/10 text-white/40"
          >
            <Play size={18} aria-hidden="true" className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
