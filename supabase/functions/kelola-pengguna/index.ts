// Supabase Edge Function — pengelolaan akun pengelola WBS.
// Semua perubahan akun memakai service role HANYA di sini. Frontend tidak pernah
// melihat kunci tersebut. Peran pemanggil dicek dari JWT Supabase yang dikirim frontend.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

type Aksi =
  | 'tambah_pengguna'
  | 'ubah_status'
  | 'ubah_peran'
  | 'ubah_nama_pengguna'
  | 'ubah_foto'
  | 'ubah_kata_sandi'

type Badan = {
  aksi?: Aksi
  id?: string
  nama_lengkap?: string
  email?: string
  nama_pengguna?: string
  kata_sandi?: string
  peran?: 'admin' | 'superadmin'
  status_aktif?: boolean
  foto_url?: string | null
}

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function balas(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  })
}

function teks(nilai: unknown, batas = 120): string {
  if (typeof nilai !== 'string') return ''
  return nilai
    .replace(/<[^>]*>/g, ' ')
    .replace(/[\u0000-\u001F\u007F<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, batas)
}

function slugify(nilai: string): string {
  return nilai
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9._]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

const emailSah = (nilai: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(nilai)

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return balas({ ok: true })
  if (req.method !== 'POST') return balas({ pesan: 'Metode tidak didukung.' }, 405)

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceKey) {
    console.error('[WBS] Kredensial internal kelola-pengguna tidak tersedia.')
    return balas({ pesan: 'Kredensial layanan tidak tersedia.' }, 500)
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const token = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '').trim()
  if (!token) return balas({ pesan: 'Sesi pengelola tidak ditemukan. Masuk lagi.' }, 401)

  const { data: authData, error: galatToken } = await supabase.auth.getUser(token)
  if (galatToken || !authData.user) return balas({ pesan: 'Sesi berakhir. Masuk lagi.' }, 401)

  const { data: pemanggil, error: galatProfil } = await supabase
    .from('pengguna')
    .select('id, peran, status_aktif')
    .eq('auth_user_id', authData.user.id)
    .maybeSingle()

  if (galatProfil) return balas({ pesan: galatProfil.message }, 500)
  if (!pemanggil?.status_aktif) return balas({ pesan: 'Akun pengelola tidak aktif.' }, 403)

  const superadmin = pemanggil.peran === 'superadmin'

  let badan: Badan
  try {
    badan = (await req.json()) as Badan
  } catch {
    return balas({ pesan: 'Isi permintaan bukan JSON.' }, 400)
  }

  async function namaTerpakai(nama: string): Promise<{ id: string } | null> {
    const { data } = await supabase.from('pengguna').select('id, nama_pengguna')
    return (
      (data ?? []).find((orang) => orang.nama_pengguna.toLowerCase() === nama.toLowerCase()) ?? null
    )
  }

  async function emailTerpakai(email: string): Promise<boolean> {
    const { data } = await supabase.from('pengguna').select('email')
    return (data ?? []).some((orang) => orang.email.toLowerCase() === email.toLowerCase())
  }

  // -------------------------------------------------------------------
  // Tambah akun pengelola baru. Admin hanya dapat menambah rekan admin.
  // -------------------------------------------------------------------
  if (badan.aksi === 'tambah_pengguna') {
    const namaLengkap = teks(badan.nama_lengkap, 100)
    const email = teks(badan.email, 160).toLowerCase()
    const peran: 'admin' | 'superadmin' = badan.peran === 'superadmin' ? 'superadmin' : 'admin'

    if (peran === 'superadmin' && !superadmin) {
      return balas({ pesan: 'Hanya Superadmin yang dapat menambah Superadmin.' }, 403)
    }
    if (!namaLengkap || !emailSah(email)) {
      return balas({ pesan: 'Nama lengkap dan alamat surel wajib diisi dengan benar.' }, 400)
    }

    const namaPengguna = slugify(teks(badan.nama_pengguna, 60)) || slugify(email.split('@')[0] ?? '')
    if (!namaPengguna) return balas({ pesan: 'Nama pengguna tidak valid.' }, 400)

    const kataSandi = teks(badan.kata_sandi, 128)
    if (kataSandi.length < 8) {
      return balas({ pesan: 'Kata sandi akun minimal 8 karakter.' }, 400)
    }

    const [emailDipakai, namaDipakai] = await Promise.all([
      emailTerpakai(email),
      namaTerpakai(namaPengguna),
    ])
    if (emailDipakai) return balas({ pesan: 'Surel itu sudah terdaftar.' }, 409)
    if (namaDipakai) return balas({ pesan: 'Nama pengguna itu sudah dipakai.' }, 409)

    const { data: akunBaru, error: galatAkun } = await supabase.auth.admin.createUser({
      email,
      password: kataSandi,
      email_confirm: true,
      user_metadata: { nama_lengkap: namaLengkap },
    })
    if (galatAkun || !akunBaru.user) {
      console.error(`[WBS] Gagal membuat akun Auth: ${galatAkun?.message ?? 'tidak diketahui'}`)
      return balas({ pesan: 'Akun Auth gagal dibuat. Periksa alamat surel.' }, 500)
    }

    const { error: galatProfilBaru } = await supabase.from('pengguna').insert({
      auth_user_id: akunBaru.user.id,
      email,
      nama_lengkap: namaLengkap,
      nama_pengguna: namaPengguna,
      peran,
      status_aktif: true,
    })
    if (galatProfilBaru) {
      await supabase.auth.admin.deleteUser(akunBaru.user.id)
      console.error(`[WBS] Gagal membuat profil: ${galatProfilBaru.message}`)
      return balas({ pesan: 'Profil pengelola gagal disimpan.' }, 500)
    }

    return balas({
      berhasil: true,
      nama_pengguna: namaPengguna,
      pesan: 'Akun dibuat dengan kata sandi yang Anda tetapkan.',
    })
  }

  // -------------------------------------------------------------------
  // Aktifkan / nonaktifkan akun (Superadmin saja)
  // -------------------------------------------------------------------
  if (badan.aksi === 'ubah_status') {
    if (!superadmin) return balas({ pesan: 'Hanya Superadmin yang dapat mengubah status akun.' }, 403)
    const id = teks(badan.id, 40)
    const aktif = badan.status_aktif === true
    if (!id || id === pemanggil.id) return balas({ pesan: 'Akun ini tidak dapat diubah.' }, 400)

    const { data: target, error: galatTarget } = await supabase
      .from('pengguna')
      .select('id, auth_user_id')
      .eq('id', id)
      .maybeSingle()
    if (galatTarget) return balas({ pesan: galatTarget.message }, 500)
    if (!target) return balas({ pesan: 'Akun tidak ditemukan.' }, 404)

    const { error } = await supabase
      .from('pengguna')
      .update({ status_aktif: aktif, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) return balas({ pesan: error.message }, 500)

    if (target.auth_user_id) {
      const { error: galatBan } = await supabase.auth.admin.updateUserById(target.auth_user_id, {
        ban_duration: aktif ? 'none' : '876000h',
      })
      if (galatBan) console.error(`[WBS] Gagal mengubah ban Auth: ${galatBan.message}`)
    }
    return balas({ berhasil: true, pesan: aktif ? 'Akun diaktifkan.' : 'Akun dinonaktifkan.' })
  }

  // -------------------------------------------------------------------
  // Ubah peran (Superadmin saja, tidak boleh mencopot Superadmin terakhir)
  // -------------------------------------------------------------------
  if (badan.aksi === 'ubah_peran') {
    if (!superadmin) return balas({ pesan: 'Hanya Superadmin yang dapat mengubah peran.' }, 403)
    const id = teks(badan.id, 40)
    const peran: 'admin' | 'superadmin' = badan.peran === 'superadmin' ? 'superadmin' : 'admin'
    if (!id) return balas({ pesan: 'Akun tidak ditentukan.' }, 400)

    if (id === pemanggil.id && peran !== 'superadmin') {
      const { data: daftar } = await supabase
        .from('pengguna')
        .select('id')
        .eq('peran', 'superadmin')
        .eq('status_aktif', true)
      if ((daftar?.length ?? 0) <= 1) {
        return balas({ pesan: 'Superadmin terakhir tidak dapat diturunkan.' }, 400)
      }
    }

    const { error } = await supabase
      .from('pengguna')
      .update({ peran, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) return balas({ pesan: error.message }, 500)
    return balas({ berhasil: true, pesan: peran === 'superadmin' ? 'Peran diangkat jadi Superadmin.' : 'Peran diubah jadi Admin.' })
  }

  // -------------------------------------------------------------------
  // Ubah nama pengguna (diri sendiri, atau Superadmin untuk akun lain)
  // -------------------------------------------------------------------
  if (badan.aksi === 'ubah_nama_pengguna') {
    const id = teks(badan.id, 40) || pemanggil.id
    if (!superadmin && id !== pemanggil.id) {
      return balas({ pesan: 'Anda hanya dapat mengubah nama pengguna sendiri.' }, 403)
    }
    const namaPengguna = slugify(teks(badan.nama_pengguna, 60))
    if (!namaPengguna) return balas({ pesan: 'Nama pengguna tidak valid.' }, 400)

    const pemilik = await namaTerpakai(namaPengguna)
    if (pemilik && pemilik.id !== id) return balas({ pesan: 'Nama pengguna itu sudah dipakai.' }, 409)

    const { error } = await supabase
      .from('pengguna')
      .update({ nama_pengguna: namaPengguna, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) return balas({ pesan: error.message }, 500)
    return balas({ berhasil: true, nama_pengguna: namaPengguna, pesan: 'Nama pengguna tersimpan.' })
  }

  // -------------------------------------------------------------------
  // Ubah foto profil (diri sendiri, atau Superadmin untuk akun lain)
  // -------------------------------------------------------------------
  if (badan.aksi === 'ubah_foto') {
    const id = teks(badan.id, 40) || pemanggil.id
    if (!superadmin && id !== pemanggil.id) {
      return balas({ pesan: 'Anda hanya dapat mengubah foto profil sendiri.' }, 403)
    }
    const fotoUrl = badan.foto_url === null || badan.foto_url === undefined ? null : teks(badan.foto_url, 600)
    if (fotoUrl && !/^https:\/\//i.test(fotoUrl) && !fotoUrl.startsWith('/')) {
      return balas({ pesan: 'Tautan foto harus memakai HTTPS.' }, 400)
    }

    const { error } = await supabase
      .from('pengguna')
      .update({ foto_url: fotoUrl, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) return balas({ pesan: error.message }, 500)
    return balas({ berhasil: true, pesan: fotoUrl ? 'Foto profil tersimpan.' : 'Foto profil dihapus.' })
  }

  // -------------------------------------------------------------------
  // Ubah kata sandi (diri sendiri, atau Superadmin untuk akun lain)
  // -------------------------------------------------------------------
  if (badan.aksi === 'ubah_kata_sandi') {
    const id = teks(badan.id, 40) || pemanggil.id
    if (!superadmin && id !== pemanggil.id) {
      return balas({ pesan: 'Anda hanya dapat mengubah kata sandi sendiri.' }, 403)
    }
    const kataSandi = teks(badan.kata_sandi, 128)
    if (kataSandi.length < 8) {
      return balas({ pesan: 'Kata sandi baru minimal 8 karakter.' }, 400)
    }

    const { data: target, error: galatTarget } = await supabase
      .from('pengguna')
      .select('id, auth_user_id')
      .eq('id', id)
      .maybeSingle()
    if (galatTarget) return balas({ pesan: galatTarget.message }, 500)
    if (!target?.auth_user_id) return balas({ pesan: 'Akun tidak ditemukan.' }, 404)

    const { error } = await supabase.auth.admin.updateUserById(target.auth_user_id, {
      password: kataSandi,
    })
    if (error) {
      console.error(`[WBS] Gagal mengubah kata sandi: ${error.message}`)
      return balas({ pesan: 'Kata sandi gagal diperbarui.' }, 500)
    }
    return balas({ berhasil: true, pesan: 'Kata sandi diperbarui.' })
  }

  return balas({ pesan: 'Aksi tidak dikenali.' }, 400)
})
