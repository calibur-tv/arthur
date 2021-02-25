import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './route'
import 'normalize.css'
import '@/assets/css/global.scss'
import mitt from 'mitt'
import Cookies from 'js-cookie'
import store from '@/store'
import createApi from '@/api'
import imageResize from '@/assets/js/imageResize'

const isDev = process.env.NODE_ENV === 'development'
const BASE_URL = isDev ? 'http://localhost:9000/' : 'https://fc.calibur.tv/'

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  {
    routes
  },
  ({ app, isClient }) => {
    const axios = createApi(BASE_URL)
    app.use(store)
    app.config.globalProperties.$bus = mitt()
    app.config.globalProperties.$axios = axios
    app.config.globalProperties.$cookie = Cookies
    app.config.globalProperties.$resize = imageResize

    if (isClient) {
      window.$axios = axios
      window.BASE_URL = BASE_URL
    }
  }
)
