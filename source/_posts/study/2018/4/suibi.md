---
title: 2018-4总结
date:   2018/4/1
categories: 
    - 学习
tags:
    - 日常记录 
---

### 实现QQ弹窗 和QQ号为qqnum聊天
```html
<a target="_blank" :href="`http://wpa.qq.com/msgrd?v=3&uin=${qqnum}&site=qq&menu=yes`">
    <img border="0" :src="`http://wpa.qq.com/pa?p=2:1424314130:51`" alt="点击这里给我发消息" title="点击这里给我发消息"/>
</a>
```
### Vue全局过滤器也可以当函数使用

```javascript
this.$options.filters.dateformat
```

### 字符串转义问题
本地字符串不会自己转义，所以本地需要写成 ``\\d``

后台请求返回的字符串会自动帮你转义，所以在后台数据库只需要写成``\d``


### 如何解决vue父组件模板slot到孙子组件中去
    >每一个被继承的组件都需要有slot;

[参考链接](https://segmentfault.com/q/1010000012141592)

### 记录一下第一次使用async ,await ,解决了困扰我一早上的异步问题,赞！！！
```javascript
   //获取文件信息
    getFileInfo(item){
        let fileId= item.value;
        const downloadLink =`/gw/tenant/worksheet/extend/Download?worksheetInfoId=${item.worksheetInfoId}&blobId=offer.info`;
        return new Promise((resolve,reject)=>{
            if(fileId == 'undefined') resolve(null);
            this._$http.tenant.offerExtendGetFileInfo({fileId: fileId})
            .then(res=>{ 
                res={...res,downloadLink};
                resolve(res)
            }) 
        })           
    },
    //获取文件信息
    fileGetter: async function(item) {           
        const fileInfo = await this.getFileInfo(item);
        return Promise.resolve(fileInfo);         
    },
```

### 自定义指令---解决跟dom有关的问题
最大的用处就是可以引用一些第三方的代码插入到Vue项目中，比如有一个操作dom的函数：
```javascript
//当然，真实情况第三方的代码要复杂的多
function changeColor(dom){
    dom.style.backgroundColor = "red";
}
```
我们可以注册一个全局的指令来为需要执行changeColor方法的dom提供指令：
```javascript
Vue.directives('color',{
    bind:function(el){
        changeColor(el)
    }
})
```
这样，如果需要这个dom改变颜色的话，只需要这样即可：
``<div v-color>改变颜色</div>``

当日常开发遇到跟dom有关的问题却一筹莫展时，可以想想自定义指令是否有功能可以解决为题

### 父组件给子组件传值，这个值还要从子组件传给它的子组件【inheritAttrs】和【attrs】
直接一层一层传prop非常麻烦.
Vue提供了【inheritAttrs】和【attrs】两个功能来解决这样的问题
```
//父组件
<template>
   <div>
     <child :text="text"  :count="count"></child>
   </div>
</template>

<script>
    export default{
        data(){
            return {
                text:"父组件的值"，
                count:123456，
            }
        }
    }
</script>
```

```
//子组件
<template>
    <div>{{text}}</div>
</template>
<script>
    export default{
        props:["text"]
    }
</script>
```

这里父组件的count属性仅仅挂在子组件上，并没有使用。此时我们打开浏览器，可以看到子组件的dom上显示的展示了``<div class='child' count="123456"></div>``。



此时，我们可以通过设置inheritAttrs: false来取消这种默认行为：
```javascript
data(){
  return{
    ......   
  }  
}

inheritAttrs: false,
mounted(){
　　console.log(this.$attrs); //{count:123456}
}
```
这时再看dom上就没有count属性了。然后，我还打印了this.$attrs的值，值为一个包含着count键值对的Object。
也就是说，``父组件没有props的属性值会被保存在一个名为$attrs中供子组件使用``，然而这并没有解决开头子组件的子组件获取值的问题。
别急，我们只需要在子组件上加个东西就可以了：
```
<template>
    <div class="child">
        <my-child v-bind="$attrs"></my-child>
    </div>
</template>
```
这样，子组件的子组件也可以获取这个值了。

### provide / inject -更适合用来做父组件给后代组件传值，
provide/inject方法要比inheritAttrs/attrs更适合用来做父组件给子组件或孙组件传值，
[文档的链接](https://cn.vuejs.org/v2/api/#provide-inject)
```
//父组件使用provide
<template>  
    <div class="parent">     
         <child-component></child-component>   
    </div>  
</template>

<script>
export default {  
    ......  
    provide: { parent: "父组件的值"},  
    components:{    child-component,  }, 
     ......
</script>


//此时可以在子组件通过这种方式获取父组件中“parent”的值：
//子组件中
export default {  
    mounted(){      
        console.log(this.parent); //"父组件的值"  
    },  
    inject: ['parent'],
}
```
### vue源码研读
[手拉手带你过一遍vue部分源码](https://juejin.im/post/5adff30f518825672d33d596)

[当面试官问你Vue响应式原理，你可以这么回答他](https://juejin.im/post/5adf0085518825673123da9a)

[如何解释vue的生命周期才能令面试官满意？](https://juejin.im/post/5ad10800f265da23826e681e)

在使用.vue文件开发的过程当中，我们在里面写了template模板，在经过了vue-loader的处理之后，就变成了render function，最终放到了vue-loader解析过的文件里面。这样做有什么好处呢？原因是由于在解析template变成render function的过程，是一个非常耗时的过程，vue-loader帮我们处理了这些内容之后，当我们在页面上执行vue代码的时候，效率会变得更高。

Vue为我们提供了renderError方法，这个方法只有在开发的时候它才会被调用，在正式打包上线的过程当中，它是不会被调用的。它主要是帮助我们调试render里面的一些错误。
```javascript
renderError (h, err) {
  return h('div', {}, err.stack)
}
```
有且只有当render方法里面报错了，才会执行renderError方法。
所以我们主动让render函数报个错：
```javascript
render (h) {
  throw new TypeError('render error')
}
```

还有一点，renderError只有在``本组件``的render方法报错的情况下它才会被调用。
