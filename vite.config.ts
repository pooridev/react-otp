import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      utils: path.resolve(__dirname, './src/utils'),
    },
  },
  server: {
    origin: 'http://localhost',
    port: 3000,
  },
})
