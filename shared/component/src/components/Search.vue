<template>
  <form :class="`search-${state}`" action="#" method="get" class="search-box" @submit.prevent="submit">
    <div class="search-input">
      <button type="submit" class="search-input-btn">
        <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" fill="white" fill-opacity="0.01" />
          <path
            d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z"
            fill="none"
            stroke="#333"
            stroke-width="4"
            stroke-linejoin="round"
          />
          <path
            d="M33.2218 33.2218L41.7071 41.7071"
            stroke="#333"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div class="search-input-text">
        <input
          v-model.trim="word"
          :placeholder="placeholder"
          :autofocus="autofocus"
          type="text"
          name="q"
          aria-autocomplete="both"
          aria-haspopup="false"
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          role="combobox"
          spellcheck="false"
          maxlength="50"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
          @keydown="handleKeydown"
        />
      </div>
    </div>
    <ul v-if="displayHistory" class="search-history">
      <li v-for="(item, index) in history" :key="item.id" :class="{ 'is-active': index === selectedIndex }">
        <span v-text="item.text" />
        <svg
          v-if="!word"
          width="16"
          height="16"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="deleteHistory(index)"
        >
          <rect width="48" height="48" fill="white" fill-opacity="0.01" />
          <path d="M14 14L34 34" stroke="#999" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M14 34L34 14" stroke="#999" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </li>
    </ul>
  </form>
</template>

<script>
import lscache from 'lscache'

const HISTORY_KEY = 'test-history'

export default {
  name: 'CaliburSearch',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'all'
    },
    showSuggestion: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      word: this.value,
      state: this.autofocus ? 'focus' : 'blur',
      typing: false,
      filteredSelect: [],
      selectedIndex: -1,
      suggestion: [],
      history: []
    }
  },
  computed: {
    list() {
      return this.word ? this.suggestion : this.history
    },
    displaySuggestion() {
      return (
        this.state === 'focus' &&
        this.showSuggestion &&
        this.word &&
        this.word.length &&
        this.typing &&
        this.filteredSelect.length
      )
    },
    displayHistory() {
      return this.state === 'focus' && !this.displaySuggestion && this.history.length
    }
  },
  mounted() {
    this.$watch('value', (val) => {
      this.word = val
      this.typing = true
      this.selectedIndex = -1
      this.handleEnter(val)
    })

    this.$watch('selectedIndex', (val) => {
      this.word = val >= 0 ? this.list[val].text : ''
    })
    this.initHistory()
  },
  methods: {
    initHistory() {
      this.history = lscache.get(HISTORY_KEY) || []
    },
    handleKeydown(evt) {
      if (evt.keyCode === 38) {
        evt.preventDefault()
        this.switchSelected(-1)
      }

      if (evt.keyCode === 40) {
        evt.preventDefault()
        this.switchSelected(1)
      }
    },
    switchSelected(modify) {
      if (modify === -1 && this.selectedIndex <= 0) {
        return
      }

      if (modify === 1 && this.selectedIndex >= this.list.length - 1) {
        return
      }

      this.selectedIndex += modify
    },
    deleteHistory(index) {
      this.history.splice(index, 1)
      lscache.set(HISTORY_KEY, this.history)

      if (index > this.selectedIndex) {
        return
      }

      if (index === this.selectedIndex) {
        this.selectedIndex = -1
        return
      }

      this.selectedIndex -= 1
    },
    submit() {
      if (!this.word) {
        return
      }

      window.open(`https://fc.calibur.tv/v1/search/mixin?q=${this.word}&type=${this.type}`)

      setTimeout(() => {
        this.history.forEach((item, index) => {
          if (item.text === this.word) {
            this.history.splice(index, 1)
          }
        })

        this.history.unshift({
          id: Date.now(),
          text: this.word
        })

        lscache.set(HISTORY_KEY, this.history)
      }, 20)
    },
    handleEnter(query) {
      if (!query) {
        this.filteredSelect = []
        return
      }
      this.filteredSelect = this.tags.filter((option) => {
        return option.alias.includes(query) || option.name.includes(query)
      })
    },
    handleInputFocus() {
      this.state = 'focus'
    },
    handleInputBlur() {
      this.state = 'blur'
    }
  }
}
</script>

<style lang="scss">
.search-box {
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 14px;

  * {
    box-sizing: border-box;
  }

  .search-input {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(20px);
    background-color: rgba(255, 255, 255, 0.65);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.03), 0 5px 10px rgba(0, 0, 0, 0.02);
    border-radius: 10px;
    overflow: hidden;

    &-btn {
      float: right;
      height: 100%;
      width: 50px;
      border: 0;
      padding: 0;
      outline: 0;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
    }

    &-text {
      display: block;
      overflow: hidden;
      height: 100%;

      input {
        width: 100%;
        height: 100%;
        background-color: transparent;
        outline: none;
        border: none;
        padding: 8px 20px;
        color: #000;
        font-size: 16px;
      }
    }
  }

  .search-history {
    position: absolute;
    left: 0;
    right: 0;
    top: 104%;
    background-color: rgba(255, 255, 255, 0.65);
    border-radius: 10px;
    overflow-x: hidden;
    overflow-y: scroll;
    backdrop-filter: blur(20px);
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.08), 0 8px 18px rgba(0, 0, 0, 0.025);
    padding: 8px;
    margin: 0;
    max-height: 336px;

    li {
      padding: 6px 10px 6px 12px;
      height: 32px;
      line-height: 32px;
      cursor: pointer;
      color: #222;
      text-decoration: none;
      transition: 0.2s ease;
      border-radius: 5px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      &.is-active,
      &:hover {
        background-color: rgba(120, 120, 128, 0.15);
      }

      span {
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      svg {
        flex-shrink: 0;
        margin-left: 10px;
      }
    }
  }
}
</style>
