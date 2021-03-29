<template>
  <div class="desk-sort">
    <div class="name">文件名</div>
    <div class="size">大小</div>
    <div class="time">修改日期</div>
  </div>
</template>

<script>
export default {
  name: 'DeskSort',
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

<style lang="scss">
.desk-sort {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  color: #888;

  .name {
    width: 60%;
  }

  .size {
    width: 16%;
  }

  .time {
    width: 24%;
  }

  > * {
    height: 37px;
    line-height: 37px;
    cursor: pointer;
    padding: 0 10px;

    &:hover {
      background: #f4fbff;
      border-color: #cbedff;
    }
  }
}
</style>
