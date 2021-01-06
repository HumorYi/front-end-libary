<template>
  <div class="upload">
    <input
      class="upload-input g-dn"
      :id="id"
      type="file"
      :accept="accepts.join(',')"
      :multiple="multiple"
      @change="change"
    />
    <label :for="id" class="g-cursor-pointer g-df-c upload-label">
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import MixinUpload from '@globalMixins/upload.ts'

@Component
export default class BtnUpload extends Mixins(MixinUpload) {
  @Prop({ type: String, required: true }) readonly label!: string
  @Prop({ type: Boolean, default: false }) readonly multiple!: string

  id = 'upload-input-' + Math.random()

  change(e: Event) {
    if (!e.target) {
      return false
    }

    const files = e.target['files']

    if (this.validator(files)) {
      this.$emit('success', files, this.params)
    }

    e.target['value'] = ''
  }
}
</script>

<style lang="sass">
.upload-input
  width: 0
  height: 0

.upload-label
  width: 100%
  height: 100%
</style>
