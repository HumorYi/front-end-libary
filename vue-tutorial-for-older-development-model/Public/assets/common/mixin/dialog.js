var MIXIN_DIALOG = {
  mounted: function () {
    var self = this
    window.addEventListener('keyup', function (event) {
      if (event.keyCode === 27) {
        self.cancel()
      }
    })
  },
  methods: {
    stop: function (e) {
      e.stopPropagation()
    },
    cancel: function () {
      this.$emit('cancel')
    },
    confirm: function () {
      this.$emit('confirm')
    }
  }
}
