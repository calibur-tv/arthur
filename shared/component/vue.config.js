const path = require('path')
const webpack = require('webpack')
const npmCfg = require('./package.json')

const banner = [
  npmCfg.name + ' v' + npmCfg.version,
  '(c) ' + new Date().getFullYear() + ' ' + npmCfg.author,
  npmCfg.homepage
].join('\n')

const addStyleResource = (rule) => {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, '../css/var.scss'), path.resolve(__dirname, '../css/mixin.scss')]
    })
}

module.exports = {
  configureWebpack: {
    plugins: [new webpack.BannerPlugin(banner)]
  },
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach((type) => addStyleResource(config.module.rule('scss').oneOf(type)))
  }
}
