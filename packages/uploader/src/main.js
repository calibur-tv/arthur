import { createApp } from 'vue'
import App from './App.vue'
import './public-path'

// @ts-ignore
let instance

function render(props = {}) {
  // @ts-ignore
  const { container } = props
  instance = createApp(App)
  instance.use($store)
  instance.mount(container ? container.querySelector('#sub-app') : '#sub-app')
}

// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {}

// @ts-ignore
export async function mount(props) {
  render(props)
  // @ts-ignore
  instance.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange
  // @ts-ignore
  instance.config.globalProperties.$setGlobalState = props.setGlobalState
}

export async function unmount() {
  // @ts-ignore
  instance.unmount()
  // @ts-ignore
  instance._container.innerHTML = ''
  instance = null
}
