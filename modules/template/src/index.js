import { userApi } from '@calibur/api'
import { isDev } from '@calibur/utils'
import http from '@calibur/http'

userApi.daySignAction()
http.get('testhttp')
console.log(isDev)
