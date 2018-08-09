const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const HTMLPlugin = require('html-webpack-plugin')

// node.js, The process.env property returns an object containing the user environment
// 在package.json的script中配置
const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
  entry: {
    // 使用绝对路径避免系统差异
    // entry: {[entryChunkName: string]: string|Array<string>}
    // app is entryChunkName
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    // []代表变量，这里name代表app，hash有任何文件改动刷新浏览器缓存
    // 服务端不需要加，服务端没有浏览器缓存的概念
    // The module name; The hash of the module identifier
    filename: '[name].[hash].js',
  },
  plugins: [
    new HTMLPlugin({
      // dist中产生template为模版的html
      template: path.join(__dirname, '../client/template.html')
      // 这里没加filename, The file to write the HTML to. Defaults to index.html
    }),
    new HTMLPlugin({
      // EJS loader for webpack. Uses ejs function to compile templates.
      template: '!!ejs-compiled-loader!' + path.join(__dirname, '../client/server.template.ejs'),
      filename: 'server.ejs'
    })
  ]
})

if (isDev) {
  // 调试jsx源代码
  // These values can affect build and rebuild speed dramatically
  config.devtool = '#cheap-module-eval-source-map'

  // react-hot-loader 官方做法
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }

  config.devServer = {
    // 写成localhost不能在局域网中开发
    host: '0.0.0.0',
    port: '8888',
    // Tell the server where to serve content from.
    // This is only necessary if you want to serve static files.
    // contentBase: path.join(__dirname, '../dist'),
    hot: true,

    // 配置中有错误弹窗
    overlay: {
      errors: true
    },

    // 通过/public才能访问生成的静态文件
    publicPath: '/public',

    // 所有404请求都返回html
    historyApiFallback: {
      index: '/public/index.html'
    },
    // /api的所有请求都代理到服务端的地址
    proxy: {
      '/api': 'http://localhost:3333'
    }
  }

  // It allows all kinds of modules to be updated at runtime without the need for a full refresh
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
