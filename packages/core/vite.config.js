import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // example : additionalData: `@import "./src/design/styles/variables";`
        // dont need include file extend .scss
        additionalData: `@import "../../shared/css/mixin.scss";@import "../../shared/css/var.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  plugins: [vue()],
  ssgOptions: {
    entry: 'src/main.js'
  }
})
