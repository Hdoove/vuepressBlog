
### 手写new原理

#### 1.new运算符都做了什么
1. 新建一个对象。
2. 执行prototype连接。
3. 将构造函数的作用域赋给新对象。
4. 绑定this指向，执行构造函数中的代码。
5. 返回这个对象。

#### 2.简单实现

````

function myNew(context) {

    // 新建一个对象
    var res = new Object();
    
    // 获取传递的参数，第一个参数代表传入的构造函数，也就是这个即将创建的这个实例的构造函数，截取掉
    const args = [...arguments].slice(1);
  
    // 将创建的res的this绑定到传进来的这个构造函数context
    context.apply(res, args);
  
    return res;
}

function Hdove(name) {
  this.name = name;
}

var example = myNew(Hdove, 'LJ');

console.log(example); // {name: "LJ"}

````

#### 3.继续改造

> 来，我们先看一下真实的new操作符

````

function Hdove(name) {
  this.name = name;
}

Hdove.prototype.age = 25;

Hdove.prototype.sayName = function() {
    console.log(this.name);
};

var obj = new Hdove('LJ');

console.log(obj.name); // LJ
console.log(obj.age); // 25
obj.sayName(); // LJ

````
> 继续修改我们的代码

````

function myNew(context) {

    var res = new Object();
    
    // 判断构造函数上有没有原型，有的话进行添加
    if(context.prototype) {
        res.__proto__ = context.prototype
    }
    
    const args = [...arguments].slice(1);
  
    context.apply(res, args);
  
    return res;
}

function Hdove(name) {
  this.name = name;
}

Hdove.prototype.age = 25;

Hdove.prototype.sayName = function() {
    console.log(this.name);
};

var example = myNew(Hdove, 'LJ');

console.log(example);

通过下图我们可以看出原型已经成功绑定了，完美

````
<img src="https://user-gold-cdn.xitu.io/2020/1/10/16f8e8bfe7dc0598?w=524&h=242&f=png&s=95258" align=center width=300>

<br />

> 距离成功还有一步，我们加足马力

#### 4.改造升级

> 我们继续看一下原生的new 操作符

````
1.返回一个对象
function Hdove(name) {
  this.name = name;
  return {
    name: 'return出来的'
  }
}

var obj = new Hdove('LJ');  
console.log(obj); // {name: "return出来的"}

2.返回基本类型
function Hdove(name) {
  this.name = name;
  return '123';
}


var obj = new Hdove('LJ');  
console.log(obj); // {name: "LJ"}

3.返回一个方法
function Hdove(name) {
  this.name = name;
  return function() {
    console.log(123);
  };
}


var obj = new Hdove('LJ');  
console.log(obj); // function () { window.runnerWindow.proxyConsole.log(123); }

````
有没有发现神奇的事情发生了，当我们在构造函数中返回一个对象类型A的时候，这个时候我们使用new操作符，实际上返回的就是这个A，反之，返回的是我们新建的这个对象，开始实现！

````

function myNew(context) {

    var res = new Object();
    
    // 判断构造函数上有没有原型，有的话进行添加
    if(context.prototype) {
        res.__proto__ = context.prototype
    }
    
    const args = [...arguments].slice(1);
  
    const ret = context.apply(res, args);
    
    // 判断ret 是不是object或者function，因为null也属于object，所以要单独排除
    if((typeof ret === 'object' || typeof ret === 'function') && ret !== null) {
      return ret;
    }
    return res;
}

function Hdove1(name) {
  this.name = name;
}

function Hdove2(name) {
  this.name = name;
  return {
    name: 'return出来的数据'
  }
}

var example1 = myNew(Hdove1, 'LJ');
var example2 = myNew(Hdove2, 'LJ');

console.log(example1); // { name: LJ }
console.log(example2); // { name: return出来的数据 }

````

#### 5.完整版

````

function myNew(context) {

    var res = new Object();
    
    if(context.prototype) {
        res.__proto__ = context.prototype
    }
    
    const args = [...arguments].slice(1);
  
    const ret = context.apply(res, args);
    
    if((typeof ret === 'object' || typeof ret === 'function') && ret !== null) {
      return ret;
    }
    return res;
}

````

#### 6.推荐阅读

- [都2020年了，你应该知道如何手写Call、Apply、Bind了吧](https://juejin.im/post/5e17f16f5188254d3f73c7df)
- [仿网易云音乐webApp](https://juejin.im/post/5df1dccfe51d45582248d5ec)
- 最近在研究Taro，然后基于Taro + TS + Hook + MongoDB + KeystoneJS 写了一个图像识别的小玩意，欢迎围观
-  
![](https://user-gold-cdn.xitu.io/2020/1/10/16f8eb3591acb917?w=344&h=344&f=jpeg&s=58223)