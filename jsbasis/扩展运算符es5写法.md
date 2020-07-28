### 扩展运算符es5写法

```javascript

function example(x,y,z) {
    console.log(x,y,z)
}

const arr = [1,2,3];

example(...arr); // es6写法
example.apply(null, arr); //es5写法

```