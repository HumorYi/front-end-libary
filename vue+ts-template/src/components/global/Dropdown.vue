<template>
  <div class="dropdown g-df-vc-hc">
    <section class="selected g-df-vc-hsb g-cursor-pointer">
      <span v-if="normal">{{ getItemName(normal) }}</span>
      <span class="g-fold g-triangle bottom"></span>
    </section>

    <ul class="g-dn">
      <li
        v-for="(item, i) in list"
        :key="i"
        @click="select(item)"
        class="g-df-vc-hfs g-cursor-pointer"
        :class="{ active: getItemName(normal) === getItemName(item) }"
      >
        {{ getItemName(item) }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'

@Component
export default class Dropdown extends Vue {
  @Prop({ type: Array, required: true }) readonly list!: any[]
  @Prop({ type: [String, Object] }) readonly normal!: string | {}

  getItemName(item: string | {}) {
    return typeof item === 'string' ? item : item['name']
  }

  @Emit()
  select() {}
}
</script>

<style lang="sass" scoped>
.dropdown
  $borderRadius: 4px

  width: 200px
  height: 30px
  position: relative
  border: 1px solid #D0D3D9

  user-select: none
  font-size: 12px
  color: #333
  background-color: #fff

  border-radius: $borderRadius

  .selected,
  >ul >li
    padding: 0 12px

  .selected
    width: 100%
    height: 100%

    .iconfont
      position: absolute
      right: 10px
      margin-left: 7px

      font-size: 12px
      color: #C4C7CC

  >ul
    width: calc(100% + 2px)
    height: 100%

    position: absolute
    top: 100%
    z-index: 10

    li
      box-sizing: border-box
      width: 100%
      height: 100%
      border: 1px solid #D0D3D9

      background-color: #fff

      &.active,
      &:hover
        color: #06f
        // background-color: #D0D3D9

      &:not(:first-child)
        border-top: 0

      &:last-child
        border-bottom-left-radius: $borderRadius
        border-bottom-right-radius: $borderRadius

  &:hover
    border-bottom-left-radius: 0
    border-bottom-right-radius: 0

    .g-triangle
      transform: rotate(180deg)

    ul
      display: block !important
</style>
