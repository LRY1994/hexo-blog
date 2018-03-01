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
    - 阅读笔记（多读书）
- 其他
    - 社区账号（比较常用segmentfault/weibo/V2EX）

## 概要设计
输出原型图
## 详细设计

## 编码和单元测试
编码
## 集成测试
最终部署在github
在根目录下_config.yml里面任意位置新增以下语句
```
deploy:
  type: git
  # 填上你自己的仓库名，注意后面有`.git`
  repository: git@github.com:your_username/your_username.github.io.git 
  branch: master
```
最好不要采用http形式的如https://github.com/your_username/your_username.github.io.git而采用SSH换版本的git@github.com:your_username/your_username.github.io.git

好了现在可以部署到Github了。输入
```
npm install hexo-deployer-git --save，
```
然后再执行hexo d来部署。否则会出现```Deployer not found:git```的错误。耐心等待，出现```Deployer done: git```表示你部署成功了！输入网址your_username.github.io去看看吧。一般来说如果出现莫名的问题，按照以下步骤即可解决。

删除.deploy_git文件夹

hexo clean

hexo g

hexo d

## 软件维护
管理博客



{% for post in page.posts %}
  //     {{ post_template.render(post, true) }}
  //   {% endfor %}