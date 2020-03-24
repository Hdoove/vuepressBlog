### Echarts
#### 导读
---
相信绝大多数从事前端开发工作的人来说，一定不会对ECharts感到陌生，ECharts其实就是一个图表库，实现数据的可视化开发，这里引用一下官网对Echart的描述：
<br><br>
> ECharts，一个使用 JavaScript 实现的开源可视化库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等），底层依赖矢量图形库 ZRender，提供直观，交互丰富，可高度个性化定制的数据可视化图表。

<br>

ECharts 提供了常规的`折线图`、`柱状图`、`散点图`、`饼图`、`K线图`，用于统计的`盒形图`，用于地理数据可视化的`地图`、`热力图`、`线图`，用于关系数据可视化的关系图、`treemap`、`旭日图`，多维数据可视化的平行坐标，还有用于 BI 的`漏斗图`，`仪表盘`，并且支持图与图之间的混搭。
<br><br>
可以说ECharts提供的功能大大满足了我们在开发中的需要，最近在公司我也是负责前端可视化展示的部分，同样选择基于ECharts来进行开发，所以想写一篇文章来为那些没有听说过ECharts或者只是听说过、没有使用过ECharts的小伙伴提供一个基础教程。文笔不好，大家多多见谅。<br><br>

---

### 引入ECharts
> ECharts的引入方式主要分为以下几种：
<br><br>

````
1.从官网下载界面选择你需要的版本下载，根据开发者功能和体积上的需求，我们提供了不同打包的下载，如果你在体积上没有要求，可以直接下载完整版本。开发环境建议下载源代码版本，包含了常见的错误提示和警告。
````

<br>

````
2.通过 npm 获取 echarts，npm install echarts --save
````

<br>

````
3.cdn 引入，你可以在 cdnjs，npmcdn 或者国内的 bootcdn 上找到 ECharts 的最新版本。
````

<br>

### 绘制一个简单的图表

首先我们新建一个HTML文件，为ECharts准备一个具备宽高的DOM

````

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!-- 引入 ECharts 文件 -->
    <script src="echarts.min.js"></script>
</head>
<body>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="main" style="width: 600px;height:400px;"></div>
</body>
</html>

````

然后就可以通过 echarts.init 方法初始化一个 echarts 实例并通过 setOption 方法生成一个简单的柱状图，下面是完整代码。

````

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!-- 引入 ECharts 文件 -->
    <script src="echarts.min.js"></script>
</head>
<body>
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" style="width: 600px;height:400px;"></div>
    <script type="text/javascript">
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    </script>
</body>
</html>

````

效果如下：

![](https://user-gold-cdn.xitu.io/2019/9/1/16cec6a026578673?w=562&h=365&f=gif&s=41342)
<br>

当然这也是最最最最基本的一个配置，实际开发中我们会根据具体的需求去开发，比如我们会对X轴、Y轴，tooptip、legend等一系列组件进行修改，下面我会对开发中经常使用的组件的配置进行一个介绍，帮助大家熟悉一下。
<br><br>

---

### X轴

> 直角坐标系 grid 中的 x 轴

````
1.xAxis.show  | boolean

是否显示X轴
````

````
2.xAxis.name  | string

坐标轴名称
````

````
3.xAxis.nameLocation  | string

坐标轴名称显示位置
````

````
4.xAxis.nameTextStyle  | Object

坐标轴名称的文字样式
xAxis.nameTextStyle.color | string 颜色
xAxis.nameTextStyle.fontStyle | string 字体风格
xAxis.nameTextStyle.fontWeight | string 字体粗细
xAxis.nameTextStyle.fontSize | number 字体颜色
xAxis.nameTextStyle.align | string 文字水平对齐方式
xAxis.nameTextStyle.backgroundColor | string，Object 文字块背景色
xAxis.nameTextStyle.borderColor | string 边框颜色
...

````

````
5.xAxis.inverse  | boolean

是否反转
````

````
6.xAxis.minInterval  | number
[defaule: 0]
自动计算的坐标轴最小间隔大小，例如可以设置成1保证坐标轴分割刻度显示成整数

````

````
7.xAxis.axisLine  | Object

坐标轴轴线相关设置

xAxis.axisLine.show | boolean  是否显示轴线
xAxis.axisLine.lineStyle.color | string  设置轴线颜色
xAxis.axisLine.lineStyle.width | number  设置轴线宽度

````

````
8.xAxis.axisTick  | Object

坐标轴轴线相关设置

xAxis.axisTick.show | boolean  是否显示刻度（就是一个个的小竖线）

````

````
9.xAxis.axisLabel  | Object

坐标轴轴线相关设置

xAxis.axisLabel.show | boolean  是否显示刻度标签
xAxis.axisLabel.color | string  设置刻度标签颜色

````

> 下面就是一些简单的配置

````

xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    // show: false
    name: 'x轴名称',
    axisTick: {
        show: false
    },
    axisLine: {
        lineStyle: {
            color: 'red'
        }
    },
    axisLabel: {
        color: 'green'
    },
    nameTextStyle: { 
        fontWeight: 500
    }
}

````

效果如下，当然也可以根据具体的项目需求进行修改。

![](https://user-gold-cdn.xitu.io/2019/9/1/16cec8a42740015d?w=626&h=364&f=gif&s=12861)

---

### Y轴
>  直角坐标系 grid 中的 y 轴

Y轴的配置基本和X轴相差不多，这里就不一一介绍了
````

yAxis: {
    name: 'y轴名称',
    axisTick: {
        show: false
    },
    axisLine: {
        lineStyle: {
            color: 'red'
        }
    },
    axisLabel: {
        color: 'green'
    },
    nameTextStyle: {
        fontWeight: 500
    },
    // minInterval: 1
}

````
效果如下：

![](https://user-gold-cdn.xitu.io/2019/9/1/16cec90189c4ba98?w=626&h=364&f=gif&s=10298)

### 图例组件
> 图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示

````
1.legend.type  | string

图例的类型。可选值：
'plain'：普通图例。缺省就是普通图例。
'scroll'：可滚动翻页的图例。当图例数量较多时可以使用。

````

````
2.legend.show  | boolean

是否显示图例

````

````
3.legend.width/height  | number

图例的宽/高度

````

````
4.legend.itemGap  | number

图例之间的间隔

````

````
5.legend.orient  | string

图例列表的布局朝向

可选：
'horizontal'
'vertical'

````

````
6.legend.itemWidth/itemHeight number  | number

图例标记的图形宽度/高度

````

````
6.legend.textStyle  | Object

图例的公用文本样式

````

````

legend: {
    data: ['图例1', '图例2', '图例3'],
    show: true,
    orient: 'vertical',
    right: 10,
    itemWidth: 20,
    itemHeight: 20,
    textStyle: {
        color: function (params) {
            let colorList = [
                "#5C89FF", "#FFCB48"
            ];
            return colorList[params.dataIndex];
        },
        fontSize: 12
    }
}

````

效果如下

![](https://user-gold-cdn.xitu.io/2019/9/1/16ceca39668f88d6?w=195&h=87&f=gif&s=10879)

---
<br>

### tooltip
> 提示框组件。

````
1.tooltip.show  | boolean

是否显示提示框

````

````
2.tooltip.triggerOn  | string

触发方式
提示框触发的条件，可选：
1.'mousemove'
鼠标移动时触发。
2.'click'
鼠标点击时触发。
3.'mousemove|click'
同时鼠标移动和点击时触发。
4.'none'
不在 'mousemove' 或 'click' 时触发，用户可以通过 action.tooltip.showTip 和 action.tooltip.hideTip 来手动触发和隐藏。也可以通过 axisPointer.handle 来触发或隐藏。

````

````
3.tooltip.backgroundColor  | string

提示框浮层的背景颜色。

````

````
4.tooltip.borderColor  | string

提示框浮层的边框颜色。

````

````
5.tooltip.borderWidth  | string

提示框浮层的边框宽度。

````

````
6.tooltip.padding  | number

提示框浮层的内边距。

````

````
7.tooltip.textStyle  | string

提示框浮层的文本样式。

````

````

tooltip: {
    backgroundColor: '#000000',
    textStyle: {
        color: 'yellow',
        fontWeight: 500
    },
    formatter: '{a}中类别为{b}的数值为{c}'
}

````
效果如下

![](https://user-gold-cdn.xitu.io/2019/9/1/16cecb4d8407bc5b?w=643&h=426&f=gif&s=183294)

---

### grid
> 直角坐标系内绘图网格

---

### dataZoom
>  用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响。

---

### title
> 标题组件，包含主标题和副标题。

---

### Events
> 在 ECharts 中主要通过 on 方法添加事件处理函数，该文档描述了所有 ECharts 的事件列表。

在这里就简单举一个例子,在代码中添加一下代码
````
this.myChart.on("click", (params) => {
    console.log(params);
});
````

通过这简单的几行代码，我们就可以实现获取点击的图表的属性


![](https://user-gold-cdn.xitu.io/2019/9/1/16cecbdf00b08b14?w=1334&h=610&f=gif&s=310197)

下面给大家看下实际项目中实际使用的一个例子

![](https://user-gold-cdn.xitu.io/2019/9/1/16cecc4fdf2b9668?w=644&h=382&f=gif&s=508747)

> 有兴趣的小伙伴可以尝试去实现一下，其实ECharts的功能还有很多很多，这里说的只不过是一些比较基础的部分，大家可以去官网好好研究一下，没准会发现更加有意思的地方，到时候可以分享给我哦，😀

<br>

综上 就是我对于Echarts一点小见解，文中如有错误，欢迎在评论区指正，如果这篇文章帮助到了你，欢迎点赞👍和关注，😀。

### 小结
希望你阅读本篇文章后可以达到以下几点：

````

1.了解Echarts到底是什么
2.可以配置一个自己想要的图表组件

````

---

#### 推荐阅读

- [妈耶，这次终于了解继承了！](https://juejin.im/post/5d6b3b4be51d4562092388a4)
- [一篇文章搞定百度地图基本操作](https://juejin.im/post/5d6c731a518825799a553ddd)

---

#### 参考

[Echarts](https://www.echartsjs.com/zh/option.html#title)

