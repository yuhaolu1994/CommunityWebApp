const path = require('path')

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    // /public/app.hash.js 放在引用静态资源前面区分是否是静态资源
    publicPath: '/public/'
  },
  resolve: {
    // 声明不需要写后缀名的module
    // enables users to leave off the extension when importing
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        // Specifies the category of the loader
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /\.jsx$/,
        // babel默认支持ES6，不支持JSX，需要配置.babelrc
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  },
}
