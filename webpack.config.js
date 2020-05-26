const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * mini-css-extract-plugin has issue for bundling for SSR
 * below solution comes from 
 * https://github.com/webpack-contrib/mini-css-extract-plugin/issues/90#issuecomment-392968392 
 * and https://github.com/SkyBlueFeet/skyui/issues/6 as a confirmation
 */
class ServerMiniCssExtractPlugin extends MiniCssExtractPlugin {
  getCssChunkObject(mainChunk) {
    return {};
  }
}

const isProduction = process.env.NODE_ENV === 'production'

const conditionalPlugins = isProduction ? [
  new ServerMiniCssExtractPlugin({
    filename: 'style.css'
  })
] : []

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // enable CSS extraction
          extractCSS: isProduction
        }
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
          isProduction ? ServerMiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    ...conditionalPlugins
  ],
}
