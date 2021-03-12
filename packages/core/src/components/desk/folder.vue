<template>
  <div class="desk-folder">
    <div class="main">
      <div class="name">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24">
          <path d="M27.5,5.5H18.2L16.1,9.7H4.4V26.5H29.6V5.5Zm0,4.2H19.3l1.1-2.1h7.1Z" style="fill: #fb7299" />
        </svg>
        <span v-html="item.name" class="fade-link" @click="getFiles" />
      </div>
      <div class="tool">
        <button @click="updateFolder">
          <i class="el-icon-edit-outline" />
        </button>
        <button @click="deleteFolder">
          <i class="el-icon-delete" />
        </button>
      </div>
    </div>
    <div class="size">-</div>
    <div class="time">
      {{ item.updated_at || '-' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeskFolder',
  components: {},
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getFiles() {
      this.$store.commit('desk/UPDATE_FOLDER_ID', this.item.id)
    },
    updateFolder() {
      if (this.item.id <= 0) {
        $toast.info('不能修改默认文件夹')
        return
      }
      $prompt('请输入文件夹名称', '重命名文件夹', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (!value) {
            return
          }
          $api.desk
            .updateFolder({
              name: value,
              folder_id: this.item.id
            })
            .then(() => {
              this.$emit('update', {
                name: value
              })
            })
            .catch((err) => {
              $toast.error(err.message)
            })
        })
        .catch(() => {})
    },
    deleteFolder() {
      if (this.item.id <= 0) {
        $toast.info('不能删除默认文件夹')
        return
      }
      $confirm('删除文件夹后里面的文件也会被删除不可恢复，确认吗？', '删除文件夹', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        $api.desk
          .deleteFolder({ folder_id: this.item.id })
          .then(() => {
            $toast.success('删除成功')
            this.$emit('delete')
          })
          .catch((err) => {
            $toast.error(err.message)
          })
      })
    }
  }
}
</script>

<style lang="scss">
.desk-folder {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  border-top: 1px solid #f2f6fd;

  &:hover {
    background: #f4fbff;
    border-color: #cbedff;

    .main .tool {
      display: block;
    }

    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background-color: rgba(#12b7f5, 0.18);
    }
  }

  .main {
    width: 60%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;

    .name {
      span {
        color: #424e67;
        margin-left: 5px;
      }
    }

    .tool {
      display: none;
    }
  }

  .size {
    width: 16%;
  }

  .time {
    width: 24%;
  }

  > * {
    height: 44px;
    line-height: 43px;
    padding: 0 10px;
  }
}
</style>
