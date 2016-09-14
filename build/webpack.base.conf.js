'use strict'
const path = require('path')
const config = require('./config')
const utils = require('./utils')

const postcss = [
    require('autoprefixer')(),
    require('precss')
]

let webpackConfig = {
    entry: utils.getEntry(config.entry),
    resolve: {
        extensions: ['', '.js', '.vue', '.css', '.json'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'root': path.join(__dirname, '../src/imports'),
            'components': path.join(__dirname, '../src/imports/components')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            include: config.projectPath,
            exclude: /node_modules/,
            plugins: ['transform-runtime'],
            query: {
                presets: ['es2015','stage-2']
            }
        },{
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.html$/,
            loader: 'vue-html?minimize=false'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 8192,
                name: utils.assetsPath('img/[name].[hash:5].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:5].[ext]')
            }
        }]
    },
    postcss,
    browserlist: ['last 2 versions', 'ie > 8'],
    vue: {
        loaders: utils.cssLoaders(),
        postcss
    }
}

module.exports = webpackConfig;