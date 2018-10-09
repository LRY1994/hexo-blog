---
title: 尺寸
date:   2018/7/12
categories: 
    - 学习
    - 专题笔记 
tags:
    - 面试
---
 getBoundingClientRect() 获取它相对于视图窗口的坐标
## HTML元素精准定位
``scrollHeight``: 对象的滚动高度。 

``scrollLeft``:对象左边界和窗口中目前可见内容的最左端之间的距离

``scrollTop``:对象最顶端和窗口中可见内容的最顶端之间的距离 

``scrollWidth``:获取对象的滚动宽度

``offsetHeight``:获取对象相对于版面或由父坐标 offsetParent 属性指定的父坐标的高度 

``offsetLeft``:获取对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置 

``offsetTop``:获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置 

``event.clientX`` 相对文档的水平座标 

``event.clientY`` 相对文档的垂直座标 

``event.offsetX`` 相对容器的水平坐标 

``event.offsetY`` 相对容器的垂直坐标 

``document.documentElement.scrollTop`` 垂直方向滚动的值 

``event.clientX+document.documentElement.scrollTop`` 相对文档的水平座标+垂直方向滚动的量

这里是JavaScript中建造迁移转变代码的常用属性

页可见区域宽： ``document.body.clientWidth``;

网页可见区域高： ``document.body.clientHeight``;

网页可见区域宽： ``document.body.offsetWidth ``  （包含边线的宽）;

网页可见区域高： ``document.body.offsetHeight`` （包含边线的宽）;

网页正文全文宽： ``document.body.scrollWidth``;

网页正文全文高： ``document.body.scrollHeight``;

网页被卷去的高： ``document.body.scrollTop``;

网页被卷去的左： ``document.body.scrollLeft``;

网页正文项目组上： ``window.screenTop``;

网页正文项目组左： ``window.screenLeft``;

屏幕辨别率的高： ``window.screen.height``;

屏幕辨别率的宽： ``window.screen.width``;

屏幕可用工作区高度： ``window.screen.availHeight``;

{% asset_img element-position.gif %}
{% asset_img pic2.jpg %}


clientTop/clientLeft  这个属性就是border宽度。

offset包括border,client不包括border

document.documentElement / body要做兼容

## 如何获取元素的精确位置
```js
// Helper function to get an element's exact position
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}
```



## screen对象

用于获取用户的屏幕信息。

* ``screen.availWidth`` 属性返回访问者屏幕的宽度，以像素计，减去界面特性，比如任务栏。

* ``screen.availHeight`` 属性返回访问者屏幕的高度，以像素计，减去界面特性，比如任务栏。



## 浏览器窗口可视区域大小clientHeight
获得浏览器窗口的尺寸（浏览器的视口，不包括工具栏和滚动条）的方法:
#### 一、对于IE9+、Chrome、Firefox、Opera 以及 Safari：
* `` window.innerHeight`` - 浏览器窗口的内部高度
*  ``window.innerWidth ``- 浏览器窗口的内部宽度

#### 二、对于 Internet Explorer 8、7、6、5：
* ``document.documentElement.clientHeight``表示HTML文档所在窗口的当前高度。
* ``document.documentElement.clientWidth``表示HTML文档所在窗口的当前宽度。

或者

Document对象的body属性对应HTML文档的``<body>``标签
* ``document.body.clientHeight``
* `` document.body.clientWidth``

#### 三、浏览器兼容性
```javascript
//屏幕可视窗口大小
var w= window.innerWidth||document.documentElement.clientWidth|| document.body.clientWidth;
var h=window.innerHeight|| document.documentElement.clientHeight || document.body.clientHeight;

//滚动条滚动的距离
window.pagYoffset || document.documentElement.scrollTop||document.body.scrollTop 

```

##  网页尺寸scrollHeight

``scrollHeight``和``scrollWidth``，获取网页内容高度和宽度。
#### 一、针对IE、Opera:
scrollHeight 是网页内容实际高度，可以小于 clientHeight。
#### 二、针对NS、FF:
scrollHeight 是网页内容高度，不过最小值是 clientHeight。也就是说网页内容实际高度小于 clientHeight 时，scrollHeight 返回 clientHeight 。
#### 三、浏览器兼容性
```javascript
var w=document.documentElement.scrollWidth
   || document.body.scrollWidth;
var h=document.documentElement.scrollHeight
   || document.body.scrollHeight;
```

``scrollHeight``和``scrollWidth``还可获取Dom元素中内容实际占用的高度和宽度。

## 网页尺寸offsetHeight
``offsetHeight``和``offsetWidth``，获取网页内容高度和宽度(包括滚动条等边线，会随窗口的显示大小改变)。
#### 一、值
``offsetHeight = clientHeight + 滚动条 + 边框。``
#### 二、浏览器兼容性
```javascript
var w= document.documentElement.offsetWidth
    || document.body.offsetWidth;
var h= document.documentElement.offsetHeight
    || document.body.offsetHeight;
```

## 网页卷去的距离与偏移量

我们先来看看下面的图：

{% asset_img scroll.png %}

``scrollLeft``:设置或获取位于给定对象左边界与窗口中目前可见内容的最左端之间的距离 ，即左边灰色的内容。

``scrollTop``:设置或获取位于对象最顶端与窗口中可见内容的最顶端之间的距离,即网页被卷去的高，即上边灰色的内容。向上滚动的距离

``offsetLeft``:获取指定对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置 。

``offsetTop``:获取指定对象相对于版面或由 offsetParent 属性指定的父坐标的计算顶端位置 。

注意:
1. 区分大小写
2. offsetParent：布局中设置postion属性(Relative、Absolute、fixed)的父容器，从最近的父节点开始，一层层向上找，直到HTML的body。
