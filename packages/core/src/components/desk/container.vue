<template>
  <div class="desk-container">
    <desk-nav @create="createFolder" />
    <desk-breadcrumb :folders="folders" />
    <desk-sort />
    <desk-folders
      v-if="folderId === -1"
      :folders="folders"
      @open="getFiles"
      @update="updateFolder"
      @delete="deleteFolder"
    />
    <desk-files v-else :files="files" @update="updateFile" @delete="deleteFile" />
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
  data() {
    return {
      folders: [],
      files: []
    }
  },
  computed: {
    folderId() {
      return this.$store.state.desk.folderId
    }
  },
  mounted() {
    this.getFolders()
    $bus.on('fileUploadSuccess', (file) => {
      this.files.unshift(file)
    })
  },
  beforeUnmount() {
    $bus.off('fileUploadSuccess')
  },
  methods: {
    getFolders() {
      $api.desk.folders().then((list) => {
        this.folders = list
      })
    },
    getFiles(folder_id) {
      this.$store.commit('desk/UPDATE_FOLDER_ID', folder_id)
      $api.desk
        .files({
          folder_id
        })
        .then((files) => {
          this.files = files.result
        })
    },
    createFolder(folder) {
      this.folders.unshift(folder)
    },
    updateFolder({ index, name }) {
      this.folders[index].name = name
    },
    deleteFolder(index) {
      this.folders.splice(index, 1)
    },
    deleteFile(index) {
      this.files.splice(index, 1)
    },
    updateFile({ index, name }) {
      this.files[index].name = name
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
