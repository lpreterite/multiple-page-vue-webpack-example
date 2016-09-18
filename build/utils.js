'use strict'

const path = require('path')
const glob = require('glob')
const config = require('./config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.assetsPath = function (_path) {
  return path.posix.join(config.assetsDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    if (options.extract) {
      return ExtractTextPlugin.extract({
        loader: sourceLoader,
        fallbackLoader:'vue-style-loader'
      })
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css?autoprefixer', 'sass?indentedSyntax']),
    scss: generateLoaders(['css?autoprefixer', 'sass?outputStyle=expanded']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}

exports.getEntry = function (globPath) {
  var files = glob.sync(globPath),
      pathDir = globPath.replace(/\*\*.*$/,'');
  var entries = {},
      entry, dirname, basename, pathname, extname;

  for (var i = 0; i < files.length; i++) {
      entry = files[i];
      dirname = path.dirname(entry);
      extname = path.extname(entry);
      basename = path.basename(entry, extname);
      pathname = path.normalize(path.join(dirname,  basename));
      pathDir = path.normalize(pathDir);
      if(pathname.startsWith(pathDir)){
          dirname = path.normalize(dirname).substring(pathDir.length)
      }
      dirname = dirname.replace(/[\\,\/]/, '\/');
      entries[dirname] = [entry];
  }
  return entries;
}

exports.htmlLoaders = function(template, webpackEntry){
  // https://github.com/ampedandwired/html-webpack-plugin
  let pages = exports.getEntry(template),
      plugins = [],
      pathDir = path.normalize(template.replace(/\*\*.*$/,''));

  Object.keys(pages).forEach(function(pathname) {
    let filename = path.normalize(path.dirname(pages[pathname][0])).substring(pathDir.length)
    let conf = {
      filename: filename+'.html', //生成的html存放路径，相对于path
      template: pages[pathname][0], //html模板路径
      inject: false, //js插入的位置，true/'head'/'body'/false
    };
    if (pathname in webpackEntry) {
      conf.inject = 'body';
      conf.chunks = ['manifest','vendor', pathname];
      conf.hash = true;
      conf.chunksSortMode='dependency';
    }
    plugins.push(new HtmlWebpackPlugin(conf));
  });

  return plugins;
}