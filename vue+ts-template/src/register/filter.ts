// 注册全局过滤器，适用于 Vue + TypeScript

import Vue from 'vue'

const files = require.context(
  // 其组件目录的相对路径
  '../filter',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /.ts$/
)

files.keys().forEach((fileName: string) => {
  const file = files(fileName)
  const fileModule = file.default || file

  fileModule.forEach(({ name, fn }: { name: string; fn: Function }) =>
    Vue.filter(name, fn)
  )
})
