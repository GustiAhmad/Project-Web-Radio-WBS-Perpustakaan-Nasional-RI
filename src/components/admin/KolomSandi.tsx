import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type Props = {
  id: string
  nilai: string
  onChange: (nilai: string) => void
  label?: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
  bantuan?: string
}

export default function KolomSandi({
  id,
  nilai,
  onChange,
  label = 'Kata sandi',
  placeholder,
  autoComplete,
  required = false,
  bantuan,
}: Props) {
  const [tampil, setTampil] = useState(false)

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-perpusnas-gray-900">{label}</label>
      <div className="relative mt-2">
        <input
          id={id}
          type={tampil ? 'text' : 'password'}
          required={required}
          value={nilai}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full rounded-lg border border-perpusnas-blue/20 px-3 py-2.5 pr-11 text-sm outline-none focus:border-perpusnas-blue focus:ring-2 focus:ring-perpusnas-blue/20"
        />
        <button
          type="button"
          onClick={() => setTampil((nilaiSekarang) => !nilaiSekarang)}
          aria-label={tampil ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          aria-pressed={tampil}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-perpusnas-gray-600 hover:text-perpusnas-blue"
        >
          {tampil ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
        </button>
      </div>
      {bantuan && <p className="mt-1 text-xs text-perpusnas-gray-600">{bantuan}</p>}
    </div>
  )
}
