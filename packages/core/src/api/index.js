import axios from 'axios'
import parseToken from '@/assets/js/parseToken'

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

  return http
}

export default createApi
