import { Vue, Component } from 'vue-property-decorator'
import { ToggleLoadingKey } from '@/decorator'
@Component
export default class List extends Vue {
  loading = false

  page = 1
  totalPage = 0

  list = []
  activeListItem = {}

  setActiveListItem(item: {}) {
    this.activeListItem = item
  }

  getActiveListItemId() {
    return this.activeListItem['id']
  }

  getActiveListItem() {
    return this.activeListItem
  }

  resetPage() {
    this.page = 1
  }

  resetPageForTab() {
    this['activeTab'].page = 1
  }

  @ToggleLoadingKey()
  async getListCommon(api: Function, param = {}, other = {}) {
    const { list, page_count: totalPage } = await api(param, other)

    return { list, totalPage }
  }

  async getListByTab(
    api: Function,
    param = {},
    other = {},
    isTransformList = false
  ) {
    const activeTab = this['activeTab']
    activeTab.totalPage = 0
    activeTab.list = []

    const { list, totalPage } = await this.getListCommon(
      api,
      {
        page: activeTab.page,
        ...param
      },
      other
    )

    activeTab.totalPage = totalPage

    if (!isTransformList) {
      activeTab.list = list
    }

    return list
  }

  async getList(
    api: Function,
    param = {},
    other = {},
    isTransformList = false
  ) {
    this.totalPage = 0
    this.list = []

    const { list, totalPage } = await this.getListCommon(
      api,
      {
        page: this.page,
        ...param
      },
      other
    )

    this.totalPage = totalPage

    if (!isTransformList) {
      this.list = list
    }

    return list
  }

  jumpPageCommon() {
    this['getPageList'] && this['getPageList']()
  }

  jumpPageForTab(page: number) {
    this['activeTab'].page = page

    this.jumpPageCommon()
  }

  jumpPage(page: number) {
    this.page = page
    this.jumpPageCommon()
  }
}
