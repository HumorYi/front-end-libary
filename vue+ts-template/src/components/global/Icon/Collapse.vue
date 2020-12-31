<template>
  <i
    class="iconfont icon-collapse g-df-c g-cursor-pointer"
    :class="collapse ? 'iconzhankai' : 'iconshouqi'"
    v-on="$listeners"
  ></i>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class IconCollapse extends Vue {
  @Prop({ type: Boolean, required: true }) readonly collapse!: boolean
}
</script>

<style lang="sass" scoped>
.icon-collapse
  $height: 26px

  position: absolute
  left: 50%
  bottom: -$height
  transform: translateX(-50%)

  box-sizing: border-box
  width: 50px
  height: $height
  border: 1px solid #EDF0F2
  border-top-color: #fff

  font-size: 16px
  color: #bcc4cc
</style>
