import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import PersistentPlayer from './components/player/PersistentPlayer'
import { AudioProvider } from './context/AudioContext'
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
import { ujiKoneksiSupabase } from './services/supabase'

export default function App() {
  useEffect(() => {
    void ujiKoneksiSupabase()
  }, [])

  return (
    <BrowserRouter>
      <AudioProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
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
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <PersistentPlayer />
        </div>
      </AudioProvider>
    </BrowserRouter>
  )
}
