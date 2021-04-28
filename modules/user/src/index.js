import bus from '@calibur/bus'
import { signApi } from '@calibur/api'
import { isDev } from '@calibur/utils'
import { loadMicroApp } from 'qiankun'
import Cookies from 'js-cookie'

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
      if (!Cookies.get(TOKEN_KEY)) {
        this.isLogin = false
        this.checked = true
        this.loading = false
        resolve(this.info)
        return
      }

      signApi
        .current()
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
      signApi.logout().finally(() => {
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
    const id = '__calibur_mfe_sign'
    el.setAttribute('id', id)
    document.body.appendChild(el)
    loadMicroApp({
      name: 'sign',
      entry: isDev ? '//localhost:7103' : 'https://www.calibur.tv/mfe/sign',
      container: el
    })
  }

  return glob.__calibur_user__
}

export default userInstance()
