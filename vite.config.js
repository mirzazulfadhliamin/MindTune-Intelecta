import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    
    return {
    plugins: [
        vue(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        allowedHosts: [
            'semierect-harlow-nonnationalistically.ngrok-free.dev', // your ngrok domain
        ],
        proxy: {
            '/api': {
                target: env.VITE_API_URL,
                changeOrigin: true,
                secure: false
            }
        }
    },
    };
});
