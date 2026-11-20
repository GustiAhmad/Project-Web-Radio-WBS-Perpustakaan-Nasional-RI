import { sanitasiHtml } from '../../utils/sanitasiHtml'

export default function ArtikelTampil({ isi }: { isi: string }) {
  return <div className="isi-artikel" dangerouslySetInnerHTML={{ __html: sanitasiHtml(isi) }} />
}
