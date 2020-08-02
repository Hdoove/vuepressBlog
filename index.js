/**
 * @param {number[]} target
 * @param {number[]} arr
 * @return {boolean}
 */
var canBeEqual = function(target, arr) {
    target = target.sort((a,b) => a -b).toString();
    arr = arr.sort((a,b) => a -b).toString();

    return target === arr;
};

console.log(canBeEqual([3,7,9], [3,7,11]));
