import { Vue, Component, Provide } from 'vue-property-decorator'
@Component
export default class ESC extends Vue {
  get listenKeyUpElement() {
    return this['customListenKeyUpElement'] || document
  }

  mounted() {
    this['openListenEsc'] && this.listenKeyup()
  }

  beforeDestroy() {
    this['openListenEsc'] && this.removeKeyup()
  }

  @Provide()
  listenKeyup() {
    this.listenKeyUpElement.addEventListener('keyup', this.onKeyboard, false)
  }

  @Provide()
  removeKeyup() {
    this.listenKeyUpElement.removeEventListener('keyup', this.onKeyboard, false)
  }

  isEsc(e: KeyboardEvent) {
    return e.keyCode === 27
  }

  onKeyboard(e: KeyboardEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (!this.isEsc(e)) {
      return
    }

    // 避免组件销毁时移除事件监听时再执行监听函数
    this['close'] && this['close']()
  }
}
