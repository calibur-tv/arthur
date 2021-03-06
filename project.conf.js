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
  const name = conf.name.split('/').pop()

  return {
    publicPath: isBuild ? `//www.calibur.tv/mfe/${name}/` : `//localhost:${conf.port}/`,
    devServer: {
      port: conf.port || 3000,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    configureWebpack: {
      output: {
        // 把子应用打包成 umd 库格式
        library: `${name}-[name]`,
        libraryTarget: 'umd',
        jsonpFunction: `webpackJsonp_${name}`
      }
    },
    chainWebpack: (config) => {
      const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
      types.forEach((type) => addStyleResource(config.module.rule('scss').oneOf(type)))

      config.module
        .rule('fonts')
        .use('url-loader')
        .tap((options) => {
          if (!isBuild) {
            return options
          }

          options.fallback.options.publicPath = `//www.calibur.tv/mfe/${name}/`
          return options
        })
    }
  }
}
