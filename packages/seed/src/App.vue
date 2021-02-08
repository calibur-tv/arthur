<template>
  <AppHeader />
  <RouterView />
  <SignDialog />
  <AppFooter />
</template>

<script>
import AppHeader from '@/components/app/AppHeader'
import AppFooter from '@/components/app/AppFooter'
import SignDialog from '@/components/sign/SignDialog'
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
