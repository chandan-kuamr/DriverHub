// import react from '@vitejs/plugin-react'
// import { defineConfig } from 'vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5001,

    proxy: {
      '/api': {
        target: 'https://driverhub-3.onrender.com',
        changeOrigin: true,
      },
    },
  },
})