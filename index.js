var arr = [1,[2,[3]]];

function flat(arr) {
    return arr.reduce((a,b) => {
        Array.isArray(b) ? a.push(...flat(b)) : a.push(b);
        return a;
    }, []);
}

console.log(flat(arr))

Promise.all = function(promises) {
    return new Promise((resolve,rej) => {
        let result = [];
        let index = 0;

        for(let i=0; i<promises.length; i++) {
            promises[i].then(res => {
                result[i] = res;
                index += 1;
                if(index === promises.length) {
                    resolve(result);
                }
            })
        }
    })
}