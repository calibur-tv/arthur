import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './route'
import '@/assets/css/global.scss'
import mitt from 'mitt'
import Cookies from 'js-cookie'
import store from '@/store'
import createApi from '@/api'
import imageResize from '@/assets/js/imageResize'
import { ElMessageBox } from 'element-plus'
import { message, Button, Form, Input } from 'ant-design-vue'

export const createApp = ViteSSG(App, { routes }, ({ app, isClient }) => {
  const api = createApi()
  const bus = mitt()
  app.use(store)
  app.component(Button.name, Button)
  app.component(Form.name, Form)
  app.component(Form.Item.name, Form.Item)
  app.component(Input.name, Input)
  app.component(Input.Group.name, Input.Group)
  app.config.globalProperties.$resize = imageResize

  if (isClient) {
    window.$bus = bus
    window.$api = api
    window.$store = store
    window.$cookie = Cookies
    window.$alert = ElMessageBox.alert
    window.$confirm = ElMessageBox.confirm
    window.$prompt = ElMessageBox.prompt
    window.$toast = message
  }
})
