<template>
  <div class="preview-image" :style="wrapStyle">
    <img :src="item.meta.url" />
  </div>
</template>

<script>
export default {
  name: 'PreviewImage',
  components: {},
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    wrapStyle() {
      const rate = 400 / this.item.meta.width

      return {
        width: '400px',
        height: `${(rate * this.item.meta.height) | 0}px`
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
.preview-image {
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
