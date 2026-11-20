import DOMPurify from 'dompurify'

const TAG_DIIZINKAN = [
  'p',
  'br',
  'hr',
  'h2',
  'h3',
  'strong',
  'b',
  'em',
  'i',
  'u',
  's',
  'strike',
  'ul',
  'ol',
  'li',
  'blockquote',
  'pre',
  'code',
  'a',
  'figure',
  'figcaption',
  'img',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
]

DOMPurify.addHook('afterSanitizeAttributes', (simpul) => {
  if (simpul instanceof Element && simpul.tagName === 'A') {
    simpul.setAttribute('target', '_blank')
    simpul.setAttribute('rel', 'noopener noreferrer nofollow')
  }
})

/** Isi artikel disimpan sebagai HTML terbatas, lalu dibersihkan sebelum ditampilkan. */
export function sanitasiHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: TAG_DIIZINKAN,
    ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'title', 'class', 'colspan', 'rowspan', 'scope'],
    ALLOW_DATA_ATTR: false,
    ALLOW_ARIA_ATTR: false,
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'svg', 'math'],
    FORBID_ATTR: ['style', 'onerror', 'onload', 'onclick'],
  })
}

/** dipakai untuk validasi panjang isi tanpa menghitung tag HTML. */
export function teksDariHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
