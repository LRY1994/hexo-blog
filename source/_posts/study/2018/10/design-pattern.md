---
title: 读《Learning Javascript Design Patterns》 -Addy Osmani 
date:   2018/10/18
categories: 
    - 学习
    - 专题笔记 
tags:
    - 设计模式
---


# 《Learning Javascript Design Patterns》 -Addy Osmani 人民邮电出版社

## 创建对象的三种方法
```javascipt
obj={};
obj=new Object();
obj=Object.create(null)
```

## 设计模式类别
### 创建型
* Constructor
* [Prototype](#Prototype.js)
* [Singleton](#Singleton.js)
* [Factory](#Factory.js)
* [Abstarct](#Abstract-Factory.js)
* Builder
### 机构型
* Decorator
* Facade : 和[Module](#Module.js)类似
* Flyweight
* Adapter
* Proxy
### 行为型
* Iterator
* [Mediator](https://github.com/LRY1994/nice-code/blob/master/designPattern/Mediator.js)
* [Observer](#Observer.js)
* [Publich-Subscribe](#Publich-Subscribe.js)
* Visitor

Observer和Publich-Subscribe的区别
{%asset_img observer.png%}
{%asset_img publish-suscriber.png%}

# Prototype.js
```js
//Object.create
var vehicle = {
    getModel:function(){
        console.log(this.model);
    }
};
var car = Object.create(vehicle,{
    "id":{
        value:1,
        enumerable:true
    },
    "model":{
        value:"Ford",
        enumerable:true
    }
});

//function F(){}
var beget = (function({
    function F(){};
    return function(_proto_){
        F.prototype=_proto_;
        return new F();
    }
}))();

var car =beget(vehicle);
```
# Singleton.js
```js
//Singleton单例模式
var singleTon = (function(){
    var instance;
    function init(){
        function privateMethod(){}
        var privateVar = 'privateVar';
        return {
            publicMethod :function(){},
            publicVar : 'publicVar'
        }
    }
    return{
        getInstance:function(){
            if(!instance){ instance = init(); }
            return instance;
        }
    }
})

var singleTon2 = (function(){
    var instance;
    var _static ={}
    function singleTon(opt){//构造函数
        options = opt ||{};
        this.point = opt.point;
        this.privateMethod = function(){}
    }
    var _satic = {
        name :'singleTon',
        getInstance:function(opt){
            if(!instance){ instance = new singleTon(opt); }
            return instance;
        }
    };
    return _static;
})

singleTonTest = singleTon2.getInstance({point:5})
```

# Factory.js
```js
//Factory.js
function Car(options){
    this.doors = options.doors ||4;
    this,color = options.color||'silver';
}
function Trunk(options){
    this.weelSize=options.weelSize||'large';
    this.color =options.color||'blue';
}
function VehicleFactory(){}
VehicleFactory.prototype.vehicleClass = Car;
VehicleFactory.prototype.createVehicle = function(options){
    if(options.vehicleTtype == 'car'){
        this.vehicleClass=Car;
    }else{
        this.vehicleClass = Truck;
    }
    return new this.vehicleClass(options);
}
//use
var carFactory=new VehicleFactory();
var car=carFactory.createVehicle({
    vehicleTtype:'car',
    doors:6,
    color:'yellow'
})
var trunk = carFactory.createVehicle({
    vehicleTtype:'trunk',
    color:'red',
    weelSize:'small'
})
```

# Abstract-Factory.js
```js
//Factory.js
function Car(options){
    this.doors = options.doors ||4;
    this.color = options.color||'silver';
}
function Trunk(options){
    this.weelSize=options.weelSize||'large';
    this.color =options.color||'blue';
}
var AbstractFactory=(function(){
    var types={};
    return{
        getVehicle:function(type,options){
            var Vehicle = types[type];
            return Vehicle? new Vehicle(options):null
        },
        registerVehicle:function(ty,vehicle){//这个必须有
            var proto = vehicle.prototype;
            if(proto.drive&&proto.breakDown){
                types[type]=vehicle
            }
            return AbstractFactory;
        }
        
    }
})();

//use
AbstractFactory.registerVehicle("car",Car);
AbstractFactory.registerVehicle("truck",Trunk);
var car = AbstractFactory.getVehicle("car",{
    door:6,
    color:'red'
});
var trunk = AbstractFactory.getVehicle("trunk",{
    weelSize:'small',
    color:'red'
})
```

# Observer.js
```js
//Observer 
{//观察者
function Observer()
    this.observerList = [];
}
Observer.prototype.get = function(index){
    return this.observerList[index]
}
Observer.prototype.add = function(ConcreteOberver){
    return this.observerList.push(ConcreteOberver)
}
//目标
function Subject(){
    this.observers=new Observer();
}
//具体观察者注册到目标
Subject.prototype.add = function(ConcreteOberver){
    this.observers.add(ConcreteOberver)
}
//目标发生变化，调度观察者
Subject.prototype.notify = function(context){
    for(let i=0;i<this.observers.count();i++){
        this.observers.get(i).update(context)
    }
}
//具体观察者
function ConcreteOberver(){
    this.update = function(){}
}
```
# Publich-Subscribe.js
```js
//Publish/Subscribe

var pubsub={};//调度中心
(function(q){
    var topics={},subUid = -1;
    q.publish = function(topic,args){
        if(!topics[topic]) return false;
        var subscribers = topics [ topic];
        var len = subscribers? subscribers.length:0;
        while(len -- ){
            subscribers[len].func(topic,args)
        }
    };
    q.subscribe = function(topic,func){
        if(!topics[topic]) topics[topic]=[];
        var token = (++subUid).toString();
        topics[topic].push({token :token,func:func});
        return token;
    };
    q.unsunscribe = function(token){
        for(var m in topics){
            if(topics[m]){
                for(let i=0,j=topics[m].length;i<j;i++){
                    if(topics[m][i].token ==token){
                        topics[m].splice(i,1);
                        return token;
                    }
                }
            }
        }
        return this;
    }
})(pubsub)
```

