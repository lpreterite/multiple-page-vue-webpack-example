'use strict'
const path = require('path')

module.exports = {
    //base setting
    entry: './src/clients/**/*.js',
    template: './src/templates/**/*.html',
    projectPath: path.resolve(__dirname, '../'), 
    outputPath: path.resolve(__dirname, '../dist'),
    devServerPort: 6002,
    //bundle setting
    publicPath: './',
    assetsDirectory: 'assets',
    sourceMap: true
}