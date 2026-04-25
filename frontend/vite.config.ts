import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        headers: {
          // Simulates a real public IP so MaxMind geolocation fires in local dev.
          // Change to any public IP you want to test a different location.
          'X-Real-IP': '68.74.138.134',
        },
      },
    },
  },
})
