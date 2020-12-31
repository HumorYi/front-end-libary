<template>
  <div
    class="drag-upload"
    :class="{ drop: isDrop }"
    @drop="drop"
    @dragover="dragover"
    @dragleave="dragleave"
  >
    <i
      v-if="iconClassName"
      class="iconfont g-color-tip"
      :class="iconClassName"
    ></i>
    <p v-if="tip" class="g-tac g-color-tip">{{ tip }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import MixinUpload from '@globalMixins/upload.ts'

@Component
export default class DragUpload extends Mixins(MixinUpload) {
  @Prop({ type: String }) readonly iconClassName!: string
  @Prop({ type: String }) readonly tip!: string
  @Prop() readonly params!: any

  isDrop = false

  drop(e: Event) {
    e.preventDefault()
    this.hideDrop()

    const files = e['dataTransfer'].files

    if (!this.validator(files)) {
      return
    }

    this.$emit('success', files, this.params)
  }

  toggleDrop() {
    this.isDrop = !this.isDrop
  }

  showDrop() {
    !this.isDrop && this.toggleDrop()
  }

  hideDrop() {
    this.isDrop && this.toggleDrop()
  }

  dragover(e: Event) {
    e.preventDefault()
    this.showDrop()
  }

  dragleave() {
    this.hideDrop()
  }
}
</script>

<style lang="sass" scoped>
.drag-upload
  $size: 80px
  display: inline-flex
  flex-direction: column
  align-items: center
  justify-content: center

  width: $size
  height: $size
  padding-left: 10px
  padding-right: 10px
  border: 1px dashed #D0D3D9

  &.drop
    border-color: #c4c7cc
    background-color: #f5f5f5
</style>
