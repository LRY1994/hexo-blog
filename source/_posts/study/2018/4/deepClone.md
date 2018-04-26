---
title: 深度克隆
date:   2018/4/26
categories: 
    - 学习
    - 专题笔记 
---

## 第一种方法（只适用于基础类型）
 ``const newObj = JSON.parse(JSON.stringify(oldObj));``


## 第二种方法

实现对函数 、RegExp等特殊对象的克隆，保留对象的constructor,对象有循环引用也不会报错

参考 [https://juejin.im/post/5abb55ee6fb9a028e33b7e0a](https://juejin.im/post/5abb55ee6fb9a028e33b7e0a)

```javascript
const getType = (obj)=> {
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

    const type = getType(oldObj);

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

   for (let i in oldObj) {// 递归   ,这里数组和对象都可以用forin语句，但是数组使用forin会有一个问题，具体看最下面。但是这里不会影响  
     newObj[i] = clone(oldObj[i]);
   }

   return newObj;
 };


 return clone(oldObj);
}

/*
测试通过
*/
function person(pname) {
    this.name = pname;
}
  
const Messi = new person('Messi');

function say() {
    console.log('hi');
};
  
const oldObj = {
    a: say,
    b: new Array(1),
    c: new RegExp('ab+c', 'i'),
    d: Messi
  };
  
  const newObj = deepClone(oldObj);
  
  console.log(newObj.a, oldObj.a); //[Function: say] [Function: say]
  console.log(newObj.b[0], oldObj.b[0]); // undefined undefined
  console.log(newObj.c, oldObj.c); // /ab+c/i /ab+c/i
  console.log(newObj.d.constructor, oldObj.d.constructor); // [Function: person][Function: person]
  
```

## toString和typeof区别

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
## 数组使用for in
for in函数中变量以字符串的形式出现，这时候在函数中操作a[x+1]的话是无效的，x+1会进行字符串拼接。
```javascript
var a=[5,4,3,2,1];
        var x=0;
        console.log(typeof x);//number
        for (x in a) {
            console.log("a["+x+"]: "+a[x]);
            console.log(typeof x);//string
        }
        console.log(x);//4
        console.log(typeof x);//string
//output:
//        a[0]: 5
//        a[1]: 4
//        a[2]: 3
//        a[3]: 2
//        a[4]: 1
```