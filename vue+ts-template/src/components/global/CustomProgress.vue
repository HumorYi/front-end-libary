<template>
  <div
    class="custom-progress g-tip-wrap hide"
    :class="{
      hover: hover,
      animation: animation,
      run: percent !== totalPercent,
      hidden: hidden
    }"
  >
    <span class="current g-tip bottom" :style="{ left: percent + '%' }">{{
      current
    }}</span>
    <div class="progress" :class="type" :style="{ width: percent + '%' }"></div>
    <span class="total g-tip top" :style="{ left: percent + '%' }">{{
      total
    }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component
export default class CustomProgress extends Vue {
  @Prop({ type: Number, required: true }) readonly current!: number
  @Prop({ type: Number, required: true }) readonly total!: number
  @Prop({ type: String, default: 'orange' }) readonly type!: boolean
  @Prop({ type: Boolean, default: false }) readonly hover!: boolean
  @Prop({ type: Boolean, default: false }) readonly animation!: boolean
  @Prop({ type: Boolean, default: false }) readonly hidden!: boolean
  @Prop({ type: Number, default: 17 }) readonly interval!: number
  @Prop({ type: Number, default: 1 }) readonly step!: number
  @Prop({ type: Number }) readonly max!: number

  percent = 0
  totalPercent = 0

  created() {
    this.execute()
  }

  execute() {
    this.animation ? this.startAnimation() : this.setPercent(this.getPercent())
  }
  getPercent() {
    return (this.total === 0 ? 0 : this.current / this.total) * 100
  }
  setPercent(percent: number) {
    this.percent = percent > 100 ? 100 : percent
  }
  startAnimation() {
    if (this.totalPercent === 0) {
      return this.setPercent(100)
    }

    let lastPercent = 0
    const timer = setInterval(() => {
      const currentPercent = lastPercent + this.step

      if (currentPercent < this.totalPercent) {
        lastPercent = currentPercent
        this.setPercent(currentPercent)
      } else {
        this.setPercent(this.totalPercent)
        clearInterval(timer)

        if (this.totalPercent === this.max) {
          this.$emit('complete')
        }
      }
    }, this.interval)

    this.totalPercent = this.getPercent()
  }

  @Watch('current')
  onCurrentChange() {
    this.execute()
  }

  @Watch('total')
  onTotalChange() {
    this.execute()
  }
}
</script>

<style lang="sass" scoped>
$height: 6px

.custom-progress
  position: relative
  z-index: 100
  height: $height
  background-color: #F2F2F2

  .current, .total
    $distance: 16px
    transform: translateX(-50%)

    &.g-tip.bottom
      bottom: $distance

    &.g-tip.top
      top: $distance

  .progress
    width: 0
    height: 100%

    &.orange
      background: linear-gradient(90deg, #FA3636, #FA6936)

    &.primary
      background: #4D78FD

  &, .progress
    border-radius: $height

  &.animation
    &.run
      .current, .total
        display: block

    &.hidden
      .current, .total
        display: none

  &:not(.animation)
    &, &:hover
      .current, .total
        display: none !important

  &.hover
    cursor: pointer

    &:hover
      .current, .total
        display: block

    &.animation.hidden
      $color: #4D78FD

      .current, .total
        color: #fff
        background-color: $color

        &,
        &.g-tip.bottom,
        &.g-tip.top
          box-shadow: 0px -1px 3px rgba(27,57,149,0.3)

        &.g-tip
          &.bottom:before
              border-top-color: $color
          &.top:before
              border-bottom-color: $color
</style>
