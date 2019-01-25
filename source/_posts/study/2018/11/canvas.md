---
title: canvas 
date:   2018/11/18
categories: 
    - 学习
    - 专题笔记 
---

canvas默认是宽300px,高150px,即``<canvas width="300" height="150">``
当像这样设置的时候``<canvas width="300" height="150">``，会同时修改 **元素本身大小**和 **元素绘图表面大小**
通过css设置的时候，只会改变 **元素本身大小**

如果基于canvas的应用程序要支持IE6,IE7,IE8,游两个选择：explorecanvas\Google Chrome Frame

希望执行几行特定的代码时才开始分析，在执行完之后就停止性能分析，可用console.profile()和console.profileEnd()

把窗口坐标转换成相对于canvas的位置
```js
function windowToCanvas(canvas,clientX,clientY){
    var bbox = canvas.getBoundingClientRect();
    return{
        x:(clientX-bbox.width)*(canvas.width/bbox.width)
        y:(clientY-bbox.height)*(canvas.height/bbox.height)
    }
} 
```

canvas是一个不可获取焦点的元素，所以不能直接在元素上绑定键盘事件，应该在docunmet或window上绑定键盘事件

浏览器只会在产生可打印字符的时候才触发keypress事件。用``var key =String.fromCharCode(event.which)``

打印canvas内容：``toDataURL()``  ``toBlob()``