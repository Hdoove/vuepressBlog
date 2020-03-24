### 订阅发布

```javascript
class EventListener {
    constructor() {
        this.event = this.event || new Map();
    }

    on(type, fn) {
        let handler = this.event.get(type);

        if (!handler) {
            this.event.set(type, fn);
        } else if (handler && typeof handler === 'function') {
            this.event.set(type, [handler, fn]);
        } else {
            handler.push(fn);
        }
    }

    emit(type, args) {
        let handler = this.event.get(type);

        if (Array.isArray(handler)) {
            for (let i = 0, len = handler.length; i < len; i++) {
                if (args.length > 0) {
                    handler[i].apply(this, args);
                } else {
                    handler[i].call(this);
                }
            }
        } else {
            if (args.length > 0) {
                handler.apply(this, args);
            } else {
                handler.call(this);
            }
        }
    }

    remove(type, fn) {
        let handler = this.event.get(type);

        if (handler && typeof handler === 'function') {
            this.event.delete(type, fn);
        } else if (Array.isArray(handler)) {
            let position = -1;

            for (let i = 0, len = handler.length; i < len; i++) {
                if (handler[i] === fn) {
                    position = i;
                    return
                }
            }

            if (position !== -1) {
                handler.splice(position, 1);

                if (handler.length === 1) {
                    this.event.set(type, handler[0]);
                }
            } else {
                return this;
            }
        }
    }
}
```