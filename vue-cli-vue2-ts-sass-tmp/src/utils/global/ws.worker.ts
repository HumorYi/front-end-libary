import CustomWebSocket from '@globalUtils/customWebSocket'

const ctx = self as any

class HandleWorker {
  customWebSocket: CustomWebSocket

  constructor() {
    this.customWebSocket = new CustomWebSocket()
  }

  connect(url: string, onmessage: Function) {
    this.customWebSocket.connect({ url, onmessage })
  }

  close() {
    this.customWebSocket.close()
  }
}

const handleWorker = new HandleWorker()

ctx.addEventListener(
  'message',
  ({ data: { type, data } }: MessageEvent) => {
    switch (type) {
      case 'connect':
        handleWorker.connect(data.url, (e: any) => {
          ctx.postMessage({
            type: 'websocket',
            data: JSON.stringify(e.data)
          })
        })
        break
      case 'close':
        handleWorker.close()
        ctx.close()
    }
  },
  false
)

ctx.addEventListener(
  'messageerror',
  (e: MessageEvent) => {
    console.error(e)
  },
  false
)

ctx.addEventListener(
  'error',
  (e: ErrorEvent) => {
    console.error(e)
  },
  false
)

export default {} as typeof Worker & { new (): Worker }
