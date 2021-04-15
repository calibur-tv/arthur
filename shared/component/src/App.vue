<template>
  <div class="banner-wrap">
    <Banner />
  </div>
  <div class="logo-wrap">
    <Logo shadow />
  </div>
  <div class="search-wrap">
    <Search />
  </div>
</template>

<script>
import Banner from './components/Banner.vue'
import Search from './components/Search.vue'
import Logo from './components/Logo.vue'

export default {
  name: 'App',
  components: {
    Logo,
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

.logo-wrap {
  position: absolute;
  left: 50%;
  top: 200px;
  transform: translateX(-50%);
  z-index: 10;
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
