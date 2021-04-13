<template>
  <div class="calibur-banner">
    <div :class="{ show: toggle }" :style="{ backgroundImage: banner1 ? `url(${banner1})` : '' }" class="banner" />
    <div :class="{ show: !toggle }" :style="{ backgroundImage: banner2 ? `url(${banner2})` : '' }" class="banner" />
  </div>
</template>

<script>
import http from '@calibur/http'

export default {
  name: 'CaliburBanner',
  data() {
    return {
      banners: [],
      banner1: null,
      banner2: null,
      timer: null,
      toggle: true,
      options: {
        width: 2048,
        height: 0,
        mode: 0
      },
      index: 0
    }
  },
  mounted() {
    this.getBanners()
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  methods: {
    getBanners() {
      if (this.banners.length) {
        this.loopBanner()
      } else {
        http.get('cm/image_looper').then((res) => {
          this.banners = res.result
          this.loopBanner()
        })
      }
    },
    loopBanner() {
      this.banner1 = this.banners[0]
      this.timer = setInterval(() => {
        if (!this.banners.length) {
          return
        }

        this.index = 1 + this.index === this.banners.length ? 0 : this.index + 1
        const data = this.banners[this.index]
        this.toggle ? (this.banner2 = data) : (this.banner1 = data)
        setTimeout(() => {
          this.toggle = !this.toggle
        }, 7500)
      }, 15000)
    }
  }
}
</script>

<style lang="scss">
.calibur-banner {
  width: 100%;
  height: 100%;
  background-color: rgb(239, 239, 244);

  .banner {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    &.show {
      opacity: 1;
    }
  }
}
</style>
