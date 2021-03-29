<template>
  <RouterView />
  <SignDialog />
</template>

<script>
import SignDialog from '@/components/sign/SignDialog.vue'
import useSign from '@/mixins/useSign'

export default {
  components: {
    SignDialog
  },
  mixins: [useSign]
}
</script>
