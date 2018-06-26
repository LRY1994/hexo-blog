---
title: 6月随笔
date:   2018/6/1
categories: 
    - 学习
    - 随笔笔记 
---

## await/async最佳实践
#### 第一个例子
```javascript
(async ()=>{
    const pizzaPromise = selectPizza();//同时执行
    const drinkPromise = selectDrink();//同时执行
    await pizzaPromise;
    await drinkPromise;
    orderItems();
})()
```
或者
```javascript
(async ()=>{
    Promise.all([selectPizza(),selectDrink()]).then()
})
```
#### 第二个例子
```javascript
a(()=>{
    b();
}));

c((=>{
    d();
}))
```
改写为
```javascript
(async ()=>{
    await a();
    b();
})();

(async ()=>{
    await c();
    d();
})();
```
或者
```javascript
async function ab(){
    await a();
    b();
}
async function cd(){
    await c();
    d();
}
Promise.all([ab(),cd()]);
```

#### 使用keep-alive
在商品列表进入商品详情页之后
[vue中使用keepAlive组件缓存遇到的坑](https://www.cnblogs.com/nokelong/p/8124513.html)

###  for循环、while循环、do-while循环比for in 要快

### 字符串 拼接性能
比较下四中字符串拼接方法的性能：
```
A：str = str + 'a'+'b'
B:str += 'a' + 'b'
C: arr.join('')
D:str.concat('b','c')
```
☆ Chrome65上测试的是A优于B优于C优于D

### 总结一些常用的
1. 内容长短不固定的时候用min-height,而不要用height
2. 显示一行，多余的用省略号表示
    ```css
    .one-line{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
    }
    ```     
    最多显示2行，多余的用省略号表示
    ```css
    .two-line{     
        overflow: hidden;     
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
    }
    ```
3. 一般英文或者数字是默认不换行，所以要加上
    ```css
    word-break: break-all;
    ```
4. placeholder
```css
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #C6C6C6;
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #C6C6C6;
}

input:-ms-input-placeholder{
    color: #C6C6C6;
}

input::-webkit-input-placeholder{
    color: #C6C6C6;
}
```

### a标签里面不加download属性会下载下来一些莫名其妙的东西
```html
<a :href="file.worksheetFileId|url"  :download="file.fileName">{{file.fileName}}</a>
```
html5对a标签新增的download属性用于下载文件，简单的理解是a标签如果添加了download属性，那么点击它的时候就不会跳转，而是会触发浏览器下载文件。
那么我不加download属性会下载下来的东西是什么？？
docx后缀的word文档用解压软件打开就是这个目录结构

### $nextTick
Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。
$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 。

### router-link存在的问题是，手动输入改变url，下面路由没监听到
 vue-router在IE 11下有bug,a href 里的路径，点击地址栏发生了变化，页面并不跳转
vm._route.path并没有发生变化，和地址栏不同步
要加上这段代码修正下：
```javascript
function fixRouterIE(vm){
	//IE 11下
	if (
	  '-ms-scroll-limit' in document.documentElement.style && 
	  '-ms-ime-align' in document.documentElement.style
	) { 
	  window.addEventListener("hashchange", function(event) {
	    const currentPath = window.location.hash.slice(1);

	    if (vm._route.path !== currentPath) {
	      vm._router.push(currentPath)
	    }
	  }, false)
	}
}
```