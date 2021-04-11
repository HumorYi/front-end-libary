import { Vue, Component } from 'vue-property-decorator'

@Component
export default class MixinModel extends Vue {
  showModel = false

  toggleModel() {
    this.showModel = !this.showModel
  }
}
