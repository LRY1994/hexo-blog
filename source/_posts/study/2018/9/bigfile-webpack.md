---
title: 库文件太大，webpack打包时怎么办
date:   2018/9/3
categories: 
    - 学习
tags:
    - 专题探究
---

针对上篇gojs太大的问题的衍生出大文件打包的问题

### exclude 设置不通过babel-loader编译的目录
写成从node_modules导入的，就不会出现run慢或者报错，还很快。这是为什么?
是因为node_modules里面不会再实时编译了
那有没有方法，webpack可以设置一些不实时编译的文件
```js
{
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
        exclude:[
          resolve("src/components/common/gojs")
        ]
      },
```
exclude可以排除目录 ，不用babel-loader编译

库很大，要么分包 ，或异步加载，或单独引入，否则生成环境打的包会很大

### externals设置不打包的文件
打包的时候不打包这个，然后需要在生产环境页面单独引入这个script
```js
externals:{
    'go':'go'
}
```
```html
<script type="text/javascript" src="./static/js/go.js"></script>
```


### add-asset-html-webpack-plugin
add-asset-html-webpack-plugin，可以配置修改打包后的index.html.
在webpack.prod.config中引入并添加，用法如下：
```js
new AddAssetHtmlPlugin({
    filepath:path.join(__dirname,'src/components/common/gojs/go.js'),
    outputPath:'./static/js',
    publicPath:'./static/js',//script标签中的路径前缀
    includeSourcemap:false
})
```
打包后结果如下：
```html
</div></div>
<script type="text/javascript" src="./static/js/go.js"></script>
```

### CommonsChunkPlugin分包，HtmlWebpackPlugin插入
分包等的时间久点
```js
var chunks = ['manifest', 'vendor', 'gojs', 'app'];
new webpack.optimize.CommonsChunkPlugin({
      name: 'gojs',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /go\.js$/.test(module.resource) === 0
        )
      }
    }),
 new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunks,
      chunksSortMode: function(a, b) {
        return chunks.indexOf(a.names[0]) - chunks.indexOf(b.names[0])
      },
    }),
```