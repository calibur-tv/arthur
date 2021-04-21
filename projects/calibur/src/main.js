import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './route'
import 'normalize.css'
import '@/assets/css/global.scss'
import mitt from 'mitt'
import Cookies from 'js-cookie'
import user from '@calibur/user'
import store from '@/store'
import createApi from '@/api'
import * as utils from '@/assets/js/utils'
import imageResize from '@/assets/js/imageResize'
import ElementPlus, { ElMessageBox, ElMessage } from 'element-plus'
import { ListView } from '@flowlist/vue-listview'
import '@/assets/css/element.scss'
import * as Cache from '@/assets/js/cache'
import Manager from '@/assets/js/manager'
import Curtain from '@/components/app/AppCurtain.vue'

export const createApp = ViteSSG(App, { routes }, ({ app, isClient }) => {
  const api = createApi()
  const bus = mitt()
  app.use(store)
  app.use(ElementPlus)
  app.component(ListView.name, ListView)
  app.component(Curtain.name, Curtain)
  app.config.globalProperties.$resize = imageResize
  app.config.globalProperties.$utils = utils

  if (isClient) {
    user.get().then((user) => {
      store.commit('SET_USER_INFO', user)
    })
    user.watch((user) => {
      store.commit('SET_USER_INFO', user)
    })

    window.$bus = bus
    window.$api = api
    window.$store = store
    window.$cookie = Cookies
    window.$alert = ElMessageBox.alert
    window.$confirm = ElMessageBox.confirm
    window.$prompt = ElMessageBox.prompt
    window.$toast = ElMessage
    window.$utils = utils
    window.$cache = Cache
    window.$manager = new Manager()
  }
})
