const path = require('path')

const isBuild = process.env.RUN_TYPE === 'build'

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './shared/css/var.scss'), path.resolve(__dirname, './shared/css/mixin.scss')]
    })
}

module.exports = (conf) => {
  return {
    publicPath: isBuild ? `//web.calibur.tv/${conf.name.split('/').pop()}/` : '/',
    devServer: {
      port: conf.port || 3000,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    configureWebpack: {
      output: {
        // 把子应用打包成 umd 库格式
        library: `${conf.name}-[name]`,
        libraryTarget: 'umd',
        jsonpFunction: `webpackJsonp_${conf.name}`
      }
    },
    chainWebpack: (config) => {
      const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
      types.forEach((type) => addStyleResource(config.module.rule('scss').oneOf(type)))
    }
  }
}
