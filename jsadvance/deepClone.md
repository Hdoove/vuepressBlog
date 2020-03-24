### 深克隆

```javascript
function deepClone(obj, map=new WeakMap()) {

    if( typeof obj === 'object' && typeof obj !== null ) {

        if(obj instanceof RegExp) return new RegExp(obj);
        if(obj instanceof Date) return new Date(obj);

        const res = Array.isArray(obj) ? [] : {};

        if(map.get(obj)) {
            return map.get(obj);
        }

        map.set(obj, res);

        for(const key in obj) {
            if(typeof obj[key] === 'object') {
                res[key] = deepClone(obj[key], map);
            }else {
                res[key] = obj[key];
            }
        }

        return res;

    }else {
        return obj;
    }
}

const obj1 = {
    a: 1,
    b: [1,23],
    c: {
        aa: 1,
        bb: [1,2,3]
    },
    d: new Date(),
    e: new RegExp(/[1,9]/)
}

obj1.f = obj1;

const obj2 = deepClone(obj1);

console.log(obj2);

```
