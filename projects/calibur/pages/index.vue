<template>
  <div id="app">
    <div class="header-wrap">
      <calibur-header />
    </div>
    <div class="banner-wrap">
      <calibur-banner />
    </div>
    <div class="logo-wrap">
      <calibur-logo shadow />
    </div>
    <div class="search-wrap">
      <calibur-search />
    </div>
  </div>
</template>

<style lang="scss">
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
