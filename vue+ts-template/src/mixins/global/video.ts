import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Video extends Vue {
  videoSrc = ''

  toggleVideoSrc(src: string | Event): void {
    this.videoSrc = typeof src === 'string' ? src : ''
  }
}
