### 手写promise

```javascript
class myPromise {
    constructor(exec) {
        this.value = '';
        this.reason = '';
        this.status = 'pending';
        this.resolveCallback = [];
        this.rejectCallback = [];

        let resolve = value => {
            if (this.status === 'pending') {
                this.status = 'resolve';
                this.value = value;
                this.resolveCallback.map(item => {
                    item();
                })
            }
        }

        let reject = error => {
            if (this.status === 'pending') {
                this.status = 'reject';
                this.reason = error;
                this.rejectCallback.map(item => {
                    item();
                })
            }
        }

        try {
            exec(resolve, reject)
        } catch (err) {
            reject(err);
        }
    }

    then(onResolve, onReject) {
        onResolve = typeof onResolve === 'function' ? onResolve : val => val;
        onReject = typeof onReject === 'function' ? onReject : err => { throw err };

        let promise2 = new myPromise((resolve, reject) => {
            if (this.status === 'pending') {
                this.onResolveCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onResolve(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (err) {
                            reject(err)
                        }
                    }, 0);
                });

                this.onRejectCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onReject(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (err) {
                            reject(err)
                        }
                    }, 0);
                });
            }

            if (this.status === 'resolve') {
                setTimeout(() => {
                    try {
                        let x = onResolve(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        reject(err)
                    }
                }, 0);
            }

            if (this.status === 'reject') {
                setTimeout(() => {
                    try {
                        let x = onReject(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        reject(err)
                    }
                }, 0);
            }
        });

        return promise2;
    }
}

function resolvePromise(promise, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('XXX'));
    }

    let called;

    if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, err => {
                    if (called) return;
                    called = true;
                    reject(err);
                });
            } else {
                resolve(x);
            }
        } catch (err) {
            if (called) return;
            called = true;
            reject(err);
        }
    } else {
        resolve(x);
    }


}

Promise.all = function (promises) {
    let result = [];
    let index = 0;

    return new Promise((resolve, reject) => {
        for (let i = 0, len = promises.length; i < len; i++) {
            promises[i].then(data => {
                result[i] = data;
                index += 1;

                if (index === promises.length) {
                    resolve(result);
                }
            }, err => {
                result[i] = null;
                index += 1;

                if (index === promises.length) {
                    resolve(result);
                }
            });
        }
    });
}

Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0, len = promises.length; i < len; i++) {
            promises[i].then(resolve, reject);
        }
    });
}

```