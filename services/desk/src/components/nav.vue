<template>
  <div class="desk-nav">
    <div>
      <el-button plain type="primary" size="small" icon="el-icon-folder-add" @click="createFolder">
        新建文件夹
      </el-button>
      <desk-uploader />
    </div>
    <div>
      <desk-size />
    </div>
  </div>
</template>

<script>
import { ElButton } from 'element-plus'
import { deskApi } from '@calibur/api'
import DeskUploader from './uploader.vue'
import DeskSize from './size.vue'

export default {
  name: 'DeskNav',
  components: {
    ElButton,
    DeskSize,
    DeskUploader
  },
  props: {},
  data() {
    return {}
  },
  computed: {
    folderId() {
      return this.$store.state.folderId
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    createFolder() {
      this.$prompt('请输入文件夹名称（只能创建在根目录下）', '创建文件夹', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (!value) {
            return
          }

          deskApi
            .createFolder({
              name: value
            })
            .then((folder) => {
              this.$bus.emit('DESK_CREATE_FOLDER', folder)
            })
            .catch((err) => {
              this.$toast.error(err.message)
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
