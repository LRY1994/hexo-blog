---
title: 2018-5月总结
date:   2018/5/1
categories: 
    - 学习
    - 每月总结
---

### 发现三个很厉害的库
``htmlDocx`` (将html代码导出为doc文件)'http://evidenceprime.github.io/html-docx-js/build/html-docx.js'
``saveAs`(将浏览器内存中的doc文件保存至硬盘)'http://evidenceprime.github.io/html-docx-js/test/vendor/FileSaver.js'
``domtoimage``(将dom节点转化成为图片)'https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js'

domtoimage.toPng(dom); //转出来是base64
saveAs(htmlDocx.asBlob(html), filename); 

主要这三个库方法
domtoimage.toPng
saveAs
htmlDocx.asBlob  

### Vue的router的push传递参数有没有不把参数展示在url中的传递方式？
```javascipt
const userId = 123
router.push({ name: 'user', params: { userId }})
// 路由设置 path 为：'/user/:userId'
// 跳转路径：'/user/123'

// 路由设置 path 为：'/user'
// 跳转路径：'/user'
// this.$route.params.userId 获取userId
```