import VueRouter, { RouteConfig, Route, Location } from 'vue-router'
import { decimalToBinaryToDecimals } from '@globalUtils/lib'
import { getPermissions, hadAccessAuth } from '@bizUtils/route-auth'

/**
 * 生成角色权限列表，需与后台协商数据结构，目前是按 antd checkbox 来设计数据结构
 * @param disabled
 * @param permissions [ { routerName: string, permission: number } ]
 */
export const genRolePermissions = (
  disabled: boolean,
  permissions: {}[]
): {}[] => {
  const lastPermissions: {}[] = [...permissions]

  return getPermissions().map((item: {}) => {
    const outputPermission = Object.assign(
      {
        options: item['permissions'].map(
          (permission: {}): string => permission['title']
        ),
        checkedList: [],
        collapse: false,
        disabled
      },
      item
    )

    lastPermissions.forEach((permission: {}, i: number): void => {
      if (item['routerName'] === permission['routerName']) {
        const permissionValues = decimalToBinaryToDecimals(
          permission['permission']
        )

        for (let i = item['permissions'].length - 1; i >= 0; i--) {
          const child = item['permissions'][i]

          if (permissionValues.includes(child['value'])) {
            outputPermission['checkedList'].push(child['title'] as never)
          }
        }

        // 将 匹配过的 routerName 权限 删掉，避免下次进入时 有循环查找一次
        lastPermissions.splice(i, 1)
      }
    })

    const checked =
      outputPermission['options'].length ===
      outputPermission['checkedList'].length

    outputPermission['checked'] = checked
    outputPermission['indeterminate'] = !checked

    return outputPermission
  })
}

export const handleRouteAccessAuth = (
  route: RouteConfig,
  permissionValues: number[]
): void => {
  route.meta.accessAuth = true
  const permissions = route.meta && route.meta.permissions

  if (!permissions) {
    return
  }

  permissions.forEach((permission: {}) => {
    if (permissionValues.includes(permission['value'])) {
      permission['auth'] = true
    }
  })
}

const setPermission = (routes: RouteConfig[], isOpen = false): void => {
  routes.forEach((route: RouteConfig) => {
    const permissions = route.meta && route.meta.permissions

    if (permissions) {
      route.meta.accessAuth = isOpen

      permissions.forEach((permission: {}) => {
        permission['auth'] = isOpen
      })
    }
  })
}

export const setAllPermission = (routes: RouteConfig[]): void =>
  setPermission(routes, true)

type Permission = {
  routerName: string
  permission: number[]
}

export const setAssignPermission = (
  routes: RouteConfig[],
  permissions: Permission[]
): RouteConfig | null => {
  const routesLen = routes.length
  let firstAccessAuthRoute: RouteConfig | null = null

  permissions.forEach((permission: Permission) => {
    for (let i = 0; i < routesLen; i++) {
      const route: RouteConfig = routes[i]

      if (permission.routerName === route.name) {
        const permissionValues = permission.permission

        if (hadAccessAuth(permissionValues)) {
          if (!firstAccessAuthRoute) {
            firstAccessAuthRoute = route
          }

          handleRouteAccessAuth(route, permissionValues)
        }

        break
      }
    }
  })

  return firstAccessAuthRoute
}

export const resetPermission = (routes: RouteConfig[]): void =>
  setPermission(routes)

export const handleRouterJump = (
  $router: VueRouter,
  $route: Route,
  firstAccessAuthRoute: RouteConfig | null,
  defaultLocation = { name: 'NotFound' }
) => {
  if ($route.meta.accessAuth) {
    return
  }

  let location!: Location

  // 如果找到一个可访问的路由，则跳转到第一个有权限的路由
  if (firstAccessAuthRoute) {
    location = {
      name: firstAccessAuthRoute.name,
      query: $route.query,
      params: $route.params
    }
  } else {
    // 否则，跳转到 默认地址
    location = defaultLocation
  }

  $router.replace(location)
}

export const transformPermission = (permissions: Permission[]) => {
  return permissions.map((item: {}) => {
    item['permission'] = decimalToBinaryToDecimals(item['permission'])

    return item
  })
}
