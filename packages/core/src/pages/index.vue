<template>
  <div v-if="isAuth" class="desk-wrap">
    <desk-container />
  </div>
</template>

<script>
import DeskContainer from '@/components/desk/container.vue'

export default {
  name: 'HomePage',
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

<style lang="scss">
.desk-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
