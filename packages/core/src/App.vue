<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import useSign from '@/mixins/useSign'

export default {
  components: {
    AppHeader,
    AppFooter
  },
  mixins: [useSign]
}
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
