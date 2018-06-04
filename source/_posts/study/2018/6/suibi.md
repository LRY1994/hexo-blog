---
title: 6月随笔
date:   2018/6/1
categories: 
    - 学习
    - 随笔笔记 
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
(asyn ()=>{
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