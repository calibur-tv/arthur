<template>
  <div id="page-desk">
    <DeskContainer v-if="isAuth" />
  </div>
</template>

<script>
import DeskContainer from '@/components/desk/container.vue'

export default {
  name: 'PageDesk',
  components: {
    DeskContainer
  },
  computed: {
    isAuth() {
      return this.$store.state.isAuth
    }
  }
}
</script>

<style>
#page-desk {
  width: 100vw;
  height: 100vh;
}
</style>
