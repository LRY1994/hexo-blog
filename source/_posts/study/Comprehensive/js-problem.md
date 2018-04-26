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

[44个Javascript变态题解析](https://blog.csdn.net/ceshi986745/article/details/51698893)
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

JS的基础类型Number，遵循 IEEE 754 规范，采用双精度存储（double precision），占用 64 bit。
1位用来表示符号位，
11位用来表示指数，
52位表示尾数

Math.pow(2, 53) == 9007199254740992 是可以表示的最大值. 

```javascript
Number.isSafeInteger(111111111111111110000)//false
```
* 3
```javascript
[3,2,1].reduce(Math.pow)//9
```
表达式等价于 Math.pow(3, 2) => 9; Math.pow(9, 1) =>9

* 4
```javascript
var arr = [0,1,2];
arr[10]=10;
arr.filter(function(x){return x==undefined});//[]
```
首先检查了这个索引值是不是数组的一个属性, 那么我们测试一下.
```javascript
0 in ary; => true
3 in ary; => false
10 in ary; => true
```
从 3 - 9 都是没有初始化的'坑'!, 这些索引并不存在与数组中. 在 array 的函数调用的时候是会``跳过``这些'坑'的,所以它不知道是不是undefined

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

* 7 重点
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


{% asset_img 1.png %}
{% asset_img 2.png %}
{% asset_img 3.png %}
{% asset_img 4.png %}
{% asset_img 5.png %}
{% asset_img 6.png %}
{% asset_img 7.png %}

什么是普通对象？？？
{% asset_img 8.png %}
{% asset_img 9.png %}

为什么result先输出？？？？
{% asset_img 10.png %}

## 你知道为什么会有 Generator 吗?
[你知道为什么会有 Generator 吗](https://juejin.im/post/5adae8246fb9a07aa541e150)

## 深度克隆
1. ``const newObj = JSON.parse(JSON.stringify(oldObj));``只适用于基础类型
2. 实现对函数 、RegExp等特殊对象的克隆，保留对象的constructor,对象有循环引用也不会报错
```javascript
const type = (obj)=> {
	var toString = Object.prototype.toString;
	var map = {
	    '[object Boolean]'  : 'boolean', 
	    '[object Number]'   : 'number', 
	    '[object String]'   : 'string', 
	    '[object Function]' : 'function', 
	    '[object Array]'    : 'array', 
	    '[object Date]'     : 'date', 
	    '[object RegExp]'   : 'regExp', 
	    '[object Undefined]': 'undefined',
	    '[object Null]'     : 'null', 
        '[object Object]'   : 'object',
        '[object Symbol]'   : 'symbol'
	};
	if(obj instanceof Element) {//因为对不同标签，toString会返回对应不同标签的构造函数
        return 'element';
	}
	return map[toString.call(obj)];
}

const getRegExp = re => {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
};
/**
* deep clone
* @param  {[type]} parent object 需要进行克隆的对象
* @return {[type]}        深克隆后的对象
*/
const deepClone = oldObj => {
  // 维护两个储存循环引用的数组
  const oldObjArr = [];
  const newObjArr = [];

  const clone = oldObj => {     
    let newObj, proto;
    const type = type(oldObj);
    switch(type){
        case 'boolean':
        case 'number':
        case 'string':
        case 'null':
        case 'undefined':
        case 'function':{
            return oldObj;
            break;
        }
        case 'symbol':{
            return Symbol(Symbol.keyFor(oldObj).toString());
            break;
        }
        case 'array':{
            newObj = [];
            break;
        }
        case 'regExp':{
            newObj = new RegExp(oldObj.source, getRegExp(oldObj));
            if (oldObj.lastIndex) newObj.lastIndex = oldObj.lastIndex;
            break;
        }
        case 'date':{
            newObj = new Date(oldObj.getTime());            
            break;
        }
        //case 'obj':
        default:{
            // 处理对象原型
            proto = Object.getPrototypeOf(oldObj);
            // 利用Object.create切断原型链
            newObj = Object.create(proto);
            break;
        }
   }

   // 处理循环引用
   const index = oldObjArr.indexOf(oldObj);
   if (index != -1) {// 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象    
     return newObjArr[index];
   }

   oldObjArr.push(oldObj);
   newObjArr.push(newObj);

   for (let i in oldObj) {// 递归     
     newObj[i] = _clone(oldObj[i]);
   }
   return newObj;
 };
 return clone(oldObj);
}
```

### toString和typeof区别

之前一直不知道这两个有什么区别，所以这次好好研究一下，探索出来这样的关系
 {% asset_img toString_typeof.png %}


下面是一些测试例子
```javascript
var toString = Object.prototype.toString;

let a= true;
console.log(typeof(a));//boolean
console.log(toString.call(a));//[object Boolean]

a=new Boolean(true);
console.log(typeof(a));//object 
console.log(toString.call(a));//[object Boolean]


a=new RegExp('ab+c', 'i');
console.log(a.source)//ab+c
console.log(a.global)//false
console.log(a.ignoreCase)//true
console.log(a.multiline)//false
console.log(a.lastIndex)//0

console.log(typeof(a));//object
console.log(toString.call(a));//[object RegExp]


function say() {
  console.log('hi');
};
a=say;
console.log(typeof(a));//function
console.log(toString.call(a));//[object Function]

a=[1,2,3,4,5];
(let i in a){
console.log(a[i])
}
console.log(typeof(a));//object
console.log(toString.call(a));//[object Array]

a=Symbol('foo');
console.log(typeof(a));//symbol
console.log(toString.call(a));//[object Symbol]


```