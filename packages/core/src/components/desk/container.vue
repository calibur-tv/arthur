<template>
  <div class="desk-container">
    <desk-nav />
    <desk-breadcrumb />
    <desk-sort />
    <desk-folders v-if="folderId === -1" />
    <desk-files v-else />
  </div>
</template>

<script>
import DeskNav from './nav.vue'
import DeskBreadcrumb from './breadcrumb.vue'
import DeskSort from './sort.vue'
import DeskFolders from './folders.vue'
import DeskFiles from './files.vue'

export default {
  name: 'DeskContainer',
  components: {
    DeskNav,
    DeskBreadcrumb,
    DeskSort,
    DeskFolders,
    DeskFiles
  },
  computed: {
    folderId() {
      return this.$store.state.desk.folderId
    }
  }
}
</script>

<style lang="scss">
.desk-container {
  width: 800px;
  height: 500px;
  border: 1px solid black;
}
</style>
