const parseCookie = (cookieStr) => {
  if (!cookieStr) {
    return ''
  }
  let token = ''
  cookieStr.split('; ').forEach((item) => {
    if (item.startsWith('JWT-TOKEN=')) {
      token = item.split('JWT-TOKEN=')[1]
    }
  })
  return token
}

export default () => {
  if (typeof window === 'undefined') {
    return ''
  }

  if (window.__AUTH_TOKEN__) {
    return window.__AUTH_TOKEN__
  }

  let pageData
  let token

  try {
    pageData = JSON.parse(document.querySelector('script[data-name="page-data"]').textContent)
  } catch (e) {
    pageData = {
      authToken: ''
    }
  }

  token = pageData.authToken

  if (!token) {
    token = parseCookie(document.cookie)
  }

  token = ~['undefined', 'null'].indexOf(token) ? '' : token
  window.__AUTH_TOKEN__ = token

  return token
}
