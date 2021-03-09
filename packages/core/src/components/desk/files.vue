<template>
  <div class="desk-files">
    <ul>
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
  name: 'DeskFiles',
  components: {},
  props: {
    files: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    folderId() {
      return this.$store.state.desk.folderId
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    deleteFile(file_id, index) {
      $confirm('删除后不可恢复，确认吗？', '删除文件', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        $api('desk.deleteFile', { file_id })
          .then(() => {
            $toast.success('删除成功')
            this.$emit('delete', index)
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
              this.$emit('update', {
                index,
                name: value
              })
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

<style lang="scss"></style>
