### tapable

webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是Tapable。

Webpack 的 Tapable 事件流机制保证了插件的有序性，将各个插件串联起来， Webpack 在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条webapck机制中，去改变webapck的运作，使得整个系统扩展性良好。

Tapable也是一个小型的 library，是Webpack的一个核心工具。类似于node中的events库，核心原理就是一个订阅发布模式。作用是提供类似的插件接口。

webpack中最核心的负责编译的Compiler和负责创建bundles的Compilation都是Tapable的实例，可以直接在 Compiler 和 Compilation 对象上广播和监听事件

### Compiler

Compiler 对象包含了当前运行Webpack的配置，包括entry、output、loaders等配置，这个对象在启动Webpack时被实例化，而且是全局唯一的。Plugin可以通过该对象获取到Webpack的配置信息进行处理。

### Compilation

Compilation对象代表了一次资源版本构建。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 Compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息，简单来讲就是把本次打包编译的内容存到内存里。