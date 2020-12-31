import { Vue, Component } from 'vue-property-decorator'
@Component
export default class TabUse extends Vue {
  activeTabIndex = 0

  get activeTab() {
    return this['tabs'] ? this['tabs'][this.activeTabIndex] : {}
  }

  changeTab(active: number) {
    this.activeTabIndex = active

    this['afterChangeTab'] && this['afterChangeTab']()
  }
}
