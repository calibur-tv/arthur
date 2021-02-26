import axios from 'axios'
import parseToken from '@/assets/js/parseToken'
import * as sign from './sign'
import * as user from './user'
import * as desk from './desk'

const routeMap = {
  sign,
  user,
  desk
}

const getCallFunc = (keys) => {
  if (!keys) {
    return null
  }
  let result = routeMap
  keys.split('.').forEach((key) => {
    result = result[key]
  })
  return result
}

const createApi = (BASE_URL) => {
  const http = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
  })

  http.interceptors.request.use(
    (config) => {
      const token = parseToken()
      if (!token) {
        return config
      }

      config.headers.Authorization = `Bearer ${token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  http.interceptors.response.use(
    (response) => {
      if (response.data.code) {
        return Promise.reject(response.data)
      }
      return response.data.data
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return (name, data, config) => {
    const func = getCallFunc(name)
    if (!func) {
      throw new Error(`路由 ${name} 未注册`)
    }
    return func(http, data, config)
  }
}

export default createApi
