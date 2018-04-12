---
layout: post
title:  "f8app在window安装教程"
date:   2017/11/21 
categories: 
    - 学习 
    - 专题笔记
tags:
    - react-native 
---

md写图片还要上传图床，太懒了

http://blog.csdn.net/lry1994/article/details/78589019

这货，花了我好几天时间
IDE：androidStudio,可以按照提示修改错误

    1、建立一个空的文件夹！！！这一步很重要
    2、$ git clone https://github.com/fbsamples/f8app.git
    3、$ cd f8app
    4、$ npm install
    这一步我出现了好多不知所措的错误，然后神奇的是，多装几次就好了！！！

5、运行``mongod --dbpath "W://MongoDB//data"``
    [https://github.com/ReactWindows/f8app/blob/data/mongodb/db.zip](https://github.com/ReactWindows/f8app/blob/data/mongodb/db.zip)

    把db.zip解压后的文件拷贝到W://MongoDB//data下

    mongod --dbpath "W://MongoDB//data"
    打开mongodb确保运行起来:https://www.cnblogs.com/Joans/p/3706406.html

6、启动 Parse/GraphQL servers

    $ npm start
    npm run import-data 这条命令运行会百分百报错SyntaxError:Unexpected token P in JSON at position 0 ，所以不要这个命令了。什么去除https证书验证、代理都没有，因为那个请求链接已经关闭
   参考链接[http://blog.csdn.net/industriously/article/details/73302207](http://blog.csdn.net/industriously/article/details/73302207)
   



7、确认下面的地址是可以访问的，并且是有数据的。
http://localhost:8080/dashboard

http://localhost:8080/graphql
打开http://localhost:8080/graphql

输入

    ``
    query{

    schedule{

    title

    speakers{

        name

        title

        }

    location{

        name

        }

    }

    }
    ``
运行有结果

8、react-native start  这句必须有

9、react-native run-android

```
Exception in thread "main"java.lang.RuntimeException: Timeout of 120000 reached waiting for exclusiveaccess to file:/Users/weidingqiang/.gradle/wrapper/dists/gradle-2.4-all/3i2gobhdl0fm2tosnn15g540i0/gradle-2.4-all.zip

at org.gradle.wrapper.ExclusiveFileAccessManager.access(ExclusiveFileAccessManager.java:61)

at org.gradle.wrapper.Install.createDist(Install.java:47)

at org.gradle.wrapper.WrapperExecutor.execute(WrapperExecutor.java:129)

at org.gradle.wrapper.GradleWrapperMain.main(GradleWrapperMain.java:48)
```
 

解决方法

[下载链接](https://services.gradle.org/distributions/ 下载链接)

1.重新下载gradle-3.3-all.zip，进入一堆乱码的文件夹，比如2n0i7hqatcbtk57vvql575dbap

2.不要删除里面的.lck和.part等文件，直接拷贝下载的gra

dle-3.3-all.zip文件到该目录


在androidstudio运行，按照他的suggestion改就OK了

接下来出现的都是版本问题，我也不知道怎么改了，改了好多次，最后可以了


最后成功运行！！！！！



运行方式
react-native  init 项目名

reactNative利用androidStudio运行：

在androidStudio 打开android文件夹，一定要打开这个，不然不能正常运行

在项目目录下运行react-native start 启动package server,

在androidstudio点击run->app

adb shell input keyevent 82 打开菜单

 

或者

 

reactNative真机运行：USB手机连接电脑，

在项目目录下运行react-native run-android

摇晃设备或按Menu键可以打开调试菜单，点击Dev Settings，

选Debug server host for device，

输入你的正在运行packager的那台电脑的局域网IP加:8081（同时要保证手机和电脑在同一网段，且没有防火墙阻拦），再按back键返回，

再按Menu键，在调试菜单中选择Reload JS，就应该可以看到运行的结果了。

 

adb devices查看连接电脑的手机设备

 

creact-react-native-app 项目名这种方法是创建纯粹的react-native，没有和安卓混合开发

真机运行react-native遇到了的问题

 

1、adbserver version (32) doesn't match this client (36); killing...

最后原因是因为手机驱动安装失败

解决方法：豌豆荚


2、

解决方法

 

3、

解决方法：修改两个地方

http://blog.csdn.net/mapboo/article/details/53419838

 

 

 

其他：

构建 F8 App / ReactNative 开发指南

https://f8-app.liaohuqiu.net/

 

F8App-ReactNative项目源码分析4-js篇

http://blog.csdn.net/offbye/article/details/51586227

 

