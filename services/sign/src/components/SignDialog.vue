<template>
  <div v-if="isGuest" id="space3D" :class="[showModal ? 'space-enter' : 'space-leave']" @click="hiddenSign">
    <div ref="wrap" class="sign-modal-wrap">
      <div
        :class="{
          'sign-in-init': !showSignIn && !showSignUp,
          'sign-in-show': showSignIn && !showSignUp,
          'sign-in-turn': !showSignIn && showSignUp
        }"
        class="sign-modal sign-in-modal"
        @click.stop
      >
        <CaliburLogo width="500" color="#00a1d6" />
        <ResetPasswordForm v-show="showReset" @to-login="showReset = false" @to-register="showRegister" />
        <SignInForm v-show="!showReset" @to-reset="showReset = true" @to-register="showRegister" />
      </div>
      <div
        :class="{
          'sign-up-init': !showSignUp && !showSignIn,
          'sign-up-show': showSignUp && !showSignIn,
          'sign-up-turn': !showSignUp && showSignIn
        }"
        class="sign-modal sign-up-modal"
        @click.stop
      >
        <CaliburLogo width="500" color="#00a1d6" />
        <SignUpForm @to-login="showLogin" />
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@calibur/bus'
import user from '@calibur/user'
import { CaliburLogo } from '@calibur/component'
import SignInForm from './SignInForm.vue'
import SignUpForm from './SignUpForm.vue'
import ResetPasswordForm from './ResetPasswordForm.vue'

export default {
  name: 'SignDialog',
  components: {
    CaliburLogo,
    SignUpForm,
    SignInForm,
    ResetPasswordForm
  },
  data() {
    return {
      showModal: false,
      showSignIn: false,
      showSignUp: false,
      showReset: false,
      isGuest: false
    }
  },
  mounted() {
    this.isGuest = !user.isLogin
    bus.on('sign-in', () => {
      this.showLogin()
    })
    bus.on('sign-up', () => {
      this.showRegister()
    })
    if (!window.__POWERED_BY_QIANKUN__) {
      this.showLogin()
    }
  },
  methods: {
    showLogin() {
      this.showReset = false
      this.showModal = true
      this.showSignIn = true
      this.showSignUp = false
    },
    showRegister() {
      this.showModal = true
      this.showSignUp = true
      this.showSignIn = false
    },
    hiddenSign() {
      this.showModal = false
      this.showSignIn = false
      this.showSignUp = false
      this.showReset = false
    }
  }
}
</script>

<style lang="scss">
#space3D {
  position: fixed;
  perspective: 800px;
  perspective-origin: 50% 50%;
  background-color: transparent;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  z-index: 100;

  * {
    box-sizing: border-box;
  }

  &.space-leave {
    visibility: hidden;
  }

  &.space-enter {
    visibility: visible;
  }

  .sign-modal-wrap {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    transform-style: preserve-3d;
    z-index: 12;

    .calibur-logo {
      margin-top: -80px;
      margin-bottom: -40px;
    }

    .sign-modal {
      padding: 50px 45px;
      background-color: #fff;
      border-radius: 4px;
      position: fixed;
      top: 40%;
      left: 50%;
      width: 500px;
      height: 460px;
      margin-left: -250px;
      transition: 0.4s;
      font-size: 14px;
      visibility: hidden;
      opacity: 0;
      display: flex;
      flex-direction: column;
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);

      &.sign-up-show,
      &.sign-in-show {
        visibility: visible;
        opacity: 1;
        transform: rotateY(0deg) translateY(-200px);
      }

      &.sign-up-init,
      &.sign-in-init {
        visibility: hidden;
        opacity: 0;
        transform: rotateY(0deg) translateY(-300px);
      }

      &.sign-in-turn,
      &.sign-up-turn {
        visibility: hidden;
        opacity: 0;
      }

      &.sign-in-turn {
        transform: rotateY(-180deg) translateY(-200px);
      }

      &.sign-up-turn {
        transform: rotateY(180deg) translateY(-200px);
      }
    }
  }
}
</style>
