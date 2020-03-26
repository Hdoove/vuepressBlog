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

```javascript

function add2(arg) {
    // body...
    let sum = 0;
    sum = Array.prototype.slice.call(arguments).reduce((a, b) => {
        return a + b;
    }, sum);
    var tmpf = function (tmarg) {
        // body...
        if (arguments.length == 0) {
            return sum;
        } else {
            sum = Array.prototype.slice.call(arguments).reduce((a, b) => {
                return a + b;
            }, sum);
            return tmpf;
        }
    };
    tmpf.toString = tmpf.valueOf = function () {
        return sum;
    }
    return tmpf;
}

const aaa = add2(1, 2, 3)(1)(2);

console.log(aaa);

```