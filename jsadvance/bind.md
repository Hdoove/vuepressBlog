### 手写bind

```javascript
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

```