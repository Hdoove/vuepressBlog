
function promise(url) {
    let obj = {};

    return new Promise((resolve, reject) => {
        if(obj[url]) {
            resolve(obj[url]);
        }else {
            setTimeout(() => {
                obj[url] = url + 'lj';
                resolve(url + 'lj');
            }, 2000)
        }
    });
}

promise('1').then(res => {
    console.log(res);
})

promise('1').then(res => {
    console.log(res);
})