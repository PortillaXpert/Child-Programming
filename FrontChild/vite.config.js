import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      '@': '/src',
      'components': '/src/components',
      'assets': '/src/assets',
      'utils': '/src/utils',
      'services': '/src/services'
    }
  },
})
