export const loader = (name, cdn, callback) =>
  new Promise((resolve, reject) => {
    if (window[name]) {
      resolve()
    } else {
      const isStyle = /.css/.test(cdn)
      const script = document.createElement(isStyle ? 'style' : 'script')
      if (isStyle) {
        script.setAttribute('rel', 'stylesheet')
        script.href = cdn
      } else {
        script.src = cdn
      }
      script.onload = function () {
        callback && callback()
        resolve()
      }
      script.onerror = function () {
        reject()
      }
      document.body.appendChild(script)
    }
  })

export const bootstrap = (array, app) => {
  const pending = []

  array.forEach((obj) => {
    obj.resource.forEach((pkg) => {
      pending.push(loader(obj.global, pkg.cdn, () => (pkg.callback ? pkg.callback(app) : null)))
    })
  })

  return Promise.all(pending)
}

export const cdn = {
  ElementPlus: {
    global: 'ElementPlus',
    resource: [
      {
        cdn: 'https://unpkg.com/element-plus@1.0.2-beta.35/lib/index.full.js',
        callback: (app) => {
          app.use(window.ElementPlus)
        }
      },
      {
        cdn: 'https://unpkg.com/element-plus/lib/theme-chalk/index.css'
      }
    ]
  }
}
