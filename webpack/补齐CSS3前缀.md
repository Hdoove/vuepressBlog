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