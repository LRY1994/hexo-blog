---
layout: post
title:  "vue vs react vs angular1"
date:   2017/12/28 
categories: [学习>>专题笔记]
---

vue 与angualr1 ,react 不同体验整理
===============

之前项目组的前端用的是angualr1.x版本，给我的感觉就是angular啥都有，只要注入依赖就可以用。

工作闲暇之余会自己学习新知识，react很火，但是公司没有react的项目实操，所以自己找了网上一个比较适合入门的项目来练手，下面是我在边敲边学的过程中体验到的不同点。

而react和vue就是轻量级的，要什么就去找，找来再用。


* [React与vue比较](#React与vue比较)
    * [生命周期](#生命周期)
    * [总结](#总结)
* [React-redux与vuex比较](#React-redux与vuex比较)
    * [1-使用流程](#1-使用流程)
    * [2-共享数据store](#2-共享数据store)
    * [3-模块](#3-模块)
    * [4-唯一可以改变state的方式](#4-唯一可以改变state的方式)
    * [5-组件连接姿势](#5-组件连接姿势)
    * [6-调用链](#6-调用链)
    * [7-总结](#7-总结)


# React与vue比较
### 生命周期
#### React生命周期
![react生命周期](https://raw.githubusercontent.com/LRY1994/lry1994.github.io/master/img/content/react-life.png)
#### vue生命周期
![vue生命周期](https://raw.githubusercontent.com/LRY1994/lry1994.github.io/master/img/content/vue-life.png)


### 总结
#### React
1.	子组件直接import后使用
2.	在render()的return里面进行模板渲染
3.	实例的方法在constructor里面定义
4.	实例的数据在constructor里面定义
5.	contextTypes验证数据类型
6.	defaultProps设置默认值
7.	父组件传给子组件的数据，在子组件内用this.props.xxx获取

#### Vue
1.	子组件import后，还需在实例里面的components注册
2.	直接在实例的template属性或标签渲染模板
3.	实例的方法写在method里面
4.	实例的数据写在data,computed里面
5.	props验证数据类型
6.	props里面的default设置默认值
7.	父组件传给子组件的数据在props里面注册，在子组件内用this.xxx获取。这一点有点像angular的隔离scope
(react没有的)
8.	computed可以依赖于data更新而更新
9.	有watch监听函数


#### 觉得与angular类似地方
1.	双向绑定，v-指令和angular的ng-指令类似
2.	同样有watch监听函数
3.	vue父组件传给子组件的数据要在props里面注册，在子组件内用this.xxx获取。这一点有点像angular的隔离scope

觉得vue比起angular更像react。vue和react很像，但是比react细腻。



# React-redux与vuex比较
### 1-使用流程
#### React-redux
1. 写reducer（previousState,action）函数 return 更新后的所需要的数据
2. Store=createStore(reducer)
3. <Provider store={store}>{router}< Provider/>
4. 定义action对象，{事件类型type,事件参数data}
5. connect(mapStateToProps, mapDispatchToProps)（组件）
6. 组件里面使用this.props.（action.type）(action.data)

![react-redux使用流程](https://raw.githubusercontent.com/LRY1994/lry1994.github.io/master/img/content/react-redux-process.png)

#### vuex
1. 写好store和不同模块的state,mutations,getters,actions 
2. store = new Vuex.Store( )
3. new Vue({
  el: '#app',
   store,
  render: h => h(App)
})
4. 组件使用

mapState

mapMutations

mapGetters

mapActions

连接

### 2-共享数据store
#### React-redux的store
```javascript
const store = createStore(
    combineReducers(reducer),
       
);

ReactDOM.render(
<Provider store={store}>
  {router}
</Provider>,
document.getElementById('app')
);

```
#### Vuex的store
```javascript
store = new Vuex.Store({
  state:
mutations
actions
getters
  modules:}）

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
```

### 3-模块
#### React-redux的reducer
reducer和vuex的modules类似，可以用来划分不同模块

```javascript
// reducer
function User (state = JSON.parse(Tool.localItem('User')), action) {     
        switch (action.type) {
            case SIGNIN_SUCCESS: //登录成功                               
                Tool.localItem('User', JSON.stringify(action.target));               
                return action.target;
         
            case SIGNIN: //退出
                Tool.removeLocalItem('User');
                return null;

            default:            
               return state;
        }
    
    }
/**省略。。。。。。*/
export default { IndexList, Topic, MyMessages, UserView, User }

```
#### vuex的modules
```javascript
export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload     
    }
  },
  actions,
  getters,
  modules: {
    cart,
    products,
    login}
})
```
### 4-唯一可以改变state的方式

#### React-redux的action
action就是一个对象,具体处理方法在reducer里面实现
```javascript
export function signinSuccess(target){
return {
type:'signinSuccess',
target
}
};
```

#### Vuex的mutation
mutation是方法，由action调用
```javascript
// mutations
const mutations = {
  [types.RECEIVE_PRODUCTS] (state, { products }) {
    state.all = products
  },

  [types.ADD_TO_CART] (state, { id }) {
    console.log('form product')
    state.all.find(p => p.id === id).inventory--
  }
}
```

### 5-组件连接姿势
#### React-redux连接
用connect方法
```javascript
const mapStateToProps = (state) => {
    return {
      User: state.User
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        signinSuccess: (user) => {
            dispatch(signinSuccess(user))
        }
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
```


#### Vuex连接
只需要在组件里面映射
mapState\
mapMutations\
mapGetters\
mapActions

```javascript
export default {
  computed: mapGetters({
    products: 'allProducts'
  }),
  methods: mapActions([
    'addToCart'
  ]),
```

### 6-调用链
#### React-redux调用链
![React-redux调用链](https://raw.githubusercontent.com/LRY1994/lry1994.github.io/master/img/content/react-redux-lian.png)
#### Vuex调用链
![vuex调用链](https://raw.githubusercontent.com/LRY1994/lry1994.github.io/master/img/content/vuex-lian.png)

### 7-总结
#### React-redux
action是唯一修改state的方法

Action用dispatch调用

reducer， 和vuex的modules相似

组件调用都是dispatch action


#### Vuex
mutation是唯一修改state的方法，类似React-redux的action

除了mutation还有action,

mutation用于同步操作，用commit调用

action用于异步操作,用dispatch调用

Modules，和redux的reducer相似

有getters

有namespaced

组件调用都是dispatch action

