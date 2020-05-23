const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   index: './src/server.js',
  //   compress: true,
  //   port: 9000
  // },
  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    // new HtmlWebpackPlugin({
    //   template: './public/index.html'
    // }),
  ]
}

