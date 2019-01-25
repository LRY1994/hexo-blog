---
title: 2018.12-2019.1总结 
date:   2018/12/17
categories: 
    - 学习
    - 每月总结 
---
### for\for-in\for-each\for-of
for-in不仅可以遍历数组还可以遍历对象
for-in 遍历属性的顺序并不确定，即输出的结果顺序与属性在对象中的顺序无关，也与属性的字母顺序无关，与其他任何顺序也无关。
使用for-in在遍历的时候，它不仅遍历了对象上的属性，而且还遍历了对象父类原型上的属性。
所以for-in并不适合遍历Array中的元素，更适合遍历对象中的属性
for-in只会遍历存在的实体,以及对应的原型链上的属性.因此其速度相比较其他for循环，要慢一些。
所以除非明确要迭代一个属性数量未知的对象，否则应该避免使用for-in。
for-in遍历数组的缺点：数组的下标index值是数字，for-in遍历的index值"0","1","2"等是字符串

在不同浏览器下测试的结果都是 forEach 的速度不如 for。
forEach主要应用在遍历数组，但是它的性能并不如for，因此可以使用for就尽量不要使用forEach。
**forEach 不能break 或者return**

**for-of不支持普通对象遍历，只返回具有数字索引的属性**.

遍历数组：for-of > for > for-each
遍历对象：for-in(要用hasOwnProperty)
await/async 要用for-of


### 完美解决本地和服务器上资源url解析的问题
在 config/index.js 中修改 assetsPublicPath 为 ./
在 build/utils.js 中的 ExtractTextPlugin.extract 传入参数 publicPath: '../../'


### IE的css不可超过250k
```js
optimization: {
    minimizer: [
        new CSSSplitWebpackPlugin({
            size: 3800,
            filename: path.posix.join(assetsDir,'css/[name]-[part].[ext]'),
            }),  
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true },reduceIdents:false },
            canPrint: true
        }),             
    ]
}
```
