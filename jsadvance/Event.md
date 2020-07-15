### 订阅发布

```javascript
class EventListener {
    constructor(event) {
        this.event = event || new Map();
    }

    on(type, fn) {
        let handle = this.event.get(type);

        if(!handle) {
            this.event.set(type, fn);
        }else if(handle && typeof handle === 'function') {
            this.event.set(type, [handle, fn]);
        }else {
            handle.push(fn);
        }
    }

    emit(type, ...arges) {
        let handle = this.event.get(type);

        if(Array.isArray(handle)) {
            for(let i=0; i<handle.length; i++) {
                if(arges.length > 0) {
                    handle[i].apply(this, arges);
                }else {
                    handle[i].call(this);
                }
            }
        }else if(handle) {
            if(arges.length > 0) {
                handle.apply(this, arges);
            }else {
                handle.call(this);
            }
        }
    }

    remove(type, fn) {
        let handle = this.event.get(type);

        if(handle && typeof handle === 'function') {
            this.event.delete(type, fn);
        }else if(Array.isArray(handle)){
            let position = -1;
            for(let i=0; i<handle.length; i++) {
                if(handle[i] === fn) {
                    position = i;
                    break;
                }
            }
            if(position !== -1) {
                handle.splice(position, 1);
                if(handle.length === 1){
                    this.event.set(type, handle[0]);
                }
            }else {
                return this;
            }
        }
    }

    once(type, fn) {
        let newFn = function() {
            fn.apply(this, [...arguments]);
            this.remove(type, newFn);
        }

        this.on(type, newFn);
    }
}

let map = new EventListener();

let fn1 = (...args) => {
    console.log(args, 'args1');
}

let fn2 = (...args) => {
    console.log(args, 'args2');
}

map.on('click', fn1);
map.on('click', fn2);

// map.remove('click', fn1);

map.emit('click', 1,2,3,4);

```