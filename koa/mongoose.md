

### mongoose教程

### 导读

> 为了大家可以看懂上一篇文章所提到的一些关于`mongoose`的一些操作，在这里特地分享一下关于`mongoose`的介绍以及操作，基本涵盖了大多数的基本使用方法，具体操作大家可以移步去观看一下官网的介绍，[链接在这里](http://www.mongoosejs.net/)。写这两篇文章的目的其实即使帮助自己更好地消化这部分知识，用实战和文章记录的方式加强记忆和手敲能力，希望小伙伴也可以一起行动起来，这部分知识并没有大家想象中的那么难缠，一起加油撒💪！如果这篇文章对大家有什么帮助的话，帮忙点赞哦，有什么不足和错误❌之处，欢迎在评论中指出。

### 一、介绍

`Mongoose`是在`node.js`异步环境下对`mongodb`进行便携操作的对象模型工具。`Mongoose`是`nodejs`的驱动，不能作为其他语言的驱动。

### 二、特点
* 通过关系型数据库的思想来设计非关系型数据库。
* 基于`mongodb`驱动，简化操作。
* 用来操作`mongodb`数据库更灵活、更安全。

### 三、安装与使用

#### 1.安装

> npm install mongoose -S

#### 2.引入`mongoose`并连接数据库

````javascript

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

````

> 这里稍微解释一下这个`test`，这个其实是可以不用添加的，这个`test`是表示在连接数据库的同时新建一个名为`test`的库，可以自定义，默认是`test`。

> { useNewUrlParser: true } 用来解决警告信息

#### 3.定义`Schema`

数据库中的`Schema`，为数据库对象的集合。`Schema`是`mongoose`里会用到的一种数据模式，可以理解为表结构的定义。每个`Schema`会映射到`mongodb`中的一个`collection`，它不具备操作数据库的能力。

````javascript

const TestSchema = mongoose.Schema({
    username: String,
    password: String
});

````

#### 4.创建数据模型

定义好`Schema`，接下来就是生成`Model`。`Model`是有`Schema`生成的模型，可以对数据库进行一些操作。

> mongoose.model里面既可以传入两个参数，也可以传入三个参数。

> mongoose.model(参数1:模型名称(首字母大写), 参数2: Schema);

> mongoose.model(参数1:模型名称(首字母大写), 参数2: Schema, 数据库集合名称);

**如果传入两个参数的话** ： 这个模型会和模型名称相同的复数的数据库建立连接，比如以下面方法创建模型，那么这个模型会操作`users`的集合。

> const User = mongoose.model('User', UserSchema);

**如果传入三个参数的话** ： 模型默认操作第三个参数定义的集合名称。

#### 5.数据操作

##### <1>查找数据

参数一为查找条件， 参数二为回调函数
````javascript

User.find({}, (err,docs) => {
    if(err) return;
    console.log(docs);
});

````

##### <2>增加数据

````javascript

const u = new User({ //实例化模型，传入增加的数据
    username: 'hdove',
    password: '123456'
});

u.save();// 执行保存操作，也可以传入一个回调函数

````

##### <3>修改数据

````javascript

User.updateOne({'_id': '1'}, {name: 'hdove1'}, (err, docs) => {
    if(err) return;
    console.log(docs);
});

// 将_id为1的数据的name改为hdove1,在这里这个_id不再需要通过mongodb自带的ObjectID进行转换，方便许多。

````

##### <4>删除数据

````javascript

User.deleteOne({'_id': '1'}, (err, docs) => {
    if(err) return;
    console.log(docs);
});

// 删除_id为1的数据

````


### 四、默认参数

`mongoose`默认参数，增加数据的时候，如果不传入数据会使用默认配置的数据。

````javascript

const TestSchema = mongoose.Schema({
    username: String,
    password: String,
    status: {
        type: Number,
        default: 1 // 设置默认参数
    }
});

````

### 五、模块化

模块化其实就是用来简化我们的一些操作，减少代码逻辑，层次更加分明，更容易操作，尤其是代码数量过多的条件下。下面是一个简单地模块化步骤，来解释一下其作用。

#### 1.文件目录

+-- model

| +-- db.js  // 数据库连接

| +-- user.js // 用户模型

+-- app.js

#### 2. db.js

````javascript

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true }, (err) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('数据库连接成功');
});

module.export mongoose;

````

#### 3. user.js

````javascript

const { Schema, model } = require('./db.js');

const UserSchema = new Schema({
    name: String,
    age: Number,
    status: {
        type: Number,
        default: 1
    }
});

module.export = model('User', UserSchema, 'user');

````

#### 4. app.js

````javascript

const UserModel = require('./model/user');

User.find({}, (err, docs) => {
    if(err) return;
    console.log(docs);
});

````

### 六、性能问题

通过上面介绍，我们来看一段代码

````javascript

console.time('user');
const UserModel = require('./model/user');
console.timeEnd('user');

console.time('test');
const TestModel = require('./model/test');
console.timeEnd('test');

````

大家先来猜测一下打印的时间是差不多还是差很多呢？

答案是`差很多`。

结果差不多为 ：

````

user: 1154ms

test: 2ms

````

这是为什么呢？

其实`mongoose`是使用了一种单例模式，就像[上一篇](https://juejin.im/post/5e4765626fb9a07cad3b93dc)我们简单封装出来的那样，连接成功之后，第二次是直接返回这个链接对象，不需要重新连接。提高速度，所以大家不太需要去太多关注它的性能问题，`mongoose`已经做好了大部分的优化。


### 七、预定义操作符和自定义操作符

#### 1.预定义操作符

`lowercase`、 `uppercase`、`trim`

`mongoose`提供的预定义模式操作符，可以对我们增加的数据进行一些格式化。

````javascript

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true // 左右去空格
    }
});

````

#### 2.自定义修饰符

除了`mongoose`内置的修饰符以外，我们还可以通过`set`(建议使用)修饰符在增加数据的时候对数据进行格式化，也可以通过`get`(不建议使用)在实例获取数据的时候对数据进行格式化。

##### (1)set

实现一个简单地操作，入股用户输入类似于 `www.baidu.com` 时，我们在数据库中存入     `https://www.baidu.com`

````javascript

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true // 左右去空格
    },
    website: {
        type: String,
        set(params){ // 增加数据的时候对此字段进行处理
            // params 可以获取website的值，返回的数据就是在数据库实际保存的值
            if(!params) return '';
            
            if( params.indexOf('http://') !== 0 && params.indexOf('https://') !== 0 ){
                return 'https://' + params;
            }
            return params;
        }
    }
});

````

##### (2)get

我们从数据库获取数据的时候，其实获取的还是数据库中实际存储的数据，`get`只是在我们比如新建数据的时候，可以看到修饰过的内容，然而存入数据库的还是输入的数据，没什么影响，所以没什么太大的用处，不建议使用。

````javascript

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true // 左右去空格
    },
    website: {
        type: String,
        get(params) {
            if(!params) return '';
            
            if( params.indexOf('http://') !== 0 && params.indexOf('https://') !== 0 ){
                return 'https://' + params;
            }
            return params;
        }
    }
});

const UserModel = model('User', UserSchema);

const User = new UserModel({
    website: 'www.baidu.com'
});

console.log(User.website); // https://www.baidu.com

User.save(); // { website: 'www.baidu.com' }

````

### 八、mongoose索引、CURD、扩展Model的静态方法以及实例方法

#### 1. mongoose索引

索引通常能够极大的提高查询的效率，如果没有索引，MongoDB在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。

这种扫描全集合的查询效率是非常低的，特别在处理大量的数据时，查询可以要花费几十秒甚至几分钟，这对网站的性能是非常致命的。

索引是特殊的数据结构，索引存储在一个易于遍历读取的数据集合中，索引是对数据库表中一列或多列的值进行排序的一种结构



````javascript

const UserSchema = new Schema({
    sn: {
        type: String,
        index: true // 设置普通索引
    },
    name: {
        type: String,
        unique: true // 唯一索引
    }
});

````

#### 2. CURD(增删改查操作)

mongoose 内置的一些CURD，详情请查看[文档](https://mongoosejs.com/docs/queries.html)

* Model.deleteMany()
* Model.deleteOne()
* Model.find()
* Model.findById()
* Model.findByIdAndDelete()
* Model.findByIdAndRemove()
* Model.findByIdAndUpdate()
* Model.findOne()
* Model.findOneAndDelete()
* Model.findOneAndRemove()
* Model.findOneAndReplace()
* Model.findOneAndUpdate()
* Model.replaceOne()
* Model.updateMany()
* Model.updateOne()

#### 3. Model的静态方法以及实例方法

用来自定义CURD方法。

````javascript

const UserSchema = new Schema({
    name: {
        type: String
    },
    age: Number
});

// 静态方法
UserSchema.statics.findByName = function(name, cb) {
    // 通过find方法获取name数据，this关键字获取当前model
    this.find({'name': name}, function(err, docs) => {
        cb(err, docs); 
    });
}

// 实例方法 (基本不使用)
UserSchema.mothods.print = function(name, cb) {
    console.log('我是一个实例方法');
    console.log(this.name);
}

const UserModel = model('User', UserSchema);

const user = new UserModel({
    name: 'hdove'
});

user.print(); //我是一个实例方法 hdove

````

### 九、数据校验

#### 1.内置数据校验方法

* `required` 表示这个数据必须传入
* `max` 用于Number类型数据，最大值
* `min` 用于Number类型数据，最小值
* `enum` 枚举类型，要求数据必须满足枚举值
* `match` 增加的数据必须符合match(正则)的规则
* `maxlength` 最大长度
* `minlength` 最小长度

#### 2.自定义校验方法

和上面的`set`类似

````javascript

const UserSchema = new Schema({
    name: {
        type: String,
        validate: name => { // 自定义 作用是判断name的长度是不是大于10
            return name.length > 10
        }
    }
});

````

### 十、使用`aggregate`聚合管道

使用聚合管道可以对集合中的文档进行变换和组合。

实际使用： 表关联查询、数据统计。

#### 1.常用管道操作符

* `$project` 增加、删除、重命名字段
* `$match` 条件匹配。只满足条件的文档才能进入下一阶段
* `$limit` 限制结果的数量
* `$skip` 跳过文档的数量
* `$sort` 条件排序
* `$group` 条件组合结果 统计
* `$lookup` 用来引入其他集合的数据

#### 2.常用管道表达式

管道操作符为“键”，管道表达式为“值”。

* `$addToSet` 将文档指定字段的值去重
* `$max` 文档指定字段的最大值
* `$min` 文档指定字段的最大值
* `$sum` 文档指定字段求和
* `$avg` 文档指定字段求平均
* `$gt` 大于给定值
* `$lt` 小于给定值
* `$eq` 等于给定值

#### 3.$project

修改文档的结构，可以用来重命名、增加或删除文档中字段

````javascript

//只返回a和b字段
Model.aggregate([
    {
        $project: { a: 1, b: 1 }
    }
]);

````

#### 4.$match

用于过滤文档，用法类似于find()方法中的参数

````javascript

//返回符合price大于或等于100的数据
Model.aggregate([
    {
        $match: { 'price': { $gte: 100 } }
    }
]);

````

#### 4.$limit

````javascript

//只返回一条数据
Model.aggregate([
    {
        $limit: 1 
    }
]);

````

#### 5.$skip

````javascript

//跳过第一条，返回之后的数据
Model.aggregate([
    {
        $skip: 1 
    }
]);

````

#### 6.$sort

将集合中的文档进行排序。 

````javascript

//以price倒序排列
Model.aggregate([
    {
        $sort: { 'price': -1 }
    }
]);

````

#### 7.$group

将集合中的文档进行分组，可用于统计结果。 

````javascript

//以order_id进行分组，并统计每组的数量
Model.aggregate([
    {
        $group: {_id: "$order_id", total: {$sum: "$num"}}
    }
]);

````

#### 8.$lookup

````javascript

Model.aggregate([
    {
        $lookup: {
            from: 'student', // 和student表进行关联
            localField: 'class_id', // 此表字段名为 class_id
            foreignField: 'class_id', // 关联表中字段为 class_id
            as: 'students' // 用students 字段接收符合要求的内容
        }
    },
]);

````

#### 9.简单应用(关联一个表)

首先我们新建两个集合。

教师表
![](https://user-gold-cdn.xitu.io/2020/2/18/17057439fbd37aea?w=1038&h=478&f=jpeg&s=51452)

学生表
![](https://user-gold-cdn.xitu.io/2020/2/18/1705743b7e55f947?w=1278&h=688&f=jpeg&s=87773)

实现表关联查询,这里就不新建下面的两个Model，相信大家可以自己完成了，节约时间，我们继续。。

> 这里稍微提一下，mongoose里面获取ObjectID，应该使用mongoose.Types.ObjectId

```javascript

//查询学生表信息，以及对应的教师信息，通过class_id进行关联

const StudentModel = require('./Student');
const ClassModel = require('./Class');

StudentModel.aggregate([
    {
        $lookup: {
            from: 'class',
            localField: 'class_id',
            foreignField: 'class_id',
            as: 'teachers'
        }
    }
], (err, docs) => {
    if(err) return;
    
    console.log(docs);
});

返回数据:

[{
    ...other,
    teachers: [{
        teacher: 'lisi1',
        ...other
    }]
},

...other
]

//查询教师1对应的学生

ClassModel.aggregate([
    {
        $lookup: {
            from: 'student',
            localField: 'class_id',
            foreignField: 'class_id',
            as: 'students'
        }
    },
    {
        $match: { class_id: 1 }
    }
], (err, docs) => {
    if(err) return;
    
    console.log(docs);
});

```


#### 3.复杂应用(关联多个表)

虽然名字叫做复杂应用，但是用起来还是很简单的，只要我们掌握了简单应用的方法就ok啦，方法就是进行叠加操作。


```javascript

const StudentModel = require('./Student');
const ClassModel = require('./Class');

StudentModel.aggregate([
    {
        $lookup: {
            from: 'class',
            localField: 'class_id',
            foreignField: 'class_id',
            as: 'teachers'
        }
    },
    {
        $lookup: {
            ...关联的任意表
        }
    }
], (err, docs) => {
    if(err) return;
    
    console.log(docs);
});

```

### 十一、数据导出与还原

#### 1.导出

> mongodump -h 127.0.0.1 -d koa -o 导出的目录

#### 2.还原

> mongorestore -h 127.0.0.1 -d 导入的数据库库名称

### 十二、推荐

* [koa2 + jwt + mongodb入门实战](https://juejin.im/post/5e4765626fb9a07cad3b93dc)
* [Redux与Redux-Saga的故事](https://juejin.im/post/5e413e5c518825494f7deb80)
* [React组件间的通信，你至少要知道这些？](https://juejin.im/post/5e41141ee51d4526d43f257a) 