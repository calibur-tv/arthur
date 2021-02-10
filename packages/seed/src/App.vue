<template>
  <AppHeader />
  <router-link to="/">home</router-link>
  <router-link to="/about">about</router-link>
  <RouterView />
  <SignDialog />
  <AppFooter />
</template>

<script>
import AppHeader from '@/components/app/AppHeader'
import AppFooter from '@/components/app/AppFooter'
import SignDialog from '@/components/sign/SignDialog'
import useSign from '@/mixins/useSign'
import { bootstrap } from '@/assets/js/qiankun'

export default {
  components: {
    AppHeader,
    AppFooter,
    SignDialog
  },
  mixins: [useSign],
  mounted() {
    bootstrap()
  }
}
</script>

<style lang="scss">
#calibur {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
