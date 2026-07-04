import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
// Base path is deploy-specific: GitHub Pages serves under /portfolio/
// (its workflow sets VITE_BASE); Vercel, Railway and local dev serve at /.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE ?? '/',
});
