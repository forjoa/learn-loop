import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['icon.png'],
      manifest: {
        name: 'Learn Loop',
        short_name: 'LearnLoop',
        description: 'The best way to learn',
        theme_color: '#17181A',
        icons: [
          {
            src: 'icon.png',
            sizes: '100x122',
            type: 'image/png',
          },
          {
            src: 'icon.png',
            sizes: '100x122',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
  },
})
