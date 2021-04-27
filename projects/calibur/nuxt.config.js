const isDev = process.env.NODE_ENV === 'development'

export default {
  ssr: false,
  modern: isDev ? false : 'client',
  target: isDev ? '' : 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'calibur | 天下漫友是一家',
    meta: [
      { name: 'renderer', content: 'webkit|ie-comp|ie-stand' },
      { name: 'force-rendering', content: 'webkit' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['normalize.css', '@/assets/css/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/element-ui'],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/style-resources'],

  styleResources: {
    scss: ['../../shared/css/var.scss', '../../shared/css/mixin.scss']
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: false,
    meta: {
      name: '',
      author: '',
      description: '',
      lang: 'zh-cmn-Hans',
      ogSiteName: false,
      ogTitle: false,
      ogDescription: false,
      ogImage: false,
      ogUrl: false,
      ogType: '',
      mobileApp: false,
      mobileAppIOS: false,
      favicon: false,
      charset: 'utf-8',
      viewport:
        'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover'
    },
    manifest: {
      name: '',
      short_name: '',
      description: ''
    },
    workbox: {
      workboxURL: 'https://www.calibur.tv/workbox-514/workbox-sw.js',
      offline: false
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    corejs: 3,
    extractCSS: true,
    publicPath: isDev ? '/_nuxt/' : 'https://fs.calibur.tv/'
  }
}
