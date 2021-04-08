export const loader = (name, cdn, callback) =>
  new Promise((resolve, reject) => {
    if (window[name]) {
      resolve()
    } else {
      const isStyle = /.css/.test(cdn)
      const script = document.createElement(isStyle ? 'link' : 'script')
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
        reject(
          new Error({
            message: `module ${name} load failed，url：${cdn}`
          })
        )
      }
      document.head.appendChild(script)
    }
  })

export const bootstrap = (array) => {
  const pending = []

  array.forEach((obj) => {
    obj.resource.forEach((pkg) => {
      pending.push(loader(obj.global, pkg))
    })
  })

  return Promise.all(pending)
}
