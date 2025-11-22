import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// We use PostCSS with the official tailwindcss plugin during build
// instead of the third-party '@tailwindcss/vite' plugin which may
// not be compatible with the installed Tailwind version.

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      }
    }
  }
})
