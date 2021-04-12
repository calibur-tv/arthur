<template>
  <div class="search-wrap">
    <Search />
  </div>
</template>

<script>
import Search from './components/Search.vue'

export default {
  name: 'App',
  components: {
    Search
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
  background-image: url('./assets/bg.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.search-wrap {
  width: 600px;
  height: 50px;
}
</style>
