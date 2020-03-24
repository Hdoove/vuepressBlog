### 手写apply

```javascript
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
  ```