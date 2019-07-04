---
title: 2018.10-2018.11总结 
date:   2018/10/18
categories: 
    - 学习
tags:
    - 日常记录 
---
webpack-dev-server启动并不是访问vue项目内某个文件, src/assets内的文件是不能在index.html直接引用的, 必须经过loader处理路径

plublic里放置的文件是不经过 webpack 处理的。在 index.html 里引用的时候，直接就是 ``<script src="/plublic/oidc-client.js"></script>。``

### scss export
```scss

 $title-width: 100;

:export {
  titleWidth: $title-width;
}
```
### ie margin-top负值无效

https://www.cnblogs.com/chaozhang/p/4711282.html

加上display:inline-block

### inline-block的元素设置over-flow:hidden会意外地增加元素总体高度，
用vertical-align:bottom解决

### ie中img被拉伸
只要设置img为 height:auto，width:auto，就不会出现这种情况了

### vue 路由query变化监测不到meta的
这样使用query,路由变化，meta并没有变化
```js
{
    name: 'order.list.1',
    path: '/order/list/status=1',
    component: list,
    meta: {
      domain: 'order',
      key: 'order-list-1',
    },
  },

  {
    name: 'order.list.2',
    path: '/order/list/status=2',
    component: list,
    meta: {
      domain: 'order',
      key: 'order-list-2',
    },
  },
```
使用params是可以的
```js
{
    name: 'order.list.1',
    path: '/order/list/1',
    component: list,
    meta: {
      domain: 'order',
      key: 'order-list-1',
    },
  },

  {
    name: 'order.list.2',
    path: '/order/list/2',
    component: list,
    meta: {
      domain: 'order',
      key: 'order-list-2',
    },
  },
```

使用函数模式也可以

```js
const dict = {
  1: 'order-list-1',
  2: 'order-list-2',
  default: 'order-list',
};


export default{
  name: 'order',
  path: '/order',
  redirect: {
    name: 'order.list',
  },
  component: Container,
  children: [{
    name: 'order.list',
    path: '/order/list',
    component: list,
    meta: {
      domain: 'order',
      key(route) {
        return dict[route.query.status || 'default'];
      },
    },
  },
```
### vue 指令使用模板，不再用template了，用el
```js
//Marquee.js
import Marquee from './Marquee.vue';
const Tpl = Vue.extend(Marquee);//这个好漂亮
const Plugin = {
  install(vue, options) {
        Vue.directive('marquee', {
           inserted(el, binding, vnode) {
              const mask = new Tpl({
                  el: document.createElement('div'),
                  data: { name: binding.value }
              });
              el.appendChild(mask.$el);
           })
     }   
  }
}
export default Plugin;
//main.js
import Marquee from './Marquee.js'
Vue.use(Marquee)
```