import Counter from '@archUtils/counter'
import Loading from '@archUtils/loading'

class TimerCounter extends Counter {
  startCount: number

  constructor(startCount = 0) {
    super(startCount)

    this.startCount = startCount
  }

  isFinished(): boolean {
    return this.count === this.startCount
  }
}

export default class Timer {
  counter: TimerCounter
  loading: Loading
  timer: any
  startTime = 0
  timeout = 0
  customTimeout = 0
  hide = false
  hideCounter = new TimerCounter()
  open: boolean

  constructor(open = true, timeout = 300) {
    this.open = open
    this.counter = new TimerCounter()
    this.loading = new Loading()

    this.timeout = timeout
    this.customTimeout = timeout
  }

  start(timer: {}, loading: {}): void {
    if (!this.open) {
      return
    }

    if (timer['hide']) {
      this.hideCounter.increase()

      if (!this.hide) {
        this.hide = true
      }

      return
    }

    if (timer['timeout']) {
      this.timeout = timer['timeout']
    }

    if (this.counter.isFinished()) {
      this.startTime = new Date().getTime()

      this.timer = setTimeout(() => this.loading.open(loading), this.timeout)
    }

    this.counter.increase()
  }

  stop(): void {
    if (!this.open) {
      return
    }

    if (this.hide) {
      this.hideCounter.decrease()

      if (this.hideCounter.isFinished()) {
        this.hide = false
      }
      return
    }

    this.counter.decrease()

    if (this.counter.isFinished()) {
      this.isTimeout() && this.loading.close()

      clearInterval(this.timer)
    }
  }

  isTimeout(): boolean {
    return Date.now() - this.startTime > this.timeout
  }
}
