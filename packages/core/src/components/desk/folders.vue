<template>
  <div class="desk-folders">
    <list-view ref="loader" func="getFolders">
      <template #default="{ list }">
        <desk-folder v-for="item in list" :key="item.id" :item="item" @update="handleUpdate" @delete="handleDelete" />
      </template>
    </list-view>
  </div>
</template>

<script>
import DeskFolder from './folder.vue'

export default {
  name: 'DeskFolders',
  components: {
    DeskFolder
  },
  mounted() {
    $bus.on('DESK_CREATE_FOLDER', (folder) => {
      this.$refs.loader.unshift(folder)
    })
  },
  beforeUnmount() {
    $bus.off('DESK_CREATE_FOLDER')
  },
  methods: {
    handleUpdate(data, item) {
      this.$refs.loader.merge(item.id, data)
    },
    handleDelete(item) {
      this.$refs.loader.delete(item.id)
    }
  }
}
</script>

<style lang="scss"></style>
