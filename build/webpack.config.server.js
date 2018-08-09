const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = webpackMerge(baseConfig, {
    // webpack 打包出的内容使用在哪个执行环境中, default is web
    // Compile for usage in a Node.js-like environment (uses Node.js require to load chunks)
    target: 'node',
    entry: {
        app: path.join(__dirname, '../client/server-entry.js')
    },
    // node modules里所有的包不用打包到js中
    externals: Object.keys(require('../package.json').dependencies),
    output: {
        filename: 'server-entry.js',
        // 最新的模块加载方案
        // The return value of your entry point will be assigned to the module.exports
        libraryTarget: 'commonjs2'
    },
    plugins: [
      new webpack.DefinePlugin({
        // Use a different service URL in production/development builds
        // ?
        'process.env.API_BASE': '"http://127.0.0.1:3000"'
      })
    ]
})
