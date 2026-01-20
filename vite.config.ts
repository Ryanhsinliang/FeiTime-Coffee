/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'node:url';

// 取得當前檔案目錄路徑
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
  server: {
    host: true,
    allowedHosts: ['fourpenny-nonirrigable-jeanette.ngrok-free.dev'],
    port: 5173,
    strictPort: true, // 如果 5173 被佔用就報錯，避免 Ngrok 連錯埠口
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/strapi-api': {
        target: 'http://127.0.0.1:1337',
        changeOrigin: true,
        // 將 /strapi-api 轉成 Strapi 預設的 /api
      },
    },
  },
  test: {
    // 這裡保留基本的 Vitest 環境設定，如果不需要測試可以將整個 test 區塊移除
    environment: 'jsdom', // 或者 'happy-dom'
    globals: true,
  },
});
