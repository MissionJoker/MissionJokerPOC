import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import jokerFavicon from './assets/joker.png'
import './index.css'
import App from './App.tsx'

const faviconLink = document.querySelector<HTMLLinkElement>("link[rel='icon']")
if (faviconLink) {
  faviconLink.href = jokerFavicon
  faviconLink.type = 'image/png'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/MissionJokerPOC">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
