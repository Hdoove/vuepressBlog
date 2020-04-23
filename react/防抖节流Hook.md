### 自定义 防抖节流 Hook

```javascript

import { useRef, useEffect, useState } from 'react';

const useDebounce = (fn, ms = 1000, deps = []) => {
    let timeout = useRef();

    useEffect(() => {
        if (timeout.current) clearTimeout(timeout.current);

        timeout.current = setTimeout(() => {
            fn();
        }, ms);
    }, deps);

    const cancel = () => {
        clearTimeout(timeout.current);
        timeout = null;
    }

    return [cancel];
}

const useThrottle = (fn, ms = 1000, deps = []) => {
    let pre = useRef(0);

    let [time, setTime] = useState(ms);

    useEffect(() => {
        let now = Date.now();
        if (now - pre.current > time) {
            fn();
            pre.current = now;
        }
    }, deps);

    const cancel = () => {
        setTime(0);
    }

    return [cancel];

}

export {
    useDebounce,
    useThrottle
};


```