// 注意：此处不支持表达式
module.exports = {
  isProduction: process.env.NODE_ENV === 'production',
  // 是否使用 Worker
  worker: false,
  /**
   * 使用的 ui 框架，目前已有配置按需引入及按需打包
   * 'ant-design-vue'
   * 'element-ui'
   * 'vant'
   */
  ui: ''
}
