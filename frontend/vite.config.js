import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), cloudflare()],
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