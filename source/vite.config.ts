import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { readdirSync } from 'node:fs'

export default defineConfig({
  base: './',
  publicDir: false,
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: {
    rollupOptions: {
      input: Object.fromEntries(readdirSync('.').filter(name => name.endsWith('.html')).map(name => [name.slice(0, -5), fileURLToPath(new URL(name, import.meta.url))])),
    },
  },
})
