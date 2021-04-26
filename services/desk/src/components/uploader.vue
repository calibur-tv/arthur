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
    <el-popover placement="bottom" :width="300" popper-class="uploader-pending" trigger="click">
      <template v-if="pendingFiles.length">
        <div v-for="item in pendingFiles" :key="item.uid" class="file-progress">
          <div class="file-info">
            <i class="el-icon-document" />
            <div class="file-name" v-text="item.name" />
            <span class="file-delete" @click="removeFile(item)" v-if="item.status === 'uploading'">
              <i class="el-icon-delete" />
            </span>
          </div>
          <el-progress :percentage="item.percentage" :stroke-width="5" />
        </div>
      </template>
      <div class="empty" v-else>没有正在上传的文件</div>
      <template #reference>
        <el-badge :value="waitingCount" :hidden="!waitingCount">
          <el-button size="small" icon="el-icon-upload" circle />
        </el-badge>
      </template>
    </el-popover>
  </div>
</template>

<script>
import { ElUpload, ElButton, ElProgress, ElBadge, ElPopover } from 'element-plus'
import { deskApi } from '@calibur/api'
import upload from '../utils/upload'
import request from '../utils/request'

export default {
  name: 'DeskUploader',
  mixins: [upload],
  components: {
    ElUpload,
    ElButton,
    ElBadge,
    ElPopover,
    ElProgress
  },
  data() {
    return {
      openProgressDrawer: false,
      pendingFiles: [],
      successCount: 0
    }
  },
  computed: {
    uploadRequest() {
      return request
    },
    folderId() {
      return this.$store.state.folderId
    },
    waitingCount() {
      return this.pendingFiles.length - this.successCount
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

      this.unshiftPending(file)
      this.$toast.error(`${file.name} 上传失败，${err.message}`)
    },
    handleSuccess(res, file) {
      if (!res) {
        return
      }

      if (res.code !== 0) {
        this.handleError(res, file)
        return
      }
      this.successCount++
      deskApi
        .moveFile({
          name: file.name,
          file_id: res.data.id,
          folder_id: this.folderId
        })
        .then((resp) => {
          this.$bus.emit('DESK_UPLOAD_SUCCESS', resp)
        })
        .catch(() => {
          this.$bus.emit('DESK_UPLOAD_SUCCESS', res.data)
        })
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
      this.unshiftPending(file)
    },
    unshiftPending(file) {
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

<style lang="scss">
.desk-uploader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  > * {
    margin-left: 10px;
  }
}

.uploader-pending {
  padding: 5px !important;
  height: 265px;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;

  .empty {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .file-progress {
    padding: 10px;

    .file-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .file-name {
        flex: 1;
        margin: 0 5px;
        @extend %oneline;
      }

      .file-delete {
        cursor: pointer;
      }
    }
  }
}
</style>
