import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './route'
import 'normalize.css'
import '@/assets/css/global.scss'
import store from '@/store'
import createApi from '@/api'
import * as utils from '@/assets/js/utils'
import * as Cache from '@/assets/js/cache'
import '@/assets/css/element.scss'
import mitt from 'mitt'
import Cookies from 'js-cookie'
import ElementPlus, { ElMessageBox, ElMessage } from 'element-plus'
import { ListView } from '@flowlist/vue-listview'
import VImg from '@/components/img.vue'
import VSwitcher from 'v-switcher'
import 'v-switcher/dist/v-switcher.css'
import lazyload from '@/components/lazyload'

export const createApp = ViteSSG(App, { routes }, ({ app, isClient }) => {
  if (isClient) {
    const api = createApi()
    const bus = mitt()
    app.use(store)
    app.use(ElementPlus)
    app.component(VImg.name, VImg)
    app.component(VSwitcher.name, VSwitcher)
    app.component(ListView.name, ListView)
    app.directive('lazyload', lazyload)
    app.config.globalProperties.$utils = utils

    window.$bus = bus
    window.$api = api
    window.$store = store
    window.$cookie = Cookies
    window.$utils = utils
    window.$cache = Cache
    window.$alert = ElMessageBox.alert
    window.$confirm = ElMessageBox.confirm
    window.$prompt = ElMessageBox.prompt
    window.$toast = ElMessage
  }
})
