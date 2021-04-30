import http from '@calibur/http'

export const current = () =>
  http.post(
    'sign/get_user_info',
    {},
    {
      preload: true
    }
  )

export const bindPhone = ({ slug, phone, password, authCode }) =>
  http.post('sign/bind_phone', {
    slug,
    phone,
    password,
    authCode
  })

export const sendMessage = ({ phone_number, type, geetest }) =>
  http.post('sign/message', {
    phone_number,
    type,
    geetest
  })

export const register = ({ access, secret, authCode, inviteCode }) =>
  http.post('sign/register', {
    access,
    secret,
    authCode,
    inviteCode
  })

export const login = ({ access, secret, remember, geetest }) =>
  http.post('sign/login', {
    access,
    secret,
    remember,
    geetest
  })

export const logout = () => http.post('sign/logout')

export const resetPassword = ({ method, access, authCode, secret }) =>
  http.post('sign/reset_password', {
    method,
    access,
    authCode,
    secret
  })
