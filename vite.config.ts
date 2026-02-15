import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // SI ton repo s'appelle "miokido.github.io", la base doit être '/'
  // SI ton repo s'appelle "autre-nom", la base doit être '/autre-nom/'
  base: '/', 
  
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // Il est préférable de rester sur 'dist' (standard Vite) 
    // pour éviter les confusions, mais 'build' fonctionne si tu copies ce dossier.
    outDir: 'dist', 
  }
})