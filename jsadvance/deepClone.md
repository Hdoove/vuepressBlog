### 深克隆

```javascript
function deepClone(obj, map = new WeakMap()) {

    if (typeof obj === 'object' && typeof obj !== null) {

        if (obj instanceof RegExp) return new RegExp(obj);
        if (obj instanceof Date) return new Date(obj);

        let clone;

        if (Object.prototype.toString.call(obj) === '[object Set]') {
            clone = initTarget(obj);
            obj.forEach(item => {
                return clone.add(deepClone(item));
            });
            return clone;
        } else if (Object.prototype.toString.call(obj) === '[object Map]') {
            clone = initTarget(obj);
            obj.forEach((v, k) => {
                return clone.set(k, deepClone(v));
            });
            return clone;
        }


        const res = Array.isArray(obj) ? [] : {};

        if (map.get(obj)) {
            return map.get(obj);
        }

        map.set(obj, res);

        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                res[key] = deepClone(obj[key], map);
            } else if (typeof obj[key] === 'function') {
                res[key] = cloneFunction(obj[key]);
            } else {
                res[key] = obj[key];
            }
        }

        return res;

    } else {
        return obj;
    }
}

function cloneFunction(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    if (func.prototype) {
        const param = paramReg.exec(funcString);
        const body = bodyReg.exec(funcString);
        if (body) {
            console.log('匹配到函数体：', body[0]);
            if (param) {
                const paramArr = param[0].split(',');
                console.log('匹配到参数：', paramArr);
                return new Function(...paramArr, body[0]);
            } else {
                return new Function(body[0]);
            }
        } else {
            return null;
        }
    } else {
        return eval(funcString);
    }
}

function initTarget(target) {
    const Cor = target.constructor;
    return new Cor();
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
