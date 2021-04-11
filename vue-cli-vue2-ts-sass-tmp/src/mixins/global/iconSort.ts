import { Vue, Component } from 'vue-property-decorator'
@Component
export default class MixinIconSort extends Vue {
  hasIconSort(item: {}) {
    return item['dir'] !== undefined
  }

  toggleIconSort(item: {}) {
    if (item['dir'] === '') {
      item['dir'] = 'asc'
    } else if (item['dir'] === 'asc') {
      item['dir'] = 'desc'
    } else if (item['dir'] === 'desc') {
      item['dir'] = 'asc'
    }
  }

  cancelIconSort(list: {}[], activeItem: {}) {
    list
      .filter((item: {}) => item['dir'] && item !== activeItem)
      .forEach((item: {}) => (item['dir'] = ''))
  }

  handleIconSort(list: {}[], active: number, callback?: Function) {
    const activeItem = list[active]
    if (this.hasIconSort(activeItem)) {
      this.toggleIconSort(activeItem)
    }

    this.cancelIconSort(list, activeItem)

    callback && callback(list, active)
  }
}
