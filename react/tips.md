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


### 面向对象和面向过程

面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候一个一个依次调用就可以了。

面向对象是把构成问题事务分解成各个对象，建立对象的目的不是为了完成一个步骤，而是为了描叙某个事物在整个解决问题的步骤中的行为。

例如五子棋，面向过程的设计思路就是首先分析问题的步骤：1、开始游戏，2、黑子先走，3、绘制画面，4、判断输赢，5、轮到白子，6、绘制画面，7、判断输赢，8、返回步骤2，9、输出最后结果。把上面每个步骤用分别的函数来实现，问题就解决了。 而面向对象的设计则是从另外的思路来解决问题。整个五子棋可以分为：1、黑白双方，这两方的行为是一模一样的，2、棋盘系统，负责绘制画面，3、规则系统，负责判定诸如犯规、输赢等。第一类对象（玩家对象）负责接受用户输入，并告知第二类对象（棋盘对象）棋子布局的变化，棋盘对象接收到了棋子的变化就要负责在屏幕上面显示出这种变化，同时利用第三类对象（规则系统）来对棋局进行判定。