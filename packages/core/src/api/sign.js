export const current = (ctx) => ctx.post('v1/sign/get_user_info')

export const bindPhone = (ctx, { slug, phone, password, authCode }) =>
  ctx.post('v1/sign/bind_phone', {
    slug,
    phone,
    password,
    authCode
  })

export const sendMessage = (ctx, { phone_number, type, geetest }) =>
  ctx.post('v1/sign/message', {
    phone_number,
    type,
    geetest
  })

export const register = (ctx, { access, secret, authCode, inviteCode }) =>
  ctx.post('v1/sign/register', {
    access,
    secret,
    authCode,
    inviteCode
  })

export const login = (ctx, { access, secret, remember, geetest }) =>
  ctx.post('v1/sign/login', {
    access,
    secret,
    remember,
    geetest
  })

export const logout = (ctx) => ctx.post('v1/sign/logout')

export const resetPassword = (ctx, { method, access, authCode, secret }) =>
  ctx.post('v1/sign/reset_password', {
    method,
    access,
    authCode,
    secret
  })
