import Vue from 'vue'
import VueRouter from 'vue-router'

import {
  Route,
  RouteConfig,
  RouterOptions,
  ErrorHandler,
  RawLocation
} from 'vue-router/types/router'

import { isProduction } from '#env'

import { pendingRequest } from '@/http/index.ts'

import { setDocumentTitle, appendCdnResource, loginVerify } from './handler'

// 用户权限校验路由
import { getAuthRoutes } from '@bizUtils/route-auth.ts'

// 无需权限校验路由
import accessibleRoutes from '@/router/route-accessible'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function(
  location: RawLocation,
  onComplete?: Function,
  onAbort?: ErrorHandler
) {
  if (onComplete || onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  return (originalPush.call(this, location) as any).catch((error: any) => error)
}

const routes = getAuthRoutes().concat(accessibleRoutes)

// 2.6.0 新增，让一个对象可响应，通过操作 meta 来 控制页面访问等权限操作
routes.forEach((route: RouteConfig) => Vue.observable(route.meta))

const routerOptions: RouterOptions = {
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(
    to: Route,
    from: Route,
    savedPosition: void | { x: number; y: number }
  ) {
    // keep-alive 返回缓存页面后记录浏览位置
    if (savedPosition || to.meta.keepAlive) {
      return savedPosition
    }

    return { x: 0, y: 0 }

    // 异步滚动操作
    // return new Promise(resolve => setTimeout(() => resolve({ x: 0, y: 0 }), 10))
  }
}

const router: VueRouter = new VueRouter(routerOptions)

// 路由加载前
router.beforeEach(async (to: Route, from: Route, next: Function) => {
  // 取消前面路由页面未完成的 axios 请求
  pendingRequest.forEach(request => request['cancel']())

  setDocumentTitle(to)

  // 无需开启登录校验，可注释或删掉
  if (!loginVerify(to, from, next)) {
    return
  }

  if (isProduction) {
    await appendCdnResource(to)
  }

  next()
})

// 异常错误处理，尝试解析一个异步组件时发生错误，重新渲染目标页面
router.onError((error: Error) => {
  const pattern = /Loading chunk .+ failed/g
  const isChunkLoadFailed = pattern.test(error.message)
  const pending = router['history'].pending

  isChunkLoadFailed && pending && router.replace(pending.fullPath)
})

export default router
