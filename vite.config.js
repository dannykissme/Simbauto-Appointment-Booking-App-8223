import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentGretaTagger } from "@questlabs/greta-tagger";

export default defineConfig({
  plugins: [componentGretaTagger(),react()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
   build: {
    outDir: 'dist',
    sourcemap: true
  },
});