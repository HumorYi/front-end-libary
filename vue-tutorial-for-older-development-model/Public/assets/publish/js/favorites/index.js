new Vue({
  mixins: [],
  data: function () {
    return {
      checked: false
    }
  },
  created: function () {},
  methods: {
    toggleCheckbox: function () {
      this.checked = !this.checked
    }
  },
  watch: {}
}).$mount('#favorites')
