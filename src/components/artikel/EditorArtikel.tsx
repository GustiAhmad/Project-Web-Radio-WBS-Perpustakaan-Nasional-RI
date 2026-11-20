import { useRef, useState, type ChangeEvent, type ReactNode } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextAlign } from '@tiptap/extension-text-align'
import { TableKit } from '@tiptap/extension-table'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Columns3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Rows3,
  Strikethrough,
  Table2,
  Trash2,
  Underline as UnderlineIcon,
  Undo2,
} from 'lucide-react'
import { GambarBerketerangan } from './GambarBerketerangan'
import { PESAN_GAMBAR_TIDAK_VALID, terimaBerkas, unggahGambar } from '../../services/aset'

type Props = {
  nilaiAwal: string
  padaUbah: (html: string) => void
  padaGalat: (pesan: string) => void
}

type TombolProps = {
  aktif?: boolean
  label: string
  onClick: () => void
  children: ReactNode
}

const BATAS_BARIS_TABEL = 8
const BATAS_KOLOM_TABEL = 8

function Tombol({ aktif = false, label, onClick, children }: TombolProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={aktif}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
        aktif
          ? 'border-perpusnas-blue bg-perpusnas-blue text-white'
          : 'border-perpusnas-blue/15 bg-white text-perpusnas-blue hover:bg-perpusnas-blue-light'
      }`}
    >
      {children}
    </button>
  )
}

function TombolTeks({ aktif = false, label, onClick }: Omit<TombolProps, 'children'>) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={aktif}
      onClick={onClick}
      className={`h-9 rounded-lg border px-2.5 text-xs font-bold transition ${
        aktif
          ? 'border-perpusnas-blue bg-perpusnas-blue text-white'
          : 'border-perpusnas-blue/15 bg-white text-perpusnas-blue hover:bg-perpusnas-blue-light'
      }`}
    >
      {label}
    </button>
  )
}

function Pemisah() {
  return <span className="mx-1 h-6 w-px bg-perpusnas-blue/10" aria-hidden="true" />
}

export default function EditorArtikel({ nilaiAwal, padaUbah, padaGalat }: Props) {
  const inputGambar = useRef<HTMLInputElement>(null)
  const inputPautan = useRef<HTMLInputElement>(null)
  const [pautanTerbuka, setPautanTerbuka] = useState(false)
  const [nilaiPautan, setNilaiPautan] = useState('')
  const [pemilihTabel, setPemilihTabel] = useState(false)
  const [ukuranTabel, setUkuranTabel] = useState({ baris: 3, kolom: 3 })

  const editor = useEditor(
    {
      immediatelyRender: false,
      content: nilaiAwal,
      extensions: [
        StarterKit.configure({
          heading: { levels: [2, 3] },
          link: { openOnClick: false, autolink: true, protocols: ['http', 'https', 'mailto'] },
        }),
        Image.configure({ allowBase64: false }),
        GambarBerketerangan,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Placeholder.configure({ placeholder: 'Tulis isi artikel di sini. Gunakan tombol di atas untuk format teks.' }),
        TableKit,
      ],
      onUpdate: ({ editor: instansi }) => padaUbah(instansi.getHTML()),
      editorProps: {
        attributes: {
          class: 'isi-artikel min-h-[280px] px-4 py-3 text-sm focus:outline-none',
        },
      },
    },
    []
  )

  function bukaPautan(): void {
    if (!editor) return
    setNilaiPautan((editor.getAttributes('link').href as string | undefined) || 'https://')
    setPautanTerbuka(true)
    requestAnimationFrame(() => inputPautan.current?.focus())
  }

  function hapusPautan(): void {
    editor?.chain().focus().extendMarkRange('link').unsetLink().run()
    setPautanTerbuka(false)
  }

  function terapkanPautan(): void {
    if (!editor) return
    const tautan = nilaiPautan.trim()
    if (!tautan) {
      hapusPautan()
      return
    }
    if (!/^(https?:\/\/|mailto:)/i.test(tautan)) {
      padaGalat('Tautan harus diawali https:// atau http://.')
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: tautan }).run()
    setPautanTerbuka(false)
  }

  function sisipkanTabel(baris: number, kolom: number): void {
    editor?.chain().focus().insertTable({ rows: baris, cols: kolom, withHeaderRow: true }).run()
    setPemilihTabel(false)
  }

  async function sisipkanGambar(e: ChangeEvent<HTMLInputElement>): Promise<void> {
    const berkas = e.target.files?.[0]
    e.target.value = ''
    if (!berkas || !editor) return
    if (!terimaBerkas(berkas)) {
      padaGalat(PESAN_GAMBAR_TIDAK_VALID)
      return
    }
    try {
      const url = await unggahGambar('artikel', crypto.randomUUID(), berkas)
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'gambarBerketerangan',
          attrs: { src: url, alt: '' },
          content: [],
        })
        .run()
    } catch (error) {
      padaGalat(error instanceof Error ? error.message : 'Gagal menyisipkan gambar.')
    }
  }

  return (
    <div className="rounded-xl border border-perpusnas-blue/20 bg-white">
      <div className="sticky top-16 z-20 rounded-t-xl border-b border-perpusnas-blue/10 bg-perpusnas-gray-50 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 p-2">
          <TombolTeks
            label="Paragraf"
            aktif={editor?.isActive('paragraph')}
            onClick={() => editor?.chain().focus().setParagraph().run()}
          />
          <TombolTeks
            label="H2"
            aktif={editor?.isActive('heading', { level: 2 })}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          />
          <TombolTeks
            label="H3"
            aktif={editor?.isActive('heading', { level: 3 })}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          />
          <Pemisah />
          <Tombol label="Tebal" aktif={editor?.isActive('bold')} onClick={() => editor?.chain().focus().toggleBold().run()}>
            <Bold size={16} aria-hidden="true" />
          </Tombol>
          <Tombol label="Miring" aktif={editor?.isActive('italic')} onClick={() => editor?.chain().focus().toggleItalic().run()}>
            <Italic size={16} aria-hidden="true" />
          </Tombol>
          <Tombol
            label="Garis bawah"
            aktif={editor?.isActive('underline')}
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon size={16} aria-hidden="true" />
          </Tombol>
          <Tombol
            label="Coret"
            aktif={editor?.isActive('strike')}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
          >
            <Strikethrough size={16} aria-hidden="true" />
          </Tombol>
          <Pemisah />
          <Tombol label="Rata kiri" aktif={editor?.isActive({ textAlign: 'left' })} onClick={() => editor?.chain().focus().setTextAlign('left').run()}>
            <AlignLeft size={16} aria-hidden="true" />
          </Tombol>
          <Tombol label="Rata tengah" aktif={editor?.isActive({ textAlign: 'center' })} onClick={() => editor?.chain().focus().setTextAlign('center').run()}>
            <AlignCenter size={16} aria-hidden="true" />
          </Tombol>
          <Tombol label="Rata kanan" aktif={editor?.isActive({ textAlign: 'right' })} onClick={() => editor?.chain().focus().setTextAlign('right').run()}>
            <AlignRight size={16} aria-hidden="true" />
          </Tombol>
          <Tombol label="Rata kanan-kiri" aktif={editor?.isActive({ textAlign: 'justify' })} onClick={() => editor?.chain().focus().setTextAlign('justify').run()}>
            <AlignJustify size={16} aria-hidden="true" />
          </Tombol>
          <Pemisah />
          <Tombol label="Daftar poin" aktif={editor?.isActive('bulletList')} onClick={() => editor?.chain().focus().toggleBulletList().run()}>
            <List size={16} aria-hidden="true" />
          </Tombol>
          <Tombol label="Daftar bernomor" aktif={editor?.isActive('orderedList')} onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
            <ListOrdered size={16} aria-hidden="true" />
          </Tombol>
          <Tombol label="Kutipan" aktif={editor?.isActive('blockquote')} onClick={() => editor?.chain().focus().toggleBlockquote().run()}>
            <Quote size={16} aria-hidden="true" />
          </Tombol>
          <Pemisah />
          <Tombol label="Sisipkan tautan" aktif={pautanTerbuka || editor?.isActive('link')} onClick={bukaPautan}>
            <Link2 size={16} aria-hidden="true" />
          </Tombol>
          <Tombol label="Sisipkan gambar" onClick={() => inputGambar.current?.click()}>
            <ImagePlus size={16} aria-hidden="true" />
          </Tombol>
          <div className="relative">
            <Tombol label="Sisipkan tabel" aktif={pemilihTabel} onClick={() => setPemilihTabel((buka) => !buka)}>
              <Table2 size={16} aria-hidden="true" />
            </Tombol>
            {pemilihTabel && (
              <div className="absolute left-0 top-full z-30 mt-2 w-56 rounded-xl border border-perpusnas-blue/20 bg-white p-3 shadow-lg">
                <p className="mb-2 text-xs font-bold text-perpusnas-gray-600">Pilih ukuran tabel</p>
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({ length: BATAS_BARIS_TABEL * BATAS_KOLOM_TABEL }, (_, indeks) => {
                    const baris = Math.floor(indeks / BATAS_KOLOM_TABEL) + 1
                    const kolom = (indeks % BATAS_KOLOM_TABEL) + 1
                    const dipilih = baris <= ukuranTabel.baris && kolom <= ukuranTabel.kolom
                    return (
                      <button
                        key={indeks}
                        type="button"
                        title={`${kolom} kolom × ${baris} baris`}
                        aria-label={`Tabel ${kolom} kolom ${baris} baris`}
                        onMouseEnter={() => setUkuranTabel({ baris, kolom })}
                        onFocus={() => setUkuranTabel({ baris, kolom })}
                        onClick={() => sisipkanTabel(baris, kolom)}
                        className={`h-5 w-5 rounded border ${
                          dipilih
                            ? 'border-perpusnas-blue bg-perpusnas-blue-light'
                            : 'border-perpusnas-blue/20 bg-white'
                        }`}
                      />
                    )
                  })}
                </div>
                <p className="mt-2 text-center text-xs font-bold text-perpusnas-blue">
                  {ukuranTabel.kolom} kolom × {ukuranTabel.baris} baris
                </p>
              </div>
            )}
          </div>
          <Tombol label="Garis horizontal" onClick={() => editor?.chain().focus().setHorizontalRule().run()}>
            <Minus size={16} aria-hidden="true" />
          </Tombol>
          {editor?.isActive('table') && (
            <>
              <Pemisah />
              <Tombol label="Tambah baris" onClick={() => editor?.chain().focus().addRowAfter().run()}>
                <Rows3 size={16} aria-hidden="true" />
              </Tombol>
              <Tombol label="Tambah kolom" onClick={() => editor?.chain().focus().addColumnAfter().run()}>
                <Columns3 size={16} aria-hidden="true" />
              </Tombol>
              <Tombol label="Hapus tabel" onClick={() => editor?.chain().focus().deleteTable().run()}>
                <Trash2 size={16} aria-hidden="true" />
              </Tombol>
            </>
          )}
          <Pemisah />
          <Tombol label="Urungkan" onClick={() => editor?.chain().focus().undo().run()}>
            <Undo2 size={16} aria-hidden="true" />
          </Tombol>
          <Tombol label="Ulangi" onClick={() => editor?.chain().focus().redo().run()}>
            <Redo2 size={16} aria-hidden="true" />
          </Tombol>
          <input
            ref={inputGambar}
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            aria-label="Pilih gambar untuk disisipkan"
            onChange={(event) => void sisipkanGambar(event)}
          />
        </div>
        {pautanTerbuka && (
          <div className="flex flex-wrap items-center gap-2 border-t border-perpusnas-blue/10 bg-white px-3 py-2">
            <label htmlFor="alamat-pautan-artikel" className="text-xs font-bold text-perpusnas-gray-600">
              Alamat tautan
            </label>
            <input
              ref={inputPautan}
              id="alamat-pautan-artikel"
              type="url"
              value={nilaiPautan}
              onChange={(e) => setNilaiPautan(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  terapkanPautan()
                }
                if (e.key === 'Escape') setPautanTerbuka(false)
              }}
              placeholder="https://contoh.id/artikel"
              className="min-w-[200px] flex-1 rounded-lg border border-perpusnas-blue/25 px-3 py-1.5 text-sm text-perpusnas-gray-900 focus:border-perpusnas-blue focus:outline-none"
            />
            <button
              type="button"
              onClick={terapkanPautan}
              className="rounded-lg bg-perpusnas-blue px-3 py-1.5 text-xs font-bold text-white hover:bg-perpusnas-blue-dark"
            >
              Terapkan
            </button>
            {editor?.isActive('link') && (
              <button
                type="button"
                onClick={hapusPautan}
                className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-50"
              >
                Hapus
              </button>
            )}
            <button
              type="button"
              onClick={() => setPautanTerbuka(false)}
              className="rounded-lg border border-perpusnas-blue/20 px-3 py-1.5 text-xs font-bold text-perpusnas-gray-600 hover:bg-perpusnas-gray-100"
            >
              Batal
            </button>
          </div>
        )}
      </div>
      <div className="rounded-b-xl bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
