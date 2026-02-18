import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto', // Avtomatik service worker ro'yxatga olish
      manifest: {
        name: 'Ramazon Taqvimi 2026',
        short_name: 'Ramazon2026',
        description: '2026-yilgi Ramazon taqvimi. Saharlik va iftorlik vaqtlari.', // Tavsif qo'shildi
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/logo.png', // Slash bilan yozing
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any' 
          },
          {
            src: '/logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable' // Play Market uchun muhim
          }
        ]
      }
    })
  ]
})