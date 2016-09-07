'use strict'

const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
// const proxyMiddleware = require('http-proxy-middleware')

const webpackConfig = require('./webpack.dev.conf')
const port = process.env.PORT || config.devServerPort

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/', //path must is root in url
  stats: {
    colors: true,
    chunks: false
  }
})

const hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.publicPath, config.assetsDirectory)
app.use(staticPath, express.static('./'+config.assetsDirectory))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})