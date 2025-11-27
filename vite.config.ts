import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import {api_proxy_addr, img_proxy_addr, dest_root} from './target_config';

export default defineConfig({
  base: dest_root,
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: api_proxy_addr,
        changeOrigin: true,
        secure: false,
      },
      '/img-proxy': {
        target: img_proxy_addr,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/img-proxy/, '/'),
      },
    },
  },
});
