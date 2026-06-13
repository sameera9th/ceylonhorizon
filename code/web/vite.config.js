import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const adminPreviewFallback = {
  name: 'admin-preview-fallback',
  configurePreviewServer(server) {
    server.middlewares.use((request, _response, next) => {
      const pathname = new URL(request.url, 'http://localhost').pathname

      if (
        (pathname === '/admin' || pathname.startsWith('/admin/')) &&
        !pathname.split('/').pop().includes('.')
      ) {
        request.url = '/admin/index.html'
      }

      next()
    })
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), adminPreviewFallback],
})
