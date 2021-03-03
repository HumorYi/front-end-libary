import { Vue, Component } from 'vue-property-decorator'
@Component
export default class Scroll extends Vue {
  isFixedByScroll = false
  // 可根据项目修改滚动栏距离顶部值
  scrollFixedTopDistance = 0

  created() {
    window.addEventListener('scroll', this.scroll)
  }

  destroyed() {
    window.removeEventListener('scroll', this.scroll)
  }

  scroll() {
    // 滚动栏滚动一次间距
    const scrollSpace = 100

    this.isFixedByScroll =
      (this['hasScrollHeight'] ? this['hasScrollHeight']() : true) &&
      window.scrollY > this.scrollFixedTopDistance + scrollSpace
  }
}
