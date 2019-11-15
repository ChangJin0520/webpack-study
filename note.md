## 9. 第三方模块的引入
### 引入方式
1. expose-loader 暴露到window
   import $ from 'expose-loader?$!jquery'  
   使用`expose-loader` 暴露 全局的loader  
   是一个 内联的loader  
   loader有四种: pre 前面执行的loader  normal 普通loader 内联loader 后置postloader  
   也可以配置到webpack.config中
    ```
    {
        test: require.resolve('jquery'),
        use: 'expose-loader?$!jquery'
    }
    ```
2. webpack.providePlugin 在每个模块中注入$对象  
    ```
    new webpack.ProvidePlugin({
        $: 'jquery'
    })
    ```
3. cdn路径引入然后借助externals不打包  
   当使用cdn路径之后再添加import的话会导致包被打包进bundle中  
   这个时候可以配置externals来忽略包
   ``` json
   externals: {
       jquery: '$'
   }
   ```

## 10. 图片处理
### webpack打包图片
1. 在js中创建图片引入 file-loader
   ``` js
   import logo from './logo.png' // 先导入
   let image = new Image();
   image.src= './logo.png'; // 就是一个普通的字符串
   documeng.body.appendCHild(image);
   ```
   file-loader 默认会在内部生成一张图片到build目录下 返回一个新的图片地址
2. css中background('url')
   css的loader中会自动解析这个地址解析为require
3. \<img src="./logo.jpg" alt="" />  
   html-withimg-loader 可以吧图片地址解析为需要的地址

* 可以使用url-loader把图片转化为base64
    ```
    {
        test: /\.(png|jpg|gif)$/,
        use: {
            loader: 'url-loader',
            // 大于64的会自动调用file-loader
            options: {
                limit: 64 * 1080
            }
        }
    },
    ```

## 11. 打包文件分类(不同目录)
1. img图片路径  
   url-loader中, options下添加outputPath地址  
   ```js
   {
        test: /\.(png|jpg|gif)$/,
        use: {
            loader: 'url-loader',
            options: {
                limit: 1,
                outputPath: 'img/'
            }
        }
    }
   ```
2. 样式分类
   ``` js
   new MiniCssExtractPlugin({
       filename: 'css/main.css'
   }),
   ```
3. cdn服务器上 publicPath
   ``` js
   output: {
        filename: 'bundle.js', // 打包后的文件名
        path: path.resolve(__dirname, 'build'), // 路径必须是一个绝对路径
        publicPath: 'http://www.baidu.com'
    }
   ```
4. 只给图片添加
   ```js
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
   }
   ```
## 12. 打包多页应用

## 13. soucemap

## 14. watch
```js
{
    ...
    watch: true,
    watchOptions: {
        poll: 1000, //  每秒多少次
        aggreateTimeout: 500, // 防抖 一直输入代码
        ignored: /node_modules/ // 不需要监控
    }
}
```

## 15. webpack中小插件
1. cleanWebpackPlugin
   先删dist目录再打包
   ```js
   new CleanWebpackPlugin('dist')
   ```
2. copyWebpackPlugin
   拷贝文件到打包下
   ```js
   new CopyWebpackPlugin([
       {
           from: './doc',
           to: './'
       }
   ])
   ```
3. bannerPlugin 内置
   版权声明插件
   ```js
   new webapck.BannerPlugin('Chang-Jin')
   ```
## 16. webpack 跨域问题
ajax 四部曲
new open onload send
```js
devServer: {
    // 3) 有服务端 不用代理来处理 在服务端中启动webpack 也不会有跨域
    ```js
    let webpack = require('webpack');

    let middle = rquire('webpack-dev-middleware);

    let config = require('./webpack.config.js');

    let compiler = webpack(config);

    app.use(middle(compile)); // 借助webpack编译一下 丢给中间件
    ```

    // 2) 前端自己模拟数据
    // before(app) { // devServer本身就是一个express 提供的方法 钩子
    //     app.get('/user', (req, res) => {
    //         res.json({
    //             name: 'cj'
    //         })
    //     })
    // }
    // 1) 通过重写的方式  把请求代理到express服务器上
    // proxy: {
    // '/api': 'http://localhost:3000'
    // '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: {
    //         '/api': ''
    //     } // 重写路径
    // }
    // }
}
```
