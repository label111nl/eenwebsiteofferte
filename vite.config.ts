import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Configure the development server
  server: {
    port: 5173, // Default port for Vite
    proxy: {
      // Proxy API requests to the backend
      '/api': {
        target: 'http://localhost:3000', // Your backend server
        changeOrigin: true,
        secure: false, // Set to true if using HTTPS for the backend
      },
    },
  },

  // Optimization settings
  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  // Build options for production
  build: {
    outDir: 'dist', // Output directory for the build
    sourcemap: true, // Generate source maps for debugging
  },
});
