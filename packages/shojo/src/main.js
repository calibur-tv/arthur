import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './route'
import 'normalize.css'
import '@/assets/css/global.scss'
import mitt from 'mitt'
import Cookies from 'js-cookie'
import store from '@/store'
import createApi from '@/api'
import * as utils from '@/assets/js/utils'
import * as Cache from '@/assets/js/cache'
import '@/assets/css/element.scss'

export const createApp = ViteSSG(App, { routes }, ({ app, isClient }) => {
  const api = createApi()
  const bus = mitt()
  app.use(store)
  app.config.globalProperties.$utils = utils

  if (isClient) {
    window.$bus = bus
    window.$api = api
    window.$store = store
    window.$cookie = Cookies
    window.$utils = utils
    window.$cache = Cache
  }
})
