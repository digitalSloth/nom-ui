import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import {resolve} from 'path'

// Builds the demo app (index.html) as a static site for GitHub Pages.
// `base` must match the repo name so assets resolve under
// https://digitalsloth.github.io/nom-ui/.
export default defineConfig({
  base: '/nom-ui/',
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      'nom-ui': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist-demo',
  },
})
