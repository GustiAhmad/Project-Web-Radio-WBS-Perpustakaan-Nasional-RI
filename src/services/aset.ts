import { supabase } from './supabase'

export type FolderAset = 'poster-acara' | 'seri' | 'penyiar' | 'profil'

const BUCKET = 'aset-wbs'
const MIME_DIBENARKAN = ['image/jpeg', 'image/png']
const UKURAN_MAKSIMAL = 2 * 1024 * 1024

export const PESAN_GAMBAR_TIDAK_VALID = 'Pilih gambar JPG atau PNG dengan ukuran maksimal 2 MB.'

/**
 * Unggah satu gambar ke bucket publik dan kembalikan URL publiknya.
 * Pemanggilan memakai sesi pengelola, sehingga izin ditentukan RLS Storage.
 */
export async function unggahGambar(folder: FolderAset, id: string, berkas: File): Promise<string> {
  if (!supabase) throw new Error('Koneksi ke studio belum tersedia.')
  if (!terimaBerkas(berkas)) throw new Error(PESAN_GAMBAR_TIDAK_VALID)

  const ekstensi = berkas.type === 'image/png' ? 'png' : 'jpg'
  const jalur = `${folder}/${id}.${ekstensi}`
  const { error } = await supabase.storage.from(BUCKET).upload(jalur, berkas, {
    contentType: berkas.type,
    upsert: true,
  })
  if (error) throw new Error(`Gagal mengunggah gambar: ${error.message}`)

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(jalur)
  return data.publicUrl
}

export function terimaBerkas(berkas: File | undefined): boolean {
  return !!berkas && MIME_DIBENARKAN.includes(berkas.type) && berkas.size <= UKURAN_MAKSIMAL
}
