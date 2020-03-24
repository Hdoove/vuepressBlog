### react与vue之间的区别

相同点:

- 基于虚拟DOM
- 基于组件

不同点:

- react是单向数据流，vue是双向数据流
- react的思路是all in js，通过js来生成html，所以设计了jsx，还有通过js来操作css，社区的styled-component、jss等
- vue是把html，css，js组合到一起，用各自的处理方式，vue有单文件组件，可以把html、css、js写到一个文件中，html提供了模板引擎来处理。
- react做的事情很少，很多都交给社区去做，vue很多东西都是内置的，写起来确实方便一些