---
title: 4月随笔
date:   2018/4/1
categories: 
    - 学习
    - 随笔笔记 
---

## 实现QQ弹窗 和QQ号为qqnum聊天
```html
<a target="_blank" :href="`http://wpa.qq.com/msgrd?v=3&uin=${qqnum}&site=qq&menu=yes`">
    <img border="0" :src="`http://wpa.qq.com/pa?p=2:1424314130:51`" alt="点击这里给我发消息" title="点击这里给我发消息"/>
</a>
```
### Vue全局过滤器也可以当函数使用

```javascript
this.$options.filters.dateformat
```