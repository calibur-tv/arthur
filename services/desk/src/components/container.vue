<template>
  <div class="desk-container">
    <desk-nav />
    <desk-breadcrumb />
    <desk-sort />
    <desk-folders v-if="folderId === -1" class="desk-list" />
    <desk-files v-else class="desk-list" />
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
      return this.$store.state.folderId
    }
  }
}
</script>

<style lang="scss">
.desk-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  > * {
    flex-shrink: 0;
    width: 100%;
  }

  .desk-list {
    flex-shrink: 1;
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
