import Counter from '@archUtils/counter'

type ConnectionConfig = {
  url: string
  onopen?: Function
  onclose?: Function
  onmessage?: Function
  onerror?: Function
}

type HeartCheckConfig = {
  timeout: number
  msg: string
}

type ReconnectConfig = {
  timeout: number
  max: number
}

type CustomWebSocketConfig = {
  openHeartCheck: boolean
  openReconnect: boolean
  heartCheck: HeartCheckConfig
  reconnect: ReconnectConfig
}

class HeartCheck {
  timer!: NodeJS.Timeout
  timeout!: number
  msg!: string

  constructor({ timeout, msg }: HeartCheckConfig) {
    this.timeout = timeout
    this.msg = msg
  }

  start(ws: WebSocket) {
    // 保证同一时刻只有一个定时器在跑
    this.stop()

    this.timer = setTimeout(() => {
      ws.send(this.msg)

      this.start(ws)
    }, this.timeout)
  }

  stop() {
    if (this.timer) {
      clearTimeout(this.timer)
      // this.timer = 0
    }
  }
}

class ReconnectCounter extends Counter {
  max!: number

  constructor(max: number) {
    super()
    this.max = max
  }

  isMax() {
    return this.count >= this.max
  }
}

export default class CustomWebSocket {
  ws!: WebSocket
  heartCheck!: HeartCheck
  reconnectCounter!: ReconnectCounter
  reconnectTimeout!: number
  openHeartCheck!: boolean
  openReconnect!: boolean
  timer!: NodeJS.Timeout

  constructor(
    {
      openHeartCheck,
      openReconnect,
      heartCheck,
      reconnect
    }: CustomWebSocketConfig = {
      openHeartCheck: true,
      openReconnect: true,
      heartCheck: { timeout: 50 * 1000, msg: 'heartBeat' },
      reconnect: { timeout: 5 * 1000, max: 5 }
    }
  ) {
    this.openHeartCheck = openHeartCheck
    this.openReconnect = openReconnect

    if (openHeartCheck) {
      this.heartCheck = new HeartCheck(heartCheck)
    }

    if (openReconnect) {
      this.reconnectCounter = new ReconnectCounter(reconnect.max)
      this.reconnectTimeout = reconnect.timeout
    }
  }

  isConnected() {
    if (!this.ws) {
      return false
    }

    return [WebSocket.CONNECTING, WebSocket.OPEN].includes(this.ws.readyState)
  }

  startHeartCheck() {
    this.openHeartCheck && this.heartCheck.start(this.ws)
  }

  stopHeartCheck() {
    this.openHeartCheck && this.heartCheck.stop()
  }

  init(config: ConnectionConfig) {
    const { onopen, onclose, onmessage, onerror } = config

    this.ws.onopen = (e: any) => {
      this.openReconnect &&
        this.reconnectCounter.isRunning() &&
        this.reconnectCounter.reset()

      this.startHeartCheck()

      onopen && onopen(e)
    }

    this.ws.onmessage = (e: any) => {
      this.startHeartCheck()

      onmessage && onmessage(e)
    }

    this.ws.onclose = (e: any) => {
      console.error('ws.onclose', e)

      !e.wasClean && this.reconnect(config)

      onclose && onclose(e)
    }

    this.ws.onerror = (e: any) => {
      console.error('ws.onerror', e)

      this.reconnect(config)

      onerror && onerror(e)
    }
  }

  connect(config: ConnectionConfig) {
    if (!WebSocket) {
      return
    }

    try {
      this.ws = new WebSocket(config.url)
      this.init(config)
    } catch {
      this.reconnect(config)
    }
  }

  reconnect(config: ConnectionConfig) {
    if (
      !this.openReconnect ||
      this.isConnected() ||
      this.reconnectCounter.isMax()
    ) {
      return
    }

    this.clearTimer()

    this.timer = setTimeout(() => {
      this.reconnectCounter.increase()
      this.connect(config)
    }, this.reconnectTimeout)
  }

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer)
      // this.timer = 0
    }
  }

  close() {
    if (!this.ws) {
      return
    }

    this.clearTimer()
    this.stopHeartCheck()
    this.ws.close()
  }
}
