import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import PlayerPlaceholder from './components/player/PlayerPlaceholder'
import HomePage from './pages/HomePage'
import SchedulePage from './pages/SchedulePage'
import ProgramPage from './pages/ProgramPage'
import SearchPage from './pages/SearchPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import { ujiKoneksiSupabase } from './services/supabase'

export default function App() {
  useEffect(() => {
    void ujiKoneksiSupabase()
  }, [])

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pb-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jadwal" element={<SchedulePage />} />
            <Route path="/program" element={<ProgramPage />} />
            <Route path="/cari" element={<SearchPage />} />
            <Route path="/tentang" element={<AboutPage />} />
            <Route path="/kontak" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <PlayerPlaceholder />
      </div>
    </BrowserRouter>
  )
}
