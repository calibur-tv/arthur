export const getRecommendedUsers = (ctx) => ctx.get('user/recommended')

export const settingProfile = (ctx, params) => ctx.post('v1/user/update_info', params)

export const settingImage = (ctx, { type, url }) => ctx.post('user/setting/image', { type, url })

export const getUserInfo = (ctx, { slug }) => ctx.get('v1/user/show', { params: { slug } })

export const getMailboxTotal = (ctx, { slug }) =>
  ctx.get('v1/message/total', {
    params: { slug },
    progress: false
  })

export const feedback = (ctx, { type, desc, ua }) => ctx.post('user/feedback', { type, desc, ua })

export const daySignAction = (ctx) => ctx.post('user/daySign')

export const getUserCard = (ctx, { id }) =>
  ctx.get('user/card', {
    params: { id }
  })

export const getUserBadgeDetail = (ctx, { user_id, badge_id }) =>
  ctx.get('user/badge/item', {
    params: {
      user_id,
      badge_id
    }
  })

export const report = (ctx, { id, type, model, message }) =>
  ctx.post('report/send', {
    id,
    type,
    model,
    message
  })

export const readAllMessage = (ctx) => ctx.post('user/notification/clear')

export const readMessage = (ctx, { id }) => ctx.post('user/notification/read', { id })

export const readNotice = (ctx, { id }) => ctx.post('user/notice/mark', { id })

export const getNotifications = (ctx, { minId }) =>
  ctx.get('user/notification/list', {
    params: { minId }
  })

export const getNotificationCount = (ctx) => ctx.get('user/notification/count')

export const getSystemNotice = (ctx) => ctx.get('user/notice/list')
