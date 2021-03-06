import Vue from 'vue'
import router from '@/router'
import { Route } from 'vue-router/types/router'

import {
  getAccessToken,
  setAccessToken,
  delAccessToken
} from '@globalUtils/accessToken.ts'

import { loginRouteName } from '@archConf/user'

export const isLogin = (): boolean => {
  return Boolean(getAccessToken())
}

export const toLogin = (routeName = loginRouteName): void => {
  router.push({ name: routeName })
}

export const loginRedirect = (
  vm: Vue,
  defaultJumpRouterName = 'Index'
): void => {
  const query = vm.$route.query
  const jumpRouterName = (query.redirect as string) || defaultJumpRouterName

  delete query.redirect

  vm.$router.push({
    name: jumpRouterName,
    query,
    params: vm.$route.params
  })
}

export const logout = (isRemember: string): void => {
  // 删除跨页签 session
  localStorage.removeItem('getSessionStorage')
  delAccessToken()

  toLogin()
}

export const handleRouteAccessToken = async (vm: Vue) => {
  const query = vm.$route.query
  const redirect = query.redirect as string
  let accessToken = query.access_token as string

  if (accessToken) {
    delete query.access_token
  } else if (redirect) {
    accessToken = getAccessToken()
  }

  if (accessToken) {
    setAccessToken(accessToken)
    loginRedirect(vm)
  }
}

export const matchLoginAuthByRoute = (to: Route): boolean => {
  const matched = to.matched

  for (let i = matched.length - 1; i >= 0; i--) {
    const item = matched[i]
    if (item.meta['loginAuth'] !== undefined) {
      return true
    }
  }

  return false
}

const removeSessionStorageKeys: string[] = ['ACCESS_TOKEN']
const ignoreRouteQueryKeys: string[] = ['redirect']

export const removeLoginSessionStorage = (
  route: Route,
  callback?: Function
) => {
  const isIgnore = Object.keys(route.query).some((key: string) => {
    return ignoreRouteQueryKeys.includes(key)
  })

  if (isIgnore) {
    return
  }

  for (const key in sessionStorage) {
    if (removeSessionStorageKeys.includes(key)) {
      sessionStorage.removeItem(key)
    }
  }

  callback && callback()
}
