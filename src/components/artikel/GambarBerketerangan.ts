import { Node, ReactNodeViewRenderer } from '@tiptap/react'
import GambarBerketeranganView from './GambarBerketeranganView'

/**
 * Gambar artikel sebagai blok tersendiri. Keterangan bukan lagi atribut,
 * melainkan teks di dalam figcaption yang bisa diketik langsung di editor.
 */
export const GambarBerketerangan = Node.create({
  name: 'gambarBerketerangan',
  group: 'block',
  content: 'inline*',
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: '' },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'figure',
        contentElement: 'figcaption',
        getAttrs: (elemen) => {
          const gambar = (elemen as HTMLElement).querySelector('img')
          if (!gambar) return false
          return {
            src: gambar.getAttribute('src'),
            alt: gambar.getAttribute('alt') ?? '',
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const src = String(HTMLAttributes.src ?? '')
    const alt = String(HTMLAttributes.alt ?? '')

    return [
      'figure',
      { class: 'gambar-artikel' },
      ['img', { src, alt }],
      ['figcaption', {}, 0],
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(GambarBerketeranganView)
  },
})
