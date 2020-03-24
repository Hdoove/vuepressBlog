### 手写instanceof

```javascript
function instance_of(left, right) {
    let L = left.__proto__;
    const R = right.prototype;

    while(true) {
        if(L === null) {
            return false;
        }else if(L === R) {
            return true;
        }

        L = L.__proto__;
    }
}
console.log( instance_of([], Array));
```