import { defineConfig } from 'vite/dist/node'
import react from '@vitejs/plugin-react/dist'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
