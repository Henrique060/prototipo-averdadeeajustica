import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  assetsInclude: ['**/*.mind'],
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    exclude: ['aframe', 'mind-ar'],
  },
  build: {
    rollupOptions: {
      // remove the external block entirely
    }
  }
})