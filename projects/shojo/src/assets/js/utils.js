export const resize = (url, { width, height, rule, webP }) => {
  if (!url) {
    return ''
  }

  if (/imageMogr2/.test(url) || url.startsWith('data')) {
    return url
  }

  const link = url.startsWith('http') ? url : `https://m1.calibur.tv/${url}`
  const format = webP ? '/format/webp' : ''
  const mode = rule === undefined || rule === '' ? 1 : parseInt(rule)

  if ((mode === 1 && !width) || (!width && !height)) {
    return `${link}?imageMogr2/auto-orient/strip${format}`
  }

  let w
  let h
  const DPR = typeof window === 'undefined' ? 2 : window.devicePixelRatio

  if (mode === 1) {
    w = `/w/${(width * DPR) | 0}`
    h = height ? `/h/${(height * DPR) | 0}` : `/h/${(width * DPR) | 0}`
  } else {
    w = width ? `/w/${(width * DPR) | 0}` : ''
    h = height ? `/h/${(height * DPR) | 0}` : ''
  }

  return `${link}?imageMogr2/auto-orient/strip|imageView2/${mode}${w}${h}${format}`
}

export const convertTA = (sex = -1, isMine = false) => {
  if (isMine) {
    return '我'
  } else if (sex === 0) {
    return 'TA'
  } else if (sex === 1) {
    return '他'
  } else if (sex === 2) {
    return '她'
  }
  return 'TA'
}

export const randomStr = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(3, 6)}`
}

export const adjustDate = (time) => {
  if (!time) {
    return null
  }
  if (/^\d+$/.test(time)) {
    if (time.toString().length === 10) {
      return new Date(time * 1000)
    }
    return new Date(+time)
  }
  let result = new Date(time)
  if (result.toString() === 'Invalid Date') {
    result = new Date(time.replace(/-/g, '/'))
  }
  return result
}

export const shortenNumber = (num) => {
  return num > 1000 ? `${Math.floor((num / 1000) * 10) / 10}k` : num
}

export const timeAgo = (time) => {
  const date = adjustDate(time)
  const delta = Date.now() - date.getTime()
  const format = [
    date.getFullYear(),
    `0${date.getMonth() + 1}`.substr(-2),
    `0${date.getDate()}`.substr(-2),
    `0${date.getHours()}`.substr(-2),
    `0${date.getMinutes()}`.substr(-2)
  ]
  if (delta > 365 * 86400000 || delta <= 0) {
    return `${format[0]}-${format[1]}-${format[2]}`
  }
  const today = new Date().setHours(0, 0, 0, 0)
  if (today < date) {
    return `今天${format[3]}:${format[4]}`
  }
  if (today - 86400000 < date) {
    return `昨天${format[3]}:${format[4]}`
  }
  if (today - 172800000 < date) {
    return `前天${format[3]}:${format[4]}`
  }
  return `${format[1]}-${format[2]} ${format[3]}:${format[4]}`
}

export const parseDateProps = (time) => {
  if (!time) {
    return null
  }
  const date = adjustDate(time)
  if (!date) {
    return null
  }

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  }
}

export const formatTime = (ts, type = 'ymd') => {
  const obj = parseDateProps(ts)
  if (!obj) {
    return ''
  }
  if (type === 'ymd') {
    return `${obj.year}-${obj.month}-${obj.day}`
  }

  if (type === 'md') {
    return `${obj.month}-${obj.day}`
  }

  if (type === 'ymdhm') {
    return `${obj.year}-${obj.month}-${obj.day} ${pad(obj.hour)}:${pad(obj.minutes)}`
  }

  if (type === 'mdhm') {
    return `${obj.month}-${obj.day} ${pad(obj.hour)}:${pad(obj.minutes)}`
  }

  return obj.year
}

export const isTouchDevice = () => 'ontouchstart' in document.documentElement

export const pad = (number) => {
  return number < 10 ? '0' + number : number
}

export const formatNumber = (n) => {
  if (!n) {
    return 0
  }
  if (n >= 10000 && n < 100000000) {
    n = (n / 10000).toFixed(1)
    return n + '万'
  } else if (n >= 100000000) {
    n = (n / 100000000).toFixed(1)
    return n + '亿'
  } else {
    return n
  }
}

export const formatDuration = (n) => {
  if (!n) {
    return '00:00'
  }
  let h = 0
  let m = 0
  let s = 0
  if (typeof n === 'number') {
    if (n >= 3600) {
      h = (n / 3600) | 0
    }
    if (n - h * 3600 >= 60) {
      m = ((n - h * 3600) / 60) | 0
    }
    s = Math.max(n - h * 3600 - m * 60, 0)
  } else {
    const arr = n.split(':')
    s = arr.pop() || 0
    m = arr.pop() || 0
    h = arr.pop() || 0
  }
  const result = h ? [pad(h), pad(m), pad(s)] : [pad(m), pad(s)]
  return result.join(':')
}
