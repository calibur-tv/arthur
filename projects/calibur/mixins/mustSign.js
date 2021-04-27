import user from '@calibur/user'

export default {
  beforeMount() {
    if (typeof window === 'undefined') {
      return
    }

    user.get((info) => {
      if (info) {
        return
      }

      window.location.href = '/'
    })
  }
}
