/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function (numbers) {
    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] > numbers[i + 1]) {
            return numbers[i + 1];
        }
    }

    return numbers[0];
};

console.log(minArray([2, 2, 2, 0, 1]));