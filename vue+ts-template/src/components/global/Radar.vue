<template>
  <div class="radar-wrap">
    <div
      v-for="i in count"
      :key="i"
      class="g-animation-radar radar"
      :style="{
        animationDelay: i + delay + 's',
        width: size,
        height: size,
        marginLeft: `calc( ${mlIncrement} - ${size}/2 )`,
        marginTop: `calc( ${mtIncrement} - ${size}/2 )`,
        background: bg
      }"
    ></div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Radar extends Vue {
  @Prop({ type: String, required: true }) readonly size!: number
  @Prop({ type: String, default: '#e7e2fc' }) readonly bg!: string
  @Prop({ type: Number, default: 3 }) readonly count!: number
  @Prop({ type: Number, default: -1 }) readonly delay!: number
  @Prop({ type: String, default: '0px' }) readonly mlIncrement!: string
  @Prop({ type: String, default: '0px' }) readonly mtIncrement!: string
}
</script>

<style lang="sass" scoped>
.radar-wrap
  position: relative
  text-align: center

  .radar
    position: absolute
    left: 50%
    top: 50%
    border-radius: 50%

    +:not(.radar)
      position: relative
</style>
