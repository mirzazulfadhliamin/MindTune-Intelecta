import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(() => {    
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
            'semierect-harlow-nonnationalistically.ngrok-free.dev', // your ngrok domain,
            '036d6edcdd71.ngrok-free.app',
        ]
    },
    };
});
