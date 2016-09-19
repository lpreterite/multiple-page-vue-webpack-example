'use strict'
const path = require('path')
const config = require('./config')
const utils = require('./utils')

const postcss = {
    plugins: [
        require('autoprefixer')(),
        require('precss'),
        // 因为postcss-sprites必须以文件目录为单位处理，不够灵活。
        // postcss-easysprites却弥补灵活性缺陷，只需在图片后面添加指定输出组即可（*.png#group）
        require('postcss-easysprites')({
            imagePath:'../dist/assets/img', 
            spritePath: '../dist/assets/img/sprites'
        })
    ]
    // syntax: require('postcss-scss')
}

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
            //png文件将会使用图片合成技术处理必须使用file-loader
            test: /\.(png)(\?.*)?$/,
            loader: 'file',
            query: {
                limit: 8192,
                name: utils.assetsPath('img/[name].[hash:5].[ext]')
            }
        }, {
            test: /\.(jpe?g|gif|svg)(\?.*)?$/,
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