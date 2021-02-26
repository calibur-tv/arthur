module.exports = {
  root: true,
  env: {
    node: true
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
    $store: true,
    $cookie: true
  }
}
