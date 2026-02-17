import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n.js'

// Service Worker-ni ro'yxatdan o'tkazish (PWA uchun)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js') // public papkasidagi sw.js faylini qidiradi
      .then((registration) => {
        console.log('SW roʻyxatdan oʻtdi: ', registration.scope);
      })
      .catch((error) => {
        console.log('SW roʻyxatdan oʻtishda xato: ', error);
      });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </StrictMode>
)