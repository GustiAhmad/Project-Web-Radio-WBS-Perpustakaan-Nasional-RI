import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database, Seri } from '../types/database.types'

const url = import.meta.env.VITE_SUPABASE_URL?.trim() ?? ''
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? ''

export const isSupabaseConfigured = url.startsWith('https://') && anonKey.length > 0

export const supabase: SupabaseClient<Database> | null = isSupabaseConfigured
  ? createClient<Database>(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null

if (!isSupabaseConfigured) {
  console.info(
    '[WBS] Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di .env untuk mengaktifkan katalog.'
  )
}

/**
 * Uji koneksi untuk Review Gate 2.
 * Mengambil tiga seri pertama agar RLS publik dan koneksi anon key terverifikasi.
 */
export async function ujiKoneksiSupabase(): Promise<void> {
  if (!supabase) {
    console.warn('[WBS] Uji koneksi dilewati: kredensial Supabase belum diisi.')
    return
  }

  const { data, error } = await supabase
    .from('seri')
    .select('id, nama, slug, kategori, urutan')
    .order('urutan', { ascending: true })
    .limit(3)

  if (error) {
    console.error('[WBS] Gagal terhubung ke Supabase:', error.message)
    return
  }

  const daftar = (data ?? []) as Pick<Seri, 'id' | 'nama' | 'slug' | 'kategori' | 'urutan'>[]
  console.info('[WBS] Supabase terhubung. Contoh seri:', daftar)
}
