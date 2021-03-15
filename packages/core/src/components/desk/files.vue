<template>
  <div class="desk-files">
    <list-view
      ref="loader"
      func="getFolderFiles"
      :query="{
        folder_id: folderId
      }"
    >
      <template #default="{ list }">
        <desk-file
          v-for="item in list"
          :key="item.id"
          :item="item"
          @update="handleUpdate($event, item)"
          @delete="handleDelete(item)"
          @open="handleClick(item)"
        />
      </template>
    </list-view>
  </div>
</template>

<script>
import DeskFile from './file.vue'

export default {
  name: 'DeskFiles',
  components: {
    DeskFile
  },
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
  mounted() {
    $bus.on('DESK_UPLOAD_SUCCESS', (file) => {
      this.$refs.loader.unshift(file)
    })
  },
  beforeUnmount() {
    $bus.off('DESK_UPLOAD_SUCCESS')
  },
  methods: {
    handleUpdate(data, item) {
      this.$refs.loader.merge(item.id, data)
    },
    handleDelete(item) {
      this.$refs.loader.delete(item.id)
    },
    handleClick(item) {
      this.$emit('open', item.id)
    }
  }
}
</script>

<style lang="scss"></style>
