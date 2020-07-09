const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  publicPath: './',
  // assetsDir: './assets',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL,
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    port: 8080,
    sockHost: process.env.VUE_APP_SOCKHOST,
    disableHostCheck: true
  },
  configureWebpack: config => {
    config.entry.app = ['babel-polyfill', './src/main.js']
    if (process.env.NODE_ENV === 'production') {
      config.mode = 'production'
      return {
        plugins: [new CompressionPlugin({
          test: /\.js$|\.html$|\.css/,
          threshold: 10240,
          deleteOriginalAssets: false
        })]
      }
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    // if (process.env.NODE_ENV === 'production') {
    //   if (process.env.npm_config_report) {
    //     config
    //       .plugin('webpack-bundle-analyzer')
    //       .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    //       .end()
    //     config.plugins.delete('prefetch')
    //   }
    // }
  }
}
