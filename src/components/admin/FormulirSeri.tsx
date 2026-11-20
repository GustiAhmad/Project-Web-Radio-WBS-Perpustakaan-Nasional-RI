import { Check, X } from 'lucide-react'
import UnggahGambarField from './UnggahGambarField'
import { daftarKategori, labelKategori, type DraftSeri } from '../../services/seri'
import { slugify } from '../../utils/stringUtils'

type Props = {
  draft: DraftSeri
  padaUbah: (perubahan: Partial<DraftSeri>) => void
  padaSimpan: () => void
  padaBatal: () => void
  sedangMenyimpan: boolean
  id: string | null
  teksTombol: string
}

export default function FormulirSeri({
  draft,
  padaUbah,
  padaSimpan,
  padaBatal,
  sedangMenyimpan,
  id,
  teksTombol,
}: Props) {
  const akhiran = id ?? 'baru'

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor={`nama-seri-${akhiran}`} className="block text-sm font-semibold text-perpusnas-gray-900">
          Nama seri <span className="text-red-600">*</span>
        </label>
        <input
          id={`nama-seri-${akhiran}`}
          aria-label="Nama seri"
          maxLength={100}
          value={draft.nama}
          onChange={(e) => padaUbah({ nama: e.target.value })}
          placeholder="Misalnya: Ruang Literasi"
          className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2 text-sm"
        />
        {!id && (
          <p className="mt-1 text-xs text-perpusnas-gray-600">
            Alamat halaman: /program/{slugify(draft.nama) || 'seri-baru'}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`deskripsi-seri-${akhiran}`} className="block text-sm font-semibold text-perpusnas-gray-900">
          Deskripsi seri <span className="text-red-600">*</span>
        </label>
        <textarea
          id={`deskripsi-seri-${akhiran}`}
          aria-label="Deskripsi seri"
          rows={3}
          value={draft.deskripsi}
          onChange={(e) => padaUbah({ deskripsi: e.target.value })}
          placeholder="Jelaskan isi seri ini untuk pengunjung."
          className="mt-2 w-full resize-y rounded-lg border border-perpusnas-blue/20 px-3 py-2 text-sm"
        />
        <p className="mt-1 text-xs text-perpusnas-gray-600">Minimal 10 karakter.</p>
      </div>

      <UnggahGambarField
        id={`gambar-seri-${akhiran}`}
        label="Gambar sampul seri"
        nilai={draft.gambarUrl}
        berkas={draft.gambar}
        padaPilih={(berkas) => padaUbah({ gambar: berkas })}
        padaHapus={() => padaUbah({ gambarUrl: null })}
        placeholder={`${import.meta.env.BASE_URL}placeholder-poster.svg`}
        bantuan="Sampul tampil di kartu program. Kosongkan untuk memakai placeholder."
      />

      <div>
        <label htmlFor={`teks-alternatif-${akhiran}`} className="block text-sm font-semibold text-perpusnas-gray-900">
          Teks alternatif gambar
        </label>
        <input
          id={`teks-alternatif-${akhiran}`}
          aria-label="Teks alternatif gambar seri"
          maxLength={255}
          value={draft.teksAlternatif}
          onChange={(e) => padaUbah({ teksAlternatif: e.target.value })}
          placeholder="Misalnya: Sampul seri Naskah Nusantara"
          className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2 text-sm font-normal"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`kategori-seri-${akhiran}`} className="block text-sm font-semibold text-perpusnas-gray-900">
            Kategori seri
          </label>
          <select
            id={`kategori-seri-${akhiran}`}
            aria-label="Kategori seri"
            value={draft.kategori}
            onChange={(e) => padaUbah({ kategori: e.target.value as DraftSeri['kategori'] })}
            className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2 text-sm"
          >
            {daftarKategori.map((nilai) => (
              <option key={nilai} value={nilai}>{labelKategori[nilai]}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`urutan-seri-${akhiran}`} className="block text-sm font-semibold text-perpusnas-gray-900">
            Urutan tampil
          </label>
          <input
            id={`urutan-seri-${akhiran}`}
            aria-label="Urutan seri"
            type="number"
            min={1}
            value={draft.urutan}
            onChange={(e) => padaUbah({ urutan: Number(e.target.value) })}
            className="mt-2 w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-perpusnas-gray-600">Angka kecil tampil lebih awal.</p>
        </div>
      </div>

      <div>
        <span className="block text-sm font-semibold text-perpusnas-gray-900">Penanda seri</span>
        <label className="mt-2 flex items-center gap-2 text-sm text-perpusnas-gray-600">
          <input
            type="checkbox"
            aria-label="Jadikan seri unggulan"
            checked={draft.unggulan}
            onChange={(e) => padaUbah({ unggulan: e.target.checked })}
          />
          Tampilkan sebagai seri unggulan di beranda
        </label>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={padaSimpan}
          disabled={sedangMenyimpan}
          className="inline-flex items-center gap-2 rounded-lg bg-perpusnas-blue px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
        >
          <Check size={16} aria-hidden="true" />
          {sedangMenyimpan ? 'Menyimpan...' : teksTombol}
        </button>
        <button
          type="button"
          onClick={padaBatal}
          disabled={sedangMenyimpan}
          className="inline-flex items-center gap-2 rounded-lg bg-perpusnas-gray-100 px-4 py-2 text-sm font-semibold text-perpusnas-gray-600 disabled:opacity-50"
        >
          <X size={16} aria-hidden="true" />
          Batal
        </button>
      </div>
    </div>
  )
}
