import path from 'path'
import { defineConfig } from 'vite'
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'Bus'
    }
  },
  plugins: [commonjs(), babel({ babelHelpers: 'bundled' })]
})
