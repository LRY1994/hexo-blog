---
title: 《深入浅出node.js》、慕课网
date:   2018/7/5
categories: 
    - 学习
    - 读书笔记
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
    对异步方法进行try/catch操作只可以捕获**当次**事件循环里面的异常

    solution:Node在处理异常上形成一种约定，将异常作为回调函数的第一个实参传回。

    需要睡眠阻塞代码调用setTimeout更好，不要用下面的代码.这段代码会持续占用CPU，与真正的sleep相去甚远
    ```javascript
    var s =new Date();
    while(neW Date()-s<100){}
    ```

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

#### 流程控制库
* async

    series 只适合无依赖的串行执行，若当前一个的结果是后一个调用的输入的时候，就不能满足需求.

    parallel 并行

    waterfall 有依赖的串行执行

    auto 可以根据依赖关系自动分析，以最佳的顺序执行业务

    queue 动态添加并行任务

    parallelLimit 无法动态添加并行任务

* step

* wind 做到了不阻塞CPU但阻塞代码的目的

* bagPipe:对异步API添加过载保护。可以添加任意类型的异步任务，也可以动态添加异步任务，还能够在实时处理场景中加入拒绝模式（若等待的队列也慢了，新来的调用就直接返回一个队列太满的拒绝异常）和超时控制

## 内存
V8 的垃圾回收会引起Javascript线程``暂停执行``，回收的内存越多，时间就会被耽搁得越长。所以造成了V8的内存限制。



* 通过赋值方式解除引用更好

    想主动释放变量，可以通过delete或者重新赋值进行删除。但是在V8中delete操作有可能干扰V8的优化，所以通过赋值方式解除引用更好
    ```javascript
    delete global.foo ;
    global.foo = undefined//or null
    ```

*   在正常的Javascript中，无法立即回收的有``闭包``和``全局变量引用``这两种情况

* 闭包
    实现外部作用域访问内部作用域变量

    它的问题在于，一旦有变量引用了这个中间函数，这个中间函数将不会释放，同事会使原始的作用域也得不到释放，作用域中产生的内存占用也不会得到释放。除非不再有引用，才会逐步释放

* 内存

    进程的内存包括rss(常驻内存)、交换区swap中一部分和文件系统中一部分

    {% asset_img v8-heap.png %}

    Node的内存使用并非都是通过V8进行分配的，那些不是通过V8进行分配的内存叫做 **堆外内存**.利用堆外内存可以突破内存限制

   堆外内存 + v8堆内存(``process.memoryUsage()``) = rss
  
   Buffer对象不经过V8的内存分配机制

   内存泄露的实质只有一个：就是应当回收的对象出现意外而没有被回收，变成了常驻在老生代中的对象。原因有：
   1. 缓存（相当于全局变量保存一些东西）保存太多，没有过期淘汰策略。解决方案：使用进程外的缓存，进程自身不存储。
   2. 队列消费不及时。解决方案：需要有拒绝策略和超时策略
   3. 作用域未释放

    stream模块用于处理大文件。如果不需要字符串层面的操作，则不需要借助V8来处理，可以尝试纯粹的Buffer来操作，这就不会受到V8的堆内存限制。但是这个大片使用内存的情况依然要小心，即使V8不限制堆内存的大小，物理内存依然有限制



## Buffer

Node在内存的使用上采用的是在C++层面**申请**内存、在Javascript中**分配**内存的策略。


宽字节字符串被截断的问题可以用setEncoding()解决。原因在于，在调用setEncoding()的时候，可读流对象在内部设置了一个decoder对象。每次data事件都通过该decoder对象进行Buffer到字符串的解码，然后再进行下一步。decoder来自于string_decoder模块的StringDecoder实例对象，StringDecoder知道编码后会自行决定输出哪些字节，不输出哪些字节，保证字节不会被截断。但是setEncoding不能从根本上解决该问题。

更好的解决方法是把多个小Buffer对象拼接成一个Buffer对象（concat方法），然后通过iconv-lite一类的模块来转码。

## TCP
在node中，TCP默认启用Nagle算法，要求缓冲区的数据达到一定数量或一定时间后才将其发出，所以小数据包会被合并，优化网络。
可以调用socket.setNoDelay(true)取消Nagle算法，使得write()可以立即发送数据到网络中。
并不是每次write()都会触发一次data事件。在关闭掉Nagle后，另一端可能会将接收到的多个小数据包合并，然后只触发一次data事件



## 其他
事件驱动的实质：主循环+事件触发



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