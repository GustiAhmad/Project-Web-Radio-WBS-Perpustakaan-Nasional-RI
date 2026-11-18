export type JenisHariSiaran = 'hari_kerja' | 'sabtu' | 'minggu'

const OFFSET_WIB_MS = 7 * 60 * 60 * 1000

/** WIB tidak mengenal daylight saving time, jadi offset UTC+7 tetap aman. */
export function waktuWibSekarang(): Date {
  return new Date(Date.now() + OFFSET_WIB_MS)
}

export function tanggalWibHariIni(): string {
  const waktu = waktuWibSekarang()
  const tahun = waktu.getUTCFullYear()
  const bulan = String(waktu.getUTCMonth() + 1).padStart(2, '0')
  const hari = String(waktu.getUTCDate()).padStart(2, '0')
  return `${tahun}-${bulan}-${hari}`
}

export function jamTanpaDetik(waktu: Date): string {
  const jam = String(waktu.getUTCHours()).padStart(2, '0')
  const menit = String(waktu.getUTCMinutes()).padStart(2, '0')
  const detik = String(waktu.getUTCSeconds()).padStart(2, '0')
  return `${jam}:${menit}:${detik}`
}

/** Siklus siaran dimulai 06.00 WIB, sehingga dini hari masih milik hari sebelumnya. */
export function tanggalEfektifSiaran(waktu: Date): Date {
  const hasil = new Date(waktu.getTime())
  if (waktu.getUTCHours() < 6) {
    hasil.setUTCDate(hasil.getUTCDate() - 1)
  }
  return hasil
}

export function jenisHariSiaran(waktu: Date): JenisHariSiaran {
  const hari = tanggalEfektifSiaran(waktu).getUTCDay()
  if (hari === 0) return 'minggu'
  if (hari === 6) return 'sabtu'
  return 'hari_kerja'
}

/** Menangani blok jadwal yang melintasi tengah malam, misalnya 23:00 sampai 00:00. */
export function dalamRentang(jam: string, mulai: string, selesai: string): boolean {
  if (selesai <= mulai) {
    return jam >= mulai || jam < selesai
  }
  return jam >= mulai && jam < selesai
}
