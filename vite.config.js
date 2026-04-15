// Імпортуємо необхідні функції з бібліотеки vite
import { defineConfig, loadEnv } from 'vite'
// Імпортуємо плагін для підтримки React (JSX, Hot Module Replacement тощо)
import react from '@vitejs/plugin-react'

// Експортуємо конфігурацію. Функція отримує режим (mode), наприклад 'development' або 'production'
export default defineConfig(({ mode }) => {
  // Завантажуємо змінні оточення з файлів .env залежно від режиму
  const env = loadEnv(mode, '.', '')
  
  // Визначаємо адресу бекенд-сервера. 
  // Пріоритет у змінної VITE_PROXY_TARGET з .env, інакше використовується локальний порт 3000
  const proxyTarget = env.VITE_PROXY_TARGET || 'http://127.0.0.1:3000'

  return {
    // Підключаємо плагін React
    plugins: [react()],
    
    // Налаштування сервера розробки
    server: {
      // Налаштування проксі-сервера
      proxy: {
        // Якщо запит від фронтенду починається з /inventory...
        '/inventory': {
          target: proxyTarget,    // ...перенаправити його на бекенд (порт 3000)
          changeOrigin: true,     // змінює заголовок Host на адресу цілі (важливо для обходу CORS)
        },
        // Якщо запит починається з /register...
        '/register': {
          target: proxyTarget,    // ...також перенаправити на бекенд
          changeOrigin: true,
        },
      },
    },
  }
})