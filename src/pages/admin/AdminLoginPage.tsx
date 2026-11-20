import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AlertCircle, LockKeyhole } from 'lucide-react'
import KolomSandi from '../../components/admin/KolomSandi'
import { useAuth } from '../../context/AuthContext'
import { useNotifikasiGalat } from '../../hooks/useNotifikasiGalat'

export default function AdminLoginPage() {
  const { masuk, penggunaAuth, profil, memuat, galatProfil, keluar } = useAuth()
  const [identifikator, setIdentifikator] = useState('')
  const [kataSandi, setKataSandi] = useState('')
  const [galat, setGalat] = useState('')
  const [memproses, setMemproses] = useState(false)
  useNotifikasiGalat(galat)
  useNotifikasiGalat(galatProfil ?? '')
  const navigate = useNavigate()

  if (!memuat && penggunaAuth && profil?.status_aktif) return <Navigate to="/admin" replace />

  async function kirim(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setGalat('')
    setMemproses(true)
    const pesanGalat = await masuk(identifikator, kataSandi)
    setMemproses(false)
    if (pesanGalat) {
      setGalat(pesanGalat)
      return
    }
    navigate('/admin', { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-perpusnas-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-perpusnas-blue/10 bg-white p-8 shadow-sm">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-perpusnas-blue-light text-perpusnas-blue">
          <LockKeyhole size={22} aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-perpusnas-blue">Masuk Panel Pengelola</h1>
        <p className="mt-2 text-sm text-perpusnas-gray-600">
          Gunakan akun pengelola Radio dan Siniar WBS Perpusnas.
        </p>

        {!memuat && penggunaAuth && !profil?.status_aktif && (
          <div role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <p>{galatProfil ?? 'Akun ini belum terdaftar sebagai pengelola. Hubungi Superadmin.'}</p>
            <button
              type="button"
              onClick={() => void keluar()}
              className="mt-2 font-semibold underline"
            >
              Keluar dan coba akun lain
            </button>
          </div>
        )}

        <form onSubmit={(e) => void kirim(e)} className="mt-7 space-y-5">
          <div>
            <label htmlFor="admin-identifikator" className="block text-sm font-semibold text-perpusnas-gray-900">
              Nama pengguna atau surel
            </label>
            <input
              id="admin-identifikator"
              type="text"
              required
              value={identifikator}
              onChange={(e) => setIdentifikator(e.target.value)}
              autoComplete="username"
              placeholder="misalnya: pustakawan.wbs"
              className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 text-sm outline-none focus:border-perpusnas-blue focus:ring-2 focus:ring-perpusnas-blue/20"
            />
            <p className="mt-1 text-xs text-perpusnas-gray-600">Nama pengguna dan alamat surel sama-sama diterima.</p>
          </div>
          <KolomSandi
            id="admin-sandi"
            nilai={kataSandi}
            onChange={setKataSandi}
            required
            autoComplete="current-password"
          />

          {galat && (
            <p
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            >
              <AlertCircle size={17} aria-hidden="true" className="mt-0.5 shrink-0" />
              {galat}
            </p>
          )}

          <button
            type="submit"
            disabled={memproses}
            className="w-full rounded-full bg-perpusnas-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-perpusnas-blue-dark disabled:opacity-60"
          >
            {memproses ? 'Memeriksa akun...' : 'Masuk'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-perpusnas-gray-600">
          <Link to="/" className="font-semibold text-perpusnas-blue hover:underline">
            Kembali ke situs publik
          </Link>
        </p>
      </div>
    </div>
  )
}
