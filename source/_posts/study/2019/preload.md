---
title: 图片预加载探究 
date:  2019/4/16
categories: 
    - 学习
tags:
    - 专题探究 
---

    /**
     * 预加载
     * @param {Array} dataList  预加载数据
     * @param {Array} attrArray 预加载属性，可选
     */
    export function  preLoad(dataList,attrList){
      //若有指定对象属性
      let imgList = [];
      if(attrList){
        dataList.forEach(element => {
          attrList.forEach(attr=>{
            if(element[attr]){
              const img = new Image();
              img.src = element[attr];
              imgList.push(img);
    
            } 
          })
        });
      }else{
        dataList.forEach(element => { 
          const img = new Image();
          img.src = element;
          imgList.push(img);       
        });
      }
      
      return imgList;
    }
  

**测试浏览器：chrome、firefox**
------------------------

> 在Firefox下并没有from memory cache以及from disk cache的状态展现 相同的资源在chrome下是from
> disk/memory cache，但是Firefox统统是304状态码
> 即Firefox下会缓存资源，但是每次都会请求服务器对比当前缓存是否更改，chrome不请求服务器，直接拿过来用

> 200 OK (from disk cache) 是浏览器没有跟服务器确认， 就是它直接用浏览器缓存。 304
> 是浏览器和服务器确认了一次缓存有效性，再用的缓存。客户端和服务器端只需要传输很少的数据量来做文件的校验，如果文件没有修改过，则不需要返回全量的数据。能够节省大量的网络带宽，并减少了页面的渲染时间。


图片img的预加载
========

方法一:直接用src进行预加载,但不保存
----------------------------

     <img :src="data[current].imagePath">
     mounted() {  
         preLoad(this.data,['imagePath']);
    }

**结果：**

 1. 谷歌 切换图片速度快，确实有预加载. 初次 200  disk cache。
 
    切换没有发XHR，发了Img。200 OK (from disk cache) 是浏览器没有跟服务器确认，即直接用浏览器缓存。
 


 2. 火狐切换图片速度慢，并没有预加载 初次，没有“已缓存”标识。
     
    第一次切换,还是发了请求
 
    第二次切换，正常没有请求（默认情况下状态码为200的响应可以被缓存）。
    所以火狐预加载并没有成功。

-------------
方法二： 把预加载的挂载到data上（最好）
---------------------

**结果：**火狐、谷歌表现一致，都切换较快，没有发请求

    <div ref="solution-img"></div>
    mounted() {    
        this.preLoadImg = preLoad(this.data,['bgimagePath']);
    }
    methods: {
        changeActive(index) {
          this.current = index;
          let dom = this.$refs['solution-img'];
          if(dom.childNodes.length > 0) dom.removeChild(dom.childNodes[0]);
          dom.appendChild(this.preLoadImg[index]);
        }
    
      },

背景图片的预加载
========

**不做任何处理结果**：第一次请求返回200。第一次加载后都是304

-------------
方法一 ：使用css预加载
---------------------------

    #preload-01 { background:  url('~@/assets/img/market/icon-00.png') no-repeat -9999px -9999px; }    
    #preload-02 { background:  url('~@/assets/img/market/icon-01.png') no-repeat -9999px -9999px; }    

**结果：** 和不处理表现一致。初次加载也没有请求这些图片。

方法二：src预加载，但不保存
---------------------------------------

    {
     background-image: url('~@/assets/img/market/icon-10.png')  ;       
     &:hover{  background-image:url('~@/assets/img/market/icon-11.png')}
    }
    myPreLoad(){
          let images = [  
            require('@/assets/img/market/icon-10.png'),
            require('@/assets/img/market/icon-11.png'),
          ];
          preLoad(images);
   }
 
**结果：** 第一次hover 状态码304。之后切换没有发请求。火狐和谷歌表现一致，都是304



方法三：把预加载的挂载到data上
--------------------------------------------

    handleMouseenter(index){
    this.getDom(index).style.backgroundImage = "url(" +this.preLoadImage[index*2+1].src + ")";
    
    },
**结果：** 谷歌切换没有发请求。但是火狐会发请求，并返回304。


方法四：雪碧图（最好）
-----------

```
.backgroud-box{
  width: 137px ;
  height: 113px;
  background-image: url('./icon-1.png') ;    
  background-position-x:100%;
  background-position-y:0;
}
              
&:hover>.backgroud-box { background-position-y:-113px;} 
```

以上方法都会出现切换背景图片闪烁。用这个方法位移背景就不会。而且第一次加载就把图片下载下来了，切换也不会发请求，因为用的是同一张图

个人结论
========
1、因为
>在Firefox下并没有from memory cache以及from disk cache的状态展现。 相同的资源在chrome下是from
>disk/memory cache，但是Firefox统统是304状态码

所以火狐下每次操作到src或者url都要发出请求。

2、刚好<img>标签是一个Image对象，可以直接插入html，所以可以保存在data上缓存。304请求虽然也是可以缩短渲染时间，但是直接保存在data上可以免去一次请求，响应时间更快。

3、背景图片涉及到改变url，所以没办法直接用保存在data上的数据。

