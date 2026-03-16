import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('Root element not found: <div id="root"></div> missing in index.html')
}
createRoot(rootEl).render(<App />)
