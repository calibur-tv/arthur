<template>
  <el-breadcrumb class="desk-breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-if="selected">
      <span @click="handleClick">返回上一级</span>
    </el-breadcrumb-item>
    <el-breadcrumb-item>
      <span @click="handleClick">全部文件</span>
    </el-breadcrumb-item>
    <el-breadcrumb-item v-if="selected">
      <span v-text="selected.name" />
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'DeskBreadcrumb',
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
  computed: {
    folderId() {
      return this.$store.state.desk.folderId
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
      this.$store.commit('desk/UPDATE_FOLDER_ID', -1)
    }
  }
}
</script>

<style lang="scss">
.desk-breadcrumb {
  margin-bottom: 5px;
}
</style>
