const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

let clientConfig = merge(baseConfig, {
  entry: './src/entry-client.js',
  optimization: {
    splitChunks: {
      minChunks: Infinity,
      name: 'manifest'
    }
  },
  output: {
    publicPath: '/dist/', //TODO: should go back to the renderer server origin
  },
  plugins: [
    // This plugins generates `vue-ssr-client-manifest.json` in the
    // output directory.
    new VueSSRClientPlugin(),
  ],
})

if (process.env.NODE_ENV === 'development') {
  clientConfig = merge(clientConfig, {
    output: {
      publicPath: 'http://localhost:8082/dist/',
    },
    devtool: 'source-map',
    devServer: {
      writeToDisk: true,
      contentBase: resolve(__dirname, 'dist'),
      publicPath: 'http://localhost:8082/dist/',
      hot: true,
      // inline: true,
      // historyApiFallback: true,
      port: 8082,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}

module.exports = clientConfig
