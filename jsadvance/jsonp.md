### Jsonp

```javascript
function jsonp(url, params, cb) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');

        window[cb] = function (data) {
            resolve(data);
            document.body.removeChild(script);
        }

        params = {
            ...params,
            cb
        }

        let arr = [];

        for (let key in params) {
            arr.push(`${key}=${params[key]}`);
        }

        script.url = `${url}?${arr.join('&')}`

        document.body.appendChild(script);
    });
}
```