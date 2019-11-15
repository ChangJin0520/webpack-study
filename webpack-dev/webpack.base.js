// webpack 是node写的 node的写法
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    // mode: 'development', // 模式 默认两种 production development
    entry: './src/index.js', // 入口
    output: {
        filename: 'bundle.js', // 打包后的文件名
        path: path.resolve(__dirname, 'build') // 路径必须是一个绝对路径
        // publicPath: 'http://www.baidu.com'
    },
    devServer: { // 开发服务配置
        port: 8080,
        progress: true,
        contentBase: './build',
        compress: true
    },

    optimization: { // 优化项
        minimizer: [
            new UglifyJsPlugin({
                parallel: true, // 并发打包
                sourceMap: true, // 源码映射
                cache: true
            })
        ]
    },

    // 插件都是类
    plugins: [ // 数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true, // 删除双引号
                collapseWhitespace: true // 折叠空行
            },
            hash: true // 哈希戳
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    }
                }]
            },
            canPrint: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new webpack.DefinePlugin({ // 定义变量
            DEV: JSON.stringify('development'),
            FLAG: 'true'
        })
    ],
    module: { // 模块
        rules: [ // 规则
            // css-loader 解析 @import这种语法
            // style-loader 把css插入到head的标签中
            // loader的特点 希望功能单一
            // loader的用法 字符串只用一个loader
            // 多个loader需要 []
            // loader的顺序 默认从右向左执行 从下到上执行
            // loader还可以写成对象方式
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        outputPath: '/img/',
                        publicPath: 'http://www.baidu.com'
                    }
                }
            },

            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },

            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },

            // 处理less sass stylus node-sass sass-loader stylus stylus-loader
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },

            // babel
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: { // 用babel把es6 -> es
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { // 装饰器语法
                                'legacy': true
                            }],
                            ['@babel/plugin-proposal-class-properties', { // ES7中的class 语法
                                'loose': true
                            }],
                            '@babel/plugin-transform-runtime' // 一个运行时 不然* gen这种不能用
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'), // js匹配包括src下的
                exclude: /node_modules/ // js匹配排除node_modules下的
            },

            {
                test: require.resolve('jquery'),
                use: 'expose-loader?$!jquery'
            }

            // eslint
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'eslint-loader',
            //         options: {
            //             enforce: 'pre' // previous 强制  post 之后
            //         }
            //     }
            // }
        ]
    },
    // resolve: { // 解析 第三方包 common
    //     modules: [path.resolve('node_modules')],
    //     extensions: ['.js', '.css', '.json'], // 扩展名  省略扩展名会自动寻找
    //     mainFields: ['style', 'main'], // 设置主入口寻找顺序
    //     mainFiles: [], // 入口文件的名字 默认index.js
    //     alias: { // 别名
    //         bootstrap: 'bootstrap/dist/css/bootstrap.css'
    //     }
    // },
    externals: { // 忽略 不打包
        jquery: '$'
    }
};
