import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './route'
import 'normalize.css'
import '@/assets/css/global.scss'
import store from '@/store'
import * as utils from '@/assets/js/utils'
import imageResize from '@/assets/js/imageResize'
import ElementPlus, { ElMessageBox, ElMessage } from 'element-plus'
import { ListView } from '@flowlist/vue-listview'
import '@/assets/css/element.scss'
import Manager from '@/assets/js/manager'
import Curtain from '@/components/app/AppCurtain.vue'
import bus from '@calibur/bus'
import user from '@calibur/user'
import http from '@calibur/http'

export const createApp = ViteSSG(App, { routes }, ({ app, isClient }) => {
  app.use(store)
  app.use(ElementPlus)
  app.component(ListView.name, ListView)
  app.component(Curtain.name, Curtain)
  app.config.globalProperties.$resize = imageResize
  app.config.globalProperties.$utils = utils
  app.config.globalProperties.$bus = bus
  app.config.globalProperties.$http = http
  app.config.globalProperties.$user = user
  app.config.globalProperties.$toast = ElMessage
  app.config.globalProperties.$alert = ElMessageBox.alert
  app.config.globalProperties.$prompt = ElMessageBox.prompt
  app.config.globalProperties.$confirm = ElMessageBox.confirm

  if (isClient) {
    user.get().then((user) => {
      store.commit('SET_USER_INFO', user)
    })
    user.watch((user) => {
      store.commit('SET_USER_INFO', user)
    })

    window.$manager = new Manager()
  }
})
