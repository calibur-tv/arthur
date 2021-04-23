import { deskApi } from '@calibur/api'
import user from '@calibur/user'

export default {
  data() {
    return {
      uploadAccept: ['image/*', 'video/*', 'audio/*', 'txt'].join(', '),
      uploadExtras: {},
      uploadAction: '',
      getUpTokenTimer: 0
    }
  },
  mounted() {
    user.watch(
      (user) => {
        if (!user) {
          return
        }

        this.initUpToken()
      },
      { immediate: true }
    )
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
      const token = await deskApi.token()
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
