### K个一组翻转链表

```javascript
var reverseKGroup = function(head, k) {
    let p = head;
    let pre = null;
    let curr = head;
    for(let i=0; i<k; i++) {
        if(p === null) return head;
        p = p.next;
    }

    for(let i=0; i<k; i++) {
        let next = curr.next;
        curr.next = pre;
        pre = curr;
        curr = next;
    }

    head.next = reverseKGroup(curr, k);

    return pre;
};
```