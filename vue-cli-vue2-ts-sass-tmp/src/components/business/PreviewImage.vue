<template>
  <div class="preview-image g-poa g-tip bottom">
    <img :src="url" alt="" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class PreviewImage extends Vue {
  @Prop({ type: String, required: true }) readonly url!: string
}
</script>

<style lang="sass" scoped>
.preview-image
  $triangle: 6px
  $bgc: #fff

  bottom: calc(100% + #{$triangle} + 4px)
  width: 300px
  padding: 16px

  background-color: $bgc
  box-shadow: 0px 0px 23px 1px rgba(0, 0, 0, 0.2)

  &:before
    border-top-color: $bgc

  &,
  img
    border-radius: 4px

  img
    width: 100%
</style>
