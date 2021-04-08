const loader = (name, cdn) =>
  new Promise((resolve, reject) => {
    if (window[name]) {
      resolve()
    } else {
      const isStyle = /.css/.test(cdn)
      const script = document.createElement(isStyle ? 'link' : 'script')
      if (isStyle) {
        script.setAttribute('rel', 'stylesheet')
        script.href = cdn
        document.head.appendChild(script)
        resolve()
      } else {
        script.src = cdn
        script.onload = function () {
          resolve()
        }
        script.onerror = function () {
          reject(
            new Error({
              message: `module ${name} load failed，url：${cdn}`
            })
          )
        }
        document.body.appendChild(script)
      }
    }
  })

const bootstrap = async (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].resource.length; j++) {
      await loader(array[i].global, array[i].resource[j])
    }
  }
}

export default bootstrap
