---
title: vue_koa建站及部署  
date:  2018/5/22
categories: 
    - 学习
tags:
    - 日常记录 
---

参考

[SimpleMDE编辑器 + 提取HTML + 美化输出](https://segmentfault.com/a/1190000009469890)

[用 vue koa 和mongo 撸了个人博客和博客管理网站](https://segmentfault.com/a/1190000007004199)

[前端 vue+后端 koa，全栈式开发 bilibili 首页](https://www.v2ex.com/t/357255)

[分享我个人学习项目：系统管理平台（基于vue，koa2前后端分离）](http://cnodejs.org/topic/5a66b313ce45d44045146277 )

[koa+mongoose实现简单增删改查接口](https://www.cnblogs.com/junhua/p/7714572.html)

[koa2从起步到填坑](https://www.jianshu.com/p/6b816c609669)

[vue使用highlight.js](https://www.jianshu.com/p/6c1e4fcc6d6f)

[阿里云ECS服务器部署Node.js项目全过程详解](https://www.jianshu.com/p/2e31fd9eb048)
[Nodejs项目部署阿里云完整流程](https://blog.csdn.net/u013263917/article/details/79037770)
[ koa2使用阿里云oss的nodejs sdk实现上传图片](https://www.cnblogs.com/beileixinqing/p/9152113.html)
[](https://help.aliyun.com/document_detail/50775.html?spm=5176.doc25426.6.655.kn1mB7)
### 2018-5-22

windows下查找特定端口
```
cd c:\WINDOWS\system32\ 
netstat -aon|findstr "3000"
```

``W:\MongoDB\bin\mongod --dbpath W:\MongoDB\data`` 运行 MongoDB 服务器
pm2

``mongo `` 连接MongoDB

一些常用命令
```
show dbs
use ...
db.dropDatabase()
show collections
db.collection.drop()
db.users.find().pretty()
```
* Vue准备
```
npm install -g @vue/cli
vue init webpack  admin 
npm i --registry https://registry.npm.taobao.org
```
安装``sass-loader\node-sass\axios\element-ui``

* Koa2准备
```
npm install -g koa-generator 
koa2 server //创建koa2项目
```
 安装``koa-router\mongoose\koa2-cors``


``co ``模块可以将异步解放成同步。co 函数接受一个 generator 函数作为参数，在函数内部自动执行 yield 。(没用这个在别处看到)



``npm install --save koa-router``

koa-router在处理post请求时，koa无法解析http请求体中的数据，这时我们需要引入另外一个模块叫做``koa-bodyparser``。
引入``bodyparser``之后需要注册到app对象上，且在router之前注册，然后才可能在router的post请求的处理函数中获取http请求体中的数据。

### 2018-5-23

``npm install --save koa2-cors``

koa2-cors 解决跨域问题
```
Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
https://github.com/zadzbw/koa2-cors 
```
* axios

如果没有``type=file``的控件，用默认的``application/x-www-form-urlencoded``就可以了。
 但是如果有``type=file``的话，就要用到``multipart/form-data``了。

 要给``ctx.response.body``赋值，否则会404

``withCredentials:true`` 代表请求带cookies

### 2018-5-31
``npm install md5 --save``密码加密

``npm install mavon-editor --save``富文本编辑器

### 2018-6-5
这两点很重要

axios传data   ---> 用ctx.request.body提取

axios传params ---> 用ctx.query提取

mongose用_id查询的话用``findById(id)``.

``npm install marked --save ``  md转化成html

``npm install hightlight.js --save `` 高亮代码块

### 2018-6-6
``npm install moment --save `` 格式化日期

使用mongoose的``timestamp``/``virtual``

让MongoDB自动生成和管理createTime和updateTime字段的值，参考：[Mongoose Schemas中定义日期以及timestamps选项的妙用](https://www.cnblogs.com/duhuo/p/6232534.html)

格式化Date使用schema.virtual。参考
[mongoose Schema设置virtual属性不起作用](https://cnodejs.org/topic/5532466b1b9662da568db904)


问题：搜索、上传图片

### 2018-6-7
遇到一个很纠结的问题，目前用的postId都是使用mongoose自动生产的_id.但是在新建文章的时候，我把上传文件和保存文章的服务分开做，分别是不同的collection，如果用_id的话那上传图片的时候不知道那个_id,这种情况下只能在保存好文章之后返回_id再上传图片，这样不是很优雅。

试一试用同一个collection好了



form表单里有文件，又有文本，该怎么办？ 解决方案总的有两种：

1、使用formData实现文件和文本同时提交

2、先ajax上传文件，返回文件url，再和文本一起提交，我称作伪提交。

一般数据库中存放的是图片的路径和名称，实际图片是存放在服务器上的，显示的时候只是在页面指定其路径和名称从而获取。

koa-bodyParser中间件 [详情介绍 https://github.com/koajs/bodyparser]
默认支持json form类型的数据，但是不支持form-data类型的数据 不怎么好用 

koa-multer中间件 [详情介绍 https://github.com/koa-modules/multer]
不同的koa版本，支持不同的multer版本,以及在使用的方式上也有所不同,使用方式查看以上链接文档.
koa-multer仅仅支持multipart/form-data类型的数据

koa-body [详情介绍 https://github.com/dlau/koa-body]
支持三种类型的数据

1、multipart/form-data
2、application/x-www-urlencoded
3、application/json

新版本的koa-body通过ctx.request.files获取上传的文件。
旧版本的koa-body通过ctx.request.body.files获取上传的文件 

[Koa2 之文件上传下载的示例代码](http://www.jb51.net/article/137369.htm)
[](https://www.xttblog.com/?p=1753)


使用koa-body时，文件用``ctx.request.files``获取，而不是``ctx.request.body.files``

现在上传一个图片没有问题了，上传多个文件出现问题
``path must be a string or Buffer``


### 2018-8-6
上传多个图片，为什么不能遍历
https://segmentfault.com/q/1010000015899152
最后这样
```
let files = ctx.request.files;
通过files['file'];取得数组。
```
一次上次多张图片的代码：
```js
 ADD_POST :{
        method:'post',
        url :'/post/new',
        headers: { 'Content-Type': `multipart/form-data`},
    },
```
```js
function upload(files,title){  
    let imgList=[],file,url,name;
    
    files = files['file'];//关键！！！！！！
    if(files==undefined) return [];
    if(files.length){//如果是一个数组
        for(let index in files){
            file = files[index];     

            url=`uploads/${title}-${file.name}`;
            name =`${title}-${file.name}`;
            fs.createReadStream(file.path).pipe(fs.createWriteStream(url))
        
            imgList.push([index,name]);
        }
    }else{   
        file = files;        
        url=`uploads/${title}-${file.name}`;
        name =`${title}-${file.name}`;
        fs.createReadStream(file.path).pipe(fs.createWriteStream(url))
        imgList.push([0,name]);
    }
     
     return imgList;
   
}
exports.new = async(ctx, next)=>{
    let {title,body,tags,category}=ctx.request.body;
    let files = ctx.request.files;//重点
    let imgList=[];
    if(files) imgList = upload(files,title);

    let post = new Post({
        title,
        body,
        tags,
        category,
        imgList
    })
    let result= await dbHelper.Save(post);
    ctx.response.body = result;    
}
```

接下来看看怎么获取后端照片 ==> 
``app.use(require('koa-static')(__dirname + '/uploads'))``

$img2Url老是报错

### 2018-8-26
koa-session
为了弥补HTTP的无状态，就有了cookies和session.之前没有seesion的时候都用的是cookies.

当程序需要给某个客户端请求创建一个session时，服务器会检查请求里面是否包含sessionid,服务器把这个session找出来就行了。没有就创建，返回sessionid给客户端保存.

服务端重启会清除session.session持久化方法：cookies,redis,MongoDB,硬盘内存
[koa-session](https://www.jianshu.com/p/8f4cc45d712e)

用户权限管理：中间件

### 2018-10-13
* npm install bcrypt报错.
 Can't find Python executable "python", you can set the PYTHON env variable.

这里需要依赖python.推荐使用bcrypt-

* 今天一直搞不懂404错误，最后在一个中间件加上await next()就可以了。
**所有中间件都要加上await next()，无论它有没有提供数据给下一个**

*  图片还是一张一张上传比较好，不然mavonEditor得不到图片地址。传完立刻用``$img2Url``把图片地址插入到md里面

### 2018-10-14
mongoose中间件一般仅仅只能限于在几个方法中使用. (但感觉就已经是全部了)
init,validate,save,remove;

非常重要的一点是中间件只是在document级别有效，如findAndUpdate等方法不会触发中间件，因为这不是document级别的操作。


### 2018-10-31
一般是在本地npm run serve看效果,但是终端关掉就访问不了了。在VPS上怎么做才不会关掉终端之后还可以继续访问?用 **pm2** !!
``pm2 start npm --watch --name XXX -- run start   相当于 (npm run start)``

### 2018-11-3
不要在服务器里面上传图片了，怕以后占的空间太大，直接用github里面的图片的链接好了

### 2018-12-27
centos 安装nodejs
yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_9.x | sudo -E bash -
yum install nodejs

ngix安装
https://www.cnblogs.com/taiyonghai/p/6728707.html

搭建网站过程
https://www.jianshu.com/p/4895cda92808



添加到开机自启动项
vi /etc/rc.d/rc.local
mongod --dbpath /home/mongodb/data --logpath /home/mongodb/logs/log.log -fork
chmod +x /etc/rc.d/rc.local

添加环境变量
vim /etc/profile
在最后，添加:
export PATH="/usr/local/mongodb/bin:$PATH"
保存，退出，然后运行：
source /etc/profile不报错则成功。

tar zxvf openssl-fips-2.0.10.tar.gz -C /home
./config && make && make install

sbin/nginx -s reload

