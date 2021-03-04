import { Scroll as InterfaceScroll } from '@bizInterface/index'
import Counter from '@archUtils/counter'

const className = ' g-oh'
const counter = new Counter()

export default class Scroll implements InterfaceScroll {
  dom: HTMLElement

  constructor(dom = document.documentElement) {
    this.dom = dom
  }

  getWidth() {
    const el = document.createElement('div')
    const styles = {
      width: '100px',
      height: '100px',
      overflowY: 'scroll'
    }

    for (const i in styles) {
      el.style[i] = styles[i]
    }

    document.body.appendChild(el)

    const scrollBarWidth = el.offsetWidth - el.clientWidth

    document.body.removeChild(el)

    return scrollBarWidth
  }

  hasScroll() {
    return (
      document.body.scrollHeight > (window.innerHeight || this.dom.clientHeight)
    )
  }

  setMarginRight() {
    this.dom.style.marginRight = this.getWidth() + 'px'
  }

  resetMarginRight() {
    this.dom.style.marginRight = '0'
  }

  open() {
    if (counter.isFinished()) {
      this.dom.className += className

      this.setMarginRight()
    }

    counter.increase()
  }

  close() {
    counter.decrease()

    if (counter.isFinished()) {
      document.documentElement.className = document.documentElement.className.replace(
        className,
        ''
      )

      this.resetMarginRight()
    }
  }

  top(dom: HTMLElement, top: number, minScrollHeight: number) {
    window.addEventListener(
      'scroll',
      function handler() {
        this.topHandle(dom, top, minScrollHeight)

        window.removeEventListener('scroll', handler)
      }.bind(this)
    )
  }

  topHandle(dom: HTMLElement, top: number, minScrollHeight: number) {
    const scrollTop =
      window.pageYOffset || this.dom.scrollTop || document.body.scrollTop
    const className = ' g-pof-top'
    const canScrollHeight =
      document.body.scrollHeight - document.body.clientHeight

    if (scrollTop > top && canScrollHeight > minScrollHeight) {
      if (!dom.className.includes(className)) {
        dom.className += className
      }

      return
    }

    dom.className = dom.className.replace(className, '')
  }

  isScrollBottom(elm = this.dom, increment = 0): boolean {
    return elm.scrollHeight - elm.scrollTop > elm.clientHeight + increment
  }

  async request(target = this.dom, fn: Function): Promise<void> {
    const scrollTop = target.scrollTop

    await fn()

    target.scrollTop = scrollTop
  }
}
