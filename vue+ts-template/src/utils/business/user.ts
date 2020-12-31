import Vue from 'vue'
import { login as loginHandle, logout as logoutHandle } from '@globalUtils/user'

export const login = (vm: Vue, token: string): void => {
  loginHandle(vm, token)
}

export const logout = () => {
  logoutHandle()
}

/**
 * 根据业务而定
 * 1 主账号 不需要验证
 * 2 子账号 需要验证
 */
export const isMainAccount = (type: number): boolean => type === 1
