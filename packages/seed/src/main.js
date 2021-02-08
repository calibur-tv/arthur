import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/css/global.scss'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import mitt from 'mitt'
import api from '@/api'
import Cookies from 'js-cookie'
import imageResize from './assets/js/imageResize'

const app = createApp(App)

app.use(store)
app.use(router)

app.config.globalProperties.$bus = mitt()
app.config.globalProperties.$axios = api
app.config.globalProperties.$cookie = Cookies
app.config.globalProperties.$resize = imageResize

app.mount('#app')
