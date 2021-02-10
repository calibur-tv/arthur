<template>
  <div style="text-align: center">
    <p>This is an home page</p>
    <div id="vue-01">vue-01 loading...</div>
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
