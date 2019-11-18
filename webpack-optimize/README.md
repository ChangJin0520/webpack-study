## webpack的相关优化项
1. noParse
2. exclude include
3. webpack.IgnorePlugin  
   可以忽略部分引入文件 减少打包大小  
   可以手动只引入需要的包
4. webpack.DllPlugin 动态链接库  
   单独打包需要的包，然后引入到html模板中，这样就不用重新打包了
   1. 配置单独的webpack配置 用来打包需要采用dll模式引入的模块
      ``` js
      const path = require('path')
      const webpack = require('webpack')

      module.exports = {
          mode: 'development',
          entry: {
              react: ['react', 'react-dom']
          },
          output: {
              filename: '_dll_[name].js', // 产生的文件名
              path: path.resolve(__dirname, 'dist'),
              library: '_dll_[name]' // dynamic link library
              // libraryTarget: 'var' // commonjs, var, this... // 意思是不是以库的模式打包出来
          },
          plugins: [
              new webpack.DllPlugin({
                  name: '_dll_[name]',
                  path: path.resolve(__dirname, 'dist', 'manifest.json')
              })
          ]
      }
      ```
   2. 添加动态链接库的webpack使用配置
      ```js
      new webpack.DllReferencePlugin({
          manifest: path.resolve(__dirname, 'dist', 'manifest.json') // 动态链接库的索引文件
      })
      ```
   3. 在html模板中引用打包后的js
      ``` html
      <script src="/_dll_react.js"></script>
      ```
