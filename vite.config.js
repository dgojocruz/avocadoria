import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://avocadoria.com.ph',
      dynamicRoutes: [
        '/',
        '/our-stores',
        '/about',
        '/menu',
        '/franchise',
        '/party-cart',
        '/careers',
        '/contact',
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          lightbox: ['yet-another-react-lightbox'],
        },
      },
    },
  },
})
