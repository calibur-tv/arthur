const isServer = typeof window === 'undefined'

const requestIdleCallback = isServer
  ? null
  : window.requestIdleCallback ||
    function (cb) {
      const start = Date.now()
      return setTimeout(function () {
        // eslint-disable-next-line
      cb({
          didTimeout: false,
          timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
        })
      }, 1)
    }

const trimHttp = (url) => (url ? url.replace(/^http:/, '') : '')

const supportWebP = () => {
  if (isServer) {
    return false
  }

  if (window.__support_webp__ !== undefined) {
    return window.__support_webp__
  }

  try {
    const result = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
    window.__support_webp__ = result
    return result
  } catch (err) {
    return false
  }
}

const calcRelativeDPR = () => {
  const match = (window?.navigator?.connection?.effectiveType || '').match(/\d+/)
  if (match) {
    return Math.max((window.devicePixelRatio - (4 - match[0])) | 0, 1)
  }
  return window.devicePixelRatio | 0
}

// https://help.aliyun.com/document_detail/44688.html?spm=a2c4g.11186623.6.749.1b274a1aYIOcdE
const resize = (path, { width, height } = {}) => {
  if (!isServer && !window.__img_dpr_calc__) {
    window.__img_dpr_calc__ = 1

    const loopDPR = () => {
      requestIdleCallback(
        () => {
          window.__img_dpr__ = calcRelativeDPR()
          setTimeout(() => {
            loopDPR()
          }, 5e3)
        },
        { timeout: 2e3 }
      )
    }

    loopDPR()
  }

  if (!path) {
    return ''
  }

  const url = trimHttp(path)
  const DPR = isServer ? 2 : (window.__img_dpr__ || window.devicePixelRatio) | 0
  const w = width ? `,w_${(width * DPR) | 0}` : ''
  const h = height ? `,h_${(height * DPR) | 0}` : ''
  const m = w && h ? ',m_fill' : ''
  const r = w || h ? '/resize' : ''
  const format = supportWebP() ? '/format,webp' : ''

  return `${url}?x-oss-process=image/auto-orient,1${r}${w}${h}${m}${format}`
}

export default resize
