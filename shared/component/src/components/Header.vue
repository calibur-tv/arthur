<template>
  <nav id="calibur-header" :class="{ 'with-bg': hasBg }">
    <div v-if="hasBg" class="mask-wrap">
      <div class="mask-bg" :style="{ backgroundImage: `url(${background})` }" />
    </div>
    <div class="mask-shim" />
    <div class="text-wrap">
      <ul class="header-left">
        <li>
          <a class="nav-link home-link" href="/">
            <Logo color="#12b7f5" width="70" />
            <span>首页</span>
          </a>
        </li>
        <li>
          <a class="nav-link" href="/about">
            <span>关于</span>
          </a>
        </li>
      </ul>
      <ul class="header-right">
        <template v-if="userInfo">
          <li class="user-panel">
            <ElPopover trigger="hover" popper-class="user-popover">
              <template #reference>
                <a href="/" class="avatar">
                  <img :src="userInfo.avatar" alt="" />
                </a>
              </template>
              <p class="nickname oneline" v-html="userInfo.nickname" />
              <a href="/">
                <div class="field">
                  <div class="label">
                    <i class="iconfont ic-setup_fill" />
                    <span>设置</span>
                  </div>
                </div>
              </a>
              <button class="sign-out" @click="handleLogout">退出</button>
            </ElPopover>
          </li>
        </template>
        <template v-else>
          <li>
            <button class="nav-link" @click="handleSignIn">登录</button>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { ElPopover } from 'element-plus'
import user from '@calibur/user'
// import utils from '@calibur/utils'
import Logo from './Logo.vue'

export default {
  name: 'CaliburHeader',
  components: {
    Logo,
    ElPopover
  },
  props: {
    background: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      userInfo: null
    }
  },
  computed: {
    hasBg() {
      return !!this.background
    }
  },
  mounted() {
    user.get().then((user) => {
      this.userInfo = user
    })
    user.watch((user) => {
      this.userInfo = user
    })
  },
  methods: {
    handleSignIn() {
      $bus.emit('sign-in')
    },
    handleLogout() {
      user.logout().then(() => {
        window.location = '/'
      })
    }
  }
}
</script>

<style lang="scss">
$header-link-padding: 7px;
$app-header-hgt: 56px;
$app-banner-hgt: 170px;
$app-padding-h: 10px;

#calibur-header {
  position: relative;
  width: 100%;
  height: $app-header-hgt;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
  font: 14px -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, sans-serif;
  z-index: 99;

  * {
    box-sizing: border-box;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    float: left;
  }

  a {
    text-decoration: none;
  }

  .mask-wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;

    .mask-bg {
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      height: $app-banner-hgt;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      @include filter-blur();
    }
  }

  .mask-shim {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    height: $app-header-hgt;
    z-index: 1;
    overflow: hidden;
    background-color: #fff;
  }

  .text-wrap {
    position: relative;
    padding: $app-padding-h 24px;
    z-index: 2;

    .iconfont {
      color: $color-main;
      display: block;
      float: left;
      margin-right: 3px;
    }
  }

  .nav-link {
    display: block;
    padding: 0 $header-link-padding;
    height: $app-header-hgt - $app-padding-h * 2;
    line-height: $app-header-hgt - $app-padding-h * 2;
    color: #222;
    white-space: nowrap;
  }

  .header-left {
    float: left;

    .home-link {
      margin-left: -10px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }

  .header-right {
    float: right;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: $app-header-hgt - $app-padding-h * 2;

    .user-panel {
      position: relative;
      height: $app-header-hgt;
      padding: 4px 7px 0;

      &:hover {
        background-color: transparent;

        .avatar {
          transform: scale(2) translateY(10px);
        }
      }

      .avatar {
        display: block;
        position: relative;
        transition: 0.3s;
        z-index: 1;

        img {
          display: block;
          border: 1px solid #fff;
          width: 33px;
          height: 33px;
          border-radius: 50%;
        }
      }

      .user-popover {
        width: 260px;
        height: 328px;
        padding: 25px 12px 12px;

        .nickname {
          margin: 10px 0;
          text-align: center;
          font-size: 16px;
          color: #666;
        }

        .field {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 5px;
          margin-left: -5px;
          margin-right: -5px;
          border-radius: 5px;

          &:hover {
            background-color: #f4f5f7;
          }

          .label {
            margin-left: 5px;
            cursor: default;
            color: $color-text-2;

            .iconfont {
              font-size: 16px;
              color: $color-icon-2;
            }
          }
        }

        .sign-out {
          display: block;
          width: 100%;
          height: 30px;
          line-height: 30px;
          background-color: #f4f5f7;
          text-align: center;
          font-size: 12px;
          border-radius: 5px;
          margin-top: 10px;

          &:hover {
            color: $color-main;
          }
        }
      }
    }

    .create-btn {
      display: block;
      width: 68px;
      height: 46px;
      line-height: 46px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      background-color: #f45a8d;
      border-radius: 0 0 6px 6px;
      padding-bottom: 2px;
      margin-left: 5px;

      &:hover {
        background-color: #fb7299;
      }
    }
  }

  &.with-bg {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;

    .mask-shim {
      background-color: hsla(0, 0%, 100%, 0.4);
    }

    .text-wrap {
      .nav-link:hover {
        background-color: hsla(0, 0%, 100%, 0.3);
      }
    }
  }
}
</style>
