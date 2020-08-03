/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
    var dp = []
    //先排序解决顺序问题 例 （1，2）（2，1）
    candidates.sort((a, b) => a - b)
    for (let i = 0; i <= target; i++) {
        dp[i] = new Set()
    }
    dp[0].add('')
    for (let c of candidates) {
        for (let i = target; i >= c; i--) {
            for (item of dp[i - c]) {
                console.log(dp)
                dp[i].add(item + ',' + c);
            }
        }
    }
    //最后把Set 转成 Array 
    return Array.from(dp[target]).map(item => item.slice(1).split(','))


};

combinationSum2([1,2,3,4], 4);