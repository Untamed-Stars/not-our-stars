
// vite.config.js - VITE BUILD CONFIGURATION

import { defineConfig } from 'vite';

export default defineConfig({
    base: '/not-our-stars/',

    build: {
        outDir: 'dist',
        emptyOutDir: true
    },

    server: {
        host: true
    }
});
