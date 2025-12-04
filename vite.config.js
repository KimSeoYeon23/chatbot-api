import { defineConfig } from 'vite'

export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    proxy: {
      '/chatbot': {
        target: 'http://localhost:3002',
        changeOrigin: true
      }
    }
  }
})
