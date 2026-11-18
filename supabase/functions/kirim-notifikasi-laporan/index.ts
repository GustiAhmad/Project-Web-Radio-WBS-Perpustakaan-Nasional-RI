// Supabase Edge Function — notifikasi surel laporan error baru.
// Dipanggil oleh Database Webhook pada tabel public.laporan_error (event INSERT).
// Kunci Resend dan webhook secret dibaca dari Supabase secret, bukan dari frontend.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

type LaporanBaru = {
  id?: string
  judul?: string
  deskripsi?: string
  langkah_reproduksi?: string | null
  url_halaman?: string | null
  perangkat?: string | null
  tingkat_keparahan?: string
  nama_pelapor?: string
  email_pelapor?: string
  dibuat_pada?: string
}

type WebhookPayload = {
  type?: string
  table?: string
  schema?: string
  record?: LaporanBaru
}

function lepasHtml(nilai: string | null | undefined): string {
  return (nilai ?? '-')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function balas(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

/** Webhook Supabase memakai kunci proyek pada header apikey. Secret kustom jadi cadangan. */
function pemanggilSah(req: Request): boolean {
  const rahasia = Deno.env.get('WEBHOOK_SECRET')
  if (rahasia && req.headers.get('x-webhook-secret') === rahasia) return true

  const kunci = req.headers.get('apikey')
  if (!kunci) return false
  if (kunci === Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')) return true

  const daftarKunci = Deno.env.get('SUPABASE_SECRET_KEYS')
  if (daftarKunci) {
    try {
      const peta = JSON.parse(daftarKunci) as Record<string, string>
      if (Object.values(peta).some((nilai) => nilai === kunci)) return true
    } catch {
      console.error('[WBS] SUPABASE_SECRET_KEYS bukan JSON yang valid.')
    }
  }
  return false
}

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return balas({ dikirim: false, alasan: 'Metode tidak didukung' }, 405)
  }

  if (!pemanggilSah(req)) {
    return balas({ dikirim: false, alasan: 'Pemanggil webhook tidak dikenali' }, 401)
  }

  let payload: WebhookPayload
  try {
    payload = (await req.json()) as WebhookPayload
  } catch {
    return balas({ dikirim: false, alasan: 'Isi webhook bukan JSON' }, 400)
  }

  if (payload.type !== 'INSERT' || payload.table !== 'laporan_error' || payload.schema !== 'public') {
    return balas({ dikirim: false, alasan: 'Webhook bukan INSERT laporan_error' })
  }

  const laporan = payload.record
  if (!laporan?.judul) {
    return balas({ dikirim: false, alasan: 'Data laporan tidak lengkap' })
  }

  const resendKey = Deno.env.get('RESEND_API_KEY')
  if (!resendKey) {
    console.error('[WBS] RESEND_API_KEY belum diatur. Surel tidak dikirim.')
    return balas({ dikirim: false, alasan: 'RESEND_API_KEY belum diatur' })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceKey) {
    console.error('[WBS] Kredensial internal Edge Function tidak tersedia.')
    return balas({ dikirim: false, alasan: 'Kredensial internal tidak tersedia' })
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { data: penerima, error: galatPenerima } = await supabase
    .from('pengguna')
    .select('email, nama_lengkap')
    .eq('peran', 'superadmin')
    .eq('status_aktif', true)

  if (galatPenerima) {
    console.error(`[WBS] Gagal mencari superadmin: ${galatPenerima.message}`)
    return balas({ dikirim: false, alasan: galatPenerima.message })
  }

  const daftarTujuan = (penerima ?? [])
    .map((orang) => orang.email)
    .filter((email): email is string => typeof email === 'string' && email.includes('@'))

  if (daftarTujuan.length === 0) {
    console.error('[WBS] Tidak ada superadmin aktif dengan alamat surel.')
    return balas({ dikirim: false, alasan: 'Tidak ada penerima superadmin aktif' })
  }

  const dari = Deno.env.get('EMAIL_DARI') ?? 'WBS Perpusnas <onboarding@resend.dev>'
  const urlPanel = Deno.env.get('URL_PANEL_ADMIN') ?? ''
  const tautanPanel = urlPanel
    ? `<p><a href="${lepasHtml(urlPanel)}">Buka laporan di panel admin</a></p>`
    : ''

  const isiHtml = `
    <h2>Laporan error baru di Panel WBS</h2>
    <p><strong>Judul:</strong> ${lepasHtml(laporan.judul)}</p>
    <p><strong>Pelapor:</strong> ${lepasHtml(laporan.nama_pelapor)} (${lepasHtml(laporan.email_pelapor)})</p>
    <p><strong>Keparahan:</strong> ${lepasHtml(laporan.tingkat_keparahan)}</p>
    <p><strong>Waktu:</strong> ${lepasHtml(laporan.dibuat_pada)}</p>
    <p><strong>Deskripsi:</strong><br>${lepasHtml(laporan.deskripsi)}</p>
    <p><strong>Langkah reproduksi:</strong><br>${lepasHtml(laporan.langkah_reproduksi)}</p>
    <p><strong>URL halaman:</strong> ${lepasHtml(laporan.url_halaman)}</p>
    <p><strong>Perangkat:</strong> ${lepasHtml(laporan.perangkat)}</p>
    ${tautanPanel}
  `

  const responResend = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: dari,
      to: daftarTujuan,
      subject: `[WBS] Laporan error baru: ${laporan.judul}`,
      html: isiHtml,
    }),
  })

  if (!responResend.ok) {
    const rincian = await responResend.text()
    console.error(`[WBS] Resend menolak pengiriman: ${responResend.status} ${rincian}`)
    return balas({ dikirim: false, alasan: `Resend ${responResend.status}` })
  }

  return balas({ dikirim: true, penerima: daftarTujuan.length })
})
