<template>
  <div class="g-mask fixed modal" :class="animationClassName">
    <div
      ref="modal"
      @click="handleContent"
      class="modal-content-wrap g-bs-bb g-df column"
      :class="dirConfig[dir]"
    >
      <section>
        <i
          class="iconfont icon-cuo icon-close g-poa g-cursor-pointer"
          @click="close"
        ></i>
        <h4 v-if="title" class="g-color-main g-fwb g-tac modal-title">
          {{ title }}
        </h4>
      </section>

      <div class="modal-content g-por g-flex-1" id="g-modal-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Mixins } from 'vue-property-decorator'
import Scroll from '@globalUtils/scroll'

import MixinEsc from '@globalMixins/esc'

@Component({
  inheritAttrs: false
})
export default class Modal extends Mixins(MixinEsc) {
  // 如果无法检测到esc事件建议不要开启，例如：选择文件上传时，按ese会把整块蒙版关闭，相当于清空
  @Prop({ type: Boolean, default: true }) readonly openListenEsc!: boolean
  @Prop({ type: String }) readonly title!: string
  @Prop({
    type: String,
    default: 'center'
  })
  readonly dir!: string

  @Ref() readonly modal!: HTMLDivElement

  dirConfig = {
    center: 'g-poa-center',
    right: 'modal-right'
  }

  scroll = new Scroll()

  animationClassName = ''

  handleContent(e: Event) {
    e.stopPropagation()
  }

  close() {
    this.animationClassName = 'g-fade-out'

    setTimeout(() => this.$emit('close'), 100)
  }

  mounted() {
    this.$emit('ref', this.modal)

    this.animationClassName = 'g-fade-in'
    this.scroll.open()
  }

  async beforeDestroy() {
    this.scroll.close()
  }
}
</script>

<style lang="sass" scoped>
.modal-content-wrap
  $pv: 20px
  $ph: 30px
  $border-color: #E5F0FF

  padding-top: $pv
  background-color: #fff

  .icon-close
    top: 14px
    right: 14px

    font-size: 12px
    color: #9A9A9A

    opacity: 0.3
    transition: all 0.2s

    &:hover
      opacity: 0.6
      transform: rotate(360deg)

  .modal-title
    padding-bottom: 20px
    font-size: 16px

    + .modal-content
      width: 100%
      // height: calc(100% - 56px)

  ::v-deep .ant-form-item
    margin: 0

    .ant-input,
    .ant-select-selection
      border-radius: 0

    .ant-form-item-control
      line-height: normal

    .ant-form-item-label
      line-height: 32px

    .ant-input:focus,
    .ant-input:hover
      border-color: #06f

    &:not(.ant-form-btn-submit)
      margin-bottom: 10px

  &:not(.modal-right)
    padding-bottom: $pv
    padding-left: $ph
    padding-right: $ph
    border-radius: 8px

    ::v-deep .ant-form-item:nth-last-child(2)
      margin-bottom: 20px

  &.modal-right
    position: absolute
    z-index: 400
    right: 0
    top: 0

    width: 100%
    height: 100%

    .modal-title
      border-bottom: 1px solid $border-color

    .modal-content
      box-sizing: border-box
      width: 100%
      height: calc(100% - 37px)
      padding-top: 20px
      padding-left: 30px
      border-radius: 0

      ::v-deep .ant-form-btn-submit
        position: absolute
        bottom: 0
        left: 50%
        transform: translateX(-50%)

        width: 100%
        padding: 12px 0
        border-top: 1px solid $border-color
</style>
