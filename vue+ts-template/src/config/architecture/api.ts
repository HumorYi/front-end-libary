// 架构（不能删） -  api 配置
import Message from '@archUtils/message.ts'

// 如需要开启 token 失效状态码处理，自行解除注释
// import router from '@/router'
// import { logout } from '@bizUtils/user.ts'
// import { loginRouteName } from '@archConf/user'
// import { invalidAccessToken } from '@globalUtils/accessToken'

enum statusCode {
  success = 0
  // 根据自己项目制定的 token 失效状态码来更改
  // tokenInvalid = 100000
}
type ResponseStatusCodeVal = {
  msg: string
  cb: Function
}

type ResponseStatusCode = {
  [statusCode.success]: ResponseStatusCodeVal
  // [statusCode.tokenInvalid]: ResponseStatusCodeVal
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

/* const handleTokenInvlid = {
  msg: 'token invalid',
  cb: () => {
    if (router.currentRoute.name !== loginRouteName) {
      message.error('登录状态已过期')
      invalidAccessToken()
      logout()
    }
  }
} */

const responseStatusCode: ResponseStatusCode = {
  [statusCode.success]: handleSuccess,
  // [statusCode.tokenInvalid]: handleTokenInvlid,
  default: handleUnKnowCode
}

export { responseStatusCode }
