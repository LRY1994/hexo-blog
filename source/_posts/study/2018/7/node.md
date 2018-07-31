---
title: 《深入浅出node.js》、慕课网
date:   2018/7/5
categories: 
    - 学习
    - 专题
---
《深入浅出node.js》
===================
适合高并发、IO密集型、事件驱动


* 服务端
```javascript
http.createServer(function(ServerRequest, ServerResponse){
    //监听
    ServerRequest.on('data',function(chunk){})
    ServerRequest.on('end',function(){})
    ServerRequest.on('close',function(){})
    //响应
    ServerResponse.writeHead(200,{'Content-Type':'text/plain'})
    ServerResponse.write('hello')
    ServerResponse.end()
}).listen(3000)
```

* 客户端
```javascript
options = {
    host:'',
    hostname
    localAdrress
    socketPath
    auth
    agent
    keepAlive
    keepAliveMsecs
    port:'',
    method:'',
    path:'',
    headers:''
}
var clientRequest = http.request(options,function(clientResponse){
    clientResponse.setEncoding()
    clientResponse.pause()
    clientResponse.resume()
    clientResponse.on('data',function(data){
        console.log(Buffer.isBuffer(chunk));//true
        console.log(typeof chunk)//Object
    })//不断被触发,流
    clientResponse.on('end',function(){})
    clientResponse.on('close',function(){})

})

clientRequest.write(请求体)
clientRequest.end()
clientRequest.on('error',function(e){console.log(e.message)})
clientRequest.abort()
clientRequest.setTimeout()
clientRequest.setNoDelay()

```



## 文件加载方式
> 按路径加载

    require以'/'开头的，以绝对路径方式加载
    require以'./'或'../'开头的，以相对路径加载
>查找node_modules文件夹

    在当前目录下的node_modules中查找=>
    父目录node_modules找=>
    上一层目录的node_modules找。。。。。
    一层一层向上


## 异步I/O原理
事实上，javascript是单线程的，**Node自身其实是多线程的**，只是I/O线程使用的CPU较少。
除了用户代码无法并行执行外，所有的I/O（磁盘I/O和网络I/O等）都是可以并行执行的。

{% asset_img async-io.png %}

## 非I/O异步的方法
非I/O异步的方法：``setTimeout``,``setInterval``,``setImmediate``,``process.nextTick``

### ``setTimeout``,``setInterval``
调用``setTimeout``,``setInterval``创建的定时器会被插入到定时器观察者内部的一个红黑树里面。每次Tick执行，就从改红合数中迭代去除定时器对象，检查是否超过定时时间。如果超过，就形成一个事件，回调函数立即执行

{% asset_img setTimeout.png %}

### ``process.nextTick`` VS ``setTimeout(function(){},0)``
立即执行一个异步任务可以用``process.nextTick``。

``setTimeout(function(){},0)``需要动用到红黑树，创建定时器对象和迭代操作等操作，较浪费性能，复杂度为O(lg(n)。

nextTick只会将回调函数放入队列中，在下一轮Tick时取出执行，复杂度为O(1)。

### ``setImmediate``  VS ``process.nextTick``
``process.nextTick``优先级大于 ``setImmediate`` 。因为时间循环对观察者的检查是有先后顺序的，``process.nextTick``属于idle观察者，``setImmediate``属于check观察者。在每一个时间循环检查中，**观察者检查顺序：idle---I/O---check**

``process.nextTick``的回调保存在一个**数组**中。
 ``setImmediate``的回调保存在一个**链表**中

 ``process.nextTick``在一个事件循环中会将所有回调函数全部执行完。``setImmediate``每一个时间循环只会执行一个回调。

### 异常处理
对异步方法进行try/catch操作只可以捕获**当次**时间循环里面的异常

solution:Node在处理异常上形成一种约定，将异常作为回调函数的第一个实参传回。

阻塞代码调用setTimeout更好

### 异步编程解决方案
EventProxy 是对 events.EventEmitter 的补充，可以自由订阅组合事件

* EventProxy:
    all,
    tail,
    after,
    fail,
    done(传入all)

* promise/deferred

{% asset_img promise-deferred.png %}

* async

    series 只适合无依赖的串行执行，若当前一个的结果是后一个调用的输入的时候，就不能满足需求.

    parallel 并行

    waterfall 有依赖的串行执行

    auto 可以根据依赖关系自动分析，以最佳的顺序执行业务


## 其他
为了充分利用浏览器缓存，提高页面的加载速度，在生产环境中常常会向静态文件的文件名添加MD5戳，即使用bundle_[hash].js,而不是bundle.js。
这里的[hash]会在构建时被盖chunk内容的MD5结果替换，以实现内容不变则文件名不变的效果。

幂等 ：重复请求多次与请求一次的效果是一样的。

Node模块分为**核心模块**和**文件模块**

文件模块没有扩展名时，会按照顺序优先加上后缀 ``.js=>.json=>.ndoe``

* url网址解析

    ``url.parse(string,bool,bool)`` URL字符串=>解析对象

    ``url.format(obj)`` 解析对象=>URL

    ``url.resolve(a,b)`` 连接


* querystring 参数处理小利器

    ``querystring.parse`` 字符串=>JSON 反序列化

    ``querystring.stringify`` JSON=>字符串 序列化

    ``querystring.escape`` 编码转义

    ``querystring.unescape``

```javascript
server = new HttpServer()

server.on('request',function(req,res){})
//上面一句相当于=>
server.listen(3000)
```
事件驱动的实质：主循环+事件触发

慕课网
============================================

* DNS查找过程
1. 浏览器搜索自身的DNS缓存
2. 搜索操作系统自身的DNS缓存
3. 读取本地的HOST文件
4. 浏览器发起一个DNS系统调用
5. 宽带运营商服务器查看本身缓存
6. 运营商服务器发起迭代DNS解析的请求

### HTTP模块
    什么是回调？
    什么是同步/异步？
    什么是I/O？
    什么是单线程/多线程？
    什么是阻塞/非阻塞？
    什么是事件？
    什么是事件驱动？
    什么是基于事件驱动的回调？
    什么是事件循环？

### 上下文
```javascript
var pet = {
    speak :function(){
        console.log(this ===pet)//true
    }
}

function pet(){
    console.log(this===global)//true
}

function pet(){
    this.word="miaomiao';
    this.speak = function(){
        console.log(this)//cat
    }
}
var cat =new pet();
```
this通常指向当前函数的拥有者，叫做执行上下文

```javascript
function Pet(word){
    this.word = word;
    this.speak = function(){
        console.log(this.word);
    }
}
function Dog(word){
    Pet.call(this,word);//Pet的this指向当前的Dog,相当于继承
}
var dog = new Dog('wang');
dog.speak()
```
### cheerio
cheerio可以像jquery一样，解析html代码
```javascript
var $ = cheerio.load(html);
var chapters = $('.learnchapter');
chapters.each(function(item){
    var c =$(this);
    var chapterTitle = c.find('strong').text();
    var vedio = c.find('.vedio').children('li');
})
```

### events模块

```javascript
var EventEmitter =require('events').EventEmitter;
var life = new EventEmitter();

life.on(eventname,function(){console.log(1)});
life.on(eventname,function(){console.log(2)});
life.on(eventname,function(){console.log(3)});
life.on(eventname,function(){console.log(4)});
...

var haseventname = life.emit(eventname,args)//返回有没有监听过

life.removeListener(eventname,functionname)//移除
life.removeAllListener(eventname)//批量移除

life.listeners(eventname)//所有监听器

EventEmitter.listenerCount(life,eventname)

```
默认一个事件不要超过10个监听器，不然内容泄露.可以进行设置
```javascript
life.setMaxListeners(0)//去掉限制
life.setMaxListeners(11)//最多11个
```

### Buffer暂存
Buffer 二进制数据。因为JS的字符串是utf-8存储的，处理二进制的能力弱。
```javascript
var buf = new Buffer([1,2.11,3.22,4]);
console.log(buf[1])//2
```
##### 转换图片为base64
```javascript
var fs = require('fs');
fs.readFile('logo.png',function(err,origin_buff){
    fs.writeFile('logo_buffer.png'.origin_buff,function(){
        if(err) console.log(err)
    })
    var base64Img=origin_buff.toString('base64')
    var decodedImg = new Buffer(base64Img ,'base64')//拼装成data:image/png,base64,decodedImg才可使用
    console.log(Buffer.compare(origin_buff,decodedImg))//0

})
```

### Stream 边读边写

#####  转换图片为base64
```javascript
//stream_logo.js
var fs = require('fs');
fs.writeFileSync('stream_logo.png',fs.readFileSync('logo.png'));//大文件会爆仓
```

```javascript
var fs = require('fs');
var n = 0;
var readStream = fs.createReadStream('stream_logo.js')
readStream
.on('data',function(chunk){
    n++
    console.log(Buffer.isBuffer(chunk));//true 一次大概64TB
    console.log(chunk.toString('utf8'));//stream_logo.js内容
    readStream.pause();
    setTimeout(function(){
        readStream.resume()
    },3000)
})
.on('readable',function(){})
.on('end',function(){ console.log(n)})
.on('close',function(){})
.on('error',function(){})


```
##### 复制文件
```javascript
var fs = require('fs');
var readStream = fs.createReadStream('1.mp4');
var writeStream = fs.createWriteStream('copy.mp4');
readStream.on('data',function(chunk){
    if(writeStream.write(chunk)===false){//数据还在缓存区，读得快写得慢
        readStream.pause();//先暂停
    }
})
writeStream.on('drain',function(chunk){//已经写完了
    readStream.resume();  
})
readStream.on('end',function(chunk){
    writeStream.end()
})

```
##### 强大的Pipe

Duplex双工
Transform双工，但是不存储数据
```javascript
http.createServer(function(req,res){
    // fs.readFile('logo.png',function(err,data){
    //     if(err){
    //         res.end('file is not exist!')
    //     }else{
    //         res.writeHead(200);
    //         res.end(data)
    //     }
    // })
    fs.createReadStream('logo.png').pipe(res);
    request('https://imoooc/logo.png').pipe(res)
})
```
上面的复制文件代码就可以改成
```javascript
var fs = require('fs');
fs.createReadStream('1.mp4').pipe(fs.createWriteStream('copy.mp4'))
```

```javascript
var Readable = require('stream').Readable
var Writable = require('stream').Writable
var readStream = new Readable()
var writeStream = new Writable()
readStream.push('I')
readStream.push('Love')
readStream.push('You\n')
readStream.push('null')
writeStream._write = function(chunk,encode,cb){
    console.log(chunk.toString())
    cb()
}
readStream.pipe(writeStream)

```
定制流
```javascript
funcion ReadStream(){
    stream.Readable.call(this)
}
util.inherits(ReadStream,stream.Readable);//继承原型
ReadStream.prototype._read=function(){
    this.push('I')
    this.push('Love')
    this.push('You\n')
    this.push('null')
}

funcion WritStream(){
    stream.Writable.call(this)
    this._cached=new Buffer('')
}
util.inherits(WritStream,stream.Writable);
WritStream.prototype._write = function(chunk,encode,cb){
    console.log(chunk.toString())
    cb()
}

function TransfromStream(){
    stream.Transform.call(this)
}
util.inherits(TransfromStream,stream.Transfrom);
TransfromStream.prototype._transform= function(chunk,encode,cb){
    this.push(chunk)
    cb()
}
TransfromStream.prototype.flush= function(cb){
    this.push('On Yeah!')
    cb()
}

var rs= new ReadStream()
var ws = new WritStream();
var ts = new TransfromStream()

rs.pipe(ts).pipe(ws)
```
createReadStream是给你一个ReadableStream，你可以听它的'data'，一点一点儿处理文件，用过的部分会被GC（垃圾回收），所以占内存少。

readFile是把整个文件全部读到内存里，这种方式是把文件内容全部读入内存，然后再写入文件。对于小型的文本文件，这没有多大问题。但是对于体积较大的二进制文件，比如音频、视频文件，动辄几个GB大小，如果使用这种方法，很容易使内存``“爆仓”``。理想的方法应该是读一部分，写一部分，不管文件有多大，只要时间允许，总会处理完成，这里就需要用到流的概念