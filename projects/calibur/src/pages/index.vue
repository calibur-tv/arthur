<template>
  <calibur-logo shadow />
  <v-curtain v-if="isAuth" id="desk" :position="{ left: 360, top: 120 }">
    <desk-container />
  </v-curtain>
</template>

<script>
import DeskContainer from '@/components/desk/container.vue'
import { CaliburLogo } from '@calibur/component'

export default {
  name: 'HomePage',
  components: {
    CaliburLogo,
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
