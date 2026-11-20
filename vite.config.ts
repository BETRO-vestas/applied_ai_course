import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  root: 'app',
  base: '/applied-ai-course/',
  build: { outDir: '../dist', emptyOutDir: true },
  server: { fs: { allow: ['..'] } },
  plugins: [
    preact(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png', 'icon.svg'],
      manifest: {
        name: 'Applied AI for Grid Teams',
        short_name: 'Grid AI',
        description: 'Daily micro-lessons in applied AI and agentic workflows for grid connection teams.',
        theme_color: '#0f766e',
        background_color: '#f7f7f5',
        display: 'standalone',
        start_url: '.',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: { globPatterns: ['**/*.{js,css,html,svg,png}'] },
    }),
  ],
});
