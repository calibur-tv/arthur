const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

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
    publicPath: conf.entry ? '/' : `//web.calibur.tv/${conf.name}/`,
    devServer: {
      port: conf.port || 3000,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    configureWebpack: {
      externals:
        isDev && conf.entry
          ? {}
          : {
              vue: 'Vue'
            },
      output: conf.entry
        ? {}
        : {
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
