<template>
  <div class="desk-container">
    <div v-if="folderId !== -1" class="back" @click="goBack">back</div>
    <template v-else>
      <el-button @click="createFolder">新建文件夹</el-button>
      <ul class="folder-list">
        <li v-for="(item, index) in folders" :key="item.id">
          <span class="folder-item" v-html="item.name" @click="getFiles(item.id)" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button @click="updateFolder(item.id, index)">重命名文件夹</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button @click="deleteFolder(item.id, index)">删除文件夹</button>
        </li>
      </ul>
    </template>
    <ul class="file-list">
      <li v-for="item in files" :key="item.id">
        <span class="folder-item" v-html="item.meta" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button @click="renameFile(item.id, index)">重命名文件</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button @click="deleteFile(item.id, index)">删除文件</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DeskContainer',
  components: {},
  props: {},
  data() {
    return {
      folders: [],
      files: []
    }
  },
  computed: {
    folderId() {
      return this.$store.state.desk.folderId
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.getFolders()
    $bus.on('fileUploadSuccess', (file) => {
      this.files.unshift(file)
    })
  },
  beforeUnmount() {
    $bus.off('fileUploadSuccess')
  },
  methods: {
    getFolders() {
      $api('desk.folders').then((list) => {
        this.folders = list
      })
    },
    getFiles(folder_id) {
      this.$store.commit('desk/UPDATE_FOLDER_ID', folder_id)
      $api('desk.files', {
        folder_id
      }).then((files) => {
        this.files = files.result
      })
    },
    goBack() {
      this.$store.commit('desk/UPDATE_FOLDER_ID', -1)
      this.files = []
    },
    deleteFolder(folder_id, index) {
      if (folder_id <= 0) {
        $toast.info('不能删除默认文件夹')
        return
      }
      $confirm('删除文件夹后里面的文件也会被删除不可恢复，确认吗？', '删除文件夹', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        $api('desk.deleteFolder', { folder_id })
          .then(() => {
            $toast.success('删除成功')
            this.folders.splice(index, 1)
          })
          .catch((err) => {
            $toast.error(err.message)
          })
      })
    },
    createFolder() {
      $prompt('请输入文件夹名称', '创建文件夹', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (!value) {
            return
          }
          $api('desk.createFolder', {
            name: value
          })
            .then((folder) => {
              this.folders.unshift(folder)
            })
            .catch((err) => {
              $toast.error(err.message)
            })
        })
        .catch(() => {})
    },
    updateFolder(folder_id, index) {
      $prompt('请输入文件夹名称', '重命名文件夹', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (!value) {
            return
          }
          $api('desk.updateFolder', {
            name: value,
            folder_id
          })
            .then(() => {
              this.folders[index].name = value
            })
            .catch((err) => {
              $toast.error(err.message)
            })
        })
        .catch(() => {})
    },
    deleteFile(file_id, index) {
      $confirm('删除后不可恢复，确认吗？', '删除文件', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        $api('desk.deleteFile', { file_id })
          .then(() => {
            $toast.success('删除成功')
            this.files.splice(index, 1)
          })
          .catch((err) => {
            $toast.error(err.message)
          })
      })
    },
    renameFile(file_id, index) {
      $prompt('请输入文件夹名称', '重命名文件', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (!value) {
            return
          }
          $api('desk.moveFile', {
            name: value,
            file_id,
            folder_id: this.folderId
          })
            .then(() => {
              this.files[index].name = value
            })
            .catch((err) => {
              $toast.error(err.message)
            })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss">
.desk-container {
  .folder-item {
    cursor: pointer;
  }
}
</style>
