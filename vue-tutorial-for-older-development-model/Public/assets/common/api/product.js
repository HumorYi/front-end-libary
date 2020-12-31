var SIDEBAR_URL = UTIL_BUSINESS.getSideUrl()

var COMMON_API_PRODUCT = {
  hadReport: function (data) {
    return request('get', SIDEBAR_URL + '/MaterialReport/hasRecord', data)
  }
}
