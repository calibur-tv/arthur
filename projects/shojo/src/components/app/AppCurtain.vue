<template>
  <div v-if="canRender" :style="wrapStyle" @click="handleClick" :class="{ 'curtain--moving': drag }" class="curtain">
    <div class="curtain__header">
      <div class="curtain__header__drag" :data-id="id" />
    </div>
    <div class="curtain__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VCurtain',
  props: {
    id: {
      required: true,
      type: String
    },
    position: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      canRender: false,
      moving: false,
      drag: false,
      rect: {
        top: 0,
        left: 0,
        zIndex: 0
      },
      startX: 0,
      startY: 0,
      startLeft: 0,
      startTop: 0
    }
  },
  computed: {
    wrapStyle() {
      const { rect } = this
      return {
        transform: `translate3d(${rect.left}px, ${rect.top}px, 0)`,
        zIndex: rect.zIndex
      }
    }
  },
  mounted() {
    this.canRender = true
    this.$nextTick(() => {
      this.initManager()
    })
  },
  beforeUnmount() {
    $manager.unbindComponent(this.id)
  },
  methods: {
    initManager() {
      if (!$manager.componentIsUnique(this.id)) {
        // eslint-disable-next-line
        console.error(`curtain 组件的 id 必须是独一无二的，id：${this.id}已被注册`)
        return
      }
      const rect = this.$el.getBoundingClientRect()
      $manager.bindComponent(this.id, this)
      this.rect = $manager.getRect(
        this.id,
        this.position
          ? {
              ...this.position,
              width: rect.width,
              height: rect.height
            }
          : null
      )
    },
    handleStart(evt) {
      this.moving = true
      this.startX = evt.clientX
      this.startY = evt.clientY
      this.startLeft = this.rect.left
      this.startTop = this.rect.top
      this.updateIndex()
    },
    handleMove(evt) {
      if (!this.moving) {
        return
      }
      this.drag = true
      this.rect.left = this.startLeft + evt.clientX - this.startX
      this.rect.top = this.startTop + evt.clientY - this.startY
    },
    handleEnd() {
      this.drag = false
      this.moving = false
      const rect = this.$el.getBoundingClientRect()
      $manager.setRect(this.id, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        zIndex: this.rect.zIndex
      })
    },
    handleClick() {
      this.updateIndex()
    },
    updateIndex() {
      this.rect.zIndex = $manager.setMaxIndex(this.id)
    }
  }
}
</script>

<style lang="scss">
$curtain-border-color: #797d80;

.curtain {
  position: absolute;
  left: 0;
  top: 0;
  filter: drop-shadow(0px 5px 5px rgba(2, 8, 20, 0.1));

  &__header {
    position: relative;
    height: 15px;
    background-color: #f1f3f4;
    opacity: 0.9;
    border-radius: 0 8px 0 0;

    &__drag {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 160px;
      height: 40px;
      background-color: #f1f3f4;
      border-radius: 20px 20px 0 0;
    }
  }

  &__body {
    user-select: auto;
    background-color: #fff;
    padding: 1px;
    border-radius: 0 0 8px 8px;
  }

  &--moving {
    .curtain {
      &__header {
        cursor: move;
      }

      &__body {
        user-select: none;
      }
    }
  }
}
</style>
