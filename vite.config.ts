import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/RIP_Toeing_Frontend/',
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'prompt',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      strategies: 'generateSW',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /\/images\/rumbs\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'rumbs-images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
      includeAssets: ['favicon.ico', 'icon-192.svg', 'icon-512.svg'],
      manifest: {
        name: 'Toeing - Румбы ветров',
        short_name: 'Toeing',
        description: 'Приложение для расчета полетов по румбам ветров',
        theme_color: '#17a2b8',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/RIP_Toeing_Frontend/',
        start_url: '/RIP_Toeing_Frontend/',
        categories: ['utilities', 'productivity'],
        screenshots: [
          {
            src: '/RIP_Toeing_Frontend/icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            form_factor: 'wide',
            label: 'Toeing Application',
          },
        ],
        icons: [
          {
            src: '/RIP_Toeing_Frontend/icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/RIP_Toeing_Frontend/icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/RIP_Toeing_Frontend/icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
          {
            src: '/RIP_Toeing_Frontend/icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    },
  },
});
