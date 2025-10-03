import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    allowedHosts: [
      'frontend-wpwr.onrender.com',
      'ft-web-full.onrender.com',
      'farwaytechnologies.com'
    ]
  }
})
