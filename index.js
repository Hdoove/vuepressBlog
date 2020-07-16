
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    nums = nums.sort((a,b) => a-b);
    let maxLen = 1;
    let res = 1;

    for(let i=0; i<nums.length - 1; i++) {
        if(nums[i] + 1 === nums[i+1]) {
            maxLen += 1;
            if(i === nums.length-2) {
                res = Math.max(res, maxLen);
            }
        }else {
            res = Math.max(res, maxLen);
            maxLen = 1;
            console.log(nums.length - i);
            if(nums.length - i - 1 <= res){
                break;
            }
        }
    }

    console.log(res);
};

longestConsecutive([1,2,3,4, 6,7,8, 10, 11, 13,14,15,16,17,18,19]);