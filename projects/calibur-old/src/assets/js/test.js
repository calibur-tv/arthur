import { render, h } from 'vue'
import VCurtain from '../../components/app/AppCurtain.vue'

function newInstance(comp, props, data) {
  const el = document.createElement('div')

  const vNode = h(VCurtain, props, {
    default: () => h(comp, data)
  })
  render(vNode, el)
  document.body.appendChild(el)

  return vNode.component
}

export default {
  open({ component, rect = {}, data = {} }) {
    return newInstance(component, rect, data)
  },

  close(instance) {
    instance.$destroy()
  }
}
