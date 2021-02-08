import parseToken from '@/assets/js/parseToken'

export default {
  async created() {
    if (this.$isServer) {
      return
    }

    if (this.$store.state.logging) {
      const canceler = this.$watch('$store.state.logging', () => {
        if (this.$store.state.isAuth) {
          this.$bus.emit('user-signed')
          canceler()
        } else {
          this.$cookie.remove('JWT-TOKEN')
          this.$bus.emit('user-not-sign')
        }
      })
    } else {
      const token = parseToken()
      this.$store.commit('SET_USER_TOKEN', token)
      const user = await this.$store.dispatch('initAuth')
      if (user) {
        this.$bus.emit('user-signed')
        this.$store.dispatch('getUserRoles')
      } else {
        this.$cookie.remove('JWT-TOKEN')
        this.$bus.emit('user-not-sign')
      }
    }
  }
}
