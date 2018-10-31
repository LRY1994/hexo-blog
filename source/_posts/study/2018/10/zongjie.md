---
title: 2018.10总结 
date:   2018/10/18
categories: 
    - 学习
    - 每月总结 
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