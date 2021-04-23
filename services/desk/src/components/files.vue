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
      <template #nothing>
        <img src="../assets/nothing.png" alt="" />
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
      return this.$store.state.folderId
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.$bus.on('DESK_UPLOAD_SUCCESS', (file) => {
      this.$refs.loader.unshift(file)
    })
  },
  beforeUnmount() {
    this.$bus.off('DESK_UPLOAD_SUCCESS')
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

<style lang="scss">
.desk-files {
  .list-view__state {
    img {
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
