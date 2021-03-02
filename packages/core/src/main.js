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
import mfe from '@/mixins/mfe'

const isDev = process.env.NODE_ENV === 'development'
const BASE_URL = isDev ? 'http://localhost:9000/' : 'https://fc.calibur.tv/'

export const createApp = ViteSSG(App, { routes }, ({ app, isClient }) => {
  const api = createApi(BASE_URL)
  const bus = mitt()
  app.use(store)
  app.mixin(mfe)
  app.config.globalProperties.$resize = imageResize

  if (isClient) {
    window.$bus = bus
    window.$api = api
    window.$store = store
    window.$cookie = Cookies
  }
})
