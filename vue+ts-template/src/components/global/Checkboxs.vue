<template>
  <div class="checkboxs">
    <Checkbox
      v-if="showCheckAll && option.checked !== undefined"
      :option="option"
      class="check-all"
      @toggle="toggleCheckAll"
    ></Checkbox>
    <ul
      v-if="option.children && option.children.length > 0"
      class="g-df-vc wrap children"
    >
      <li
        v-for="(child, i) in option.children"
        :key="i"
        :class="{ 'g-text-ellipsis': ellipsis }"
      >
        <Checkbox :option="child" @toggle="toggleCheckChild"></Checkbox>
      </li>
    </ul>
    <ul v-else-if="childrens && childrens.length > 0" class="ul-chidren">
      <li v-for="(child, j) in childrens" :key="j">
        <ul
          v-if="child.children && child.children.length > 0"
          class="g-df-vc wrap g-flex-enable-ellipsis children"
        >
          <li
            v-for="(item, i) in child.children"
            :key="i"
            :class="{ 'g-text-ellipsis': ellipsis }"
          >
            <Checkbox
              :option="item"
              :param="child"
              @toggle="toggleCheckChild"
            ></Checkbox>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { CheckboxOption } from '@globalType/index'

@Component
export default class Checkboxs extends Vue {
  @Prop({ type: Object, required: true }) readonly option!: CheckboxOption
  @Prop({ type: Array }) readonly childrens!: CheckboxOption[]
  @Prop({ type: Boolean, default: true }) readonly showCheckAll!: boolean
  @Prop({ type: Boolean, default: true }) readonly ellipsis!: boolean

  toggle(option: CheckboxOption) {
    this.$emit('toggle', option, this)
  }

  toggleCheckAll(option: CheckboxOption) {
    const checked = option.checked

    if (!this.isOpen()) {
      return
    }

    this.isChildrens()
      ? this.toggleCheckAllForChildrens(checked)
      : this.toggleCheckAllForOptionChildren(checked)

    if (this.option.clickCheckedAll !== undefined) {
      this.option.clickCheckedAll = checked
    }

    this.toggle(option)
  }

  toggleCheckAllForChildrens(checked: boolean) {
    this.childrens.forEach((child: {}) => {
      this.toggleCheckAllForOptionChildren(checked, child)
    })

    this.option.checkedCount = checked ? this.option.childrenCount : 0
  }

  toggleCheckAllForOptionChildren(checked: boolean, option: {} = this.option) {
    option['children'] &&
      option['children'].forEach((child: {}) => this.check(child, checked))

    option['checkedCount'] = checked ? option['childrenCount'] : 0

    this.isChildrens() && this.toggleCheckChildForChildrens()
  }

  toggleCheckChild(
    option: CheckboxOption,
    parentOption = this.option,
    emit = true
  ) {
    const checked = option.checked

    if (!this.isOpen()) {
      return
    }

    this.toggleCheckChildForOptionChildren(checked, parentOption)

    this.isChildrens() && this.toggleCheckChildForChildrens()

    emit && this.toggle(option)
  }

  toggleCheckChildForChildrens() {
    let checkedCount = 0
    let childrenCount = 0

    this.childrens.forEach((child: {}) => {
      checkedCount += child['checkedCount']
      childrenCount += child['childrenCount']
    })

    this.setOptionCount(this.option, checkedCount, childrenCount)
    this.setOptionChecked(this.option)
  }

  toggleCheckChildForOptionChildren(checked: boolean, option: {}) {
    option['checkedCount'] += checked ? 1 : -1
    this.setOptionChecked(option)
  }

  setOptionChecked(option: {}) {
    option['checked'] =
      option['checkedCount'] !== 0 &&
      option['checkedCount'] === option['childrenCount']
  }

  setOptionCount(option: {}, checkedCount: number, childrenCount: number) {
    option['checkedCount'] = checkedCount
    option['childrenCount'] = childrenCount
  }

  check(option: {}, checked?: boolean) {
    if (checked === undefined) {
      checked = option['checkedCount'] === option['childrenCount']
    }

    if (option['checked'] !== checked) {
      option['checked'] = checked
    }
  }

  isChildrens() {
    return this.childrens && this.childrens.length > 0
  }

  isOpen(option: {} = this.option) {
    return option['children'] || this.childrens
  }

  initOption(option: {}) {
    if (!this.isOpen(option)) {
      return
    }

    const children = option['children']

    if (children) {
      this.setOptionCount(
        option,
        children.filter((item: CheckboxOption) => item.checked).length,
        children.length
      )
    }

    this.setOptionChecked(option)
  }

  @Watch('option', { immediate: true })
  onOption(val: {}) {
    this.initOption(val)
  }

  @Watch('childrens', { immediate: true })
  onChildrens() {
    if (this.isChildrens()) {
      this.toggleCheckChildForChildrens()
    }
  }
}
</script>
