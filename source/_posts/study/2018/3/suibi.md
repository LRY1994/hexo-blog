---
title: 2018-3总结
date:   2018/3/1
categories: 
    - 学习 
    - 总结
tags:
    - vue
    - ES6 
---
### 给点击路由的时候加上监听事件
```html
<router-link class="my-link" :to="{name: 'main.provider.index', params: {providerId: scope.row.providerId}}">提供者主页</router-link>
```
    解决方法：
    > 给组件绑定原生事件
        有时候，你可能想在某个组件的根元素上监听一个原生事件。可以使用 v-on 的修饰符 .native。例如：

        <my-component v-on:click.native="doTheThing"></my-component>

参考连接
[给组件绑定原生事件](https://segmentfault.com/q/1010000007896386)

### 块内元素文字上下居中
line-height设置为height的值

### export及export default的区别
在一个文件或模块中，export可以有多个，export default仅有一个。 
    
- export

(1) 导入的时候带花括号

    ```javascript
        // 写法一
        export var m = 1;

        // 写法二
        var m = 1;
        export {m}; //export m 或者export 1都错误

        // 写法三
        var n = 1;
        export {n as m};
    ```

(2) export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

- export default 

(1) 导入的时候没有花括号

    ```javascript
        import str from 'demo1' //导入的时候没有花括号
    ```

(2) export default命令的本质是将后面的值，赋给default变量，所以可以直接将一个值写在export default之后。

### 用refs来组件通信
在讨论非父子通信的时候，并在没有用Vuex的情况下，我是用官网那种创建Vue实例的方法，但是同事提到了另一种方法
用refs来引用，不禁一想这好像也是一种解决方案，就是觉得怪怪的。在这里记录一下

    
### 关于第4点，今天工作用了this.$refs来传播事件，类似于$brocast,但是VUE2把$brocast废除了。

总结一下vue传播事件

(1) 子组件传播事件给父组件，用``$on,$emit``.

虽然说是这样说，但是不是直接在父组件里面写$on的,应该是这样

```html
<parent>
    <child @eventname="event">
</parent>
```
然后在parent组件里面写 event函数.event(){}

子组件调用的时候用``this.$emit('eventname',payload) ``

(2)父组件传播事件给子组件，用 ``$refs``

```html
<parent>
    <child ref="refname">
</parant>
```

调用的时候用``this.$ref['refname'].eventname()``

(3)上面有种都麻烦的话，创建实例bus


###  js的数组可以是这样的形式

``(4) [{…}, {…}, {…}, {…}, total: 4, code: "core.ok"]``

他的length是4
    
### 把字符串转换成数字可以用数字运算符,但是 + 不行
```javascript
console.log("2">>>0)  //2 number 
console.log("2">>0)  //2 number 
console.log("2"<<0)  //2 number  没有（<<<）
console.log("2"- 0)    //2 number
console.log("2"+0)    //20 string
```

### reduce函数好好用

今天写了一个有重大作用的reduce函数，好开心。在此纪念一下

```javascript
//str {String}, "app.get.logo.list"
//ctx {Object},  this._$http
//return {Object}, this._$http.app.get.logo.list
 getBackend(str){
        const arr = this.loadBackend.split('.');
        let ctx= this._$http;
        let a;
        let b=arr.reduce((prev, cur, idx) => {		        
              a = prev[cur] ;         
            return a;
        },ctx);              
          return b;      
      }
```

### 用mpVue开发小程序了
[https://www.itcodemonkey.com/article/2573.html](https://www.itcodemonkey.com/article/2573.html)

### vue项目中全局引入scss文件的方法
```shell
npm install node-sass --save-dev
npm install sass-loader --save-dev
npm install sass-resources-loader --save-dev
```
修改build/utils.js
```javascript
scss: generateLoaders('sass').concat(
      {
        loader: 'sass-resources-loader',
        options: {
          resources: path.resolve(__dirname, '../src/assets/your.scss')
        }
      }
    )
```

### elementUI的layout问题
el-footer会直接fixed在窗口底部，不好看，

解决方法：el-footer放到el-main里面
```html
<el-container style="height:100%;">
    <el-header class="header" style="height:100px">
        <cty-navbar :navs="navs"></cty-navbar>
    </el-header>

    <el-main>      
        <el-scrollbar wrap-style="overflow-x:hidden;" style="min-height: 800px">
            <div>
                <router-view></router-view>
            </div>           
        </el-scrollbar>
                        
        <el-footer class="footer" style="height:70px">
            <cty-footer></cty-footer>
        </el-footer>
    </el-main>
        
</el-container>
```
### vue路由刷新问题，两个路由对应一个组件，如何能让路由重载
[https://segmentfault.com/q/1010000010844655](https://segmentfault.com/q/1010000010844655)

写在共用组件文件里

```javascript
data(){
...
}
mounted(){...},
 watch: {          
            $route: {
                handler: function (val, oldVal) {
                    this.worksheet_type = this.$route.params.type;                     
                },
                deep: true
            }
        },
```
在共用组件上加上key
``<div :key="$route.path">``

### 单行文本超出隐藏并显示省略号
```css
.element{
width: 20em;/*不允许出现半汉字截断*/
overflow: hidden; /*自动隐藏文字*/
text-overflow: ellipsis;/*文字隐藏后添加省略号*/
white-space: nowrap;/*强制不换行*/
```

### 多行文字隐藏加省略号
```css
.element{
    width: 20em;
    height: 3em;/*注意高度和宽度，不允许出现半汉字截断*/
    line-height: 1.5em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
```