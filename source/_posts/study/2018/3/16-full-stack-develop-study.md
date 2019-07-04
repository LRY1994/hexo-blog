---
layout: post
title:  "《全栈应用开发精益实践》读书笔记"
date:   2018-3-16 13:38:38 +0800
img: "20180131.jpg"
categories: 
    - 学习
tags:
    - 读书笔记 
---

这本书以前翻过几章，但是因为其他事情耽搁了，重新阅读已不太记得讲了什么，故重新阅读

###  系统工具

| System           |   包管理               |快速启动    | 命令行 |
| -----------------  | :------------------ | :---------------|:---------------|
| window | chocolatey      | wox         | cmder/Cygwin |       |
| GNU/Linux | apt/yum/yast | Launchy     | Zsh       |
| Mac    | Homebrew        |             | iTerm2    |

###  回到顶部
``<a href="#">回到顶部</a>``

### 沟通
- 每日站会。讲述昨天今天做了什么，遇到什么问题。
- 结对编程。两个人实现一个功能除了可以减少bug，还能分享。
- 代码审查
- 开卡和验收。开发人员和业务分析人员、测试人员一起开卡来进行新的任务，并在最后一起验收。
- 迭代回顾。

###  软件质量
- 测试驱动开发。先写测试，再实现代码，最后对代码进行重构。
- 重构。
- 技术债管理。由于发布临近，可能在这次发布里使用一些比较粗暴的方式来实现功能，代码不太吗。每当出现一点时就对问题进行标识，在适当的时候修复，若果所欠的债务越来越多，意味着软件的质量受到影响，需要重新审视这个问题。
- 浮现式设计。敏捷开发并不意味着架构设计不存在，在实践过程中依据问题改进代码。随着对软件质量的重视，我们的架构就会浮现出来。
###  数据持久化
- 文件存储。
GoAcess/Hadoop/Spark.Logstash/ElasticSearch/Kibana
- 数据库
    - 关系数据库。MYSQL/SQLite3/PostgreSQL
    - 非关系数据库。NoSQL/MongoDB/Redis/Cassandra

###  UI框架。Foundation/Skeleton/Pure.css
###  Django
- 安装
    `` pip install Django =1.10.2``
- 创建项目
    ``django-admin startproject project-name``

 文件结构
```
- project-name
    - __pycache__
    - project-name
        - __init__.py//指明这是一个Python模块
        - settings.py //包含数据库环境、启用插件等的配置
        - urls.py//指明了某个URL应该指向某个函数来处理
        - wsgi.py//用于部署
    - manage.py //可以和django-admin做类似的事情
    - db.sqlite3
```
- 启动服务器
    ``python manage.py runserver``
    
     打开 “http://localhost:8000/”
    - 下载SQLite3数据库 [https://sqlite.org/download.html](https://sqlite.org/download.html)
    - 数据库迁移
        ``python manage.py migrate``
    - 创建超级用户来登录后台
        ``python manage.py createsuperuser``
    - 登录后台-打开 “http://localhost:8000/admin”

###  Fabric搭建构建系统
- 安装``pip install fabric3``
- 创建``fabfile.py``。执行  ``fab 函数名:arg``    
fab命令从fabfile.py里面寻找对应的函数来执行
- fabric有两种运行方式
    - 本地运行 ``local函数``

        需要``from fabric.api import local``

    - 在远程机器上执行命令

- ``fab --list `` 会列出``fabfile.py``文件中所有有``@task``修饰器的方法
###  代码风格监测

- pep8 

    安装``pip install pep8--1.7.0``

    执行 ``pep .``
- pylint

    安装 ``pip install pylint``,再加入requirements.txt即可。

    有pylint-django插件
- Flake8,他包装了

    静态检查**PEP8**风格的pep8,

    静态检查**python代码逻辑错误**的PyFlakes, 

    静态分析**pyhon代码复杂度**的Ned Batchelder'sMcCabe script
 ### 创建应用

在``project-name/project-name``目录下

``django-admin startapp homepage``

文件目录
```
    - project-name          
        - project-name
            - __init__.py //指明这是一个Python模块
            - settings.py //包含数据库环境、启用插件等的配置
            - urls.py  //指明了某个URL应该指向某个函数来处理
            - wsgi.py  //用于部署
            - requirements
                - dev.txt
                - prod.txt

        - homepage 
            - __init__.py
            - admin.py
            - apps.py
            - models.py // 模型
            - tests.py
            - views.py //业务逻辑
            - migratios
                - __init__.py
                    

        - templates
        - static

        - manage.py // 可以和django-admin做类似的事情
        - fabfile.py // fab命令寻找的文件
        - db.sqlite3

```