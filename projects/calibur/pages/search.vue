<template>
  <div id="page-search">
    <div class="v-layout">
      <el-input v-model="keyword" placeholder="请输入内容" @keyup.enter.native="submit">
        <i slot="prefix" class="el-input__icon el-icon-search" />
      </el-input>
      <v-switcher :headers="tabs" routable>
        <router-link
          v-for="(item, index) in tabs"
          :key="index"
          :slot="`tab-${index}`"
          :to="item.route"
          v-text="item.name"
        ></router-link>
      </v-switcher>
      <list-view func="getSearchList" :query="{ q, type }">
        <template #default="{ list }">
          <component
            :is="`search-${item.type}-item`"
            v-for="item in list"
            :key="item.type + '-' + item.data.slug"
            :item="item.data"
          />
        </template>
      </list-view>
    </div>
  </div>
</template>

<script>
import SearchBangumiItem from '@/components/flow/item/SearchBangumiItem'
import SearchCharacterItem from '@/components/flow/item/SearchCharacterItem'
import SearchUserItem from '@/components/flow/item/SearchUserItem'

export default {
  name: 'PageSearch',
  components: {
    SearchBangumiItem,
    SearchCharacterItem,
    SearchUserItem
  },
  data() {
    return {
      type: this?.$route.query.type || 'all',
      keyword: this?.$route.query.q || '',
      q: this?.$route.query.q || ''
    }
  },
  computed: {
    tabs() {
      return [
        {
          name: '综合',
          route: `/search?type=all&q=${this.q}`
        },
        {
          name: '番剧',
          route: `/search?type=bangumi&q=${this.q}`
        },
        {
          name: '角色',
          route: `/search?type=character&q=${this.q}`
        },
        {
          name: '用户',
          route: `/search?type=user&q=${this.q}`
        }
      ]
    }
  },
  watch: {
    $route: function (val) {
      this.type = val.query.type
      this.q = val.query.q
    }
  },
  methods: {
    submit() {
      const q = this.keyword.trim()
      if (!q) {
        return
      }

      this.$router.push(`/search?type=${this.type}&q=${q}`)
    }
  }
}
</script>

<style lang="scss"></style>
