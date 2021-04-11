var UTIL_ANIMATION = {
  // obj, prop, size, step, duration, start
  rowUp: function (option) {
    if (option.size <= 0) {
      return
    }

    option.duration = option.duration || 4000
    option.start = option.start || 0

    setInterval(() => {
      option.start = option.start < option.size - 1 ? option.start + 1 : 0

      option.obj[option.prop] = option.start * option.step
    }, option.duration)
  }
}
