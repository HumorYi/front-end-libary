var UTIL_COPY = {
  watch: function (clipboard, tip) {
    this.watchSuccess(clipboard, tip)
    this.watchError(clipboard)
  },
  watchSuccess: function (clipboard, tip) {
    tip = tip === undefined ? '复制成功' : tip

    clipboard.on('success', function (e) {
      tip && layer.msg(tip)
      e.clearSelection()
      clipboard.destroy()
    })
  },
  watchError: function (clipboard) {
    clipboard.on('error', function () {
      layer.msg(
        '由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！',
        {
          icon: 2
        }
      )
    })
  }
}
