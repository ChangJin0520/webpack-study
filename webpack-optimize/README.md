# webpack的相关优化项
## noParse
## exclude include
## webpack.IgnorePlugin  
   可以忽略部分引入文件 减少打包大小  
   可以手动只引入需要的包
## webpack.DllPlugin 动态链接库  
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

## 多线程打包 happypack
使用happypack实现多线程打包 提高打包速度  
### 使用方式
1. loader中使用Happypack/loader?id=xx来替换原来的方式
2. plugins
   ```js
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
   })
   ```
### 注意
1. css也可以使用
2. 当需要打包的文件比较小的时候，采用多线程可能更慢

## webpack的`自带`优化
### tree-shaking
自动删除掉没用代码
1. import 在生产环境下, 会自动去除掉未使用的代码
2. require语法不支持tree-shaking

### scope hosting 作用域提升
webpack会自动省略可以简化的代码
```js
let a = 1;
let b = 2;
let c = 3;
let d = 1 + 2 + 3;
console.log(d)


webpack下:
console.log(6);
```
