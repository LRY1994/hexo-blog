---
title: 2017-12总结
date:   2017/12/1
categories: 
    - 学习 
    - 总结
---

* 昨晚在公司的OA系统提交账务报销的时候，发现保存老是保存不了，看了控制台，console出现了错误，OA是以前的老系统，用原生的js写的。具   体原因是 document.getElementById(xx)取不到值。（我的OA只能用IE打开==）

    然后去检查元素看了一下，发现并没有id==xx的元素，都是写成name=xx,当时我理所应当地以为是OA有bug,手动在name=xx的后面加上id=xx,再点击保存就OK了。

    今天查了一下，原来不是有bug。

    >在 IE6 IE7 IE8(Q) 中，支持以 document.getElementById(elementName) 的方式获取 A APPLET BUTTON FORM IFRAME IMG INPUT MAP OBJECT EMBED SELECT TEXTAREA 元素，而其他浏览器的任何元素均不支持该方式。


    参考

    [SD9001: IE6 IE7 IE8(Q) 中的 getElementById 方法能以 name 属性为参数获取某些元素](http://www.w3help.org/zh-cn/causes/SD9001)

    实验了一下，用IE8版本，成功了吼吼吼

* ``Polyfill``的准确意思为：用于实现浏览器并不支持的原生API的代码。
    例如，querySelectorAll是很多现代浏览器都支持的原生Web API，但是有些古老的浏览器并不支持，那么假设有人写了库，只要用了这个库， 你就可以在古老的浏览器里面使用``document.querySelectorAll``，使用方法跟现代浏览器原生API无异。那么这个库就可以称为``Polyfill``或者``Polyfiller``。
    好，那么问题就来了。jQuery是不是一个Polyfill?答案是No。因为它并不是实现一些标准的原生API，而是封装了自己API。一个Polyfill是抹平新老浏览器 标准原生API 之间的差距的一种封装，而不是实现自己的API。


    