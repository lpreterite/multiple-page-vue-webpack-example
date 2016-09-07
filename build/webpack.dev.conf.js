'use strict'

const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('./config')
const utils = require('./utils')
const merge = require('webpack-merge')

const baseWebpackConfig = require('./webpack.base.conf')

let webpackConfig = merge(baseWebpackConfig, {
  output: {
    path: config.outputPath,
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[id].chunk.js')
  },
  module: {
    loaders: utils.styleLoaders({ sourceMap: true })
  },
  devtool: 'source-map', //#eval-source-map can't production supported
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"development"'
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
})

webpackConfig.plugins = [].concat(webpackConfig.plugins, utils.htmlLoaders(config.template, webpackConfig.entry))

// add hot-reload related code to entry chunks
Object.keys(webpackConfig.entry).forEach(function (name) {
  webpackConfig.entry[name] = ['./build/dev-client'].concat(webpackConfig.entry[name])
})

console.log(webpackConfig);
module.exports = webpackConfig