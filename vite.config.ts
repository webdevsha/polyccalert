import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Configure base path for GitHub Pages deployment
  // For repository named 'FutuResume', the base should be '/FutuResume/'
  base: process.env.NODE_ENV === 'production' ? '/FutuResume/' : '/',
});
