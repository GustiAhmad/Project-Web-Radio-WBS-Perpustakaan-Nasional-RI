import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import AdminLayout from './components/admin/AdminLayout'
import AdminRoute from './components/admin/AdminRoute'
import { Pemuatan } from './components/common/StateBox'
import Footer from './components/common/Footer'
import Header from './components/common/Header'
import PersistentPlayer from './components/player/PersistentPlayer'
import HomePage from './pages/HomePage'
import { AudioProvider } from './context/AudioContext'
import { AuthProvider } from './context/AuthContext'
import { lacakEvent, muatPengaturanAnalitik } from './services/ga4'
import { ujiKoneksiSupabase } from './services/supabase'

const AboutPage = lazy(() => import('./pages/AboutPage'))
const AcaraDetailPage = lazy(() => import('./pages/AcaraDetailPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const EpisodeDetailPage = lazy(() => import('./pages/EpisodeDetailPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const ProgramListPage = lazy(() => import('./pages/ProgramListPage'))
const SchedulePage = lazy(() => import('./pages/SchedulePage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const SeriesDetailPage = lazy(() => import('./pages/SeriesDetailPage'))
const AdminAcaraPage = lazy(() => import('./pages/admin/AdminAcaraPage'))
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'))
const AdminEpisodePage = lazy(() => import('./pages/admin/AdminEpisodePage'))
const AdminHalamanPage = lazy(() => import('./pages/admin/AdminHalamanPage'))
const AdminJadwalPage = lazy(() => import('./pages/admin/AdminJadwalPage'))
const AdminLaporanErrorPage = lazy(() => import('./pages/admin/AdminLaporanErrorPage'))
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'))
const AdminPengaturanPage = lazy(() => import('./pages/admin/AdminPengaturanPage'))
const AdminPenggunaPage = lazy(() => import('./pages/admin/AdminPenggunaPage'))
const AdminPenyiarPage = lazy(() => import('./pages/admin/AdminPenyiarPage'))
const AdminQnAPage = lazy(() => import('./pages/admin/AdminQnAPage'))
const AdminSeriPage = lazy(() => import('./pages/admin/AdminSeriPage'))

function KontenAplikasi() {
  const lokasi = useLocation()
  const diAdmin = lokasi.pathname.startsWith('/admin')

  useEffect(() => {
    if (diAdmin) return
    lacakEvent('page_view', { page_path: lokasi.pathname })
  }, [lokasi.pathname, diAdmin])

  return (
    <AudioProvider>
      <a href="#konten-utama" className="skip-link">
        Lewati ke konten utama
      </a>
      <div className="flex min-h-screen flex-col">
        {!diAdmin && <Header />}
        <main id="konten-utama" className="flex-1 pb-20">
          <Suspense
            fallback={
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <Pemuatan pesan="Memuat halaman..." />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/acara/:id" element={<AcaraDetailPage />} />
              <Route path="/jadwal" element={<SchedulePage />} />
              <Route path="/program" element={<ProgramListPage />} />
              <Route path="/program/:seriSlug" element={<SeriesDetailPage />} />
              <Route path="/program/:seriSlug/:episodeSlug" element={<EpisodeDetailPage />} />
              <Route path="/cari" element={<SearchPage />} />
              <Route path="/tentang" element={<AboutPage />} />
              <Route path="/kontak" element={<ContactPage />} />
              <Route path="/kebijakan-privasi" element={<PrivacyPage />} />

              <Route path="/admin/masuk" element={<AdminLoginPage />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<AdminDashboardPage />} />
                <Route path="tanya-jawab" element={<AdminQnAPage />} />
                <Route path="jadwal" element={<AdminJadwalPage />} />
                <Route path="episode" element={<AdminEpisodePage />} />
                <Route path="seri" element={<AdminSeriPage />} />
                <Route path="acara" element={<AdminAcaraPage />} />
                <Route path="halaman" element={<AdminHalamanPage />} />
                <Route path="penyiar" element={<AdminPenyiarPage />} />
                <Route path="pengguna" element={<AdminPenggunaPage />} />
                <Route path="laporan-error" element={<AdminLaporanErrorPage />} />
                <Route
                  path="pengaturan"
                  element={
                    <AdminRoute superadminSaja>
                      <AdminPengaturanPage />
                    </AdminRoute>
                  }
                />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        {!diAdmin && <Footer />}
        <PersistentPlayer />
      </div>
    </AudioProvider>
  )
}

export default function App() {
  useEffect(() => {
    void ujiKoneksiSupabase()
    void muatPengaturanAnalitik()
  }, [])

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <AuthProvider>
        <KontenAplikasi />
      </AuthProvider>
    </BrowserRouter>
  )
}
