import {
  supportNativeCache,
  supportNativeFetch,
  requestIdleCallback,
  combineURL,
  parseToken,
  ENUM_CONST,
  buildURL
} from './utils'

/**
 * @type {Http}
 * @category 通用组件
 * @desc
 * - 基于 [`fetch`](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch) 和 [`CacheStorage`](https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage) 封装的`API`预取库
 * - 默认的`credentials`是`include`，`get`的`content-type`是`application/json`，`post`的`content-type`是`application/x-www-form-urlencoded`
 * @example 引入
 * ```javascript
 * import 'whatwg-fetch' // 如果你想让更多的浏览器能够使用`fetch API`
 * import Http from '@bilibili/prefetch'
 *
 * const prefetch = new Http()
 * const requestUrl = 'https://api.bilibili.com/x'
 * // 在上级页面种下缓存
 * prefetch.set(requestUrl)
 * // 在目标页面读取缓存
 * if (prefetch.support()) {
 *   prefetch.get(requestUrl)
 * }
 * ```
 */
const Http = class {
  constructor(option = {}) {
    this.baseURL = option.baseURL || ENUM_CONST.baseURL[ENUM_CONST.ENV]
    this.isDev = ENUM_CONST.ENV === 'development'
  }
  /**
   * @desc
   * - 发送接口请求，并填充缓存
   * - 目前缓存在被消费一次后就会失效
   * @param {string} url - 同`fetch`的`url`参数
   * @param {object} [config={}] - 同`fetch`的`config`参数
   * @returns {Promise<Response>} 值为`response`
   */
  set(url, config = {}) {
    return new Promise((resolve, reject) => {
      if (!supportNativeCache) {
        return reject(new Error('not support CacheStorage API'))
      }

      if (!config.method) {
        config.method = 'GET'
      }

      this.send(url, config, true).then(resolve).catch(reject)
    })
  }

  /**
   * @desc
   * - GET，读取缓存，如果无缓存，则发送接口请求
   * @param {string} url - 同`fetch`的`url`参数
   * @param {object} [config={}] - 同`fetch`的`config`参数
   * @returns {Promise<Response>} 值为`response`
   */
  get(url, config = {}) {
    if (!config.method) {
      config.method = 'GET'
    }

    if (config.params) {
      url = buildURL(url, config.params)
    }

    if (!supportNativeCache) {
      return this.send(url, config, false)
    }

    return new Promise((resolve, reject) => {
      const fallback = () => {
        this.send(url, config, false).then(resolve).catch(reject)
      }

      caches
        .match(url)
        .then((response) => {
          if (!response) {
            // 没有命中缓存，使用线上数据
            fallback()
            return
          }
          // 删除缓存，只使用一次
          this.del(url)

          response
            .json()
            .then((body) => {
              if (body.code) {
                reject(body)
              } else {
                resolve(body.data)
              }
            })
            .catch(fallback)
        })
        .catch(fallback) // 调用缓存 match 接口失败，直接发请求
    })
  }

  /**
   * @desc
   * - POST，读取缓存，如果无缓存，则发送接口请求
   * @param {string} url - 同`fetch`的`url`参数
   * @param {object} [config={}] - 同`fetch`的`config`参数
   * @returns {Promise<Response>} 值为`response`
   */
  post(url, config = {}) {
    config.method = 'POST'

    if (config.body && typeof config.body !== 'string') {
      config.body = JSON.stringify(config.body)
    }

    return this.get(url, config)
  }

  /**
   * @desc
   * - 手动检测缓存是否存在
   * @param {string} url - 同`fetch`的`url`参数
   * @returns {Promise<boolean>} `then`的值为`true`或`false`，不会走到`catch`
   */
  has(url) {
    return new Promise((resolve) => {
      if (!supportNativeCache) {
        return resolve(false)
      }

      caches
        .has(url)
        .then(resolve)
        .catch(() => {
          resolve(false)
        })
    })
  }

  /**
   * @desc
   * - 手动删除缓存
   * @param {string} url - 同`fetch`的`url`参数
   * @returns 无返回值
   */
  del(url) {
    if (!supportNativeCache) {
      return
    }

    caches.delete(url)
  }

  /**
   * @desc
   * - 监听元素的事件来做数据预取
   * - 限制了在浏览器的空闲时段并且网络较好时才会调动`callback`
   * @param {Element} el - 监听的元素
   * @param {string} event - 监听的事件
   * @param {function} callback - 回调函数，应该在回调函数里调用`set`方法
   * @returns 无返回值
   */
  bind(el, event, callback) {
    if (!(el instanceof Element)) {
      return
    }

    const func = () => {
      /**
       * 如果是 2g 或 3g 网络环境，则不做预加载
       */
      const match = (window?.navigator?.connection?.effectiveType || '4g').match(/\d+/)
      if (match && match[0] < 4) {
        return
      }

      requestIdleCallback(callback)
      el.removeEventListener(event, func)
    }

    el.addEventListener(event, func)
  }

  /**
   * @desc
   * - 返回是否支持缓存
   * - 如果你想让更多的设备支持`prefetch`，可以引入[`fetch polyfill`](https://github.com/github/fetch)
   * @returns {boolean} `true`或`false`
   */
  support() {
    return supportNativeCache && supportNativeFetch
  }

  /**
   * @private
   * @desc
   * - 发送请求的方法
   * @param {string} url - 同`fetch`的`url`参数
   * @param {object} [config={}] - 同`fetch`的`config`参数
   * @param {boolean} [cacheable=false] - 是否种下缓存
   * @returns {Promise<unknown>}
   */
  send(url, config, cacheable) {
    url = combineURL(this.baseURL, url)
    return new Promise((resolve, reject) => {
      if (!supportNativeFetch) {
        reject(new Error('not support fetch API'))
      }

      config.headers = config.headers || {}
      config.headers['Content-Type'] = 'application/json'
      config.credentials = 'omit'
      const token = parseToken(document.cookie)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      fetch(url, config)
        .then((response) => {
          if (!response.ok) {
            reject(response)
            return
          }

          if (!supportNativeCache || !cacheable) {
            return response
          }

          caches.open(url).then((cache) => {
            cache.put(url, response)
          })

          return response.clone()
        })
        .then((resp) => {
          resp
            .json()
            .then((body) => {
              if (body.code) {
                reject(body)
              } else {
                resolve(body.data)
              }
            })
            .catch(reject)
        })
        .catch(reject)
    })
  }
}

export default new Http()
