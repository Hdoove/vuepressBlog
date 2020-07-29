
const arr = [1,2,3,4,5,6,7];

function twoSum(arr, target) {
    let map=new Map();

    for(let i=0; i<arr.length; i++) {
        if( map.get(target - arr[i])) {
            return [i,map.get(target - arr[i]) ]
        }else {
            map.set(arr[i], i);
        }
    }

    return -1;
}

console.log( twoSum(arr, 8) );