import { Vue, Component } from 'vue-property-decorator'

@Component
export default class MixinDebounceThrottle extends Vue {
  beforeDestroy() {
    if (this['debounceThrottleCancels']) {
      this['debounceThrottleCancels'].forEach((cancel: Function) => cancel())
      delete this['debounceThrottleCancels']
    }
  }
}
