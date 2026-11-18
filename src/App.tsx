import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import AdminLayout from './components/admin/AdminLayout'
import AdminRoute from './components/admin/AdminRoute'
import Footer from './components/common/Footer'
import Header from './components/common/Header'
import PersistentPlayer from './components/player/PersistentPlayer'
import { AudioProvider } from './context/AudioContext'
import { AuthProvider } from './context/AuthContext'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import EpisodeDetailPage from './pages/EpisodeDetailPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import PrivacyPage from './pages/PrivacyPage'
import ProgramListPage from './pages/ProgramListPage'
import SchedulePage from './pages/SchedulePage'
import SearchPage from './pages/SearchPage'
import SeriesDetailPage from './pages/SeriesDetailPage'
import AdminAcaraPage from './pages/admin/AdminAcaraPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminEpisodePage from './pages/admin/AdminEpisodePage'
import AdminHalamanPage from './pages/admin/AdminHalamanPage'
import AdminJadwalPage from './pages/admin/AdminJadwalPage'
import AdminLaporanErrorPage from './pages/admin/AdminLaporanErrorPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminPengaturanPage from './pages/admin/AdminPengaturanPage'
import AdminQnAPage from './pages/admin/AdminQnAPage'
import AdminSeriPage from './pages/admin/AdminSeriPage'
import { ujiKoneksiSupabase } from './services/supabase'

function KontenAplikasi() {
  const lokasi = useLocation()
  const diAdmin = lokasi.pathname.startsWith('/admin')

  return (
    <AudioProvider>
      <div className="flex min-h-screen flex-col">
        {!diAdmin && <Header />}
        <main className="flex-1 pb-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
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
  }, [])

  return (
    <BrowserRouter>
      <AuthProvider>
        <KontenAplikasi />
      </AuthProvider>
    </BrowserRouter>
  )
}
