---
layout: post
title:  "原生DOM兼容特性总结"
date:   2018/2/26
categories: 
    - 学习
    - 专题笔记
tags:
    - DOM
---

浏览器主要也就是IE有点独特，所以把IE重点区分开

| 名称           |   主流                  |IE    |
| --------------------  | :------------------ | :--------------------------------------|
| 内文本  |  innerText                                   |   textContent |
| 请求对象 |  XMLHttpRequest  |   ActiveXObject<br>["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"] |
| 监听事件添加 | addEventListener(DOM2),<br> \[\'on\'+eventName\](DOM0) |    attachEvent |
| 监听事件移除 | removeEventListener(DOM2),<br>['on'+eventName]=null(DOM0) | detachEvent|
| 事件对象 |function(e) e| window.event(IE7之前)|
|阻止默认事件|preventDefault|e.returnValue=false|
|阻止冒泡|stopPropagation|e.cancelBubble=true|
|键盘事件键盘编码|e.charCode|e.keyCode|
|获取剪贴板的文本|e.clipboardData|window.clipboardData|
|设置剪贴板文本|e.clipboardData.setData("text/plain",value);|window.clipboardData.setData("text",value);|
|触发事件的元素|e.target|e.srcElement|
|获取样式|getComputedStyle(obj,false)[attr];(Firefox浏览器)<br> obj.style.attr(只对filter,opacity等有效)<br>obj.style[attr]|obj.currentStyle[attr];|
|窗口左边的位置|window.screenLeft|window.screenX|
|页面视口大小|window.innerHeight|if(document.compatMode=="CSS1Compat")window.documentElement.clientHeight;<br> if(document.compatMode=="BackCompat")window.body.clientHeight<br>|
|获取元素| document.getElementById(id);|    document.all[id];(IE5)|  
|返回指定的属性|ele.getAttribute(attr)|ele.attribute[attr]|
|ele是否存在指定属性 attr|ele.hasAttribute(attr)|ele.attributes[attr].specified;|
|鼠标滚动，正数表示向上滚动|function getWheelDelta(e){<br>if(e.wheelData){<br>return (client.engine.opera&&client.engine.opera<9.5)?<br>-e.wheelData:e.wheelData;<br>}else {<br>return -e.detail*40;//firefox<br>}<br>}||
|提取选中的文本|textbox.value.subString(textbox.selectionStart,textbox.selectionEnd);|document.selection.createRange().text;<br>(IE8之前没有selectionStart，selectionEnd属性||
|设置文本选中|textbox.setSelectionRange(startIndex,stopIndex);| var range=textbox.createTextRange();<br>range.collapse(true);<br>range.moveStart("character",0);<br>range.moveEnd("character",stopIndex-startIndex);<br>range.select()|
 
下面是积累下来的一些兼容函数，可以当做模板用
* [添加多个onload事件](#添加多个onload事件)
* [处理ActiveXObject/XMLHttpRequest问题](#处理ActiveXObject/XMLHttpRequest问题)
* [请求对象的属性和方法设置](#请求对象的属性和方法设置)
* [发送表单数据](#发送表单数据)
* [跨浏览器的CORS](#跨浏览器的CORS)
* [跨浏览器事件处理程序](#跨浏览器事件处理程序)
* [处理target/srcelemnt问题，代替this](#处理target/srcelemnt问题，代替this)
* [实现insertAfter](#实现insertAfter)
* [给element加上类名](#给element加上类名)
* [判断是不是数组](#判断是不是数组)
* [IE10之前不支持docunment.getElementByClassName](#IE10之前不支持docunment.getElementByClassName)
* [获取css样式](#获取css样式)
* [手写动画](#手写动画)
* [取得窗口左边和上边的位置](#取得窗口左边和上边的位置)
* [取得页面视口大小](#取得页面视口大小)
* [检测插件方法](#检测插件方法)
* [获取元素](#获取元素)
* [检查对象的某个特性是否存在](#检查对象的某个特性是否存在)
* [对象转换成数组](#对象转换成数组)
* [返回指定的属性](#返回指定的属性)
* [ele是否存在指定属性](#ele是否存在指定属性)
* [ele是否符合选择器selector](#ele是否符合选择器selector)
* [获取内文本](#获取内文本)
* [获取鼠标事件的父元素](#获取鼠标事件的父元素)
* [探测按的是鼠标的哪个键](#探测按的是鼠标的哪个键)
* [鼠标滚动事件](#鼠标滚动事件)
* [提取选中的文本](#提取选中的文本)
* [设置文本选中](#设置文本选中)
* [bind方法对老版本的浏览器不起作用](#bind方法对老版本的浏览器不起作用)
* [包装cookie](#包装cookie)
* [包装子cookie](#包装子cookie)
* [indexedDB](#indexedDB)
* [手写typeof](#手写typeof)
* [深度克隆](#深度克隆)
* [组合使用构造函数模式和原型模式创建对象](#组合使用构造函数模式和原型模式创建对象)
* [组合继承](#组合继承)
* [观察者模式](#观察者模式)
* [分享一个题目](#分享一个题目)

## 添加多个onload事件
 ```javascript
function addLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload!= 'function'){
        window.onload=func;
    }
    else{
        window.onload=function(){
            oldonload();
            func();
        }
    }

}
```
## 处理ActiveXObject/XMLHttpRequest问题
 ```javascript
//第一种写法，《js高级程序设计》的写法  惰性载入技巧
function createXHR(){
	if(typeof XMLHttpRequest!="undefined"){//XMLHttpRequest
		createXHR=function(){
			return new XMLHttpRequest();
		};
	}else if(typeof ActiveXObject!="undefined"){//IE ActiveXObject
		createXHR=function(){
			if(typeof arguments.callee.activeXString!="string"){
				var versions=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],//IE
				    i,len;
				 for(i=0,len=versions.length;i<len;i++){
				    try{
				    	new ActiveXObject(versions[i]);
				    	arguments.callee.activeXString=version[i];
				    	break;
				    }catch(ex){}
				 }
				
			}
			return new ActiveXObject(arguments.callee.activeXString);
		};
	}else{
		createXHR=function(){
			throw new Error("fail");
		}
	}
	return createXHR();
}

//第二种写法
function createXHR(){
    if(typeof XMLHttpRequest=="undefined"){
        XMLHttpRequest= function () {
            try{
                return new ActiveXObject("Msxml2.XMLHTTP.6.0");
            }
            catch (e){}

            try{
                return new ActiveXObject("Msxml2.XMLHTTP.3.0");
            }
            catch (e){}

            try{
                return new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e){}

            return false;
        }
    }
    return new XMLHttpRequest();
}
```



## 请求对象的属性和方法设置
```javascript
var xhr=createXHR();
xhr.onreadystatechange=function(){//firfox引入onlaod，readyState==4时触发,代替onreadystatechange
	if(xhr.readyState==4){
		try{
			if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
				alert(xhr.responseText);
			}else {
				alert("unsuccessful");
			}
		}catch(ex){}
	}
}
xhr.onload=function(){
	if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
				alert(xhr.responseText);
			}else {
				alert("unsuccessful");
			}
}
xhr.onprogress=function(event){
	if(event.lengthComputable){//进度信息是否可用
		console.log("Received"+event.position+"of"+event.totalSize);
	}
}
xhr.onerror=function(){
	alert("error");
}
xhr.timeout=1000;
xhr.ontimeout=function(){
	alert("timeout");
}
xhr.open("get","example.php",true);
xhr.overrideMimeType("text/xml");
xhr.send(null);//GET
```
## 发送表单数据
```javascript
var form=document.getElementById("info");
xhr.send(serialize(form));//第一种写法
xhr.send(new FormData(form));//第二种写法
```

## 跨浏览器的CORS
```javascript
function createCORSRequest(method,url){
	var xhr=new XMLHttpRequest();
	if("withCredentials" in xhr){
		xhr.open(method,url,true);
	}else if(typeof XDomainRequest !="undefined"){
		xhr=new XDomainRequest();
		xhr.open(method,url);
	}else {
		xhr=null;
	}
	return xhr;
}
var request=createCORSRequest("get","http://www.somewhere");
if(request){
	request.onload=function(){};
	request.send();
}
```

## 跨浏览器事件处理程序

 ```javascript
var eventUtil={
	// 页面加载完成后
    readyEvent : function(fn) {
        if (fn==null) {
            fn=document;
        }
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = fn;
        } else {
            window.onload = function() {
                oldonload();
                fn();
            };
        }
    },

    addEventHandler: function (obj, eventName, handler) {
        if (document.attachEvent) {//IE
            obj.attachEvent("on" + eventName, handler);
        } else if (document.addEventListener) {//DOM2级
            obj.addEventListener(eventName, handler, false);//false- 默认。事件句柄在冒泡阶段执行
        }
        else{//DOM0级
            obj['on'+eventName]=handler;
        }
    },

    removeEventHandler:function(obj, eventName, handler){
        if (document.attachEvent) {//IE
            obj.detachEvent("on" + eventName, handler);
        } else if (document.addEventListener) {//DOM2级
            obj.removeEventListener(eventName, handler, false);
        }
        else{//DOM0级
            obj['on'+eventName]=null;
        }
    },
   //获取event对象的引用，取到事件的所有信息，确保随时能使用event；
    getEvent: function (e) {
    	var ev = e || window.event;
        if (!ev) {
            var c = this.getEvent.caller;
            while (c) {
                ev = c.arguments[0];
                if (ev && Event == ev.constructor) {
                    break;
                }
                c = c.caller;
            }
        }
        return ev;
    },
    //事件类型
    getType: function (e) {
        return e.type;

    },
    //调用事件的元素
    getElement: function (e) {
        return e.target|| e.srcElement;
    },
    //阻止默认事件
    preventDefault: function (e) {
        e= this.getEvent(e);
        if(e.preventDefault){
            e.preventDefault();
        }
        else {
            return e.returnValue=false;//IE
        }
    },
    //阻止冒泡
    stopPropagation:function(e) {
      if(e.stopPropagation){
          e.stopPropagation();
      }
        else {
          e.cancelBubble=true;//IE
      }

    },
    //键盘事件键盘的编号
    getCharCode:function (e){
    	if(typeof e.charCode=="number")return e.charCode;
    	else return e.keyCode;
    },
    //获取剪贴板的文本
    getClipbordText:function(e){
    	var clipboardData=(e.clipboardData||window.clipboardData);
    	return clipboardData.getData("text");
    },
    //设置剪贴板文本
    setClipboardText:function(e,value){
    	if(e.clipboardData){
    		return e.clipboardData.setData("text/plain",value);
    	}else if(window.clipboardData){
    		return window.clipboardData.setData("text",value);
    	}
    },

}
```

## 处理target/srcelemnt问题，代替this
 ```javascript
function getActivatedObject(e) {
    var obj;
    if (!e) {
        // early version of IE
        obj = window.event.srcElement;
    } else if (e.srcElement) {
        // IE 7 or later
        obj = e.srcElement;
    } else {
        // DOM Level 2 browser
        obj = e.target;
    }
    return obj;
}
```
## 实现insertAfter
 ```javascript
/**
 * 把newElement插在targetElement后面 ,js的API只有insertBefore，没有insertAfter
 */
function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
```

## 给element加上类名
 ```javascript
function addClass(element,value) {
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName+= " ";
        newClassName+= value;
        element.className = newClassName;
    }
}
```
## 判断是不是数组
 ```javascript
function isArray(arg) {
	//return Object.prototype.toString.call(arr)=='[Object Array]';这种方法也可以
    if (typeof arg == 'object') {
        //所有数组都有一个包含单词'arry'的constructor,最后的i表示不区分大小写
        var criteria = arg.constructor.toString().match(/array/i);
        return (criteria != null);
    }
    return false;
}
```
## IE10之前不支持docunment.getElementByClassName
 ```javascript
function getByClass(clsName,parent){
    if(docunment.getElementByClassName) return docunment.getElementByClassName(clsName);
    //IE10之前
    var oParent=parent?document.getElementById(parent):document,
        eles=[],
        elements=oParent.getElementsByTagName('*');

    for(var i=0,l=elements.length;i<l;i++){
        if(elements[i].className==clsName){
            eles.push(elements[i]);
        }
    }
    return eles;
}
```

## 获取css样式
 ```javascript
function getStyle(obj,attr){
    if(obj.currentStyle) {//IE 浏览器
        return obj.currentStyle[attr];
    }else{//Firefox浏览器
        return getComputedStyle(obj,false)[attr];
    }
}

```
## 手写动画
多个属性同时运动需要用到JSON,并且所有运动达到目标值才能停止

 ```javascript
//动画 startMove(oLi,{width:400,height:200,opacity:100})
function startMove(obj,json,fn){
    clearInterval(obj.timer);
    obj.timer=setInterval(function () {
        for(var attr in json){
            //1.取当前的值
            var cur=0;
            if(attr=='opacity'){
                cur=Math.round(parseFloat(getStyle(obj,attr))*100);
            }
            else {
                cur=parseInt(getStyle(obj,attr));
            }
            //2.算速度
            var speed=(json[attr]-cur)/8;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            //3.检测停止
            var flag=true;
            if(cur!=json[attr]){//使得所有属性做完运动才结束
                flag=false;
            }
            if(attr=='opacity'){
                obj.style.filter='alpha(opacity:'+(cur+speec)+')';
                obj.style.opacity=(cur+speed)/100;
            }
            else{
                obj.style[attr]=(cur+speed)+'px';
            }
        }
        if(flag){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    })
}
```

## 取得窗口左边和上边的位置
 ```javascript
var leftPos=(typeof window.screenLeft =="number")?window.screenLeft:window.screenX;
```

## 取得页面视口大小
 ```javascript
var pageWidth=window.innerWidth,
    pageHeight=window.innerHeight;
    if(typeof pageHeight!="number"){
    	if(document.compatMode=="CSS1Compat"){//标准模式
    		pageHeight=window.documentElement.clientHeight;
    		pageWidth=window.documentElement.clientWidth;
    	}
    	else {//BackCompat
    		pageHeight=window.body.clientHeight;
    		pageWidth=window.body.clientWidth;
    	}
    }
```

## 检测插件方法
 ```javascript
/**
 *
* 检测插件方法一，IE下无效
*/
function hasPlugin(name){
	name=name.toLowerCase();
	for(var i=0;i<navigator.plugins.length;i++){
		if(navigator.plugins[i].toLowerCase().indexOf(name)!=-1)
		return true;
	}
	return false;
}

/**
 * 检测IE插件方法二 ,name是COM对象唯一标识符
 */
function hasIEPlugin(name){
	try{
		new ActiveXObject(name);
		return true;
	}catch(ex){
		return false;
	}
}
```

## 获取元素
 ```javascript
function getElement(id){
	if(document.getElementById){
		return document.getElementById(id);
	}else if(document.all){//IE5前
		return document.all[id];
	}else {
		throw new Error("no way to retrieve element!");
	}
}
```

## 检查对象的某个特性是否存在
 ```javascript
function isHostMethod(object,property){
	var t =typeof object[property];
	return t=="function"||
	       (!!(t=="object")&&object[property])||
	       t=="unknown";//不懂
}
```
## 对象转换成数组
 ```javascript
function convertToArray(nodes){
	var array=null;
	try{
		array=Array.propotype.slice.call(nodes,0);//IE8前无效
	}catch(ex){
		for(var i=0,len=nodes.length;i<len;i++){
			array.push(nodes[i]);
		}
	}
}
```
## 返回指定的属性
 ```javascript
/**
 * 
 * 返回指定的属性 IE ele.attribute[]
 * Element.getAttribute()
 */
function outputAttribute(ele){
	var pairs=new Array(),
	    attrname,attrvalue,u,len;
	for(i=0,len=ele.attribute.length;i<len;i++){
		attrname=ele.attributes[i].nodeName;
		attrvalue=ele.attributes[i].nodeValue;
		if(ele.attributes[i].specified){//IE
			pairs.push(attrname+'=\"'+attrvalue+'\"');
		}
	}
}
```
## ele是否存在指定属性
 ```javascript
/**
 * 
 * ele是否存在指定属性 attr
 */
function hasattribute(ele,attr){
	if(ele.hasAttribute){
		return ele.hasAttribute(attr);
	}else {//IE
		return ele.attributes[attr].specified;
	}
}
```
## ele是否符合选择器selector
 ```javascript
/**
 * ele是否符合选择器selector
 */
function matchesSelector(ele,selector){
	if(ele.matchesSelector){
		return ele.matchesSelector(selector);
	}else if(ele.msmatchesSelector){
		return ele.msmatchesSelector(selector);
	}else if(ele.mozmatchesSelector){
		return ele.mozmatchesSelector(selector);
	}else if(ele.webkitmatchesSelector){
		return ele.webkitmatchesSelector(selector);
	}else{
		throw new Error("not support");
	}
}
```
## 获取内文本
 ```javascript
//innerText/textContent
function getInnerText(ele){
	return (typeof ele.innerText=="string")?
	ele.innerText:ele.textContent;
}
```

## 获取鼠标事件的父元素
 ```javascript
    function getRelatedTarget(e){
    	if(e.relatedTarget) return e.relatedTarget;
    	else if(e.fromElement) return e.fromElement;//mouseover
    	else if(e.toElement) return e.toElement;//mouseout
    	else return null;
    }
  ```

## 探测按的是鼠标的哪个键
 ```javascript  
 function getButton(e){
    	if(document.implementation.hasFeature("MouseEvents","2.0")){
    		return e.button;
    	}else {
    		switch(e.button){
    			case 0 :
    			case 1:
    			case 3:
    			case 5:
    			case 7: return 0;
    			case 2:
    			case 6:return 2;
    			case 4:return 1;
    		}
    	}
    }
   ```

## 鼠标滚动事件
 ```javascript
 //鼠标滚动，正数表示向上滚动
function getWheelDelta(e){
    	if(e.wheelData){
    		return (client.engine.opera&&client.engine.opera<9.5)?
    	-e.wheelData:e.wheelData;
    	}else {
    		return -e.detail*40;//firefox
    	}
    	
 }
 
 ```

## 提取选中的文本
 ```javascript   
function getSelectedText(textbox){
	if(typeof selectionStart=="number"){
		return textbox.value.subString(textbox.selectionStart,textbox.selectionEnd);
	}else if(document.selection){//IE8之前没有selectionStart，selectionEnd属性
		return document.selection.createRange().text;
	}
}
```
 
## 设置文本选中
```javascript 
function selectText(textbox,startIndex,stopIndex){
	if(textbox.setSelectionRange){
		textbox.setSelectionRange(startIndex,stopIndex);
	}else if(textbox.createTextRange){//IE
		var range=textbox.createTextRange();
		range.collapse(true);
		range.moveStart("character",0);
		range.moveEnd("character",stopIndex-startIndex);
		range.select();
	}
}
```
## bind方法对老版本的浏览器不起作用
 ```javascript

Function.prototype.bind = Function.prototype.bind || function(context){
      var self = this;

      return function(){
        return self.apply(context, arguments);
      };
    }

```
## 包装cookie
 ```javascript


//cookie
var cookieUtil={
	// 创建cookie
	setcookie:function (name, value, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if (expires instanceof Date) {
        cookieText += '; expires=' + expires.toGMTString();
    }
    if (path) {
        cookieText += '; path=' + path;
    }
    if (domain) {
        cookieText += '; domain=' + domain;
    }
    if (secure) {
        cookieText += '; secure';
    }
    document.cookie = cookieText;
},
    // 获取cookie
    getcookie:function (name) {
    var cookieName = encodeURIComponent(name) + '=';
    var cookieStart = document.cookie.indexOf(cookieName);
    var cookieValue = null;
    if (cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(';', cookieStart);
        if (cookieEnd == -1) {
            cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }
    return cookieValue;
},
   // 删除cookie
    unsetcookie:function (name,path,domain,secure) {
    this.setcookie(name,"",new Date(0),path,domain,secure);
}
}
```

## 包装子cookie
 ```javascript
//子cookie
var subcookieUtil={
	get:function(name,subname){
		var subcookie=getAll(name);
		if(subcookie){
			return subcookie[subname];
		}else {
			return null;
		}
	},
	getAll:function(name){
		var cookieName = encodeURIComponent(name) + '=';
        var cookieStart = document.cookie.indexOf(cookieName);
        var cookieValue = null;
        var subcookie,result={};
        var len,i,parts;
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd == -1) {
            cookieEnd = document.cookie.length;
           }
        cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
        if(cookieValue.length>0){
        	subcookie=cookieValue.split('&');
        	len=subcookie.length;
        	for(i=0;i<llen;i++){
        		parts=subcookie[i].split('=');
        		result[parts[0]]=parts[1];
        	}
        	return result;
        }
       }
    return null;
	},
	
	set:function (name, subname,value, expires, path, domain, secure) {
		var subcookies=this.getAll(name)||{};
		subcookies[subname]=value;
		this.setAll(name,subcookies,expires,path,domain,secure);
	},
	
	setAll:function(name,subcookies,expires,path,domain,secure){
        var cookieText = encodeURIComponent(name) + '=';
        var subcookiesParts=new Array();
        var subname;
        for(subname in subcookies){
    	    if(subname.length>0&&subcookies.hasOwnProperty(subname)){
    		    subcookiesParts.push(encodeURIComponent(subname)+'='+encodeURIComponent(subcookies[subname]));
    	    }
        }
        if(subcookiesParts.length>0){
    	    cookieText+=subcookiesParts.join('&');
    	    if (expires instanceof Date) {
                cookieText += '; expires=' + expires.toGMTString();
            }
            if (path) {
                cookieText += '; expires=' + expires;
             }
            if (domain) {
                cookieText += '; domain=' + domain;
            }
            if (secure) {
                cookieText += '; secure';
            }
        }
    
        document.cookie = cookieText;
    },
    unset:function(name,subname,path,domain,secure){
  	    var subcookies=this.getAll(name);
    	if(subcookies){
  		    delete subcookies[subname];
  		    this.setAll(name,subcookies,null,path,domain,secure);
  	    }
        },
    unsetAll:function(name,path,domain,secure){
  	    this.setAll(name,null,new Date(0),path,domain,secure);
    }
}
```
## indexedDB
 ```javascript

var indexedDB=window.indexedDB||window.mozIndexedDB||window.msIndexedDB||window.webkitIndexedDB;
var idbRequest=indexedDB.open('vvv');
idbRequest.onsuccess=function(event){
	database=event.target.result;
}
idbRequest.onerror=function(event){
	alert(event.target.errorCode);
}
```
## 手写typeof

 ```javascript
function type(obj) {
	var toString = Object.prototype.toString;
	var map = {
	    '[object Boolean]'  : 'boolean', 
	    '[object Number]'   : 'number', 
	    '[object String]'   : 'string', 
	    '[object Function]' : 'function', 
	    '[object Array]'    : 'array', 
	    '[object Date]'     : 'date', 
	    '[object RegExp]'   : 'regExp', 
	    '[object Undefined]': 'undefined',
	    '[object Null]'     : 'null', 
	    '[object Object]'   : 'object'
	};
	if(obj instanceof Element) {//因为对不同标签，toString会返回对应不同标签的构造函数
        return 'element';
	}
	return map[toString.call(obj)];
}
```
## 使用userAgent判断使用的是什么浏览器

360的兼容模式用的是IE、极速模式用的是chrome的内核

 ```javascript
 function validB(){ 
  var u_agent = navigator.userAgent; 
  var B_name="Failed to identify the browser"; 
  if(u_agent.indexOf("Firefox")>-1){ 
      B_name="Firefox"; 
  }else if(u_agent.indexOf("Chrome")>-1){ 
      B_name="Chrome"; 
  }else if(u_agent.indexOf("MSIE")>-1&&u_agent.indexOf("Trident")>-1){ 
      B_name="IE(8-10)";  
  }
    document.write("B_name:"+B_name+"<br>");
    document.write("u_agent:"+u_agent+"<br>"); 
} 

 ```
## 深度克隆
 ```javascript
/**
 * 
 * 深度克隆方法一，用的是instanceof
 */
function clone(Obj) {
    var buf;   
    if (Obj instanceof Array) {
        buf = [];  // 创建一个空的数组
        var i = Obj.length;
        while (i--) {
            buf[i] = clone(Obj[i]);
        }
        return buf;
    } else if (Obj instanceof Object){
        buf = {};  // 创建一个空对象
        for (var k in Obj) {  // 为这个对象添加新的属性
            buf[k] = clone(Obj[k]);
        }
        return buf;
    }else{
        return Obj;
    }
}

/**
 * 
 * 深度拷贝方法二，用的是 toString
 */
function deepClone(data) {
	var t = type(data), o, i, ni;
	
	if(t === 'array') {
	    o = [];
	}else if( t === 'object') {
	    o = {};
	}else {
	    return data;
	}
	
	if(t === 'array') {
	    for (i = 0, ni = data.length; i < ni; i++) {
	        o.push(deepClone(data[i]));
	    }
	    return o;
	}else if( t === 'object') {
	    for( i in data) {
	        o[i] = deepClone(data[i]);
	    }
	    return o;
	}
}
/**
 * 
 * 深度拷贝方法四，只支持基本数值类型
 * 
1.他无法实现对函数 、RegExp等特殊对象的克隆
2.会抛弃对象的constructor,所有的构造函数会指向Object
3.对象有循环引用,会报错
 */
const newObj = JSON.parse(JSON.stringify(oldObj));

/**
 * 
 * 深度拷贝方法三，更多类型
 */

const isType = (obj, type) => {
  if (typeof obj !== 'object') return false;
  const typeString = Object.prototype.toString.call(obj);
  let flag;
  switch (type) {
    case 'Array':
      flag = typeString === '[object Array]';
      break;
    case 'Date':
      flag = typeString === '[object Date]';
      break;
    case 'RegExp':
      flag = typeString === '[object RegExp]';
      break;
    default:
      flag = false;
  }
  return flag;
};

const getRegExp = re => {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
};
/**
* deep clone
* @param  {[type]} parent object 需要进行克隆的对象
* @return {[type]}        深克隆后的对象
*/
const clone = parent => {
  // 维护两个储存循环引用的数组
  const parents = [];
  const children = [];

  const _clone = parent => {
    if (parent === null) return null;
    if (typeof parent !== 'object') return parent;

    let child, proto;

    if (isType(parent, 'Array')) {
      // 对数组做特殊处理
      child = [];
    } else if (isType(parent, 'RegExp')) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, 'Date')) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent);
      // 利用Object.create切断原型链
      child = Object.create(proto);
    }

    // 处理循环引用
    const index = parents.indexOf(parent);

    if (index != -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index];
    }
    parents.push(parent);
    children.push(child);

    for (let i in parent) {
      // 递归
      child[i] = _clone(parent[i]);
    }

    return child;
  };
  return _clone(parent);
};


```
## 组合使用构造函数模式和原型模式创建对象
 ```javascript
//组合使用构造函数模式和原型模式创建对象
function Person(name,age){
	this.name=name;
	this.age=age;
	this.friends=["may","john"];
}
Person.prototype={
	constructor:Person,//字面量形式的原型默认构造函数是object,所以在这里要指定constructor
	sayName=function(){
		alert(this.name);
	}
}
```

## 组合继承
 ```javascript
//组合继承
funcion super(name){
	this.name=name;
	this.color=["red","blue"];
	
}
Super.prototype.sayname=function(){
	alert(this.name);
}
function Sub(age){
	Super.call(this);
	this.age=age;
}
Sub.prototype=new Super();//
Sub.prototype.constructor=Sub;//这个很重要！！
Sub.prototype.sayage=function(){
	alert(this.age);
}

```
## 观察者模式
 ```javascript
//观察者模式
function EventTarget(){     
    this.handlers = {}; 
} 
EventTarget.prototype = {     
    constructor: EventTarget,
    addHandler: function(type, handler){
         if (typeof this.handlers[type] == "undefined"){
              this.handlers[type] = [];
         }
         this.handlers[type].push(handler);
     }, 
    fire: function(event){//执行
         if (!event.target){
             event.target = this;
         }
         if (this.handlers[event.type] instanceof Array){
             var handlers = this.handlers[event.type];
             for (var i=0, len=handlers.length; i < len; i++){
                 handlers[i](event); 
            }
         }
     },
     removeHandler: function(type, handler){ 
        if (this.handlers[type] instanceof Array){ 
            var handlers = this.handlers[type]; 
            for (var i=0, len=handlers.length; i < len; i++){ 
                if (handlers[i] === handler){ 
                    break;
                 }
             }
             handlers.splice(i, 1); 
          }
      }
};
 ```

## 分享一个题目
 ```javascript

//[附加题] 请实现下面的自定义事件 Event 对象的接口，功能见注释(测试1)
//该 Event 对象的接口需要能被其他对象拓展复用(测试2)
//测试1
Event.on('test', function (result) {
    console.log(result);
});
Event.on('test', function () {
    console.log('test');
});
Event.emit('test', 'hello world'); // 输出 'hello world' 和 'test'
// 测试2
var person1 = {};
var person2 = {};
Object.assign(person1, Event);
Object.assign(person2, Event);
person1.on('call1', function () {
    console.log('person1');
});
person2.on('call2', function () {
    console.log('person2');
});
person1.emit('call1'); //输出 'person1'
person1.emit('call2'); // 没有输出
person2.emit('call1'); // 没有输出
person2.emit('call2'); // 输出 'person2'
var Event = {
    // 通过on接口监听事件eventName
    // 如果事件eventName被触发，则执行callback回调函数
    on: function (eventName, callback) {
        //你的代码
        if(!this.handles){
        	//Object.assign(target, source);
//这个是ES6的新对象方法，用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
            Object.defineProperty(this, "handles", {
                value: {},
                enumerable: false,//关键！
                configurable: true,
                writable: true
            })
        }
       
       if(!this.handles[eventName]){
            this.handles[eventName]=[];
       }
       this.handles[eventName].push(callback);
    },
    // 触发事件 eventName
    emit: function (eventName) {
        //你的代码
       if(this.handles[arguments[0]]){
           for(var i=0;i<this.handles[arguments[0]].length;i++){
               this.handles[arguments[0]][i](arguments[1]);
           }
       }
    }
};
//输出所有页面宽度和高度大于50像素的节点。
function traverse(oNode) {
    var aResult = [];
    oNode = oNode || document.body;
    if (oNode.style) {
        var nWidth = window.parseInt(oNode.style.width, 10) || 0;
        var nHeight = window.parseInt(oNode.style.height, 10) || 0;
        if (nWidth > 50 && nHeight > 50) {
            aResult.push(oNode);
        }
    }
    var aChildNodes = oNode.childNodes;
    if (aChildNodes.length > 0) {
        for (var i = 0, l = aChildNodes.length; i < l; i++) {
            var oTmp = aChildNodes[i];
            aResult = aResult.concat(traverse(oTmp));
        }
    }
    return aResult;
}
 
 ```


