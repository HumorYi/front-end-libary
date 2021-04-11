<template>
  <Modal
    v-if="src"
    :title="title"
    v-bind="$attrs"
    v-on="$listeners"
    class="model-video"
  >
    <video :src="src" autoplay controls></video>
  </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  inheritAttrs: false
})
export default class ModalVideo extends Vue {
  @Prop({ type: String, default: '查看视频' }) readonly title!: string
  @Prop({ type: String, required: true }) readonly src!: string
}
</script>

<style lang="sass" scoped>
.model-video ::v-deep  .model-content-wrap
  $size: 560px

  left: auto
  right: 120px
  transform: translateY(-50%)

  width: $size
  height: $size

  video
    width: 100%
    height: 100%
</style>
