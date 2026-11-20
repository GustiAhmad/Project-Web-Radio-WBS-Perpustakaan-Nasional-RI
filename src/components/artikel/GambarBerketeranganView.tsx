import { NodeViewContent, NodeViewWrapper, type NodeViewProps } from '@tiptap/react'

/** Tampilan gambar di editor: kolom keterangan langsung tersedia di bawah gambar. */
export default function GambarBerketeranganView({ node }: NodeViewProps) {
  return (
    <NodeViewWrapper as="figure" className="gambar-artikel my-7 flex flex-col items-center">
      <img
        src={String(node.attrs.src ?? '')}
        alt={String(node.attrs.alt ?? '')}
        contentEditable={false}
        draggable={false}
        className="max-w-full rounded-lg shadow-sm"
      />
      <NodeViewContent<'figcaption'>
        as="figcaption"
        className="mt-3 w-full max-w-2xl rounded-lg border border-dashed border-perpusnas-blue/25 bg-white px-3 py-2 text-center text-sm italic text-perpusnas-gray-600 focus:border-perpusnas-blue focus:outline-none"
        {...{ 'data-placeholder': 'Tulis keterangan gambar (opsional)' }}
      />
    </NodeViewWrapper>
  )
}
