import { RouteConfig } from 'vue-router'
import { routeAuth, permission } from '@/router/route-auth'

export const getAuthRoutes = (): RouteConfig[] => {
  return routeAuth.map(
    ({
      path,
      name,
      meta,
      component
    }: {
      path: string
      name: string
      meta: { permissions?: {}[] }
      component: Function
    }) => {
      const observeMeta = {
        ...meta,
        // 登录权限认证
        loginAuth: true,
        // 访问权限认证
        accessAuth: false,
        permissions: (meta.permissions || []).map((permission: {}) => {
          // 操作权限认证
          permission['auth'] = false

          return permission
        })
      }

      return {
        path,
        name,
        meta: observeMeta,
        component
      }
    }
  )
}

export const getSidebar = (): {}[] => {
  return routeAuth.map(
    ({ name: routerName, iconClassName, meta: { title } }) => {
      return {
        title,
        routerName,
        iconClassName
      }
    }
  )
}

export const getPermissions = (): {}[] => {
  return routeAuth.map(({ name: routerName, meta: { title, permissions } }) => {
    return {
      title,
      routerName,
      permissions
    }
  })
}

export const hadAccessAuth = (permissions: number[]) =>
  permissions.includes(permission.access)
