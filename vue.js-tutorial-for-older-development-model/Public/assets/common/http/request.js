/**
 * 公共请求入口
 * @param {String} method 'get || post'
 * @param {String} url
 * @param {Object} param
 * @return {Promise}
 */
var request = function (method, url, param) {
  param = param || {}

  var requestConfig = getRequestConfig(method, url, param)

  return axios(requestConfig)
    .then(function (res) {
      var data = res.data
      var responseStatusCodeConfig =
        CONFIG_API.responseStatusCode[data.code] ||
        CONFIG_API.responseStatusCode.default

      return responseStatusCodeConfig.cb(data.msg, data.data)
    })
    .catch(function (err) {
      layer.msg(err.message, {
        icon: 2
      })

      throw new Error(err)
    })
}
