<template>
  <div style="text-align: center">
    <div id="about-01">vue-01 loading...</div>
    <br />
    <div id="about-02">vue-02 loading...</div>
  </div>
</template>

<script>
import { homePage } from '@/assets/js/qiankun'

export default {
  data() {
    return {
      app: null
    }
  },
  mounted() {
    this.app = homePage()
  },
  beforeUnmount() {
    this.app.forEach((item) => item.unmount())
  }
}
</script>
