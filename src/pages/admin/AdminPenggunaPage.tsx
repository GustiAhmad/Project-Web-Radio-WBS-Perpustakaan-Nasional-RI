import { useEffect, useState, type FormEvent } from 'react'
import { Copy, ShieldCheck, UserCog, UserPlus } from 'lucide-react'
import { Kosong, Pemuatan } from '../../components/common/StateBox'
import UnggahGambarField from '../../components/admin/UnggahGambarField'
import { useAuth } from '../../context/AuthContext'
import { terimaBerkas, unggahGambar } from '../../services/aset'
import { panggilKelolaPengguna } from '../../services/pengguna'
import { supabase } from '../../services/supabase'
import type { Pengguna } from '../../types/database.types'
import { formatTanggal } from '../../utils/formatters'

export default function AdminPenggunaPage() {
  const { profil, peran, segarProfil } = useAuth()
  const [daftar, setDaftar] = useState<Pengguna[]>([])
  const [memuat, setMuat] = useState(true)
  const [galat, setGalat] = useState('')
  const [pesan, setPesan] = useState('')
  const [memproses, setMemproses] = useState(false)

  const [namaLengkap, setNamaLengkap] = useState('')
  const [email, setEmail] = useState('')
  const [namaPengguna, setNamaPengguna] = useState('')
  const [peranBaru, setPeranBaru] = useState<'admin' | 'superadmin'>('admin')
  const [sandiSementara, setSandiSementara] = useState('')

  const [namaSaya, setNamaSaya] = useState('')
  const [fotoSaya, setFotoSaya] = useState<File | null>(null)
  const [hapusFotoSaya, setHapusFotoSaya] = useState(false)

  async function muat(): Promise<void> {
    if (!supabase) {
      setMuat(false)
      return
    }
    const { data, error } = await supabase
      .from('pengguna')
      .select('id, auth_user_id, email, nama_lengkap, nama_pengguna, foto_url, peran, status_aktif, created_at')
      .order('nama_lengkap', { ascending: true })
    if (error) setGalat(`Gagal memuat akun: ${error.message}`)
    setDaftar((data as Pengguna[] | null) ?? [])
    setMuat(false)
  }

  useEffect(() => {
    void muat()
  }, [])

  useEffect(() => {
    setNamaSaya(profil?.nama_pengguna ?? '')
  }, [profil?.nama_pengguna])

  function tanganiGalat(err: unknown): void {
    setGalat(err instanceof Error ? err.message : 'Permintaan gagal. Coba lagi.')
  }

  async function tambah(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setGalat('')
    setPesan('')
    setSandiSementara('')
    setMemproses(true)
    try {
      const hasil = await panggilKelolaPengguna({
        aksi: 'tambah_pengguna',
        nama_lengkap: namaLengkap,
        email,
        nama_pengguna: namaPengguna,
        peran: peranBaru,
      })
      setPesan(hasil.pesan ?? 'Akun dibuat.')
      setSandiSementara(hasil.kata_sandi_sementara ?? '')
      setNamaLengkap('')
      setEmail('')
      setNamaPengguna('')
      await muat()
    } catch (err) {
      tanganiGalat(err)
    } finally {
      setMemproses(false)
    }
  }

  async function ubahStatus(item: Pengguna): Promise<void> {
    setGalat('')
    setPesan('')
    try {
      const hasil = await panggilKelolaPengguna({
        aksi: 'ubah_status',
        id: item.id,
        status_aktif: !item.status_aktif,
      })
      setPesan(hasil.pesan ?? 'Status akun diperbarui.')
      await muat()
    } catch (err) {
      tanganiGalat(err)
    }
  }

  async function ubahPeran(item: Pengguna): Promise<void> {
    setGalat('')
    setPesan('')
    try {
      const hasil = await panggilKelolaPengguna({
        aksi: 'ubah_peran',
        id: item.id,
        peran: item.peran === 'superadmin' ? 'admin' : 'superadmin',
      })
      setPesan(hasil.pesan ?? 'Peran diperbarui.')
      await muat()
    } catch (err) {
      tanganiGalat(err)
    }
  }

  async function simpanProfilSaya(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    if (!profil) return
    setGalat('')
    setPesan('')
    setMemproses(true)
    try {
      const namaBersih = namaSaya.trim()
      const pesan: string[] = []
      if (namaBersih && namaBersih !== profil.nama_pengguna) {
        const hasil = await panggilKelolaPengguna({ aksi: 'ubah_nama_pengguna', nama_pengguna: namaBersih })
        pesan.push(hasil.pesan ?? 'Nama pengguna tersimpan.')
      }
      if (fotoSaya) {
        if (!terimaBerkas(fotoSaya)) throw new Error('Pilih gambar JPG, PNG, atau WebP maksimal 5 MB.')
        const url = await unggahGambar('profil', profil.auth_user_id ?? profil.id, fotoSaya)
        const hasil = await panggilKelolaPengguna({ aksi: 'ubah_foto', foto_url: url })
        pesan.push(hasil.pesan ?? 'Foto profil tersimpan.')
        setFotoSaya(null)
      } else if (hapusFotoSaya) {
        const hasil = await panggilKelolaPengguna({ aksi: 'ubah_foto', foto_url: null })
        pesan.push(hasil.pesan ?? 'Foto profil dihapus.')
        setHapusFotoSaya(false)
      }
      setPesan(pesan.join(' ') || 'Tidak ada perubahan.')
      await segarProfil()
    } catch (err) {
      tanganiGalat(err)
    } finally {
      setMemproses(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-perpusnas-blue">
        {peran === 'superadmin' ? 'Kelola Akun Pengelola' : 'Profil & Pengelola'}
      </h1>
      <p className="mt-2 text-sm text-perpusnas-gray-600">
        {peran === 'superadmin'
          ? 'Tambah pengelola, aktifkan atau nonaktifkan akun, dan tetapkan peran. Hanya dua peran yang dikenal: Admin dan Superadmin.'
          : 'Perbarui profil Anda dan tambah rekan pengelola berperan Admin. Pengaktifan akun dan perubahan peran tetap menjadi wewenang Superadmin.'}
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
          Profil Saya
        </h2>
        <form onSubmit={(e) => void simpanProfilSaya(e)} className="mt-4 space-y-4">
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
              <UserPlus size={18} aria-hidden="true" />
              Tambah Pengelola
            </h2>
            <form onSubmit={(e) => void tambah(e)} className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="ak-nama" className="block text-sm font-semibold text-perpusnas-gray-900">Nama lengkap</label>
                <input id="ak-nama" required value={namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)} className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm" />
              </div>
              <div>
                <label htmlFor="ak-surel" className="block text-sm font-semibold text-perpusnas-gray-900">Alamat surel</label>
                <input id="ak-surel" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm" />
              </div>
              <div>
                <label htmlFor="ak-pengguna" className="block text-sm font-semibold text-perpusnas-gray-900">Nama pengguna</label>
                <input id="ak-pengguna" required value={namaPengguna} onChange={(e) => setNamaPengguna(e.target.value)} placeholder="misalnya: pustakawan.wbs" className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm" />
              </div>
              <div>
                {peran === 'superadmin' ? (
                  <>
                    <label htmlFor="ak-peran" className="block text-sm font-semibold text-perpusnas-gray-900">Peran</label>
                    <select id="ak-peran" value={peranBaru} onChange={(e) => setPeranBaru(e.target.value as 'admin' | 'superadmin')} className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 bg-white px-3 py-2.5 text-sm">
                      <option value="admin">Admin</option>
                      <option value="superadmin">Superadmin</option>
                    </select>
                  </>
                ) : (
                  <p className="self-end rounded-lg bg-perpusnas-blue-light px-3 py-2.5 text-xs text-perpusnas-blue">
                    Akun baru dibuat dengan peran Admin. Mengangkat peran hanya bisa dilakukan Superadmin.
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <button type="submit" disabled={memproses} className="inline-flex items-center gap-2 rounded-full bg-perpusnas-blue px-6 py-3 text-sm font-bold text-white disabled:opacity-60">
                  <UserPlus size={16} aria-hidden="true" />
                  Buat Akun
                </button>
              </div>
            </form>
            {sandiSementara && (
              <div className="mt-5 rounded-xl border border-perpusnas-gold/40 bg-perpusnas-gold-light p-4">
                <p className="text-sm font-semibold text-perpusnas-blue-dark">Kata sandi sementara (tampil sekali)</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <code className="rounded-lg bg-white px-3 py-2 text-sm font-bold text-perpusnas-blue-dark">{sandiSementara}</code>
                  <button
                    type="button"
                    onClick={() => void navigator.clipboard.writeText(sandiSementara)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-perpusnas-blue/20 px-3 py-2 text-xs font-semibold text-perpusnas-blue"
                  >
                    <Copy size={13} aria-hidden="true" />
                    Salin
                  </button>
                </div>
                <p className="mt-2 text-xs text-perpusnas-gray-600">Sampaikan ke pustakawan yang bersangkutan, lalu minta mengganti kata sandi.</p>
              </div>
            )}
          </section>

      {peran === 'superadmin' && (
          <section className="mt-8">
            <h2 className="text-lg font-bold text-perpusnas-blue">Daftar Akun</h2>
            <div className="mt-4">
              {memuat ? (
                <Pemuatan pesan="Memuat daftar akun..." />
              ) : daftar.length === 0 ? (
                <Kosong judul="Belum ada akun" pesan="Tambahkan pengelola melalui formulir di atas." />
              ) : (
                <div className="space-y-3">
                  {daftar.map((item) => (
                    <article key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-perpusnas-blue/10 bg-white p-5 shadow-sm">
                      <div className="flex min-w-0 items-center gap-3">
                        <img
                          src={item.foto_url ?? `${import.meta.env.BASE_URL}placeholder-penyiar.svg`}
                          alt={item.foto_url ? `Foto ${item.nama_lengkap}` : 'Foto profil belum tersedia'}
                          width={44}
                          height={44}
                          className="h-11 w-11 shrink-0 rounded-full bg-perpusnas-blue-light object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate font-bold text-perpusnas-blue">{item.nama_lengkap}</p>
                          <p className="truncate text-xs text-perpusnas-gray-600">
                            @{item.nama_pengguna} · {item.email}
                          </p>
                          <p className="mt-1 text-[11px] text-perpusnas-gray-600">
                            Bergabung {formatTanggal(item.created_at.slice(0, 10))} · {item.status_aktif ? 'Aktif' : 'Nonaktif'}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {item.peran === 'superadmin' && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-perpusnas-gold-light px-3 py-1.5 text-[11px] font-bold text-perpusnas-blue-dark">
                            <ShieldCheck size={12} aria-hidden="true" />
                            Superadmin
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => void ubahPeran(item)}
                          disabled={item.id === profil?.id}
                          className="rounded-full border border-perpusnas-blue/20 px-3 py-1.5 text-xs font-semibold text-perpusnas-blue disabled:opacity-50"
                        >
                          {item.peran === 'superadmin' ? 'Turunkan jadi Admin' : 'Angkat jadi Superadmin'}
                        </button>
                        <button
                          type="button"
                          onClick={() => void ubahStatus(item)}
                          disabled={item.id === profil?.id}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold disabled:opacity-50 ${
                            item.status_aktif
                              ? 'bg-red-50 text-red-800'
                              : 'bg-green-50 text-green-800'
                          }`}
                        >
                          {item.status_aktif ? 'Nonaktifkan' : 'Aktifkan'}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
      )}
    </div>
  )
}
