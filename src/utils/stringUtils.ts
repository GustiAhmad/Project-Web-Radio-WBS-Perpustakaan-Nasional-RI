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
