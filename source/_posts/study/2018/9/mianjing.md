---
title: 面经收集
date:   2018/10/8
categories: 
    - 学习
    - 专题笔记 
tags:
    - 面试
---
#### 对模块化了解吗？说说有哪些模块化的库，有了解过模块化的发展的历史吗？（commonJS，RequireJS，SeaJS）
[https://segmentfault.com/a/1190000011081338](https://segmentfault.com/a/1190000011081338)
AMD CMD ，这两个东西是一种规范，他们实际产物是 AMD是RequireJS，CMD的产物是seajs，他们的出现都是在COMMONjs基础上发展而来的。
AMD偏向于依赖前置，CMD偏向于用到时才运行的思路，从而导致了依赖项的加载和运行时间点会不同
与CommonJS用require()方法加载模块不同，在ES6中，import命令可以具体指定加载模块中用export命令暴露的接口（不指定具体的接口，默认加载export default），没有指定的是不会加载的，因此会在编译时就完成模块的加载，这种加载方式称为编译时加载或者静态加载。
而CommonJS的require()方法是在运行时才加载的：

#### 本质上说，XHTML是一个过渡技术，结合了XML(有几分)的强大功能及HTML(大多数)的简单特性。
以下是 XHTML 相对 HTML 的几大区别：
XHTML 要求正确嵌套、
XHTML 所有元素必须关闭、
XHTML 区分大小写、
XHTML 属性值要用双引号、
XHTML 用 id 属性代替 name 属性、
XHTML 特殊字符的处理


#### table布局应用场景：
同行等高、
宽度自动调节

####BFC 
(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

哪些元素会生成BFC?

1. 根元素
2. float属性不为none
3. position为absolute或fixed
4. display为inline-block, table-cell, table-caption, flex, inline-flex
5. overflow不为visible
[http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html](http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)


#### 你知道attribute和property的区别么
DOM有其默认的基本属性，而这些属性就是所谓的“property”.
property能够从attribute中得到同步；
attribute不会同步property上的值；
attribute和property之间的数据绑定是单向的，attribute->property；

#### 流式布局如何实现，响应式布局如何实现
https://www.cnblogs.com/yanayana/p/7066948.html


#### 实现两栏布局有哪些方法？
[https://segmentfault.com/a/1190000010698609](https://segmentfault.com/a/1190000010698609)

#### 实现三栏布局（圣杯布局，双飞翼布局，flex布局）
[https://blog.csdn.net/wangchengiii/article/details/77926868](https://blog.csdn.net/wangchengiii/article/details/77926868)


#### padding-top、margin-top…等四个方向的值取决于父元素的**宽**，和父元素的高没有一点关系

#### bind
至于bind方法，他是直接改变这个函数的this指向并且返回一个新的函数，之后再次调用这个函数的时候this都是指向bind绑定的第一个参数。
```js
const test2 = dog.eatBone.bind(cat, '喵喵喵', 'bind')
test2()
```
#### new 一个对象具体做了什么
(1) 创建一个新对象；
(2)新对象的_proto_属性指向构造函数的原型对象。
(3) 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象） ；
(4) 执行构造函数中的代码（为这个新对象添加属性） ；
(54) 返回新对象。

#### 指出JS的宿主对象和原生对象的区别，为什么扩展JS内置对象不是好的做法？有哪些内置对象和内置函数？

 [] === []//false
 [] == []//false

 手写Ajax，XMLHttpRequest
 显示原型和隐式原型，手绘原型链，原型链是什么？为什么要有原型链
 css3动画，transition和animation的区别，animation的属性，加速度，重力的模拟实现

 getBoundingClientRect()获取它相对于视图窗口的坐标
 如何实现图片滚动懒加载
 DOM事件的绑定的几种方式
 typeof 和 instanceof 区别，instanceof原理
js动画和css3动画比较
轮播图的实现，以及轮播图组件开发，轮播10000张图片过程
websocket的工作原理和机制。
手指点击可以触控的屏幕时，是什么事件？
JS的API有哪些应用到了函数柯里化的实现？(bind函数和数组的reduce方法用到了函数柯里化。)