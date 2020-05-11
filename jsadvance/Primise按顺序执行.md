### Primise按顺序执行

```javascript

const a = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('a');
    }, 3000);
});

const b = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('b');
    }, 2000);
});

const arr = [a, b];

arr.reduce((a, b) => {
    return a.then(() => {
        return b.then(res => {
            console.log(res);
        });
    })
}, Promise.resolve());

```