### 剑指 Offer 11. 旋转数组的最小数字

[题目地址](https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/)

```javascript

/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function(numbers) {
    for(let i=0; i<numbers.length - 1; i++) {
        if(numbers[i] > numbers[i+1]) {
            return numbers[i+1];
        }
    }

    return numbers[0];
};

```