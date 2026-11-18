import HalamanStatisView from '../components/common/HalamanStatisView'

export default function PrivacyPage() {
  return (
    <HalamanStatisView
      slug="kebijakan-privasi"
      judulFallback="Kebijakan Privasi"
      isiFallback="Kami tidak menyimpan alamat IP mentah di basis data aplikasi. Analitik kunjungan memakai penyamaran IP untuk statistik agregat."
    />
  )
}
