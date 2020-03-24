### 百度地图

### 导读

---

百度地图的强大功能我在这里就不一一赘述了，本篇文章也只是对`百度地图JavaScript API`进行一个介绍，希望可以对小伙伴有所帮助，这里是本篇文章[git地址](https://github.com/Hdoove/BaiduMap)。<br><br> 首先借用官网的一句话介绍一下`百度地图JavaScript API`:

> `百度地图JavaScript API`是一套由`JavaScript`语言编写的应用程序接口，可帮助您在网站中构建功能丰富、交互性强的地图应用，支持`PC`端和移动端基于浏览器的地图应用开发，且支持`HTML5`特性的地图开发。

```!
!!!此篇文章是仿照官方提供的文档中比较基础、适合入门的例子进行编写，觉得介意的小伙伴就可以选择退出了哈，不过还是可以稍微瞄一眼，哈哈，我们开始~~
```

<br>

### 战前准备

---

#### 1. 注册

首先在使用百度地图之前，小伙伴们必须先要拥有一个自己的百度账号，申请注册成为百度开发者，然后创建一个应用，就可以获取到一个唯一的`服务秘钥(AK)`，然后就可以使用相关服务了。

> 具体流程如下：

![](https://user-gold-cdn.xitu.io/2019/9/2/16cefe5fab785c69?w=1956&h=336&f=png&s=47873)

#### 2.创建应用


![](https://user-gold-cdn.xitu.io/2019/9/2/16cefe7f03829510?w=802&h=829&f=png&s=107806)

#### 3. 获取我们的AK


![](https://user-gold-cdn.xitu.io/2019/9/2/16cefe8367390247?w=840&h=33&f=png&s=8771)

> 经过以上3步，我想大家已经有了属于自己的一个`AK`了吧，so， 接下来的我将会以`React`+`webpack`为技术栈进行编写，万变不离其宗，`Vue`的小伙伴或者使用其他技术栈的小伙伴都可以借鉴一下，我们开始。

<br>

### Hello 百度地图

---

#### 1.crate-react-app

> `react` 官方也是提供了一个很方便的脚手架工具，这里就不一一阐述了，毕竟本篇文章的关注点不是这里，以后有机会的话可能会单独写一篇，小伙伴们见谅~~

````

create-react-app baiduMap

cd baiduMap

npm start

````

#### 2.配置webpack

> 这里配置`webpack`的主要原因就是解决`BMap`报错的问题`BMap is not defined`,在这里推荐使用`webpack`最为主要的解决手段，就是通过`webpack`输出对象中的`externals`属性实现`require`的访问。

````

externals:{
    'BMap':'BMap'
}

````

> 这里`webpack`的`externals`的功能我概括为两点：<br>
1.写入`externals`中的依赖是不会被打包进最后的`bundle`里面的。<br>
2.虽然它不会被打包，但在程序运行的时候你仍然能通过模块化的方式去引入这些依赖，
如`commonJS`,`AMD`,`ES6`的`import`等


<br>

#### 3.引入百度地图api文件
> 在`webpack`的`HTML`模板中引入

````

<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=您的密钥"></script>

````

<br>

#### 4.创建地图容器元素

````

<div id = "mapContent" style={{ height: '100vh', width: '100%' }}></div>

````

<br>

#### 5.创建地图实例

````

//引入地图依赖
import BMap from 'BMap';
...

componentDidMount() {
    const map = new BMap.Map("mapContent");
    // 创建地图实例  
    const point = new BMap.Point(116.404, 39.915);
    // 创建点坐标  
    map.centerAndZoom(point, 15);
}

````

#### 6.实现

> 经过以上几步，我们就可以出来一个很简陋的地图出来了，😄，确实是简陋，给大家先看一下效果

![](https://user-gold-cdn.xitu.io/2019/9/2/16cf0002ddf81c90?w=1425&h=687&f=gif&s=4567381)

> 好了，看到这里，小伙伴们是不是对地图充满兴趣了呢，来我们接着向下看，后面有更多有意思的东西在等着你哦 😜

<br>

### 百度地图 冲呀！

---

> 此部分是百度地图的主要功能部分，在这里给小伙伴们具体展示一下，后续可以根据自己的需求进行修改。

<br>

#### 1.设置中心点

````
中心点的设置方法主要有两种

1. 根据经纬度。

// 创建点坐标 
const point = new BMap.Point(116.404, 39.915);
map.centerAndZoom(point, 12);

2.根据城市名。

// 直接使用城市名作为中间点  
map.centerAndZoom('天津', 12);

````

<br>

#### 2.设置Zoom值

````

// Zoom值其实就是地图可放大，可缩小的一个范围，我们可以设置地图的最大最小缩放级别

var map = new BMap.Map("mapContent",{minZoom:4,maxZoom:8});

map.centerAndZoom('天津', 12); // 这里的12指的是默认缩放级别

````

<br>

#### 3.设置可缩放地图

````

// 默认的地图是只可以鼠标拖动的，鼠标滚轮不会修改Zoom值

map.enableScrollWheelZoom(true);

````


![](https://user-gold-cdn.xitu.io/2019/9/2/16cf026d09544c75?w=1417&h=678&f=gif&s=1866340)

<br>

#### 4.添加地图控件

````

// 混合图
var mapType = new BMap.MapTypeControl(
  {
    mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP],
    anchor: BMAP_ANCHOR_TOP_LEFT
  }
);

// 鹰眼图
var overView = new BMap.OverviewMapControl();

// 比例尺
var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});

// 添加默认缩放平移控件
  var top_left_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL});

map.addControl(mapType); 
map.addControl(overView);
map.addControl(top_left_control);  
map.addControl(top_left_navigation); 

````

![](https://user-gold-cdn.xitu.io/2019/9/2/16cf04ac605d4da8?w=1435&h=692&f=gif&s=1098541)


<br>

#### 5.添加标注点

> 这是这里用到的一些数据

````

const data = [
  {
    lon: 116.304854,
    lat:39.921988,
    address: '地点1',
    people: '周元',
    doThing: '暴揍赵牧神'
  },
  {
    lon: 116.417824,
    lat:39.921910,
    address: '地点2',
    people: '夭夭',
    doThing: '沉睡冰棺'
  },
  {
    lon: 116.517777,
    lat:39.821999,
    address: '地点3',
    people: '吞吞',
    doThing: '死亡历练'
  }
];

````

````

for(var i=0;i<data.length;i++){

  var marker = new BMap.Marker(new BMap.Point(data[i].lon,data[i].lat));  // 创建标注
  
  var content = [data[i].address,data[i].people,data[i].doThing] ;
  
  map.addOverlay(marker);// 将标注添加到地图上

}

````


![](https://user-gold-cdn.xitu.io/2019/9/2/16cf061d59d4aa53?w=594&h=468&f=png&s=231037)


#### 6.添加事件

> 往往在实际项目中经常会遇到，点击标注点弹出该点的一些信息，我们这里尝试一下

````

for(var i=0;i<data.length;i++){

  var marker = new BMap.Marker(new BMap.Point(data[i].lon,data[i].lat));  // 创建标注
  
  var content = [data[i].address,data[i].people,data[i].doThing] ;
  
  map.addOverlay(marker);// 将标注添加到地图中
  
  this.addClickHandler(content,marker, map); // 添加一个点击事件 将我们的map传递过去
  
}

//addClickHandler 方法
addClickHandler = (content,marker, map) => {

    const that = this;
    
    marker.addEventListener("click",function(e){
    	that.openInfo(content,e, map)}
    );
    
}

// openInfo 方法
openInfo = (content,e, map) => {
    // 定义窗口信息
    const opts = {
      width : 250,     // 信息窗口宽度
      height: 120,     // 信息窗口高度
      title : "信息窗口" , // 信息窗口标题
      enableMessage:true//设置允许信息窗发送短息
    };
    var p = e.target;
    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    var infoWindow = new BMap.InfoWindow(
              `
                <div>
                  地点：${content[0]} <br />
                  人物：${content[1]} <br />
                  事件：${content[2]} <br />
                </div>
              `  
            ,opts);  // 创建信息窗口对象
    
    map.openInfoWindow(infoWindow,point); //开启信息窗口
}

````
> 可以实现一下效果，小伙伴们可以自己自由发挥样式之类哦 😯

![](https://user-gold-cdn.xitu.io/2019/9/2/16cf06cb26e0284f?w=1435&h=692&f=gif&s=333786)

#### 7.地址解析

> 地址解析就是可以把一个具体的地址转化为经纬度

````

var myGeo = new BMap.Geocoder();      
// 将地址解析结果显示在地图上，并调整地图视野  这里val就是想要查找的地址,point就是返回的经纬度  
myGeo.getPoint(val, function(point){    

    if (point) {      
    
        map.centerAndZoom(point, 16);    
        
        map.addOverlay(new BMap.Marker(point));      
    }      
    
});
     
````


![](https://user-gold-cdn.xitu.io/2019/9/2/16cf07beb669fdc5?w=1435&h=692&f=gif&s=670933)

#### 8.逆地址解析

>  逆地址解析就是把经纬度转化为详细地址，主要分为两种：<br>
    1.指定经纬度获取地址 <br>
    2.鼠标点击地图获取地址
    
**指定经纬度获取地址**

````

var myGeo = new BMap.Geocoder();      
// 根据坐标得到地址描述    
myGeo.getLocation(new BMap.Point(116.364, 39.993), function(result){      
    if (result){      
    alert(result.address);      
    }      
});

````

**鼠标点击地图获取地址(地方与地方之间查出来的详情是不一样的，有的可以查到街道，有的就之能查到区县)**

````

var geoc = new BMap.Geocoder();    
map.addEventListener("click", function(e){        
var pt = e.point;
geoc.getLocation(pt, function(rs){
    var addComp = rs.addressComponents;
    alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
});       

````


![](https://user-gold-cdn.xitu.io/2019/9/2/16cf07e74aa0650d?w=1435&h=692&f=gif&s=665762)

> 百度地图最厉害的地方就是规划，不管是驾车规划、步行规划等，都是我们平时生活中用的最多的地方，这里就介绍一下驾车规划。

#### 9.驾车规划

````

var driving = new BMap.DrivingRoute(map, { 
    renderOptions: { 
        map: map, 
        autoViewport: true,
        panel: document.querySelector('r-reslut')
    } 
  });
// 起点
var start = new BMap.Point(startPoint[0], startPoint[1]);
// 终点
var end = new BMap.Point(endPoint[0], endPoint[1]);

driving.search(start, end);

````

![](https://user-gold-cdn.xitu.io/2019/9/2/16cf0f8ebbd7abf3?w=1435&h=692&f=gif&s=688187)

综上 就是我对于百度地图的一些简单操作的一点小见解，其实百度地图还有很多很多有意思的功能，在这里就不和大家说了，如果小伙伴们觉得有意思的话，可以去看一下百度地图的官网，[点这里](http://lbsyun.baidu.com)，文中如有错误，欢迎在评论区指正，如果这篇文章帮助到了你，欢迎点赞👍和关注，😀。

---

### 推荐阅读

- [妈耶，这次终于了解继承了！](https://juejin.im/post/5d6b3b4be51d4562092388a4#heading-8)
- [妈妈再也不用担心我用不好ECharts了](https://juejin.im/post/5d6b9608f265da03a6532f52)


