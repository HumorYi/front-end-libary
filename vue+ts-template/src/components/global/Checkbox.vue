<template>
  <div class="g-df-vc" @click="toggle">
    <span class="checkbox" :class="{ checked: option.checked }"></span>
    <span
      v-if="option.name"
      class="name g-cursor-pointer g-text-ellipsis g-color-main"
      :title="option.name"
    >
      {{ option.name }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CheckboxOption } from '@globalType/index'

@Component
export default class Checkbox extends Vue {
  @Prop({ type: Object, required: true }) readonly option!: CheckboxOption
  @Prop({}) readonly param!: any

  toggle() {
    this.option.checked = !this.option.checked

    this.$emit('toggle', this.option.checked, this.param)
  }
}
</script>

<style lang="sass" scoped>
.checkbox
  position: relative

  display: inline-block
  box-sizing: border-box
  width: 14px
  height: 14px
  border: 1px solid #C4C7CC

  border-radius: 2px
  cursor: pointer
  background-color: #fff

  &.checked
    $color: #06F

    border-color: $color
    background-color: $color

    &:before
      content: ''
      position: absolute
      left: 4px
      top: 0px
      width: 5px
      height: 10px

      border-color: #fff
      border-style: solid
      border-width: 0 2px 2px 0

      transform: rotate(45deg)

  + .name
    flex: 1
    margin-left: 4px

    user-select: none
</style>
