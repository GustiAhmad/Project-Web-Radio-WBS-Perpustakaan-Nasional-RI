function sel(value: string | number | null | undefined): string {
  return `"${String(value ?? '').replace(/"/g, '""')}"`
}

export function unduhCsv(namaBerkas: string, kepala: string[], baris: (string | number | null)[][]): void {
  const isi = [kepala, ...baris].map((barisData) => barisData.map(sel).join(',')).join('\r\n')
  const berkas = new Blob([`\uFEFF${isi}`], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(berkas)
  const tautan = document.createElement('a')
  tautan.href = url
  tautan.download = namaBerkas
  document.body.appendChild(tautan)
  tautan.click()
  tautan.remove()
  URL.revokeObjectURL(url)
}
