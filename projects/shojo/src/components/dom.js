export const addClass = (el, cls) => {
  if (!el) return
  let curClass = el.className
  const classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

export const removeClass = (el, cls) => {
  if (!el || !cls) return
  const classes = cls.split(' ')
  let curClass = ' ' + el.className + ' '

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

export const trim = (string) => (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')

export const hasClass = (el, cls) => {
  if (!el || !cls) return false
  if (cls.includes(' ')) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').includes(' ' + cls + ' ')
  }
}

export const getMatchedRouteIndex = (headers, path) => {
  let result = -1
  if (!path) {
    return result
  }
  const checkPath = path.endsWith('/') ? path : `${path}/`
  headers
    .map((_) => _.route)
    .forEach((route, index) => {
      if (route) {
        const checkRoute = route.endsWith('/') ? route : `${route}/`
        if (checkPath === checkRoute) {
          result = index
        }
      }
    })

  if (result !== -1) {
    return result
  }

  const items = checkPath.split('/').filter((_) => _)
  if (!items.length) {
    return -1
  }

  items.pop()

  return getMatchedRouteIndex(headers, `/${items.join('/')}/`)
}

export const getScroll = (target, top) => {
  const prop = top ? 'pageYOffset' : 'pageXOffset'
  const method = top ? 'scrollTop' : 'scrollLeft'
  let ret = target[prop]
  if (typeof ret !== 'number') {
    ret = window.document.documentElement[method]
  }
  return ret
}

export const getOffset = (element) => {
  const rect = element.getBoundingClientRect()
  const scrollTop = getScroll(window, true)
  const scrollLeft = getScroll(window)
  const docEl = window.document.body
  const clientTop = docEl.clientTop || 0
  const clientLeft = docEl.clientLeft || 0
  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  }
}

export const getScrollParent = (dom) => {
  let el = dom
  if (!el) {
    return null
  }
  while (el && el.tagName !== 'HTML' && el.tagName !== 'BOYD' && el.nodeType === 1) {
    const overflowY = window.getComputedStyle(el).overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      if (el.tagName === 'HTML' || el.tagName === 'BODY') {
        return document
      }
      return el
    }
    el = el.parentNode
  }
  return document
}

export const checkInView = (dom, preload = 0) => {
  if (!dom) {
    return false
  }
  const rect = dom.getBoundingClientRect()
  return (
    rect.top < window.innerHeight + preload &&
    rect.bottom + preload > 0 &&
    rect.left < window.innerWidth + preload &&
    rect.right + preload > 0
  )
}
