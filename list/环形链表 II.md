### 环形链表 II

[题目地址](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

```javascript

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var detectCycle = function(head) {
    while(head && head.next) {
        if(head.flag) {
            return head;
        }else {
            head.flag = 1;
            head = head.next;
        }
    }

    return null;
};

```