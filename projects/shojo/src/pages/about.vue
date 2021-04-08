<template>
  <AppHeader />
  <p>about page</p>
  <AppFooter />
</template>

<script>
import AppHeader from '@/components/app/AppHeader.vue'
import AppFooter from '@/components/app/AppFooter.vue'

export default {
  name: 'AboutPage',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>
