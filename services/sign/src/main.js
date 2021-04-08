import App from './App.vue'
import './public-path'

let instance

function render(props = {}) {
  const { container } = props
  // eslint-disable-next-line
  const { createApp } = Vue
  instance = createApp(App)
  // instance.use($store)
  // eslint-disable-next-line
  instance.use(ElementPlus)
  instance.mount(container ? container.querySelector('#sub-app') : '#sub-app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  Promise.all([import('@calibur/mfe-loader'), import('@calibur/shared-dependencies')]).then((modules) => {
    const bootstrap = modules[0].default
    const dependencies = modules[1].default
    bootstrap(dependencies).then(render)
  })
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
