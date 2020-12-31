## 1、npm 包问题

- 原因：包下载失败或不完整

- 解决：卸载重装，注意原来包的版本号

  - 例如：
    - 卸载 yarn remove compression-webpack-plugin
    - 重装 yarn add compression-webpack-plugin@4.0.0 -D
  - 如果卸载重装不行，更换包工具下载
    - 使用 npm 或 cnpm 重装
    - 不行再使用命令行终端把 npm 源换成 taobao 源 或 npm 官网源 之后再次重装
      - 查看 npm 源地址：npm config get registry
      - 淘宝：npm config set registry https://registry.npm.taobao.org
      - 官网：npm config set registry https://registry.npmjs.org/

  

- Cannot read property 'tapPromise' of undefined =》compression-webpack-plugin 包

- cannot find module 'gifsicle'  =》image-webpack-loader 包

- [image-webpack-loader 无法安装或卡死解决办法](https://my.oschina.net/itlangz/blog/1921136)