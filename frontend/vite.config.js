// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,               // разрешить внешние подключения
    port: 5173,               // ваш порт dev-сервера
    // Разрешить все поддомены trycloudflare.com
    allowedHosts: ['.trycloudflare.com']
    // Если нужно временно разрешить все хосты (не рекомендуется):
    // allowedHosts: 'all'
  }
})
