import { Vue, Component } from 'vue-property-decorator'
import { getObjectKeyFnVal } from '@globalUtils/lib.ts'

@Component
export default class Dialog extends Vue {
  dialogConfig = {}
  activeDialogType = ''
  showDialog = false

  get activeDialog() {
    return this.dialogConfig[this.activeDialogType]
  }

  get activeDialogTitle() {
    return getObjectKeyFnVal(this.activeDialog, 'title')
  }

  get activeDialogContent() {
    return getObjectKeyFnVal(this.activeDialog, 'content')
  }

  toggleDialog() {
    this.showDialog = !this.showDialog
  }

  setActiveDialog(
    type: string,
    item: any = undefined,
    openSetActiveListItem = true,
    ...args: any[]
  ) {
    this.activeDialogType = type

    if (item && openSetActiveListItem) {
      this['setActiveListItem'] && this['setActiveListItem'](item)
    }

    this.activeDialog.setContent && this.activeDialog.setContent(item, ...args)

    this.toggleDialog()
  }
}
