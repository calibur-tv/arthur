<template>
  <div class="header-wrap">
    <Header />
  </div>
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
import Header from './components/Header.vue'
import Banner from './components/Banner.vue'
import Search from './components/Search.vue'
import Logo from './components/Logo.vue'

export default {
  name: 'App',
  components: {
    Header,
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
  background-color: rgb(239, 239, 244);
}

.header-wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
}

.logo-wrap {
  position: absolute;
  left: 50%;
  top: 120px;
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
  position: absolute;
  left: 50%;
  width: 600px;
  height: 50px;
  transform: translateX(-50%);
  top: 290px;
}
</style>
