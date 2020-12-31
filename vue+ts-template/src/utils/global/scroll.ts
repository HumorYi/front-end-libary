import { Scroll as InterfaceScroll } from '@bizInterface/index'
const className = ' g-oh'

export default class Scroll implements InterfaceScroll {
  getWidth() {
    const el = document.createElement('p')
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

    el.remove()
    return scrollBarWidth
  }

  getClassNameSize() {
    const classNames = document.documentElement.className.match(
      new RegExp(className, 'g')
    )

    return classNames ? classNames.length : 0
  }

  open() {
    document.documentElement.className += className

    // 保证一次只删一个，可视为 scroll 计数器，避免连续开启多个 scroll 导致抖动
    if (this.getClassNameSize() > 1) {
      return
    }

    document.documentElement.style.marginRight = this.getWidth() + 'px'
  }

  close() {
    document.documentElement.className = document.documentElement.className.replace(
      className,
      ''
    )

    if (this.getClassNameSize() > 0) {
      return
    }

    document.documentElement.style.marginRight = '0'
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
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    const className = ' g-top'
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
}
