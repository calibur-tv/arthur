export const loader = (name, cdn, callback) => new Promise((resolve, reject) => {
  if (window[name]) {
    resolve()
  } else {
    const script = document.createElement('script')
    script.src = cdn
    script.onload = function() {
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

  array.forEach(obj => {
    pending.push(loader(obj.key, obj.cdn, () => obj.callback(app)))
  })

  return Promise.all(pending)
}

export const cdn = {
  ElementPlus: {
    key: 'ElementPlus',
    cdn: 'https://unpkg.com/element-plus@1.0.2-beta.35/lib/index.full.js',
    callback: (app) => {
      app.use(window.ElementPlus)
    }
  }
}
