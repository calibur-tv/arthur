<template>
  <div class="desk-size">
    <el-progress :text-inside="true" :stroke-width="20" :percentage="percent" status="exception">
      <span v-text="size" />
    </el-progress>
  </div>
</template>

<script>
import { ElProgress } from 'element-plus'
import filesize from 'filesize'
import user from '@calibur/user'

export default {
  name: 'DeskSize',
  components: {
    ElProgress
  },
  props: {},
  data() {
    return {
      user: null
    }
  },
  computed: {
    percent() {
      if (!this.user) {
        return 0
      }

      return ((this.user.desk_use_space / this.user.desk_max_space) * 100) | 0
    },
    size() {
      if (!this.user) {
        return 0
      }

      return `${filesize(this.user.desk_use_space)} / ${filesize(this.user.desk_max_space)}`
    }
  },
  watch: {},
  created() {},
  mounted() {
    user.watch((info) => {
      this.user = info
    })
  },
  methods: {}
}
</script>

<style lang="scss">
.desk-size {
  width: 140px;
}
</style>
