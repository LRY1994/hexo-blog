---
title: node.js
date:   2018/7/5
categories: 
    - 学习
    - 专题
---
适合高并发、IO密集型

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

幂等 ：重复请求多次与请求一次的效果是一样的。

Node模块分为**核心模块**和**文件模块**

文件模块没有扩展名时，会按照顺序优先加上后缀 ``.js=>.json=>.ndoe``

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
...//默认一个事件不要超过10个监听器，不然内容泄露

var haseventname = life.emit(eventname,args)//返回有没有监听过

life.removeListener(eventname,functionname)//移除
life.removeAllListener(eventname)//批量移除

life.listeners(eventname)//所有监听器

EventEmitter.listenerCount(life,eventname)

```
默认一个事件不要超过10个监听器，不然内容泄露.可以进行设置
```javascript
life.setMaxListeners(11)
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
var source =fs.readFileSync('logo.png');
fs.writeFileSync('stream_logo.png',source);
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