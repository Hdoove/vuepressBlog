
let str = '1234';

str = str.split('');

let len = str.length;

for(let i=0; i<Math.floor(len/2); i++) {
 let temp = str[i];
 str[i] = str[len - i];
 str[len - 1] = temp;
}

console.log(str)