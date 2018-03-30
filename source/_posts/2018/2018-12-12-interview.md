---
title: 2018-12面试题摘录
date:   2018/12/12
categories: 
    - 面试 
tags:
    - 面试
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




[HTML5中37个最重要的技术点](https://www.tuicool.com/articles/v2aeMbn?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com)

[BAT 要的是什么样的前端实习生？](https://www.tuicool.com/articles/bInqieZ?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com)

[从 Chrome 源码看浏览器如何 layout 布局](http://www.codeceo.com/chrome-broswer-layout.html)

[从八道面试题看JavaScript DOM事件机制](https://segmentfault.com/a/1190000013894510)

[【前端性能优化】高性能JavaScript整理总结](https://segmentfault.com/a/1190000013963213)

[三分钟快速理解javascript内存管理](https://www.tuicool.com/articles/n22MNrA?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com)
[ES6小技巧](https://segmentfault.com/a/1190000013972464)
[优雅的 JavaScript 排序算法（ES6）](https://www.tuicool.com/articles/zANVnqM)