### 1.useEffect 和 useLayoutEffect

#### 问题出现背景

在useEffect里面修改样式，有时候会出现闪屏的问题。

#### 解决方法

改用为useLayoutEffect，这个是用在处理DOM的时候,当你的useEffect里面的操作需要处理DOM,并且会改变页面的样式,就需要用这个,否则可能会出现出现闪屏问题, useLayoutEffect里面的callback函数会在DOM更新完成后立即执行,但是会在浏览器进行任何绘制之前运行完成,阻塞了浏览器的绘制.


### 2.使用webpack进行打包的时候，找不到指定路径

#### 解决办法

忘记在配置里加入 下面这段代码  尴尬。

```javascript

resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
}

```

### 3.封装Antd组件库到NPM之后，发现样式没了

#### 解决办法

在打包的时候要将Antd自己的样式也要打包进去
