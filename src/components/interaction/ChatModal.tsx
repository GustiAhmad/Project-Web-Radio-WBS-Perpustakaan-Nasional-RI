import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, MessageCircle, Send, X } from 'lucide-react'
import { useRealtimeChat } from '../../hooks/useRealtimeChat'
import { lacakEvent } from '../../services/ga4'
import {
  BATAS_NAMA,
  BATAS_PESAN,
  JEDA_KIRIM_MS,
  KUNCI_JEDA_KIRIM,
  type SesiChatAktif,
  type StatusKirim,
} from '../../types/chat.types'
import { bersihkanTeks } from '../../utils/stringUtils'
import { Pemuatan } from '../common/StateBox'

function bacaJedaTersimpan(): number {
  try {
    const nilai = Number(localStorage.getItem(KUNCI_JEDA_KIRIM) ?? 0)
    return Number.isFinite(nilai) ? nilai : 0
  } catch {
    return 0
  }
}

function jamTampil(waktu: string): string {
  return new Date(waktu).toLocaleTimeString('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
  })
}

type Props = {
  sesi: SesiChatAktif
  padaTutup: () => void
}

export default function ChatModal({ sesi, padaTutup }: Props) {
  const { pesan, memuat, galat, kirim } = useRealtimeChat(sesi.id)
  const [nama, setNama] = useState('')
  const [isi, setIsi] = useState('')
  const [anonim, setAnonim] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<StatusKirim>('idle')
  const [pesanStatus, setPesanStatus] = useState('')
  const [terakhirKirim, setTerakhirKirim] = useState(bacaJedaTersimpan)
  const [sisaDetik, setSisaDetik] = useState(0)
  const daftarRef = useRef<HTMLDivElement>(null)
  const sesiDilacakRef = useRef(false)

  useEffect(() => {
    if (sesiDilacakRef.current) return
    sesiDilacakRef.current = true
    lacakEvent('chat_dibuka', { nama_sesi: sesi.nama_sesi })
  }, [sesi.nama_sesi])

  useEffect(() => {
    function padaTekan(event: KeyboardEvent): void {
      if (event.key === 'Escape') padaTutup()
    }
    window.addEventListener('keydown', padaTekan)
    return () => window.removeEventListener('keydown', padaTekan)
  }, [padaTutup])

  useEffect(() => {
    function perbarui(): void {
      setSisaDetik(Math.max(0, Math.ceil((terakhirKirim + JEDA_KIRIM_MS - Date.now()) / 1000)))
    }
    perbarui()
    const pengatur = window.setInterval(perbarui, 1000)
    return () => window.clearInterval(pengatur)
  }, [terakhirKirim])

  useEffect(() => {
    const daftar = daftarRef.current
    if (daftar) daftar.scrollTop = daftar.scrollHeight
  }, [pesan.length])

  function simpanJeda(): void {
    const sekarang = Date.now()
    setTerakhirKirim(sekarang)
    try {
      localStorage.setItem(KUNCI_JEDA_KIRIM, String(sekarang))
    } catch {
      // Penyimpanan lokal bisa diblokir; jeda tetap berlaku selama modal terbuka.
    }
  }

  async function submit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    if (sisaDetik > 0 || status === 'mengirim') return

    const namaBersih = bersihkanTeks(nama, BATAS_NAMA)
    const isiBersih = bersihkanTeks(isi, BATAS_PESAN)

    if (honeypot) {
      simpanJeda()
      setIsi('')
      setHoneypot('')
      setStatus('sukses')
      setPesanStatus('Pesan terkirim.')
      return
    }
    if (namaBersih.length < 2) {
      setStatus('gagal')
      setPesanStatus('Isi nama dengan minimal 2 karakter.')
      return
    }
    if (isiBersih.length < 2) {
      setStatus('gagal')
      setPesanStatus('Tulis pesan dengan minimal 2 karakter.')
      return
    }

    setStatus('mengirim')
    setPesanStatus('')
    const galatKirim = await kirim(anonim ? 'Anonim' : namaBersih, isiBersih)
    if (galatKirim) {
      setStatus('gagal')
      setPesanStatus(galatKirim)
      return
    }

    lacakEvent('chat_pesan_kirim')
    simpanJeda()
    setIsi('')
    setHoneypot('')
    setStatus('sukses')
    setPesanStatus('Pesan terkirim ke studio.')
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-perpusnas-blue-dark/60 p-0 sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) padaTutup()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="judul-chat"
        className="flex h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:h-[640px] sm:max-h-[90vh] sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-3 bg-perpusnas-blue px-5 py-4 text-white">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-perpusnas-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-perpusnas-blue-dark">
              <MessageCircle size={12} aria-hidden="true" />
              Chat Live
            </span>
            <h2 id="judul-chat" className="mt-2 truncate text-lg font-bold">
              {sesi.nama_sesi}
            </h2>
            <p className="mt-0.5 text-xs text-perpusnas-blue-light">
              Pesan Anda dan pesan pendengar lain tampil di sini secara langsung.
            </p>
          </div>
          <button
            type="button"
            onClick={padaTutup}
            aria-label="Tutup chat"
            className="shrink-0 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>

        <div
          ref={daftarRef}
          aria-live="polite"
          aria-label="Daftar pesan chat"
          className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-perpusnas-gray-50 px-4 py-5"
        >
          {memuat ? (
            <Pemuatan pesan="Memuat pesan chat..." />
          ) : pesan.length === 0 ? (
            <p className="rounded-xl border border-dashed border-perpusnas-blue/20 bg-white px-4 py-8 text-center text-sm text-perpusnas-gray-600">
              Belum ada pesan. Jadilah yang pertama menyapa studio.
            </p>
          ) : (
            pesan.map((item) => (
              <article key={item.id} className="rounded-xl border border-perpusnas-blue/10 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="truncate text-xs font-bold text-perpusnas-blue">{item.nama}</p>
                  <time className="shrink-0 text-[11px] text-perpusnas-gray-600" dateTime={item.created_at}>
                    {jamTampil(item.created_at)}
                  </time>
                </div>
                <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed text-perpusnas-gray-900">
                  {item.isi}
                </p>
              </article>
            ))
          )}
        </div>

        <form onSubmit={(event) => void submit(event)} className="border-t border-perpusnas-blue/10 bg-white px-4 py-4">
          {galat && (
            <p role="alert" className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-800">
              {galat}
            </p>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={nama}
              onChange={(event) => setNama(event.target.value)}
              maxLength={BATAS_NAMA}
              autoComplete="name"
              aria-label="Nama pengirim"
              placeholder="Nama Anda"
              className="w-2/5 min-w-0 rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm outline-none focus:border-perpusnas-blue focus:ring-2 focus:ring-perpusnas-blue/20"
            />
            <input
              type="text"
              value={isi}
              onChange={(event) => setIsi(event.target.value)}
              maxLength={BATAS_PESAN}
              aria-label="Isi pesan"
              placeholder="Tulis salam, pertanyaan, atau pesan..."
              className="min-w-0 flex-1 rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm outline-none focus:border-perpusnas-blue focus:ring-2 focus:ring-perpusnas-blue/20"
            />
          </div>

          <label className="mt-2 flex items-center gap-2 text-xs text-perpusnas-gray-600">
            <input
              type="checkbox"
              checked={anonim}
              onChange={(event) => setAnonim(event.target.checked)}
              className="h-3.5 w-3.5 rounded border-perpusnas-blue/30 text-perpusnas-blue focus:ring-perpusnas-blue"
            />
            Kirim sebagai Anonim
          </label>

          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '-9999px',
              opacity: 0,
              pointerEvents: 'none',
              height: 0,
              width: 0,
              overflow: 'hidden',
            }}
          >
            <label htmlFor="chat-perusahaan">Perusahaan</label>
            <input
              id="chat-perusahaan"
              name="perusahaan"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </div>

          <div className="mt-3 flex items-center gap-3">
            <button
              type="submit"
              disabled={sisaDetik > 0 || status === 'mengirim'}
              className="inline-flex items-center gap-2 rounded-full bg-perpusnas-blue px-5 py-2.5 text-sm font-bold text-white transition hover:bg-perpusnas-blue-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'mengirim' ? (
                'Mengirim...'
              ) : (
                <>
                  <Send size={15} aria-hidden="true" />
                  Kirim
                </>
              )}
            </button>
            {sisaDetik > 0 && (
              <p className="text-xs text-perpusnas-gray-600">Kirim lagi dalam {sisaDetik} detik.</p>
            )}
          </div>

          {status === 'sukses' && (
            <p role="status" className="mt-2 flex items-center gap-1.5 text-xs font-medium text-green-800">
              <CheckCircle2 size={14} aria-hidden="true" />
              {pesanStatus}
            </p>
          )}
          {status === 'gagal' && (
            <p role="alert" className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-800">
              <AlertCircle size={14} aria-hidden="true" />
              {pesanStatus}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
