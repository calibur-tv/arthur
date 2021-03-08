<template>
  <div class="desk-uploader">
    <el-upload
      :action="uploadAction"
      :accept="uploadAccept"
      :data="uploadExtras"
      :http-request="uploadRequest"
      :on-error="handleError"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-progress="handleProgress"
      :before-upload="handleBefore"
      :show-file-list="false"
      multiple
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import upload from '@/mixins/upload'
import uploadRequest from '@/assets/js/upload-request'

export default {
  name: 'DeskUploader',
  components: {},
  props: {},
  mixins: [upload],
  data() {
    return {}
  },
  computed: {
    uploadRequest() {
      return uploadRequest
    },
    folderId() {
      return this.$store.state.desk.folderId
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleError(err, file) {
      $toast.error(`${file.name} 上传失败，${err.message}`)
    },
    handleSuccess(res, file) {
      if (res.code !== 0) {
        this.handleError(res, file)
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
    handleBefore(file) {
      if (file.size > 2147483648) {
        $toast.error('最大上传 2G 文件')
        return false
      }
      return true
    },
    handleRemove(file, fileList) {
      console.log(file)
      console.log(fileList)
    },
    handleProgress(event, file, fileList) {
      console.log(event)
      console.log(file)
      console.log(fileList)
    }
  }
}
</script>

<style lang="scss"></style>
