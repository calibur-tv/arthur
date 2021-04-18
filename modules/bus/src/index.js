import mitt from 'mitt'

const createInstance = () => {
  if (typeof window === 'undefined') {
    return mitt()
  }

  if (!window.__calibur_bus__) {
    window.__calibur_bus__ = mitt()
  }

  return window.__calibur_bus__
}

export default createInstance()
