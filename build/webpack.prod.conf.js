'use strict'

const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('./config')
const utils = require('./utils')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const baseWebpackConfig = require('./webpack.base.conf')
const chunks = Object.keys(utils.getEntry(config.entry))

let webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.sourceMap, extract: true })
  },
  output: {
    path: config.outputPath,
    filename: utils.assetsPath('js/[name].[chunkhash:5].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash:5].js')
  },
  devtool: config.sourceMap ? '#source-map' : false,
  plugins: [],
  vue: {
    loaders: utils.cssLoaders({ sourceMap: config.sourceMap, extract: true })
  },
})

webpackConfig.plugins = [].concat(webpackConfig.plugins, utils.htmlLoaders(config.template, webpackConfig.entry), [
    new webpack.DefinePlugin({
      'process.env': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash:5].css')),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // TODO: set node_modules fallback
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ])

module.exports = webpackConfig