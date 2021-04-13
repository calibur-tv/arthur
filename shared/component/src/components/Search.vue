<template>
  <form class="calibur-search" action="#" method="get" @submit.prevent="submit">
    <div class="search-input">
      <button type="button" class="search-input-btn" @click="submit">
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
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleKeydown"
          @input="handleInput"
        />
      </div>
    </div>
    <ul v-show="displayList" class="search-list">
      <li
        v-for="(item, index) in list"
        :key="item.slug"
        :class="{ 'is-active': index === selectedIndex }"
        @click="handleClick(item)"
      >
        <span v-text="item.text" />
        <svg
          v-if="historyMode"
          width="16"
          height="16"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="handleDelete(index)"
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
import http from '@calibur/http'
import lscache from 'lscache'

const HISTORY_KEY = 'search-history-v2'
const SUGGEST_KEY = 'search-suggest-v1'

export default {
  name: 'CaliburSearch',
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      word: '',
      type: 'all',
      state: 'blur',
      historyMode: true,
      filterSuggest: [],
      selectedIndex: -1,
      suggest: [],
      history: []
    }
  },
  computed: {
    list() {
      return this.historyMode ? this.history : this.filterSuggest
    },
    displayList() {
      return this.state === 'focus' && this.list.length
    }
  },
  mounted() {
    this.$watch('selectedIndex', (val) => {
      if (val === -1) {
        return
      }
      this.word = this.list[val].text
    })

    this.initHistory()
    this.initSuggest()
  },
  methods: {
    initHistory() {
      this.history = lscache.get(HISTORY_KEY) || []
    },
    initSuggest() {
      this.suggest = lscache.get(SUGGEST_KEY) || []
      if (this.suggest.length) {
        return
      }
      http.get('bangumi/all').then((res) => {
        lscache.set(SUGGEST_KEY, res.result, 86400)
        this.suggest = res.result
      })
    },
    handleInput(evt) {
      const { value } = evt.target
      this.selectedIndex = -1
      this.historyMode = !value
      if (!value) {
        this.filterSuggest = []
        return
      }
      this.filterSuggest = this.suggest.filter((option) => {
        return option.alias.toLowerCase().includes(value.toLowerCase())
      })
    },
    handleKeydown(evt) {
      if (evt.keyCode === 38) {
        if (this.selectedIndex <= 0) {
          return
        }

        evt.preventDefault()
        this.selectedIndex--
      }

      if (evt.keyCode === 40) {
        if (this.selectedIndex >= this.list.length - 1) {
          return
        }

        evt.preventDefault()
        this.selectedIndex++
      }
    },
    handleDelete(index) {
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
    handleClick(item) {
      this.word = item.text
      this.submit()
    },
    handleFocus() {
      this.state = 'focus'
    },
    handleBlur() {
      this.state = 'blur'
      this.selectedIndex = -1
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
          slug: Date.now(),
          type: 'all',
          text: this.word
        })

        lscache.set(HISTORY_KEY, this.history)
      }, 20)
    }
  }
}
</script>

<style lang="scss">
.calibur-search {
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

  .search-list {
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

    &:hover {
      display: block !important;
    }

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
