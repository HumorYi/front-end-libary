// 架构（不能删） -  api 配置
import Message from '@archUtils/message.ts'

enum statusCode {
  success = 0
}
type ResponseStatusCodeVal = {
  msg: string
  cb: Function
}

type ResponseStatusCode = {
  [statusCode.success]: ResponseStatusCodeVal
  default: ResponseStatusCodeVal
}

const message = new Message()

const handleSuccess = {
  msg: 'response success',
  cb: (msg: any, data: {}): any => data['data']
}

const handleUnKnowCode = {
  msg: 'response unknow code',
  cb: (msg: any, data: {}): Error => {
    message.error(msg)
    throw new Error(`msg: ${msg}, data: ${data}`)
  }
}

const responseStatusCode: ResponseStatusCode = {
  [statusCode.success]: handleSuccess,
  default: handleUnKnowCode
}

export { responseStatusCode }
