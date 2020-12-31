// 二进制递增
export const permission = {
  access: 1,
  create: 2,
  update: 4,
  del: 8
}

export const routeAuth = [
  /* {
    path: '/',
    name: 'Index',
    meta: {
      title: '首页',
      // 用于页面某个权限操作，可与后台协商，可选配置
      permissions: [
        {
          title: '查看',
          value: permission.access,
        },
        {
          title: '创建',
          value: permission.create
        },
        {
          title: '编辑',
          value: permission.update
        },
        {
          title: '删除',
          value: permission.del
        }
      ]
    },
    component: () =>
      require.ensure([], () => require('@/views/Index/Index.vue'), 'index')
  } */
]
