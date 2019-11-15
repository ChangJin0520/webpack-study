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
