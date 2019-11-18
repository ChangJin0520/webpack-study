const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Happypack = require('happypack')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 3000,
        open: true
    },
    optimization: { // 原来的配置commonChunkPlugins
        splitChunks: { // 分割代码块
            cacheGroup: { // 缓存组
                common: { // 公共的模块
                    chunks: 'initial',
                    minSize: 0, // 超过多少开始抽离
                    minChunks: 2, // 引用多少次开始抽离
                },
                vendor: { // 抽离第三方模块
                    priority: 1, // 默认抽离是有先后顺序的 这里配置权重 决定先抽离谁
                    test: /node_modules/, // 把你抽离出来
                    chunks: 'initial',
                    minSize: 0, // 超过多少开始抽离
                    minChunks: 2, // 引用多少次开始抽离
                }
            }
        }
    },
    module: {
        noParse: /jquery/, // 不去解析jquery中的依赖库
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            include: path.resolve('src'),
            use: 'Happypack/loader?id=js'
            // use: {
            //     loader: 'babel-loader',
            //     options: {
            //         presets: [
            //             '@babel/preset-env',
            //             '@babel/preset-react'
            //         ]
            //     }
            // }
        }, {
            test: /\.css$/,
            use: 'Happypack/loader?id=css'
            // use: ['style-loader', 'css-loader']
        }]
    },
    plugins: [
        new Happypack({
            id: 'js',
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ],
                    plugins: [
                        '@babel/plugin-syntax-dynamuc-import'
                    ]
                }
            }]
        }),
        new Happypack({
            id: 'css',
            use: ['style-loader', 'css-loader']
        }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist', 'manifest.json') // 动态链接库的索引文件
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new webpack.IgnorePlugin(
            /\.\/local/, /moment/
        )
    ]
}
