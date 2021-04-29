// import './public-path'
import { createApp } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ListView } from '@flowlist/vue-listview'
import bus from '@calibur/bus'
import '@calibur/shared-css/theme-plus.scss'
import store from './utils/store'
import App from './App.vue'

let instance

function render(props = {}) {
  const { container } = props
  instance = createApp(App)
  instance.use(store)
  instance.component(ListView.name, ListView)
  instance.config.globalProperties.$bus = bus
  instance.config.globalProperties.$confirm = ElMessageBox.confirm
  instance.config.globalProperties.$prompt = ElMessageBox.prompt
  instance.config.globalProperties.$toast = ElMessage
  instance.mount(container ? container.querySelector('#sub-app') : '#sub-app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {}

export async function mount(props) {
  render(props)
  instance.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange
  instance.config.globalProperties.$setGlobalState = props.setGlobalState
}

export async function unmount() {
  instance.unmount()
  instance._container.innerHTML = ''
  instance = null
}
