<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
  <SignDialog />
</template>

<script>
import AppHeader from '@/components/app/AppHeader.vue'
import AppFooter from '@/components/app/AppFooter.vue'
import SignDialog from '@/components/sign/SignDialog.vue'
import useSign from '@/mixins/useSign'

export default {
  components: {
    AppHeader,
    AppFooter,
    SignDialog
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
