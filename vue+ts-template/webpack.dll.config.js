const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// dll文件存放的目录
const dllPath = 'vendor'

/* 将特定的类库提前打包然后引入，不但能够极大减少打包时间，
也实现了将公共代码抽离成单独文件的优化方案，可以很大程度的减小打包之后的文件体积。 */

module.exports = {
  entry: {
    vendor: ['vue/dist/vue.esm', 'vue-router', 'axios', 'qs']
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: '[name]-[hash].dll.js',
    // vendor.dll.js中暴露出的全局变量名, 保持与 webpack.DllPlugin 中名称一致
    library: '[name]_[hash]'
  },
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['*.*']
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, '[name]-manifest.json'),
      // 保持与 output.library 中名称一致
      name: '[name]_[hash]',
      context: process.cwd()
    })
  ]
}
