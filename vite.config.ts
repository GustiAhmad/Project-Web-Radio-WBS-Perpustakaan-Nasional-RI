import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const base = env.VITE_BASE_PATH || (mode === 'production' ? '/Project-Web-Radio-WBS-Perpustakaan-Nasional-RI/' : '/')

  return {
    base,
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return
            if (id.includes('@supabase')) return 'supabase'
            if (id.includes('react-router') || id.includes('@remix-run')) return 'router'
            if (id.includes('lucide-react')) return 'icons'
            if (id.includes('react')) return 'react'
          },
        },
      },
    },
  }
})
