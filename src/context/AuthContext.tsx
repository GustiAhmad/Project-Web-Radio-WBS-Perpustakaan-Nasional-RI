import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../services/supabase'
import type { Pengguna } from '../types/database.types'

type Peran = 'superadmin' | 'admin'

type NilaiAuth = {
  penggunaAuth: User | null
  profil: Pengguna | null
  peran: Peran | null
  memuat: boolean
  galatProfil: string | null
  masuk: (identifikator: string, kataSandi: string) => Promise<string | null>
  keluar: () => Promise<void>
  segarProfil: () => Promise<void>
}

const AuthContext = createContext<NilaiAuth | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [penggunaAuth, setPenggunaAuth] = useState<User | null>(null)
  const [profil, setProfil] = useState<Pengguna | null>(null)
  const [memuat, setMuat] = useState(true)
  const [galatProfil, setGalatProfil] = useState<string | null>(null)

  const muatProfil = useCallback(async (user: User | null): Promise<void> => {
    if (!supabase || !user) {
      setProfil(null)
      setGalatProfil(null)
      return
    }
    const { data, error } = await supabase
      .from('pengguna')
      .select('id, auth_user_id, email, nama_lengkap, nama_pengguna, foto_url, peran, status_aktif')
      .eq('auth_user_id', user.id)
      .maybeSingle()

    if (error) {
      console.error(`[WBS] Gagal memuat profil pengelola: ${error.message}`)
      setGalatProfil('Profil pengelola gagal dimuat. Periksa koneksi dan izin akun Anda.')
      setProfil(null)
      return
    }
    if (!data) {
      setGalatProfil('Akun ini belum terdaftar sebagai pengelola. Hubungi Superadmin.')
      setProfil(null)
      return
    }
    setGalatProfil(null)
    setProfil(data as Pengguna)
  }, [])

  useEffect(() => {
    if (!supabase) {
      setMuat(false)
      return
    }

    let masihAktif = true
    void supabase.auth.getSession().then(async ({ data }) => {
      if (!masihAktif) return
      setPenggunaAuth(data.session?.user ?? null)
      await muatProfil(data.session?.user ?? null)
      if (masihAktif) setMuat(false)
    })

    const { data: langganan } = supabase.auth.onAuthStateChange((_peristiwa: string, sesi: Session | null) => {
      if (!masihAktif) return
      setPenggunaAuth(sesi?.user ?? null)
      void muatProfil(sesi?.user ?? null).finally(() => {
        if (masihAktif) setMuat(false)
      })
    })

    return () => {
      masihAktif = false
      langganan.subscription.unsubscribe()
    }
  }, [muatProfil])

  const masuk = useCallback(async (identifikator: string, kataSandi: string): Promise<string | null> => {
    if (!supabase) return 'Koneksi ke studio belum tersedia. Periksa pengaturan Supabase.'
    const nilai = identifikator.trim()
    if (!nilai) return 'Isi nama pengguna atau surel.'

    let email = nilai
    if (!nilai.includes('@')) {
      const { data, error } = await supabase.rpc('cari_email_pengguna', { p_identifikator: nilai })
      if (error) {
        console.error(`[WBS] Gagal mencari akun pengelola: ${error.message}`)
        return 'Gagal mencari akun. Periksa koneksi internet Anda.'
      }
      if (typeof data !== 'string' || !data) return 'Nama pengguna atau surel tidak ditemukan.'
      email = data
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password: kataSandi })
    if (!error) return null
    if (error.message.includes('Invalid login credentials')) return 'Nama pengguna, surel, atau kata sandi tidak cocok.'
    return `Gagal masuk: ${error.message}`
  }, [])

  const keluar = useCallback(async (): Promise<void> => {
    if (!supabase) return
    await supabase.auth.signOut()
  }, [])

  const segarProfil = useCallback(async (): Promise<void> => {
    await muatProfil(penggunaAuth)
  }, [muatProfil, penggunaAuth])

  const nilai = useMemo<NilaiAuth>(
    () => ({
      penggunaAuth,
      profil,
      peran: profil?.peran ?? null,
      memuat,
      galatProfil,
      masuk,
      keluar,
      segarProfil,
    }),
    [penggunaAuth, profil, memuat, galatProfil, masuk, keluar, segarProfil]
  )

  return <AuthContext.Provider value={nilai}>{children}</AuthContext.Provider>
}

export function useAuth(): NilaiAuth {
  const nilai = useContext(AuthContext)
  if (!nilai) throw new Error('useAuth harus dipakai di dalam AuthProvider')
  return nilai
}
