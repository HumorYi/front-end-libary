import { Vue, Component } from 'vue-property-decorator'

@Component
export default class MixinTimer extends Vue {
  timerValid = true
  timerExpires = 0

  beforeDestroy() {
    this.closeTimer()
  }

  openTimer(timeout = 2 * 60 * 1000) {
    this.timerValid = true

    this.closeTimer()

    this.timerExpires = window.setTimeout(() => {
      this.timerValid = false

      this.closeTimer()
    }, timeout)
  }

  closeTimer() {
    window.clearTimeout(this.timerExpires)
    this.timerExpires = 0
  }
}
