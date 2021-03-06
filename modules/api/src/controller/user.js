import http from '@calibur/http'

export const getRecommendedUsers = () => http.get('user/recommended')

export const settingProfile = (params) => http.post('user/update_info', params)

export const settingImage = ({ type, url }) => http.post('user/setting/image', { type, url })

export const getUserInfo = ({ slug }) => http.get('user/show', { slug })

export const getMailboxTotal = ({ slug }) => http.get('message/total', { slug })

export const feedback = ({ type, desc, ua }) => http.post('user/feedback', { type, desc, ua })

export const daySignAction = () => http.post('user/daySign')

export const getUserCard = ({ id }) =>
  http.get('user/card', {
    id
  })

export const getUserBadgeDetail = ({ user_id, badge_id }) =>
  http.get('user/badge/item', {
    user_id,
    badge_id
  })

export const report = ({ id, type, model, message }) =>
  http.post('report/send', {
    id,
    type,
    model,
    message
  })

export const readAllMessage = () => http.post('user/notification/clear')

export const readMessage = ({ id }) => http.post('user/notification/read', { id })

export const readNotice = ({ id }) => http.post('user/notice/mark', { id })

export const getNotifications = ({ minId }) =>
  http.get('user/notification/list', {
    minId
  })

export const getNotificationCount = () => http.get('user/notification/count')

export const getSystemNotice = () => http.get('user/notice/list')
