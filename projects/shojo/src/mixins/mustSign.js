export default {
  beforeMount() {
    if (typeof window === 'undefined') {
      return
    }

    $bus.on('user-not-sign', () => {
      $toast.error('继续操作前请先登录').then(() => {
        window.location.href = this.$alias.sign()
      })
    })
  }
}
