
### Symbol

```javascript

const s1 = Symbol('hdove');
const s2 = Symbol();

// console.log(s1); // Symbol(hdove)
// console.log(s1 === s2); // false

const obj = {
    [s1]: 'hd',
    [s1]: 'lj',
    name: 'hdove',
    age: 25
}

// console.log(Object.keys(obj)); //[ 'name', 'age' ]
// console.log(Object.getOwnPropertyNames(obj)); //[ 'name', 'age' ]
// console.log(Object.getOwnPropertySymbols(obj)); //[ Symbol(hdove) ]
// console.log(Reflect.ownKeys(obj)); // [ 'name', 'age', Symbol(hdove) ]

//内置方法
// const obj1 = {
//     [Symbol.hasInstance](other) {
//         console.log(other);  // {a: 1}
//     }
// }
// console.log({ a: 1 } instanceof obj1); // false

//内置方法 是否扁平化
// let arr = [1,2];
// console.log([].concat(arr, [3,4])); // [1,2,3,4]
// arr[Symbol.isConcatSpreadable] = false;
// console.log([].concat(arr, [3,4])); // [ [ 1, 2, [Symbol(Symbol.isConcatSpreadable)]: false ], 3, 4 ]

// 内置方法

let obj2 = {
    [Symbol.match](string) {
        return string.length;
    },
    [Symbol.search](string) {
        return string.length;
    },
    [Symbol.split](string) {
        return string.length;
    },
    [Symbol.replace](string) {
        return string.length;
    }
}

console.log('11111'.match(obj2));  //5

```
