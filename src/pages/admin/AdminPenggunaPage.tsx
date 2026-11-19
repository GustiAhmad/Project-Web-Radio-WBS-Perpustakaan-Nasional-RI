import { useEffect, useState, type FormEvent } from 'react'
import { KeyRound, ShieldCheck, UserPlus } from 'lucide-react'
import KolomSandi from '../../components/admin/KolomSandi'
import { Kosong, Pemuatan } from '../../components/common/StateBox'
import { useAuth } from '../../context/AuthContext'
import { panggilKelolaPengguna } from '../../services/pengguna'
import { supabase } from '../../services/supabase'
import type { Pengguna } from '../../types/database.types'
import { formatTanggal } from '../../utils/formatters'

export default function AdminPenggunaPage() {
  const { profil, peran } = useAuth()
  const [daftar, setDaftar] = useState<Pengguna[]>([])
  const [memuat, setMuat] = useState(true)
  const [galat, setGalat] = useState('')
  const [pesan, setPesan] = useState('')
  const [memproses, setMemproses] = useState(false)

  const [namaLengkap, setNamaLengkap] = useState('')
  const [email, setEmail] = useState('')
  const [namaPengguna, setNamaPengguna] = useState('')
  const [peranBaru, setPeranBaru] = useState<'admin' | 'superadmin'>('admin')
  const [sandiAwal, setSandiAwal] = useState('')

  const [idSandi, setIdSandi] = useState<string | null>(null)
  const [sandiBaru, setSandiBaru] = useState('')

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

  function tanganiGalat(err: unknown): void {
    setGalat(err instanceof Error ? err.message : 'Permintaan gagal. Coba lagi.')
  }

  async function tambah(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setGalat('')
    setPesan('')
    if (sandiAwal.length < 8) {
      setGalat('Kata sandi akun minimal 8 karakter.')
      return
    }
    setMemproses(true)
    try {
      const hasil = await panggilKelolaPengguna({
        aksi: 'tambah_pengguna',
        nama_lengkap: namaLengkap,
        email,
        nama_pengguna: namaPengguna,
        peran: peranBaru,
        kata_sandi: sandiAwal,
      })
      setPesan(hasil.pesan ?? 'Akun dibuat.')
      setNamaLengkap('')
      setEmail('')
      setNamaPengguna('')
      setSandiAwal('')
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

  async function simpanSandi(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    if (!idSandi) return
    if (sandiBaru.length < 8) {
      setGalat('Kata sandi baru minimal 8 karakter.')
      return
    }
    setGalat('')
    setPesan('')
    setMemproses(true)
    try {
      const hasil = await panggilKelolaPengguna({
        aksi: 'ubah_kata_sandi',
        id: idSandi,
        kata_sandi: sandiBaru,
      })
      setPesan(hasil.pesan ?? 'Kata sandi akun diperbarui.')
      setIdSandi(null)
      setSandiBaru('')
    } catch (err) {
      tanganiGalat(err)
    } finally {
      setMemproses(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-perpusnas-blue">
        Kelola Pengguna
      </h1>
      <p className="mt-2 text-sm text-perpusnas-gray-600">
        {peran === 'superadmin'
          ? 'Tambah pengelola, tetapkan kata sandi, aktifkan atau nonaktifkan akun, dan ubah kata sandi Admin. Hanya dua peran yang dikenal: Admin dan Superadmin.'
          : 'Tambah rekan pengelola berperan Admin. Pengaktifan akun, peran, dan kata sandi akun lain tetap menjadi wewenang Superadmin.'}
      </p>

      {galat && (
        <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{galat}</p>
      )}
      {pesan && (
        <p role="status" className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{pesan}</p>
      )}

      <section className="mt-6 rounded-2xl border border-perpusnas-blue/10 bg-white p-6 shadow-sm">
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
                <KolomSandi
                  id="ak-sandi"
                  label="Kata sandi akun"
                  nilai={sandiAwal}
                  onChange={setSandiAwal}
                  autoComplete="new-password"
                  bantuan="Minimal 8 karakter. Kata sandi ini langsung dipakai akun baru."
                />
              </div>
              <div className="md:col-span-2">
                <button type="submit" disabled={memproses} className="inline-flex items-center gap-2 rounded-full bg-perpusnas-blue px-6 py-3 text-sm font-bold text-white disabled:opacity-60">
                  <UserPlus size={16} aria-hidden="true" />
                  Buat Akun
                </button>
              </div>
            </form>
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
                          className="h-11 w-11 shrink-0 rounded-full bg-perpusnas-blue-light object-contain"
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
                        {item.id !== profil?.id && (
                          <button
                            type="button"
                            onClick={() => {
                              setIdSandi(idSandi === item.id ? null : item.id)
                              setSandiBaru('')
                            }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-perpusnas-blue/20 px-3 py-1.5 text-xs font-semibold text-perpusnas-blue"
                          >
                            <KeyRound size={13} aria-hidden="true" />
                            Ubah Sandi
                          </button>
                        )}
                      </div>
                      {idSandi === item.id && (
                        <form onSubmit={(e) => void simpanSandi(e)} className="w-full rounded-lg bg-perpusnas-gray-50 p-4">
                          <KolomSandi
                            id={`sandi-${item.id}`}
                            label={`Kata sandi baru untuk ${item.nama_lengkap}`}
                            nilai={sandiBaru}
                            onChange={setSandiBaru}
                            autoComplete="new-password"
                            bantuan="Minimal 8 karakter."
                          />
                          <div className="mt-3 flex gap-2">
                            <button
                              type="submit"
                              disabled={memproses}
                              className="rounded-full bg-perpusnas-blue px-4 py-2 text-xs font-bold text-white disabled:opacity-60"
                            >
                              Simpan Sandi
                            </button>
                            <button
                              type="button"
                              onClick={() => setIdSandi(null)}
                              className="rounded-full border border-perpusnas-blue/20 px-4 py-2 text-xs font-semibold text-perpusnas-blue"
                            >
                              Batal
                            </button>
                          </div>
                        </form>
                      )}
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
