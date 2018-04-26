---
title: 2018-2随笔笔记
date:   2018/2/1
categories: 
    - 学习 
    - 随笔笔记
---

* Cache-Control
    no-cache: 告诉浏览器、缓存服务器，不管本地副本是否过期，使用资源副本前，一定要到源服务器进行副本有效性校验。
    must-revalidate：告诉浏览器、缓存服务器，本地副本过期前，可以使用本地副本；本地副本一旦过期，必须去源服务器进行有效性校验。
    max-age： 指缓存资源的缓存时间比指定的值小，那么客户端就接受缓存资源，且缓存服务器不对资源有效性进行再次确认

* CSS像素是web编程的概念,是相对的而不是绝对的单位. 用户的缩放比会影响单位CSS像素点对应的实际物理像素的多少

* 使用Flexible实现手淘H5页面的终端适配
   [https://github.com/amfe/article/issues/17](https://github.com/amfe/article/issues/17)


* 异步脚本禁止使用document.write()
  延迟脚本禁止使用document.write()

* 火狐和IE下href="javascript:void(0) 会弹出空白页

    本来javascript:void(0);的用处是不用整体刷新网页且返回一个空值，但这儿由于DOM本身的冒泡事件所以会最后执行HREF属性内的javascript:void(0);导致执行函数返回了一个空值，所以覆盖掉了前面正常执行函数所返回的值引起的错误。

    一般情况下，IE会先运行DOM本身绑定的事件，如ONCLICK;如果没有阻止冒泡，则会顺序执行HREF属性。如果想正确运行，可以在前面用RETURN FALSE终止冒泡，例如：
    ```
    <a target="_blank" class="prev" onclick="return false;"   href="javascript:void(0);"></a>
    ```
    或者直接删去也行，如：
    ```
    <a target="_blank"  class="prev" ></a>
    ```
    但是后者hover的时候没有手势的pointer

* vue2父组件传递props异步数据到子组件，获取到的是undefined.

    解决方法[参考链接](http://www.jb51.net/article/117447.htm)

    1. 最简单的解决方法：使用v-if
    2. 子组件使用watch来监听父组件改变的prop，使用methods来代替created
    3. 子组件watch computed data 相结合，有点麻烦
    4. 使用emit，on，bus相结合（使用了bus库）
    5. vuex结合computed、mapState或者合computed、mapGetters

* 对象的属性名称可以是变量吗？

    可以，运用方括号法设置就是。如
    ```
    var a = "name";
    var b = 10;
    var obj = {};
    obj[a] = b;
    ```

* 后台给的服务链接直接插入html中img的src里，修改图片之后，因为src的内容一直都是后台服务链接，是个不变的值，所以不会重新去请求，图    片会一直不变。如果刷新页面这个链接返回的图片会改变，为了做到点击图片只重载这个src而整个页面不刷新，采用的方法是在后面加上          Math.random()，例如 
    ```
    `http:${this.baseURL}gw/app.get.logo?tenantId=${this.tenantId}&appId=${this.appId}?`+Math.random();
    ```

* 扩展运算符可以用于数组深拷贝
    ```
    var arr2 = arr;
    var arr3 = [...arr];
    console.log(arr===arr2); //true, 说明arr和arr2指向同一个数组
    console.log(arr===arr3); //false, 说明arr3和arr指向不同数组
    ```

* 数字类型的验证需要在 v-model 处加上 .number 的修饰符，这是 Vue 自身提供的用于将绑定值转化为 number 类型的修饰符。              v-model.number只会截取数字部分，比如100ttt只会取前面的100。做修改操作的时候这种情况用自定义validator解决