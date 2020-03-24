
### koa实战

### 导读
学习这门语言，其实也是我今年的一个目标之一，趁着现在在家办公，利用好之前通勤的时间，好好学习，天天向上，在这里做一个汇总，方便以后查看。希望也给一些正在准备或者有意愿学习这门语言的小伙伴一点帮助，哈。项目中实战部分代码 在这里[git地址](https://github.com/Hdoove/koa-jwt-mongodb)。欢迎小伙伴点赞、Star哦。

### 一、koa2

#### 1.什么是Koa
`koa` 是由 `Express` 原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的 `Web` 框架。使用 `koa` 编写 `web` 应用，通过组合不同的 `generator` ，可以免除重复繁琐的回调函数嵌套，并极大地提升错误处理的效率。 `koa` 不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写 `Web` 应用变得得心应手。(来自`koa`官网)。

````javascript

// npm install koa -S 安装
const Koa = require('koa');
const app = new Koa();

app.use( async ctx => {
  ctx.body = 'hello koa2'
});

app.listen(3000);// 监听3000端口

`````

#### 2.koa1、koa2、express的区别

在`koa`中，一切的流程都是中间件，数据流向遵循洋葱模型，先入后出，是按照类似堆栈的方式组织和执行的。

`koa`的数据流入流出，`next()`后，会进入下一个中间件并执行，然后从最后一个中间件反向执行。

`koa2`与`koa1`的最大区别是`koa2`实现异步是通过`async/awaite`，`koa1`实现异步是通过`generator/yield`，而`express`实现异步是通过回调函数的方式。

`koa2`和`express`提供的`API`基本一直，不同点是`express`内置了大多数的中间件，而`koa2`不绑定任何的框架，干净简洁，小而精，更容易实现定制化，扩展性好，中间件需单独引入。

`express`是没有提供`ctx`来提供上下流服务，需要更多的手动处理，`express`本身是不支持洋葱模型的数据流入流出能力的，需要引入其他的插件。

#### 3.koa中间件

在匹配路由之前或者匹配路由完成做的一系列的操作，我们就可以把它叫做中间件。

中间件的功能包括：

* 执行任何代码。
* 修改请求和响应对象。
* 终结请求-响应循环。
* 调用堆栈中的下一个中间件。

在`koa`中应用间主要分为应用级中间件、路由级中间件、错误处理中间件、第三方中间件。

1>应用级中间件 `匹配路由之前所做的一系列操作`

````javascript

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.use(async (ctx,next)=>{
    console.log(new Date());
    await next();
})
router.get('/', function (ctx, next) {
    ctx.body="Hello koa";
})
router.get('/news',(ctx,next)=>{
    ctx.body="新闻页面"
});
app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); //作用： 当请求出错时的处理逻辑
app.listen(3000,()=>{
    console.log('starting at port 3000');
});

````

2>路由级中间件 `这个中间件只对指定路由有作用`

````javascript

router.get('/', async(ctx, next)=>{
    console.log(1);
    next()
})
router.get('/', function (ctx) {
    ctx.body="Hello koa";
})

````

3>错误处理中间件 `出现错误是执行的中间件`

````javascript

//路由丢失
app.use(async (ctx,next)=>{
  if(ctx.status==404){
    ctx.status=404;
    ctx.body="404页面"
  }
});

//权限认证错误
app.use(async (ctx, next) => {
    return next().catch(err => {
        if(err.status === 401) {
            ctx.body = {
                code: 401,
                message: '认证失效'
            }
        }
    });
});

````

4>第三方中间件

会在之后进行详细介绍。

#### 4.洋葱模型

大家也都看到了，上文不止一次提到了洋葱模型，那么问题来了，洋葱模型是什么？为什么叫洋葱模型呢？下面我来一一解答。

我们先来看一段代码

````javascript

app.use(async (ctx,next)=>{
  console.log("1");
  await next();
  console.log("4")
})
app.use(async (ctx,next)=>{
  console.log("2");
  await next()
  console.log("3")
})

````

答案是啥 ？ 1423 ？ 1234 ？

这里就不卖关子了，答案是1234。

一个中间件有两个参数， 第一个是`ctx`。`ctx`是由`koa`传入的封装了`request`和`response`的变量，我们可以通过它访问`request`和`response`.

另一个是`next`, `next`是指这个中间件下面的那个中间件，`koa`里面的所有功能都是通过中间件来完成的。

在上面的代码中，我们可以使用用`await next()`执行下一个中间件。

那什么时候到洋葱中心呢？就是遇到的第一个没有`next`的中间件,或者遇到一个中间件报错，就会把这个中间件当成中心，因为遇到错误了，不会再继续往里面走。这个时候，就开始向洋葱的外层开始走了。如果第一个中间件就没有`next`，直接返回的。那么就不存在洋葱模型。下面这样图是不是很贴切呢？是不是理解问什么叫做“洋葱”模型了呢。


![](https://user-gold-cdn.xitu.io/2020/2/16/1704c8160f6c20cc?w=478&h=435&f=png&s=23877)


### 二、koa常用中间件

#### 1.koa-router

顾名思义，这个中间件就是来实现基本的路由功能。

````javascript
//npm install koa-router -S 安装
const Koa = require('koa');
const Router = require('koa-router'); //引用

const app = new Koa();
const router = new Router();
const home = new Router(); //实现二级路由

router.get('/', async(ctx, next) => {
    console.log(1);
    ctx.body = 'hello router';
});

home.get('/', ctx => {
    ctx.body = 'home';
}).get('/home', ctx => {
    ctx.body = 'home/home';
});

//将二级路由添加到router上
router.use('/home', home.routes(),home.allowedMethods());

//挂载到 app上
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('PORT on 3000');
});

/**
通过以上代码 我们成功添加了3个路由，分别是 '/', '/home', '/home/home'
*/

````

#### 2.koa-bodyparser

通过`post`提交数据，更好地获取请求体中数据的中间件。支持`x-www-form-urlencoded`, `application/json`等格式的请求体，但不支持`form-data`的请求体。

````javascript

npm install koa-bodyparser -S // 安装

...
const bodyParser = require('koa-bodyparser');
...

app.use(bodyParser());

router.post('/', async(ctx, next) => {
    console.log(ctx.request.body); // 获取请求体中数据
});

````

#### 3.koa-views
进行视图模板渲染，支持`ejs`、`html`等众多模板引擎，现在项目基本都是前后端分离，这种方式应该也不太常用了。

````javascript

npm install koa-views -S // 安装

...
const views = require('koa-views');

// app.use(views('views', { map: { //这样配置的话 后缀名应该是html
//     html: 'ejs'
// } }));

app.use(views(path.join(__dirname, './views'), { // 建议写法 支持ejs
    extension: 'ejs'
}));

router.get('/', async(ctx, next) => {
    await ctx.render('index', {
        title: 'title',
        arr: [1,2,3,4]
    });
});

//  /views/index.ejs

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    这是一个ejs模板引擎
    //使用传递的title值
    <h2>
        <%=title%>
    </h2>
    
    //循环遍历数组
    <ul>
        <%for(var i=0; i<arr.length; i++){%>
            <li><%=arr[i]%></li>
        <%}%>
    </ul>
</body>
</html>

````

#### 4.koa-static

处理静态资源

````javascript

npm install koa-static -S // 安装

...
const path = require('path');
const static = require('koa-static');

//我们就可以访问public文件夹下面的静态资源 记住不需要加 /public 前缀哦！
app.use(static(
    path.join(__dirname, './public')
));

app.use(async ctx => {
    const html = `
        <img src="./yc.png" />
    `;
    ctx.body = html;
});

````

#### 5.koa-session

`session`是一种记录客户状态的机制，不同的是`Cookie`保存在客户端浏览器中，而`session`保存在服务器上。

`session`的工作流程：当浏览器访问服务器并发送第一次请求时，服务器端会创建一个`session`对象，生成一个类似于`key`,`value`的键值对， 然后将`key(cookie)`返回到浏览器(客户)端，浏览器下次再访问时，携带`key(cookie)`，找到对应的`session(value)`。 客户的信息都保存在`session`中。

````javascript
...
const session = require('koa-session');
...

router.get('/', async(ctx, next) => {
    ctx.session.userinfo = 'hdove';
    ctx.body = '设置session';
});

router.get('/news', async(ctx, next) => {
    const name = ctx.session.userinfo;
    ctx.body = name;
});

app.keys = ['some secret hurr']; // 设置签名

const CONFIG = {
   key: 'koa:sess',   //cookie key (default is koa:sess)
   maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
   overwrite: true,  //是否可以overwrite    (默认default true)
   httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
   signed: true,   //签名默认true
   rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
   renew: false,  //session快过期的时候是否续约
};
app.use(session(CONFIG, app));

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('PORT on 3000');
});

````

简单解释一下上面的代码

当我们访问 '/'路径的时候， 我们通过 ctx.session.任何一个key = 任何一个value 来设置`session`。

当我们访问 '/news'路径的时候，我们通过 ctx.session.任何一个key 来获取`session`的值。

通过app.use(session(CONFIG, app)); 进行绑定。 `CONFIG`就是一些类似设置`cookie`的一些配置项。

说到这 简单介绍一下`cookie`和`session`的区别。

* `cookie`数据存放在客户的浏览器上，`session`数据放在服务器上。

* `cookie`不是很安全，别人可以分析存放在本地的`COOKIE`并进行`COOKIE`欺骗
   考虑到安全应当使用`session`。
* `session`会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
   考虑到减轻服务器性能方面，应当使用`COOKIE`。
* 单个`cookie`保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个`cookie`。

#### 6.koa-jwt

提供路有权限控制的功能，它会对需要限制的资源请求进行检查。

`token` 默认被携带在`Headers` 中的名为`Authorization`的键值对中，`koa-jwt`也是在该位置获取`token` 的。

````javascript

npm install jsonwebtoken koa-jwt -S

const secret = '一段秘钥';
...
const { sign } = require('jsonwebtoken'); //签发token
/**
jwt 加解码中间件
passthrough确保传入下一个中间件
可以使用ctx.state.jwtdata代替ctx.state.user获得解码数据， 默认是user
*/ 
const jwt = require('koa-jwt')({ secret, passthrough:true, key: 'jwtdata' }); 
...

// 错误处理中间件
app.use((ctx, next) => {
    return next().catch(err => {
        if(err.status === 401) {
            ctx.body = {
                code: 401,
                message: '认证失效'
            }
        }
    });
});

//把所有除login和静态资源的路由加上token认证
app.use(jwt.unless({
    path:[/^\/api\/login/, /^\/public/]
}));

//登录之后 根据username生成token
api.post('/login', async (ctx, next) => {
    const user = ctx.request.body;

    if (user && user.username) {
        let { username } = user;
        const token = sign({username}, secret, { expiresIn: '1h' }); // 生成时间长度为1h的token，并返回给用户

        ctx.body = {
            message: 'token ok',
            code: 1,
            token
        };
    }else {
        ctx.body = {
            message: '参数错误',
            code: -1
        }
    }
});

api.get('/userinfo', async (ctx, next) => {
    // 通过ctx.state 获取token中存储的一些信息。
    ctx.body = {
        message: '成功',
        code : 1,
        username: ctx.state.user.username
    }
});

````

#### 7.koa2-core

`koa2-cors`让后台允许跨域直接就可以在客户端使用`ajax`请求数据

````javascript

npm install koa2-cors -S //安装

const koa = require('koa');
const cors = require('koa2-cors');
 
const app = koa();
const.use(cors());

````

#### 8. koa-compress

开启服务端`Gzip`压缩功能

````javascript

npm install koa-compress -S //安装

const koa = require('koa');
const compress = require('koa-compress');

const app = koa();

const options = { threshold: 2048 };//当数据超过2kb的时候，可以压缩
app.use(compress(options));

````

效果图
![](https://user-gold-cdn.xitu.io/2020/2/16/1704cfa7cd2516b7?w=1524&h=632&f=png&s=198785)


#### 9.koa-logger

日志打印中间件

````javascript

npm install koa-logger -S

const logger = require('koa-logger');

app.use(logger());

````

#### 10.koa-helmet

设置`Http`头保障应用程序安全， 具体细节请查看 [npm koa-helmet](https://www.npmjs.com/package/koa-helmet)

````javascript

npm install koa-helmet -S

const helmet = reuqire('koa-helmet');

app.use(helmet());

````

#### 11.koa-parameter

用于参数校验

官方提供的规则

````
var TYPE_MAP = Parameter.TYPE_MAP = {
  number: checkNumber,
  int: checkInt,
  integer: checkInt,
  string: checkString,
  id: checkId,
  date: checkDate,
  dateTime: checkDateTime,
  datetime: checkDateTime,
  boolean: checkBoolean,
  bool: checkBoolean,
  array: checkArray,
  object: checkObject,
  enum: checkEnum,
  email: checkEmail,
  password: checkPassword,
  url: checkUrl,
};
````
安装及使用

````javascript

npm install koa-parameter -S

...
const parameter = reuqire('koa-parameter');
...

//在需要使用参数校验的地方比如login
api.post('/login', async (ctx, next) => {
    ctx.verifyParams({
        username: { type: 'string', required: true },
        password: { type: 'string', reuqired: true }
    });
});

//如果校验参数一致的话，可以提出到外面
app.use(async function (ctx) {
  ctx.verifyParams({
    name: 'string'
  });
});

parameter(app);

````

### 三、连接mongodb数据库

#### 1.启动本地mongodb
本篇文章重点不是讲解mongodb，所以小伙伴们请自行安装哈。

在这里稍微讲一下我在安装mongodb时发生的一个问题，就是我在启动mongodb的时候会显示没有读写权限。


![](https://user-gold-cdn.xitu.io/2020/2/16/1704d0f0bbfc7523?w=800&h=280&f=png&s=220498)

然后暴搜终于找到了[解决办法](https://blog.csdn.net/weiyoushi4001/article/details/102928575),希望小伙伴不要走我的老路哦。

在这里推荐一个mongodb可视化工具 [MongoDb Compass](https://www.mongodb.com/download-center/compass),可以帮助我们更好地操作数据库。

还有接口测试工具，也是我从大学阶段就开始使用，相信大多数人也已经使用过的一个工具[postman](https://www.postman.com/downloads/)来辅助我们开发。

Compass


![](https://user-gold-cdn.xitu.io/2020/2/19/1705bca7bd48ecc2?w=2034&h=1392&f=png&s=309020)

Postman


![](https://user-gold-cdn.xitu.io/2020/2/19/1705bcab90a5df84?w=2548&h=1588&f=png&s=372704)

#### 2. 安装

````javascript

npm install mongodb -S

````

#### 3.在koa里连接mongodb

##### <1>新建配置文件

````javascript

./config.js

const dbUrl = 'mongodb://127.0.0.1:27017'; // 数据库地址
const dbName = 'koa'; //数据库名称

module.exports = {
    dbUrl,
    dbName
}

````

##### <2>连接数据库

````javascript
./db.js
const { MongoClient, ObjectID}  = require('mongodb');
const { dbUrl, dbName } = require('./config');

MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        return;
    }
    const db = client.db(dbName);  数据库db对象
    
    //简单查询操作
    db.collection('user').find();
    
    db.close(); //关闭连接
});
````

##### <3>封装mongodb

以上我们基本实现了mongodb的连接，我们不可能每次请求都去连接一下数据库，在这里我们对以上代码进行一个封装。具体代码如下：

````javascript

//封装db类库
const { MongoClient, ObjectID}  = require('mongodb');
const Config = require('./config');

class Db {

    static getInstance() { // 单例模式 解决多次实例化 实例不共享的问题
        if (!Db.instance) {
            Db.instance = new Db();
        }

        return Db.instance;
    }

    constructor() {
        this.dbClient = ''; //db对象
        this.connect(); // 实例化的时候就连接数据库
    }

    connect() { // 连接数据库
        return new Promise((resolve, reject) => {
            if (!this.dbClient) { //解决数据库多次连接的问题
                MongoClient.connect(Config.dbUrl, { useUnifiedTopology: true }, (err, client) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    this.dbClient = client.db(Config.dbName);
                    resolve(this.dbClient);
                });
            } else {
                resolve(this.dbClient);
            }
        })
    }

    //查找操作 collection：表名 json：查找条件
    find(collection, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                let result = db.collection(collection).find(json);
                result.toArray((err, docs) => {
                    if (!err) {
                        resolve(docs);
                    } else {
                        reject(err);
                    }
                });
            });
        })
    }

    //新增操作
    insert(collection, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(collection).insertOne(json, (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
            });
        });
    }

    //修改操作
    update(collection, json1, json2) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(collection).updateOne(json1, {
                    $set: json2
                }, (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
            });
        });
    }

    //删除操作
    delete(collection, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(collection).removeOne(json, (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
            });
        });
    }

    //在进行查询或者删除操作的时候，我们一般都会通过id去进行操作，但是我们直接使用传递过来的id是不起作用的，需要使用mongodb提供的ObjectID方法，生成一个新的id去查询。
    getObjectID(id) {
        return new ObjectID(id);
    }
}

module.exports = Db.getInstance();

````

以上代码基本解决了数据库增删查改的基本操作，对于这些操作不太了解的小伙伴，建议先去看一下mongodb的基本操作，再回来查看以上代码。

##### <4>调用mongodb

通过步骤3我们创建了一个mongodb的类，方便我们进行数据库操作，同时也进行了相应的优化。

当我们想要调用的时候，只需要使用以下操作

````javascript
...
const DB = require('./db.js');
...

router.get('/', async ctx => {
    const result = await DB.find('news', {}); // 调用
    ctx.body = result;
});

````


### 四、Restful Api（Representational State Transfer）

#### 1.介绍

在没有前后端分离概念之前，一个网站的完成总是“all in one”，在这个阶段，页面、数据、渲染全部在服务端完成，这样做的最大的弊端是后期维护，扩展极其痛苦，开发人员必须同时具备前后端知识。 于是后来慢慢的兴起了前后端分离的思想：即后端负责数据编造，而前端则负责数据渲染，前端静态页面调用指定api获取到有固定格式的数据，再将数据展示出来，这样呈现给用户的就是一个”动态“的过程。

而关于api这部分的设计则成了一个问题。如何设计出一个便于理解，容易使用的api则成了一个问题，而所谓的RESTful就是用来规范我们的API的一种约束。

要深刻理解消化Representational State Transfer这三个单词到底意味着什么，可以从以下几个方面进行理解： 
* 每一个URI代表一种资源； 
* 客户端和服务器之间，传递这种资源的某种表现层； 
* 客户端通过四个HTTP动词（get、post、put、delete），对服务器端资源进行操作，实现”表现层状态转化”。

#### 2.六大原则

##### 1.C-S架构
数据的存储在Server端，Client端只需使用就行。两端彻底分离的好处使client端代码的可移植性变强，Server端的拓展性变强。两端单独开发，互不干扰。

##### 2.无状态
http请求本身就是无状态的，基于C-S架构，客户端的每一次请求带有充分的信息能够让服务端识别。请求所需的一些信息都包含在URL的查询参数、header、div，服务端能够根据请求的各种参数，无需保存客户端的状态，将响应正确返回给客户端。无状态的特征大大提高的服务端的健壮性和可拓展性。

当然，这种无状态性的约束也是有缺点的，客户端的每一次请求都必须带上相同重复的信息确定自己的身份和状态，造成传输数据的冗余性，但这种确定对于性能和使用来说，几乎是忽略不计的。

##### 3.统一的接口
REST架构的核心内容，统一的接口对于RESTful服务非常重要。客户端只需要关注实现接口就可以，接口的可读性加强，使用人员方便调用。

REST接口约束定义为：资源识别; 请求动作; 响应信息; 它表示通过uri标出你要操作的资源，通过请求动作（http method）标识要执行的操作，通过返回的状态码来表示这次请求的执行结果。

##### 4.一致的数据格式
服务端返回的数据格式要么是XML，要么是Json（获取数据），或者直接返回状态码，一些知名网站的开放平台的操作数据的api，post、put、patch都是返回的一个状态码 。

如请求一条微博信息，服务端响应信息应该包含这条微博相关的其他URL，客户端可以进一步利用这些URL发起请求获取感兴趣的信息，再如分页可以从第一页的返回数据中获取下一页的URT也是基于这个原理。

##### 5.可缓存
在万维网上，客户端可以缓存页面的响应内容。因此响应都应隐式或显式的定义为可缓存的，若不可缓存则要避免客户端在多次请求后用旧数据或脏数据来响应。管理得当的缓存会部分地或完全地除去客户端和服务端之间的交互，进一步改善性能和延展性。

##### 6.按需编码、可定制代码
服务端可选择临时给客户端下发一些功能代码让客户端来执行，从而定制和扩展客户端的某些功能。比如服务端可以返回一些 Javascript 代码让客户端执行，去实现某些特定的功能。提示：REST架构中的设计准则中，只有按需编码为可选项。如果某个服务违反了其他任意一项准则，严格意思上不能称之为RESTful风格。



### 六、mongoose

因为这部分内容实在太多，所以将这部分内容拆分出去，不太了解的小伙伴请查看后一篇文章[你必须要懂得关于mongoose的一小小部分](https://juejin.im/post/5e4b536ff265da5757046f3b)。

### 七、jwt

#### 1.介绍

JSON Web Token（JWT）是一个非常轻巧的规范。这个规范允许我们使用JWT在用户和服务器之间传递安全可靠的信息。

一个JWT实际上就是一个字符串，它由三部分组成，头部、载荷与签名。

#### 2.认证流程

* 用户输入用户名和密码登录之后，在服务端认证成功之后，会返回给客户端一个 JWT。
* 客户端将 token 保存到本地。
* 当用户希望访问一个受保护的路由或者资源的时候，需要请求头的 Authorization 字段中使用Bearer 模式添加 JWT。

#### 3.jwt 和 token 的区别

相同点：

* 都是访问资源的令牌， 都可以记录用户信息。

不同点：

* 服务端验证客户端发来的token信息要进行数据的查询操作；JWT验证客户端发来的token信息就不用， 在服务端使用密钥校验就可以，不用数据库的查询。

### 八、实战

#### 1.项目目录

![](https://user-gold-cdn.xitu.io/2020/2/19/1705c2990690b0d5?w=1282&h=1854&f=jpeg&s=477208)

#### 2.实现功能

* 用户类型分为两种 admin 以及 user。
* admin用户可以对书籍进行增删改查操作。
* user用户只能进行查看书籍和修改个人信息(除username<登录名>以及role<角色>)。
* 统一的登录、注册功能。
* 除登录、注册以外的接口都需要登录之后才有权访问。

#### 3.主要代码

##### app.js

````javascript

const Koa = require('koa');
const path = require('path');
const Router = require('koa-router'); //路由
const bodyparser = require('koa-bodyparser'); // 解析post传递过来的参数为json格式
const jwt = require('koa-jwt');// jwt加解码中间件
const parameter = require("koa-parameter"); // 校验
const cors = require("koa2-cors");// cors跨域
const static = require("koa-static");// 处理静态文件
const logger = require('koa-logger');// 日志打印
const bookRouter = require('./route/book'); // 路由book
const userRouter = require('./route/user'); // 路由user
const { secret } = require('./config/secret'); // 秘钥

const app = new Koa();

app.use(bodyparser());
app.use(cors());
app.use(static(
    path.join(__dirname, './public')
));
app.use(logger());

// 处理400 和 401 错误
app.use((ctx, next) => {
    return next().catch(err => {
        if (err.status === 401) {
            ctx.body = {
                code: 401,
                message: '认证失效'
            }
        }else if(err.status === 422) {
            ctx.body = {
                code: 400,
                message: '参数错误'
            }
        }
    });
});

//添加jwt认证
app.use(jwt({ secret}).unless({
    path:[/^\/user\/(login|register)/, /^\/public/]
}));

const router = new Router();

//添加二级路由
router.use('/book', bookRouter.routes(), bookRouter.allowedMethods());
router.use('/user', userRouter.routes(), userRouter.allowedMethods());

app.use(router.routes(), router.allowedMethods());

//开启校验
parameter(app);

// 启动
app.listen(3000, () => {
    console.log('连接成功');
});

````

##### config/db.js

````javascript

// 配置文件
const mongoose = require('mongoose');
const DBURL = 'mongodb://127.0.0.1:27017';

mongoose.connect(  // 连接mongodb
    `${DBURL}/koa`,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log("mongodb连接成功")
);
mongoose.connection.on("error", console.error);

module.exports = mongoose;

````

##### middleware/isAdmin.js

一个判断是不是admin权限的中间件，非常简单。

````javascript

module.exports = () => {
    return async (ctx, next) => {
        //获取token信息
        const { user } = ctx.state;

        //判断是不是admin用户
        if(user._doc.role === 'admin') {
            await next(); // 执行下一个中间件
        }else {
            ctx.body = {
                message: '此账号尚未拥有此项权限',
                code: -1
            }
        }
    }
}

````

##### router/user/index.js

````javascript

const Router = require('koa-router');
const { userLogin, userRegister, userInfo, userUpdate } = require('./controllers');

const user = new Router();

user.post('/login', userLogin);

user.post('/register', userRegister);

user.get('/userinfo', userInfo);

user.post('/update', userUpdate);

module.exports = user;

````

##### router/user/controllers.js

````javascript

const userModel= require('./model');

//登录
const userLogin = async (ctx, next) => {
    ctx.verifyParams({
        username: { type: 'string', required: true },
        password: {type: 'string', required: true}
    });
    let result = await userModel.login(ctx.request.body);
    ctx.body = {
        result
    }
};

//注册
const userRegister = async (ctx, next) => {
    ctx.verifyParams({
        username: { type: 'string', required: true },
        password: {type: 'string', required: true}
    });
    let result = await userModel.register(ctx.request.body);
    ctx.body = {
        result
    }
};

//获取用户信息
const userInfo = async (ctx, next) => {
    const { user } = ctx.state;
    let result = await userModel.getUserInfo(user._doc._id);
    ctx.body = {
        result
    }
};

//修改信息
const userUpdate = async (ctx, next) => {
    const { _id } = ctx.state.user._doc;
    let result = await userModel.updateUserInfo(ctx.request.body, _id);
    ctx.body = {
        result
    }
}

module.exports = {
    userLogin,
    userRegister,
    userInfo,
    userUpdate
}

````

##### router/user/model.js

````javascript

const { sign } = require('jsonwebtoken');
const userModel = require('./schema');
const { secret } = require('../../config/secret');

//登录
const login = (data) => {
    return new Promise((resolve, reject) => {
        userModel.find(data, (err, docs) => {
            if(err) {
                reject(err);
                return;
            }
            if(docs && docs.length) {
                const token = sign({...docs[0]}, secret, { expiresIn: '1h' });
                resolve({
                    status: 1,
                    message: '登录成功',
                    token
                });
            }else {
                resolve({
                    status: -1,
                    message: '账号或密码错误'
                });
            }
        });
    });
}

//注册
const register = (data) => {
    return new Promise((resolve, reject) => {
        userModel.find({username: data.username}, (err, docs) => {
            if(err) {
                reject(err);
                return;
            }
            if(docs && docs.length) {
                resolve({
                    status: -1,
                    message: '此账号已被注册'
                });
            }else {
                const newUser = new userModel(data);

                newUser.save((err, docs) => {
                    if(err) {
                        reject({
                            status: -1,
                            massage: '数据格式有问题'
                        });
                        return;
                    }

                    resolve({
                        status: 1,
                        message: '注册成功',
                        result: docs
                    });

                });               
            }
        });
    });
}

//获取用户信息
const getUserInfo = (_id) => {
    return new Promise((resolve, reject) => {
        userModel.find({_id}, (err, docs) => {
            if(err) {
                reject(err);
                return;
            }
            if(docs && docs.length) {
                resolve({
                    state: 1,
                    message: '获取成功',
                    result: docs[0]
                });
            }
        });
    });
}

//修改用户信息
const updateUserInfo = (data, _id) => {
    return new Promise((resolve, reject) => {
        const { role, password, username, ...others } = data;
        userModel.updateOne({_id}, others, (err, docs) => {
            if(err) {
                reject(err);
                return;
            }
            resolve({
                status: 1,
                message: '修改成功',
                result: docs
            });
        });
    });
}

module.exports = {
    login,
    register,
    getUserInfo,
    updateUserInfo
}

````

##### router/user/schema.js

````javascript

const { Schema, model } = require('../../config/db');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    nickName: String,
    homeTown: String,
    role: {
        type: String,
        default: 'user'
    },
    age: Number,
    sex: {
        type: String,
        enum: ['男', '女']
    },
    address: String
});

module.exports = model('User', UserSchema, 'user');

````

##### router/book/index.js

````javascript

const Router = require('koa-router');
const admin = require('../../middleware/isAdmin')();
const { bookAdd, bookFind, bookUpdate, bookDelete } = require('./controllers');

const book = new Router();

book.get('/find', bookFind);

book.post('/add', admin, bookAdd);

book.post('/update', admin, bookUpdate);

book.get('/delete/:id', admin, bookDelete)

module.exports = book;

````

##### router/book/controllers.js

````javascript

const bookModel= require('./model');

const bookAdd = async (ctx, next) => {
    let result = await bookModel.addBook(ctx.request.body);
    ctx.body = {
        result
    }
};

const bookFind = async (ctx, next) => {
    let result = await bookModel.findBook();
    ctx.body = {
        result
    }
};

const bookUpdate = async (ctx, next) => {
    let result = await bookModel.updateBook(ctx.request.body);
    ctx.body = {
        result
    }
};

const bookDelete = async (ctx, next) => {
    let result = await bookModel.deleteBook(ctx.params.id);
    ctx.body = {
        result
    }
};

module.exports = {
    bookAdd,
    bookFind,
    bookUpdate,
    bookDelete
}

````

##### router/book/model.js

````javascript

const bookModel = require('./schema');

const addBook = (data) => {

    return new Promise((resolve, reject) => {
        const book = new bookModel(data);

        book.save((err, result) => {
            if (err) return reject({ status: -1, message: "添加图书失败" });
            resolve({
                status: 1,
                result
            });
        });
    });
}

const findBook = () => {

    return new Promise((resolve, reject) => {
        bookModel.find({}, (err, docs) => {
            if(err) return reject({status: -1, message: "获取图书失败"});

            resolve({
                status: 1,
                docs
            });
        })
    });
}

const updateBook = (data) => {

    return new Promise((resolve, reject) => {

        const { _id, ...others } = data;

        bookModel.updateOne({_id}, {...others}, (err, docs) => {
            if(err) return reject({status: -1, message: "修改图书失败"});

            resolve({
                status: 1,
                docs
            });
        });
    });
}

const deleteBook = (_id) => {

    return new Promise((resolve, reject) => {

        bookModel.deleteOne({_id}, (err, docs) => {
            if(err) return reject({status: -1, message: "删除图书失败"});

            resolve({
                status: 1,
                docs
            });
        });
    });
}

module.exports = {
    addBook,
    findBook,
    updateBook,
    deleteBook
}

````

##### router/book/schema.js

````javascript

const { Schema, model } = require('../../config/db');

const bookSchema = new Schema({
    name: { // 书名
        type: String,
        required: true
    },
    author: String, // 作者
    details: String, // 介绍
    price: { // 价格
        type: Number,
        required: true
    },
    press: String, // 出版社
    publishTime: String // 出版时间
});

module.exports = model('Book', bookSchema);

````

#### 4.部分效果

##### <1>注册

![](https://user-gold-cdn.xitu.io/2020/2/19/1705c448789fefae?w=1742&h=1618&f=png&s=208985)

##### <2>登录

![](https://user-gold-cdn.xitu.io/2020/2/19/1705c45b3a594319?w=1872&h=1678&f=png&s=446934)

##### <3>查询书籍

![](https://user-gold-cdn.xitu.io/2020/2/19/1705c461808c055e?w=1874&h=1684&f=png&s=320705)

##### <4>查询用户信息

![](https://user-gold-cdn.xitu.io/2020/2/19/1705c467d4967acb?w=1726&h=1562&f=png&s=237238)

##### <5>无权限

![](https://user-gold-cdn.xitu.io/2020/2/19/1705c48210a7c79e?w=1896&h=1068&f=png&s=194510)

##### <6>token失效

![](https://user-gold-cdn.xitu.io/2020/2/19/1705c488a1a5609c?w=1924&h=1054&f=png&s=173811)

### 九、总结

写到这基本已经结束了，感谢小伙伴们可以坚持看到这里，实战项目写的还是很浅显，不过入门感觉还是可以了，有很多我自以为的东西，错误之处还请大家积极指正。项目git地址在这里哦 -> [这里这里](https://github.com/Hdoove/koa-jwt-mongodb)。


### 十、参考

* [使用Koa.js，离不开这十个中间件](https://www.jianshu.com/p/c1e0ca3f9764)
* [你真的了解RESTful API吗？](https://zhuanlan.zhihu.com/p/91240556)
* [koa](https://www.koajs.com.cn/)

### 十一、推荐

* [Redux与Redux-Saga的故事](https://juejin.im/post/5e413e5c518825494f7deb80)
* [React组件间的通信，你至少要知道这些？](https://juejin.im/post/5e41141ee51d4526d43f257a)
* [你必须要懂得关于mongoose的一小小部分](https://juejin.im/post/5e4b536ff265da5757046f3b)

