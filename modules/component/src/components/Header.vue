<template>
  <nav id="calibur-header">
    <div class="mask-shim" />
    <div class="text-wrap">
      <ul v-if="left" class="header-left">
        <li>
          <a href="/">
            <Logo color="#fff" shadow width="140" />
          </a>
        </li>
      </ul>
      <ul class="header-right">
        <template v-if="userInfo">
          <li class="user-panel">
            <Popover class-name="user-popover">
              <template #trigger>
                <a href="/" class="avatar">
                  <img :src="resize(userInfo.avatar, { width: 72 })" alt="" />
                </a>
              </template>
              <template #content>
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
              </template>
            </Popover>
          </li>
        </template>
        <template v-else>
          <li>
            <button class="login-btn" @click="handleSignIn">登录</button>
          </li>
        </template>
        <li>
          <a class="nav-link desk-center" href="/desk">我的网盘</a>
        </li>
        <li>
          <button class="create-btn">投稿</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import user from '@calibur/user'
import utils from '@calibur/utils'
import Popover from './Popover.vue'
import Logo from './Logo.vue'

export default {
  name: 'CaliburHeader',
  components: {
    Logo,
    Popover
  },
  props: {
    left: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userInfo: null
    }
  },
  computed: {
    resize() {
      return utils.resize
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
      user.login()
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
#calibur-header {
  position: relative;
  width: 100%;
  height: 100%;
  font: 14px -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, sans-serif;
  -webkit-font-smoothing: antialiased;
  z-index: 99;

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
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

  button {
    border: none;
    outline-width: 0;
    cursor: pointer;
  }

  .mask-shim {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 1;
    overflow: hidden;
    background-color: transparent;
  }

  .text-wrap {
    position: relative;
    padding: 5px 12px;
    z-index: 2;
    height: 100%;

    &:after {
      content: '';
      clear: both;
      display: table;
    }

    &:before {
      content: '';
      clear: both;
      display: table;
    }
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
    height: 100%;
    backdrop-filter: blur(20px);
    border-radius: 100px;
    padding: 7px;

    $item-height: 36px;

    .login-btn {
      display: block;
      width: $item-height;
      height: $item-height;
      border-radius: 50%;
      background-color: #fff;
      color: rgb(0, 161, 214);
      margin-right: 16px;
      font-weight: 600;
    }

    .nav-link {
      color: #fff;
      text-shadow: 0 2px 10px rgb(0 0 0 / 55%);
    }

    .desk-center {
      margin-left: 12px;
    }

    .user-panel {
      position: relative;
      height: 100%;
      margin-right: 10px;

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
        border-radius: 50%;
        width: 36px;
        height: 36px;
        z-index: 1;
        overflow: hidden;
        background-color: #fff;

        img {
          display: block;
          width: 100%;
          height: 100%;
          image-rendering: -webkit-optimize-contrast;
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
      position: relative;
      color: #fff;
      font-size: 14px;
      display: block;
      width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: rgb(0, 161, 214);
      border-radius: 40px;
      margin-left: 14px;
    }
  }
}
</style>
