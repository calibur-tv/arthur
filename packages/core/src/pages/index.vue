<template>
  <desk-uploader v-if="isAuth" />
</template>

<script>
import DeskUploader from '@/components/desk/uploader.vue'

export default {
  name: 'HomePage',
  components: {
    DeskUploader
  },
  computed: {
    isAuth() {
      return this.$store.state.isAuth
    }
  }
}
</script>
