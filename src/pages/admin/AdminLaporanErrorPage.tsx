import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, ExternalLink, Image as ImageIcon, RefreshCw } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../services/supabase'
import { bersihkanTeks } from '../../utils/stringUtils'
import {
  BATAS_DESKRIPSI,
  BATAS_JUDUL,
  BATAS_LANGKAH,
  MIME_SCREENSHOT,
  UKURAN_MAKSIMAL_SCREENSHOT,
  kelasKeparahan,
  kelasStatusLaporan,
  labelKeparahan,
  labelStatusLaporan,
} from '../../types/laporan.types'
import type { Database, LaporanError, StatusLaporan, TingkatKeparahan } from '../../types/database.types'
import { Kosong, Pemuatan } from '../../components/common/StateBox'
import { formatTanggal } from '../../utils/formatters'

export default function AdminLaporanErrorPage() {
  const { profil, peran, penggunaAuth } = useAuth()
  const [laporan, setLaporan] = useState<LaporanError[]>([])
  const [memuat, setMuat] = useState(true)
  const [galatDaftar, setGalatDaftar] = useState('')

  const [judul, setJudul] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [langkah, setLangkah] = useState('')
  const [urlHalaman, setUrlHalaman] = useState('')
  const [perangkat, setPerangkat] = useState('')
  const [keparahan, setKeparahan] = useState<TingkatKeparahan>('sedang')
  const [berkas, setBerkas] = useState<File | null>(null)
  const [mengirim, setMengirim] = useState(false)
  const [pesan, setPesan] = useState('')
  const [gagal, setGagal] = useState('')

  async function muatLaporan(): Promise<void> {
    if (!supabase || !profil) return
    setMuat(true)
    setGalatDaftar('')
    let kueri = supabase
      .from('laporan_error')
      .select('*')
      .order('dibuat_pada', { ascending: false })
      .limit(100)

    if (peran !== 'superadmin') {
      kueri = kueri.eq('dilaporkan_oleh', profil.id)
    }

    const { data, error } = await kueri
    if (error) setGalatDaftar(`Gagal memuat laporan: ${error.message}`)
    setLaporan((data as LaporanError[] | null) ?? [])
    setMuat(false)
  }

  useEffect(() => {
    void muatLaporan()
  }, [profil?.id, peran])

  useEffect(() => {
    if (!supabase || peran !== 'superadmin') return
    const klien = supabase
    const channel = klien
      .channel(`laporan-realtime-${Date.now()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'laporan_error' }, () => {
        void muatLaporan()
      })
      .subscribe()
    return () => {
      void klien.removeChannel(channel)
    }
  }, [peran])

  function pilihBerkas(e: ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0] ?? null
    if (!file) {
      setBerkas(null)
      return
    }
    if (!MIME_SCREENSHOT.includes(file.type as (typeof MIME_SCREENSHOT)[number])) {
      setGagal('Screenshot harus berupa JPG atau PNG.')
      setBerkas(null)
      e.target.value = ''
      return
    }
    if (file.size > UKURAN_MAKSIMAL_SCREENSHOT) {
      setGagal('Ukuran screenshot maksimal 2 MB.')
      setBerkas(null)
      e.target.value = ''
      return
    }
    setGagal('')
    setBerkas(file)
  }

  async function kirimLaporan(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    if (!supabase || !profil) {
      setGagal('Koneksi ke studio belum tersedia.')
      return
    }
    setGagal('')
    setPesan('')

    const judulBersih = bersihkanTeks(judul, BATAS_JUDUL)
    const deskripsiBersih = bersihkanTeks(deskripsi, BATAS_DESKRIPSI)
    const langkahBersih = bersihkanTeks(langkah, BATAS_LANGKAH)
    const urlBersih = bersihkanTeks(urlHalaman, 500)
    const perangkatBersih = bersihkanTeks(perangkat, 200)

    if (judulBersih.length < 5) {
      setGagal('Judul minimal 5 karakter.')
      return
    }
    if (deskripsiBersih.length < 20) {
      setGagal('Deskripsi minimal 20 karakter.')
      return
    }

    setMengirim(true)
    try {
      let screenshotPath: string | null = null
      if (berkas && penggunaAuth) {
        const namaBerkas = `${penggunaAuth.id}/${Date.now()}-${berkas.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
        const { error: galatUpload } = await supabase.storage.from('laporan-error').upload(namaBerkas, berkas)
        if (galatUpload) {
          setGagal(`Gagal mengunggah screenshot: ${galatUpload.message}`)
          setMengirim(false)
          return
        }
        screenshotPath = namaBerkas
      }

      const { error } = await supabase.from('laporan_error').insert({
        judul: judulBersih,
        deskripsi: deskripsiBersih,
        langkah_reproduksi: langkahBersih || null,
        url_halaman: urlBersih || null,
        perangkat: perangkatBersih || null,
        tingkat_keparahan: keparahan,
        screenshot_path: screenshotPath,
        dilaporkan_oleh: profil.id,
        nama_pelapor: profil.nama_lengkap,
        email_pelapor: profil.email,
      })

      if (error) {
        setGagal(`Gagal mengirim laporan: ${error.message}`)
        setMengirim(false)
        return
      }

      setPesan('Laporan terkirim. Superadmin akan menerima pemberitahuan.')
      setJudul('')
      setDeskripsi('')
      setLangkah('')
      setUrlHalaman('')
      setPerangkat('')
      setBerkas(null)
      setKeparahan('sedang')
      await muatLaporan()
    } finally {
      setMengirim(false)
    }
  }

  async function ubahStatus(id: string, status: StatusLaporan): Promise<void> {
    if (!supabase || peran !== 'superadmin') return
    const waktu = new Date().toISOString()
    const pembaruan: Database['public']['Tables']['laporan_error']['Update'] = { status }
    if (status === 'diproses') pembaruan.diproses_pada = waktu
    if (status === 'selesai' || status === 'ditolak') {
      pembaruan.selesai_pada = waktu
      pembaruan.ditangani_oleh = profil?.id ?? null
    }
    const { error } = await supabase.from('laporan_error').update(pembaruan).eq('id', id)
    if (error) {
      setGalatDaftar(`Gagal memperbarui status: ${error.message}`)
      return
    }
    await muatLaporan()
  }

  async function simpanCatatan(id: string, catatan: string): Promise<void> {
    if (!supabase || peran !== 'superadmin') return
    const { error } = await supabase
      .from('laporan_error')
      .update({ catatan_internal: catatan.trim() || null })
      .eq('id', id)
    if (error) setGalatDaftar(`Gagal menyimpan catatan: ${error.message}`)
  }

  async function bukaScreenshot(lokasi: string): Promise<void> {
    if (!supabase) return
    const { data } = await supabase.storage.from('laporan-error').createSignedUrl(lokasi, 120)
    if (!data?.signedUrl) {
      setGalatDaftar('Tidak dapat membuka screenshot.')
      return
    }
    window.open(data.signedUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-perpusnas-blue">Laporan Error</h1>
          <p className="mt-2 max-w-2xl text-sm text-perpusnas-gray-600">
            Laporkan kendala yang ditemukan. Screenshot bersifat opsional. Superadmin menerima laporan di panel dan
            melalui surel bila webhook Resend sudah aktif.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void muatLaporan()}
          className="inline-flex items-center gap-2 rounded-full border border-perpusnas-blue/20 px-4 py-2 text-sm font-semibold text-perpusnas-blue"
        >
          <RefreshCw size={16} aria-hidden="true" />
          Segarkan
        </button>
      </div>

      <section className="mt-6 rounded-2xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-perpusnas-blue">Kirim Laporan Baru</h2>
        <form onSubmit={(e) => void kirimLaporan(e)} className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="lap-judul" className="block text-sm font-semibold text-perpusnas-gray-900">
              Judul singkat
            </label>
            <input
              id="lap-judul"
              type="text"
              required
              maxLength={BATAS_JUDUL}
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm outline-none focus:border-perpusnas-blue focus:ring-2 focus:ring-perpusnas-blue/20"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="lap-deskripsi" className="block text-sm font-semibold text-perpusnas-gray-900">
              Deskripsi error
            </label>
            <textarea
              id="lap-deskripsi"
              required
              rows={4}
              maxLength={BATAS_DESKRIPSI}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="mt-2 w-full resize-y rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm outline-none focus:border-perpusnas-blue focus:ring-2 focus:ring-perpusnas-blue/20"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="lap-langkah" className="block text-sm font-semibold text-perpusnas-gray-900">
              Langkah reproduksi (opsional)
            </label>
            <textarea
              id="lap-langkah"
              rows={3}
              maxLength={BATAS_LANGKAH}
              value={langkah}
              onChange={(e) => setLangkah(e.target.value)}
              className="mt-2 w-full resize-y rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm outline-none focus:border-perpusnas-blue focus:ring-2 focus:ring-perpusnas-blue/20"
            />
          </div>
          <div>
            <label htmlFor="lap-url" className="block text-sm font-semibold text-perpusnas-gray-900">
              URL halaman (opsional)
            </label>
            <input
              id="lap-url"
              type="text"
              value={urlHalaman}
              onChange={(e) => setUrlHalaman(e.target.value)}
              placeholder="Contoh: /admin/jadwal"
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm outline-none focus:border-perpusnas-blue focus:ring-2 focus:ring-perpusnas-blue/20"
            />
          </div>
          <div>
            <label htmlFor="lap-perangkat" className="block text-sm font-semibold text-perpusnas-gray-900">
              Perangkat atau browser (opsional)
            </label>
            <input
              id="lap-perangkat"
              type="text"
              value={perangkat}
              onChange={(e) => setPerangkat(e.target.value)}
              placeholder="Contoh: Chrome 125 di Windows 11"
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm outline-none focus:border-perpusnas-blue focus:ring-2 focus:ring-perpusnas-blue/20"
            />
          </div>
          <div>
            <label htmlFor="lap-keparahan" className="block text-sm font-semibold text-perpusnas-gray-900">
              Tingkat keparahan
            </label>
            <select
              id="lap-keparahan"
              value={keparahan}
              onChange={(e) => setKeparahan(e.target.value as TingkatKeparahan)}
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 bg-white px-3 py-2.5 text-sm outline-none focus:border-perpusnas-blue focus:ring-2 focus:ring-perpusnas-blue/20"
            >
              {(Object.keys(labelKeparahan) as TingkatKeparahan[]).map((nilai) => (
                <option key={nilai} value={nilai}>
                  {labelKeparahan[nilai]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="lap-screenshot" className="block text-sm font-semibold text-perpusnas-gray-900">
              Screenshot (opsional, maksimal 2 MB, format JPG/PNG)
            </label>
            <input
              id="lap-screenshot"
              type="file"
              accept="image/png,image/jpeg"
              onChange={pilihBerkas}
              className="mt-2 w-full text-sm text-perpusnas-gray-600 file:mr-3 file:rounded-full file:border-0 file:bg-perpusnas-blue-light file:px-4 file:py-2 file:text-sm file:font-semibold file:text-perpusnas-blue"
            />
          </div>
          {gagal && (
            <p role="alert" className="md:col-span-2 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              <AlertCircle size={17} aria-hidden="true" className="mt-0.5 shrink-0" />
              {gagal}
            </p>
          )}
          {pesan && (
            <p role="status" className="md:col-span-2 flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              <CheckCircle2 size={17} aria-hidden="true" className="mt-0.5 shrink-0" />
              {pesan}
            </p>
          )}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={mengirim}
              className="rounded-full bg-perpusnas-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-perpusnas-blue-dark disabled:opacity-60"
            >
              {mengirim ? 'Mengirim...' : 'Kirim Laporan'}
            </button>
          </div>
        </form>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-perpusnas-blue">
          {peran === 'superadmin' ? 'Seluruh Laporan' : 'Laporan Saya'}
        </h2>
        {galatDaftar && (
          <p role="alert" className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {galatDaftar}
          </p>
        )}
        <div className="mt-4 space-y-4">
          {memuat && <Pemuatan pesan="Memuat laporan..." />}
          {!memuat && laporan.length === 0 && (
            <Kosong judul="Belum ada laporan" pesan="Laporan yang dikirim akan muncul di daftar ini." />
          )}
          {!memuat &&
            laporan.map((item) => (
              <article key={item.id} className="rounded-xl border border-perpusnas-blue/10 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-perpusnas-blue">{item.judul}</h3>
                    <p className="mt-1 text-xs text-perpusnas-gray-600">
                      {item.nama_pelapor} ({item.email_pelapor}) - {formatTanggal(item.dibuat_pada.slice(0, 10))}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${kelasKeparahan[item.tingkat_keparahan]}`}>
                      {labelKeparahan[item.tingkat_keparahan]}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${kelasStatusLaporan[item.status]}`}>
                      {labelStatusLaporan[item.status]}
                    </span>
                  </div>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm text-perpusnas-gray-900">{item.deskripsi}</p>
                {item.langkah_reproduksi && (
                  <p className="mt-3 text-sm text-perpusnas-gray-600">
                    <span className="font-semibold text-perpusnas-gray-900">Langkah:</span> {item.langkah_reproduksi}
                  </p>
                )}
                {item.url_halaman && (
                  <p className="mt-2 text-sm text-perpusnas-gray-600">
                    <span className="font-semibold text-perpusnas-gray-900">Halaman:</span> {item.url_halaman}
                  </p>
                )}
                {item.perangkat && (
                  <p className="mt-2 text-sm text-perpusnas-gray-600">
                    <span className="font-semibold text-perpusnas-gray-900">Perangkat:</span> {item.perangkat}
                  </p>
                )}
                {item.screenshot_path && (
                  <button
                    type="button"
                    onClick={() => void bukaScreenshot(item.screenshot_path!)}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-perpusnas-blue hover:underline"
                  >
                    <ImageIcon size={16} aria-hidden="true" />
                    Buka screenshot
                    <ExternalLink size={14} aria-hidden="true" />
                  </button>
                )}

                {peran === 'superadmin' && (
                  <div className="mt-4 border-t border-perpusnas-blue/10 pt-4">
                    <label htmlFor={`catatan-${item.id}`} className="block text-xs font-semibold uppercase tracking-wide text-perpusnas-gray-600">
                      Catatan internal
                    </label>
                    <textarea
                      id={`catatan-${item.id}`}
                      defaultValue={item.catatan_internal ?? ''}
                      onBlur={(e) => void simpanCatatan(item.id, e.target.value)}
                      rows={2}
                      className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2 text-sm outline-none focus:border-perpusnas-blue focus:ring-2 focus:ring-perpusnas-blue/20"
                    />
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.status !== 'diproses' && (
                        <button
                          type="button"
                          onClick={() => void ubahStatus(item.id, 'diproses')}
                          className="rounded-full border border-perpusnas-blue/20 px-4 py-2 text-xs font-semibold text-perpusnas-blue"
                        >
                          Tandai Diproses
                        </button>
                      )}
                      {item.status !== 'selesai' && (
                        <button
                          type="button"
                          onClick={() => void ubahStatus(item.id, 'selesai')}
                          className="rounded-full border border-green-300 px-4 py-2 text-xs font-semibold text-green-800"
                        >
                          Tandai Selesai
                        </button>
                      )}
                      {item.status !== 'ditolak' && (
                        <button
                          type="button"
                          onClick={() => void ubahStatus(item.id, 'ditolak')}
                          className="rounded-full border border-red-300 px-4 py-2 text-xs font-semibold text-red-800"
                        >
                          Tolak
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </article>
            ))}
        </div>
      </section>
    </div>
  )
}
