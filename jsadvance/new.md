### 手写new

```javascript
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
```