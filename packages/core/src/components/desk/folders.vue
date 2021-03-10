<template>
  <div class="desk-folders">
    <list-view func="getFolders">
      <template #default="{ list }">
        <desk-folder
          v-for="(item, index) in list"
          :key="item.id"
          :item="item"
          @update="handleUpdate($event, index)"
          @delete="handleDelete(index)"
          @open="handleClick(item.id)"
        />
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
  props: {
    folders: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleClick(id) {
      this.$emit('open', id)
    },
    handleUpdate(data, index) {
      this.$emit('update', {
        ...data,
        index
      })
    },
    handleDelete(index) {
      this.$emit('delete', index)
    }
  }
}
</script>

<style lang="scss"></style>
