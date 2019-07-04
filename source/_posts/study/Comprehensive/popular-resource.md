---
title: 前端库收集
date:   2018-1-1
categories: 
    - 学习
tags:
    - 日常记录
---

## 动画
### GreenSock

    了解资料

    [greensock get-started-js](https://greensock.com/get-started-js#intro)

    [3D Transforms & More CSS3 Goodies Arrive in GSAP JS](https://greensock.com/css3)

    基础实例

    [Jump Start: GSAP JS](https://greensock.com/jump-start-js#welcome)

    [Timeline Tip: Understanding the Position Parameter](https://greensock.com/position-parameter)

    [Basic play / pause toggle button](https://codepen.io/GreenSock/pen/qeHac)

    [create a playful Jump Loader animation](https://tympanus.net/codrops/2015/03/25/jump-loader-animation-svg-gsap/)

    进阶
    [Writing Smarter Animation Code](https://css-tricks.com/writing-smarter-animation-code/)

    [https://greensock.com/examples-showcases](https://greensock.com/examples-showcases)

    [https://tympanus.net/codrops/](https://tympanus.net/codrops/)
    隆重介绍这个网站，上面有好多好多好看的动画
    
### Draggable
    Draggable是一个简单易用的模块化拖放库。它通过快速DOM重新排序，干净的API和可访问的标记提供了出色的拖放功能。Draggable附带额外的模块，可以添加更多的功能，如排序，交换和其他实用程序。

### Animate.css
    Animate.css是一个跨浏览器的CSS动画库。它非常易于使用，并提供大量不同的动画效果，如反弹，脉冲，摆动，淡入淡出，翻转等等。它可以用于在任何你喜欢的地方添加一些很酷和有趣的动画效果。
### Micron
    是一个允许你为DOM元素添加不同的CSS增强动画的库。其中交互可以通过HTML数据属性或通过链接JavaScript方法来设置速度、消除和其他选项来控制。它支持不同的交互，如摇晃、褪色、反弹、摇摆（shake, fade, bounce, swing）等等。

## animate elements on scroll 
### WOW 
     http://mynameismatthieu.com/WOW/docs.html 
### AOS 
    http://michalsnik.github.io/aos/
    AOS 是一个用于在页面滚动的时候呈现元素动画的工具库，和 WOWJS 类似。但是AOS是 CSS3 动画驱动的库，该库是高度可定制的，非常小，易于使用（通过CDN安装）。在页面往回滚动时，元素会恢复到原来的状态，如此达到循环动画的效果。

## 存储
### localForage 
    用于indexedDB和WebSQL的封装程序，能够让你的Web应用程序存储更多数据，并提升应用程序的离线体验。写入和读取操作与                localStorage类似，支持 BLOB 和任意类型的数据，可以存储图片，文件等等，而不仅仅是字符串。它还提供多种API，使开发               人员可以选择回调的异步API。

## 邮件
### MJML 
    The only framwork that makes responsive email easy


## VR
### A-Frame 
    是 Mozilla 开源的网页虚拟现实体验（ WebVR ）框架。能够在HTML中创建3D场景的框架，使用Three.js和WebGL来创建VR场景。可用于桌面、iPhone（即将支持安卓）以及 Oculus Rift。

### GPU.js
    用于在GPU中运行浏览器JavaScript代码的库。使用GPU.js，您可以通过将专门编写的JS编译成可通过WebGL在GPU上运行的着色器语言来更快速地执行复杂的计算。如果WebGL不可用，则函数将回退到常规JavaScript。

## HTTP
### R2
    这是一个更轻量级的 HTTP 客户端解决方案，它建立在浏览器原生的 Fetch API 的基础之上，并为 Node.js 提供优化。压缩后的R2大小只有16K。
### Axios
    为处理HTTP请求提供了一个现代化的JavaScript解决方案。它有一个基于Promise的API，在处理async调用时使你的代码更加结构化。该库可以在浏览器中工作，也可以在node.js环境中工作。

## 桌面通知
### Push
    Push是一款可靠的跨浏览器的JavaScript桌面通知库。它基于强大的Notification API，如果用户的浏览器不支持新API，则会回退到较早的实现。

## 自适应
### Devices.css
    Devices.css 是一个使用纯 CSS 实现移动设备的库。它包含了一些目前主流的移动设备，如 iPhone X，Google Pixel 2 XL 和三星Galaxy S8。由于其高品质的设计，可用于着陆页面或者网页快照。
### Lit
    是一个非常小和响应式CSS框架。它包含12列响应式网格、不同的排印风格、自定义输入、三种按钮类型以及CSS框架应该提供的所有功能。Lit适用于所有现代浏览器，以及IE11等一些较旧的浏览器
### Tachyons
    你可以制作漂亮且响应速度快的界面，并且几乎不需要CSS。它很容易使用和定制，移动优先，并能很好地与React、Ember、Angular和其他框架配合使用。更重要的是，它非常轻量级，并且具有非常详细的文档，你可以在其中找到所需的一切。
### Rekit
    是一款可帮助你使用React、Redux和React-router创建出色的响应式Web应用程序的工具包。该框架提供了两个用于处理框架的强大工具 — 一个名为Rekit Studio的全功能IDE，以及一个用于在终端上工作的扩展命令行界面。

## 字体
### Nerd Font
    这是一个流行字体和图标的集合。它包含39个补充字体系列，以及来自诸如Font Awesome、Devicons、Octicons等流行图标集的1300多个图形和图标。所有字体在Linux、macOS和Windows上兼容。

## 链接
### Kutt
    是一个免费的可以用来缩短你的URL、管理链接和设置自定义域的开源库。它有一个易于使用的API，并允许你创建和删除URL，以及使用详细统计信息跟踪它们。
## 卡片
### Card
    Card是一个小巧的vanilla JS项目（带有jQuery版本），可以让你的信用卡表格变得更加有趣生动。快速安装后，将采取您的表格，并将其转换为一张动画的信用卡。

## 图片
### Direction Reveal 
    该插件检测光标进入或离开块时的方向，允许你使用各种酷炫特效和过渡。它提供了一些开箱即用的CSS动画，让你可以轻松创建自己的CSS动画。
### Carbon
    允许你创建并分享代码组成的美丽图像。你所需要做的就是将你的代码粘贴到编辑器中，或直接自己编写代码。你可以通过更改字体样式、编辑器主题、语法高亮和甚至窗口按钮来自定义图像的外观。

## 弹出框
### SweetAlert2 
    是一个可以创建漂亮和可响应弹出框的库。SweetAlert2是高度可定制的，100%响应式并且在所有屏幕尺寸上都能有很好的显示效果。使用SweetAlert2 你可以创建各种不同的拥有惊艳的风格、显示效果和动画的弹出框。


## H5
### Phaser
    是一个快速的开源框架，可以开发为运行在桌面浏览器或手机浏览器的HTML5游戏。你也可以为iOS、Android和其他不同的本地应用程序创建游戏。Phaser有对开发人员非常友好的API，并且Phaser的团队也积极开发和维护。最近，在Phaser 3.0版本中发布了很多新的特性和功能。


## CMS
### KeystoneJS
    KeystoneJS是一个功能强大的CMS框架，基于Express和MongoDB构建，它提供了一个漂亮的管理用户界面，实用的API应用程序，会话管理，电子邮件发送，扩展等等。

## 其他
### Puppeteer
    Puppeteer是一个Node.js API，用于控制 headless Chrome。由 Google官方的 Chrome DevTools 团队维护。在headless环境中，开发者可以生成网页截图或者 PDF ，通过Puppeteer的提供的api直接控制Chrome模拟大部分用户操作来进行UI Test或者作为爬虫访问页面来收集数据。

### Deeplearn.js
    Deeplearn.js是一个开放源代码库，可将高性能机器学习构建模块带入网络。它提供了两个API，即时执行模型和延期执行模型。它可以完全在浏览器中运行，不需要安装，不需要后端处理。

### Popper.js
    Popper是一个JavaScript库，它提供了大量的定制选项，并且完全模块化，每个功能都有独立的插件。不需要依赖 jQuery 库，大小仅为 3.5KB 左右，使用与配置相当简单，Twitter，WebClipper中的Microsoft以及AtlasKit等大企业都在使用

### Apollo Client
    是一款全功能的GraphQL客户端，用于 React 、Angular 的交互。压缩的大小还不到25K。

### Jarvis
    一款基于Webpack仪表板的智能浏览器，它可以给你显示你在webpack构建所需的所有重要信息。它向你展示了你的资源在12种不同的连接类型中的表现如何，你项目中所有包的大小，并拥有一个漂亮的错误输出。它仍处于beta版本，预计会增加许多新功能。

### Wiki.js 
    是一个强大的Wiki App，基于Node.js、Git和Markdown开发。你可以使用内置编辑器用Markdown格式来写作，并且可以自动同步到你的Git仓库。Wiki.js 有完整的访问控制和配置管理，但只占用很少的CPU资源。


