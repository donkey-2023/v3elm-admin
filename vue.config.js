const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 8090,
    open: true,
    https: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  configureWebpack: (config) => {
    Object.assign(config.resolve, {
      // 在当前目录查找
      modules: [path.resolve('node_modules')],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@comp': path.resolve(__dirname, 'src/components'),
        '@views': path.resolve(__dirname, 'src/views')
      },
      mainFields: ['style', 'main'], // 先用bootstrap中在package中的style,没有在用main
      extensions: ['.js', '.css', '.json'] // 当没有拓展名的时候，先默认js、次之css、再次之json
    })

    config.plugins.push(
      AutoImport({
        resolvers: [ElementPlusResolver()]
      })
    )
    config.plugins.push(
      Components({
        resolvers: [ElementPlusResolver()]
      })
    )
  }
})
