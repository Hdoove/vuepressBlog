/**
 * @param {number[]} nums
 * @return {number}
 */
var findMagicIndex = function (nums) {
    for (let i = 0, len = nums.length; i < len; i++) {
        if (nums[i] === i) {
            return i;
        }
    }
};

console.log(
    findMagicIndex([1,1,1])
)