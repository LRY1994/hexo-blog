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
(5) 返回新对象。

#### DOM事件的绑定的几种方式
call,apply,bind


#### 显示原型prototye和隐式原型_proto_，手绘原型链.
每一个函数在创建之后都会拥有一个名为prototype的属性，这个属性指向函数的原型对象。
Note：通过Function.prototype.bind方法构造出来的函数是个例外，它没有prototype属性。

JavaScript中任意对象都有一个内置属性[[prototype]]，在ES5之前没有标准的方法访问这个内置属性，但是大多数浏览器都支持通过__proto__来访问。ES5中有了对于这个内置属性标准的Get方法Object.getPrototypeOf(). 
Note: Object.prototype 这个对象是个例外，它的__proto__值为null

>隐式原型指向这个对象的构造函数(constructor)的prototype

隐式原型的作用：**构成原型链**。举个例子，当我们访问obj这个对象中的x属性时，如果在obj中找不到，那么就会沿着__proto__依次查找。

```js
function Person(name, age){
    this.name = name;
    this.age = age;
}

function Student(score){
    this.score = score;
}

Student.prototype = new Person('李明',22);
var s = new Student(99);

console.log(s instanceof Student);  //true
console.log(s instanceof Person);  //true
console.log(s instanceof Object);  //true

```
{%asset_img proto_link.png%}


手绘原型链：
[https://blog.csdn.net/Picking_up_stones/article/details/70050086](https://blog.csdn.net/Picking_up_stones/article/details/70050086)

原型链是什么？
原型链是一种机制，指的是JavaScript每个对象包括原型对象都有一个内置的[[proto]]属性指向创建它的函数对象的原型对象，直到指向Object对象为止。

为什么需要原型链？
继续和共享
 #### typeof 和instanceof原理。
 1. instanceof原理：
 ```js
 //设 L instanceof R 
//通过判断
 L.__proto__.__proto__ ..... === R.prototype ？
//最终返回true or false
```

2. typeof原理：
在 javascript 的最初版本中，使用的 32 位系统，为了性能考虑使用低位存储了变量的类型信息：

    000：对象
    1：整数
    010：浮点数
    100：字符串
    110：布尔
    有 2 个值比较特殊：
    undefined：用 - （−2^30）表示。
    null：对应机器码的 NULL 指针，一般是全零。
```js
typeof null === 'object';
/*这样一来，null 就出了一个 bug。根据 type tags 信息，低位是 000，因此 null 被判断成了一个对象。这就是为什么 typeof null 的返回值是 object。*/
null instanceof Object === false
```
而
```js
null instanceof null
```
会抛出异常：``Uncaught TypeError: Right-hand side of 'instanceof' is not an object``

判断类型的代码是这么写:undefined->对象->数字->....

#### 指出JS的宿主对象和原生对象的区别，为什么扩展JS内置对象不是好的做法？有哪些内置对象和内置函数？
原生对象：在运行过程中动态创建的对象，需要new

内置对象：在引擎初始化阶段就被创建好的对象。而ECMA-262 只定义了两个内置对象，即 Global 和 Math 。内置对象是原生对象的一种。

宿主对象：ECMAScript官方未定义的对象都属于宿主对象。包含两大类，一个是宿主提供，一个是自定义类对象

为什么扩展JS内置对象不是好的做法：
因为你不知道哪一天浏览器或javascript本身就会实现这个方法，而且和你扩展的实现有不一致的表现。到时候你的javascript代码可能已经在无数个页面中执行了数年，而浏览器的实现导致所有使用扩展原型的代码都崩溃了。。。


#### js动画和css3动画比较
CSS动画
优点： 

(1)浏览器可以对动画进行优化。

    1、 浏览器使用与 requestAnimationFrame 类似的机制，requestAnimationFrame比起setTimeout，setInterval设置动画的优势主要是  
        1)requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成,并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率,一般来说,这个频率为每秒60帧。
        2)在隐藏或不可见的元素中requestAnimationFrame不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量。

    2、强制使用硬件加速 （通过 GPU 来提高动画性能）

(2)代码相对简单,性能调优方向固定，浏览器会对CSS3的动画做一些优化（比如专门新建一个图层用来跑动画）

(3)对于帧速表现不好的低版本浏览器，CSS3可以做到自然降级，而JS则需要撰写额外代码。

缺点：

　　1、 运行过程控制较弱,无法附加事件绑定回调函数。CSS动画只能暂停,不能在动画中寻找一个特定的时间点，不能在半路反转动画，不能变换时间尺度，不能在特定的位置添加回调函数或是绑定回放事件,无进度报告

 　  2、  代码冗长。想用 CSS 实现稍微复杂一点动画,最后CSS代码都会变得非常笨重。

 #### css3动画，transition和animation的区别，
1.  触发条件不同。transition通常和hover等事件配合使用，由事件触发。animation则和gif动态图差不多，立即播放。
2. 循环。 animation可以设定循环次数。 When triggered, a transition runs only once.You can make a transition loop by fiddling with the transitionEnd event, but that isn't particularly straightforward - especially when compared with animations.
>What About transition: all?
>You do not have to specify every property that you care about when using a transition. You could simplify your life by using the all value instead: transition: all .5s ease-in. I do not recommend this because you will take a performance hit. Your browser is now listening for a whole lotta properties as opposed to just a few that you know you will be modifiying. Unless you have a strong need to do this, I would recommend specifying each CSS property you wish to transition individually.

3. 精确性。 animation可以设定每一帧的样式和时间。tranistion 只能设定头尾。 animation中可以设置每一帧需要单独变化的样式属性， transition中所有样式属性都要一起变化。
4. 与javascript的交互。animation与js的交互不是很紧密。tranistion和js的结合更强大。js设定要变化的样式，transition负责动画效果。A transition only plays as a reaction to a CSS property that has changed

[https://www.kirupa.com/snippets/move_element_to_click_position.htm](https://www.kirupa.com/snippets/move_element_to_click_position.htm)


#### animation的属性，加速度，重力的模拟实现
[https://blog.csdn.net/drd_zsd123/article/details/80126260](https://blog.csdn.net/drd_zsd123/article/details/80126260)
[canvas实现](./canvas.html)

#### 使用``requestAnimationFrame``有什么好处？
浏览器可以优化并行的动画动作，更合理的重新排列动作序列，并把能够合并的动作放在一个渲染周期内完成，从而呈现出更流畅的动画效果。比如，通过requestAnimationFrame()，JS动画能够和CSS动画/变换或SVG SMIL动画同步发生。另外，如果在一个浏览器标签页里运行一个动画，当这个标签页不可见时，浏览器会暂停它，这会减少CPU，内存的压力，节省电池电量。
```js
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


// usage:
// instead of setInterval(render, 16) ....

(function animloop(){
  requestAnimFrame(animloop);
  render();
})();
// place the rAF *before* the render() to assure as close to
// 60fps with the setTimeout fallback.
```
#### 什么是“use strict”,好处和坏处
优点：
1. 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
2. 消除代码运行的一些不安全之处，保证代码运行的安全；
3. 提高编译器效率，增加运行速度；
4. 为未来新版本的Javascript做好铺垫。
注：经过测试 IE6,7,8,9 均不支持严格模式。

缺点：现在网站的 JS 都会进行压缩，一些文件用了严格模式，而另一些没有。这时这些本来是严格模式的文件，被 merge 后，这个串就到了文件的中间，不仅没有指示严格模式，反而在压缩后浪费了字节

。

 #### 如何实现图片滚动懒加载
 通俗的讲就是：当访问一个页面的时候，先把img元素或是其他元素的背景图片路径替换成一张大小为1*1px图片的路径（这样就只需请求一次），只有当图片出现在浏览器的可视区域内时，才设置图片正真的路径，让图片显示出来。这就是图片懒加载。
如何获取正真的路径，这个简单，现在正真的路径存在元素的``data-url``（这个名字起个自己认识好记的就行）属性里，要用的时候就取出来，再设置；
[https://www.cnblogs.com/flyromance/p/5042187.html](https://www.cnblogs.com/flyromance/p/5042187.html)



 JS如何实现重载和多态
轮播图的实现，以及轮播图组件开发，轮播10000张图片过程 

document load和document DOMContentLoaded两个事件的区别


常用的数组api，字符串api
原生事件绑定（跨浏览器），dom0和dom2的区别？


web端cookie的设置和获取
setTimeout和promise的执行顺序

navigator对象，location和history

手指点击可以触控的屏幕时，是什么事件？
JS的API有哪些应用到了函数柯里化的实现？(bind函数和数组的reduce方法用到了函数柯里化。)


 手写Ajax，XMLHttpRequest
 实现继承的多种方式和优缺点
 深拷贝
 编写一个通用的事件监听函数
 八大排序算法
 websocket的工作原理和机制