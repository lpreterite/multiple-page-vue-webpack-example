'use strict'
const path = require('path')

module.exports = {
    //base setting
    entry: './src/clients/**/main.js',
    template: './src/clients/**/template.html',
    projectPath: path.resolve(__dirname, '../'), 
    outputPath: path.resolve(__dirname, '../dist'),
    devServerPort: 6002,
    //bundle setting
    publicPath: './',
    assetsDirectory: 'assets',
    sourceMap: true
}