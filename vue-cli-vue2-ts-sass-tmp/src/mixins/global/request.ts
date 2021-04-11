/**
 * 请求前设置 该请求状态 为 true，
 * 请求后设置 该请求状态 为 false，
 * 请求后 如果有响应数据，设置 该请求 数据状态为 true，否则设置为 false
 */

import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Request extends Vue {
  beforeRequest(loadingName: string): void {
    this.setLoading(loadingName)
  }

  afterRequest(data: any, loadingName: string, hadDataName?: string): void {
    this.setLoaded(loadingName)
    hadDataName && this.responseData(data, hadDataName)
  }

  setLoading(loadingName: string): void {
    this[loadingName] = true
  }

  setLoaded(loadingName: string): void {
    this[loadingName] = false
  }

  responseData(data: any, hadDataName: string): void {
    if (!data) {
      if (this[hadDataName]) {
        this[hadDataName] = false
      }

      return
    }

    if (!this[hadDataName]) {
      this[hadDataName] = true
    }
  }
}
