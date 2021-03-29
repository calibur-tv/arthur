<style lang="scss">
.rank-switcher {
  .header-before {
    font-size: 18px;
    font-weight: 400;
    color: #000;
    margin-right: 8px;
    margin-top: 4px;
  }

  .k-item {
    height: 316px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .v-switcher {
    &-content-wrap {
      margin-top: 18px;
    }

    &-header {
      &-wrap,
      &-tabs {
        overflow: visible;
      }

      &-item {
        margin-left: 12px;
        padding: 0;
        font-size: 12px;
        line-height: 24px;
        height: 24px;
        color: #000;
        transition: 0.2s;
        border-bottom: 1px solid transparent;
        cursor: pointer;

        &.is-active {
          color: $color-blue;
          border-bottom-color: $color-blue;
          position: relative;

          &:after {
            content: '';
            position: absolute;
            left: 50%;
            margin-left: -3px;
            bottom: 0;
            width: 0;
            height: 0;
            border-bottom: 3px solid $color-blue;
            border-top: 0;
            border-left: 3px dashed transparent;
            border-right: 3px dashed transparent;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="rank-switcher">
    <VSwitcher :header-height="23" :headers="['全网', '站内']" align="start" :animated="true" header-trigger="hover">
      <template #header-before>
        <div class="header-before">热门</div>
      </template>
      <template #header-after>
        <div class="header-after">三日</div>
      </template>
      <template #0>
        <div class="k-item" style="background-color: rgba(21, 174, 103, 0.5)">0</div>
      </template>
      <template #1>
        <div class="k-item" style="background-color: rgba(125, 205, 244, 0.5)">1</div>
      </template>
    </VSwitcher>
  </div>
</template>

<script>
export default {
  name: 'RankSwitcher',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
