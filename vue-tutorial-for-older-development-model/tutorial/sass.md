## 1、安装node.js

[官网地址](https://nodejs.org/)

注意：选择 LTS 版本

## 2、全局安装 sass

npm install -g sass

## 3、命令行进入有 sass 文件夹 的父目录，将 sass 文件夹内的 .sass 文件 编译到 同级的 css 文件夹内 .css 文件

sass --watch --no-source-map --style=compressed sass:css

示例：

```
1、命令行进入有 sass 文件夹 的父目录
	E:\project\haodanku_admin\Public\assets\publish
	
2、执行编译命令
	sass --watch --no-source-map --style=compressed sass:css
	
3、查看根目录下的 css 目录是否编译成功
```

## 4、sass 官网

[官网地址](https://sass-lang.com/)