var CONFIG_API = {
  responseStatusCode: {
    '-1': {
      msg: '请先登录',
      cb: function (msg) {
        UTIL_BUSINESS.showLoginDialog(msg)
        console.log('api response not login error')
        throw new Error('请先登录')
      }
    },
    200: {
      msg: '响应成功',
      cb: function (msg, data) {
        console.log('api response success')
        console.log(msg)
        return data
      }
    },
    403: {
      msg: '参数错误',
      cb: function (msg) {
        console.log('api response arguments error')
        throw new Error(msg)
      }
    },
    500: {
      msg: '响应失败',
      cb: function (msg) {
        console.log('api response exception')
        throw new Error(msg)
      }
    },
    default: {
      msg: '响应未知错误',
      cb: function (msg) {
        console.log('api response unknown error')
        throw new Error(msg)
      }
    }
  }
}
