---
title: js题摘录
date:   2018/12/12
categories: 
    - 学习
    - 专题笔记 
tags:
    - 面试
    - js 
---
## JS运行机制
执行栈,任务队列

``process.nextTick``方法可以在当前"执行栈"的尾部----下一次Event Loop（主线程读取"任务队列"）之前----触发回调函数

``setImmediate``方法则是在当前"任务队列"的尾部添加事件

``process.nextTick``指定的回调函数是在本次"事件循环"触发，而setImmediate指定的是在下次"事件循环"触发

``setTimeout(fn,0)``表示当前代码执行完（执行栈清空）以后，立即执行（0毫秒间隔）指定的回调函数。

``Promise``，里面的函数是直接执行的.

``Promise`` 的 then 应当会放到当前 "执行栈"的尾部

{% asset_img js_zhan_duilie.jpg js堆栈 %}

* 1
```javascript
let a=[1,2,3];
let b = a.map(n=>{n=n+1});
let c = a.map(n=>n=n+1);
b// [undefined, undefined, undefined]
c// [2, 3, 4]
```
改成
```javascript
let b = a.map(n => {n = n + 1;return n;});
```
原因
```javascript
(a,b,c) => 表达式（单一）相当于
(a,b,c)=>{ return 表达式}
```

* 2
```javascript
var a = 111111111111111110000;
b=111;
console.info(a+b);//111111111111111110000
```

* 3
```javascript
[3,2,1].reduce(Math.pow)//9
```

* 4
```javascript
var arr = [0,1,2];
arr[10]=10;
arr.filter(function(x){return x==undefined});//[]
```

* 5
```javascript
var obj = {
    foo:'bar',
    func:function(){
        var self = this;
        console.log(this.foo);
        console.log(self.foo);
        (function(){
            console.log(this.foo);
            console.log(self.foo);
        }())
    }
}
obj.func();
```
输出
```
bar
bar
undefined
bar
```

* 6
```javascript
var f = function g(){return 23;}
typeof g();
```
输出
```javascript
//Chrome:
typeof g() //无输出响应
typeof g   //undefined
typeof f() //number
typeof f   //function

//Firfox
typeof g() //无输出响应
typeof g   //undefined
typeof f() //number
typeof f   //function

//IE8
typeof g() //number
typeof g   //function
typeof f() //number
typeof f   //function
```

* 7
```javascript
add(2, 5); // 7
add(2)(5); // 7
function addto(){
    var length = arguments.length;
    var sum = 0;
    for(var i = 0;i<length;i++){
        sum += arguments[i]
    }
    return sum;
}

function add(){
    var value = addto.apply(add,arguments);
    var helper = function(next){
        typeof next == "number" ? value+=next:value;
        return helper
    }
    helper.valueOf = function(){
        return value;
    }
    return helper;
}

```
chrome下输出
{% asset_img 7.png %}

所以，存在对象声明，结果一样；对象不存在会js异常

* 8
```javascript
void 0//undefined
void(0)//undefined
```

* 9
```javascript
this;//window
var obj = {
    func : function(){return this;}
};
obj.func();//obj
```
* 抛出的异常找最近的catch
```javascript
try{
    try{
        throw new Error('oops');
    }
    finally{
        console.log('finally');
    }catch(ex){
        console.error('outer',ex.message);
    }
}
```
输出 finally outer oops

* 抛出的异常只需处理一次
```javascript
try{
    try{
        throw new Error('oops')
    }
    catch(ex){
        console.error('inner',ex.message);
    }finally{
        console.log('finally')
    }
}catch(ex){
    console.error('outer',ex.message)
}
}
```
输出 inner oops finally

* 12
```javascript
fd();//true
function fd(){
    //do sth
    return true;
}
```
```javascript
fe();//TypeError
var fe = function(){
    //do sth
}
```
* 13
```javascript
var myarr2 = new 
Array("80","16","50","6","100","1");
document.write(myarr2.sort());//1,100,16,50,6,80
```
原因 ：因为按unicode码顺序排列。如要实现排序，就必须手写排序函数
