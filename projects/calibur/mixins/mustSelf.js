import user from '@calibur/user'

export default {
  beforeMount() {
    if (typeof window === 'undefined') {
      return
    }

    const canceler = user.watch(
      (info) => {
        if (!info) {
          window.location.href = '/'
          return
        }

        if (info.slug !== this.$route.params.slug) {
          this.$router.replace({
            name: this.$route.name,
            params: {
              slug: info.slug
            }
          })
        }

        canceler()
      },
      { immediate: true }
    )
  }
}
