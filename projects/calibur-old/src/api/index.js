import axios from 'axios'
import parseToken from '@/assets/js/parseToken'
import * as sign from './sign'
import * as user from './user'
import * as desk from './desk'

const isDev = process.env.NODE_ENV === 'development'

const createApi = () => {
  const http = axios.create({
    baseURL: isDev ? 'http://localhost:9000/' : 'https://fc.calibur.tv/',
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

  if (typeof window !== 'undefined') {
    window.$http = http
  }

  return {
    sign,
    user,
    desk
  }
}

export default createApi
