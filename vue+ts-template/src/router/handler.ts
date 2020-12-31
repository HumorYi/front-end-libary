import { Route } from 'vue-router/types/router'

import { appendResourceToHeadElement } from '@globalUtils/cdn.ts'

import {
  isLogin,
  matchLoginAuthByRoute,
  removeLoginSessionStorage
} from '@globalUtils/user.ts'

const setQueryRedirectByRoute = (to: Route): {} => {
  const query: {} = to.query || {}

  // 用于登录成功后重定向回原页面
  if (!query['redirect']) {
    query['redirect'] = to.name
  }

  return query
}

let isRemoveLoginSessionStorage = false

export function loginVerify(to: Route, from: Route, next: Function) {
  if (!matchLoginAuthByRoute(to)) {
    if (!isRemoveLoginSessionStorage) {
      removeLoginSessionStorage(to, () => {
        isRemoveLoginSessionStorage = true
      })
    }

    next()

    return false
  }

  // 未登录，跳转登录页
  if (!isLogin()) {
    next({ name: 'Login', query: setQueryRedirectByRoute(to) })

    return false
  }

  return true
}

export async function appendCdnResource(to: Route): Promise<void> {
  const cdn = to.meta.cdn

  if (cdn && !cdn.completed) {
    await appendResourceToHeadElement(cdn.css, cdn.js)
    cdn.completed = true
  }
}

export function setDocumentTitle(to: Route): void {
  const { title } = to.meta

  if (title) {
    document.title = title
  }
}
