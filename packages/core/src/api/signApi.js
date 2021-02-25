import http from './index'

export const getLoginUser = () => http.post('v1/sign/get_user_info')

export const bindPhone = (ctx, { slug, phone, password, authCode }) =>
  http.post('v1/sign/bind_phone', {
    slug,
    phone,
    password,
    authCode
  })

export const sendMessage = (ctx, { phone_number, type, geetest }) =>
  http.post('v1/sign/message', {
    phone_number,
    type,
    geetest
  })

export const register = (ctx, { access, secret, authCode, inviteCode }) =>
  http.post('v1/sign/register', {
    access,
    secret,
    authCode,
    inviteCode
  })

export const login = (ctx, { access, secret, remember, geetest }) =>
  http.post('v1/sign/login', {
    access,
    secret,
    remember,
    geetest
  })

export const logout = () => http.post('v1/sign/logout')

export const resetPassword = (ctx, { method, access, authCode, secret }) =>
  http.post('v1/sign/reset_password', {
    method,
    access,
    authCode,
    secret
  })
