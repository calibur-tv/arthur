import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/css/global.scss'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import mitt from 'mitt'

const app = createApp(App)

app.use(store)
app.use(router)

app.config.globalProperties.$bus = mitt()

app.mount('#app')
