### 大数相加vs大数相乘

```javascript

function bigAdd(num1, num2) {

    num1 = num1.split('');
    num2 = num2.split('');

    let res = [], go = 0;

    while (num1.length || num2.length) {
        let a = Number(num1.pop()) || 0;
        let b = Number(num2.pop()) || 0;

        let temp = a + b + go;

        if (temp > 9) {
            go = 1;
            temp %= 10;
        } else {
            go = 0;
        }

        res.unshift(temp);
    }

    if(go !== 0) res.unshift(go);

    return res.join('');

}
console.log(7894375 + 879123);
console.log( bigAdd('7894375', '879123') );

function bigRide(num1, num2) {
    if (num1 == 0 || num2 == 0) return 0;

    num1 = num1.split('');
    num2 = num2.split('');

    const l1 = num1.length;
    const l2 = num2.length;

    let n = new Array(l1 + l2).fill(0);

    for (let i = 0; i < l1; i++) {
        let a = Number(num1[l1 - i - 1]);
        for (let j = 0; j < l2; j++) {
            let b = Number(num2[l2 - j - 1]);
            const x = n[i + j] + a * b;
            n[i + j] = x % 10;
            n[i + j + 1] += Math.floor(x / 10);
        }
    }

    return n.reverse().join('').replace(/^0*/g, '');
}

console.log(7894375 * 879123);
console.log( bigRide('7894375', '879123') );

```