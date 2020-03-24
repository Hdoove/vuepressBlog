### 手写call

```javascript
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
  ```