import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://avocadoria.com',
      dynamicRoutes: [
        '/',
        '/our-stores',
        '/about',
        '/menu',
        '/franchise',
        '/party-cart',
        '/careers',
        '/gallery/photos',
        '/gallery/videos',
      ],
    }),
  ],
  resolve: {
    alias: { '@': '/src' },
  },
  build: {
    outDir: 'dist',
    // Warn if any chunk exceeds 500KB
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor:   ['react', 'react-dom', 'react-router-dom'],
          lightbox: ['yet-another-react-lightbox'],
          helmet:   ['react-helmet-async'],
        },
      },
    },
  },
})
