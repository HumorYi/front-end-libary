import { Vue, Component } from 'vue-property-decorator'

const elements = [window, document.documentElement, document.body]

@Component
export default class Scroll extends Vue {
  isFixedByScroll = false
  scrollFixedTopDistance = 70

  created() {
    this.addEventListener()

    window.addEventListener('resize', this.scroll, false)
  }

  destroyed() {
    this.removeEventListener()

    window.removeEventListener('resize', this.scroll, false)
  }

  addEventListener() {
    elements.forEach(
      item => item.addEventListener('scroll', this.scroll),
      false
    )
  }

  removeEventListener() {
    elements.forEach(
      item => item.removeEventListener('scroll', this.scroll),
      false
    )
  }

  scroll(evt: Event) {
    // 滚动栏滚动一次间距
    const scrollSpace = 100

    this.isFixedByScroll =
      (this['hasScrollHeight'] ? this['hasScrollHeight']() : true) &&
      (document.documentElement.scrollTop || document.body.scrollTop) >
        this.scrollFixedTopDistance + scrollSpace
  }
}
