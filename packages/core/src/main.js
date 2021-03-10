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
import ElementPlus, { ElMessageBox, ElMessage } from 'element-plus'
import { ListView } from '@flowlist/vue-listview'
import '@/assets/css/element.scss'

export const createApp = ViteSSG(App, { routes }, ({ app, isClient }) => {
  const api = createApi()
  const bus = mitt()
  app.use(store)
  app.use(ElementPlus)
  app.component(ListView.name, ListView)
  app.config.globalProperties.$resize = imageResize

  if (isClient) {
    window.$bus = bus
    window.$api = api
    window.$store = store
    window.$cookie = Cookies
    window.$alert = ElMessageBox.alert
    window.$confirm = ElMessageBox.confirm
    window.$prompt = ElMessageBox.prompt
    window.$toast = ElMessage
  }
})
