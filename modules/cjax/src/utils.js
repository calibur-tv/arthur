/**
 * @desc
 * - 检测是否是`Node`环境
 * @type {boolean}
 */
export const isNode = typeof window === 'undefined'

/**
 * @desc
 * - 检测是否支持`CacheStorage`
 * @type {boolean}
 */
export const supportNativeCache = isNode ? false : typeof window.caches !== 'undefined'

/**
 * @desc
 * - 检测是否支持`window.fetch`
 * @type {boolean}
 */
export const supportNativeFetch = isNode ? false : typeof window.fetch === 'function'

export const requestIdleCallback = isNode
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

export const cancelIdleCallback = isNode
  ? null
  : window.cancelIdleCallback ||
    function (id) {
      clearTimeout(id)
    }

export const combineURL = (baseURL, relativeURL) => {
  if (!baseURL) {
    return relativeURL
  }

  if (/^(http|\/\/)/.test(relativeURL)) {
    return relativeURL
  }

  return `${baseURL}${relativeURL}`
}

export const parseToken = (cookieStr) => {
  if (!cookieStr) {
    return ''
  }

  let token = ''
  cookieStr.split('; ').forEach((item) => {
    if (item.startsWith('JWT-TOKEN=')) {
      token = item.split('JWT-TOKEN=')[1]
    }
  })
  return token
}

export const ENUM_CONST = {
  baseURL: {
    development: 'http://localhost:9000/v1/',
    production: 'https://fc.calibur.tv/v1/'
  }
}
