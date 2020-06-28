### 虚拟列表DEMO

```javascript

import React, { useRef, useEffect, useState } from 'react';
import './index1.less';

const count = 100;

const List1 = () => {

    const itemHeight = 124;
    const [sourceList, setSourceList] = useState([]);
    const [viewList, setViewList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [finish, setFinish] = useState(false);
    const [size, setSize] = useState(0);

    const ref = useRef();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const arrs = Array.from({ length: 20 }, (v, i) => i + 1);
            setViewList(arrs);
            setSourceList(arrs);
            setLoading(false);
            setSize(20);
        }, 1000);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return function () {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [sourceList, loading, viewList, size]);

    function handleScroll() {
        //判断触底
        if (document.documentElement.offsetHeight - 1000 - document.documentElement.scrollTop === 0 && !loading && sourceList.length < count) {
            setLoading(true);
            setTimeout(() => {
                const arrs = Array.from({ length: 10 }, (v, i) => sourceList.length + i + 1);
                setSourceList([...sourceList, ...arrs]);
                setViewList(viewList.splice(10, 10).concat(arrs.splice(0, 10)));
                setLoading(false);
            }, 1000);
            setSize(size + 10);
        }

        //向下
        if (document.documentElement.scrollTop >= (size + 10) * itemHeight + 248 && size + 20 < sourceList.length) {
            const [item] = viewList;
            const copy = JSON.parse(JSON.stringify(sourceList));
            // 临界值判断
            if (item > 0) {
                // console.log(1);
                setViewList(viewList.splice(10, 10).concat(copy.splice(item + 19, 10)));
            }
            setSize(size + 10);
        }

        //向上
        if (document.documentElement.scrollTop <= size * itemHeight) {
            const [item] = viewList;
            const copy = JSON.parse(JSON.stringify(sourceList));
            // 临界值判断
            if (item > 1) {
                setViewList(copy.splice(item - 11, 10).concat(viewList.splice(0, 10)));
            }
            size > 0 && setSize(size - 10);
        }
    }


    return (
        <div id="listHome" ref={ref}>
            <div className="lists" style={{ transform: `translate3d(0px, ${(viewList[0] - 1) * 124}px, 0px)`, width: '100vw' }}>
                {
                    viewList.map((item, index) => {
                        return <div className="itemList" key={index}>{item}</div>
                    })
                }
            </div>
            <div className="loading" style={{ paddingTop: `${sourceList.length * 124}px` }}>
                <span>{loading ? 'Loading...' : ''}</span>
            </div>
        </div>
    )
}

export default List1;

```