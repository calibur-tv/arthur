<template>
  <div class="desk-folders">
    <ul>
      <li v-for="(item, index) in folders" :key="item.id">
        <span v-html="item.name" @click="getFiles(item.id)" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button @click="updateFolder(item.id, index)">重命名文件夹</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button @click="deleteFolder(item.id, index)">删除文件夹</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DeskFolders',
  components: {},
  props: {
    folders: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getFiles(folder_id) {
      this.$emit('open', folder_id)
    },
    updateFolder(folder_id, index) {
      if (folder_id <= 0) {
        $toast.info('不能修改默认文件夹')
        return
      }
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
            this.$emit('delete', index)
          })
          .catch((err) => {
            $toast.error(err.message)
          })
      })
    }
  }
}
</script>

<style lang="scss"></style>
