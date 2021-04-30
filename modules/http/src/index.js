import 'whatwg-fetch'
import { isDev } from '@calibur/utils'
import { supportNativeCache, requestIdleCallback, combineURL, parseToken, ENUM_CONST, buildURL } from './utils'

const Http = class {
  constructor(option = {}) {
    this.baseURL = option.baseURL || ENUM_CONST.baseURL[isDev ? 'development' : 'production']
  }

  /**
   * @desc
   * - 发送接口请求，并填充缓存
   * - 目前缓存在被消费一次后就会失效
   * @param {string|Request} request - 同`fetch`的`url`参数
   * @param {object} [config={}] - 同`fetch`的`config`参数
   * @returns {Promise<Response>} 值为`response`
   */
  set(request, config = {}) {
    return new Promise((resolve, reject) => {
      if (!supportNativeCache) {
        return reject(new Error('not support CacheStorage API'))
      }

      if (!config.method) {
        config.method = 'GET'
      }

      this._send(request, config, true).then(resolve).catch(reject)
    })
  }

  /**
   * @desc
   * - GET，读取缓存，如果无缓存，则发送接口请求
   * @param {string} url - 同`fetch`的`url`参数
   * @param {object} [config1={}] - 同`fetch`的`config.params`
   * @param {object} [config2={}] - 同`fetch`的`config`参数
   * @returns {Promise<Response>} 值为`response`
   */
  get(url, config1 = {}, config2) {
    let config
    if (config2) {
      config = {
        ...config2,
        params: config1
      }
    } else if (config1.params) {
      config = config1
    } else {
      config = {
        params: config1
      }
    }

    config.method = 'GET'

    if (config.params) {
      url = buildURL(url, config.params)
    }

    return this._wrap(url, config)
  }

  /**
   * @desc
   * - POST
   * @param {string} url - 同`fetch`的`url`参数
   * @param {object} [config1={}] - 同`fetch`的`config.body`
   * @param {object} [config2={}] - 同`fetch`的`config`参数
   * @returns {Promise<Response>} 值为`response`
   */
  post(url, config1 = {}, config2) {
    let config
    if (config2) {
      config = {
        ...config2,
        body: config1
      }
    } else if (config1.body) {
      config = config1
    } else {
      config = {
        body: config1
      }
    }

    config.method = 'POST'

    if (config.body && typeof config.body !== 'string') {
      config.body = JSON.stringify(config.body)
    }

    return this._wrap(url, config)
  }

  _wrap(url, config) {
    if (!supportNativeCache) {
      return this._send(url, config)
    }

    return new Promise((resolve, reject) => {
      const fallback = () => {
        this._send(url, config).then(resolve).catch(reject)
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
          caches.delete(url)
          response.json().then((body) => {
            if (body.code) {
              reject(body)
            } else {
              resolve(body.data)
            }
          })
        })
        .catch(fallback) // 调用缓存 match 接口失败，直接发请求
    })
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
    if (!el || !(el instanceof Element)) {
      return
    }

    const once = () => {
      /**
       * 如果是 2g 或 3g 网络环境，则不做预加载
       */
      const match = (window?.navigator?.connection?.effectiveType || '4g').match(/\d+/)
      if (match && match[0] < 4) {
        return
      }

      requestIdleCallback(callback)
      el.removeEventListener(event, once)
    }

    el.addEventListener(event, once)
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
  _send(url, config, cacheable) {
    url = combineURL(this.baseURL, url)
    return new Promise((resolve, reject) => {
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

          if (config.prefetch) {
            caches.open(window.location.pathname).then((cache) => {
              cache.put(url, new Response())
            })
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
          resp.json().then((body) => {
            if (body.code) {
              reject(body)
            } else {
              resolve(body.data)
            }
          })
        })
        .catch(reject)
    })
  }
}

export default new Http()
