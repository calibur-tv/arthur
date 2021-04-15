/**
 * @desc
 * - 检测是否是`Node`环境
 * @type {boolean}
 */
export const isNode = typeof window === 'undefined'

export const isArray = (val) => toString.call(val) === '[object Array]'

export const isObject = (val) => val !== null && typeof val === 'object'

export const isDate = (val) => toString.call(val) === '[object Date]'

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
  ENV: isNode ? 'development' : /calibur.tv/.test(window.location.host) ? 'production' : 'development',
  baseURL: {
    development: 'http://localhost:9000/v1/',
    production: 'https://fc.calibur.tv/v1/'
  }
}

export const encodeParams = (val) => {
  return encodeURIComponent(val)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export const buildURL = (url, params) => {
  let serializedParams
  let parts = []

  for (let [key, val] of Object.entries(params)) {
    if (val === null || typeof val === 'undefined') {
      return
    }

    if (Array.isArray(val)) {
      key = key + '[]'
    } else {
      val = [val]
    }

    val.forEach((v) => {
      if (isDate(v)) {
        v = v.toISOString()
      } else if (isObject(v)) {
        v = JSON.stringify(v)
      }
      parts.push(encodeParams(key) + '=' + encodeParams(v))
    })
  }

  serializedParams = parts.join('&')

  if (serializedParams) {
    let hashMarkIndex = url.indexOf('#')
    if (hashMarkIndex !== -1) {
      url = url.slice(0, hashMarkIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
