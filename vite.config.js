import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import cdn from 'vite-plugin-cdn-import'

export default defineConfig({
  base: '/',
  assetsInclude: ['**/*.mind'],
  plugins: [
    react(), 
    tailwindcss(),
    cdn({
      modules: [
        {
          name: 'react',
          var: 'React',
          path: 'https://unpkg.com/react@19.2.7/umd/react.production.min.js',
        },
        {
          name: 'react-dom',
          var: 'ReactDOM',
          path: 'https://unpkg.com/react-dom@19.2.7/umd/react-dom.production.min.js',
        },
        {
          name: 'three',
          var: 'THREE',
          path: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
        }
      ],
    }),
  ],
  optimizeDeps: {
    exclude: ['aframe', 'mind-ar', 'three'],
  },
  build: {
    rollupOptions: {
      output: {
        // Keeps any remaining internal dependencies split into tiny chunks
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})