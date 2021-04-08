<style lang="scss">
.recommended-swipe {
  .name {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 14px;
  }

  .v-switcher {
    border-radius: 4px;

    .k-item {
      width: 100%;
      height: 268px;
    }

    &-header {
      &-wrap {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background: -webkit-linear-gradient(transparent, rgba(0, 0, 0, 0.5));
      }

      &-before {
        padding-left: 10px;
        font-size: 12px;
        color: #fff;
        width: 180px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      &-tabs {
        height: 6px;
        position: absolute;
        bottom: 12px;
        right: 20px;
      }

      &-item {
        display: inline-block;
        width: 9px;
        height: 6px;
        margin-left: 8px;
        border-radius: 10px;
        background: #fff;
        cursor: pointer;
        transition: all 0.3s;

        &.is-active {
          width: 30px;
          background: #f45d8f;
        }
      }
    }
  }
}
</style>

<template>
  <div class="recommended-swipe">
    <p class="name" v-text="name" />
    <VSwitcher
      :headers="list"
      :header-height="35"
      :autoplay="2000"
      :animated="true"
      header-trigger="hover"
      @change="handleChange"
    >
      <template #0>
        <div class="k-item" style="background-color: rgba(21, 174, 103, 0.5)">0</div>
      </template>
      <template #1>
        <div class="k-item" style="background-color: rgba(125, 205, 244, 0.5)">1</div>
      </template>
      <template #header-before>
        {{ list[activeIndex].title }}
      </template>
    </VSwitcher>
  </div>
</template>

<script>
export default {
  name: 'RecommendedSwipe',
  components: {},
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  computed: {
    list() {
      return [
        {
          title: '测试1'
        },
        {
          title: '测试2'
        }
      ]
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleChange(index) {
      this.activeIndex = index
    }
  }
}
</script>
