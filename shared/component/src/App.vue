<template>
  <div class="banner-wrap">
    <Banner />
  </div>
  <div class="search-wrap">
    <Search />
  </div>
</template>

<script>
import Banner from './components/Banner.vue'
import Search from './components/Search.vue'

export default {
  name: 'App',
  components: {
    Banner,
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
}

.banner-wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.search-wrap {
  width: 600px;
  height: 50px;
}
</style>
