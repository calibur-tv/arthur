import { render, h } from 'vue'
import VCurtain from '../../components/app/AppCurtain.vue'

function newInstance(comp, props) {
  const el = document.createElement('div')

  const vNode = h(VCurtain, props, {
    default: () => h(comp)
  })
  render(vNode, el)
  document.body.appendChild(el)

  return vNode.component
}

export default {
  open({ component, props = {} }) {
    return newInstance(component, props)
  },

  close(instance) {
    instance.$destroy()
  }
}
