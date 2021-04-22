import resize from './resize'

const isNode = typeof window === 'undefined'

export default {
  resize,
  isNode,
  isDev: isNode ? true : /localhost|127./.test(window.location.host)
}
