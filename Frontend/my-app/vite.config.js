import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  // Use absolute base so asset URLs are rooted at '/' in production.
  // Relative base ('./') causes script tags like './assets/...' which break
  // when the app is opened on nested routes (the browser will request
  // '/some/route/assets/...' and the server may respond with index.html).
  base: "/",
})
