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
      external: ['aframe', 'mind-ar'],
      output: {
        manualChunks(id) {
  if (id.includes('node_modules/@google/model-viewer')) {
    return 'model-viewer'
  }
  if (id.includes('node_modules/react-dom')) {
    return 'react-dom'
  }
  if (id.includes('node_modules/react')) {
    return 'react'
  }
  if (id.includes('node_modules/')) {
    return 'vendor'
  }
}
      }
    }
  }
})