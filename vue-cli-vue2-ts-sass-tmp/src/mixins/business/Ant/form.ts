/* import { Vue, Component } from 'vue-property-decorator'
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
import { handleFormInputBlur } from '@bizUtils/Ant/form'
import { getObjectKeyFnVal } from '@globalUtils/lib.ts'

@Component
export default class Form extends Vue {
  form!: WrappedFormUtils

  confirmDirty = false

  showModelForm = false

  openCancelSlot = true

  activeFormType = ''

  formConfig = {}

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 }
    }
  }

  get activeForm() {
    return this.formConfig[this.activeFormType]
  }

  get activeFormItems() {
    return getObjectKeyFnVal(this.activeForm, 'formItems')
  }

  get activeFormTitle() {
    return getObjectKeyFnVal(this.activeForm, 'title')
  }

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'form' })
  }

  handleBlur(e: Event, field: string) {
    if (field === 'confirmPassword') {
      this.confirmDirty = this.confirmDirty || handleFormInputBlur(e)
    }
  }

  handleSubmit(e: Event, param?: any) {
    e.preventDefault()

    // this.form['validateFields']
    this.form['validateFieldsAndScroll']((err: any, values) => {
      if (!err) {
        this['validateSuccess'] && this['validateSuccess'](values, param)
      }
    })
  }

  toggleReadOnly(formItems: {}[], isOpen = true) {
    formItems.forEach((item: {}) => {
      if (item['readOnly'] !== undefined) {
        item['readOnly'] = isOpen
      }
    })
  }

  openReadOnly(formItems: {}[]) {
    this.toggleReadOnly(formItems, true)
  }

  closeReadOnly(formItems: {}[], timeout = 1000) {
    setTimeout(() => this.toggleReadOnly(formItems, false), timeout)
  }

  toggleModelForm(formItems = this.activeFormItems) {
    if (this.showModelForm) {
      this.showModelForm = false
      return
    }

    this.openReadOnly(formItems)

    this.showModelForm = true

    this.closeReadOnly(formItems)
  }

  setActiveFormType(type: string, item?: {}) {
    this.activeFormType = type

    this.confirmDirty = false

    this['setActiveListItem'] && this['setActiveListItem'](item)
  }
}
 */
