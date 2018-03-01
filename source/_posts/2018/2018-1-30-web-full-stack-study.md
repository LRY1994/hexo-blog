---
layout: post
title:  "《Web 全栈工程师的自我修养》读书笔记"
date:   2018/1/30 
categories: 
    - 学习
    - 读书笔记
tags:
    - 前端优化
---
![cover](/images/book/web-full-stack-self-cultivation.jpg)
## 减少同一域名下的HTTP请求数
1、把静态资源放在单独的非主域名。这样可以增加浏览器并发连接数，而且减少HTTP请求中携带的不必要的cookie数据（cookie的作用域是整个域名）

2、合并同一域名下的资源。比如，合并CSS文件，将图片组合为CSS贴图（sprite）

3、省掉不必要的HTTP请求，可以 内嵌小型css/js,设置缓存，减少重定向等
 
## 减少每一个资源的体积
1、	选择合适的图片格式，就能用更小的体积，达到更好的显示效果。如果图片颜色数较多就使用JPG格式，较少就使用PNG格式。如果能够通过服务器端判断浏览器支持WebP,那么久使用WebP格式和SVG格式

2、	对于比较大的文本资源，必须开启服务器端的gzip压缩。因为gzip对于含有重复“单词”的文本文件，压缩率比较高，能够有效提高传输过程。Gzip对文本资源非常有效，对图片资源则没那么大的压缩率

3、	压缩源码和图片

Js文件源代码可以采用混淆压缩 的方式

Css文件源代码进行普通压缩

JPG图片可以根据具体质量压缩为50%到70%

PNG可以使用一些开源压缩软件来压缩，比图24色变为8色、去掉一些PNG格式信息

## 使用CDN

可以增加并发下载量，还能与其他网站共享缓存

## 推荐的浏览器缓存设置的最佳实践
1、	对于动态生成的HTML页面使用HTTPS头：Cache-Control：no-cache

2、	对于静态HTML页面使用HTTPS头：Last-Modified

3、	其他所有的文件类型都设置Expires头，并且在文件内容有所修改的时候修改query string。

为了避免出现运营商劫持文件的情况，使用更加强硬的方法：修改文件名，而不是修改query string。用户的宽带运营商为了提高速度，可能会在自己的某个节点服务器上缓存你的文件，但是如果query string更新了，运营商仍然可能那自己节点的缓存发给你。（根据HTTP规范，如果修改了请求资源的Query string,就应该被视为一个新的文件）
这些都是服务器对每个资源的响应头里设置的

## 版本控制最佳实践
1、	鼓励频繁提交，不要等到代码没问题了再提交

2、	确定分支流程。基本上所有的特性和较大的bug都应该使用分支来修改

3、	定义主干原则，并且坚守它。我们的团队的主干原则是“主干对应的代码必须是可以发布并且不会产生bug的”

4、	不要把逻辑的修改和代码格式化操作混在一起提交

5、	不相干的代码分开提交，也就是说不要在一次提交里面修复两个bug

6、	保持代码库的“干净”

## 设计原则

1、三次法则（rule of three）允许按需直接赋值粘贴代码一次，如果相同的代码重复出现三次及三次以上，将其提取处理做成一个子程序

2、WET（wwrite everything twice）

3、DRY（don’t repeat youselft）

4、惯例优先于设置

5、KISS原则，keep it simple,stupid

6、最少知道原则

 
## 在别的地方看到的图

性能优化

![性能优化](https://raw.githubusercontent.com/LRY1994/lry1994.github.io/master/img/content/performance-optimize.png)

图片适配

![图片适配](https://raw.githubusercontent.com/LRY1994/lry1994.github.io/master/img/content/pic-adapt.jpg)

aria无障碍文本
![aria](https://raw.githubusercontent.com/LRY1994/lry1994.github.io/master/img/content/aria.png)

