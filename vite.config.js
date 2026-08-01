import { defineConfig } from 'vite';
import htmlMinify from 'vite-plugin-html-minify';

export default defineConfig({
  plugins: [
    htmlMinify()
  ]
});