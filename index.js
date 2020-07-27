
const arr = [1,2,3,4,5,6,7];


Object.defineProperties(arr,  {
    get(a,b) {
        console.log(a,b)
    }
})

arr[0]