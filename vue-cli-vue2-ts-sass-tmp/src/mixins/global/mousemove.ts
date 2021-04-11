import { Vue, Component } from 'vue-property-decorator'
@Component
export default class Mousemove extends Vue {
  mousemoveRightBoundary = 0
  mousemoveBottomBoundary = 0
  mousemoveElement!: HTMLElement

  setMousemoveElement(elem: HTMLElement) {
    this.mousemoveElement = elem
  }

  setMousemoveElementCenter(
    elem: HTMLElement,
    containerWidth = window.innerWidth,
    containerHeight = window.innerHeight
  ) {
    this.setMousemoveElement(elem)
    this.mousemoveRightBoundary = containerWidth - elem.offsetWidth
    this.mousemoveBottomBoundary = containerHeight - elem.offsetHeight

    elem.style.left = Math.floor(this.mousemoveRightBoundary / 2) + 'px'
    elem.style.top = Math.floor(this.mousemoveBottomBoundary / 2) + 'px'
  }

  getMousemoveElementPos(current: number, boundary: number) {
    if (current < 0) {
      return 0
    }

    if (current > boundary) {
      return boundary
    }

    return current
  }

  handleMousedown(e: MouseEvent) {
    const self = this
    const mousemoveElement = this.mousemoveElement
    const mousemoveParentElement = this.mousemoveElement
      .parentElement as HTMLElement
    const spaceX = e.clientX - mousemoveElement.offsetLeft
    const spaceY = e.clientY - mousemoveElement.offsetTop

    const mousemove = function(e: MouseEvent) {
      mousemoveElement.style.left =
        self.getMousemoveElementPos(
          e.clientX - spaceX,
          self.mousemoveRightBoundary
        ) + 'px'
      mousemoveElement.style.top =
        self.getMousemoveElementPos(
          e.clientY - spaceY,
          self.mousemoveBottomBoundary
        ) + 'px'
    }

    const mouseup = function handler() {
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', handler)

      document.body.classList.remove('g-usn')
      mousemoveParentElement.classList.remove('g-cursor-move', 'children')
    }

    document.body.classList.add('g-usn')
    mousemoveParentElement.classList.add('g-cursor-move', 'children')

    document.addEventListener('mousemove', mousemove, false)
    document.addEventListener('mouseup', mouseup, false)
  }
}
