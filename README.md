# multiple-page-vue-webpack-example

> 一个多页面的webpack构建例子

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

目录结构
```
build/                         #构建配置目录
src/                           #源代码目录
    clients/                   #分页文件
    	[page_name]/           #页面目录，目录名称既是页面名称
    		main.js            #入口文件
    		template.html      #模板文件
    		style.(css|scss)   #页面样式
    		img/               #页面图片
    imports/                   #js代码目录，此为js引入的root目录
    styles/                    #全局样式目录
```

##关于bootstrap的配置

具体配置修改这份文件`.bootstraprc`，详情请查看`bootstrap-loader`官方文档。

使用
```
# element.js
require('bootstrap-loader'); // 在入口文件中引入即可
```

关于bootstrap的处理使用以下库

- [bootstrap-loader](https://github.com/shakacode/bootstrap-loader)
- [bootstrap-scss](https://github.com/twbs/bootstrap-sass)