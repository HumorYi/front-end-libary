<template>
  <div class="top" @click="top">
    <slot>
      <i class="iconfont iconzhiding"></i>
      <span v-if="title" class="icon-title">{{ title }}</span>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Top extends Vue {
  @Prop({ type: Number, default: 100 }) readonly step!: number
  @Prop({ type: Number, default: 20 }) readonly interval!: number
  @Prop({ type: Boolean, default: true }) readonly only!: boolean
  @Prop({ type: String, default: '返回顶部' }) readonly title!: string

  top() {
    const htmlDom = document.documentElement

    const timer = setInterval(() => {
      if (htmlDom.scrollTop <= 0) {
        clearInterval(timer)
      } else {
        htmlDom.scrollTop -= this.step
      }
    }, this.interval)
  }
}
</script>

<style lang="sass" scoped>
.top
  .iconfont, .icon-title
    vertical-align: middle
    display: inline-block

  &, .iconfont
    color: #fff

  .iconfont
    font-size: 20px

    + .icon-title
      margin-left: 15px
</style>
