<template>
  <ul class="radios" :class="type">
    <li
      v-for="(item, index) in list"
      :key="index"
      :class="{ active: index === active }"
      @click="change(index)"
    >
      <span class="radio"></span>
      <span>{{ typeof item === 'object' ? item.name : item }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import MixinsTab from '@globalMixins/tab'
import { Component, Prop, Mixins } from 'vue-property-decorator'

@Component
export default class Radios extends Mixins(MixinsTab) {
  @Prop({
    type: String,
    default: 'fill',
    validator(value): boolean {
      return ['fill', 'cutout'].includes(value)
    }
  })
  type!: string
}
</script>

<style lang="sass" scoped>
$activeColor: #7F57FF
$activeCenterCircleColor: #fff
$fontColor: #333
$borderSize: 2px
$borderColor: #ccc

.radios
  display: flex
  flex-wrap: wrap
  user-select: none

  li
    display: flex
    align-items: center

    margin-bottom: 10px

    cursor: pointer

    &:not(:last-child)
      margin-right: 34px

    span
      color: $fontColor

      &.radio
        width: 14px
        height: 14px
        border-radius: 50%
        border: $borderSize solid $borderColor
        margin-right: 8px

    &.active
      span
        color: $activeColor

        &.radio
          display: flex
          align-items: center
          justify-content: center

          border-color: $activeColor

          &:after
            content: ''
            display: inline-block
            width: 6px
            height: 6px
            border-radius: 50%

  &.fill li.active span
    &.radio
      background-color: $activeColor

      &:after
        background-color: $activeCenterCircleColor

  &.cutout li.active span
    &.radio:after
      background-color: $activeColor
</style>
