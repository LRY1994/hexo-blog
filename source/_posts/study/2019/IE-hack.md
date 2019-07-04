---
title: IE hack  
date:  2019/4/16
categories: 
    - 学习
tags:
    - 专题探究
---
### document.getElementById（name不是id)取节点

在 IE6 IE7 IE8(Q) 中，支持以 document.getElementById(elementName) 的方式获取 A APPLET BUTTON FORM IFRAME IMG INPUT MAP OBJECT EMBED SELECT TEXTAREA 元素，而其他浏览器的任何元素均不支持该方式。


参考

[SD9001: IE6 IE7 IE8(Q) 中的 getElementById 方法能以 name 属性为参数获取某些元素](http://www.w3help.org/zh-cn/causes/SD9001)

### ie margin-top负值无效

https://www.cnblogs.com/chaozhang/p/4711282.html

加上display:inline-block

### ie中img被拉伸
只要设置img为 height:auto，width:auto，就不会出现这种情况了

### 火狐和IE下href="javascript:void(0) 会弹出空白页

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
### Array.prototype.sort 兼容
IE9-- Array.prototype.sort 不能根据 对象属性 做排序
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
### IE下 new Date("2016-07-01 08:00:00") == NaN
```js
new Date("2016-07-01 08:00:00");//IE下NaN
new Date("2016/07/01 08:00:00")//IE下OK
new Date("2016/07/01 08:00:00。0")//IE下NaN

```
``new Date("2016-07-01 08:00:00");``这种格式在ff,chrome,opera,safari等浏览器中没有问题的，而在IE内核浏览器（猎豹，360兼容模式）等会出现无效NaN的问题，

``new Date("2016-07-01 08:10:00").replace(/-/g,"/");``这样确保了任何一个浏览器都没有问题。


### IE hash有变化，但是页面无刷新

在页面框架内，使用location.href = href进行路由跳转时，IE9+环境会有问题，即hash有变化，但是页面无刷新。
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