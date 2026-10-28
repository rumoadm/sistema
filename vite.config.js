import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/sistema/' : '/',
  plugins: [
    {
      name: 'entrada-local',
      apply: 'serve',
      transformIndexHtml(html) {
        return html
          .replace(
            /<script type="module"[^>]*src="\/sistema\/assets\/app\.js"[^>]*><\/script>/,
            '<script type="module" src="/src/main.jsx"></script>',
          )
          .replace(/<link rel="stylesheet"[^>]*href="\/sistema\/assets\/[^"]+\.css"[^>]*>/, '')
      },
    },
    react(),
  ],
  build: {
    rollupOptions: {
      input: 'index.dev.html',
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
})
