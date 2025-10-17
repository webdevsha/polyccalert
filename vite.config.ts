import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/polyccalert/' : '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5500,
    host: '127.0.0.1'
  },
  assetsInclude: ['**/*.png'],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
});
