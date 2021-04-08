<template>
  <div class="desk-nav">
    <div>
      <desk-uploader />
      &nbsp;&nbsp;
      <el-button v-if="folderId === -1" size="small" icon="el-icon-folder-add" @click="createFolder">
        新建文件夹
      </el-button>
    </div>
    <div>
      <desk-size />
    </div>
  </div>
</template>

<script>
import DeskUploader from './uploader.vue'
import DeskSize from './size.vue'

export default {
  name: 'DeskNav',
  components: {
    DeskSize,
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
              $bus.emit('DESK_CREATE_FOLDER', folder)
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
  justify-content: space-between;
  align-items: center;
  padding: 14px 10px;

  > * {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
