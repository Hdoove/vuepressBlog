### babel

### 一、@babel/core

Babel 的核心功能包含在 @babel/core 模块中。看到 core 这个词了吧，意味着核心，没有它，在 babel 的世界里注定寸步难行。不安装 @babel/core，无法使用 babel 进行编译。

### 二、@babel/cli

babel 提供的命令行工具，主要是提供 babel 这个命令，适合安装在项目里。

@babel/node 提供了 babel-node 命令，但是 @babel/node 更适合全局安装，不适合安装在项目里。

### 三、插件

Babel 构建在插件之上，使用现有的或者自己编写的插件可以组成一个转换通道，Babel 的插件分为两种: 语法插件和转换插件。

#### 1.语法插件

这些插件只允许 Babel 解析（parse） 特定类型的语法（不是转换），可以在 AST 转换时使用，以支持解析新语法。

#### 2.转换插件

转换插件会启用相应的语法插件。

### 四、预设

如果想将其它的新的JS特性转换成低版本，需要使用其它对应的 plugin 。如果我们一个个配置的话，会非常繁琐，因为你可能需要配置几十个插件，这显然非常不便，那么有没有什么办法可以简化这个配置呢？

通过使用或创建一个 preset 即可轻松使用一组插件。

#### 官方提供

- @babel/preset-env
- @babel/preset-flow
- @babel/preset-react
- @babel/preset-typescript

### 五、@babel/plugin-transform-runtime

@babel/plugin-transform-runtime 是一个可以重复使用 Babel 注入的帮助程序，以节省代码大小的插件。

另外，@babel/plugin-transform-runtime 需要和 @babel/runtime 配合使用。

### 六、执行顺序

- 插件在 Presets 前运行。
- 插件顺序从前往后排列。
- Preset 顺序是颠倒的（从后往前）。