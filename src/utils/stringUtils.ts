/**
 * Mengubah masukan bebas menjadi teks polos sebelum disimpan.
 * Tag HTML/SVG dan karakter kontrol dibuang, bukan diterjemahkan menjadi entitas.
 */
export function bersihkanTeks(masukan: string, batas: number): string {
  return masukan
    .replace(/<[^>]*>/g, ' ')
    .replace(/[\u0000-\u001F\u007F<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, batas)
}

export function slugify(masukan: string): string {
  return masukan
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90)
}

/** Beberapa narasumber disimpan dalam satu kolom teks, dipisah titik koma. */
export function gabungNarasumber(daftar: string[], batasPerNama = 150): string {
  const nama = daftar
    .map((item) => bersihkanTeks(item, batasPerNama))
    .filter(Boolean)
  return nama.length > 0 ? nama.join('; ') : 'Belum tercatat'
}

export function pecahNarasumber(nilai: string | null | undefined): string[] {
  const daftar = (nilai ?? '')
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean)
  return daftar.length > 0 ? daftar : ['']
}

const NILAI_TIDAK_ADA = new Set(['', '-', '--', 'belum tercatat', 'tidak ada', 'n/a', 'null', 'tidak diketahui'])

/** Dipakai panel admin untuk menandai metadata yang belum diisi. */
export function adaIsi(nilai: string | null | undefined): boolean {
  return Boolean(nilai && !NILAI_TIDAK_ADA.has(nilai.trim().toLowerCase()))
}

export function videoIdDariTautan(tautan: string): string | null {
  const nilai = tautan.trim()
  const pola = /(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  return pola.exec(nilai)?.[1] ?? (/^[a-zA-Z0-9_-]{11}$/.test(nilai) ? nilai : null)
}
