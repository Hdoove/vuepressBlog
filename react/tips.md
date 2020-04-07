### tips

### $$typeof作用

这个是在 React ReactElement方法里使用的，它的值是一个Symbol类型，主要是用来防止XSS攻击，避免用户手动构建 React Element对象传入元素中，使用Symbol是因为JSON中无法传递Symbol类型。

### concurrentModal

这个API可以让我们在开发中去排列组件渲染的优先级，使组件渲染过程变得可控。

```javascript

import React, { ConcurrentMode } from'react'；

import { flushSync } from'react-dom'；

```

使用 ConcurrentMode 组件包裹的子组件的渲染过程的优先级会被降低，react 会先渲染优先级高的，然后将js线程空闲出来先干其他的事，如动画的渲染，完了之后再渲染优先级低的，当我们想提高子组件渲染的优先级的时候，可以使用flushSync方法来包裹需要进行的操作。

### Suspende 和 Lazy

通过 React.lazy 来进行懒加载。

```javascript

const Comp = React.lazy(() => import('../component/Comp'));

```

需要注意 Lazy 需要配合 Suspende 一起使用

```javascript

<Suspense fallback={<div>loading</div>}>
    <Comp />
</Suspense>

```

通过使用Suspense对Lazy组件进行包裹，然后再fallback里面给出加载过程中处理的方式，也就是加载中的行为