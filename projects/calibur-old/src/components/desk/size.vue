<template>
  <div class="desk-size">
    <el-progress :text-inside="true" :stroke-width="20" :percentage="percent" status="exception">
      <span v-text="size" />
    </el-progress>
  </div>
</template>

<script>
import filesize from 'filesize'

export default {
  name: 'DeskSize',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    percent() {
      return ((this.user.desk_use_space / this.user.desk_max_space) * 100) | 0
    },
    size() {
      return `${filesize(this.user.desk_use_space)} / ${filesize(this.user.desk_max_space)}`
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
.desk-size {
  width: 140px;
}
</style>
