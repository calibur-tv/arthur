<template>
  <div class="desk-uploader">
    <el-upload
      ref="uploader"
      :action="uploadAction"
      :accept="uploadAccept"
      :data="uploadExtras"
      :http-request="uploadRequest"
      :on-error="handleError"
      :on-success="handleSuccess"
      :on-progress="handleProgress"
      :before-upload="handleBefore"
      :show-file-list="false"
      multiple
    >
      <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
    </el-upload>
    <el-drawer
      title="我是标题"
      v-model="openProgressDrawer"
      direction="rtl"
      :append-to-body="true"
      :before-close="clearPendingList"
    >
      <li v-for="item in pendingFiles" :key="item.uid">
        <i class="el-icon-document" />
        <span v-text="item.name" />
        <template v-if="item.status === 'uploading'">
          <el-progress :percentage="item.percentage" :stroke-width="2" />
          <span @click="removeFile(item)">
            <i class="el-icon-delete" />
          </span>
        </template>
      </li>
    </el-drawer>
  </div>
</template>

<script>
import { ElUpload, ElButton, ElDrawer, ElProgress } from 'element-plus'
import upload from '../utils/upload'
import request from '../utils/request'

export default {
  name: 'DeskUploader',
  mixins: [upload],
  components: {
    ElUpload,
    ElButton,
    ElDrawer,
    ElProgress
  },
  data() {
    return {
      openProgressDrawer: false,
      pendingFiles: []
    }
  },
  computed: {
    uploadRequest() {
      return request
    },
    folderId() {
      return this.$store.state.folderId
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleError(err, file) {
      if (err.status < 200 || err.status >= 300) {
        return
      }

      this.$toast.error(`${file.name} 上传失败，${err.message}`)
    },
    handleSuccess(res, file) {
      if (res.code !== 0) {
        this.handleError(res, file)
        return
      }

      this.$bus.emit('DESK_UPLOAD_SUCCESS', res.data)
    },
    handleBefore(file) {
      if (this.folderId === -1) {
        this.$store.commit('UPDATE_FOLDER_ID', 0)
      }
      if (file.size > 2147483648) {
        this.$toast.error('最大上传 2G 文件')
        return false
      }
      file.folder_id = this.folderId
      return true
    },
    removeFile(file) {
      this.$refs.uploader.uploadRef.abort(file)
      this.pendingFiles.forEach((item, index) => {
        if (item.uid === file.uid) {
          this.pendingFiles.splice(index, 1)
        }
      })
    },
    handleProgress(event, file, fileList) {
      this.openProgressDrawer = true
      this.pendingFiles = fileList
    },
    clearPendingList(done) {
      this.pendingFiles = []
      this.$refs.uploader.clearFiles()
      done()
    }
  }
}
</script>

<style lang="scss"></style>
