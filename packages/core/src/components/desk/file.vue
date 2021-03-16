<template>
  <div class="desk-file">
    <div class="main">
      <div class="name">
        <component :is="item.meta.mimeType.split('/').shift() + '-icon'" />
        <span v-html="item.name || item.meta.filename.split('/').pop()" class="fade-link" @click="handleClick" />
      </div>
      <div v-if="item.id" class="tool">
        <i class="el-icon-more" />
        <div class="popover">
          <button @click="renameFile">重命名</button>
          <button @click="deleteFile">删除</button>
        </div>
      </div>
    </div>
    <div class="size" v-text="fileSize" />
    <div class="time">
      {{ item.updated_at ? $utils.formatTime(item.updated_at, 'ymdhm') : '-' }}
    </div>
  </div>
</template>

<script>
import filesize from 'filesize'
import TxtIcon from './icons/txt.vue'
import ImageIcon from './icons/image.vue'
import AudioIcon from './icons/audio.vue'
import VideoIcon from './icons/video.vue'
import PreviewImage from './preview/image.vue'
import binder from '@/assets/js/test'

export default {
  name: 'DeskFile',
  components: {
    TxtIcon,
    ImageIcon,
    AudioIcon,
    VideoIcon
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    folderId() {
      return this.$store.state.desk.folderId
    },
    fileSize() {
      return filesize(this.item.meta.size)
    }
  },
  methods: {
    deleteFile() {
      $confirm('删除后不可恢复，确认吗？', '删除文件', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        $api.desk
          .deleteFile({ file_id: this.item.id })
          .then(() => {
            $toast.success('删除成功')
            this.$emit('delete')
          })
          .catch((err) => {
            $toast.error(err.message)
          })
      })
    },
    renameFile() {
      $prompt('请输入文件名称', '重命名文件', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (!value) {
            return
          }
          if (value.length > 255) {
            $toast.error('文件名不能超过255个字符')
            return
          }
          $api.desk
            .moveFile({
              name: value,
              file_id: this.item.id,
              folder_id: this.folderId
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
    handleClick() {
      binder.open({
        component: PreviewImage,
        props: {
          id: 'fuck',
          position: {
            left: 100,
            top: 100
          }
        }
      })
      $bus.emit('DESK_OPEN_FILE', this.item)
    }
  }
}
</script>

<style lang="scss">
.desk-file {
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
      @extend %oneline;

      span {
        color: #424e67;
        margin-left: 5px;
        @extend %breakWord;
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
