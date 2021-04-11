<template>
  <div class="help g-tip-wrap" :class="align ? align : ''">
    <i class="iconfont icon-shuoming1"></i>
    <span v-if="msg" class="g-tip bottom">{{ msg }}</span>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Help extends Vue {
  @Prop({ type: String }) readonly msg!: string
  @Prop({ type: String, default: 'left' }) readonly align!: string
}
</script>

<style lang="sass" scoped>
$distance: 4px

.help
  .iconfont
    font-size: 14px
    color: #ccc

  &.left
    margin-left: $distance

  &.right
    margin-right: $distance
</style>
