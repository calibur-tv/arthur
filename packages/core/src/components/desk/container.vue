<template>
  <div class="desk-container">
    <div v-if="folderId !== -1" class="back" @click="goBack">back</div>
    <ul v-else class="folder-list">
      <li v-for="item in folders" :key="item.id">
        <span class="folder-item" v-html="item.name" @click="getFiles(item.id)" />
      </li>
    </ul>
    <ul class="file-list">
      <li v-for="item in files" :key="item.id">
        <span class="folder-item" v-html="item.meta" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DeskContainer',
  components: {},
  props: {},
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
  watch: {},
  created() {},
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
      $api('desk.folders').then((list) => {
        this.folders = list
      })
    },
    getFiles(folder_id) {
      this.$store.commit('desk/UPDATE_FOLDER_ID', folder_id)
      $api('desk.files', {
        folder_id
      }).then((files) => {
        this.files = files.result
      })
    },
    goBack() {
      this.$store.commit('desk/UPDATE_FOLDER_ID', -1)
      this.files = []
    }
  }
}
</script>

<style lang="scss">
.desk-container {
  .folder-item {
    cursor: pointer;
  }
}
</style>
