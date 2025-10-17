import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/polyccalert/', // Add this line - must match your repository name
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
