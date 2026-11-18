import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { lacakEvent } from '../services/ga4'

type StatusAudio = 'idle' | 'buffering' | 'playing' | 'paused' | 'offline'

type NilaiAudio = {
  status: StatusAudio
  isPlaying: boolean
  isBuffering: boolean
  isOffline: boolean
  volume: number
  muted: boolean
  error: string | null
  toggle: () => void
  aturVolume: (nilai: number) => void
  toggleMute: () => void
}

const STREAM_URL =
  import.meta.env.VITE_ICECAST_STREAM_URL?.trim() || 'https://widya-bahana-suara.perpusnas.go.id/live'
const VOLUME_AWAL = 0.8
const BATAS_PERCOBAAN = 3

const AudioContext = createContext<NilaiAudio | null>(null)

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const inginPutarRef = useRef(false)
  const sudahLacakPutarRef = useRef(false)
  const percobaanRef = useRef(0)
  const timerRef = useRef<number | null>(null)

  const [status, setStatus] = useState<StatusAudio>('idle')
  const [volume, setVolume] = useState(VOLUME_AWAL)
  const [muted, setMuted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const jadwalkanUlang = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !inginPutarRef.current) return

    if (percobaanRef.current >= BATAS_PERCOBAAN) {
      setStatus('offline')
      setError('Gagal memuat siaran. Periksa koneksi internet Anda.')
      inginPutarRef.current = false
      return
    }

    percobaanRef.current += 1
    setStatus('buffering')
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      if (!inginPutarRef.current) return
      audio.load()
      void audio.play().catch(jadwalkanUlang)
    }, percobaanRef.current * 1500)
  }, [])

  useEffect(() => {
    const audio = new Audio(STREAM_URL)
    audio.preload = 'none'
    audio.volume = VOLUME_AWAL
    audioRef.current = audio

    const saatPlaying = () => {
      percobaanRef.current = 0
      setError(null)
      setStatus('playing')
      if (!sudahLacakPutarRef.current) {
        sudahLacakPutarRef.current = true
        lacakEvent('radio_play')
      }
    }
    const saatWaiting = () => setStatus('buffering')
    const saatError = () => {
      if (inginPutarRef.current) jadwalkanUlang()
    }
    const saatPause = () => {
      setStatus(inginPutarRef.current ? 'buffering' : 'paused')
    }
    const saatVisibilitas = () => {
      if (document.visibilityState === 'visible' && inginPutarRef.current && audio.paused) {
        void audio.play().catch(jadwalkanUlang)
      }
    }

    audio.addEventListener('playing', saatPlaying)
    audio.addEventListener('waiting', saatWaiting)
    audio.addEventListener('error', saatError)
    audio.addEventListener('pause', saatPause)
    document.addEventListener('visibilitychange', saatVisibilitas)

    return () => {
      audio.pause()
      audio.removeEventListener('playing', saatPlaying)
      audio.removeEventListener('waiting', saatWaiting)
      audio.removeEventListener('error', saatError)
      audio.removeEventListener('pause', saatPause)
      document.removeEventListener('visibilitychange', saatVisibilitas)
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
      audioRef.current = null
    }
  }, [jadwalkanUlang])

  const putar = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    inginPutarRef.current = true
    percobaanRef.current = 0
    setError(null)
    setStatus('buffering')
    try {
      await audio.play()
    } catch {
      jadwalkanUlang()
    }
  }, [jadwalkanUlang])

  const jeda = useCallback(() => {
    inginPutarRef.current = false
    sudahLacakPutarRef.current = false
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    audioRef.current?.pause()
    setStatus('paused')
  }, [])

  const toggle = useCallback(() => {
    if (inginPutarRef.current) jeda()
    else void putar()
  }, [jeda, putar])

  const aturVolume = useCallback((nilai: number) => {
    const bersih = Math.min(1, Math.max(0, nilai))
    setVolume(bersih)
    if (audioRef.current) {
      audioRef.current.volume = bersih
      if (bersih > 0) audioRef.current.muted = false
    }
    if (bersih > 0) setMuted(false)
  }, [])

  const toggleMute = useCallback(() => {
    if (volume === 0) {
      aturVolume(VOLUME_AWAL)
      return
    }
    setMuted((nilai) => {
      const berikutnya = !nilai
      if (audioRef.current) audioRef.current.muted = berikutnya
      return berikutnya
    })
  }, [volume, aturVolume])

  const nilai = useMemo<NilaiAudio>(
    () => ({
      status,
      isPlaying: status === 'playing',
      isBuffering: status === 'buffering',
      isOffline: status === 'offline',
      volume,
      muted,
      error,
      toggle,
      aturVolume,
      toggleMute,
    }),
    [status, volume, muted, error, toggle, aturVolume, toggleMute]
  )

  return <AudioContext.Provider value={nilai}>{children}</AudioContext.Provider>
}

export function useAudio(): NilaiAudio {
  return useContext(AudioContext)!
}
