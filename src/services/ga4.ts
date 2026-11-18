// Pelacakan GA4 yang patuh privasi. Kunci tidak pernah disimpan di sini.
// IP dianonimkan pada semua konfigurasi, termasuk nilai dari panel admin.

import { supabase } from './supabase'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...argumen: unknown[]) => void
  }
}

type ParameterEvent = Record<string, string | number | boolean | null | undefined>

const ID_DARI_ENV = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ?? ''
let idAktif = ''
let sudahDimuat = false

export function initGA4(id: string = ID_DARI_ENV): void {
  const bersih = id.trim()
  if (!/^G-[A-Z0-9]+$/i.test(bersih) || sudahDimuat) return

  idAktif = bersih
  sudahDimuat = true
  window.dataLayer = window.dataLayer ?? []
  window.gtag = (...argumen: unknown[]) => {
    window.dataLayer?.push(argumen)
  }
  window.gtag('js', new Date())
  window.gtag('config', bersih, { anonymize_ip: true, send_page_view: false })

  const skrip = document.createElement('script')
  skrip.async = true
  skrip.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(bersih)}`
  document.head.appendChild(skrip)
}

export function lacakEvent(nama: string, parameter: ParameterEvent = {}): void {
  if (!idAktif || typeof window.gtag !== 'function') return
  window.gtag('event', nama, { ...parameter, send_to: idAktif })
}

/** Panel admin dapat mengisi ID GA4 tanpa mengubah berkas .env. */
export async function muatPengaturanAnalitik(): Promise<void> {
  if (!supabase || sudahDimuat) return

  const { data, error } = await supabase
    .from('pengaturan_situs')
    .select('nilai')
    .eq('kunci', 'analitik')
    .maybeSingle()

  if (error || !data?.nilai || typeof data.nilai !== 'object' || Array.isArray(data.nilai)) return

  const nilai = data.nilai as Record<string, unknown>
  const aktif = nilai.aktifkan_analitik === true || (nilai.aktifkan_analitik === undefined && Boolean(nilai.ga4_id))
  const id = String(nilai.ga4_id ?? '').trim() || ID_DARI_ENV
  if (!aktif || !id) return

  initGA4(id)
}
