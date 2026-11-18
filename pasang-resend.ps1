# Pasang secret Resend dan deploy Edge Function notifikasi laporan error.
# Jalankan dari folder proyek setelah `supabase login` dan `supabase link`.
#
# Contoh di PowerShell:
#   $env:RESEND_API_KEY = 're_XXXX'
#   $env:EMAIL_DARI = 'WBS Perpusnas <onboarding@resend.dev>'
#   $env:URL_PANEL_ADMIN = 'https://<username>.github.io/<repo>/admin/laporan-error'
#   $env:WEBHOOK_SECRET = 'guid-acak-anda'   # opsional, dipakai bila header apikey bermasalah
#   .\pasang-resend.ps1
#
# Kunci dibaca dari variabel lingkungan, tidak ditulis ke berkas mana pun.

$ErrorActionPreference = 'Stop'

if (-not $env:RESEND_API_KEY) {
  throw "Set `$env:RESEND_API_KEY di terminal ini dulu sebelum menjalankan skrip."
}

$emailDari = if ($env:EMAIL_DARI) { $env:EMAIL_DARI } else { 'WBS Perpusnas <onboarding@resend.dev>' }

Write-Host 'Menyimpan secret RESEND_API_KEY...'
supabase secrets set "RESEND_API_KEY=$($env:RESEND_API_KEY)"
if ($LASTEXITCODE -ne 0) { throw 'Gagal menyimpan RESEND_API_KEY.' }

Write-Host 'Menyimpan secret EMAIL_DARI...'
supabase secrets set "EMAIL_DARI=$emailDari"
if ($LASTEXITCODE -ne 0) { throw 'Gagal menyimpan EMAIL_DARI.' }

if ($env:URL_PANEL_ADMIN) {
  Write-Host 'Menyimpan secret URL_PANEL_ADMIN...'
  supabase secrets set "URL_PANEL_ADMIN=$($env:URL_PANEL_ADMIN)"
  if ($LASTEXITCODE -ne 0) { throw 'Gagal menyimpan URL_PANEL_ADMIN.' }
}

if ($env:WEBHOOK_SECRET) {
  Write-Host 'Menyimpan secret WEBHOOK_SECRET...'
  supabase secrets set "WEBHOOK_SECRET=$($env:WEBHOOK_SECRET)"
  if ($LASTEXITCODE -ne 0) { throw 'Gagal menyimpan WEBHOOK_SECRET.' }
}

Write-Host 'Men-deploy kirim-notifikasi-laporan...'
supabase functions deploy kirim-notifikasi-laporan
if ($LASTEXITCODE -ne 0) { throw 'Gagal men-deploy Edge Function.' }

Write-Host 'Selesai. Lanjutkan ke bagian D (Database Webhooks) di PANDUAN-SETUP-SUPABASE.md.'
