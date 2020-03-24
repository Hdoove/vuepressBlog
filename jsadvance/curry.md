### 柯里化

```javascript
function curry() {
    let sum = 0;

    sum = [...arguments].reduce((a,b) => a+b, sum);

    return function() {
        if([...arguments].length === 0) {
            return sum;
        }else {
            sum = [...arguments].reduce((a,b) => a+b, sum);
            return arguments.callee;
        }
    }
}

const num = curry(1,2,3)(4,5)(6)();

console.log(num);
```