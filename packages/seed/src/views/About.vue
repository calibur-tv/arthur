<template>
  <div class="about">
    <p>This is an about page</p>
    <div id="about-01">vue-01 loading...</div>
    <div id="about-02">vue-02 loading...</div>
  </div>
</template>

<script>
import { start } from 'qiankun'

export default {
  mounted() {
    console.log('mounted')
    if (!window.qiankunStarted) {
      window.qiankunStarted = true
      start()
    }
  }
}
</script>
