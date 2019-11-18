const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Happypack = require('happypack')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devServer: {
        port: 3000,
        open: true
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
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
