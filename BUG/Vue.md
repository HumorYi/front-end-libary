## 1、vue-cli4 + typescript3.9.3 直接引入 element-ui 报错

**ERROR**

These dependencies were not found:

* core-js/library/fn/object/assign in ./node_modules/babel-runtime/core-js/object/assign.js
* core-js/library/fn/symbol in ./node_modules/babel-runtime/core-js/symbol.js
* core-js/library/fn/symbol/iterator in ./node_modules/babel-runtime/core-js/symbol/iterator.js

**原因:** element-ui 与 babel 版本不兼容

**解决:**

 1.  yarn add babel-plugin-component babel-plugin-dynamic-import-node -D

 2.  babel.cofnig.js

     ```js
     const prodPlugins = []
     if (process.env.NODE_ENV === 'production') {
       prodPlugins.push('transform-remove-console')
     }
     
     module.exports = {
       presets: ['@vue/cli-plugin-babel/preset'],
       plugins: [
         // 添加 element-ui 插件
         [
           'component',
           {
             libraryName: 'element-ui',
             styleLibraryName: 'theme-chalk'
           }
         ],
         ...prodPlugins
       ]
     }
     ```

 3.  tsconfig.json

     ```json
     {
         "compilerOptions": {
         	// 目标语言的版本
             "target": "esnext",
             // 生成代码的模板标准
             "module": "esnext",
             // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
             "moduleResolution": "node",
         }
     }
     ```

## 2、Uncaught SyntaxError: Unexpected token '<'

### noscript - doesn't work properly without JavaScript enabled when serving a Vue App

**原因：**

 1.  查看环境配置文件路径是否正确

     ```
     # .env
     NODE_ENV = 'development'
     
     VUE_APP_API_URL = ''
     
     BASE_URL = './'
     BUILD_PUBLIC_PATH = './'
     ```

     ```
     # .env.production
     
     NODE_ENV = 'production'
     
     VUE_APP_API_URL = ''
     
     BASE_URL = ''
     BUILD_PUBLIC_PATH = '/'
     BUILD_OUTPUT_DIR = 'dist'
     ```

     ```
     # .env.analyz
     
     NODE_ENV = 'production'
     BUILD_IS_ANALYZ = true
     
     VUE_APP_API_URL = 'http://api.mopan.shalangzhen.cn/v1'
     
     BASE_URL = ''
     BUILD_PUBLIC_PATH = '/'
     BUILD_OUTPUT_DIR = 'dist'
     ```

     ```
     # vue.config.js
     
     // 默认 '/'，部署应用包后访问资源的基本 URL
     publicPath: process.env.BUILD_PUBLIC_PATH,
     
     // 默认 'dist', 生产环境构建文件的目录
     outputDir: process.env.BUILD_OUTPUT_DIR,
     ```

 2.  引用了外链CDN，跟开发环境导入包内部处理不一致，导致加载时无法解析

 3.  路由使用了 history 模式，没有后台支持 或者 后台没有设置 url-rewrite

     [https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90](https://router.vuejs.org/zh/guide/essentials/history-mode.html#后端配置例子)

## 3、vue-cli4 + typescript3.9.3 + vue-router lazy loading routes

**问题：** import(/\* webpackChunkName: "index" \*/ '@/views/Index/Index.vue')  打包出来的文件名没有命名 chunk（/\* webpackChunkName: "index" \*/）

**原因：** ts-loader webpack 2，动态引入包并使用 命名chunk 需要 webpack 3

**解决：** 使用 webpack 内置的 require.ensure，打包出来的文件名有 命名 chunk

require.ensure(['@/views/Index/Index.vue'], () => require('@/views/Index/Index.vue'), *'index'*)

```js
import Vue from 'vue'
import VueRouter, { RouteConfig, Route } from 'vue-router'

Vue.use(VueRouter)

// dynamic import => webpack 3
// import(/* webpackChunkName: "index" */ '@/views/Index/Index.vue')

// ts-loader => webpack 2
/*
require.ensure(
  ['@/views/Index/Index.vue'],
  () => require('@/views/Index/Index.vue'),
  'index'
)
 */

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'index',
    meta: {
      title: '首页'
    },
    component: () =>
      require.ensure(
        ['@/views/Index/Index.vue'],
        () => require('@/views/Index/Index.vue'),
        'index'
      )
  },
  {
    path: '/404',
    name: 'notFound',
    meta: {
      title: '网页不存在'
    },
    component: () =>
      require.ensure(
        ['@/views/NotFound/Index.vue'],
        () => require('@/views/NotFound/Index.vue'),
        'not-found'
      )
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { x: 0, y: 0 }
  }
})

// 路由加载前
router.beforeEach((to: Route, from, next) => {
  if (to.matched.length !== 0) {
    next()
  } else {
    next({ path: '/404' })
  }
})

// 异常错误处理，尝试解析一个异步组件时发生错误，重新渲染目标页面
router.onError(error => {
  const pattern = /Loading chunk .+ failed/g
  const isChunkLoadFailed = pattern.test(error.message)
  const targetPath = router['history'].pending.fullPath

  isChunkLoadFailed && router.replace(targetPath)
})

export default router
```

## 4、[Vue warn]: Do not use built-in or reserved HTML elements as component id

js 组件 name 属性 不能为保留字，因为 vue 内部会把 name 属性当前页面 id，

ts class  组件 类名 属性 不能为保留字，因为 vue 内部会把 类名 属性当前页面 id

```ts
// js 组件
export default {
   name: 'form'
}

// class 组件
export default class form extends Vue {}
```

## 5、引用外部配置，map 出新数组，内部数据没有响应化？

```js
// 权限配置 sidebar-auth.ts
export default [
  {
    name: '首页',
    routerName: 'Index',
    iconClassName: 'icon-home',
    auths: [
      { name: '查看', binary: 1 }
    ]
  },
  {
    name: '用户管理',
    iconClassName: 'icon-addresslist',
    routerName: 'AgentList',
    auths: [
      { name: '查看', binary: 1 },
      { name: '导入代理', binary: 2 },
      { name: '添加代理', binary: 4 }
    ]
  }
]

// 组件引入 AccountManager.vue (UI: ant-design-vue)
import confSidebar from '@bizConf/sidebar-auth'

// 权限数据
roleAuth = {
    indeterminate: false,
    checked: false,
    disabled: false,
    decorator: ['roleAuth', {}],
    list: []
}

created() {
    // 组件创建时，将生成的权限列表数据 赋值给 权限数据对象的 list 属性
    this.roleAuth.list = this.genRoleAuthList() as []
}

onChange(item: {}) {
    const checked = item['checkedList'].length === item['options'].length
    this.toggleCheck(item, checked)
}

toggleCheck(origin: {}, checked: boolean) {
    if (origin['checked'] === checked) {
        return
    }

    origin['checked'] = checked
    origin['indeterminate'] = !checked
}

// 生成权限列表
genRoleAuthList(): {}[] {
    const disabled = this.roleAuth.disabled
	
    return confSidebar.map((item: {}) => {
        // item 为内部权限项数据，其它为 ant-design-vue => checkbox 组件配置
        
        // 无响应化版本,直接在原有 item 下扩展新数据，原因：item 是外部导入，没有进行响应化  S
        item['options'] = []
        item['checkedList'] = []
        item['disabled'] = disabled
        item['indeterminate'] = !disabled
        item['collapse'] = false

        if (item['auths']) {
            item['auths'].forEach((child: {}) => {
                item['options'].push(child['name'])
            })
        }

        item['checked'] = item['options'].length === item['checkedList'].length

        return item
        // 无响应化版本,直接在原有 item 下扩展新数据，原因：item 是外部导入，没有进行响应化  E
        
        
        // 有响应化版本，创建一个新对象存储新数据，从 item 中扩展旧数据，导出的新对象会进行响应化 S
        const obj = Object.assign(
            {
                options: [],
                checkedList: [],
                disabled: disabled,
                collapse: false
            },
            item
        )

        if (item['auths']) {
            item['auths'].forEach((child: {}) => {
                obj['options'].push(child['name'] as never)
            })
        }

        const checked = obj['options'].length === obj['checkedList'].length
        obj['checked'] = checked
        obj['indeterminate'] = !checked

        return obj
        // 有响应化版本，创建一个新对象存储新数据，从 item 中扩展旧数据，导出的新对象会进行响应化 E
    })
}
```



# 6、Cannot read property 'upgrade' of undefined

代理地址为空导致的