### Object.create

```javascript

function create(obj) {
    function C(){}
    C.prototype = obj;
    return new C();
}

```