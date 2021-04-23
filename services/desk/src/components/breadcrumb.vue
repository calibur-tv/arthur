<template>
  <el-breadcrumb class="desk-breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-if="selected">
      <span class="fade-link" @click="handleClick">返回上一级</span>
    </el-breadcrumb-item>
    <el-breadcrumb-item>
      <span :class="{ 'fade-link': selected }" @click="handleClick">全部文件</span>
    </el-breadcrumb-item>
    <el-breadcrumb-item v-if="selected">
      <span v-text="selected.name" />
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
export default {
  name: 'DeskBreadcrumb',
  components: {
    ElBreadcrumb,
    ElBreadcrumbItem
  },
  data() {
    return {}
  },
  computed: {
    folders() {
      const field = this.$store.getters['list/get']({
        func: 'getFolders'
      })

      return field.result
    },
    folderId() {
      return this.$store.state.folderId
    },
    selected() {
      if (this.folderId === -1) {
        return null
      }

      return this.folders.find((_) => _.id === this.folderId)
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClick() {
      if (this.folderId === -1) {
        return
      }
      this.$store.commit('UPDATE_FOLDER_ID', -1)
    }
  }
}
</script>

<style lang="scss">
.desk-breadcrumb {
  margin-bottom: 7px;
  padding: 0 10px;
  font-size: 12px;
  color: #666;

  i {
    vertical-align: middle !important;
  }

  .fade-link {
    color: #303133;
    font-weight: 700;
  }
}
</style>
