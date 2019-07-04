---
title: 2018-6总结
date:   2018/6/1
categories: 
    - 学习
tags:
    - 日常记录 
---

### await/async最佳实践
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

### 使用keep-alive
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

答案：docx后缀的word文档用解压软件打开就是这个目录结构

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

### Array.prototype.sort 兼容
IE9-- Array.prototype.sort 不能根据 对象属性 做排序的遗憾 
```javascript
//方法1冒泡排序
var mySort = function(fn){
    if(typeof fn != 'function'){
        fn = function(a,b){
            return a-b;
        }
    }

    for(var i=0; i < this.length-1;i++){
        for(var j=i+1;j<this.length;j++){
            var t = this[i];
            if(fn(this[i],this[j]) > 0){
                this[i] = this[j];
                this[j] = t;
            }
        }
    }
    return this;
}

if(typeof Array.prototype.sorts!= 'fucntion'){
    Array.prototype.sorts = mySort;
    mySort = null;
}


//方法2 插入排序
var mySort = function(fn){
    if(typeof fn != 'function'){
        fn = function(a,b){
            return a-b;
        }
    }
    for(var i=1;i<this.length;i++){
        var t = this[i];
        var j = i-1;
        while(j >= 0 && fn(this[j],t)> 0 ){
            this[j+1] = this[j];
            j--;
        }
        this[j+1] = t;

    }
    return this;

}
if(typeof Array.prototype.sorts!= 'fucntion'){
    Array.prototype.sorts = mySort;
    mySort = null;
}
```
safari 不支持函数参数 
```javascript
!function(window){ 
    var ua = window.navigator.userAgent.toLowerCase(), 
    reg = /msie|applewebkit.+safari/; 
    if(reg.test(ua)){ 
        var _sort = Array.prototype.sort; 
        Array.prototype.sort = function(fn){ 
            if(!!fn && typeof fn === 'function'){ 
                if(this.length < 2) return this; 
                var i = 0, j = i + 1, l = this.length, tmp, r = false, t = 0; 
                for(; i < l; i++){ 
                    for(j = i + 1; j < l; j++){ 
                        t = fn.call(this, this[i], this[j]); 
                        r = (typeof t === 'number' ? t : 
                        !!t ? 1 : 0) > 0 
                        ? true : false; 
                        if(r){ 
                            tmp = this[i]; 
                            this[i] = this[j]; 
                            this[j] = tmp; 
                        } 
                    } 
                } 
                return this; 
            }else{ 
                return _sort.call(this); 
            } 
        }; 
    } 
}(window); 
```
[https://blog.csdn.net/lt3487928/article/details/53157817](https://blog.csdn.net/lt3487928/article/details/53157817)

[https://www.cnblogs.com/Alucelx/archive/2011/07/13/2104381.html](https://www.cnblogs.com/Alucelx/archive/2011/07/13/2104381.html)

### height设为100%要求父容器高度确定，否则无效。
### el-scrollbar滚动到容器底部
```
<el-scrollbar style="height:100%" ref="elscrollbar">
var div = this.$refs['elscrollbar'].$refs['wrap'];
this.$nextTick(() => {
    div.scrollTop = div.scrollHeight
})
```

### 怎么应用vertical-align，才能生效？
[怎么应用vertical-align，才能生效](https://blog.csdn.net/diudiu5201/article/details/54666809)
1. 父元素（inline-block\block）必须含有line-height（inline元素有无皆可），子元素（inline-block/inline元素）中的vertical-align才能起作用。
vertical-align不可继承，必须对子元素单独设置。

2. 当父元素没有设置line-height时，vertical-align只对行内元素的兄弟元素对齐有用，无法子元素居中对齐父元素。
设置了vertical-align:middle的子元素的中线与兄弟元素的基线对齐。若兄弟元素都设置该项，则居中对齐。


