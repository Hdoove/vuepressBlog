class myPromise {
    constructor(exec) {
        this.status = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.resolveCallback = [];
        this.rejectCallback = [];

        let resolve = val => {
            if (this.status === 'pending') {
                this.status = 'resolve';
                this.value = val;
                this.resolveCallback.forEach(fn => fn());
            }
        }

        let reject = error => {
            if (this.status === 'pending') {
                this.status = 'reject';
                this.reason = error;
                this.rejectCallback.forEach(fn => fn());
            }
        }

        try {
            exec(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onResolve, onReject) {
        onResolve = typeof onResolve === 'function' ? onResolve : val => val;
        onReject = typeof onReject === 'function' ? onReject : error => { throw error('') };

        let promise2 = new myPromise((resolve, reject) => {
            if (this.status === 'resolve') {
                this.resolveCallback.push(() => {
                    let x = onResolve(this.value);
                    this.resolvePromise(promise2, x, resolve, reject);
                });
            }
            if (this.status === 'reject') {
                this.rejectCallback.push(() => {
                    let x = onReject(this.reason);
                    this.resolvePromise(promise2, x, resolve, reject);
                });
            }
            if (this.status === 'pending') {
                this.resolveCallback.push(() => {
                    let x = onResolve(this.value);
                    this.resolvePromise(promise2, x, resolve, reject);
                });
                this.rejectCallback.push(() => {
                    let x = onReject(this.reason);
                    this.resolvePromise(promise2, x, resolve, reject);
                })
            }
        });

        return promise2;
    }

    resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) {
            return reject();
        }

        let callee;

        if (x && (typeof x === 'function' || typeof x === 'object')) {
            try {
                let then = x.then;

                if (typeof then === 'function') {
                    then.call(x, y => {
                        if (callee) return;
                        callee = true;
                        this.resolvePromise(promise2, y, resolve, reject);
                    }, err => {
                        if (callee) return;
                        callee = true;
                        reject(err)
                    })
                } else {
                    resolve(x);
                }

            } catch (error) {
                if (callee) return;
                callee = true;
                reject(error)
            }
        } else {
            resolve(x);
        }
    }
}

myPromise.all = function (promises) {

    return new myPromise((resolve, reject) => {
        let res = [];
        let index = 0;
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(val => {
                res[i] = val;
                index += 1;
                if (index === promises.length) {
                    resolve(res);
                }
            })
        }
    })
}

myPromise.race = function (promises) {

    return new myPromise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(val => {
                resolve(val);
            })
        }
    })
}
