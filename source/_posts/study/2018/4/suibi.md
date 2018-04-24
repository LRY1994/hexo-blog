---
title: 4月随笔
date:   2018/4/1
categories: 
    - 学习
    - 随笔笔记 
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
本地字符串不会自己转义，所以本地需要写成 "\\d"

后台请求返回的字符串会自动帮你转义，所以在后台数据库只需要写成"\d"


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