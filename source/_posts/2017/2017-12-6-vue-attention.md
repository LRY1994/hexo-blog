---
layout: post
title:  "vue 一些需要注意的点"
date:   2017/12/6 
categories: 
    - 学习 
    - 专题笔记
tags:
    - vue
---

## 技术栈

* [ES6 Javascript](http://www.2ality.com/2015/08/getting-started-es6.html)
* [Vue JS](http://vuejs.org) 框架和 [NPM](http://npmjs.org) 生态
* [Vue Router](http://router.vuejs.org/)
* [Vuex](https://vuex.vuejs.org/zh-cn/intro.html)
* [.vue files](https://vue-loader.vuejs.org/zh-cn/)
* [vue-cli](https://github.com/vuejs/vue-cli)
* [Axios](https://github.com/axios/axios)
* [Element-ui](http://element.eleme.io/#/zh-CN/component)
* [Webpack](https://webpack.js.org/)
* [ESLint](https://eslint.org/)

## 摘抄
不要为了编辑内容而打开另一个页面，应该直接在上下文中实现编辑。
能在这个页面解决的问题，就不要去其它页面解决，因为任何页面刷新和跳转都会引起变化盲视（Change Blindness），导致用户心流（Flow）被打断

『格式塔学派』中的连续律（Law of Continuity）所描述的，在知觉过程中人们往往倾向于使知觉对象的直线继续成为直线，使曲线继续成为曲线。在界面设计中，将元素进行对齐，既符合用户的认知特性，也能引导视觉流向，让用户更流畅地接收信息。

冒号对齐（右对齐）能让内容锁定在一定范围内，让用户眼球顺着冒号的视觉流，就能找到所有填写项，从而提高填写效率。为了快速对比数值大小，建议所有数值取相同有效位数，并且右对齐。

在一些需要用户慎重决策的场景中，系统应该保持中立，不能替用户或者诱导用户做出判断。

单字段行内编辑，当『易读性』远比『易编辑性』重要时，可以使用『单击编辑』。

当『易读性』为主，同时又要突出操作行的『易编辑性』时，可使用『文字链/图标编辑』。

当需要增强按钮的响应性时，可以通过增加用户点击热区的范围，而不是增大按钮形状，从而增强响应性，又不缺失美感。

颜需色遵守 WCAG 2.0 的标准，操作类的色彩搭配都应满足颜色对比值 3:1 的最低标准。文本和背景色之间至少保持最小 4.5:1 的对比度（AA 级），正文内容都保持了 7:1 以上的 AAA 级对比度。

在操作前引导告知用户操作的目的或重要性，能促进用户更愿意去执行。

当用户填写的内容出错的时候，你的报错信息应当符合用户的认知，用易于理解的方式表述出来。

直接使用『你』、『我』来和用户对话，与用户建立亲密感。避免使用『您』，让用户感觉太过疏远。

不要在同一个句式中混用『你』和『我』，交互中指代混乱会让用户相当纠结。

## ｖｕｅ
* 不要在选项属性或回调上使用箭头函数
* 计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。
* 当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。
* 表单元素不要复用它们，只需添加一个具有唯一值的 key 属性即可
* v-show 不支持 ```<template>``` 元素， v-else也不支持
* v-for 具有比 v-if 更高的优先级。
它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。

```html
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

* 建议尽可能在使用 v-for 时提供 key，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

  2.2.0+ 的版本里，当在组件中使用 v-for 时，key 现在是必须的。

* vue数组的变异方法，：push()pop()shift()unshift()splice()sort()reverse()
非变异 (non-mutating method) 方法，例如：filter(), concat() 和 slice()

* Vue 不能检测以下变动的数组：
1.	当你利用索引直接设置一个项时，例如：```vm.items[indexOfItem] = newValue```
解决方法

```javascript
// Vue.set
Vue.set(example1.items, indexOfItem, newValue)
或者
// Array.prototype.splice
example1.items.splice(indexOfItem, 1, newValue)
```

2.	当你修改数组的长度时，例如：```vm.items.length = newLength```
解决方法

``` example1.items.splice(newLength) ```

* 对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 
```Vue.set(object, key, value) ```方法向嵌套对象添加响应式属性。
还可以使用``` this.$set ```实例方法，或者

```javascript

this.userProfile = Object.assign({}, this.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})

```

* 事件修饰符。

.stop .prevent. capture .self .once .native

```@click.prevent.self ```会阻止所有的点击，而
```@click.self.prevent``` 只会阻止对元素自身的点击。


* 构造 Vue 实例时传入的各种选项大多数都可以在组件里使用。只有一个例外：data 必须是函数。

* Vue 实例指的是 new Vue

组件指的是 Vue.component,或者new Vue里面的component

* 组件实例的作用域是孤立的

* 当使用的不是字符串模板时，camelCase (驼峰式命名) 的 prop 需要转换为相对应的 kebab-case (短横线分隔式命名)

* 初学者常犯的一个错误是使用字面量语法传递数值：
```html
<!-- 传递了一个字符串 "1" -->
<comp some-prop="1"></comp>
```
因为它是一个字面量 prop，它的值是字符串 "1" 而不是一个数值。
>>如果想传递一个真正的 JavaScript 数值，则需要使用 v-bind，从而让它的值被当作 JavaScript 表达式计算：
```html
<!-- 传递真正的数值 -->
<comp v-bind:some-prop="1"></comp>
```

* 每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop。注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，
>>如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。

* .sync 修饰符对一个 prop 进行“双向绑定”.默认Prop是单向绑定的。

从 2.3.0 起我们重新引入了 .sync 修饰符，但是这次它只是作为一个编译时的语法糖存在。它会被扩展为一个自动更新父组件属性的 v-on 监听器。
如下代码
```
<comp :foo.sync="bar"></comp>
```
会被扩展为：
```
<comp :foo="bar" @update:foo="val => bar = val"></comp>
```
当子组件需要更新 foo 的值时，它需要显式地触发一个更新事件：
```
this.$emit('update:foo', newValue)
```

## Vuex
 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：
1.	最好提前在你的 store 中初始化好所有所需属性。
2.	当需要在对象上添加新属性时，你应该使用

```Vue.set(obj, 'newProp', 123)```, 

或者以新对象替换老对象。例如，利用 stage-3 的对象展开运算符我们可以这样写：

```state.obj = { ...state.obj, newProp: 123 }```


 mutation 必须是同步函数


store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise

## ｂａｂｅｌ
transform-runtime最大的作用主要有几下几点：

1. 解决编译中产生的重复的工具函数，减小代码体积

2. 只支持新的Javascript语法扩展，比如`Set`，`Map`...不支持
```Object.assign，"foobar".includes("foo")```
这些对于API的扩展，所以需要使用这些新的API功能需要引入```babel-polyfill```

```"presets": ["env"]``` 表示```babel-preset-env```

每年每个 preset 只编译当年批准的内容。 而 babel-preset-env 相当于 es2015 ，es2016 ，es2017 及最新版本。

```Polyfill```的准确意思为：用于实现浏览器并不支持的原生API的代码。
例如，querySelectorAll是很多现代浏览器都支持的原生Web API，但是有些古老的浏览器并不支持，那么假设有人写了库，只要用了这个库， 你就可以在古老的浏览器里面使用```document.querySelectorAll```，使用方法跟现代浏览器原生API无异。那么这个库就可以称为```Polyfill```或者```Polyfiller```。
好，那么问题就来了。jQuery是不是一个Polyfill?答案是No。因为它并不是实现一些标准的原生API，而是封装了自己API。一个Polyfill是抹平新老浏览器 标准原生API 之间的差距的一种封装，而不是实现自己的API。


在 Vuex 模块化中，state 是唯一会根据组合时模块的别名来添加层级的，后面的 getters、mutations 以及 actions 都是直接合并在 store 下。

```getter({state,getters,rootState})```由于 getters 不区分模块，所以不同模块中的 getters 如果重名，Vuex 会报出``` 'duplicate getter key: [重复的getter名]'``` 错误。

```mutations(state)``` mutation 的回调函数中只接收唯一的参数——当前模块的 state。mutations 与 getters 类似，不同模块的 mutation 均可以通过 ```store.commit``` 直接触发。

```action({state,rootState, getters, mutations, actions})```与 mutations 类似，不同模块的 actions 均可以通过 ```store.dispatch``` 直接触发.

在 action 中可以通过 context.commit 跨模块调用 mutation，同时一个模块的 action 也可以调用其他模块的 action

同样的，当不同模块中有同名 action 时，通过 store.dispatch 调用，会依次触发所有同名 actions。

## ｖｕｅ－ｌｏａｄｅｒ
使用 scoped 后，父组件的样式将不会渗透到子组件中。

通过 v-html 创建的 DOM 内容不受作用域内的样式影响，但是你仍然可以通过深度作用选择器来为他们设置样式

```sass-resources-loader```:在每个组件里加载一个设置文件，而无需每次都将其显式导入 

Vue 组件中的所有 JavaScript 默认使用 ```babel-loader```处理

```file-loader``` 可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存此外，这意味着 你可以就近管理图片文件，可以使用相对路径而不用担心布署时URL问题。使用正确的配置，Webpack 将会在打包输出中自动重写文件路径为正确的URL。

```url-loader``` 允许你有条件将文件转换为内联的 ```base-64 URL``` (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求。如果文件大于该阈值，会自动的交给 file-loader 处理。

对于 css, 由```vue-style-loader``` 返回的结果通常不太有用。使用 ```postcss ```插件将会是更好的选择。

```extract-text-webpack-plugin```:Extract text from a bundle, or bundles, into a separate file.

```javascript
loader: 'vue-loader',
        options: {
          extractCSS: true
        }
```
```HtmlWebpackPlugin```： 使得webpack入口点生成的文件都会在生成的HTML文件中的script标签内。
```ExtractTextPlugin```提取CSS，然后包含在HTML head中的link标签内。
 
## 完整的导航解析流程 vue-router
1.	导航被触发。
2.	在失活的组件里调用beforeRouteLeave 。
3.	调用全局的 beforeEach 守卫。
4.	在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5.	在路由配置里调用 beforeEnter。
6.	解析异步路由组件。
7.	在被激活的组件里调用 beforeRouteEnter。
8.	调用全局的 beforeResolve 守卫 (2.5+)。
9.	导航被确认。
10.	调用全局的 afterEach 钩子。
11.	触发 DOM 更新。
12.	用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。
 

## 遇到的问题
1. 详解vue2父组件传递props异步数据到子组件的问题（http://www.jb51.net/article/117447.htm）
解决方法：使用v-if可以解决报错问题，和created为空问题
2. 在没有全部渲染时，不显示任何元素，自带的html文字也不要显示，只显示载入中的动画；等全部渲染完成后，载入中动画消失，完整的页面出现。
解决方法：html标签加上v-cloak，样式里面
```
[v-cloak] {
    display: none;
}
```


