export default {
  data() {
    return {
      uploadAccept: ['image/*', 'video/*', 'audio/*'].join(', '),
      uploadExtras: {},
      uploadAction: '',
      sourcePrefix: 'https://m1.calibur.tv/',
      getUpTokenTimer: 0
    }
  },
  computed: {
    isAuth() {
      return this.$store.state.isAuth
    },
    folderId() {
      return this.$store.state.desk.folderId
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
      const token = await $api('desk.token')
      // extra.name = file.name
      this.uploadExtras.key = token.dir + '${filename}'
      this.uploadExtras.policy = token.policy
      this.uploadExtras.OSSAccessKeyId = token.accessid
      this.uploadExtras.success_action_status = 200
      this.uploadExtras.callback = token.callback
      this.uploadExtras.signature = token.signature
      this.uploadAction = token.host
    },
    handleUploadError(err, file) {
      $toast.error(`${file.name} 上传失败`)
    },
    handleUploadSuccess(res, file) {
      if (res.code !== 0) {
        this.handleUploadError(res.data, file)
        return
      }

      if (!res.data) {
        return
      }

      $api('desk.moveFile', {
        folder_id: this.folderId,
        file_id: res.data.id,
        name: file.data.name
      }).then((item) => {
        $bus.emit('fileUploadSuccess', item)
      })
    },
    handleUploadBefore(file) {
      if (file.size > 2147483648) {
        $toast.error('最大上传 2G 文件')
        return false
      }
      return true
    }
  }
}
