<template>
  <div id="page-desk">
    <div id="__calibur_mfe_desk" />
  </div>
</template>

<script>
import { isDev } from '@calibur/utils'
import { loadMicroApp } from 'qiankun'
import mustSign from '@/mixins/mustSign'

export default {
  name: 'PageDesk',
  mixins: [mustSign],
  mounted() {
    loadMicroApp({
      name: 'desk',
      entry: isDev ? '//localhost:7104' : 'https://www.calibur.tv/mfe/desk',
      container: '#__calibur_mfe_desk'
    })
  }
}
</script>

<style>
#page-desk {
  width: 100vw;
  height: 100vh;
}
</style>
