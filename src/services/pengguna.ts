import { supabase } from './supabase'

type HasilKelola = {
  berhasil?: boolean
  pesan?: string
  nama_pengguna?: string
  kata_sandi_sementara?: string
}

/** Panggil Edge Function pengelola akun dengan JWT sesi pengelola yang sedang masuk. */
export async function panggilKelolaPengguna(badan: Record<string, unknown>): Promise<HasilKelola> {
  if (!supabase) throw new Error('Koneksi ke studio belum tersedia.')
  const { data: sesi } = await supabase.auth.getSession()
  const token = sesi.session?.access_token
  if (!token) throw new Error('Sesi berakhir. Masuk lagi.')

  const { data, error } = await supabase.functions.invoke('kelola-pengguna', {
    body: badan,
    headers: { Authorization: `Bearer ${token}` },
  })

  if (error) {
    let pesan = error.message
    const konteks = error.context as Response | undefined
    if (konteks && typeof konteks.json === 'function') {
      try {
        const isi = (await konteks.json()) as { pesan?: string }
        if (isi.pesan) pesan = isi.pesan
      } catch {
        // Balasan bukan JSON; pakai pesan bawaan.
      }
    }
    throw new Error(pesan)
  }

  const hasil = (data ?? {}) as HasilKelola
  if (hasil.berhasil === false) throw new Error(hasil.pesan ?? 'Permintaan ditolak.')
  return hasil
}
