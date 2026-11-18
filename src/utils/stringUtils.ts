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

export function videoIdDariTautan(tautan: string): string | null {
  const nilai = tautan.trim()
  const pola = /(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  return pola.exec(nilai)?.[1] ?? (/^[a-zA-Z0-9_-]{11}$/.test(nilai) ? nilai : null)
}
