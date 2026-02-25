import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    base: '/hausen_portfolio-v2/',
    plugins: [react()],
})
