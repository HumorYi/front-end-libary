import { DirectiveBinding } from 'vue/types/options'

const undrag = function(el: HTMLElement) {
  el.classList.add('g-usn')
  el.setAttribute('unselectable', 'on')
  el.addEventListener(
    'selectstart',
    function() {
      return false
    },
    false
  )
}

export default [
  {
    name: 'undrag',
    handler: {
      inserted(el: HTMLElement, { arg }: DirectiveBinding) {
        if (arg === 'wrap') {
          const div = document.createElement('div')

          undrag(div)

          div.appendChild(el.cloneNode())
          el.parentNode?.replaceChild(div, el)
        } else {
          undrag(el)
        }
      }
    }
  },
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
