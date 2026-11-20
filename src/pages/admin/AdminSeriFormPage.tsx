import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import FormulirSeri from '../../components/admin/FormulirSeri'
import { Pemuatan } from '../../components/common/StateBox'
import { useAuth } from '../../context/AuthContext'
import { useNotifikasi } from '../../context/NotifikasiContext'
import { useNotifikasiGalat } from '../../hooks/useNotifikasiGalat'
import { supabase } from '../../services/supabase'
import { draftKosongSeri, simpanSeri, validasiDraftSeri, type DraftSeri } from '../../services/seri'
import type { Seri } from '../../types/database.types'

export default function AdminSeriFormPage() {
  const { peran } = useAuth()
  const { beriNotifikasi } = useNotifikasi()
  const navigate = useNavigate()
  const [seri, setSeri] = useState<Seri[]>([])
  const [draft, setDraft] = useState<DraftSeri | null>(null)
  const [memuat, setMuat] = useState(true)
  const [galat, setGalat] = useState('')
  const [sedangMenyimpan, setSedangMenyimpan] = useState(false)
  useNotifikasiGalat(galat)

  useEffect(() => {
    let masihAktif = true
    async function muat(): Promise<void> {
      if (!supabase) {
        setMuat(false)
        setGalat('Koneksi ke studio belum tersedia.')
        return
      }
      const { data, error } = await supabase.from('seri').select('*').order('urutan')
      if (!masihAktif) return
      if (error) setGalat(`Gagal memuat seri: ${error.message}`)
      const daftar = (data as Seri[] | null) ?? []
      setSeri(daftar)
      setDraft(draftKosongSeri(daftar))
      setMuat(false)
    }
    void muat()
    return () => {
      masihAktif = false
    }
  }, [])

  async function simpan(): Promise<void> {
    if (!draft) return
    const pesanGalat = validasiDraftSeri(draft, seri, null)
    if (pesanGalat) {
      setGalat(pesanGalat)
      return
    }
    setGalat('')
    setSedangMenyimpan(true)
    try {
      await simpanSeri(draft, seri, null)
      beriNotifikasi('sukses', `Seri "${draft.nama.trim()}" ditambahkan.`)
      navigate('/admin/seri')
    } catch (galatSimpan) {
      setGalat(galatSimpan instanceof Error ? galatSimpan.message : 'Seri gagal ditambahkan.')
    } finally {
      setSedangMenyimpan(false)
    }
  }

  if (peran && peran !== 'superadmin') {
    return (
      <div>
        <h1 className="text-2xl font-bold text-perpusnas-blue">Tambah Seri Baru</h1>
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          Penambahan seri hanya tersedia untuk akun Superadmin.
        </p>
        <Link to="/admin/seri" className="mt-5 inline-block text-sm font-semibold text-perpusnas-blue hover:underline">
          Kembali ke Kelola Seri
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-perpusnas-blue">Tambah Seri Baru</h1>
          <p className="mt-2 text-sm text-perpusnas-gray-600">
            Isi identitas seri baru. Episode dapat ditambahkan setelah seri tersimpan.
          </p>
        </div>
        <Link
          to="/admin/seri"
          className="inline-flex items-center gap-2 rounded-full border border-perpusnas-blue/20 px-5 py-2.5 text-sm font-bold text-perpusnas-blue"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Kembali ke Daftar Seri
        </Link>
      </div>

      <section className="mt-6 max-w-3xl rounded-xl border border-perpusnas-blue/10 bg-white p-5 shadow-sm">
        {memuat || !draft ? (
          <Pemuatan pesan="Menyiapkan formulir seri..." />
        ) : (
          <FormulirSeri
            draft={draft}
            padaUbah={(perubahan) => setDraft({ ...draft, ...perubahan })}
            padaSimpan={() => void simpan()}
            padaBatal={() => navigate('/admin/seri')}
            sedangMenyimpan={sedangMenyimpan}
            id={null}
            teksTombol="Simpan Seri"
          />
        )}
      </section>
    </div>
  )
}
