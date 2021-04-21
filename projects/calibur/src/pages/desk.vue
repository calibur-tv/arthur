<template>
  <div id="page-desk">
    <DeskContainer />
  </div>
</template>

<script>
import DeskContainer from '@/components/desk/container.vue'

export default {
  name: 'PageDesk',
  components: {
    DeskContainer
  }
}
</script>

<style>
#page-desk {
  width: 100vw;
  height: 100vh;
}
</style>
