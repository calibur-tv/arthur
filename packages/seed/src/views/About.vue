<template>
  <div class="about">
    <p>This is an about page</p>
    <div id="about-01">vue-01 loading...</div>
    <div id="about-02">vue-02 loading...</div>
  </div>
</template>

<script>
import { aboutPage } from '@/assets/js/qiankun'

export default {
  data() {
    return {
      app: null
    }
  },
  mounted() {
    this.app = aboutPage()
  },
  beforeUnmount() {
    this.app.forEach((item) => item.unmount())
  }
}
</script>
