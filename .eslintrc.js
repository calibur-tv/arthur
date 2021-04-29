module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', '@vue/prettier'],
  plugins: ['prettier'],
  rules: {
    'vue/no-deprecated-v-on-native-modifier': 'off',
    'vue/no-deprecated-slot-attribute': 'off'
  },
  globals: {
    $api: true,
    $bus: true,
    $http: true,
    $store: true,
    $cookie: true,
    $toast: true,
    $prompt: true,
    $alert: true,
    $confirm: true,
    $cache: true,
    $manager: true,
    workbox: true
  }
}
