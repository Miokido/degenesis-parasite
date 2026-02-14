import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const CONTEXT_ROOT = process.env.CONTEXT_ROOT || '';

// https://vitejs.dev/config/
export default defineConfig({
  base: `${CONTEXT_ROOT}/`,
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
