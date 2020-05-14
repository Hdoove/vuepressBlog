### flex求宽度题目

### 题目一

```html

<div class="container">
    <div class="left"></div>
    <div class="right"></div>
</div>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .container {
    width: 600px;
    height: 300px;
    display: flex;
  }
  .left {
    flex: 1 2 300px;
    background: red;
  }
  .right {
    flex: 2 1 200px;
    background: blue;
  }
</style>

```

#### 题解

我们看到200 + 300 < 600, 剩余100没有被填满，根据 flex-grow比例 1:2, 将100等分三份，所以结果

- left 333.33
- right 266.66

### 题目二

```html

<div class="container">
    <div class="left"></div>
    <div class="right"></div>
</div>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .container {
    width: 600px;
    height: 300px;
    display: flex;
  }
  .left {
    flex: 1 2 500px;
    background: red;
  }
  .right {
    flex: 2 1 400px;
    background: blue;
  }
</style>

```

500 + 400 > 600, 所及将会缩小， 溢出300，总权重 2*500 + 1*400 = 1400；
分别收缩 300 * (10/14) 以及 300 * (4/14)

- left 500 - 300 * (10/14)
- right 400 - 300 * (4/14)