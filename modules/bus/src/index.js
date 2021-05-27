import mitt from 'mitt'

const createInstance = () => {
  if (typeof window === 'undefined') {
    return mitt()
  }

  const glob = window.top || window.parent || window

  if (!glob.__calibur_bus__) {
    glob.__calibur_bus__ = mitt()
  }

  return glob.__calibur_bus__
}

export default createInstance()
