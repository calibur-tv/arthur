export default {
  mounted() {
    if (typeof window === 'undefined') {
      return
    }

    const { name } = this.$options
    if (name) {
      import('@/assets/js/qiankun').then((modules) => {
        if (modules[name]) {
          this._subApp = modules[name]()
        }
      })
    }
  },
  beforeUnmount() {
    if (this._subApp) {
      this._subApp.forEach((item) => item.unmount())
    }
  }
}
