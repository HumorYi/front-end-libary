import { Vue, Component } from 'vue-property-decorator'
@Component
export default class Scroll extends Vue {
  isFixedByScroll = false
  scrollFixedTopDistance = 70

  created() {
    window.addEventListener('scroll', this.scroll)
  }

  destroyed() {
    window.removeEventListener('scroll', this.scroll)
  }

  scroll() {
    this.isFixedByScroll = window.scrollY > this.scrollFixedTopDistance
  }
}
