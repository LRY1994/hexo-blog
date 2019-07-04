---
title: 面试题摘录
date:   2018/5/5
categories: 
    - 学习
tags:
    - 面经
---


### vue数据双向绑定的原理

主要讲了实现是基于Object.defineProperty
另外也大概阐述了``发布-订阅者模式``，主要是Observer，Dep，Watcher等


### JSONP可以用post请求吗？为什么？

不支持
因为script标签只支持get请求...

### 描述一下css的盒模型

标准盒模型和怪异模式

标准模式：box-sizing:content-box;

怪异模式：box-sizing:border-box;
    
### H5异步上传文件
关键代码

 ```javascript
 <input id="uploadFile" type="file" name="myPhoto" /> 
 
 var fd = new FormData();//新建FormData
 fd.append("myPhoto", $("uploadFile").files[0]);//塞数据

 var xhr = new XMLHttpRequest(); //创建XMLHttpRequest 对象
 xhr.open("post","/uploadPhoto.action", true);//打开链接
 xhr.onreadystatechange = function() {//监听
    if (xhr.readyState == 4) {
        var flag = xhr.responseText;
        if (flag == "success") {
            alert("图片上传成功！");
        } else {
            alert("图片上传成功！");
        };                        
        
    };
}; 
xhr.send(fd);//发送
 ```
### 实现垂直水平居中有哪些方法

1. flexbox

2. 绝对定位+margin负值(子容器宽高固定)
```css
    childElement{
        position:absolute;                              
        height:200px;
        width:400px;           
        top:50%;      
        left:50%;                          
        margin-top:-100px;/*高度的一半*/
        margin-left:-200px;/*宽度的一半*/                                         
    }            
   
```
3. 绝对定位top left right bottom 0 + margin auto (子容器宽高固定)
```css
chilElement{
    height: 150px;
    width: 150px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
```

4. 绝对定位+transfrom负值（子容器宽高不知)

（1） 不知道自己高度和父容器高度的情况下, 利用绝对定位只需要以下三行：
```css
parentElement{
    position:relative;
}

childElement{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

}

 ```
 （2）若父容器下只有一个元素，且父元素设置了高度，则只需要使用相对定位即可

 ```css
 parentElement{
    height:xxx;
}

childElement {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
```


### 请你谈谈Cookie的弊端
cookie虽然在持久保存客户端数据提供了方便，分担了服务器存储的负担，但还是有很多局限性的。
第一：每个特定的域名下最多生成20个cookie

1. IE6或更低版本最多20个cookie
2. IE7和之后的版本最后可以有50个cookie。
3. Firefox最多50个cookie
4. chrome和Safari没有做硬性限制
IE和Opera 会清理近期最少使用的cookie，Firefox会随机清理cookie。

cookie的最大大约为4096字节，为了兼容性，一般不能超过4095字节。

IE 提供了一种存储可以持久化用户数据，叫做``uerData``，从IE5.0就开始支持。每个数据最多128K，每个域名下最多1M。这个持久化数据放在缓存中，如果缓存没有清理，那么会一直存在。

优点：极高的扩展性和可用性

1. 通过良好的编程，控制保存在cookie中的session对象的大小。
2. 通过加密和安全传输技术（SSL），减少cookie被破解的可能性。
3. 只在cookie中存放不敏感数据，即使被盗也不会有重大损失。
4. 控制cookie的生命期，使之不会永远有效。偷盗者很可能拿到一个过期的cookie。

缺点：
1. `Cookie`数量和长度的限制。每个domain最多只能有20条cookie，每个cookie长度不能超过4KB，否则会被截掉。

2. 安全性问题。如果cookie被人拦截了，那人就可以取得所有的session信息。即使加密也与事无补，因为拦截者并不需要知道cookie的意义，他只要原样转发cookie就可以达到目的了。

3. 有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务器端保存一个计数器。如果我们把这个计数器保存在客户端，那么它起不到任何作用。

### web storage和cookie的区别
Web Storage的概念和cookie相似，区别是它是为了更大容量存储设计的。Cookie的大小是受限的，并且每次你请求一个新的页面的时候Cookie都会被发送过去，这样无形中浪费了带宽，另外cookie还需要指定作用域，不可以跨域调用。

除此之外，Web Storage拥有setItem,getItem,removeItem,clear等方法，不像cookie需要前端开发者自己封装setCookie，getCookie。

但是Cookie也是不可以或缺的：Cookie的作用是与服务器进行交互，作为HTTP规范的一部分而存在 ，而Web Storage仅仅是为了在本地“存储”数据而生

浏览器的支持除了IE７及以下不支持外，其他标准浏览器都完全支持(ie及FF需在web服务器里运行)，值得一提的是IE总是办好事，例如IE7、IE6中的UserData其实就是javascript本地存储的解决方案。通过简单的代码封装可以统一到所有的浏览器都支持web storage。

localStorage和sessionStorage都具有相同的操作方法，例如setItem、getItem和removeItem等
### CSS中 link 和@import 的区别是？
(1) link属于HTML标签，而@import是CSS提供的; 

(2) 页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载;

(3) import只在IE5以上才能识别，而link是HTML标签，无兼容问题; 

(4) link方式的样式的权重 高于@import的权重.

### 对BFC规范的理解？
BFC，块级格式化上下文，一个创建了新的BFC的盒子是独立布局的，盒子里面的子元素的样式不会影响到外面的元素。在同一个 BFC 中的两个毗邻的块级盒在垂直方向（和布局方向有关系）的 margin 会发生折叠。

W3C CSS 2.1 规范中的一个概念，它决定了元素如何对其内容进行布局，以及与其他元素的关系和相互作用。

### 说说你对语义化的理解？
1. 去掉或者丢失样式的时候能够让页面呈现出清晰的结构
2. 有利于SEO：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重；
3. 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页；
4. 便于团队开发和维护，语义化更具可读性，是下一步吧网页的重要动向，遵循W3C标准的团队都遵循这个标准，可以减少差异化。

### 清除浮动的技巧
1. 使用空标签清除浮动。

这种方法是在所有浮动标签后面添加一个空标签 定义css clear:both. 弊端就是增加了无意义标签。

2. 使用overflow。

给包含浮动元素的父标签添加css属性 overflow:auto; zoom:1; zoom:1用于兼容IE6。

3. 使用after伪对象清除浮动。

该方法只适用于非IE浏览器。具体写法可参照以下示例。使用中需注意以下几点。一、该方法中必须为需要清除浮动元素的伪对象中设置 height:0，否则该元素会比实际高出若干像素；

4. 浮动外部元素

### 清除浮动的几种方式，各自的优缺点
1. 使用空标签清除浮动 clear:both(理论上能清除任何标签，但是这样会增加无意义的标签)
2. 使用overflow:auto(空标签元素清除浮动而不得不增加无意义代码的弊端,使用zoom:1用于兼容IE)
3. 使用afert伪元素清除浮动(用于非IE浏览器)

### 减少页面加载时间的方法
1. 优化图片 
2. 图像格式的选择（GIF：提供的颜色较少，可用在一些对颜色要求不高的地方） 
3. 优化CSS（压缩合并css，如 margin-top, margin-left...) 
4. 网址后加斜杠（如www.campr.com/目录，会判断这个目录是什么文件类型，或者是目录。） 
5. 标明高度和宽度（如果浏览器没有找到这两个参数，它需要一边下载图片一边计算大小，如果图片很多，浏览器需要不断地调整页面。这不但影响速度，也影响浏览体验。 
当浏览器知道了高度和宽度参数后，即使图片暂时无法显示，页面上也会腾出图片的空位，然后继续加载后面的内容。从而加载时间快了，浏览体验也更好了） 
6. 减少http请求（合并文件，合并图片）

### 你都使用哪些工具来测试代码的性能？
1. Profiler
2. JSPerf（http://jsperf.com/nexttick-vs-setzerotimeout-vs-settimeout）
3. Dromaeo

### new操作符具体干了什么呢?
参考答案
1. 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型
2. 属性和方法被加入到 this 引用的对象中
3. 新创建的对象由 this 所引用，并且最后隐式的返回 this

```javascript
var obj  = {};
obj.__proto__ = Base.prototype;
Base.call(obj); 
```

### js延迟加载的方式有哪些？
1. defer和async
2. 动态创建DOM方式（创建script，插入到DOM中，加载完毕后callBack）
3. 按需异步载入js

### 如何解决跨域问题?
1. jsonp（jsonp 的原理是动态插入 script 标签）
2. document.domain + iframe
3. window.name、window.postMessage
4. 服务器上设置代理页面

### 哪些操作会造成内存泄漏？
内存泄漏指任何对象在您不再拥有或需要它之后仍然存在。

垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收。

1. setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏。
2. 闭包
3. 控制台日志
4. 循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）

###  哪些性能优化的方法？
1. 减少http请求次数：CSS Sprites, JS、CSS 源码压缩、图片大小控制合适；网页 Gzip，CDN 托管，data 缓存 ，图片服务器
2. 前端模板 JS + 数据，减少由于HTML标签导致的带宽浪费，前端用变量保存 AJAX 请求结果，每次操作本地变量，不用请求，减少请求次数
3. 用 innerHTML 代替 DOM 操作，减少 DOM 操作次数，优化 javascript 性能
4. 当需要设置的样式很多时设置 className 而不是直接操作 style
5. 少用全局变量、缓存DOM节点查找的结果。减少 IO 读取操作
6. 避免使用 CSS Expression（css表达式)又称 Dynamic properties(动态属性)
7. 图片预加载，将样式表放在顶部，将脚本放在底部，加上时间戳

### ie 各版本和 chrome 可以并行下载多少个资源
1. IE6 2 个并发
2. iE7 升级之后的 6 个并发，之后版本也是 6 个
3. Firefox，chrome 也是6个

### 哪些地方会出现css阻塞，哪些地方会出现js阻塞？
js 的阻塞特性：所有浏览器在下载 JS 的时候，会阻止一切其他活动，直到 JS 下载、解析、执行完毕后才开始继续并行下载其他资源并呈现内容。为了提高用户体验，新一代浏览器都支持并行下载 JS，但是 JS 下载仍然会阻塞其它资源的下载（例如.图片，css文件等）。
由于浏览器为了防止出现 JS 修改 DOM 树，需要重新构建 DOM 树的情况，所以就会阻塞其他的下载和呈现。

嵌入 JS 会阻塞所有内容的呈现，而外部 JS 只会阻塞其后内容的显示，

2 种方式都会阻塞其后资源的下载。也就是说外部样式不会阻塞外部脚本的加载，但会阻塞外部脚本的执行。

CSS 怎么会阻塞加载了？CSS 本来是可以并行下载的，在什么情况下会出现阻塞加载了(在测试观察中，IE6 下 CSS 都是阻塞加载）

当 CSS 后面跟着嵌入的 JS 的时候，该 CSS 就会出现阻塞后面资源下载的情况。而当把嵌入 JS 放到 CSS 前面，就不会出现阻塞的情况了。

根本原因：因为浏览器会维持 html 中 css 和 js 的顺序，样式表必须在嵌入的 JS 执行前先加载、解析完。而嵌入的 JS 会阻塞后面的资源加载，所以就会出现上面 CSS 阻塞下载的情况。

### 嵌入JS应该放在什么位置？
1. 放在底部，虽然放在底部照样会阻塞所有呈现，但不会阻塞资源下载。
2. 如果嵌入JS放在head中，请把嵌入JS放在CSS头部。
3. 使用 defer（只支持IE）
4. 不要在嵌入的JS中调用运行时间较长的函数，如果一定要用，可以用 setTimeout 来调用

### Javascript无阻塞加载具体方式：
1. 将脚本放在底部。``<link>``还是放在head中，用以保证在js加载前，能加载出正常显示的页面。``<script>``标签放在``</body>``前。
2. 阻塞脚本：由于每个``<script>``标签下载时阻塞页面解析过程，所以限制页面的``<script>``总数也可以改善性能。适用于内联脚本和外部脚本。
3. 非阻塞脚本：等页面完成加载后，再加载js代码。也就是，在 window.onload 事件发出后开始下载代码。
4. defer属性：支持IE4和fierfox3.5更高版本浏览器
5. 动态脚本元素：文档对象模型（DOM）允许你使用js动态创建HTML的几乎全部文档内容

### WEB应用从服务器主动推送Data到客户端有那些方式？
1. html5 websocket
2. WebSocket 通过 Flash
3. XHR长时间连接
4. XHR Multipart Streaming
5. 不可见的Iframe
6. ``<script>``标签的长时间连接(可跨域)

### 网站重构
在不改变外部行为的前提下，简化结构、添加可读性，而在网站前端保持一致的行为。也就是说是在不改变 UI 的情况下，对网站进行优化，在扩展的同时保持一致的 UI。

对于传统的网站来说重构通常是：
1. 表格(table)布局改为 DIV + CSS
2. 使网站前端兼容于现代浏览器(针对于不合规范的CSS、如对 IE6 有效的)
3. 对于移动平台的优化
4. 针对于 SEO 进行优化
5. 深层次的网站重构应该考虑的方面
6. 减少代码间的耦合
7. 让代码保持弹性
8. 严格按规范编写代码
9. 设计可扩展的API
10. 代替旧有的框架、语言(如VB)
11. 增强用户体验
12. 通常来说对于速度的优化也包含在重构中
13. 压缩JS、CSS、image等前端资源(通常是由服务器来解决)
14. 程序的性能优化(如数据读写)
15. 采用CDN来加速资源加载
16. 对于JS DOM的优化
17. HTTP服务器的文件缓存

### HTTP协议中与缓存相关的HTTP Header有哪些

Cache-Control 、 Last-Modified、 Expires、Etag、 max-age

### 网页的缓存

是由HTTP消息头中的“Cache-control”来控制的，常见的取值有private、no-cache、max-age、must-revalidate等，默认为private。

Expires 头部字段提供一个日期和时间，响应在该日期和时间后被认为失效。允许客户端在这个时间之前不去检查（发请求），等同max-age的效果。但是如果同时存在，则被Cache-Control的max-age覆盖。

``Expires = "Expires" ":" HTTP-date``
例如：
``Expires: Thu, 01 Dec 1994 16:00:00 GMT （必须是GMT格式）``
如果把它设置为-1，则表示立即过期

``Expires`` 和 ``max-age`` 都可以用来指定文档的过期时间，但是二者有一些细微差别
1. Expires在HTTP/1.0中已经定义，Cache-Control:max-age在HTTP/1.1中才有定义，为了向下``兼容``，仅使用max-age不够
2. Expires指定一个绝对的过期时间(GMT格式),这么做会导致至少2个问题：
    1. 客户端和服务器时间不同步导致Expires的配置出现问题。 
    2. 很容易在配置后忘记具体的过期时间，导致过期来临出现浪涌现象
3. max-age 指定的是从文档被访问后的存活时间，这个时间是个``相对值``(比如:3600s)，相对的是文档第一次被请求时服务器记录的Request_time(请求时间)
4. Expires 指定的时间可以是相对文件的最后访问时间(Atime)或者修改时间(MTime)，而max-age相对对的是文档的请求时间(Atime)
5. 如果值为 no-cache,那么每次都会访问服务器。如果值为max-age，则在过期之前不会重复访问服务器。

### 浏览器缓存机制
[https://www.cnblogs.com/shixiaomiao1122/p/7591556.html](https://www.cnblogs.com/shixiaomiao1122/p/7591556.html)
[https://www.cnblogs.com/slly/p/6732749.html](https://www.cnblogs.com/slly/p/6732749.html)

判断缓存是否过期步骤是：
- 不发生请求 强缓存：
    **s-maxage优先于max-age优先于expires**

    1） 查看是否有cache-control 的max-age / s-maxage , 如果有，则用服务器时间date值 + max-age/s-maxage 的秒数计算出新的过期时间，将当前时间与过期时间进行比较，判断是否过期

    2）查看是否有cache-control 的max-age / s-maxage，如果没有，则用expires 作为过期时间比较

- 发送请求

    3）Last-Modified与ETag，**ETag优先于Last-Modified**

        Last-Modified已经足以让浏览器知道本地的缓存副本是否足够新，为什么还需要Etag（实体标识）呢？HTTP1.1中Etag的出现主要是为了解决几个Last-Modified比较难解决的问题：

        1. Last-Modified标注的最后修改只能精确到秒级，如果某些文件在1秒钟以内，被修改多次的话，它将不能准确标注文件的新鲜度
        2. 如果某些文件会被定期生成，当有时内容并没有任何变化，但Last-Modified却改变了，导致文件没法使用缓存
        3. 有可能存在服务器没有准确获取文件修改时间，或者与代理服务器时间不一致等情形

{% asset_img cache.png 浏览器缓存机制 %}
{% asset_img cache2.png 浏览器缓存机制 %}

{% asset_img cache-control.png %}

{% asset_img user_cache.png 用户行为影响浏览器缓存 %}

浏览器的缓存来源是怎么设置的？

{% asset_img cache_from.png 浏览器缓存来源 %}

看到知乎有人讨论 [https://www.zhihu.com/question/64201378](https://www.zhihu.com/question/64201378)

### 写出几种IE6 BUG的解决方法
1. 双边距BUG float引起的 使用display
2. 像素问题 使用float引起的 使用dislpay:inline -3px
3. 超链接hover 点击后失效 使用正确的书写顺序 link visited hover active
4. Ie z-index问题 给父级添加position:relative
5. Png 透明 使用js代码 改
6. Min-height 最小高度 !Important 解决’
7. select 在ie6下遮盖 使用iframe嵌套
8. 为什么没有办法定义1px左右的宽度容器(IE6默认的行高造成的，使用over:hidden,zoom:0.08 line-height:1px)
9. ie 6 不支持!important

### AJAX生命周期
一个AJAX请求从开始创建到最后的响应阶段，在其整个生命周期中，使用了哪些Javascript对象与方法?
```
 ajaxStart()
 ajaxSend()
 ajaxSuccess()
 ajaxStop()
 load()
 ```
在一个Ajax请求的生命周期中，从创建请求到提交请求到成功响应的五种状态：

1.	``UNINITIALIZED``—请求尚未初始化。
2. ``LOADING``—请求已经初始化完成。
3. ``LOADED``—请求已经发送，正在等待确认。
4. ``INTERACTIVE``—正在从服务器下载响应数据。
5. ``COMPLETE``—请求/响应周期结束。



### 一个POST请求的Content-type有多少种，传输的数据格式有何区别
1. ``application/x-www-form-urlencoded`` 浏览器的原生 form 表单，如果不设置 enctype 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据
2. ``multipart/form-data ``这种方式一般用来上传文件。我们使用表单上传文件时，必须让form 的 enctyped 等于这个值
3. ``application/json``告诉服务端消息主体是序列化后的 JSON 字符串
4. ``text/xml``

### 什么是RESETful API,如何设计一个open API接口
REST 指的是一组架构约束条件和原则。满足这些约束条件和原则的应用程序或设计就是 RESTful。

### YSlow 34条性能优化建议哪些与HTTP协议相关
静态资源缓存优化的最佳状态是：直接从本地缓存中读取 > 304 状态 > 200 状态。关于 HTTP 状态码，与网站性能优化有关的主要是以下几个。

1. 尽量减少 200 状态码的请求。200 表示是一个正常的请求返回，此条优化规则要求尽可能多的减少页面的 HTTP Request 数量。常见的方法有：合并打包静态资源、使用 ``CSS Sprite`` 雪碧图合并、缓存 ``AJAX``、使用 ``LocalStorage/UserData/Manifest`` 等本地缓存技术。

2. 清理返回 301/302 状态码的入口链接。301 表示永久重定向，302 表示临时重定向。服务器端使用重定向返回通常是为了兼容一个旧的入口链接。我们能做的优化是，将调用旧入口的场景进行清理，直接调用重定向之后的新 URL 地址。

3. 304 表示静态资源未更新，浏览器可直接使用本地缓存文件。通常 304 的产生与浏览器的处理机制以及服务器缓存头配置有一定的关系。304 虽然未传输文件主体内容，但 HTTP 请求的建立依然是一个可以避免的性能损耗。腾讯 KM（内部知识分享平台）上有一篇文章通过在真实海量业务场景（没记错的话是 Qzone 业务）中，正交验证 HTTP 1.0 与 1.1 协议中与缓存相关的 HTTP Header 配置，结合日志分析得出了一个最佳实践：关闭 Etag 配置，只启用 Cache-Control 与 Last-Modified 响应头。为了兼容老浏览器，可保留 Expires。
因为 Etag 的缓存方案，在经过 CDN 及网关代理服务器后，会导致缓存命中率下降。从以上「浏览器缓存检查机制流程」图上可以看出，使用强缓存（Cache-Control max-age 设置为一年）后浏览器在资源过期前不会发起 HTTP 请求，那如何保证静态资源在服务器上更新后本地的缓存也能同步更新呢？可参考百度 FIS 的「文件指纹」方案。

4. 清理返回 404 状态码的入口链接。静态资源文件的 404 调用需严格避免，而入口页面的 404 则在所难免。通过在全站 404 页面进行产品引导与体验优化，并结合数据上报记录来源页（HTTP Referer Header 或 document.referrer），可以找到并清理 404 来源入口。对于由搜索引擎进入的来源，可通过主动提交新索引至搜索引擎，或使用 301/302 重定向的方式，有效利用起这些「被浪费的流量」。

5. 502 服务器出错。如果是 Nginx + FastCGI 的常见架构，通常是由于 Nginx 缓冲区溢出或服务器资源被耗尽引起，针对不同的业务场景进行 Nginx 的配置优化能显著提升服务器抗压性能。


### html元素优先级

在html中，帧元素（frameset）的优先级最高，表单元素比非表单元素的优先级要高。
所有的html元素又可以根据其显示分成两类：有窗口元素以及无窗口元素。有窗口元素总是显示在无窗口元素的前面。

有窗口元素包括：select元素，object元素，以及frames元素等等。

无窗口元素：大部分html元素都是无窗口元素。


### HTML CSRF可以发起GET请求的标签

```
<link href=''>
<img src=''>
<frame src=''>
<script src=''>
<video src=''>
Background:url('')
```


 ## 节点之间的空白符
 
 在firefox、chrome、opera、safari浏览器是文本节点,IE不是.所以IE是3，其它浏览器是7
 ```html
 <ul>
    <li>javascript</li>
    <li>jQuery</li>
    <li>PHP</li>
 </ul>
 ```
 如果把代码改成这样:
``<ul><li>javascript</li><li>jQuery</li><li>PHP</li></ul>``

运行结果:3（IE和其它浏览器结果是一样的）


 ## removeChild
 X=node.removeChild(child)把删除的子节点赋值给 x，这个子节点不在DOM树中，但是还存在内存中，
如果要完全删除对象，给 x 赋 null 值

## fetch跟jquery ajax的区别
这也是fetch很奇怪的地方：

当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject，而是标记为 resolve（但是会将 resolve 的返回值的 ok 属性设置为 false ）即使该 HTTP 响应的状态码是 404 或 500。
  
仅当网络故障时或请求被阻止时，才会标记为 reject。

默认情况下, fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项）.

fetch是比较底层的API，很多情况下都需要我们再次封装。
比如：
```javascript
// jquery ajax
$.post(url, {name: 'test'})
// fetch
fetch(url, {
    method: 'POST',
    body: Object.keys({name: 'test'}).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&')
})
```
由于fetch是比较底层的API，所以需要我们手动将参数拼接成'name=test'的格式，而jquery ajax已经封装好了。所以fetch并不是开箱即用的。
另外，fetch还``不支持超时控制``。

>axios体积比较小，也没有上面fetch的各种问题，我认为是当前最好的请求方式 


## 只有设置了相对定位，或者绝对定位的元素才具有的属性是（z-index）



[当面试官问你Vue响应式原理，你可以这么回答他](https://juejin.im/post/5adf0085518825673123da9a)

[如何解释vue的生命周期才能令面试官满意？](https://juejin.im/post/5ad10800f265da23826e681e)

[HTML5中37个最重要的技术点](https://www.tuicool.com/articles/v2aeMbn?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com)

[BAT 要的是什么样的前端实习生？](https://www.tuicool.com/articles/bInqieZ?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com)

[从 Chrome 源码看浏览器如何 layout 布局](http://www.codeceo.com/chrome-broswer-layout.html)

[从八道面试题看JavaScript DOM事件机制](https://segmentfault.com/a/1190000013894510)

[【前端性能优化】高性能JavaScript整理总结](https://segmentfault.com/a/1190000013963213)

[三分钟快速理解javascript内存管理](https://www.tuicool.com/articles/n22MNrA?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com)
[ES6小技巧](https://segmentfault.com/a/1190000013972464)
[优雅的 JavaScript 排序算法（ES6）](https://www.tuicool.com/articles/zANVnqM)