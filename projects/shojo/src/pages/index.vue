<template>
  <div id="homepage">
    <AppHeader :background="banner" />
    <AppBanner :background="banner" />
    <div class="v-layout">
      <MenuBar :menu="menu" />
      <div class="ssr-modules">
        <Carousel :list="carousel" />
        <RollRecommended />
      </div>
      <div class="page-modules">
        <a
          v-for="row in pageMenu"
          :id="row.type"
          :key="row.type"
          :class="{ 'anchor-module': row.main }"
          class="v-layout__row"
        >
          <component
            :is="row.left.type"
            :slug="row.left.slug"
            :type="row.type"
            :name="row.left.name"
            class="v-layout__left"
          />
          <component
            :is="row.right.type"
            :slug="row.right.slug"
            :type="row.type"
            :name="row.right.name"
            class="v-layout__right"
          />
        </a>
      </div>
    </div>
    <VerticalNavBar :menu="pageMenu.filter((_) => _.main)" />
    <AboutSite />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/app/AppHeader.vue'
import AppBanner from '@/components/app/AppBanner.vue'
import AppFooter from '@/components/app/AppFooter.vue'
import MenuBar from '@/components-new/MenuBar.vue'
import Carousel from '@/components-new/Carousel.vue'
import AboutSite from '@/components-new/AboutSite.vue'
import VerticalNavBar from '@/components-new/VerticalNavBar.vue'
import RollRecommended from '@/components-new/RollRecommended.vue'
import BangumiSwitcher from '@/components-new/BangumiSwitcher.vue'
import RankSwitcher from '@/components-new/RankSwitcher.vue'
import MainFlowTab from '@/components-new/MainFlowTab.vue'
import RecommendedSwipe from '@/components-new/RecommendedSwipe.vue'
import RankDaily from '@/components-new/RankDaily.vue'
import channel from '@/config/channel'
import BannerImg from '@/assets/img/banner.jpeg'

export default {
  name: 'IndexPage',
  components: {
    AppHeader,
    AppBanner,
    AppFooter,

    MenuBar,
    Carousel,
    AboutSite,
    VerticalNavBar,
    RollRecommended,
    BangumiSwitcher,
    RankSwitcher,
    MainFlowTab,
    RecommendedSwipe,
    RankDaily
  },
  data() {
    return {
      carousel: [],
      menu: []
    }
  },
  computed: {
    pageMenu() {
      return channel
    },
    banner() {
      return BannerImg
    }
  }
}
</script>

<style lang="scss">
#homepage {
  .ssr-modules {
    margin-bottom: 20px;
  }

  .page-modules {
    .v-layout__row {
      display: block;
      cursor: default !important;
      margin-top: 10px;
      padding-top: 20px;
    }
  }
}
</style>
