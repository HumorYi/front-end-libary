import Vue from 'vue'

import { debounceThrottle } from '@globalUtils/event.ts'

export const DebounceThrottle = function(timeout = 1000, immediate = true) {
  return function(
    target: Vue,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const oldValue = descriptor.value

    if (!target['debounceThrottleCancels']) {
      target['debounceThrottleCancels'] = []
    }

    descriptor.value = debounceThrottle().call(
      target,
      oldValue,
      timeout,
      immediate
    )

    target['debounceThrottleCancels'].push(descriptor.value.cancel)

    return descriptor
  }
}

DebounceThrottle.timer = debounceThrottle.timer
DebounceThrottle.cancel = debounceThrottle.cancel

export const ToggleLoadingKey = function(loadingKey = 'loading') {
  return function(
    target: Vue,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const oldValue = descriptor.value

    descriptor.value = async function(...args: any[]) {
      if (this[loadingKey] !== undefined) {
        this[loadingKey] = true
      }

      const result = await oldValue.apply(this, args)

      if (this[loadingKey] !== undefined) {
        this[loadingKey] = false
      }

      return result
    }

    return descriptor
  }
}

export const DebounceRequest = function() {
  return function(
    target: Vue,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const oldValue = descriptor.value

    descriptor.value = async function(...args: any[]) {
      if (oldValue.loading) {
        return
      } else {
        oldValue.loading = true
      }

      try {
        const result = await oldValue.apply(this, args)

        return result
      } catch (error) {
        throw new Error(error)
      } finally {
        oldValue.loading = false
      }
    }

    return descriptor
  }
}
