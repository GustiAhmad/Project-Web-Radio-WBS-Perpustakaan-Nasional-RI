import { useEffect, useState, type FormEvent } from 'react'
import { KeyRound, UserCog } from 'lucide-react'
import KolomSandi from '../../components/admin/KolomSandi'
import UnggahGambarField from '../../components/admin/UnggahGambarField'
import { useAuth } from '../../context/AuthContext'
import { PESAN_GAMBAR_TIDAK_VALID, terimaBerkas, unggahGambar } from '../../services/aset'
import { panggilKelolaPengguna } from '../../services/pengguna'

import { useNotifikasiGalat } from '../../hooks/useNotifikasiGalat'

export default function AdminProfilPage() {
  const { profil, segarProfil } = useAuth()
  const [namaSaya, setNamaSaya] = useState('')
  const [fotoSaya, setFotoSaya] = useState<File | null>(null)
  const [hapusFotoSaya, setHapusFotoSaya] = useState(false)
  const [sandiBaru, setSandiBaru] = useState('')
  const [memproses, setMemproses] = useState(false)
  const [galat, setGalat] = useState('')
  useNotifikasiGalat(galat)
  const [pesan, setPesan] = useState('')

  useEffect(() => {
    setNamaSaya(profil?.nama_pengguna ?? '')
  }, [profil?.nama_pengguna])

  function tanganiGalat(err: unknown): void {
    setGalat(err instanceof Error ? err.message : 'Permintaan gagal. Coba lagi.')
  }

  async function simpanProfil(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    if (!profil) return
    if (fotoSaya && !terimaBerkas(fotoSaya)) {
      setGalat(PESAN_GAMBAR_TIDAK_VALID)
      return
    }
    setGalat('')
    setPesan('')
    setMemproses(true)
    try {
      const namaBersih = namaSaya.trim()
      const catatan: string[] = []
      if (namaBersih && namaBersih !== profil.nama_pengguna) {
        const hasil = await panggilKelolaPengguna({ aksi: 'ubah_nama_pengguna', nama_pengguna: namaBersih })
        catatan.push(hasil.pesan ?? 'Nama pengguna tersimpan.')
      }
      if (fotoSaya) {
        const url = await unggahGambar('profil', profil.auth_user_id ?? profil.id, fotoSaya)
        const hasil = await panggilKelolaPengguna({ aksi: 'ubah_foto', foto_url: url })
        catatan.push(hasil.pesan ?? 'Foto profil tersimpan.')
        setFotoSaya(null)
      } else if (hapusFotoSaya) {
        const hasil = await panggilKelolaPengguna({ aksi: 'ubah_foto', foto_url: null })
        catatan.push(hasil.pesan ?? 'Foto profil dihapus.')
        setHapusFotoSaya(false)
      }
      setPesan(catatan.join(' ') || 'Tidak ada perubahan.')
      await segarProfil()
    } catch (err) {
      tanganiGalat(err)
    } finally {
      setMemproses(false)
    }
  }

  async function simpanSandi(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    if (sandiBaru.length < 8) {
      setGalat('Kata sandi baru minimal 8 karakter.')
      return
    }
    setGalat('')
    setPesan('')
    setMemproses(true)
    try {
      const hasil = await panggilKelolaPengguna({ aksi: 'ubah_kata_sandi', kata_sandi: sandiBaru })
      setPesan(hasil.pesan ?? 'Kata sandi diperbarui.')
      setSandiBaru('')
    } catch (err) {
      tanganiGalat(err)
    } finally {
      setMemproses(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-perpusnas-blue">Profil Saya</h1>
      <p className="mt-2 text-sm text-perpusnas-gray-600">
        Perbarui nama pengguna, foto profil, dan kata sandi akun Anda sendiri.
      </p>

      {galat && (
        <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{galat}</p>
      )}
      {pesan && (
        <p role="status" className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{pesan}</p>
      )}

      <section className="mt-6 rounded-2xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-bold text-perpusnas-blue">
          <UserCog size={18} aria-hidden="true" />
          Data Diri
        </h2>
        <form onSubmit={(e) => void simpanProfil(e)} className="mt-4 space-y-4">
          <div>
            <label htmlFor="pro-nama" className="block text-sm font-semibold text-perpusnas-gray-900">Nama pengguna</label>
            <input
              id="pro-nama"
              value={namaSaya}
              onChange={(e) => setNamaSaya(e.target.value)}
              className="mt-2 w-full max-w-sm rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm"
            />
            <p className="mt-1 text-xs text-perpusnas-gray-600">Nama ini bisa dipakai untuk masuk, selain alamat surel.</p>
          </div>
          <UnggahGambarField
            id="pro-foto"
            label="Foto profil"
            nilai={hapusFotoSaya ? null : (profil?.foto_url ?? null)}
            berkas={fotoSaya}
            padaPilih={(berkas) => {
              setFotoSaya(berkas)
              if (berkas) setHapusFotoSaya(false)
            }}
            padaHapus={() => setHapusFotoSaya(true)}
            placeholder={`${import.meta.env.BASE_URL}placeholder-penyiar.svg`}
            bantuan="Foto tampil di bagian atas panel admin."
          />
          <button
            type="submit"
            disabled={memproses}
            className="rounded-full bg-perpusnas-blue px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            Simpan Profil
          </button>
        </form>
      </section>

      <section className="mt-8 rounded-2xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-bold text-perpusnas-blue">
          <KeyRound size={18} aria-hidden="true" />
          Kata Sandi
        </h2>
        <form onSubmit={(e) => void simpanSandi(e)} className="mt-4 max-w-sm space-y-4">
          <KolomSandi
            id="pro-sandi-baru"
            label="Kata sandi baru"
            nilai={sandiBaru}
            onChange={setSandiBaru}
            autoComplete="new-password"
            bantuan="Minimal 8 karakter."
          />
          <button
            type="submit"
            disabled={memproses}
            className="rounded-full bg-perpusnas-blue px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            Simpan Kata Sandi
          </button>
        </form>
      </section>
    </div>
  )
}
