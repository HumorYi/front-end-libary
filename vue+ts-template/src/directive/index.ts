export default [
  {
    name: 'focus',
    definition: {
      inserted(el: HTMLElement) {
        el.focus()
      }
    }
  },
  {
    name: 'pin',
    definition: (el: HTMLElement, binding: { arg: string; value: any }) => {
      el.style.position = 'fixed'
      const s = binding.arg || 'top'
      el.style[s] = binding.value + 'px'
    }
  }
]
