<template>
  <div class="desk-folder">
    <div class="main">
      <div class="name">
        <folder-icon />
        <span v-html="item.name" class="fade-link" @click="getFiles" />
      </div>
      <div v-if="item.id" class="tool">
        <i class="el-icon-more" />
        <div class="popover">
          <button @click="updateFolder">重命名</button>
          <button @click="deleteFolder">删除</button>
        </div>
      </div>
    </div>
    <div class="size">-</div>
    <div class="time">
      {{ item.updated_at ? formatTime(item.updated_at, 'ymdhm') : '-' }}
    </div>
  </div>
</template>

<script>
import { deskApi } from '@calibur/api'
import { formatTime } from '@calibur/utils'
import FolderIcon from './icons/folder.vue'

export default {
  name: 'DeskFolder',
  components: {
    FolderIcon
  },
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
    formatTime,
    getFiles() {
      this.$store.commit('UPDATE_FOLDER_ID', this.item.id)
    },
    updateFolder() {
      if (this.item.id <= 0) {
        this.$toast.info('不能修改默认文件夹')
        return
      }
      this.$prompt('请输入文件夹名称', '重命名文件夹', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (!value) {
            return
          }
          deskApi
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
              this.$toast.error(err.message)
            })
        })
        .catch(() => {})
    },
    deleteFolder() {
      if (this.item.id <= 0) {
        this.$toast.info('不能删除默认文件夹')
        return
      }
      this.$confirm('删除文件夹后里面的文件也会被删除不可恢复，确认吗？', '删除文件夹', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        deskApi
          .deleteFolder({ folder_id: this.item.id })
          .then(() => {
            this.$toast.success('删除成功')
            this.$emit('delete')
          })
          .catch((err) => {
            this.$toast.error(err.message)
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
      svg {
        color: $color-main;
      }

      span {
        color: #424e67;
        margin-left: 5px;
      }
    }

    .tool {
      position: relative;
      display: none;

      .el-icon-more {
        display: block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;

        &:hover + .popover {
          display: flex;
        }
      }

      .popover {
        display: none;
        position: absolute;
        left: 50%;
        top: 80%;
        width: 86px;
        border: 1px solid rgba($color-main, 0.2);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        transform: translate(-50%, 0);
        background-color: #fff;
        z-index: 10;

        &:hover {
          display: flex;
        }

        button {
          height: 27px;
          line-height: 27px;
          color: $color-main;
          font-size: 12px;
          width: 100%;

          &:hover {
            background: #f6faff;
            border-radius: 2px;
          }
        }
      }
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
