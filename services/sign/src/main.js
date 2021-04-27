import { createApp } from 'vue'
import { ElForm, ElFormItem, ElButton, ElInput, ElMessage, ElMessageBox } from 'element-plus'
import '@calibur/shared-css/theme.scss'
import App from './App.vue'

let instance

function render(props = {}) {
  const { container } = props
  instance = createApp(App)
  instance.use(ElForm)
  instance.use(ElFormItem)
  instance.use(ElButton)
  instance.use(ElInput)
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
  instance.config.globalProperties.$prompt = ElMessageBox.prompt
  instance.config.globalProperties.$toast = ElMessage
}

export async function unmount() {
  instance.unmount()
  instance._container.innerHTML = ''
  instance = null
}
