<template>
  <div class="desk-uploader">
    <el-upload
      :action="uploadAction"
      :accept="uploadAccept"
      :data="uploadExtras"
      :on-error="handleUploadError"
      :on-success="handleUploadSuccess"
      :http-request="uploadRequest"
      :before-upload="handleUploadBefore"
      drag
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
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
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss"></style>
