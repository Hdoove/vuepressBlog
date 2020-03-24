### 手写call、apply、bind原理

#### 导读

作为面试中面试官最宠爱的一个问题，在这里进行一个详细的介绍，大家重点要放在理解，而不是背。
写的不好或不对的地方，请大家积极指出，好了，话不多说，我们“圆规正转”

````

先说一下三者的区别
共同点就是修改this指向，不同点就是
1.call()和apply()是立刻执行的， 而bind()是返回了一个函数
2.call则可以传递多个参数，第一个参数和apply一样，是用来替换的对象，后边是参数列表。
3.apply最多只能有两个参数——新this对象和一个数组argArray

````
### 一、手写实现Call


#### 1.call主要都做了些什么。

- 更改this指向
- 函数立刻执行

#### 2.简单实现

````javascript
Function.prototype.myCall = function(context) {
  context.fn = this;
  context.fn();
}

const obj = {
  value: 'hdove'
}

function fn() {
  console.log(this.value);
}

fn.myCall(obj); // hdove
````
#### 3.出现的问题
- 无法传值
- 如果fn()有返回值的话，myCall 之后获取不到

````
function fn() {
  return this.value;
}

console.log(fn.myCall(obj)); // undefined

````
- call其实就是更改this指向，指向一个Object，如果用户传的是基本类型又或者干脆就不传呢？
- myCall执行之后，obj会一直绑着fn()

#### 4.统统解决

````javascript

Function.prototype.myCall = function(context) {
  // 1.判断有没有传入要绑定的对象，没有默认是window，如果是基本类型的话通过Object()方法进行转换（解决问题3）
  var context = Object(context) || window;
  
  /**
    在指向的对象obj上新建一个fn属性，值为this，也就是fn()
    相当于obj变成了
    {
        value: 'hdove',
        fn: function fn() {
          console.log(this.value);
        }
    }
  */
  context.fn = this;
  
  // 2.保存返回值
  let result = '';
  
  // 3.取出传递的参数 第一个参数是this， 下面是三种截取除第一个参数之外剩余参数的方法（解决问题1）
  const args = [...arguments].slice(1);
  //const args = Array.prototype.slice.call(arguments, 1);
  //const args = Array.from(arguments).slice(1);
  
  // 4.执行这个方法，并传入参数 ...是es6的语法用来展开数组
  result = context.fn(...args);
  
  //5.删除该属性（解决问题4）
  delete context.fn;
  
  //6.返回 （解决问题2）
  return result;
}


const obj = {
  value: 'hdove'
}

function fn(name, age) {
  return  {
      value: this.value,
      name,
      age
  }
}

fn.myCall(obj, 'LJ', 25); // {value: "hdove", name: "LJ", age: 25}

````
<br />

### 二、手动实现Apply

#### 实现了call其实也就间接实现了apply，只不过就是传递的参数不同

````javascript

Function.prototype.myApply = function(context, args) {
  var context = Object(context) || window;
  
  context.fn = this;
  
  let result = '';
  
  //4. 判断有没有传入args
  if(!args) {
    result = context.fn();
  }else {
    result = context.fn(...args);
  }
  
  delete context.fn;
  
  return result;
}


const obj = {
  value: 'hdove'
}

function fn(name, age) {
  return  {
      value: this.value,
      name,
      age
  }
}

fn.myApply(obj, ['LJ', 25]); // {value: "hdove", name: "LJ", age: 25}

````
<br />

### 三、实现Bind

````

bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用(MDN)

````

#### 1.bind特性
- 指定this
- 返回一个函数
- 传递参数并柯里化

#### 2.简单实现

````javascript

Function.prototype.myBind = function(context) {
    const self = this;
    
    return function() {
        self.apply(context);
    }
}

const obj = {
  value: 'hdove'
}

function fn() {
    console.log(this.value);
}

var bindFn = fn.myBind(obj);

bindFn(); // 'hdove;


````

#### 3.优化
相比于call、apply，我个人觉得bind的实现逻辑更加复杂，需要考虑的东西很多，在这里分开进行优化。

#### 3.1 调用bind是个啥玩意？

在这里我们需要进行一下判断，判断调用`bind`的是不是一个函数，不是的话就要抛出错误。

````

Function.prototype.myBind = function(context) {

    if (typeof this !== "function") {
        throw new Error("不是一个函数");
    }
    const self = this;
    
    return function() {
        self.apply(context);
    }
}

````

#### 3.2 传递参数
我们看下面这段代码

````javascript

Function.prototype.myBind = function(context) {

    if (typeof this !== "function") {
        throw new Error("不是一个函数");
    }
    const self = this;
    
    return function() {
        self.apply(context);
    }
}

const obj = {
  value: 'hdove'
}

function fn(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);
}

var bindFn = fn.myBind(obj, LJ, 25);

bindFn(); // 'hdove' undefined undefined


````

很明显，第一个优化的地方就是传递参数，我们来改造下

````

Function.prototype.myBind = function(context) {

    if (typeof this !== "function") {
        throw new Error("不是一个函数");
    }
    
    const self = this;
    
    // 第一个参数是this，截取掉
    const args = [...arguments].slice(1);
    
    return function() {
        /**
            这里我们其实即可以使用apply又可以使用call来更改this的指向
            使用apply的目的其实就是因为args是一个数组，更符合apply的条件
        */
        return self.apply(context, args);
    }
}

const obj = {
  value: 'hdove'
}

function fn(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);
}

var bindFn = fn.myBind(obj, 'LJ', 25);

bindFn(); // 'hdove' 'LJ' 25
 
````

想在看起来没什么问题，但是我们这样传一下参数

````

var bindFn = fn.myBind(obj, 'LJ');

bindFn(25); // 'hdove' 'LJ' undefined

````
我们发现后面传递的参数丢了，这里就需要使用柯里化来解决这个问题

````

Function.prototype.myBind = function(context) {

    if (typeof this !== "function") {
        throw new Error("不是一个函数");
    }
    
    const self = this;
    
    // 第一个参数是this，截取掉
    const args1 = [...arguments].slice(1);
    
    return function() {
        // 获取调用时传入的参数
        const args2 = [...arguments];
        return self.apply(context, args1.concat(args2));
    }
}

const obj = {
  value: 'hdove'
}

function fn(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);
}

var bindFn = fn.myBind(obj, 'LJ');

bindFn(25); // 'hdove' 'LJ' 25

````

#### 3.3this丢失

其实`bind`还具有一个特性就是 `作为构造函数使用的绑定函数`,意思就是这个绑定函数可以当成构造函数使用，可以调用`new`操作符去创建一个实例，当我们使用`new`操作符之后，`this`其实不是指向我们指定的对象，而是指向`new`出来的这个实例的构造函数，不过提供的参数列表仍然会插入到构造函数调用时的参数列表之前。我们简单实现一下。


````

Function.prototype.myBind = function(context) {
    if (typeof this !== "function") {
        throw new Error("不是一个函数");
    }
    const self = this;
    const args1 = [...arguments].slice(1);
    
    const bindFn = function() {
        const args2 = [...arguments];
        
        /**
            这里我们通过打印this，我们可以看出来。
            当这个绑定函数被当做普通函数调用的时候，this其实是指向window。
            而当做构造函数使用的时候，却是指向这个实例，所以this instanceof bindFn为true，这个实例可以获取到fn()里面的值。
            
            我们可以再fn里面添加一个属性test.
            如果按照之前的写法 打印出来的是undefined，正好验证了我们上面所说的this指向的问题。
            所以解决方法就是添加验证，判断当前this
            如果 this instanceof bindFn 说明这是new出来的实例，指向这个实例， 否则指向context
        */
        console.log(this);
        
        return self.apply(this instanceof bindFn ? this : context, args1.concat(args2));
    }
    
    return bindFn;
}

const obj = {
  value: 'hdove'
}

function fn(name, age) {
    this.test = '我是测试数据';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

var bindFn = fn.myBind(obj, 'LJ');

var newBind = new bindFn(25);

console.log(newBind.test); // undefined

````


#### 3.4绑定原型
我们都知道每一个构造函数，都会有一个原型对象(prototype),来添加额外的属性。

````

function fn(name, age) {
    this.test = '我是测试数据';
}

fn.prototype.pro = '原型数据';

var bindFn = fn.myBind(obj, 'LJ', 25);

var newBind = new bindFn();

console.log(bindObj.pro); // undefined

````

因为我们没有绑定原型，所以会出现`undefined`，我们简单绑定一下

````
Function.prototype.myBind = function(context) {
    if (typeof this !== "function") {
        throw new Error("不是一个函数");
    }
    const self = this;
    const args1 = [...arguments].slice(1);
    
    const bindFn = function() {
        const args2 = [...arguments];
        return self.apply(this instanceof bindFn ? this : context, args1.concat(args2));
    }
    
    // 绑定原型
    bindFn.prototype = self.prototype;
    
    return bindFn;
}

function fn(name, age) {
    this.test = '我是测试数据';
}

fn.prototype.pro = '原型数据';

var bindFn = fn.myBind(obj, 'LJ', 25);

var newBind = new bindFn();

console.log(bindObj.pro); // "原型数据"

````

但是这样会出现这样一个问题

````

function fn(name, age) {
    this.test = '我是测试数据';
}

fn.prototype.pro = '原型数据';

var bindFn = fn.myBind(obj, 'LJ');

var bindObj = new bindFn();

bindObj.__proto__.pro = '篡改原型数据';

console.log(bindObj.__proto__ === fn.prototype); // true

console.log(bindObj.pro); // "篡改原型数据"

console.log(fn.prototype.pro); // "篡改原型数据"

当我们修改bindObj的原型的时候，fn的原型也一起修改了
这其实是因为 bindObj.__proto__ === fn.prototype
我们在修改bindObj的同时也间接修改了fn

````

解决方法其实很简单，创建一个新方法`proFn()`，来进行原型绑定，也就是实现继承的几种方式中的原型式继承，然后我们把这个新方法的实例对象绑定到我们的绑定函数的原型中

````
Function.prototype.myBind = function(context) {
    if (typeof this !== "function") {
        throw new Error("不是一个函数");
    }
    const self = this;
    const args1 = [...arguments].slice(1);
    
    const bindFn = function() {
      const args2 = [...arguments];
       
        return self.apply(this instanceof bindFn ? this : context, args1.concat(args2));
    }
    
    // 绑定原型
    
    function proFn() {}  //创建新方法
    proFn.prototype = self.prototype; //继承原型
    bindFn.prototype = new proFn(); //绑定原型
    
    return bindFn;
}

function fn(name, age) {
    this.test = '我是测试数据';
}

fn.prototype.pro = '原型数据';

var bindFn = fn.myBind(obj, 'LJ', 25);

var newBind = new bindFn();

console.log(bindObj.__proto__ === fn.prototype); // false

console.log(bindObj.pro); // "篡改原型数据"

console.log(fn.prototype.pro); // "原型数据"

````

### 四、面试

这些东西其实是面试中比较容易考到的问题，大家不要想着去背，背下来其实是没什么用处的，容易会被问倒，重点还是在于理解，理解了也就可以轻而易举的写出来了。希望这篇文章会给大家带来收获，那怕是一点点。在这里，提前给大家伙拜个早年，鼠年幸运，跳槽顺利，涨薪顺利，哈哈。

#### 5.推荐阅读

- [再回家之前，先new个对象吧](https://juejin.im/post/5e23c414e51d4552464d409b)
- [仿网易云音乐webApp](https://juejin.im/post/5df1dccfe51d45582248d5ec)
- 最近在研究Taro，然后基于Taro + TS + Hook + MongoDB + KeystoneJS 写了一个图像识别的小玩意，欢迎围观
-  
![](https://user-gold-cdn.xitu.io/2020/1/10/16f8eb3591acb917?w=344&h=344&f=jpeg&s=58223)