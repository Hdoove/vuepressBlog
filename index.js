
const PENDING = 'pending';
const RESOLVE = 'resolve';
const REJECT = 'reject';
class myPromise {
    constructor(exec) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolveCallback = [];
        this.onRejectCallback = [];

        let resolve = val => {
            if (this.status === PENDING) {
                this.status = RESOLVE;
                this.value = val;
                this.onResolveCallback.forEach(fn => fn());
            }
        }

        let reject = error => {
            if (this.status === PENDING) {
                this.status = REJECT;
                this.reason = error;
                this.onRejectCallback.forEach(fn => fn());
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
        onReject = typeof onReject === 'function' ? onReject : error => { throw error };

        let promise2 = new myPromise((resolve, reject) => {
            if (this.status === RESOLVE) {
                this.onResolveCallback.push(() => {
                    let x = onResolve(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                });
            }

            if (this.status === REJECT) {
                this.onRejectCallback.push(() => {
                    let x = onReject(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                });
            }

            if (this.status === PENDING) {
                this.onResolveCallback.push(() => {
                    let x = onResolve(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                });
                this.onRejectCallback.push(() => {
                    let x = onReject(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                });
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
                        this.resolvePromise(promise2, y, resolve, reject);
                    }, e => {
                        if (callee) return;
                        callee = true;
                        reject(e);
                    })
                } else {
                    resolve(x);
                }
            } catch (error) {
                if (callee) return;
                callee = true;
                reject(error);
            }
        } else {
            resolve(x)
        }
    }
}