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
        // This splits your giant dependencies into smaller, separate chunks
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})