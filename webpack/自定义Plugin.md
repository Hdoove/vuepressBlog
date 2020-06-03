### 自定义Plugin

### 一个简单的Plugin

```javascript

class MyPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.done.tap('One', () => {
            console.log('我的都一个webpack插件');
        })
    }
}

```

### 几个概念

#### Tapable

  简单来说 Tapable 就是webpack用来创建钩子的库，为webpack提供了插件接口的支柱。

#### 三个方法

- tap： 用来注册同步钩子或者异步钩子
- tapAsync： 回调方式注册异步钩子
- tapPromise： Promise方式注册异步钩子

#### Compiler钩子

是一个对象，该对象代表了完整的webpack环境配置。整个webpack在构建的时候，会先初始化参数也就是从配置文件(webpack.config.js)和Shell语句("build": "webpack --mode development")中去读取与合并参数，之后开始编译，也就是将最终得到的参数初始化这个Compiler对象，然后再会加载所有配置的插件，执行该对象的run()方法开始执行编译。因此我们可以理解为它是webpack的支柱引擎。

代表了整个构建过程。

#### Compilation

也是一个对象，不过它代表的是某一个模块的资源、编译生成的资源、变化的文件等等。

代表构建过程中的某一个模块。

#### compile

一个新的编译创建之后，钩入compiler

#### compilation

编译创建之后，指向插件。

### FileList Plugin

```javascript

class FileList {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('FileList', (compilation, cb) => {
            const fileListName = this.options.filename;
            let len = Object.keys(compilation.assets).length;
            let content = `# 一共有${len}个文件\n\n`;
            for (let filename in compilation.assets) {
                content += `- ${filename}\n`
            }
            compilation.assets[fileListName] = {
                source: function () {
                    return content;
                },
                size: function () {
                    return content.length;
                }
            }
            cb();
        })
    }
}

```