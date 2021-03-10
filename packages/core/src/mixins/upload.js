export default {
  data() {
    return {
      uploadAccept: ['image/*', 'video/*', 'audio/*'].join(', '),
      uploadExtras: {},
      uploadAction: '',
      getUpTokenTimer: 0
    }
  },
  computed: {
    isAuth() {
      return this.$store.state.isAuth
    }
  },
  mounted() {
    if (this.isAuth) {
      this.initUpToken()
    } else {
      $bus.on('user-signed', () => {
        this.initUpToken()
      })
    }
  },
  beforeUnmount() {
    this.getUpTokenTimer && clearInterval(this.getUpTokenTimer)
  },
  methods: {
    initUpToken() {
      this.getUpToken()
      this.getUpTokenTimer = setInterval(() => {
        this.getUpToken()
      }, 1000 * 60 * 30)
    },
    async getUpToken() {
      const token = await $api.desk.token()
      // extra.name = file.name
      this.uploadExtras.key = token.dir + '${filename}'
      this.uploadExtras.policy = token.policy
      this.uploadExtras.OSSAccessKeyId = token.accessid
      this.uploadExtras.success_action_status = 200
      this.uploadExtras.callback = token.callback
      this.uploadExtras.signature = token.signature
      this.uploadAction = token.host
    }
  }
}
