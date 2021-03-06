var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunks: ['app']//需要引入的Chunk，不配置就会引入所有页面的资源，对应的是webpack.base.conf.js中entry设置的入口文件
    })
    // new HtmlWebpackPlugin({
    //   filename: 'index2.html',
    //   template: 'index2.html',
    //   inject: true,
    //   chunks: ['app2']//需要引入的Chunk，不配置就会引入所有页面的资源，对应的是webpack.base.conf.js中entry设置的入口文件
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'index3.html',
    //   template: 'index3.html',
    //   inject: true,
    //   chunks: ['app3']//需要引入的Chunk，不配置就会引入所有页面的资源，对应的是webpack.base.conf.js中entry设置的入口文件
    // })
  ]
})
