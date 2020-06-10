### 关于this指向

```javascript

var num = 0;

const obj = {
    num: 1,
    a: function() {
      setTimeout(() => {
        console.log(this.num);
      }, 0)
    },
    b: function(){
      setTimeout(function() {
        console.log(this.num);
      }, 0)
    }
}

obj.a(); // 1
obj.b(); // 0

```