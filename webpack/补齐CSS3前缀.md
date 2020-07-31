### 补齐CSS3前缀

```javascript

module: {
    rules: [
        {
            test: /.css$/,
            use: [
                MiniCssExtractPlugin.loader, // 和 style-loader 冲突
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            require('autoprefixer')({ // 自动管理浏览器前缀的插件
                                browsers: ['last 2 version', '>1%', 'ios7']
                            })
                        ]
                    }
                }
            ]
        }
    ]
}

```


### 转化 px rem

```javascript

{
    loader: 'px2rem-loader',
    options: {
        remUnit: 75,
        remPrecision: 8
    }
}

<script>
    // 静态资源内联  获取屏幕宽度

    // !!!! 这里注意 raw-loader 用v0.5.1版本,不然会报 [object module] 的问题
    ${ require('raw-loader!babel-loader!../node_modules/lib-flexible/flexible.js') }
</script>

```