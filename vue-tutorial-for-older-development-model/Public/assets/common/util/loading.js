function Util_Loading(className) {
  this.className = 'g-mask' + ' ' + (className || 'g-private-loading')
}

Util_Loading.prototype = {
  add: function (msg) {
    msg = msg || '数据加载中，请稍后...'

    var dom = document.createElement('div')
    dom.className = this.className
    dom.innerHTML =
      '<div class="g-loading">' +
      '<div class="g-loading-outer g-spin-right"></div>' +
      '<div class="g-loading-inner g-spin-left"></div>' +
      '<div class="g-loading-msg">' +
      msg +
      '</div>' +
      '</div>'

    document.body.appendChild(dom)
  },
  remove: function () {
    UTIL_LIB.removeDomByClassName(this.className)
  }
}

Util_Loading.prototype.constructor = Util_Loading
