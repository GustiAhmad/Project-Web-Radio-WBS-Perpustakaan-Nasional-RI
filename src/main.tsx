import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initGA4 } from './services/ga4'
import './index.css'

initGA4()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
