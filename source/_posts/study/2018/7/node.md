---
title: node.js
date:   2018/7/5
categories: 
    - 学习
    - 专题
---

```javascript
server = new HttpServer()

server.on('request',function(req,res){})
//上面一句相当于=>
server.listen(3000)
```


* url网址解析

    ``url.parse(string,bool,bool)`` URL字符串=>解析对象

    ``url.format(obj)`` 解析对象=>URL

    ``url.resolve(a,b)`` 连接


* querystring 参数处理小利器

    ``querystring.parse`` 字符串=>JSON 反序列化

    ``querystring.stringify`` JSON=>字符串 序列化

    ``querystring.escape`` 编码转义

    ``querystring.unescape``


* 服务端
```javascript
http.createServer(function(ServerRequest, ServerResponse){
    //监听
    ServerRequest.on('data',function(chunk){})
    ServerRequest.on('end',function(){})
    ServerRequest.on('close',function(){})
    //响应
    ServerResponse.writeHead()
    ServerResponse.write()
    ServerResponse.end()
})
```

* 客户端
```javascript
options = {
    host:'',
    port:'',
    method:'',
    path:'',
    headers:''
}
var clientRequest = http.request(options,function(clientResponse){
    clientResponse.setEncoding()
    clientResponse.pause()
    clientResponse.resume()
    clientResponse.on('data',function(data){})
    clientResponse.on('end',function(){})
    clientResponse.on('close',function(){})

})

clientRequest.write(请求体)
clientRequest.end()
clientRequest.abort()
clientRequest.setTimeout()
clientRequest.setNoDelay()
```

幂等 ：重复请求多次与请求一次的效果是一样的。

Node模块分为**核心模块**和**文件模块**

文件模块没有扩展名仕，会按照顺序优先加上后缀 .js=>.json=>.ndoe

**文件加载方式**有两种
> 按路径加载

    require以'/'开头的，以绝对路径方式加载
    require以'./'或'../'开头的，以相对路径加载
>查找node_modules文件夹

    在当前目录下的node_modules中查找=>
    父目录node_modules找=>
    上一层目录的node_modules找。。。。。
    一层一层向上

为了充分利用浏览器缓存，提高页面的加载速度，在生产环境中常常会向静态文件的文件名添加MD5戳，即使用bundle_[hash].js,而不是bundle.js。
这里的[hash]会在构建时被盖chunk内容的MD5结果替换，以实现内容不变则文件名不变的效果。

* DNS查找过程
1. 浏览器搜索自身的DNS缓存
2. 搜索操作系统自身的DNS缓存
3. 读取本地的HOST文件
4. 浏览器发起一个DNS系统调用
5. 宽带运营商服务器查看本身缓存
6. 运营商服务器发起迭代DNS解析的请求



