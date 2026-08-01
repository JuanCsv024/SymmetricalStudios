import { defineConfig } from 'vite';
import htmlMinify from 'vite-plugin-html-minify';

export default defineConfig({
  plugins: [
    htmlMinify({
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })
  ]
});