import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './route'
import 'normalize.css'
import '@/assets/css/global.scss'
import mitt from 'mitt'
import Cookies from 'js-cookie'
import store from '@/store'
import api from '@/api'
import imageResize from '@/assets/js/imageResize'

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  {
    routes
  },
  ({ app }) => {
    app.use(store)
    app.config.globalProperties.$bus = mitt()
    app.config.globalProperties.$axios = api
    app.config.globalProperties.$cookie = Cookies
    app.config.globalProperties.$resize = imageResize
  }
)
