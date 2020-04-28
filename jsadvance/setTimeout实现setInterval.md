

### setTimeout实现setInterval

```javascript

function mySetInterval(fn, delay) {

    const temp = () => {
        setTimeout(temp, delay);
        fn();
    }

    setTimeout(temp, delay);

}

mySetInterval(() => {
    console.log(111);
}, 1000);

```