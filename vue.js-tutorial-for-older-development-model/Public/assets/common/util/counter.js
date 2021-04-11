function Util_Counter() {
  this.count = 0
}

Util_Counter.prototype = {
  increase: function () {
    this.count++
  },

  decrease: function () {
    this.count--
  },

  isFinished: function () {
    return this.count === 0
  }
}

Util_Counter.prototype.constructor = Util_Counter
