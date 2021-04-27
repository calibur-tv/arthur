module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  plugins: ['prettier'],
  rules: {},
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
    $manager: true
  }
}
