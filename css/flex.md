### flex

### 1.容器属性

- flex-direction

```
决定主轴的方向
flex-direction: row | row-reverse | column | column-reverse;
```

- flex-wrap

```
默认不换行，定义如果一条轴线排不下，如何换行。
flex-wrap: nowrap | wrap | wrap-reverse;
```

- flex-flow

```
flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
```

- justify-content

```
定义了项目在主轴上的对齐方式。
justify-content: flex-start | flex-end | center | space-between | space-around;
```

- align-items

```
定义项目在交叉轴上如何对齐。
align-items: flex-start | flex-end | center | baseline | stretch;
```

- align-content

```
属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
align-content: flex-start | flex-end | center | space-between | space-around | stretch;
```

### 2.项目属性

- order

```
定义项目的排列顺序。数值越小，排列越靠前，默认为0。
```

- flex-grow

```
定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
```

- flex-shrink

```
定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
```

- flex-basis

```
定义了在分配多余空间之前，项目占据的主轴空间
```

- flex

```
flex属性是flex-grow, flex-shrink 和 flex-basis的简写
```

- align-self

```

```
