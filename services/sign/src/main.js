import { createApp } from 'vue'
import App from './App.vue'
import './public-path'

let instance

function render(props = {}) {
  const { container } = props
  instance = createApp(App)
  // instance.use($store)
  instance.mount(container ? container.querySelector('#sub-app') : '#sub-app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  import('@calibur/mfe-loader').then((module) => {
    console.log(module)
    // render()
  })
}

export async function bootstrap() {}

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
