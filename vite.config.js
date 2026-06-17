import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  assetsInclude: ['**/*.mind'],
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    exclude: ['aframe', 'mind-ar'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/aframe') || id.includes('node_modules/three')) {
            return 'aframe-three'
          }
          if (id.includes('node_modules/mind-ar')) {
            return 'mind-ar'
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/')) {
            return 'vendor'
          }
        }
      }
    }
  }
})