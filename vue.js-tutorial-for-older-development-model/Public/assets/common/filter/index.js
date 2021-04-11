var FilterEndZero = function (value, bit) {
  bit = bit !== undefined ? bit : 2

  return Number(value)
    .toFixed(bit)
    .replace(/(\.0+$)|(?:(?!(\.\d+))0+$)/, '')
}

var FILTERS = [
  {
    name: 'coupon',
    cb: function (value) {
      return '￥' + value
    }
  },
  {
    name: 'zero',
    cb: function (value, bit) {
      return FilterEndZero(value, bit)
    }
  },
  {
    name: 'percent',
    cb: function (value, bit) {
      return FilterEndZero(value, bit) + '%'
    }
  },
  {
    name: 'tenThousand',
    cb: function (value, bit) {
      bit = bit !== undefined ? bit : 1

      var numValue = Number(value)
      var result =
        numValue >= 10000
          ? FilterEndZero(numValue / 10000, 1) + '万'
          : numValue + ''

      return result
    }
  }
]

FILTERS.forEach(function (filter) {
  Vue.filter(filter.name, filter.cb)
})
