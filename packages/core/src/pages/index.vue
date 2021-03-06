<template>
  <div v-if="isAuth" class="desk-wrap">
    <desk-uploader />
    <desk-container />
  </div>
</template>

<script>
import DeskUploader from '@/components/desk/uploader.vue'
import DeskContainer from '@/components/desk/container.vue'

export default {
  name: 'HomePage',
  components: {
    DeskUploader,
    DeskContainer
  },
  computed: {
    isAuth() {
      return this.$store.state.isAuth
    }
  }
}
</script>

<style lang="scss">
.desk-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
