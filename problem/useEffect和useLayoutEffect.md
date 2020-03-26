### useEffect 和 useLayoutEffect

### 问题出现背景

在useEffect里面修改样式，有时候会出现闪屏的问题。

### 解决方法

改用为useLayoutEffect，这个是用在处理DOM的时候,当你的useEffect里面的操作需要处理DOM,并且会改变页面的样式,就需要用这个,否则可能会出现出现闪屏问题, useLayoutEffect里面的callback函数会在DOM更新完成后立即执行,但是会在浏览器进行任何绘制之前运行完成,阻塞了浏览器的绘制.