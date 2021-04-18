import bus from '@calibur/bus'
import http from '@calibur/http'
import Cookies from 'js-cookie'
import { loadMicroApp } from 'qiankun'

const TOKEN_KEY = 'JWT-TOKEN'

const User = class {
  constructor() {
    this.info = null
    this.isLogin = false
    this.checked = false
    this.loading = false
    this.resolves = []
    this.rejects = []
    this.handlers = new Set()
  }

  login() {
    bus.emit('sign-in')
  }

  get() {
    return new Promise((resolve, reject) => {
      if (this.info || this.checked) {
        resolve(this.info)
        return
      }

      if (this.loading) {
        this.resolves.push(resolve)
        this.rejects.push(reject)
        return
      }

      this.loading = true
      http
        .post('sign/get_user_info')
        .then((res) => {
          this.info = res
          this.handlers.forEach((callback) => {
            callback(res)
          })
          this.resolves.forEach((callback) => {
            callback(res)
          })
          this.resolves = []
          this.isLogin = !!res
          resolve(res)
        })
        .catch((err) => {
          this.isLogin = false
          this.rejects.forEach((callback) => {
            callback(err)
          })
          this.rejects = []
          reject(err)
        })
        .finally(() => {
          this.checked = true
          this.loading = false
        })
    })
  }

  logout() {
    return new Promise((resolve) => {
      http.post('sign/logout').finally(() => {
        Cookies.remove(TOKEN_KEY)
        this.handlers.forEach((callback) => {
          callback(null)
        })
        this.info = null
        this.checked = false
        resolve()
      })
    })
  }

  watch(callback, options = {}) {
    if (typeof callback === 'function') {
      if (this.checked && options.immediate) {
        callback(this.info)
      }

      this.handlers.add(callback)

      return () => {
        this.handlers.delete(callback)
      }
    }

    return () => {}
  }
}

const userInstance = () => {
  if (typeof window === 'undefined') {
    return new User()
  }

  const glob = window.parent || window

  if (!glob.__calibur_user__) {
    glob.__calibur_user__ = new User()

    const el = document.createElement('div')
    const id = '#_calibur_sign_service'
    el.setAttribute('id', id)
    document.body.appendChild(el)
    loadMicroApp({
      name: 'sign',
      entry: http.isDev ? '//localhost:7103' : 'https://web.calibur.tv/sign',
      container: el
    })
  }

  return glob.__calibur_user__
}

export default userInstance()
