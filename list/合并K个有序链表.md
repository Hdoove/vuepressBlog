### 合并K个有序链表

```javascript
var mergeKLists = function(lists) {
    let res = [];

    lists.map(item => {
        while(item) {
            res.push(new ListNode(item.val));
            item = item.next;
        }
    });
    
    res.sort( (a,b) => { return a.val - b.val } );

    if(!res.length) return null;

    for(let i=0;i<res.length-1; i++) {
        res[i].next = res[i+1];
    }

    return res[0];
};
```