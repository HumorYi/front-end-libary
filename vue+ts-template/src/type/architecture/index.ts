// 架构（不能删） - 自定义变量类型声明入口，适用于确定的变量类型

import { AxiosInstance } from 'axios'
import Timer from '@/http/timer'

export type MessageOption = {
  msg?: string
  timeout?: number
  openIcon?: boolean
  openClose?: boolean
  autoClose?: boolean
}

export type LoadingConfig = {
  mountDom?: HTMLElement
  type?: string
  className?: string
  msg?: string
  id?: string
}

export type RequestWrapOption = {
  timer: Timer
  instance: AxiosInstance
  getAccessToken?: Function
  accessTokenField?: string
  pageField?: string
  pageSizeField?: string
  pageSize?: number
}

export type RequestFactoryOption = {
  instance: AxiosInstance
  proxy: string
  retryCount?: number
  defaultContentType?: { post: string }
  getAccessToken?: Function
  accessTokenField?: string
  pageField?: string
  pageSizeField?: string
  pageSize?: number
  timer?: Timer
}
