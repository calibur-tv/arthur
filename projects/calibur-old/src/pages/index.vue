<template>
  <v-curtain v-if="isAuth" id="desk" :position="{ left: 360, top: 120 }">
    <desk-container />
  </v-curtain>
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
