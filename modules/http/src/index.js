import 'isomorphic-fetch'
import { isDev } from '@calibur/utils'
import { supportNativeCache, requestIdleCallback, combineURL, parseToken, ENUM_CONST, buildURL } from './utils'

const PREFETCH_TABLE = 'request-prefetch'

const Http = class {
  constructor(option = {}) {
    this.baseURL = option.baseURL || ENUM_CONST.baseURL[isDev ? 'development' : 'production']
  }

  /**
   * @desc
   * - GET，读取缓存，如果无缓存，则发送接口请求
   * @param {string} url - 同`fetch`的`url`参数
   * @param {object} [params={}] - 同`fetch`的`config.params`
   * @param {object} [option={}] - 同`fetch`的`config`参数
   * @returns {Promise<Response>} 值为`response`
   */
  get(url, params = {}, option) {
    let config
    if (option) {
      config = {
        ...option,
        params: params
      }
    } else if (params.params) {
      config = params
    } else {
      config = {
        params: params
      }
    }

    config.method = 'GET'

    if (config.params) {
      url = buildURL(url, config.params)
    }
    url = combineURL(this.baseURL, url)

    if (!supportNativeCache) {
      return this._send(url, config)
    }

    return new Promise((resolve, reject) => {
      const fallback = () => {
        this._send(url, config).then(resolve).catch(reject)
      }

      caches
        .match(url)
        .then((resp) => {
          if (!resp || !resp.url) {
            // 没有命中缓存，使用线上数据
            fallback()
            return
          }

          this._resetPreload(url, config)
          this._resetPrefetch(url, config, resp, true)
          this._formatResponse(resp, resolve, reject)
        })
        .catch(fallback) // 调用缓存 match 接口失败，直接发请求
    })
  }

  /**
   * @desc
   * - POST
   * @param {string} url - 同`fetch`的`url`参数
   * @param {object} [data={}] - 同`fetch`的`config.body`
   * @param {object} [option={}] - 同`fetch`的`config`参数
   * @returns {Promise<Response>} 值为`response`
   */
  post(url, data = {}, option) {
    let config
    if (option) {
      config = {
        ...option,
        body: data
      }
    } else if (data.body) {
      config = data
    } else {
      config = {
        body: data
      }
    }

    config.method = 'POST'

    if (config.body && typeof config.body !== 'string') {
      config.body = JSON.stringify(config.body)
    }

    url = combineURL(this.baseURL, url)

    return this._send(url, config)
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
   * @returns {Promise<unknown>}
   */
  _send(url, config) {
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

          if (!supportNativeCache || config.method !== 'GET') {
            return response
          }

          this._resetPreload(url, config)
          this._resetPrefetch(url, config, response)

          return response.clone()
        })
        .then((resp) => this._formatResponse(resp, resolve, reject))
        .catch(reject)
    })
  }

  _formatResponse(resp, resolve, reject) {
    resp.json().then((body) => {
      if (body.code) {
        reject(body)
      } else {
        resolve(body.data)
      }
    })
  }

  _resetPreload(url, config) {
    if (!config.preload) {
      return
    }

    caches.open(window.location.pathname).then((cache) => {
      cache.put(new Request(url, config), new Response())
    })
  }

  _resetPrefetch(url, config, response, remove) {
    if (!config.prefetch) {
      return
    }

    caches.open(PREFETCH_TABLE).then((cache) => {
      remove ? cache.delete(url) : cache.put(url, response)
    })
  }
}

export default new Http()
