/*
  使用方式:
    对象名：UTIL_TIP

    方法：
        success
        error
        warning
        info

    参数：
          支持只传一个字符串数据作为提示的消息，
          如果想更改其它默认配置，需要传一个对象，下面是默认配置
            {
              msg: '',            // String
              timeout: 2000,      // Number 毫秒
              openIcon: true,     // Boolean
              openClose: true,    // Boolean
              autoClose: true     // Boolean
          }

  实现方式：
      设计好 dom 结构，添加 css 样式，动态创建 tom 和 删除 dom
 */
var UTIL_TIP = {
  success: function (option) {
    this.add(option, 'success', '')
  },
  error: function (option) {
    this.add(option, 'error', '')
  },
  warning: function (option) {
    this.add(option, 'warning')
  },
  info: function (option) {
    this.add(option, 'info')
  },
  containerWrapId: 'g-tip-wrap',
  containerClassName: 'g-tip',
  add: function (option, className, iconChar) {
    var self = this
    var extendOption = this.getExtendOption(option)
    var extendClassName =
      this.containerClassName +
      ' ' +
      'g-fade-in-top' +
      ' ' +
      (className || 'info')
    var containerWrap = document.getElementById(this.containerWrapId)
    var container = document.createElement('div')

    if (containerWrap === null) {
      containerWrap = document.createElement('div')
      containerWrap.id = this.containerWrapId
      document.body.appendChild(containerWrap)
    }

    container.className = extendClassName
    container.innerHTML = this.generate(extendOption, iconChar)

    containerWrap.appendChild(container)

    if (extendOption.autoClose) {
      setTimeout(function () {
        self.remove()
      }, extendOption.timeout)
    }
  },
  remove: function (removeAll, size) {
    var containerWrap = document.getElementById(this.containerWrapId)

    if (!containerWrap) {
      throw new Error('您还未创建提示')
    }

    if (removeAll) {
      containerWrap.parentElement.removeChild(containerWrap)

      return
    }

    var doms = containerWrap.getElementsByClassName(this.containerClassName)
    size = size || 1

    for (var i = 0; i < size; i++) {
      doms[0] && containerWrap.removeChild(doms[0])
    }

    !containerWrap.hasChildNodes() &&
      containerWrap.parentElement.removeChild(containerWrap)
  },
  getExtendOption: function (option) {
    var defaultOption = {
      msg: '',
      timeout: 2000,
      openIcon: true,
      openClose: true,
      autoClose: true
    }

    if (typeof option === 'string') {
      defaultOption.msg = option
    } else {
      UTIL_LIB.extendObject(defaultOption, option || {})
    }

    return defaultOption
  },
  generate: function (option, iconChar) {
    var icon =
      '<i class="icon">' + (iconChar === undefined ? 'i' : iconChar) + '</i>'
    var msg = '<span>' + option.msg + '</span>'
    var close =
      '<span class="close" onclick="this.parentElement.parentElement.removeChild(this.parentElement)">×</span>'

    var content = ''

    if (option.openIcon) {
      content += icon
    }

    content += msg

    if (option.openClose) {
      content += close
    }

    return content
  }
}
