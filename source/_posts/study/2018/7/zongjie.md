---
title: 2018-7至2018-9总结
date:   2018/7/4
categories: 
    - 学习
tags:
    - 日常记录 
---
### 社交分享接口
qzone       : 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}',
qq          : 'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}',
tencent     : 'http://share.v.t.qq.com/index.php?c=share&a=index&title={{TITLE}}&url={{URL}}&pic={{IMAGE}}',
weibo       : 'https://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}',

douban      : 'http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11',
diandian    : 'http://www.diandian.com/share?lo={{URL}}&ti={{TITLE}}&type=link',
linkedin    : 'http://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin',
facebook    : 'https://www.facebook.com/sharer/sharer.php?u={{URL}}&title={{TITLE}}&description={{DESCRIPTION}}&caption={{SUBHEAD}}&link={{URL}}&picture={{IMAGE}}',
twitter     : 'https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{SITE_URL}}',
google      : 'https://plus.google.com/share?url={{URL}}'
##### 微博
http://service.weibo.com/share/share.php?
```
url=
&title=
&pic=可为空
&appkey=可为空
```

##### 发送给QQ好友
http://connect.qq.com/widget/shareqq/index.html?
```
url=
title=
source= 默认读取head标签的site：<meta name="site" content="http://overtrue" />
desc=默认读取head标签的description：<meta name="description" content="http://overtrue" />
pics=
```

##### 腾讯微博
http://share.v.t.qq.com/index.php?
```
c=share
a=index
title=
url=
pic=
```

##### 豆瓣
https://www.douban.com/share/service?
```
href=
&name=
&text=
```

##### 豆瓣
http://shuo.douban.com/!service/share?
```
href=
name=
text=
image=
starid=0
aid=0
style=11
```

##### QQ空间(这个好像腾讯坏了，都是undefined)
http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?
```
url=
desc=
summary=
site=
```

##### linkin
http://www.linkedin.com/shareArticle?
```
mini=true
ro=true
title=
url=
summary=
source=
armin=armin
```

##### 点点（不知道是什么东西）
http://www.diandian.com/share?
```
lo= 文章链接
ti= 文章标题
type=link
```

##### facebook
https://www.facebook.com/sharer/sharer.php?
```
u= 文章链接
```

##### twitter
```
https://twitter.com/intent/tweet?
text= 文章标题
url=
via= 好像是域名
```

##### google
```
https://plus.google.com/share?
url=
```

### vue强制更新
用vue.$set不行，watch不行，试试$forceUpdate。
还有一种办法，再把值重新复制一遍也是可以的
``this.obj = Object.assign({},this.obj)``


### 在Vue中使用sass及sass图片路径问题 
[https://www.jianshu.com/p/5e81814f8d8c](https://www.jianshu.com/p/5e81814f8d8c)

### CORS跨域请求会先发option请求，如果server返回access-control-allow-origin头为*或者和当前域名一致的话，才会进入第二段的真正请求。

### 禁止缓存数据deactivated 
 防止下次选择数据不更新
```js
  deactivated () {
    this.$destroy(true)
  }
  ```

### 深拷贝
 ``arr.slice()``
 如果obj所有值都是非引用类型，那么obj.slice(0)与深浅拷贝没有差别；

如果obj有引用类型的元素的话，obj.slice(0)仅仅是复制了元素的地址，，obj.slice(0)可看作浅拷贝。

对象深拷贝 ``Object.assign({},obj)``,不要用JSON.parse(JSON.stringify(obj)),太慢

### 价格标签
```css
 .price-label{
     position: relative;
     display: inline-block;
     color: #f15533;
     border-color: #f15533;
     font-size: 12px;
     line-height: 18px;
     padding: 0 7.5px;
     z-index: 2;
     vertical-align: super;
     &::before{
             position: absolute;
             z-index: 1;
             content: "";
             top: 0;
             right: 0;
             bottom: 0;
             left: 0;
             border: 1px solid #ccc;
             border-color: inherit;
             border-radius: 2px;
             transform: skew(-11deg);
     }
 }
```

### 事件冒泡到父容器或某个祖先容器停止
在父容器或某个祖先容器上绑定一个``@click.stop="stop"``
stop函数为一个空函数即可