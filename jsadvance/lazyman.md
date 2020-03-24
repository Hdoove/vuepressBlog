### lazyman

```javascript
class _Lazyman {
    constructor(name) {
        this.name = name;
        this.taskList = [];

        console.log(`my name is ${name}`)

        setTimeout(() => {
            this.next();
        }, 0);
    }

    next() {
        const fn = this.taskList.shift();
        fn && fn();
    }

    sleep(time) {
        const that = this;

        const fn = (function (t) {
            return function () {
                setTimeout(() => {
                    console.log(`睡了${t}秒`);
                    that.next();
                }, t * 1000);
            }
        })(time);

        this.taskList.push(fn);
        return this;
    }


    sleepFirst(time) {
        const that = this;

        const fn = (function (t) {
            return function () {
                setTimeout(() => {
                    console.log(`睡了${t}秒`);
                    that.next();
                }, t * 1000);
            }
        })(time);

        this.taskList.unshift(fn);
        return this;
    }

    eat(food) {
        const that = this;
        const fn = (function (name) {
            return function () {
                console.log(`吃了${name}`);
                that.next();
            }
        })(food);

        this.taskList.push(fn);
        return this;
    }

}
function LazyMan(name){
    return new _Lazyman(name);
}

LazyMan('hdove').eat('肯德基').sleep(1).eat('麦当劳');
```
