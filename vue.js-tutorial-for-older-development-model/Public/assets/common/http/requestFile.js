function Download() {}
Download.prototype = {
  error: function (filenamePrefix) {
    let msg = filenamePrefix + ' 导出 excel 错误，请联系管理人员，谢谢!'

    // TODO: 暂时使用 console.error 显示错误信息，后续有需求再改动
    console.error(msg)

    throw new Error(msg)
  },

  getFilenameSuffix: function (contentDisposition) {
    return contentDisposition.length >= 2
      ? contentDisposition.split('=')[1]
      : ''
  },

  forIEBrowser: function (blob, filename) {
    window.navigator.msSaveOrOpenBlob(blob, filename)
  },

  forMainstreamBrowser: function (blob, filename) {
    // 链接对象地址
    let objectUrl = (window.URL || window.webkitURL).createObjectURL(blob)
    // 使用 a 标签进行下载
    let a = document.createElement('a')

    // 默认隐藏
    a.style.display = 'none'
    // 下载链接
    a.href = objectUrl
    // 下载后文件名
    a.download = filename

    // 添加到 body 标签中
    document.body.appendChild(a)

    // 程序触发 a 标签点击事件，进行下载
    a.click()

    // 下载完成移除 a 标签
    document.body.removeChild(a)
    // 只要映射存在，Blob 就不能进行垃圾回收，因此一旦不再需要引用，就必须小心撤销 URL，释放掉 blob 对象。
    window.URL.revokeObjectURL(objectUrl)

    // 清理无用变量，防止内存泄露
    objectUrl = null
    a = null
  },

  isIEBrowser: function () {
    return window.navigator && window.navigator.msSaveOrOpenBlob
  },

  download: function (blob, filename) {
    this.isIEBrowser()
      ? this.forIEBrowser(blob, filename)
      : this.forMainstreamBrowser(blob, filename)
  }
}

Download.prototype.constructor = Download

var download = new Download()

/**
 * 公共请求文件入口
 * @param {String} method 'get || post'
 * @param {String} url
 * @param {Object} param
 * @param {String} filenamePrefix 自定义文件名前缀
 * @return {Promise}
 */
var requestFile = function (method, url, param, filenamePrefix) {
  param = param || {}
  filenamePrefix = filenamePrefix || ''

  var requestConfig = getRequestConfig(method, url, param)

  /**
   * 使用axios下载excel文件解决乱码问题
   *  1. 须将axios 配置中的responseType设置为arraybuffer，这样就不会让表格出现乱码现象；
   *  2. 如果要动态设置文件名则需要让后台将名字设置到响应头中，否则将是一个乱码的文件名；
   *  3. 然后通过<a></a> 标签的特性来自动点击下载文件；
   *  4. 如果要兼容IE则需要利用navigator.msSaveOrOpenBlob方法；
   *  5. 兼容Firefox 须将<a></a> 标签添加到body中，最后再移除<a></a> 标签
   */
  requestConfig.responseType = 'arraybuffer'

  return axios(requestConfig)
    .then(function (res) {
      // 内容部署
      var contentDisposition = res.headers['content-disposition']
      let blob = null
      let filename = ''

      if (!contentDisposition) {
        download.error(filenamePrefix)

        return
      }

      // 二进制流文件数据
      blob = new Blob([res.data])
      filename = filenamePrefix + download.getFilenameSuffix(contentDisposition)

      download.download(blob, filename)
    })
    .catch(function (err) {
      console.error(err)
    })
}
