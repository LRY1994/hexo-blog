---
title: 搭建博客过程
date:   2018/2/26
categories: 
    - 学习 
    - 专题笔记
---
我是一个很喜欢做笔记的人，老是写在word文档不方便。之前用jekyll搭了一个，感觉写得也是乱七八糟，页面也不好看，改的话不如重新重写一个好了

有了上次经验，觉得做一个东西真的要认真规划一下，不然做出来的东西老是迁就的感觉，能用就行。这样是不行的。像做一个产品来做它
## 问题定义
重构博客原因有下：

1. Jkeyll目录文件关系得按照规定放置，灵活性差（虽然hexo也是这样）
2. 日记页面不美观，想换，干脆重新规划做一个
3. 学习一下怎么在github上弄1.0版本，2.0版本
4. jekyll显示markdown不好看

参考[博客搭建可行性方案( jekyll , hexo , Wordpress )](https://www.jianshu.com/p/c4f145fdd637)

较多人采用的博客搭建方案有如下几种：

1. Git+Github+Markdown+jekyll （免费）
2. Git+Github+Markdown+hexo （免费）
3. 虚拟主机＋插件＋Wordpress （付费）

为了省钱，所以选择第二种
## 可行性研究 
毋庸置疑，可行

## 需求分析
分为工作、学习、生活三个模块
- 工作
    - 简历 (制作简历网页，jekyll那个是直接把简历模板copy过来的)
- 学习
    - 笔记 （可按时间、类别分类）
        - 读书笔记（以书籍为单位来）
        - 随笔笔记（在生活中遇到的问题或者想要摘录的，以月为单位）
        - 专题笔记（围绕某个东西的笔记，以主题为单位）
    - 项目
        - 项目一
        - 项目二 等
    - 用户体验（把有时候产品用得不愉快的经历记录下来，一篇，不定时更新）
- 生活
    - 减肥 
        - 运动日历 （因为办了健身卡 ）
        - 减脂餐图栏
    - 护肤化妆心得 （我一直都有颗当美妆博主的心）
    - 旅游攻略 （喜欢旅游，但不可以经常旅游，所以很珍惜每一次，都想把它记录下来）
- 其他
    - 社区账号（比较常用segmentfault/weibo/V2EX）
    - 聊天框

## 概要设计
输出原型图
使用mockplus
## 详细设计

## 编码和单元测试

## 集成测试
最终部署在github

1. Permission denied (publickey)错误
    解决方法
    [针对github权限导致hexo部署失败的解决方案](https://www.cnblogs.com/xsilence/p/6001938.html)

2. 和jekyll不同，``hexo d``会覆盖掉github仓库的代码，试了创建两个分支，比较麻烦，放弃。建立两个仓库，一个放源代码，一个放生成代    码。注意，生成代码需要放在master分支上，跟jekyll一样，生成代码的项目名字要取名为``username.github.io``

3. 使用next主题的时候需要在_config.yml把``permalink: :title``中改成
    ``permalink: :title.html``
    不然点击文章的时候会出现下载框

4. about页面需要自己创建，并且自己写。

    大容器页面布局默认_layout布局，在``theme/next/layout_layout.swig``中定义。

    全部页面都是默认page布局，在``theme/next/layout/page.swig``中定义。

    只有archive,tag,category页面不用创建，直接在``theme/next/layout/``对应名字文件里面写，即

    ``theme/next/layout/archive.swig``

    ``theme/next/layout/category.swig``

    ``theme/next/layout/tag.swig``

    但是tag,category页面还需要多做一步：

    ```
    $ cd your-hexo-site
    $ hexo new page tags
    ```
    编辑刚新建的页面，将页面的类型设置为 tags ，主题将自动为这个页面显示标签云。页面内容如下：
    ```
    title: 标签
    date: 2014-12-22 12:39:04
    type: "tags"
    ```
    在菜单中添加链接。编辑 主题配置文件 ， 添加 tags 到 menu 中，如下:
    ```
    menu:
    home: /
    archives: /archives
    tags: /tags
    ```

5. 换了主题重新部署，需要重新打包
    ```
    hexo clean
    hexo g
    hexo d
    ```
    这个需要一段时间githubPage才会更新
    
6. 写文章的时候要插入图片 

    (1) 按照[官方说法](https://hexo.io/zh-cn/docs/asset-folders.html)
    ```
        _posts

            |- post1.md

            |_ post1

                |- pic1.png
    ```
    1. 首先确认_config.yml中有：
    ```post_asset_folder: true``
    2. 安装
    
    ```npm install https://github.com/CodeFalling/hexo-asset-image --save```

    {% asset_img 图片文件名 [title] %}这样可以插入文章资源目录下的图片

    (2) 还是写正常的markdown,``![](./img.png)``,``hexo g``生成public文件夹之后，把图片复制到改目录下，再``hexo d``
    
    (3) 看到还有一个解决方法，没试过
    http://etrd.org/2017/01/23/hexo%E4%B8%AD%E5%AE%8C%E7%BE%8E%E6%8F%92%E5%85%A5%E6%9C%AC%E5%9C%B0%E5%9B%BE%E7%89%87/
## 软件维护
管理博客



