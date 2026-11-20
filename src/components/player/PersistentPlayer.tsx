import { useEffect, useState } from 'react'
import { Loader2, MessageCircle, Pause, Play, Radio, Volume2, VolumeX } from 'lucide-react'
import { useAudio } from '../../context/AudioContext'
import ChatModal from '../interaction/ChatModal'
import { useOnAirProgram } from '../../hooks/useOnAirProgram'
import { useSesiChatAktif } from '../../hooks/useSesiChatAktif'

export default function PersistentPlayer() {
  const {
    isPlaying,
    isBuffering,
    isOffline,
    volume,
    muted,
    error,
    toggle,
    aturVolume,
    toggleMute,
  } = useAudio()
  const { program, berikutnya } = useOnAirProgram()
  const { sesi } = useSesiChatAktif()
  const [chatTerbuka, setChatTerbuka] = useState(false)

  useEffect(() => {
    if (!sesi) setChatTerbuka(false)
  }, [sesi])

  const teksStatus = error
    ? error
    : isBuffering
      ? 'Menghubungkan ke siaran...'
      : isOffline
        ? 'Siaran sedang terganggu'
        : isPlaying
          ? 'Sedang mengudara'
          : 'Tekan putar untuk mendengarkan siaran langsung'

  return (
    <>
      <div
        role="region"
        aria-label="Pemutar siaran radio"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-perpusnas-blue-dark text-white shadow-[0_-4px_16px_rgba(0,0,0,0.15)]"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-3 sm:gap-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-perpusnas-gold text-perpusnas-blue-dark">
              <Radio size={18} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {program?.nama_program ?? 'Radio WBS'}
              </p>
              <p className="truncate text-xs text-white/60" aria-live="polite">
                {berikutnya ? `Berikutnya: ${berikutnya.nama_program}` : 'Jadwal siaran menyusul'}
              </p>
            </div>
          </div>

          <p
            className={`mx-2 hidden min-w-0 truncate text-center text-xs lg:block ${
              isOffline || error ? 'text-perpusnas-gold-light' : 'text-white/60'
            }`}
            aria-live="polite"
          >
            {teksStatus}
          </p>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {sesi && (
              <button
                type="button"
                onClick={() => setChatTerbuka(true)}
                aria-label="Buka chat live"
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white/10 px-3 text-xs font-semibold text-white transition hover:bg-white/20"
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span className="hidden sm:inline">Chat</span>
              </button>
            )}

            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? 'Nyalakan suara' : 'Matikan suara'}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {muted || volume === 0 ? (
                <VolumeX size={18} aria-hidden="true" />
              ) : (
                <Volume2 size={18} aria-hidden="true" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={muted ? 0 : volume}
              onChange={(event) => aturVolume(Number(event.target.value))}
              aria-label="Volume siaran"
              className="hidden h-1 w-24 cursor-pointer accent-perpusnas-gold sm:block"
            />

            <button
              type="button"
              onClick={toggle}
              disabled={isBuffering}
              aria-label={isPlaying ? 'Jeda siaran radio' : 'Putar siaran radio'}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-perpusnas-gold text-perpusnas-blue-dark transition hover:bg-yellow-400 disabled:cursor-wait disabled:opacity-70"
            >
              {isBuffering ? (
                <Loader2 size={18} aria-hidden="true" className="animate-spin" />
              ) : isPlaying ? (
                <Pause size={18} aria-hidden="true" />
              ) : (
                <Play size={18} aria-hidden="true" className="ml-0.5" />
              )}
            </button>
          </div>
        </div>
      </div>
      {chatTerbuka && sesi && <ChatModal sesi={sesi} padaTutup={() => setChatTerbuka(false)} />}
    </>
  )
}
