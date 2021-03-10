<template>
  <div class="desk-nav">
    <desk-uploader />
    <el-button v-if="folderId === -1" size="small" icon="el-icon-folder-add" @click="createFolder">
      新建文件夹
    </el-button>
  </div>
</template>

<script>
import DeskUploader from './uploader.vue'

export default {
  name: 'DeskNav',
  components: {
    DeskUploader
  },
  props: {},
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
    createFolder() {
      $prompt('请输入文件夹名称', '创建文件夹', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (!value) {
            return
          }
          $api.desk
            .createFolder({
              name: value
            })
            .then((folder) => {
              this.$emit('create', folder)
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
.desk-nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 14px 10px;

  > * {
    margin-right: 10px;
  }
}
</style>
