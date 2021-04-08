<template>
  <picture v-lazyload:[disabled]="handleLazy" class="v-img">
    <source v-if="srcset" :srcset="srcset" type="image/webp" />
    <img :src="imgSrc" :alt="alt" loading="lazy" @load="handleLoaded" @error="handleError" />
  </picture>
</template>

<script>
import { resizeImage, calcRelativeDPR, isServer, isLink, requestIdleCallback } from './helper'

if (!isServer) {
  const loopDPR = () => {
    requestIdleCallback(
      () => {
        window.__img_dpr__ = calcRelativeDPR()
        setTimeout(() => {
          loopDPR()
        }, 5e3)
      },
      { timeout: 2e3 }
    )
  }
  window.addEventListener('load', () => {
    loopDPR()
  })
}

export default {
  name: 'VImg',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    },
    rule: {
      type: [String, Number],
      default: ''
    },
    source: {
      type: Object,
      default: () => {}
    },
    lazy: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loaded: !this.lazy,
      disabled: !this.lazy
    }
  },
  computed: {
    dpr() {
      return this.lazy ? 0 : 2
    },
    filter() {
      return this.$resizeImage || resizeImage
    },
    srcset() {
      if (!isLink(this.src) || (this.$isServer && this.lazy)) {
        return ''
      }

      const computeSource = this.filter(this.src, { ...this._props, dpr: this.dpr, webP: true })

      if (this.$isServer || this.loaded) {
        return computeSource
      }

      return ''
    },
    imgSrc() {
      if (!isLink(this.src)) {
        return this.src
      }

      const computeSrc = this.filter(this.src, { ...this._props, dpr: this.dpr, webP: false })
      if (this.$isServer) {
        if (this.lazy) {
          return ''
        }
        return computeSrc
      }
      if (this.loaded) {
        return computeSrc
      }
      return ''
    }
  },
  created() {
    this.supportNativeLazy()
  },
  methods: {
    supportNativeLazy() {
      if (!isServer && 'loading' in HTMLImageElement.prototype) {
        this.disabled = true
        this.loaded = true
      }
    },
    handleLazy() {
      this.loaded = true
    },
    handleLoaded(e) {
      this.$emit('load', e)
    },
    handleError(e) {
      this.$emit('error', e)
    }
  }
}
</script>

<style lang="scss">
.v-img {
  display: inline-block;
  line-height: 1;
  width: 100%;
  height: 100%;
  vertical-align: middle;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
