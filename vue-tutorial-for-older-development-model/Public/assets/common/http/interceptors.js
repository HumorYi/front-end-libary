var util_counter = new Util_Counter()
var util_loading = new Util_Loading()

var extendRequestConfig = {
  get: function (config, param) {
    config.params = param
  },
  post: function (config, param) {
    config.data = param
  }
}

/**
 * 获取请求配置
 * @param {String} method 'get || post'
 * @param {String} url
 * @param {Object} param
 * @return {Object}
 */
var getRequestConfig = function (method, url, param) {
  var requestConfig = { url: url, method: method }

  extendRequestConfig[method] &&
    extendRequestConfig[method](requestConfig, param)

  return requestConfig
}

var filterRequestDataKeys = ['loadingTip']
var timer = null
var lastTimer = null
var timeout = 300
var startTime = 0
var endTime = 0

// 启用 cookie
axios.defaults.withCredentials = true

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    var param = config.data || config.param
    var loadingTip = param && param.loadingTip ? param.loadingTip : ''

    if (config.method === 'get') {
      config.param = UTIL_LIB.filterObjectKeys(
        config.param,
        filterRequestDataKeys
      )
    } else if (config.method === 'post') {
      config.data = UTIL_LIB.filterObjectKeys(
        config.data,
        filterRequestDataKeys
      )
    }

    if (
      config.data &&
      config.method === 'post' &&
      config.data.constructor !== FormData
    ) {
      // 格式化模式有三种：indices、brackets、repeat
      config.data = Qs.stringify(config.data, { arrayFormat: 'repeat' })
    }

    util_counter.increase()

    if (timer === lastTimer) {
      startTime = new Date().getTime()

      timer = setTimeout(function () {
        util_loading.add(loadingTip)
      }, timeout)
    }

    return config
  },
  function (error) {
    return error
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    util_counter.decrease()

    if (util_counter.isFinished()) {
      endTime = new Date().getTime()

      clearInterval(timer)

      lastTimer = timer

      if (endTime - startTime > timeout) {
        util_loading.remove()
      }
    }

    return response
  },
  function (error) {
    return error
  }
)
