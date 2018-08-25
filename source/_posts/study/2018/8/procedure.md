---
title: vue中使用gojs/jointjs
date:   2018/8/23
categories: 
    - 学习
    - 专题笔记
---

因为公司项目需求，要画出相关业务的流程图，以便客户了解自己身处何处

搜索框输入 “前端流程图插件”，查了很多资料，总结一下有以下几种
### flow-chart 
代码写法繁琐，不是json就可以解决，效果也比较丑,PASS

### darge-d3  
github :[https://github.com/dagrejs/dagre-d3](https://github.com/dagrejs/dagre-d3)

效果图
{% asset_img darge-d3.png %}

下载里面的demo,改一下json就可以了
```json
// States 
var states = [ "NEW", "SUBMITTED","FINISHED" ,"FAILED","DELIVER", 
               "CANCELED", "ABOLISHED" , "DELETED","REFUNDING","REFUNDED"];
var map = ['新创建','已提交','已完成','提交失败',"交付中",
              '已取消','废除','已删除','退款中',"已退款"]
// Automatically label each of the nodes
states.forEach(function(state,index) { g.setNode(state, { label: `${map[index]}(${state})`})});

// Set up the edges
g.setEdge("NEW", "FAILED",     { label: "后台接口自动"});
g.setEdge("NEW", "SUBMITTED",   { label: "后台接口自动" });
g.setEdge("NEW", "CANCELED",   { label: "用户取消订单" });
g.setEdge("SUBMITTED","CANCELED",     { label: "用户取消订单" });
g.setEdge("SUBMITTED", "ABOLISHED",  { label: "用户超过48小时未支付，\n系统自动取消"});
g.setEdge("ABOLISHED","DELETED",      { label: "已删除" });
g.setEdge("CANCELED", "DELETED",   { label: "已删除"});
g.setEdge("FAILED",   "SUBMITTED",      { label: "后台接口自动" });

g.setEdge("SUBMITTED",   "DELIVER",     { label: "用户支付" });
g.setEdge("FINISHED",   "REFUNDING",     { label: "用户退款" });

g.setEdge("DELIVER",   "FINISHED",     { label: "交付完成" });
g.setEdge("REFUNDING",   "REFUNDED",     { label: "已退款" });
g.setEdge("REFUNDED",   "DELETED",     { label: "已删除" });
g.setEdge("DELIVER",   "REFUNDING",     { label: "用户退款" });
g.setEdge("FAILED",   "CANCELED",     { label: "用户取消订单" });
```


**不满意的地方**：画出来的图是垂直方向的，我要的是水平方向,PASS

### gojs
github :[https://github.com/NorthwoodsSoftware/GoJS](https://github.com/NorthwoodsSoftware/GoJS)

可以通过``npm install gojs -save``安装

效果图
{% asset_img gojs.png %}


看里面的demo我自己包装了一下
```html
<template>
<div>
  <p style="background-color:#d5d5d5;margin:0;padding:5px;">
    您当前处于 <span class="tip">用户提交资料</span> 步骤 
    下一步等待<span class="tip">供应商接单</span>
    <el-button type="text" v-if="show===false" @click="show=true">展开</el-button>
    <el-button type="text" v-else @click="show=false">收起</el-button>
    
  </p>
  <div id="myDiagramDiv" v-show="show"  ></div>
  </div> 
    
</template>
<style scoped>
.tip{
  color:red;
  font-size:0.8em;
  font-weight:bold;
  padding:5px;
}
#myDiagramDiv{
  height: 200px; 
  border: solid 1px #d3d3d3;
}

</style>
```
```javascript
<script>
window.go =require('./go.js') 
var $ = go.GraphObject.make;

import datam from './data';
export default{
  mixins:[datam],
  data(){
    return{
      myDiagram:null,
      show:true
    }
  },
  mounted(){
    this.load();
  },
  methods:{
    load(){
      this.init();
      this.addNodeTemplate(this.User);
      this.addNodeTemplate(this.Supplier);
      this.layout();
    },
    layout() {
      this.myDiagram.model = go.Model.fromJson(this.myjson);
      this.myDiagram.layoutDiagram(true);
    },

    getOption(){
      // for conciseness in defining templates

      let options={
        yellowgrad : $(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" }),
        greengrad : $(go.Brush, "Linear", { 0: "#98FB98", 1: "#9ACD32" }),
        bluegrad : $(go.Brush, "Linear", { 0: "#B0E0E6", 1: "#87CEEB" }),
        redgrad : $(go.Brush, "Linear", { 0: "#C45245", 1: "#871E1B" }),
        whitegrad : $(go.Brush, "Linear", { 0: "#F0F8FF", 1: "#E6E6FA" }),
        bigfont : "bold 8pt Helvetica, Arial, sans-serif",
        smallfont : "bold 6pt Helvetica, Arial, sans-serif",
        
      }

      return options;
    },

     textStyle(){
        return {
          margin: 6,
          wrap: go.TextBlock.WrapFit,
          textAlign: "center",
          editable: true,
          font: this.getOption()['bigfont']
        }
      },
      init(){
        this.myDiagram =
            $(go.Diagram, "myDiagramDiv",
              {
                isReadOnly: true,
                // have mouse wheel events zoom in and out instead of scroll up and down
                "toolManager.mouseWheelBehavior": go.ToolManager.WheelNone,
                initialAutoScale: go.Diagram.Uniform,
                "linkingTool.direction": go.LinkingTool.ForwardsOnly,
                initialContentAlignment: go.Spot.Center,
                layout: $(go.LayeredDigraphLayout, { isInitial: false, isOngoing: false, layerSpacing: 50 }),
                "undoManager.isEnabled": true
              });
              //默认节点模板
        this.myDiagram.nodeTemplate =
            $(go.Node, "Auto",
              new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
              // define the node's outer shape, which will surround the TextBlock
              $(go.Shape, "Rectangle",
                { fill: this.getOption()['yellowgrad'], stroke: "black",
                  portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer",
                  toEndSegmentLength: 50, fromEndSegmentLength: 40 }),
              $(go.TextBlock, "Page",
                { margin: 6,
                  font: this.getOption()['bigfont'],
                  editable: true },
                new go.Binding("text", "text").makeTwoWay()));
            // replace the default Link template in the linkTemplateMap
          this.myDiagram.linkTemplate =
                $(go.Link,  // the whole link panel
                  new go.Binding("points").makeTwoWay(),
                  { curve: go.Link.Bezier, toShortLength: 15 },
                  new go.Binding("curviness", "curviness"),
                  $(go.Shape,  // the link shape
                    { stroke: "#2F4F4F", strokeWidth: 2.5 }),
                  $(go.Shape,  // the arrowhead
                    { toArrow: "kite", fill: "#2F4F4F", stroke: null, scale: 2 })
                  );
      },
      /**
       * options:{
       *  category
       *  shape:RoundedRectangle/Rectangle
       *  shapeOptions:{
       *   fill:bluegrad/greengrad/yellowgrad/null/redgrad/whitegrad  自定义的
       *   stroke: "black",
       *   portId:""
       *   fromLinkable:true
       *   toLinkable:
       *   cursor:"pointer"
       *   fromEndSegmentLength:40
       *    toEndSegmentLength
       *    strokeWidth
       *  
       *   }
       *    textStyle:{
       *        margin: 9,
       *        maxSize: new go.Size(200, NaN),
       *        wrap: go.TextBlock.WrapFit,
        *       editable: true,
        *       textAlign: "center",
        *       font: smallfont 
        * },
       *    
       * }
       */
      addNodeTemplate(options){
        let fill = this.getOption()[options.shapeOptions.fill];
        options.shapeOptions.fill = fill;
        this.myDiagram.nodeTemplateMap.add(options.category,
          $(go.Node, "Auto",
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, options.shape,options.shapeOptions),
            $(go.TextBlock,  this.textStyle(),
              new go.Binding("text", "text").makeTwoWay())
            ));
      },

    }


}

</script>


```

**不满意的地方**：
1. 免费版gojs是有水印的，百度搜索“gojs如何去水印”有一堆答案，我就不写了。
2. 因为要自己手动去掉水印，所以我只能手动下载go.js放在我自己的组件目录下，但是这个文件太大了，800+KB,
npm run dev 的时候停在这里停了好久。有时候还爆出“......maximun ....500KB”的错误，我也不知道是什么原因，不知道有什么方法，有的话麻烦通知我。
3. 代码写法有点太繁琐

这是我自己包装的代码地址：[https://github.com/LRY1994/vue-lib/tree/master/src/components/process-go](https://github.com/LRY1994/vue-lib/tree/master/src/components/process-go)

### jointjs
github : [https://github.com/clientIO/joint](https://github.com/clientIO/joint) 
效果图
{% asset_img jointjs.png %}

可以通过``npm install jointjs -save``安装

参照了很多demo和文档，用的是矩形，但是可以设置圆角的度数变成椭圆形，其他形状我就无力了。

可以自定义矩形的样式和矩形框里面的文字样式

```javascript
//data.vue
<script>
export default {
    data(){
        var userClass = {//这个要参照SVG属性
            /**shapeStyle
             * fill:填充的背景颜色
                stroke: 边框颜色
                strokeWidth: 边框宽度
                rx: 圆角
                ry: 
             */
            shapeStyle:{//矩形样式
                fill:{
                    type: 'linearGradient',
                    stops: [
                        {offset: '0%', color: '#98FB98'},
                        {offset: '100%', color: '#9ACD32'}
                    ],
                },
                rx:150,
                ry:15
            },
            /**
             * textStyle
             *  fontWeight
             *  fontSize
             * 
             */
            textStyle:{//文本样式
                fontWeight:'bold'
            }    
        };
        return{
            graphData :{
                node:{
                    '100':{text:'用户提交资料',category:userClass},
                    '101':{text:'用户完善资料',category:userClass},
                    '102':{text:'用户确认完成',category:userClass},
                    '103':{text:'用户撤销',category:userClass},

                    '200':{text:'供应商驳回'},
                    '201':{text:'供应商接单'},
                    '202':{text:'供应商完工'},
                    '203':{text:'等待供应商处理'},

                    '300':{text:'系统交付出错'}               
                },
                edge :{//每个点都要写
                    '100': ['200','201','103'], 
                    '101': ['201'],
                    '102':[],
                    '103': ['100'],

                    '200': ['101'],              
                    '201': ['202','300'],
                    '202': ['102'],               
                    '203': ['102'], 

                    '300': ['203'],
                
                },
            }
        }
    }
}
</script>

```
```html
<template>
<div id="container">
  <p style="background-color:#EEEEEE;margin:0;padding:5px;font-size:0.9em">
    您当前处于 <span class="tip">用户提交资料</span> 步骤 
    下一步等待<span class="tip">供应商接单</span>
    <el-button type="text" v-if="show===false" @click="show=true">展开</el-button>
    <el-button type="text" v-else @click="show=false">收起</el-button>
    
  </p>
    <div id="myholder" v-show="show"></div>
</div>
</template>
```
```javascript
<script>
window.joint=require('jointjs');
var Shape = joint.dia.Element.define('default.Rectangle', {      
        attrs: {  
            rect: {
                refWidth: '100%',
                refHeight: '100%',
                //下面这些可以自己设置
                fill:{
                    type: 'linearGradient',
                    stops: [
                        {offset: '0%', color: '#B0E0E6'},//渐变开始
                        {offset: '100%', color: '#F0F8FF'}//渐变结束
                    ]
                },
                stroke: '#B0E0E6',
                strokeWidth: 1,
                rx: 5,//圆角
                ry: 5
            },
            text: {
                refX: '50%',
                refY: '50%',                               
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
                fontSize: 10           
            }
         }                    
    }, 
    {
         markup: '<rect/><text/>',
         setText: function(text) {                    
            return this.attr('text/text', text || '');
        },
        setShapeStyle:function(shapeStyle){
            let newstyle = Object.assign({},this.attr('rect'),shapeStyle);
            return this.attr('rect',newstyle)
        },
        
        setTextStyle:function(textStyle){
            let newstyle = Object.assign({},this.attr('text'),textStyle);
            return this.attr('text',newstyle)
        }
    }
);

var Link = joint.dia.Link.define('default.Link', {
        attrs: {
            '.connection': {
                stroke: '#2F4F4F',//线
                strokeWidth: 1,
                pointerEvents: 'none',
                targetMarker: {//箭头
                    type: 'path',
                    fill: '#2F4F4F',//填充颜色
                    stroke: '#2F4F4F',//边框颜色
                    strokeWidth:'1',
                    d: 'M 2 -2 0 0 2 2 z'//形状
                }
            }
        },
        connector: {
            name: 'rounded'
        },
        z: -1,
        weight: 1,
        minLen: 1,
        labelPosition: 'c',
        labelOffset: 10,
        labelSize: {
            width: 50,
            height: 30
        },
        labels: [{
            markup: '<rect/><text/>',
            attrs: {
                text: {
                    fill: 'gray',
                    textAnchor: 'middle',
                    refY: 5,
                    refY2: '-50%',
                    fontSize: 10,
                    cursor: 'pointer'
                },
                // rect: {
                //     fill: 'lightgray',
                //     stroke: 'gray',
                //     strokeWidth: 2,
                //     refWidth: '100%',
                //     refHeight: '100%',
                //     refX: '-50%',
                //     refY: '-50%',
                //     rx: 5,
                //     ry: 5
                // }
            },
            size: {
                width: 50, height: 10
            }
        }]

    }, {
        markup: '<path class="connection"/><g class="labels"/>',
        
        connect: function(sourceId, targetId) {
            return this.set({
                source: { id: sourceId },
                target: { id: targetId }
            });
        },

        setLabelText: function(text) {
            return this.prop('labels/0/attrs/text/text', text || '');
        }
    });



var ElementView = joint.dia.ElementView.extend({
        pointerdown: function () {

            // this._click = true;
            // joint.dia.ElementView.prototype.pointerdown.apply(this, arguments);
        },
        pointermove: function(evt, x, y) {
            // this._click = false;
            // joint.dia.ElementView.prototype.pointermove.apply(this, arguments);
        },
        pointerup: function (evt, x, y) {
            // if (this._click) {
            //     // triggers an event on the paper and the element itself
            //     this.notify('cell:click', evt, x, y); 
            // } else {
            //     joint.dia.ElementView.prototype.pointerup.apply(this, arguments);
            // }
        }
    });
var LinkView = joint.dia.LinkView.extend({
    addVertex: function(evt, x, y) {},
    removeVertex: function(endType) {},
    pointerdown:function(evt, x, y) {}
});


export default {   
    data(){
        return{
            graph:null,
            paper:null,
            show:true
        }       
    },
    props:{
        graphData:{
            type:Object,
            required:true
        }
    },
    mounted(){
        let w = document.getElementById('container').width ; 
        this.graph = new joint.dia.Graph;
        this.paper = new joint.dia.Paper({
            el: document.getElementById('myholder'),
            width: w,
            height: 250,         
            model: this.graph,
            elementView: ElementView,//禁止拖拽
            linkView:LinkView//禁止拖拽
        });
        this.layout();
    },
    methods:{
        getWidthandHeight(label){
            let maxLineLength = _.max(label.split('\n'), function(l) { return l.length; }).length,

            // Compute width/height of the rectangle based on the number
            // of lines in the label and the letter size. 0.6 * letterSize is
            // an approximation of the monospace font letter width.
             letterSize = 8,
             width = 2 * (letterSize * (0.6 * maxLineLength + 1)),
             height = 2 * ((label.split('\n').length + 1) * letterSize);
            return {width,height}
        },
        getLayoutOptions() {
            return {
                // setVertices: false,
                // setLabels: false,
                // ranker:'longer-path',//'tight-tree'/'network-simplex',
                rankDir: 'LR',
                align: 'UR',
                rankSep:0,
                edgeSep:0,
                nodeSep:0,
            };
        },
        buildGraphFromAdjacencyList(adjacencyList) {
            let elements = [],links = [],obj,size,node;
            const _this=this;
            const map=this.graphData.node;

            Object.keys(adjacencyList).forEach(function(parentId) {
                // Add element

                obj =map[parentId];
                size = _this.getWidthandHeight(obj.text);
                node =new Shape({id:parentId,size:size}).setText(obj.text);

                if(obj.category&&obj.category.shapeStyle){
                    node = node.setShapeStyle(obj.category.shapeStyle);
                }
                if(obj.category&&obj.category.textStyle){
                    node = node.setTextStyle(obj.category.textStyle);
                }

                elements.push(node);
                
                // Add links
                adjacencyList[parentId].forEach(function(childId) {
                    links.push(
                        new Link().connect(parentId, childId)// .setLabelText(parentLabel + '-' + childLabel)                                         
                    );
                });
            });

            return elements.concat(links);
        },
        layout() {            
            let cells = this.buildGraphFromAdjacencyList(this.graphData.edge);    
            this.graph.resetCells(cells);
            joint.layout.DirectedGraph.layout(this.graph, this.getLayoutOptions());
        },
    }
}
</script>

<style>
#myholder {
    border: 1px solid lightgray;
    margin-bottom:20px;
    padding-left:20px
}
.tip{
  color:#9ACD32;
  font-size:0.9em;
  font-weight:bold;
  padding:5px;
}
</style>

```

这是我自己包装的代码地址：[https://github.com/LRY1994/vue-lib/tree/master/src/components/process-joint](https://github.com/LRY1994/vue-lib/tree/master/src/components/process-joint)

这个目前看来还算满意


### jsplumb
这个看了官网，不太友好，而且下载只有一个js文件，没有demo代码，不知如何下手

### 参考资料：
[https://gojs.net/latest/samples/pageFlow.html](https://gojs.net/latest/samples/pageFlow.html)
[http://www.daviddurman.com/assets/autolayout.js](http://www.daviddurman.com/assets/autolayout.js)
[http://resources.jointjs.com/demos/layout](http://resources.jointjs.com/demos/layout)