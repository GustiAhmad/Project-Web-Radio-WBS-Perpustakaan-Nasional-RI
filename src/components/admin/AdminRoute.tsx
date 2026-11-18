import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Pemuatan } from '../common/StateBox'
import { useAuth } from '../../context/AuthContext'

type Props = {
  children: ReactNode
  superadminSaja?: boolean
}

export default function AdminRoute({ children, superadminSaja = false }: Props) {
  const { penggunaAuth, profil, memuat, galatProfil, keluar } = useAuth()
  const lokasi = useLocation()

  if (memuat) {
    return (
      <div className="min-h-screen bg-perpusnas-gray-50 p-10">
        <Pemuatan pesan="Memeriksa sesi pengelola..." />
      </div>
    )
  }

  if (!penggunaAuth) {
    return <Navigate to="/admin/masuk" replace state={{ dari: lokasi.pathname }} />
  }

  if (!profil?.status_aktif) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-perpusnas-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-perpusnas-blue">Akses Pengelola Belum Aktif</h1>
          <p className="mt-2 text-sm text-perpusnas-gray-600">
            {galatProfil ?? 'Akun ini belum terdaftar sebagai pengelola. Hubungi Superadmin.'}
          </p>
          <button
            type="button"
            onClick={() => void keluar()}
            className="mt-5 rounded-full bg-perpusnas-blue px-5 py-2.5 text-sm font-semibold text-white"
          >
            Keluar dan coba akun lain
          </button>
        </div>
      </div>
    )
  }

  if (superadminSaja && profil.peran !== 'superadmin') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-perpusnas-blue">Akses Ditolak</h1>
          <p className="mt-2 text-sm text-perpusnas-gray-600">
            Menu ini hanya tersedia untuk Superadmin. Kembali ke dasbor untuk membuka menu lain.
          </p>
          <a
            href="/admin"
            className="mt-5 inline-flex rounded-full bg-perpusnas-blue px-5 py-2.5 text-sm font-semibold text-white"
          >
            Kembali ke Dasbor
          </a>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
