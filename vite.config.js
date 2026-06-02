import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  assetsInclude: ['**/*.mind'],
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      external: ['aframe', 'mind-ar/dist/mindar-image-aframe.prod.js'],
    }
  }
})