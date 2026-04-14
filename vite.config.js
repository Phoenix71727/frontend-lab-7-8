import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const proxyTarget = env.VITE_PROXY_TARGET || 'http://127.0.0.1:3000'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/inventory': {
          target: proxyTarget,
          changeOrigin: true,
        },
        '/register': {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
  }
})
