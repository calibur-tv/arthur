export const isServer = typeof window === 'undefined'

export const calcRelativeDPR = () => {
  const match = (window?.navigator?.connection?.effectiveType || '').match(/\d+/)
  if (match) {
    return Math.max((window.devicePixelRatio - (4 - match[0])) | 0, 1)
  }
  return window.devicePixelRatio | 0
}

export const requestIdleCallback = isServer
  ? null
  : window.requestIdleCallback ||
    function (cb) {
      const start = Date.now()
      return setTimeout(function () {
        // eslint-disable-next-line
      cb({
          didTimeout: false,
          timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
        })
      }, 1)
    }

export const cancelIdleCallback = isServer
  ? null
  : window.cancelIdleCallback ||
    function (id) {
      clearTimeout(id)
    }

export const isLink = (url) => (!url ? false : url.startsWith('http'))

export const resizeImage = (path, { width, height, rule, webP, dpr } = {}) => {
  if (!path) {
    return ''
  }

  const url = trimHttp(path)

  if (!width && !height) {
    return url
  }

  const tail = webP ? '.webp' : ''
  const mode = rule ? `_${rule}` : ''
  const DPR = dpr || (isServer ? 2 : (window.__img_dpr__ || window.devicePixelRatio) | 0)

  return `${url}@${(width * DPR) | 0}w_${(height ? height * DPR : width * DPR) | 0}h${mode}${tail}`
}

export const initEmptyArray = (count, defaultVal) => {
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(defaultVal)
  }

  return result
}

export const trimHttp = (url) => (url ? url.replace(/^http:/, '') : '')

export const supportPositionSticky = () => {
  if (isServer) {
    return false
  }

  if (window.__support_position_sticky__ !== undefined) {
    return window.__support_position_sticky__
  }
  const prop = 'position:'
  const value = 'sticky'
  const el = document.createElement('a')
  const mStyle = el.style

  mStyle.cssText = `${prop}${value}`
  // eslint-disable-next-line
  const result = mStyle.position.indexOf(value) !== -1

  window.__support_position_sticky__ = result

  return result
}
