
var integerBreak = function (n) {
    let dep = [];
    dep[2] = 1;
    dep[3] = 2;
    dep[4] = 4;
    dep[5] = 6;
    dep[6] = 9;
    dep[7] = 12;

    for (let i = 7; i <= n; i++) {
        dep[i] = dep[i - 3] * 3;
    }

    return dep[n];
};

console.log(integerBreak(10));