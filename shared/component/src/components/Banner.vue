<template>
  <div class="calibur-banner">
    <div :class="{ show: toggle }" :style="{ backgroundImage: banner1 ? `url(${banner1})` : '' }" class="banner" />
    <div :class="{ show: !toggle }" :style="{ backgroundImage: banner2 ? `url(${banner2})` : '' }" class="banner" />
  </div>
</template>

<script>
import { cmApi } from '@calibur/api'
import { resize } from '@calibur/utils'

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
        cmApi.imageLoop().then((res) => {
          this.banners = res.result
          this.loopBanner()
        })
      }
    },
    loopBanner() {
      this.banner1 = resize(this.banners[0], { width: 2040 })
      this.timer = setInterval(() => {
        if (!this.banners.length) {
          return
        }

        this.index = 1 + this.index === this.banners.length ? 0 : this.index + 1
        const data = resize(this.banners[this.index], { width: 2040 })
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
