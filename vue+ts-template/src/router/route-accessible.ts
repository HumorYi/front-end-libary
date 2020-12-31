// dynamic import => webpack 3
// /* webpackChunkName: "index" */ 指定路由文件打包后的文件名
// 指定路由文件打包后的文件名 没有命名 chunk (index)
// import(/* webpackChunkName: "index" */ '@/views/Index/Index.vue')

// ts-loader => webpack 2
// 指定路由文件打包后的文件名 没有命名 chunk (index)
// 注意：require/import 不能解析动态文件名，例如：const cmpPath = '@/views/Index/Index.vue'; require(cmpPath)
/*
require.ensure(
  // 依赖文件数组
  ['@/views/Index/Index.vue'],
  // 依赖项加载后，webpack将执行的功能，此处用于引入组件
  () => require('@/views/Index/Index.vue'),
  // chunkName 路由文件打包后的文件名
  'index'
)
 */

export default [
  {
    path: '/',
    name: 'Index',
    meta: {
      title: '首页'
    },
    component: () =>
      require.ensure([], () => require('@/views/Index/Index.vue'), 'index')
  },
  {
    path: '/404',
    name: 'NotFound',
    meta: {
      title: '网页不存在'
    },
    component: () =>
      require.ensure(
        [],
        () => require('@/views/NotFound/Index.vue'),
        'not-found'
      )
  },
  {
    path: '*',
    redirect: '/404'
  }
]
