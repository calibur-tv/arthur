<template>
  <div class="desk-file">
    <span class="folder-item" v-html="item.meta" />
    &nbsp;&nbsp;&nbsp;&nbsp;
    <button @click="renameFile">重命名文件</button>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <button @click="deleteFile">删除文件</button>
  </div>
</template>

<script>
export default {
  name: 'DeskFile',
  components: {},
  props: {
    item: {
      type: Object,
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
    deleteFile() {
      $confirm('删除后不可恢复，确认吗？', '删除文件', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        $api.desk
          .deleteFile({ file_id: this.item.id })
          .then(() => {
            $toast.success('删除成功')
            this.$emit('delete')
          })
          .catch((err) => {
            $toast.error(err.message)
          })
      })
    },
    renameFile() {
      $prompt('请输入文件夹名称', '重命名文件', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (!value) {
            return
          }
          $api.desk
            .moveFile({
              name: value,
              file_id: this.item.id,
              folder_id: this.folderId
            })
            .then(() => {
              this.$emit('update', {
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
