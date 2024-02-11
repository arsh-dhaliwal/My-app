import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': join(__dirname, 'src/renderer'),
    },
  },
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'chrome89',
    rollupOptions: {
      input: {
        main: join(__dirname, 'index.html'),
      },
      output: {
        format: 'cjs',
      },
    },
  },
  server: {
    port: 3000,
  },
  // Electron-builder integration
  electronBuilder: {
    nodeIntegration: true,
    builderOptions: {
      appId: 'com.thermwatch.app',
      productName: 'ThermWatch',
      extraResources: [
        {
          from: 'src/db',
          to: 'db',
        },
      ],
      publish: ['github'],
      files: [
        '**/*',
        'db/*.tmdb',
      ],
      win: {
        target: 'nsis',
        icon: 'public/electron-icon.png',
      },
      mac: {
        target: 'dmg',
        icon: 'public/electron-icon.png',
      },
      linux: {
        target: 'AppImage',
        icon: 'public/electron-icon.png',
      },
    },
  },
});