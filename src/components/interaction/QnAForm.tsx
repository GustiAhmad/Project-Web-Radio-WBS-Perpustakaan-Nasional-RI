import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, LockKeyhole, Radio, Send, Youtube } from 'lucide-react'
import { useRealtimeQnA } from '../../hooks/useRealtimeQnA'
import { lacakEvent } from '../../services/ga4'
import { supabase } from '../../services/supabase'
import {
  BATAS_NAMA,
  BATAS_PERTANYAAN,
  JEDA_KIRIM_MS,
  KUNCI_JEDA_KIRIM,
  type StatusKirim,
} from '../../types/qna.types'
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

export default function QnAForm() {
  const { sesi, memuat, modeLive } = useRealtimeQnA()
  const [nama, setNama] = useState('')
  const [pertanyaan, setPertanyaan] = useState('')
  const [anonim, setAnonim] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<StatusKirim>('idle')
  const [pesan, setPesan] = useState('')
  const [terakhirKirim, setTerakhirKirim] = useState(bacaJedaTersimpan)
  const [sisaDetik, setSisaDetik] = useState(0)
  const sesiDilacakRef = useRef<string | null>(null)

  useEffect(() => {
    if (memuat || !sesi || sesiDilacakRef.current === sesi.id) return
    sesiDilacakRef.current = sesi.id
    lacakEvent('qna_sesi_dibuka')
  }, [sesi, memuat])

  useEffect(() => {
    function perbarui(): void {
      setSisaDetik(Math.max(0, Math.ceil((terakhirKirim + JEDA_KIRIM_MS - Date.now()) / 1000)))
    }
    perbarui()
    const pengatur = window.setInterval(perbarui, 1000)
    return () => window.clearInterval(pengatur)
  }, [terakhirKirim])

  function selesaiTanpaPenyimpanan(): void {
    const sekarang = Date.now()
    setTerakhirKirim(sekarang)
    try {
      localStorage.setItem(KUNCI_JEDA_KIRIM, String(sekarang))
    } catch {
      // Penyimpanan lokal bisa diblokir; jeda tetap berlaku di sesi ini.
    }
    setNama('')
    setPertanyaan('')
    setHoneypot('')
    setStatus('sukses')
    setPesan(modeLive ? 'Pertanyaan terkirim ke studio live.' : 'Pertanyaan terkirim ke studio.')
  }

  async function kirim(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    if (!sesi || sisaDetik > 0 || status === 'mengirim') return

    const isiNama = bersihkanTeks(nama, BATAS_NAMA)
    const isiPertanyaan = bersihkanTeks(pertanyaan, BATAS_PERTANYAAN)

    if (honeypot) {
      selesaiTanpaPenyimpanan()
      return
    }
    if (isiNama.length < 2) {
      setStatus('gagal')
      setPesan('Isi nama dengan minimal 2 karakter.')
      return
    }
    if (isiPertanyaan.length < 10) {
      setStatus('gagal')
      setPesan('Tulis pertanyaan minimal 10 karakter.')
      return
    }
    if (!supabase) {
      setStatus('gagal')
      setPesan('Koneksi ke studio belum tersedia. Periksa pengaturan Supabase.')
      return
    }

    setStatus('mengirim')
    setPesan('')
    const { error } = await supabase.from('pertanyaan').insert({
      sesi_id: sesi.id,
      nama_pengirim: anonim ? 'Anonim' : isiNama,
      isi_pertanyaan: isiPertanyaan,
    })

    if (error) {
      setStatus('gagal')
      setPesan(`Gagal mengirim pertanyaan: ${error.message}`)
      return
    }
    lacakEvent('submit_pertanyaan', { mode: modeLive ? 'live_youtube' : 'on_air' })
    selesaiTanpaPenyimpanan()
  }

  if (memuat) {
    return (
      <section id="tanya-jawab" aria-label="Tanya jawab on-air" className="mt-6 scroll-mt-6">
        <Pemuatan pesan="Memeriksa sesi tanya jawab..." />
      </section>
    )
  }

  if (!sesi) {
    return (
      <section id="tanya-jawab" aria-labelledby="judul-qna" className="mt-6 scroll-mt-6">
        <div className="rounded-2xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm sm:p-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-perpusnas-gray-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-perpusnas-gray-600">
            <LockKeyhole size={13} aria-hidden="true" />
            Sesi Belum Dibuka
          </span>
          <h2 id="judul-qna" className="mt-3 text-xl font-bold text-perpusnas-blue sm:text-2xl">
            Tanya Jawab On-Air
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-perpusnas-gray-600">
            Belum ada sesi tanya jawab saat ini. Kartu ini aktif sendiri saat petugas studio membuka sesi, tanpa perlu
            menyegarkan halaman.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="tanya-jawab" aria-labelledby="judul-qna" className="mt-6 scroll-mt-6">
      <div className="overflow-hidden rounded-2xl border border-perpusnas-blue/10 bg-white shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 bg-perpusnas-blue px-6 py-6 text-white sm:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-perpusnas-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-perpusnas-blue-dark">
              {modeLive ? <Youtube size={13} aria-hidden="true" /> : <Radio size={13} aria-hidden="true" />}
              {modeLive ? 'Acara Live' : 'Sesi Terbuka'}
            </span>
            <h2 id="judul-qna" className="mt-3 text-xl font-bold sm:text-2xl">
              {modeLive ? 'Tanya Jawab Acara Live' : 'Tanya Jawab On-Air'}
            </h2>
            <p className="mt-1 text-sm text-perpusnas-blue-light">
              {modeLive
                ? 'Kirim pertanyaan untuk webinar YouTube yang sedang berlangsung.'
                : `Kirim pertanyaan untuk ${sesi.nama_program}.`}
            </p>
          </div>
          <p className="text-xs text-white/70">
            {sesi.jam_mulai.slice(0, 5)}–{sesi.jam_selesai.slice(0, 5)} WIB
          </p>
        </div>

        <form onSubmit={(e) => void kirim(e)} className="grid gap-5 px-6 py-6 sm:px-8 sm:py-8 md:grid-cols-2">
          <div>
            <label htmlFor="qna-nama" className="block text-sm font-semibold text-perpusnas-gray-900">
              Nama
            </label>
            <input
              id="qna-nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              maxLength={BATAS_NAMA}
              autoComplete="name"
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 bg-white px-3 py-2.5 text-sm text-perpusnas-gray-900 outline-none focus:border-perpusnas-blue focus:ring-2 focus:ring-perpusnas-blue/20"
            />
            <label htmlFor="qna-anonim" className="mt-3 flex items-center gap-2 text-xs text-perpusnas-gray-600">
              <input
                id="qna-anonim"
                type="checkbox"
                checked={anonim}
                onChange={(e) => setAnonim(e.target.checked)}
                className="h-4 w-4 rounded border-perpusnas-blue/30 text-perpusnas-blue focus:ring-perpusnas-blue"
              />
              Kirim sebagai Anonim
            </label>
            <p className="mt-1 text-[11px] text-perpusnas-gray-600">
              Nama tetap diisi, tetapi studio hanya melihat “Anonim”.
            </p>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="qna-pertanyaan" className="block text-sm font-semibold text-perpusnas-gray-900">
              Pertanyaan
            </label>
            <textarea
              id="qna-pertanyaan"
              value={pertanyaan}
              onChange={(e) => setPertanyaan(e.target.value)}
              maxLength={BATAS_PERTANYAAN}
              rows={4}
              placeholder="Tulis pertanyaan Anda untuk studio..."
              className="mt-2 w-full resize-y rounded-lg border border-perpusnas-blue/20 bg-white px-3 py-2.5 text-sm text-perpusnas-gray-900 outline-none focus:border-perpusnas-blue focus:ring-2 focus:ring-perpusnas-blue/20"
            />
            <p className="mt-1 text-right text-[11px] text-perpusnas-gray-600">
              {pertanyaan.length}/{BATAS_PERTANYAAN} karakter
            </p>
          </div>

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
            <label htmlFor="qna-perusahaan">Perusahaan</label>
            <input
              id="qna-perusahaan"
              name="perusahaan"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={sisaDetik > 0 || status === 'mengirim'}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-perpusnas-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-perpusnas-blue-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'mengirim' ? (
                'Mengirim...'
              ) : sisaDetik > 0 ? (
                `Kirim lagi dalam ${sisaDetik} detik`
              ) : (
                <>
                  <Send size={16} aria-hidden="true" />
                  {modeLive ? 'Kirim ke Studio Live' : 'Kirim Pertanyaan'}
                </>
              )}
            </button>

            {status === 'sukses' && (
              <p
                role="status"
                className="mt-4 flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800"
              >
                <CheckCircle2 size={17} aria-hidden="true" className="mt-0.5 shrink-0" />
                {pesan}
              </p>
            )}
            {status === 'gagal' && (
              <p
                role="alert"
                className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
              >
                <AlertCircle size={17} aria-hidden="true" className="mt-0.5 shrink-0" />
                {pesan}
              </p>
            )}
            {sisaDetik > 0 && status !== 'sukses' && (
              <p className="mt-3 text-xs text-perpusnas-gray-600">
                Satu pertanyaan setiap 30 detik. Formulir terbuka lagi dalam {sisaDetik} detik.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
